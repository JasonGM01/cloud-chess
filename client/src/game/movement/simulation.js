
import { GetKing } from "../pieces/getPiece";
import Promote from "../pieces/promote";
import { CheckKing, Checkmate, Stalemate } from "../rules/kingRules";
import { PawnPromo } from "../rules/pawnRules";

function Simulation(board, endRow, piece, turn, lastMove) {
    if (piece == null) return false;

    const oppColor = piece.color == "White" ? "Black" : "White";

    const oppKingData = GetKing(board, oppColor);
    const oppKing = oppKingData[0];
    const oppRow = oppKingData[1];
    const oppCol = oppKingData[2];
    // console.log("sim check");
    // console.log(board);
    piece.hasMoved = true;

    const oppTurn = turn == "White" ? "Black" : "White";
    // console.log(oppTurn);

    if (PawnPromo(endRow, piece)) return Promote(piece);
    // console.log("Check", CheckKing(board, oppRow, oppCol, oppKing));
    if (CheckKing(board, oppRow, oppCol, oppKing)) {
        // console.log("Checkmate");
        if (Checkmate(board, oppRow, oppCol, oppKing, turn, lastMove)) {
            // console.log("Checkmate", Checkmate(board, oppRow, oppCol, oppKing, "Black"))
            return false;
        }

        return true;
    }

    // console.log("Stalemate check");
    if (Stalemate(board, oppRow, oppCol, oppKing, oppTurn)) {
        console.log("Stalemate");
        return false;
    }
    // console.log("No stalemate");
    return true;
}

export default Simulation;