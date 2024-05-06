rules_name = "Crossword Chess";
rules_description = "Chess except it has random holes in the middle like a crossword puzzle.";

board = [
	[black_rook, black_knig, black_bish, black_king, black_quee, black_bish, black_knig, black_rook],
	[black_pawn, black_pawn, black_pawn, black_pawn, black_pawn, black_pawn, black_pawn, black_pawn],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[white_pawn, white_pawn, white_pawn, white_pawn, white_pawn, white_pawn, white_pawn, white_pawn],
	[white_rook, white_knig, white_bish, white_quee, white_king, white_bish, white_knig, white_rook],
];

//redefine special pawns that sit before the void
c.pawn.moves = [
	{type: "peaceful", motion: [0, 1], limit: 2, required_state: 0, new_state: 2}, //move double forward
	{type: "peaceful", motion: [0, 2], limit: 1, required_state: 0, new_state: 2, void_condition: [0, 1]}, //move double forward, when void
	{type: "peaceful", motion: [0, 1], limit: 1, required_state: 1, new_state: 1}, //move single forward on non-0-state
	{type: "peaceful", motion: [0, 1], limit: 1, required_state: 2, new_state: 1}, //move single forward on non-0-state
	{type: "capture", motion: [1, 1], limit: 1, new_state: 1},
	{type: "capture", motion: [-1, 1], limit: 1, new_state: 1},
	{type: "peaceful", motion: [1, 1], limit: 1, new_state: 1, void_condition: [0, 1]}, //peaceful diagonal when void
	{type: "peaceful", motion: [-1, 1], limit: 1, new_state: 1,  void_condition: [0, 1]}, //peaceful diagonal when void
	{type: "peaceful", motion: [1, 1], limit: 1, mandatory_collateral: [1, 0, "pawn", 2]},
	{type: "peaceful", motion: [-1, 1], limit: 1, mandatory_collateral: [-1, 0, "pawn", 2]}
];
white_pawn.type = c.pawn;
black_pawn.type = c.pawn;

let doubled_row = Math.floor(Math.random()*2)+2; //this row will have 2 consecutive holes. so will row 7-doubled_row
let doubled_col = Math.floor(1+Math.random()*5) //first index of doubled holes. 1(2) to 5(6)
board[doubled_row][doubled_col] = oob_cell;
board[doubled_row][doubled_col+1] = oob_cell;
board[7-doubled_row][7-doubled_col] = oob_cell;
board[7-doubled_row][7-doubled_col-1] = oob_cell;

let singled_row = doubled_row == 3 ? 2 : 3; //1 hole alone. so will row 7-singled_row
let singled_col = Math.floor(1+Math.random()*6);
board[singled_row][singled_col] = oob_cell;
board[7-singled_row][7-singled_col] = oob_cell;

//number of possibilities: 2 * 5 * 6 = 60