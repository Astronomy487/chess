rules_name = "Backwards pawn";
rules_description = "Chess except pawns can move backwards";

c.pawn.moves = [
	{type: "peaceful", motion: [0, 1], limit: 1, new_state: 1}, //u can always move one forward
	{type: "peaceful", motion: [0, 2], limit: 1, empty_condition: [0, 1], new_state: 2, required_state: 0}, //double up
	{type: "capture", motion: [1, 1], limit: 1, new_state: 1}, //capture left
	{type: "capture", motion: [-1, 1], limit: 1, new_state: 1}, //capture right
	{type: "peaceful", motion: [1, 1], limit: 1, mandatory_collateral: [1, 0, "pawn", 2], new_state: 1}, //en passant right
	{type: "peaceful", motion: [-1, 1], limit: 1, mandatory_collateral: [-1, 0, "pawn", 2], new_state: 1}, //en passant left
	
	{type: "peaceful", motion: [0, -1], limit: 1, new_state: 1}, //BACK u can always move one forward
	{type: "capture", motion: [1, -1], limit: 1, new_state: 1}, //BACK capture left
	{type: "capture", motion: [-1, -1], limit: 1, new_state: 1}, //BACK capture right
	{type: "peaceful", motion: [1, -1], limit: 1, mandatory_collateral: [1, 0, "pawn", 2], new_state: 1}, //BACK en passant right
	{type: "peaceful", motion: [-1, -1], limit: 1, mandatory_collateral: [-1, 0, "pawn", 2], new_state: 1} //BACK en passant left
];

board = board_from_simple_fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");