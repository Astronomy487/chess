rules_name = "4 Players";
rules_description = "Chess with 4 players on a unique board.";
ai_type = "heuristic";

c.rook.svg.push("https://upload.wikimedia.org/wikipedia/commons/8/85/Chess_rgt45.svg");
c.rook.svg.push("https://upload.wikimedia.org/wikipedia/commons/c/c9/Chess_rrt45.svg");
c.bishop.svg.push("https://upload.wikimedia.org/wikipedia/commons/0/0e/Chess_bgt45.svg");
c.bishop.svg.push("https://upload.wikimedia.org/wikipedia/commons/9/99/Chess_brt45.svg");
c.knight.svg.push("https://upload.wikimedia.org/wikipedia/commons/1/13/Chess_ngt45.svg");
c.knight.svg.push("https://upload.wikimedia.org/wikipedia/commons/e/e8/Chess_nrt45.svg");
c.king.svg.push("https://upload.wikimedia.org/wikipedia/commons/7/7e/Chess_kgt45.svg");
c.king.svg.push("https://upload.wikimedia.org/wikipedia/commons/2/2d/Chess_krt45.svg");
c.queen.svg.push("https://upload.wikimedia.org/wikipedia/commons/4/41/Chess_qgt45.svg");
c.queen.svg.push("https://upload.wikimedia.org/wikipedia/commons/6/65/Chess_qrt45.svg");
c.pawn.svg.push("https://upload.wikimedia.org/wikipedia/commons/d/d3/Chess_pgt45.svg");
c.pawn.svg.push("https://upload.wikimedia.org/wikipedia/commons/f/f8/Chess_prt45.svg");

board = [];

let map = "###rnbkqbnr######pppppppp######        ###rp          prnp          pnbp          pbkp          pkqp          pqbp          pbnp          pnrp          pr###        ######pppppppp######rnbkqbnr###".split("");

let map_map = {
	r: c.rook,
	n: c.knight,
	b: c.bishop,
	q: c.queen,
	k: c.king,
	p: c.pawn
};

for (let row = 0; row < 14; row++) {
	board[row] = [];
	for (let col = 0; col < 14; col++) {
		let character = map[row*14+col];
		if (character == "#") {
			board[row][col] = oob_cell;
		} else if (character == " ") {
			board[row][col] = empty_cell;
		} else {
			let team = 0;
			if (row > 11) team = 0;
			if (col > 11) team = 1;
			if (row < 3) team = 2;
			if (col < 3) team = 3;
			board[row][col] = {team: team, direction: team, state: 0, type: map_map[character]};
		}
	}
}