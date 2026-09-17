import Diagonal from '../movement/diagonal'
import Horizontal from "../movement/horizontal";
import Vertical from "../movement/vertical";
import Piece from "../pieces/piece";

function Movement(board, startRow, startCol, endRow, endCol) {
    if (startRow < 0 || 
        startRow > 7 || 
        startCol < 0 || 
        startCol > 7 || 
        endRow < 0 || 
        endRow > 7 || 
        endCol < 0 || 
        endCol > 7) 
        return false;
    
    if (startRow == endRow && 
        startCol == endCol) 
        return false;

    const piece = Piece(board, startRow, startCol);

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
    }
}

export default Movement;