import CreatePieces from "../pieces/createPieces";

function Test(board){

    board[0][0] = CreatePieces("King", "Black");
    board[7][7] = CreatePieces("King", "White");
    board[1][3] = CreatePieces("Pawn", "Black");
    board[3][4] = CreatePieces("Pawn", "White");

    return board;
};

export default Test;