let empty_cell = 1;
let oob_cell = 0; //important that this casts to false

let board = [];
let board_history = []; //every past value of board

let teams;
let team_rotations = [];
let turn = 0; //whose turn it currently is
let available_moves; //available moves to current turn
let selection = null; //select piece before acting on it. [row, col]
let just_happened_destination = null; //the last move that just happened. [row, col]
let just_happened_origin = null; //the last move that just happened. [row, col]
let ai_teams = [];

let coords_enabled = false;
let rotation_enabled = true;
let fog_enabled = false;

let rules_name = "Normal rules"; //name displayed
let rules_description = ""; //rules
let forbid_self_check = true;
let team_names = "White Black Green Red Yellow".split(" ");
let ai_type = "minimax";

function start_game() {
	sfx("sfxtake.mp3");
	//read and remove modal
	turn = team_names.indexOf(document.getElementById("turn_select").value);
	ai_type = document.getElementById("ai_select").value;
	for (let i = 0; i < teams; i++) if (document.getElementById("ai_checkbox_"+i).checked) {
		ai_teams.push(i);
		team_names[i] += " (CPU)";
	}
	coords_enabled = document.getElementById("coords_checkbox").checked;
	rotation_enabled = document.getElementById("rotation_checkbox").checked;
	fog_enabled = document.getElementById("fog_checkbox").checked;
	document.getElementById("modal").remove();
	//dereference anything sus in the board
	board = copy_board(board);
	//fill in the board to ensure it's rectangular
	let max_row_length = 0;
	for (row of board) max_row_length = Math.max(max_row_length, row.length);
	for (row of board) while (row.length < max_row_length) row.push(oob_cell);
	for (row of board) for (cell of row) if (cell.type) cell.state = 0;
	//create board html
	{
		let html = "";
		for (let row_count = 0; row_count < board.length; row_count++) {
			let row = board[row_count];
			html += '<tr>';
			if (coords_enabled) html += '<td class="coords">'+(board.length-row_count)+'</td>';
			for (let col_count = 0; col_count < row.length; col_count++) {
				let cell = row[col_count];
				html += '<td id="cell_'+row_count+'_'+col_count+'" onmousedown="click_cell('+row_count+', '+col_count+')" parity="'+((row_count+col_count)%2)+'")>';
				//html += '<td id="cell_'+row_count+'_'+col_count+'" onmousedown="click_cell('+row_count+', '+col_count+')" onmouseup="click_cell('+row_count+', '+col_count+')" parity="'+((row_count+col_count)%2)+'">';
				html += '</td>';
			}
			html += '</tr>';
		}
		if (coords_enabled) {
			html += '<tr><td class="coords"></td>';
			for (let col_count = 0; col_count < board[0].length; col_count++) {
				if (coords_enabled) html += '<td class="coords">'+('abcdefghijklmnopqrstuvwxyz').charAt(col_count)+'</td>';
			}
			html += '</tr>';
		}
		document.getElementById("display_table").innerHTML = html;
		//any oob cells need to be made white
		for (let row_count = 0; row_count < board.length; row_count++) for (let col_count = 0; col_count < board[row_count].length; col_count++) {
			if (board[row_count][col_count] == oob_cell)
				get_celement(row_count, col_count).setAttribute("oob", "true");
		}
	}
	board_history = [board];
	//determine team rotations
	for (let t = 0; t < teams; t++) for (row of board) for (cell of row) if (cell.team == t) team_rotations[t] = cell.direction;
	for (let t = 0; t < teams; t++) for (row of board) for (cell of row) if (cell.team == t && cell.type.royal) team_rotations[t] = cell.direction;
	for (let t = 0; t < teams; t++) if (!ai_teams.includes(t)) set_rotation(team_rotations[t]);
	//start the round
	do_turn(false);
}

function get_celement(row_count, col_count) {
	return document.getElementById("cell_"+row_count+"_"+col_count);
}

