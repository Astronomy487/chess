rules_name = "S";

c.king.moves = c.king.moves.filter(move => move.type != "castle");
c.pawn.moves = [
	{type: "peaceful", motion: [0, 1], limit: 1},
	{type: "peaceful", motion: [0, -1], limit: 1},
	{type: "peaceful", motion: [-1, 0], limit: 1},
	{type: "peaceful", motion: [1, 0], limit: 1},
	{type: "capture", motion: [1, 1], limit: 1},
	{type: "capture", motion: [1, -1], limit: 1},
	{type: "capture", motion: [-1, 1], limit: 1},
	{type: "capture", motion: [-1, -1], limit: 1}
];
delete c.pawn.promotes;

board = board_from_simple_fen("*r3pk*/n2*1n2/b1p***n1/*p3***/***3P*/1N***P1B/2N1*2N/*KP3R*");