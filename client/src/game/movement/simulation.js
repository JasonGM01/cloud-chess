import { GetKing } from "../pieces/getPiece";
import Promote from "../pieces/promote";
import { ValidateCheck, ValidateCheckmate, ValidateStalemate } from "../validators/kingValidation";
import { ValidatePawnPromo } from "../validators/pawnValidation";

function Simulation(board, startRow, startCol, endRow, endCol, piece, turn) {

    if (piece == null) return false;
    const currentMove = {
        type: piece.type,
        color: piece.color,
        startRow: startRow,
        startCol: startCol,
        endRow: endRow,
        endCol: endCol
    };
    const oppColor = piece.color == "White" ? "Black" : "White";

    const oppKingData = GetKing(board, oppColor);
    // const oppKing = oppKingData[0];
    const oppRow = oppKingData[1];
    const oppCol = oppKingData[2];
    // console.log("sim check 2");
    // console.log(board);
    piece.hasMoved = true;

    const oppTurn = turn == "White" ? "Black" : "White";
    // console.log(oppTurn);

    if (ValidatePawnPromo(endRow, piece)) return Promote(piece);

    // console.log("Check", CheckKing(board, oppRow, oppCol, oppKing));
    // console.log("sim 2");
    // console.log("Validate check");
    if (ValidateCheck(board, oppRow, oppCol)) {
        // console.log("validate Checkmate");
        if (ValidateCheckmate(board, oppRow, oppCol, oppTurn, currentMove)) {
            // console.log("Checkmate");
            // console.log(ValidateCheckmate(board, oppRow, oppCol, oppKing, turn, lastMove));
            return false;
        }
        // console.log("no checkmate");
    }

    // console.log(oppKing);
    // console.log(oppTurn);
    // console.log("sim 3");
    // console.log("Stalemate check");
    if (ValidateStalemate(board, oppRow, oppCol, oppTurn, currentMove)) {
        // console.log("Stalemate");
    }
    // console.log("No stalemate");

    // console.log("Sim pass");
    return true;
}

export default Simulation;