function update_display_all() {
	for (let row_count = 0; row_count < board.length; row_count++) for (let col_count = 0; col_count < board[row_count].length; col_count++) update_display(row_count, col_count);
}
function update_display(row_count, col_count) { //only updates the character inside! square highlighting is handled by highlight_appropriate_squares
	if (board[row_count][col_count]) {
		let cell = board[row_count][col_count];
		//get_celement(row_count, col_count).innerHTML = cell.type==undefined ? '' : '<span team="'+cell.team+'">'+cell.type.letter+'</span>';
		get_celement(row_count, col_count).innerHTML = cell.type==undefined ? '' : '<img draggable="false" src="'+cell.type.svg[cell.team]+'">';
		get_celement(row_count, col_count).setAttribute("title", (cell.type==undefined?"":team_names[cell.team].toLowerCase()+" "+cell.type.name+" on ")+square_name(row_count, col_count));
	}
}
function clear_fog() {
	for (let row_count = 0; row_count < board.length; row_count++) for (let col_count = 0; col_count < board[row_count].length; col_count++) {
			get_celement(row_count, col_count).setAttribute("fog", "false");
	}
}
function set_fog() {
	//the turn we use should be whichever person was last not ai
	let turn_to_use = turn;
	for (let t = 0; t < teams; t++) {
		if (!ai_teams.includes(turn_to_use)) break;
		turn_to_use--;
		if (turn_to_use < 0) turn_to_use += teams;
	}
	for (let row_count = 0; row_count < board.length; row_count++) for (let col_count = 0; col_count < board[row_count].length; col_count++) {
		let should_fog = "true";
		if (board[row_count][col_count].team == turn_to_use) should_fog = "false";
		for (m of find_legal_moves(turn_to_use, board)) if (m.destination[0] == row_count && m.destination[1] == col_count) should_fog = "false";
		get_celement(row_count, col_count).setAttribute("fog", should_fog);
	}
}

function royalty_threatened(board, royal_team) {
	for (let team = 0; team < teams; team++) {
		if (team != royal_team) if (find_moves(team, board, true, royal_team)) return true;
	}
	return false;
}
function royalty_threatened_by(board, attacking_team) {
	for (let team = 0; team < teams; team++) {
		if (team != attacking_team) if (find_moves(attacking_team, board, true, team)) return true;
	}
	return false;
}

function find_legal_moves(turn, board) {
	let m = find_moves(turn, board);
	if (!forbid_self_check) return m;
	for (let i = 0; i < m.length; i++) {
		let move = m[i];
		let illegal = royalty_threatened(move.result, turn);
		if (illegal) {
			m.splice(i, 1);
			i--;
		}
	}
	return m;
}

function rotate(v, direction) {
	let dx = v[0];
	let dy = v[1];
	return [[-dy, dx, dy, -dx][direction], [dx, -dy, -dx, dy][direction]];
}

//TODO: restructure this so theres a helper function to find moves for one specific piece. it still has to somehow overload with those royal threat parameters

