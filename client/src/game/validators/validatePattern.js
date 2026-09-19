
import { Rook, Bishop, Knight, King, Queen, Pawn } from "../pieces/pieces";

const move = {
    Rook,
    Bishop,
    Knight,
    King, 
    Queen,
    Pawn
};

function ValidatePattern(startRow, startCol, endRow, endCol, piece){
    const pieceMovement = move[piece.type];
    return pieceMovement(startRow, startCol, endRow, endCol);
}

export default ValidatePattern;