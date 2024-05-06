rules_name = "Chess and Checkers";
rules_description = "Chess and checkers together";

c.checker = {
	name: "piece",
	svg: [
		"https://upload.wikimedia.org/wikipedia/commons/9/90/Draughts_mlt45.svg",
		"https://upload.wikimedia.org/wikipedia/commons/0/0c/Draughts_mdt45.svg"
	],
	worth: 1,
	moves: [
		{type: "peaceful", motion: [2, 2], limit: 1, mandatory_collateral: [1, 1]},
		{type: "peaceful", motion: [-2, 2], limit: 1, mandatory_collateral: [-1, 1]},
		{type: "peaceful", motion: [1, 1], limit: 1},
		{type: "peaceful", motion: [-1, 1], limit: 1}
	]
};

c.checker_king = {
	name: "king",
	svg: [
		"https://upload.wikimedia.org/wikipedia/commons/a/a6/Draughts_klt45.svg",
		"https://upload.wikimedia.org/wikipedia/commons/9/9a/Draughts_kdt45.svg"
	],
	worth: 2,
	moves: [
		{type: "peaceful", motion: [2, 2], limit: 1, mandatory_collateral: [1, 1]},
		{type: "peaceful", motion: [-2, 2], limit: 1, mandatory_collateral: [-1, 1]},
		{type: "peaceful", motion: [1, 1], limit: 1},
		{type: "peaceful", motion: [-1, 1], limit: 1},
		{type: "peaceful", motion: [2, -2], limit: 1, mandatory_collateral: [1, -1]},
		{type: "peaceful", motion: [-2, -2], limit: 1, mandatory_collateral: [-1, -1]},
		{type: "peaceful", motion: [1, -1], limit: 1},
		{type: "peaceful", motion: [-1, -1], limit: 1}
	]
};

c.checker.promotes = [c.checker_king];

if (true) {
	white_pawn.type = c.checker;
	board = [
		[black_rook, black_knig, black_bish, black_quee, black_king, black_bish, black_knig, black_rook],
		[black_pawn, black_pawn, black_pawn, black_pawn, black_pawn, black_pawn, black_pawn, black_pawn],
		[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
		[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
		[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
		[white_pawn, empty_cell, white_pawn, empty_cell, white_pawn, empty_cell, white_pawn, empty_cell],
		[empty_cell, white_pawn, empty_cell, white_pawn, empty_cell, white_pawn, empty_cell, white_pawn],
		[white_pawn, empty_cell, white_pawn, empty_cell, white_pawn, empty_cell, white_pawn, empty_cell],
	];
} else {
	black_pawn.type = c.checker;
	board = [
		[empty_cell, black_pawn, empty_cell, black_pawn, empty_cell, black_pawn, empty_cell, black_pawn],
		[black_pawn, empty_cell, black_pawn, empty_cell, black_pawn, empty_cell, black_pawn, empty_cell],
		[empty_cell, black_pawn, empty_cell, black_pawn, empty_cell, black_pawn, empty_cell, black_pawn],
		[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
		[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
		[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
		[white_pawn, white_pawn, white_pawn, white_pawn, white_pawn, white_pawn, white_pawn, white_pawn],
		[white_rook, white_knig, white_bish, white_quee, white_king, white_bish, white_knig, white_rook],
	];
	team_names[1] = "Red";
}