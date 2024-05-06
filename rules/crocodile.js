rules_name = "Crocodile chess";
rules_description = "Replaces the knight with a crocodile (as described in <a href=\"https://twitter.com/poisonjr/status/1735454194377662595\" target=\"_blank\">this poisonjr tweet</a>).";

c.knight.name = "crocodile";
c.knight.svg = [
	"rules/poisonjr crocodile/white.png",
	"rules/poisonjr crocodile/black.png"
];
c.knight.worth = 4;
c.knight.moves = [
	{type: "normal", motion: [0, 1], limit: 1},
	{type: "normal", motion: [0, -1], limit: 1},
	{type: "peaceful", motion: [-7, 0], limit: 1},
	{type: "peaceful", motion: [-6, 0], limit: 1},
	{type: "peaceful", motion: [-5, 0], limit: 1},
	{type: "peaceful", motion: [-4, 0], limit: 1},
	{type: "peaceful", motion: [-3, 0], limit: 1},
	{type: "peaceful", motion: [-2, 0], limit: 1},
	{type: "peaceful", motion: [-1, 0], limit: 1},
	{type: "peaceful", motion: [0, 0], limit: 1},
	{type: "peaceful", motion: [1, 0], limit: 1},
	{type: "peaceful", motion: [2, 0], limit: 1},
	{type: "peaceful", motion: [3, 0], limit: 1},
	{type: "peaceful", motion: [4, 0], limit: 1},
	{type: "peaceful", motion: [5, 0], limit: 1},
	{type: "peaceful", motion: [6, 0], limit: 1},
	{type: "peaceful", motion: [6, 0], limit: 1}
]

board = board_from_simple_fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");