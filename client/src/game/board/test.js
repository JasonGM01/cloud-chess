import CreatePieces from "../pieces/createPieces";

function Test(board){

    board[0][4] = CreatePieces("King", "Black");
    // board[0][0] = CreatePieces("Rook", "Black");
    // board[0][7] = CreatePieces("Rook", "Black");
    board[1][3] = CreatePieces("Pawn", "Black"); 
    board[7][4] = CreatePieces("King", "White");
    board[3][4] = CreatePieces("Pawn", "White");
    // board[7][3] = CreatePieces("Bishop", "White");
    // board[7][0] = CreatePieces("Rook", "White");
    // board[7][7] = CreatePieces("Rook", "White");
    

    return board;
};

export default Test;