//finds pseudo legal moves from this function
function find_moves(turn, board, checking_royal_threat = false, royal_team) {
	//finds the valid moves for player #turn to make
	//each move object is returned with these attributes
	// - source coordinates (piece to activate to cause this)
	// - destination coordinates (space to click to cause this to happen)
	// - result (a new board array that will become the state if this is picked. all new references (except to piece types))
	let moves_list = [];
	for (let row_count = 0; row_count < board.length; row_count++) for (let col_count = 0; col_count < board[row_count].length; col_count++) {
		let cell = board[row_count][col_count];
		//if (cell == empty_cell || cell == oob_cell) continue;
		if (cell.team == turn) {
			//main loop: for each move definition
			for (move of cell.type.moves) {
				//preliminary checks for conditions for this move
				if (move.void_condition != undefined) {
					let condition_list = typeof(move.void_condition[0])=="number" ? [move.void_condition] : move.void_condition;
					let should_continue = false;
					for (cond of condition_list) {
						let [d_row, d_col] = rotate(cond, cell.direction);
						if (in_bounds(board, row_count+d_row, col_count+d_col)) should_continue = true;
					}
					if (should_continue) continue;
				}
				if (move.empty_condition != undefined) {
					let condition_list = typeof(move.empty_condition[0])=="number" ? [move.empty_condition] : move.empty_condition;
					let should_continue = false;
					for (cond of condition_list) {
						let [d_row, d_col] = rotate(cond, cell.direction);
						if (!in_bounds(board, row_count+d_row, col_count+d_col) || board[row_count+d_row][col_count+d_col] != empty_cell) should_continue = true;
					}
					if (should_continue) continue;
				}
				if (move.mandatory_collateral != undefined) {
					let [collateral_row, collateral_col] = rotate(move.mandatory_collateral, cell.direction);
					collateral_row += row_count;
					collateral_col += col_count;
					if (!in_bounds(board, collateral_row, collateral_col) || board[collateral_row][collateral_col] == empty_cell) continue;
					let collateral_cell = board[collateral_row][collateral_col];
					if (collateral_cell.team == turn) continue;;
					if (move.mandatory_collateral[2] != undefined && move.mandatory_collateral[2] != collateral_cell.type.name) continue;
					if (move.mandatory_collateral[3] != undefined && move.mandatory_collateral[3] != collateral_cell.state) continue;
					if (collateral_cell.type.royal && checking_royal_threat) return true;
				}
				if (move.required_state != undefined && cell.state != move.required_state) continue;
				let [d_row, d_col] = rotate(move.motion, cell.direction);
				let current_row = row_count + d_row;
				let current_col = col_count + d_col;
				//special move types
				if (move.type == "castle") {
					//scan by interval (d_row, d_col). if this is empty until an X of our color, then we can do a silly swap
					let walks = 0;
					while (in_bounds(board, current_row, current_col) && board[current_row][current_col] == empty_cell) {
						current_row += d_row;
						current_col += d_col;
						walks++;
					}
					if (walks < 1) continue;
					if (in_bounds(board, current_row, current_col) && board[current_row][current_col].team == turn && board[current_row][current_col].type.name == move.friend) {
						//extra condition check: does friend also meet requirements
						if (move.required_state != undefined && board[current_row][current_col].state != move.required_state) continue;
						let future_board = copy_board(board);
						if (move.new_state != undefined) future_board[row_count][col_count].state = move.new_state;
						future_board[row_count+d_row][col_count+d_col] = future_board[current_row][current_col];
						future_board[current_row][current_col] = empty_cell;
						if (move.new_state != undefined) future_board[row_count][col_count].state = move.new_state;
						future_board[row_count+2*d_row][col_count+2*d_col] = future_board[row_count][col_count];
						future_board[row_count][col_count] = empty_cell;
						moves_list.push({origin: [row_count, col_count], destination: [row_count+2*d_row, col_count+2*d_col], result: future_board});
					}
					continue;
				}
				//all other move types use same rules
				//calculate the possible continuations for this piece in this move
				//check conditions to see if the cell can actually move
				let slide_count = 1;
				while (in_bounds(board, current_row, current_col)) {
					if (move.limit != undefined && slide_count > move.limit) break;
					if (board[current_row][current_col] == empty_cell) { //if in empty
						if (move.type != "capture" && move.type != "ranged" && move.type != "convert") {
							//create possible future around this. sliding at empty
							let future_board = copy_board(board);
							if (move.new_state != undefined) future_board[row_count][col_count].state = move.new_state;
							future_board[current_row][current_col] = future_board[row_count][col_count];
							future_board[row_count][col_count] = empty_cell;
							if (move.mandatory_collateral != undefined) { //if pass, this Is a collateral situation
								let [collateral_row, collateral_col] = rotate(move.mandatory_collateral, cell.direction);
								collateral_row += row_count;
								collateral_col += col_count;
								future_board[collateral_row][collateral_col] = empty_cell;
							}
							if (future_board[current_row][current_col].type.promotes) {//if this piece CAN promote and is now facing void... promote
								let super_void = true;
								for (let dx = -1; dx <= 1 && super_void; dx++) {
									let super_void_coord = rotate([dx, 1], future_board[current_row][current_col].direction);
									super_void_coord[0] += current_row; super_void_coord[1] += current_col;
									if (in_bounds(future_board, super_void_coord[0], super_void_coord[1])) super_void = false;
								}
								if (super_void) { //we can promote. go to each promote state
									let promotions = future_board[current_row][current_col].type.promotes;
									for (new_type of promotions) {
										let futurer_board = copy_board(future_board);
										futurer_board[current_row][current_col].type = new_type;
										moves_list.push({origin: [row_count, col_count], destination: [current_row, current_col], result: futurer_board});
									}
									break; //continue loop before doing the ordinary moves_list push
								}
							}
							moves_list.push({origin: [row_count, col_count], destination: [current_row, current_col], result: future_board});
						}
					} else {
						if (board[current_row][current_col].team != turn && move.type != "peaceful") { //if hitting enemy, and we aren't peaceful
							if (checking_royal_threat && board[current_row][current_col].type.royal && board[current_row][current_col].team == royal_team) return true;
							let future_board = copy_board(board);
							if (move.new_state != undefined) future_board[row_count][col_count].state = move.new_state;
							if (move.type == "ranged") {
								future_board[current_row][current_col] = empty_cell;
							} else if (move.type == "convert") {
								future_board[current_row][current_col].team = turn;
								future_board[current_row][current_col].direction = future_board[row_count][col_count].direction;
							} else { //normal piece moves there and replaces enemy. no funny
								future_board[current_row][current_col] = future_board[row_count][col_count];
								future_board[row_count][col_count] = empty_cell;
							}
							if (future_board[current_row][current_col].type.promotes) {//if this piece CAN promote and is now facing void... promote STARIGHT UP COPYING CODE OASDGJDFG i need to fix this function
								let super_void = true;
								for (let dx = -1; dx <= 1 && super_void; dx++) {
									let super_void_coord = rotate([dx, 1], future_board[current_row][current_col].direction);
									super_void_coord[0] += current_row; super_void_coord[1] += current_col;
									if (in_bounds(future_board, super_void_coord[0], super_void_coord[1])) super_void = false;
								}
								if (super_void) { //we can promote. go to each promote state
									let promotions = future_board[current_row][current_col].type.promotes;
									for (new_type of promotions) {
										let futurer_board = copy_board(future_board);
										futurer_board[current_row][current_col].type = new_type;
										moves_list.push({origin: [row_count, col_count], destination: [current_row, current_col], result: futurer_board});
									}
									break; //continue loop before doing the ordinary moves_list push
								}
							}
							moves_list.push({origin: [row_count, col_count], destination: [current_row, current_col], result: future_board});
						}
						break; //stop the sliding loop
					}
					current_row += d_row;
					current_col += d_col;
					slide_count++;
				}
			} //end for each move
		} //end 'is this our piece' conditions
	} //end piece loop
	if (checking_royal_threat) return false;
	return moves_list;
}

