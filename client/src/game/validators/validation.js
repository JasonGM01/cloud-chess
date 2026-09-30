import GetDestination from "../pieces/getDestination";
import { Diagonal, Horizontal, Vertical } from "../validators/checks/pathCheck";
import { Rook, Bishop, Knight, King, Queen, Pawn } from "../pieces/pieces";

export function ValidateBoard(startRow, startCol, endRow, endCol){
    if (startRow < 0 || 
        startRow > 7 || 
        startCol < 0 || 
        startCol > 7 || 
        endRow < 0 || 
        endRow > 7 || 
        endCol < 0 || 
        endCol > 7) 
        return false;
    return true;
}

export function ValidateDestination(board, endRow, endCol, color){
    const destination = GetDestination(board, endRow, endCol, color);
    if(destination == null) return true;
    else if(destination.color == color) return false;
    else return true;
}

export function ValidateMove(board, startRow, startCol, endRow, endCol, piece){
    // console.log("Board");
    if (!ValidateBoard(startRow, startCol, endRow, endCol)) return false;

    // console.log("Same space");
    if(startRow == endRow && startCol == endCol) return false;
    
    // console.log("Get piece");
    if (!piece) return false;

    // console.log("Move Validation");
    if(!ValidatePattern(startRow, startCol, endRow, endCol, piece)) return false;

    // console.log("Path validation");
    if(!ValidatePath(board, startRow, startCol, endRow, endCol, piece)) return false;

    // console.log("Destination check");
    if(!ValidateDestination(board, endRow, endCol, piece.color)) return true;
    
    // console.log("Passed");
    return true;
}

export function ValidatePath(board, startRow, startCol, endRow, endCol, piece){
    let piece_type = piece.type;
    // console.log(piece_type, startRow, startCol, endRow, endCol);
    if (piece_type != null) {
        switch (piece_type) {

            case "Rook":
                if (startRow == endRow && startCol != endCol)
                    return Horizontal(board, startRow, startCol, endCol);
                else if(startCol == endCol && startRow != endRow)
                    return Vertical(board, startRow, startCol, endRow);
                return false;

            case "Bishop": 
                if(Math.abs(startRow - endRow) == Math.abs(startCol - endCol))
                    return Diagonal(board, startRow, startCol, endRow, endCol);
                return false;

            case "Knight": 
                return true;

            case "Queen": 
                // console.log("move queen");
                // console.log(Math.abs(startRow - endRow));
                // console.log(Math.abs(startCol - endCol));
                if(Math.abs(startRow - endRow) == Math.abs(startCol - endCol)){
                    // console.log("Diag");
                    return Diagonal(board, startRow, startCol, endRow, endCol);}
                if(startRow == endRow){
                    // console.log("Hori");
                    return Horizontal(board, startRow, startCol, endCol);}
                if(startCol == endCol){
                    // console.log("Vert");
                    return Vertical(board, startRow, startCol, endRow);}
                return false;

            case "King": 
                if(Math.abs(startRow - endRow) == Math.abs(startCol - endCol))
                    return Diagonal(board, startRow, startCol, endRow, endCol);    
                if(startRow == endRow)
                    return Horizontal(board, startRow, startCol, endCol);
                if(startCol == endCol)
                    return Vertical(board, startRow, startCol, endRow);
                return false;

            case "Pawn": 
                if(
                    Math.abs(startRow - endRow) == 1 || 
                    Math.abs(startRow - endRow == 2) && 
                    startCol == endCol)
                    return Vertical(board, startRow, startCol, endRow);
                return false;

            default: return false;
        }
    } else return false;
}

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