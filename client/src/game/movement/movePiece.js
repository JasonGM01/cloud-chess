import { GetPiece, GetKing } from "../pieces/getPiece";
import { ValidateMove } from "../validators/validation";
import { CheckKing, Checkmate, PawnPromo, TurnOrder } from "../validators/rules/rules";
import Promote from "../pieces/promote";

function MovePiece(board, startRow, startCol, endRow, endCol, turn, sim) {
    const piece = GetPiece(board, startRow, startCol);
    if (piece == null) return false;
    
    const oppColor = piece.color == "White" ? "Black" : "White";

    const oppKingData = GetKing(board, oppColor);
    const oppKing = oppKingData[0];
    const oppRow = oppKingData[1];
    const oppCol = oppKingData[2];
    
    if (!TurnOrder(turn, piece)) return false;

    // console.log("Validation start");
    if (!ValidateMove(board, startRow, startCol, endRow, endCol, piece, turn)) return false;

    // console.log("execute");
    board[endRow][endCol] = piece;
    board[startRow][startCol] = null;

    const KingData = GetKing(board, piece.color);
    const King = KingData[0];
    const row = KingData[1];
    const col = KingData[2];

    // console.log("Check");
    if (CheckKing(board, row, col, King)) {
        // console.log("Check");
        board[startRow][startCol] = piece;
        board[endRow][endCol] = null
        return false;
    }

    // console.log("sim check");
    // console.log(board);
    if (sim == false) {
        piece.hasMoved = true;

        if (PawnPromo(endRow, piece)) return Promote(piece);
        // console.log("Check", CheckKing(board, oppRow, oppCol, oppKing));
        if (CheckKing(board, oppRow, oppCol, oppKing)) {
            // console.log("Checkmate");
            if (Checkmate(board, oppRow, oppCol, oppKing, "Black")) {
                // console.log("Checkmate", Checkmate(board, oppRow, oppCol, oppKing, "Black"));
                return false;
            }
            return true;
        }
        
    }return true;
}

export default MovePiece;