import { Diagonal, Horizontal, Vertical } from "../validators/checks/pathCheck";

function ValidatePath(board, startRow, startCol, endRow, endCol, piece){
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

export default ValidatePath;