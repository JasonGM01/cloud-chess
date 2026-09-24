import CreatePieces from "../pieces/createPieces";

function Test(board){

    board[0][0] = CreatePieces("King", "Black");
    board[3][3] = CreatePieces("Bishop", "White");
    board[2][2] = CreatePieces("Queen", "Black");
    board[5][5] = CreatePieces("Bishop", "White");

    return board;
};

export default Test;