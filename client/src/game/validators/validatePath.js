import { Diagonal, Horizontal, Vertical } from "../validators/checks/pathCheck";

function ValidatePath(board, startRow, startCol, endRow, endCol, piece){
    let piece_type = piece.type;
    console.log(piece_type);
    if (piece_type != null) {
        switch (piece_type) {

            case "Rook":
                if (startRow == endRow && startCol != endCol)
                    return Horizontal(board, startRow, startCol, endRow, endCol);
                else if(startCol == endCol && startRow != endRow)
                    return Vertical(board, startRow, startCol, endRow, endCol)
                return false;

            case "Bishop": 
                if(Math.abs(startRow - endRow) == Math.abs(startCol - endCol))
                    return Diagonal(board, startRow, startCol, endRow, endCol);
                return false;

            case "Knight": 
                return true;

            case "Queen": 
                if(Math.abs(startRow - endRow) == Math.abs(startCol - endCol))
                    return Diagonal(board, startRow, startCol, endRow, endCol);
                if(startRow == endRow)
                    return Horizontal(board, startRow, startCol, endRow, endCol);
                if(startCol == endCol)
                    return Vertical(board, startRow, startCol, endRow, endCol);
                return false;

            case "King": 
                if(Math.abs(startRow - endRow) == Math.abs(startCol - endCol))
                    return Diagonal(board, startRow, startCol, endRow, endCol);    
                if(startRow == endRow)
                    return Horizontal(board, startRow, startCol, endRow, endCol)
                if(startCol == endCol)
                    return Vertical(board, startRow, startCol, endRow, endCol);
                return false;

            case "Pawn": 
                if(
                    Math.abs(startRow - endRow) == 1 || 
                    Math.abs(startRow - endRow == 2) && 
                    startCol == endCol)
                    return Vertical(board, startRow, startCol, endRow, endCol);
                return false;

            default: return false;
        }
    } else return false;
}

export default ValidatePath;