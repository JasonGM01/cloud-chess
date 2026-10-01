import CreatePieces from "../pieces/createPieces";

function Test(board){

    board[0][0] = CreatePieces("King", "Black");
    board[3][3] = CreatePieces("Bishop", "White");
    board[2][0] = CreatePieces("Knight", "White");
    board[0][7] = CreatePieces("Queen", "White");
    board[2][2] = CreatePieces("Bishop", "White");
    board[5][5] = CreatePieces("Bishop", "White");
    board[7][7] = CreatePieces("King","White");

    return board;
};

export default Test;