export function GetPiece(board, startRow, startCol){
    return board[startRow][startCol];
}

export function GetKing(board, color){
    for(let i = 0; i <= 7; i++){
        for(let j = 0; j <= 7; j++){
            let piece = board[i][j];
            if(!piece) continue;
            if(piece.type == "King" && piece.color == color) return [piece, i, j];
        }
    }
}