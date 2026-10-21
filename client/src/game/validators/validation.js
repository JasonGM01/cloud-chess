import GetDestination from "../pieces/getDestination";
import { Diagonal, Horizontal, Vertical } from "../validators/checks/pathCheck";
import { Rook, Bishop, Knight, King, Queen, Pawn } from "../pieces/pieces";
// import { GetPiece } from "../pieces/getPiece";

export function ValidateBoard(startRow, startCol, endRow, endCol) {
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

export function ValidateDestination(board, endRow, endCol, color) {
    const destination = GetDestination(board, endRow, endCol, color);

    if (destination == null) return true;
    else if (destination.color == color) return false;
    else return true;
}

export function ValidateFirstTurn(turn, color){
    return turn == color;
}

export function ValidateMove(board, startRow, startCol, endRow, endCol, type, color) {

    // console.log("Board");
    if (ValidateBoard(startRow, startCol, endRow, endCol) == false) return false;

    // console.log("Same space check");
    if (startRow == endRow && startCol == endCol) return false;

    // console.log("Get piece");
    if (type == null) return false;

    // console.log("Pattern Validation");
    if (ValidatePattern(startRow, startCol, endRow, endCol, type) == false) return false;

    // console.log("Path validation");
    // console.log(GetPiece(board, startRow, startCol));
    // console.log(startRow, startCol);
    // console.log(endRow, endCol);
    if (ValidatePath(board, startRow, startCol, endRow, endCol, type) == false) {
        // console.log("Failed path validation");
        // console.log(" ");
        return false;
    }

    // console.log("Destination check");
    if (ValidateDestination(board, endRow, endCol, color) == false) {
        // console.log("Failed destination check");
        // console.log(" ");
        return false;
    }

    console.log("Valid");
    console.log(" ");
    return true;
}

export function ValidatePath(board, startRow, startCol, endRow, endCol, type) {
    const rowDistance = Math.abs(endRow - startRow);
    const colDistance = Math.abs(endCol - startCol);
    let piece_type = type;
    // console.log(piece_type);
    if (piece_type != null) {
        switch (piece_type) {

            case "Rook":
                // console.log("Rook path check");
                if (startRow == endRow && startCol != endCol){
                    // console.log("Horizontal");
                    if (Horizontal(board, startRow, startCol, endCol) == false) return false;
                    return true;
                }
                else if (startCol == endCol && startRow != endRow){
                    // console.log("Vertical");
                    if (Vertical(board, startRow, startCol, endRow) == false) return false;
                    return true;
                }
                // console.log("Rook fail");
                return false;

            case "Bishop":
                // console.log("Bishop path check");
                if (Math.abs(startRow - endRow) == Math.abs(startCol - endCol)){
                    // console.log("Diagonal")
                    if (Diagonal(board, startRow, startCol, endRow, endCol) == false) return false;
                    return true;
                }
                // console.log("Bishop fail");
                return false;

            case "Knight":
                return true;

            case "Queen":
                // console.log("Queen path check");
                // console.log(Math.abs(startRow - endRow));
                // console.log(Math.abs(startCol - endCol));
                if (ValidatePath(board, startRow, startCol, endRow, endCol, "Bishop")) return true;
                if (ValidatePath(board, startRow, startCol, endRow, endCol, "Rook")) return true;
                // console.log("Queen fail");
                return false;

            case "King":
                // console.log("King path check");
                // console.log(rowDistance, colDistance);
                if(rowDistance == 1 && colDistance == 1){
                    // console.log("As queen");
                    if(ValidatePath(board, startRow, startCol, endRow, endCol, "Queen")) return true;
                } else if ((rowDistance == 1 && colDistance == 0) || (rowDistance == 0 && colDistance == 1)){
                    // console.log("As rook");
                    if(ValidatePath(board, startRow, startCol, endRow, endCol, "Rook")) return true;
                }
                // console.log("King fail");
                return false;

            case "Pawn":
                // console.log("Pawn path check");
                if (
                    rowDistance == 1 ||
                    rowDistance == 2 &&
                    colDistance == 0){
                    if (Vertical(board, startRow, startCol, endRow) == false) return false;
                    return true;
                    }
                    // console.log("Pawn fail");
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

export function ValidatePattern(startRow, startCol, endRow, endCol, type) {
    if (type == null) return false;
    // console.log(type);
    const pieceMovement = move[type];
    return(
        type == "Pawn" ? 
        pieceMovement(startCol, endCol) : 
        pieceMovement(startRow, startCol, endRow, endCol)
    );
}

export function ValidateTurn(turn, color, lastMoveColor){
    return (turn == color && turn != lastMoveColor);
}
