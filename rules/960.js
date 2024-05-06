rules_name = "Chess960";
rules_description = "The order of all pieces on the back rank is shuffled. Invented by Bobby Fischer in 1996. Called Chess960 because there are 960 possible arrangements.";

function shuffle(t){let f=t.length,n,o;for(;0!==f;)o=Math.floor(Math.random()*f),--f,n=t[f],t[f]=t[o],t[o]=n;return t};

let row = "qkrrbbnn".split("");
let valid = false;

//shuffle until a) bishops on opposite parities b) subset rooks&kings looks like rkr
while (!valid) {
	row = shuffle(row);
	valid = true;
	let first_bishop = row.indexOf("b");
	let second_bishop = row.indexOf("b", first_bishop+1);
	if (first_bishop%2 == second_bishop%2) valid = false;
	let rkr = "";
	for (p of row) if (p == "r" || p == "k") rkr += p;
	if (rkr != "rkr") valid = false;
}

board = board_from_simple_fen(row.join("")+"/pppppppp/8/8/8/8/PPPPPPPP/"+row.join("").toUpperCase());