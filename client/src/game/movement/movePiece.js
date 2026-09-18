import GetPiece from "../pieces/getPiece";
import ValidateMove from "../validators/validateMove";

function MovePiece(board, startRow, startCol, endRow, endCol){
    if(!ValidateMove(board, startRow, startCol, endRow, endCol)) return false;

    const piece = GetPiece(board, startRow, startCol);
    board[endRow][endCol] = piece;
    board[startRow][startCol] = null;

    piece.hasMoved = true;

    return true;
}

export default MovePiece;