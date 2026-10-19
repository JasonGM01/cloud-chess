import CreatePieces from "../pieces/createPieces";

function Test(board){

    board[0][0] = CreatePieces("King", "Black");
    board[7][7] = CreatePieces("King", "White");
    board[1][3] = CreatePieces("Pawn", "Black");
    board[3][4] = CreatePieces("Pawn", "White");
    board[6][7] = CreatePieces("Rook", "White");
    board[0][7] = CreatePieces("Rook", "Black");

    return board;
};

export default Test;