//once the board is in its good current state, update visuals and get moves ready
// (to return to a history, use need_rotate=false and set the turn yourself)
function do_turn(need_rotate = true) {
	if (need_rotate) turn = (turn+1)%teams;
	if (!ai_teams.includes(turn)) set_rotation(team_rotations[turn]);
	update_display_all();
	highlight_appropriate_squares();
	if (fog_enabled) set_fog();
	available_moves = find_legal_moves(turn, board);
	document.getElementById("current_turn_display").innerText = team_names[turn]+"'s turn";
	if (forbid_self_check && royalty_threatened(board, turn)) document.getElementById("current_turn_display").innerText += " (in check)";
	//check for end-of-game conditions
	if (forbid_self_check && available_moves.length == 0) {
		if (royalty_threatened(board, turn)) {
			end_game("Checkmate", turn);
		} else {
			end_game("Stalemate", turn);
		}
		//highlight_appropriate_squares();
		return;
	}
	if (!forbid_self_check && board_history.length-1) {
		//compare all royalty counts from history[len-1] and board
		let royalty_counts = [];
		for (let t = 0; t < teams; t++)
			royalty_counts[t] = royal_count(t, board)
		for (let t = 0; t < teams; t++)
			royalty_counts[t] -= royal_count(t, board_history[board_history.length-2]);
		//royalty counts now represents difference
		for (let t = 0; t < teams; t++) if (royalty_counts[t] != 0) {
			end_game("Royal capture", t);
			//highlight_appropriate_squares();
			return;
		}
	}
	if (ai_teams.includes(turn)) {
		setTimeout(computer_turn, 50);
	}
	highlight_appropriate_squares();
}

