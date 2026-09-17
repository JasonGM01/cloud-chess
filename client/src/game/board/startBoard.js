import CreatePieces from '../pieces/createPieces';

function StartBoard(board){

    board[0][0] = CreatePieces("Rook", "White");
    board[0][1] = CreatePieces("Knight", "White");
    board[0][2] = CreatePieces("Bishop", "White");
    board[0][3] = CreatePieces("King", "White");
    board[0][4] = CreatePieces("Queen", "White");
    board[0][5] = CreatePieces("Rook", "White");
    board[0][6] = CreatePieces("Knight", "White");
    board[0][7] = CreatePieces("Bishop", "White");
    
    for(let i = 0; i < 8; i++){
        board[1][i] = CreatePieces("Pawn", "White");
        
    }

    for(let i = 0; i < 8; i++){
        board[6][i] = CreatePieces("Pawn", "Black");
    }

    board[7][0] = CreatePieces("Rook", "Black");
    board[7][1] = CreatePieces("Knight", "Black");
    board[7][2] = CreatePieces("Bishop", "Black");
    board[7][3] = CreatePieces("King", "Black");
    board[7][4] = CreatePieces("Queen", "Black");
    board[7][5] = CreatePieces("Rook", "Black");
    board[7][6] = CreatePieces("Knight", "Black");
    board[7][7] = CreatePieces("Bishop", "Black");

    return board;
};

export default StartBoard;