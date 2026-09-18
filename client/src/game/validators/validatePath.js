import GetPiece from "../pieces/getPiece";
import { Diagonal, Horizontal, Vertical } from "./checks/pathChecks";

function ValidatePath(board, startRow, startCol, endRow, endCol){
    const piece = GetPiece(board, startRow, startCol);

    console.log(piece);
    if (piece != null) {
        switch (piece) {

            case "Rook":
                if (startRow == endRow && startCol != endCol)
                    return Horizontal(board, startRow, startCol, endRow, endCol);
                if(startCol == endCol && startRow != endRow)
                    return Vertical(board, startRow, startCol, endRow, endCol)
                return false;

            case "Bishop": 
                if(Math.abs(startRow - endRow) == Math.abs(startCol - endCol))
                    return Diagonal(board, startRow, startCol, endRow, endCol);
                return false;

            case "Knight": 
                if(Math.abs(startRow - endRow) == 2 && Math.abs(startCol - endCol) == 1)
                    return true;
                else if(Math.abs(startRow - endRow) == 1 && Math.abs(startCol - endCol) == 2)
                    return true;
                return false;

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
                if(Math.abs(startRow - endRow) == 1 && startCol == endCol)
                    return Vertical(board, startRow, startCol, endRow, endCol);
                return false;

            default: return false;
        }
    } else return false;
}

export default ValidatePath;