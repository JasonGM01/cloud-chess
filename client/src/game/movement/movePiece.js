import { Rook, Bishop, Knight, King, Queen, Pawn } from "../pieces/pieces";
import { GetPiece, GetKing } from "../pieces/getPiece";
import ValidateMove from "../validators/validateMove";
import { CheckKing, PawnPromo, TurnOrder } from "../validators/rules/rules";
import Promote from "../pieces/promote";

const moves = {
    Rook,
    Bishop,
    Knight,
    King, 
    Queen,
    Pawn
};

function MovePiece(board, startRow, startCol, endRow, endCol, turn){  
    const piece = GetPiece(board, startRow, startCol);

    if(!TurnOrder(turn, piece)) return false;
    
    // console.log("Validation start");
    if(!ValidateMove(board, startRow, startCol, endRow, endCol, piece, turn)) return false;
  
    const execute = moves[piece.type];
    execute(startRow, startCol, endRow, endCol);
    
    // console.log("execute");
    board[endRow][endCol] = piece;
    board[startRow][startCol] = null;
    
    const KingData = GetKing(board, piece.color);
    const King = KingData[0];
    const row = KingData[1];
    const col = KingData[2];
    
    if(CheckKing(board, row, col, King)){ 
        board[startRow][startCol] = piece;
        board[endRow][endCol] = null
        return false;}

    piece.hasMoved = true;
    
    if((endCol == 0 || endCol == 7) && PawnPromo(endRow, piece)) return Promote(piece);

    return true;
}

export default MovePiece;