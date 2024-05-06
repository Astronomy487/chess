rules_name = "Chaturanga / Shatranj";
rules_description = "The ancient Indian/Iranian predecessor of chess. Mantri (queens) can only move diagonal one square. Gaja/elephants (bishops) hop 2 squares diagonally. And you can't even castle.";

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

//rename to the sanskrit terms
c.king.name = "raja";
c.queen.name = "mantri";
c.queen.worth = 2;
c.bishop.name = "gaja";
c.bishop.worth = 2;
c.knight.name = "ashva";
c.rook.name = "ratha";
c.pawn.name = "padati";

c.pawn.promotes = ["queen"];

c.bishop.svg = [
	"https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_elt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/9/93/Chess_edt45.svg"
];
c.queen.svg = [
	"https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_glt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/3/31/Chess_gdt45.svg"
];

c.king.moves = c.king.moves.filter(move => {return move.type != "castle"});
c.queen.moves = [
	{type: "normal", motion: [1, 1], limit: 1},
	{type: "normal", motion: [1, -1], limit: 1},
	{type: "normal", motion: [-1, 1], limit: 1},
	{type: "normal", motion: [-1, -1], limit: 1}
];
c.bishop.moves = [
	{type: "normal", motion: [2, 2], limit: 1},
	{type: "normal", motion: [2, -2], limit: 1},
	{type: "normal", motion: [-2, 2], limit: 1},
	{type: "normal", motion: [-2, -2], limit: 1}
];
c.pawn.moves = [
	{type: "peaceful", motion: [0, 1], limit: 1}, //move single forward
	{type: "capture", motion: [1, 1], limit: 1},
	{type: "capture", motion: [-1, 1], limit: 1}
];