function undo_turn(n = 1) {
	//pop board history to the board, rotate Turn back, and do the turn
	for (let undos = 0; undos < n; undos++) if (board_history.length > 1) {
		board = board_history[board_history.length-2];
		turn = (turn+teams-1)%teams;
		board_history.pop();
		[just_happened_origin, just_happened_destination] = [null, null];
		selection = null;
	}
	do_turn(false);
}

function end_game(kind, turn) {
	sfx("boom.ogg");
	clear_fog();
	for (let row_count = 0; row_count < board.length; row_count++) for (let col_count = 0; col_count < board[row_count].length; col_count++) {
		get_celement(row_count, col_count).setAttribute("onmousedown", "");
		get_celement(row_count, col_count).style.cursor = "default";
	}
	document.getElementById("current_turn_display").remove();
	let html = '<div id="modal">';
	html += '<h1>'+kind+" on "+team_names[turn]+'</h1>';
	if (kind == "Checkmate") {
		html += '<p>'+team_names[turn]+' is in check, but has no legal moves. '+team_names[turn]+' loses.</p>';
	} else if (kind == "Stalemate") {
		html += '<p>'+team_names[turn]+'\ has no legal moves, but is not in check. This game is a draw.</p>';
	} else if (kind == "Royal capture") {
		html += '<p>'+team_names[turn]+'\'s royalty has been captured. '+team_names[turn]+' loses.</p>';
	}
	html += '<button onclick="sfx(\'sfxdeselect.mp3\'); this.parentElement.remove();">Close</button>';
	html += '</div>';
	document.body.insertAdjacentHTML("beforeend", html);
	console.log(kind);
}
//these functions work with the ui. current board state! no future handling
function click_cell(row, col) {
	if (ai_teams.includes(turn)) return;
	//deselecting space
	if (selection != null && row == selection[0] && col == selection[1]) {
		selection = null;
		sfx("sfxdeselect.mp3");
		highlight_appropriate_squares();
		return;
	}
	//using an available move
	if (selection != null) for (move of available_moves) {
		if (move.destination[0] == row && move.destination[1] == col && move.origin[0] == selection[0] && move.origin[1] == selection[1]) {
			accept_move(move);
			return;
		}
	}
	//selecting a new space from our team
	if (board[row][col].team == turn) {
		selection = [row, col];
		sfx("sfxselect.mp3");
		highlight_appropriate_squares();
		return;
	}
}

//for actually commiting a move object
function accept_move(move) {
	let evaluation_change = board_evaluation(turn, move.result) - board_evaluation(turn, board);
	board = move.result;
	board_history.push(board);
	selection = null;
	just_happened_origin = move.origin;
	just_happened_destination = move.destination;
	sfx(evaluation_change == 0 ? "sfxmove.mp3" : "sfxtake.mp3");
	do_turn();
}

function sfx(noise, backwards = false) {
	let a = new Audio((backwards?"../":"")+"sfx/"+noise);
	a.volume = 0.5;
	a.play();
}

function highlight_appropriate_squares() { //do square highlighting
	for (let row_count = 0; row_count < board.length; row_count++) for (let col_count = 0; col_count < board[row_count].length; col_count++) {
		get_celement(row_count, col_count).setAttribute("highlight", "");
		if (board[row_count][col_count].team == turn && !ai_teams.includes(turn)) {
			get_celement(row_count, col_count).setAttribute("highlight", "owned");
			get_celement(row_count, col_count).offsetHeight;
		}
	}
	if (just_happened_origin != null) {
		get_celement(just_happened_origin[0], just_happened_origin[1]).setAttribute("highlight", "just_happened"); //actively selected piece
	}
	if (just_happened_destination != null) {
		get_celement(just_happened_destination[0], just_happened_destination[1]).setAttribute("highlight", "just_happened"); //actively selected piece
	}
	if (selection != null) {
		get_celement(selection[0], selection[1]).setAttribute("highlight", "origin"); //actively selected piece
		for (move of available_moves) if (move.origin[0] == selection[0] && move.origin[1] == selection[1]) {
			get_celement(move.destination[0], move.destination[1]).setAttribute("highlight", "destination");
		}
	}
}

