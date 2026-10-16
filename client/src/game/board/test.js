import CreatePieces from "../pieces/createPieces";

function Test(board){

    board[0][0] = CreatePieces("Rook", "Black");
    board[0][4] = CreatePieces("King", "Black");
    board[0][7] = CreatePieces("Rook", "Black");

    board[2][5] = CreatePieces("Bishop","White");

    return board;
};

export default Test;