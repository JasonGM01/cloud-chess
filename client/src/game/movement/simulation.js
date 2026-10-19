import { GetKing } from "../pieces/getPiece";
import Promote from "../pieces/promote";
import { ValidateCheck, ValidateCheckmate, ValidateStalemate } from "../validators/kingValidation";
import { ValidatePawnPromo } from "../validators/pawnValidation";

function Simulation(board, endRow, piece, turn, lastMove) {
    if (piece == null) return false;

    const oppColor = piece.color == "White" ? "Black" : "White";

    const oppKingData = GetKing(board, oppColor);
    const oppKing = oppKingData[0];
    const oppRow = oppKingData[1];
    const oppCol = oppKingData[2];
    // console.log("sim check 2");
    // console.log(board);
    piece.hasMoved = true;

    const oppTurn = turn == "White" ? "Black" : "White";
    // console.log(oppTurn);

    if (ValidatePawnPromo(endRow, piece)) return Promote(piece);

    // console.log("Check", CheckKing(board, oppRow, oppCol, oppKing));
    if (ValidateCheck(board, oppRow, oppCol, oppKing)) {
        // console.log("validate Checkmate");
        if (ValidateCheckmate(board, oppRow, oppCol, oppKing, turn, lastMove)) {
            // console.log(ValidateCheckmate(board, oppRow, oppCol, oppKing, turn, lastMove));
            return false;
        }
        // console.log("no checkmate");
    }

    // console.log("Stalemate check");
    // console.log(oppKing);
    // console.log(oppTurn);
    if (ValidateStalemate(board, oppRow, oppCol, oppKing, oppTurn)) {
        // console.log("Stalemate");
        return false;
    }
    // console.log("No stalemate");
    return true;
}

export default Simulation;