//creates a copy of the board. piece objects are recreated. references to the piece types are maintained.
//used to explore future board states without altering the existing board
function copy_board(board) {
	let new_board = [];
	for (row of board) {
		let new_row = [];
		new_board.push(new_row);
		for (cell of row) {
			if (typeof(cell) == "number") {
				new_row.push(cell);
				continue;
			}
			new_row.push({
				team: cell.team,
				direction: cell.direction,
				state: cell.state,
				type: cell.type
			});
		}
	}
	return new_board;
}

function in_bounds(board, row_count, col_count, counting_void = true) {
	if (row_count < 0 || row_count >= board.length) return false;
	if (col_count < 0 || col_count >= board[row_count].length) return false; 
	if (board[row_count][col_count] == oob_cell && counting_void) return false;
	return true;
}

function square_name(row, col) {
	return "abcdefghijklmnopqrstuvwxyz".split("")[col] + (board.length - row);
}

//using global available_moves, does a turn for us.
function computer_turn() {
	//console.log("thinking...");
	let time = Date.now();
	let move;
	if (ai_type == "minimax") {
		move = best_move_for(turn, board);
	} else if (ai_type == "heuristic") {
		move = heuristic_best_move_for(turn, board);
	} else {
		move = find_legal_moves(turn, board);
		move = move[Math.floor(Math.random()*move.length)];
	}
	//let move = best_move_for(turn, board);
	time = Date.now() - time;
	//console.log("took "+time/1000+" seconds");
	//console.log("done thinking");
	accept_move(move);
}

//evaluates how much a board state is in favor of some team
function board_evaluation(team, board) {
	let points = [];
	for (let i = 0; i < teams; i++) points[i] = 0;
	for (row of board) for (cell of row) {
		if (cell.team != undefined) points[cell.team] += cell.type.worth;
	}
	let our_advantage = 0;
	for (let opposing = 0; opposing < teams; opposing++) our_advantage += points[team] - points[opposing];
	return our_advantage;
}

function best_move_for(team, board, depth = 3) {
	if (depth == 1) {
		let available = find_legal_moves(team, board);
		if (available.length == 0) return 0; //this player is trapped. keep that in mind when returning to previous layer
		let evals = [];
		for (a of available) evals.push(board_evaluation(team, board));
		let max_eval = evals[0];
		for (e of evals) if (e > max_eval) max_eval = e;
		let best_of_available = [];
		for (let i = 0; i < evals.length; i++) if (evals[i] == max_eval) best_of_available.push(available[i]);
		return best_of_available[Math.floor(Math.random()*best_of_available.length)];
	} else {
		let available = find_legal_moves(team, board);
		if (available.length == 0) return 0;
		//among the legal moves, let's predict how the next person will respond
		let next_team = (team+1)%teams;
		let evals = []; //evaluation in terms of our own benefit still
		for (a of available) {
			let their_response = best_move_for(next_team, a.result, depth-1);
			if (their_response == 0) {
				//they have no available moves here. if they're in danger, checkmate; otherwise, stalemate
				evals.push(royalty_threatened(next_team, a.result) ? 99999 : 0);
			} else {
				//The actual board evaluation for this possible future
				let the_evaluation = board_evaluation(team, their_response.result);
				evals.push(the_evaluation); //this is how good we'll end up if we go through with their plans
			}
		}
		let max_eval = evals[0];
		for (e of evals) if (e > max_eval) max_eval = e;
		let best_of_available = [];
		for (let i = 0; i < evals.length; i++) if (evals[i] == max_eval) best_of_available.push(available[i]);
		return best_of_available[Math.floor(Math.random()*best_of_available.length)];
	}
}

