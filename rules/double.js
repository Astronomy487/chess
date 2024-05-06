rules_name = "Double (16x12)";
rules_description = "An absurdly large 16x12 game. Each team has two kings, both of which must stay protected.";
ai_type = "random";

c.pawn.moves = [
	{type: "peaceful", motion: [0, 1], limit: 4, required_state: 0, new_state: 2}, //move double forward
	{type: "peaceful", motion: [0, 1], limit: 1, required_state: 1, new_state: 1}, //move single forward on non-0-state
	{type: "peaceful", motion: [0, 1], limit: 1, required_state: 2, new_state: 1}, //move single forward on non-0-state
	{type: "capture", motion: [1, 1], limit: 1, new_state: 1},
	{type: "capture", motion: [-1, 1], limit: 1, new_state: 1},
	{type: "peaceful", motion: [1, 1], limit: 1, mandatory_collateral: [1, 0, "pawn", 2], new_state: 1},
	{type: "peaceful", motion: [-1, 1], limit: 1, mandatory_collateral: [-1, 0, "pawn", 2], new_state: 1}
];

let white_paw4 = {team: 0, direction: 0, state: 0, type: c.pawn};
let black_paw4 = {team: 1, direction: 2, state: 0, type: c.pawn};


board = [
	[black_rook, black_knig, black_bish, black_quee, black_king, black_bish, black_knig, black_rook, black_rook, black_knig, black_bish, black_quee, black_king, black_bish, black_knig, black_rook],
	[black_paw4, black_paw4, black_paw4, black_paw4, black_paw4, black_paw4, black_paw4, black_paw4, black_paw4, black_paw4, black_paw4, black_paw4, black_paw4, black_paw4, black_paw4, black_paw4],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[white_paw4, white_paw4, white_paw4, white_paw4, white_paw4, white_paw4, white_paw4, white_paw4, white_paw4, white_paw4, white_paw4, white_paw4, white_paw4, white_paw4, white_paw4, white_paw4],
	[white_rook, white_knig, white_bish, white_quee, white_king, white_bish, white_knig, white_rook, white_rook, white_knig, white_bish, white_quee, white_king, white_bish, white_knig, white_rook]
];