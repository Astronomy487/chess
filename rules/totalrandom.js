rules_name = "Chess9.8x10<sup>16</sup>";
rules_description = "The placement of all pieces everywhere is totally randomized.";

let bank = [
	black_rook, black_knig, black_bish, black_quee, black_king, black_bish, black_knig, black_rook,
	black_pawn, black_pawn, black_pawn, black_pawn, black_pawn, black_pawn, black_pawn, black_pawn,
	empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell,
	empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell,
	empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell,
	empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell,
	white_pawn, white_pawn, white_pawn, white_pawn, white_pawn, white_pawn, white_pawn, white_pawn,
	white_rook, white_knig, white_bish, white_quee, white_king, white_bish, white_knig, white_rook
];
function shuffle(t){let f=t.length,n,o;for(;0!==f;)o=Math.floor(Math.random()*f),--f,n=t[f],t[f]=t[o],t[o]=n;return t};
bank = shuffle(bank);
teams = 2;

board = [];
for (let a = 0; a < 8; a++) {
	board[a] = [];
	for (let b = 0; b < 8; b++) {
		board[a][b] = bank[a*8+b];
	}
}