let heuristic_weights = {
	current_material: 500,
	available_moves: 5,
	mate: 1000000,
	they_capture_back: 800,
	using_cheap: 5,
	we_capture_back_with_cheap: 50,
	using_royalty: -1000,
	distance: 5,
	center_bias: 3,
	random: 2
};
function heuristic_best_move_for(team, board) {
	let og_eval = board_evaluation(team, board);
	let available = find_legal_moves(team, board);
	//create evaluations
	let highest_quality = Number.NEGATIVE_INFINITY;
	let best_move;
	for (av of available) {
		let heuristic = {
			current_material: 0,
			available_moves: 0,
			mate: 0,
			they_capture_back: 0,
			using_cheap: 0,
			we_capture_back_with_cheap: 0,
			using_royalty: 0,
			distance: 0,
			center_bias: 0
		}; //contains subscores
		let this_eval = board_evaluation(team, av.result); //av.result's eval
		heuristic.current_material = this_eval / 10;
		let my_next_moves = find_legal_moves(team, av.result); //these are moves if i could go again
		let their_next_moves = find_legal_moves((team+1)%teams, av.result);
		heuristic.available_moves += Math.sqrt(my_next_moves.length) - Math.sqrt(their_next_moves.length);
		if (their_next_moves.length == 0) heuristic.mate = 100;
		for (each of their_next_moves) { //if any of their responses can penalize us, punish
			let our_eval_change = board_evaluation(team, each.result) - this_eval; //negative means bad things happen
			if (our_eval_change < 0) heuristic.they_capture_back = Math.min(heuristic.they_capture_back, our_eval_change / 10); //use worst case
		}
		for (each of my_next_moves) { //find if we attack anything with cheap
			let origin = board[av.origin[0]][av.origin[1]]; //piece we used to cause this
			let eval_change = board_evaluation(team, each.result) - this_eval; //amount of havoc our next play could cause. positive is good for us
			if (eval_change) {
				heuristic.we_capture_back_with_cheap = Math.max(heuristic.we_capture_back_with_cheap, 1 / (origin.type.worth * origin.type.worth) / 10);
			}
		}
		//for every possible destination square. my move ++ it by inverse of piece value. their move -- it by inverse of piece value. positive means i control easily with small value pieces
		heuristic.using_cheap = 1 / board[av.origin[0]][av.origin[1]].type.worth;
		if (board[av.origin[0]][av.origin[1]].type.royal) heuristic.using_royalty = 1000;
		heuristic.distance = (Math.abs(av.origin[0] - av.destination[0]) + Math.abs(av.origin[1] - av.destination[1]));
		heuristic.center_bias = 0 - (Math.abs(board.length*0.5 - av.destination[0]) + Math.abs(board[0].length*0.5 - av.destination[1]));
		if (board[av.origin[0]][av.origin[1]].type.royal) heuristic.center_bias *= -1;
		//find heuristic weighted total
		let heuristic_score = 0;
		for (subscore of Object.keys(heuristic)) heuristic_score += heuristic_weights[subscore]/(1+Math.exp(0-heuristic[subscore]));
		heuristic_score += heuristic_weights.random * Math.random();
		//if (turn) heuristic_score *= -1;
		//console.log(heuristic_score);
		if (heuristic_score > highest_quality) {
			highest_quality = heuristic_score;
			best_move = av;
		}
	}
	return best_move;
}

let last_rotation_deg = 0;
function set_rotation(n) { //0 up, 1 left, 2 down, 3 right
	if (!rotation_enabled) return;
	let deg = n*90; //choice%360 == deg
	let going_down = last_rotation_deg;
	while (Math.abs(going_down)%360 != deg) going_down -= 90;
	let going_up = last_rotation_deg;
	while (going_up%360 != deg) going_up += 90;
	deg = Math.abs(going_up - last_rotation_deg) > Math.abs(going_down - last_rotation_deg) ? going_down : going_up;
	last_rotation_deg = deg;
	let css = '';
	css += 'tbody {transform: rotate('+deg+'deg);}';
	css += 'td img {transform: rotate(-'+deg+'deg);}';
	document.getElementById("rotation_css").innerHTML = css;
}

function royal_count(team, board) { //used to check if something happened to royalty over some move. if !forbid_self_check
	let count = 0;
	for (row of board) for (cell of row) if (cell.team == team) if (cell.type.royal) count++;
	return count;
}