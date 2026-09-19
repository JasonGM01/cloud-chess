import { Rook, Bishop, Knight, King, Queen, Pawn } from "../pieces/pieces";
import GetPiece from "../pieces/getPiece";
import ValidateMove from "../validators/validateMove";

const moves = {
    Rook,
    Bishop,
    Knight,
    King, 
    Queen,
    Pawn
};

function MovePiece(board, startRow, startCol, endRow, endCol){  
    const piece = GetPiece(board, startRow, startCol);
    
    if(!ValidateMove(board, startRow, startCol, endRow, endCol, piece)) return false;
  
    const execute = moves[piece.type];
    execute(startRow, startCol, endRow, endCol);

    board[endRow][endCol] = piece;
    board[startRow][startCol] = null;

    piece.hasMoved = true;

    return true;
}

export default MovePiece;