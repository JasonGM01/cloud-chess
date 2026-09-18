import GetPiece from "../pieces/getPiece";
import { Rook, Bishop, Knight, King, Queen, Pawn } from "../pieces/pieces";
import ValidateDestination from "../validators/validateDestination";

const moves = {
    Rook,
    Bishop,
    Knight,
    King, 
    Queen,
    Pawn
};

function ValidateMove(board, startRow, startCol, endRow, endCol){
    if (startRow < 0 || 
        startRow > 7 || 
        startCol < 0 || 
        startCol > 7 || 
        endRow < 0 || 
        endRow > 7 || 
        endCol < 0 || 
        endCol > 7) 
        return false;
    
    const piece = GetPiece(board, startRow, startCol);
    if (!piece) return false;

    if(startRow == endRow && startCol == endCol) return false;

    const pieceMovement = moves[piece.type];
    if(!pieceMovement) return false;
    
    if(!ValidateDestination(board, endRow, endCol)) return false;
    
    return true;
}

export default ValidateMove;