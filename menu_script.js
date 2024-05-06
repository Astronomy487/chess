//handles the form at the start of the game, loading .js, stuff like that

let query_string = location.search;
while (query_string.startsWith("?")) query_string = query_string.substring(1);
let parameters = {};
for (pair of query_string.split("&")) if (pair.includes("=")) parameters[pair.split("=")[0]] = pair.split("=")[1].replaceAll("%20", " ");
if (parameters.fen || parameters.ruleset) {
	//there is some parameter! let's play a game
	//let shortened_filename = parameters.ruleset; while (shortened_filename.includes("/")) shortened_filename = shortened_filename.substring(shortened_filename.indexOf("/")+1);
	//we are playing game
	document.getElementById("menu").remove();
	//parse parameters
	// - ruleset: a script to be loaded
	// - fen: a fen to be loaded
	// - name
	// - description
	if (parameters.fen) {
		board = copy_board(board_from_simple_fen(parameters.fen));
	}
	if (!rules_description && parameters.fen) rules_description = "From FEN "+parameters.fen;
	if (parameters.ruleset) {
		let el = document.createElement("script");
		el.setAttribute("src", parameters.ruleset);
		el.setAttribute("type", "text/javascript");
		el.setAttribute("async", false);
		document.body.appendChild(el);
		el.addEventListener("load", function(){rules_loaded();});
		el.addEventListener("error", function(){
			let html = '';
			html += '<h1>Error</h1>';
			html += '<p>Something went wrong. I can\'t load the URL <a href="'+parameters.ruleset+'">'+parameters.ruleset+'</a> you gave me. Are you sure it exists?</p>';
			document.getElementById("modal").innerHTML = html;
		});
	} else {
		rules_loaded();
	}
	function rules_loaded() {
		if (parameters.name) {
			rules_name = parameters.name
		}
		if (parameters.desc) {
			rules_description = parameters.desc
		}
		//create the modal that can start the game
		let html = '';
		html += '<h1>'+rules_name+'</h1>';
		html += '<p>'+rules_description+'</p>';
		teams = 0;
		for (row of board) for (cell of row) if (cell.team != undefined) teams = Math.max(teams, cell.team);
		teams++;
		html += '<hr>';
		html += '<aside>Players</aside>';
		let player_team = Math.floor(Math.random()*teams);
		for (let i = 0; i < teams; i++) {
			html += '<div><input type="checkbox" id="ai_checkbox_'+i+'" name="ai_checkbox_'+i+'" '+(i!=player_team?'checked':'')+'><label for="ai_checkbox_'+i+'">Let CPU play as '+team_names[i]+'</label></div>';
		}
		html += '<select id="ai_select">';
		for (each of "Random Heuristic Minimax".split(" ")) {
			html += '<option value="'+each.toLowerCase()+'"'+(each.toLowerCase() == ai_type ? ' selected' : '')+'>'+each+'</option>';
		}
		html += '</select><label>CPU algorithm</label><br>';
		html += '<select id="turn_select">';
		for (let i = 0; i < teams; i++) {
			html += '<option'+(i==turn?' selected':'')+'>'+team_names[i]+'</option>';
		}
		html += '</select><label>plays first</label>';
		html += '<hr>';
		html += '<aside>Settings</aside>';
		html += '<div><input type="checkbox" id="coords_checkbox" name="coords_checkbox"><label for="coords_checkbox">Show coordinates</label></div>';
		html += '<div><input type="checkbox" id="rotation_checkbox" name="rotation_checkbox" checked><label for="rotation_checkbox">Rotate board</label></div>';
		html += '<div><input type="checkbox" id="fog_checkbox" name="fog_checkbox"><label for="fog_checkbox">Fog of war</label></div>';
		html += '<button onclick="start_game();" style="margin-top: -2rem;">Start</button>';
		document.getElementById("modal").innerHTML = html;
		document.getElementById("title").innerText = document.getElementById("modal").getElementsByTagName("h1")[0].innerText+" - Chess Sandbox";
	}
} else {
	//we are on home screen
	document.getElementById("sidebar").remove();
	document.getElementById("modal").remove();
}

function link_to_rules(filename) {
	location.href += "?ruleset=rules/" + filename + ".js";
}