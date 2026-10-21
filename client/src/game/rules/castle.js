// import GetDestination from "../pieces/getDestination";
import { GetPiece } from "../pieces/getPiece";

function Castle(board, startRow, startCol, endRow, endCol){
    const piece1 = GetPiece(board, startRow, startCol);
    const piece2 = GetPiece(board, endRow, endCol);
    const kingCol = startCol == 4 ? startCol : endCol; 
    const rookCol = (startCol == 7 || startCol == 0) ? startCol : endCol;
    
    const King = piece1.type == "King" ? piece1 : piece2;
    const Rook = piece1.type == "Rook" ? piece1 : piece2;
    
    // console.log("Side");
    if(kingCol < rookCol){
        // console.log("KingSide");
        board[startRow][kingCol + 2] = King;
        board[startRow][kingCol + 1] = Rook;
        board[startRow][kingCol] = null;
        board[endRow][rookCol] = null;
    } else if(kingCol > rookCol){
        // console.log("QueenSide");
        board[startRow][kingCol - 2] = King;
        board[startRow][kingCol - 1] = Rook
        board[startRow][kingCol] = null;
        board[endRow][rookCol] = null;
    }
}

export default Castle;