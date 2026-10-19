// import GetDestination from "../pieces/getDestination";
import GetDestination from "../pieces/getDestination";
import { GetPiece, GetKing } from "../pieces/getPiece";
import { EnPassant } from "../rules/atkRules";
import { ValidateCheck } from "../validators/kingValidation";
import { ValidateEnPassant } from "../validators/pawnValidation";
import { ValidateFirstTurn, ValidateMove, ValidateTurn } from "../validators/validation";
import Simulation from "./simulation";

function MovePiece(board, startRow, startCol, endRow, endCol, turn, sim, lastMove) {
    const piece = GetPiece(board, startRow, startCol);
    if (piece == null) return false;

    const destination = GetDestination(board, endRow, endCol);
    const KingData = GetKing(board, piece.color);
    // const King = KingData[0];
    const row = KingData[1];
    const col = KingData[2];

    if (lastMove != null) {
        if (ValidateTurn(turn, piece.color, lastMove.color) == false) {
            return false;
        }
    }
    if (lastMove == null) {
        if (ValidateFirstTurn(turn, piece.color) == false) return false;
    }

    if (lastMove != null && destination == null && piece.type == "Pawn") {
        if (ValidateEnPassant(board, startRow, startCol, endRow, endCol, lastMove) == false) {
            console.log("Not en passant");
            return false;
        }
        console.log("En Passant");
        EnPassant(board, startRow, startCol, endRow, endCol, lastMove);
    }
    else if (piece.type != null) {
        console.log("Validate reg move");
        if (ValidateMove(board, startRow, startCol, endRow, endCol, piece.type, piece.color) == false) {
            return false;
        }
        console.log("Execute");
        board[startRow][startCol] = null;
        board[endRow][endCol] = piece;
    }

    if (ValidateCheck(board, row, col)) {
        console.log("Check");
        board[startRow][startCol] = piece;
        board[endRow][endCol] = null
        return false;
    }

    if (sim == false) {
        // console.log("sim 1");
        if (Simulation(board, endRow, piece, turn, lastMove) == false) {
            board[startRow][startCol] = piece;
            board[endRow][endCol] = null;
            return false;
        };
    }

    console.log("accepted");
    return true;
}

export default MovePiece;