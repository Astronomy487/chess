//based off of this
// https://www.reddit.com/r/AnarchyChess/comments/uwm5l8/you_know_what_fuck_you_league_of_legends_chess/

rules_name = "League of Legends";
rules_description = "Chess but the board is shaped like a League of Legends map";
ai_type = "heuristic";

c.pawn.moves = [
	{type: "peaceful", motion: [0, 1], limit: 2},
	{type: "peaceful", motion: [1, 0], limit: 2},
	{type: "capture", motion: [1, 1], limit: 2},
	{type: "peaceful", motion: [0, 1], limit: 1},
	{type: "peaceful", motion: [1, 0], limit: 1},
	{type: "capture", motion: [1, 1], limit: 1}
];

delete c.pawn.promotes;

let map = "           PPRBK" +
					"           PPPBQ" +
					"  #########PNPPR" +
					"  #########PPNPP" +
					"  ######## PPPPP" +
					"  #######   ##  " +
					"  ######   ###  " +
					"  #####   ####  " +
					"  ####   #####  " +
					"  ###   ######  " +
					"  ##   #######  " +
					"ppppp ########  " +
					"ppnpp#########  " +
					"rppnp#########  " +
					"qbppp           " +
					"kbrpp           ";

let map_map = {
	" ": empty_cell,
	"#": oob_cell,
	"p": white_pawn,
	"P": black_pawn,
	"k": white_king,
	"K": black_king,
	"q": white_quee,
	"Q": black_quee,
	"b": white_bish,
	"B": black_bish,
	"r": white_rook,
	"R": black_rook,
	"n": white_knig,
	"N": black_knig,
}

for (let row = 0; row < 16; row++) {
	let r = [];
	for (let col = 0; col < 16; col++) {
		let character = map.charAt(row*16+col);
		r.push(map_map[character]);
	}
	board.push(r);
}