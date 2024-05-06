rules_name = "Checkers";
rules_description = "A janky recreation of checkers using this chess engine, taking advantage of the generalizable piece rules.";
team_names[1] = "Red";

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

c.checker.promotes = [c.checker_king]

white_pawn.type = c.checker;
black_pawn.type = c.checker;

board = [
	[empty_cell, black_pawn, empty_cell, black_pawn, empty_cell, black_pawn, empty_cell, black_pawn],
	[black_pawn, empty_cell, black_pawn, empty_cell, black_pawn, empty_cell, black_pawn, empty_cell],
	[empty_cell, black_pawn, empty_cell, black_pawn, empty_cell, black_pawn, empty_cell, black_pawn],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[white_pawn, empty_cell, white_pawn, empty_cell, white_pawn, empty_cell, white_pawn, empty_cell],
	[empty_cell, white_pawn, empty_cell, white_pawn, empty_cell, white_pawn, empty_cell, white_pawn],
	[white_pawn, empty_cell, white_pawn, empty_cell, white_pawn, empty_cell, white_pawn, empty_cell],
];