import Piece from "../pieces/piece";
import Rook from "./rookMove";
import Bishop from './bishopMove';
import Knight from "./knightMove";
import King from './kingMove';
import Queen from "./queenMove";
import Pawn from './pawnMove';

const moves = {
    Rook,
    Bishop,
    Knight,
    King, 
    Queen,
    Pawn
};

function ValidateMovement(board, startRow, startCol, endRow, endCol){
    if (startRow < 0 || 
        startRow > 7 || 
        startCol < 0 || 
        startCol > 7 || 
        endRow < 0 || 
        endRow > 7 || 
        endCol < 0 || 
        endCol > 7) 
        return false;
    
    const piece = Piece(board, startRow, startCol);
    if (!piece) return false;

    if(startRow == endRow && startCol == endCol) return false;

    const pieceMovement = moves[piece.type];
    if(!pieceMovement) return false;
    return pieceMovement(startRow, startCol, endRow, endCol, piece);
}

export default ValidateMovement;