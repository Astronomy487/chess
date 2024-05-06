rules_name = "Chaturaji";
rules_description = "An ancient Indian predecessor of chess with 4 players, an elephant that acts like a rook, and a boat that acts like an elephant.";

//king -> king
//knight -> knight
//rook -> "elephant"
//bishop -> "boat" with 2x movement

c.rook.name = "elephant";
c.bishop.name = "boat";
c.pawn.svg = [
	"https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/d/d3/Chess_pgt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/f/f8/Chess_prt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/4/44/Chess_pyt45.svg"
];
c.king.svg = [
	"https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/7/7e/Chess_kgt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/2/2d/Chess_krt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_kyt45.svg"
];
c.rook.svg = [
	"https://upload.wikimedia.org/wikipedia/commons/archive/d/d4/20211201235948%21Chess_elt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/0/00/Chess_egt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/4/48/Chess_ert45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/f/fd/Chess_eyt45.svg"
];
c.knight.svg = [
	"https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/1/13/Chess_ngt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/e/e8/Chess_nrt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/e/ec/Chess_nyt45.svg"
];
c.bishop.svg = [
	"https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_slt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_sgt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/b/b3/Chess_srt45.svg",
	"https://upload.wikimedia.org/wikipedia/commons/6/6a/Chess_syt45.svg"
];
team_names = "White Green Red Yellow".split(" ");

c.bishop.moves = [
	{type: "normal", motion: [2, 2], limit: 1},
	{type: "normal", motion: [2, -2], limit: 1},
	{type: "normal", motion: [-2, 2], limit: 1},
	{type: "normal", motion: [-2, -2], limit: 1},
];

c.pawn.moves = [
	{type: "peaceful", motion: [0, 1], limit: 1, new_state: 1}, //u can always move one forward
	{type: "capture", motion: [1, 1], limit: 1, new_state: 1}, //capture left
	{type: "capture", motion: [-1, 1], limit: 1, new_state: 1}, //capture right
];
c.pawn.promotes = [c.queen];

function king(n) {return {direction:n,team:n,type:c.king};}
function knight(n) {return {direction:n,team:n,type:c.knight};}
function elephant(n) {return {direction:n,team:n,type:c.rook};}
function boat(n) {return {direction:n,team:n,type:c.bishop};}
function pawn(n) {return {direction:n,team:n,type:c.pawn};}

board = [
	[boat(3), pawn(3), empty_cell, empty_cell, king(2), elephant(2), knight(2), boat(2)],
	[knight(3), pawn(3), empty_cell, empty_cell, pawn(2), pawn(2), pawn(2), pawn(2)],
	[elephant(3), pawn(3), empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[king(3), pawn(3), empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, pawn(1), king(1)],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, pawn(1), elephant(1)],
	[pawn(0), pawn(0), pawn(0), pawn(0), empty_cell, empty_cell, pawn(1), knight(1)],
	[boat(0), knight(0), elephant(0), king(0), empty_cell, empty_cell, pawn(1), boat(1)]
];