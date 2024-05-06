rules_name = "Donut Chess";
rules_description = "Chess except it has a hole in the middle like a donut";

board = board_from_simple_fen("rnbqkbnr/pppppppp/8/3**3/3**3/8/PPPPPPPP/RNBQKBNR");

//redefine special pawns that sit before the void
c.pawn.moves = [
	{type: "peaceful", motion: [0, 1], limit: 2, required_state: 0, new_state: 2}, //move double forward
	{type: "peaceful", motion: [0, 2], limit: 1, required_state: 0, new_state: 2, void_condition: [0, 1]}, //move double forward, when void
	{type: "peaceful", motion: [0, 1], limit: 1, required_state: 1, new_state: 1}, //move single forward on non-0-state
	{type: "peaceful", motion: [0, 1], limit: 1, required_state: 2, new_state: 1}, //move single forward on non-0-state
	{type: "capture", motion: [1, 1], limit: 1, new_state: 1},
	{type: "capture", motion: [-1, 1], limit: 1, new_state: 1},
	{type: "peaceful", motion: [1, 1], limit: 1, new_state: 1, void_condition: [0, 1]}, //peaceful diagonal when void
	{type: "peaceful", motion: [-1, 1], limit: 1, new_state: 1,  void_condition: [0, 1]}, //peaceful diagonal when void
	{type: "peaceful", motion: [1, 1], limit: 1, mandatory_collateral: [1, 0, "pawn", 2]},
	{type: "peaceful", motion: [-1, 1], limit: 1, mandatory_collateral: [-1, 0, "pawn", 2]}
];
white_pawn.type = c.pawn;
black_pawn.type = c.pawn;