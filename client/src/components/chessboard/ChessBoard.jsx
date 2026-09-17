import { Rook, Bishop, Knight, Queen, King, Pawn } from "../../game/moves";
import Board from "../../game/board";

function Move(movement){
    const piece = movement.piece;
    const move = (movement.vertical, movement.horizontal);
    const board = Board;
    switch(piece){

    case "Rook": Rook(move); break;
    
    case "Bishop": Bishop(move); break;
    
    case "Knight": Knight(move); break;
    
    case "Queen": Queen(move); break;
    
    case "King": King(move); break;
    
    case "Pawn": Pawn(move); break;

    default: break;
    }

    return;
}

export default Move;