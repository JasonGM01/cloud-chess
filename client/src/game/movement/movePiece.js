import { GetPiece, GetKing } from "../pieces/getPiece";
import { ValidateMove } from "../validators/validation";
import { CheckKing, TurnOrder } from "../validators/rules/rules";
import Simulation from "./simulation";

function MovePiece(board, startRow, startCol, endRow, endCol, turn, sim) {
    const piece = GetPiece(board, startRow, startCol);
    if (piece == null) return false;

    console.log(turn);
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

    console.log("sim check");
    // console.log(board);
    if (sim == false)
        if (!Simulation(board, endRow, piece, turn)) {
            board[startRow][startCol] = piece;
            board[endRow][endCol] = null;
            return false;
        };

    return true;
}

export default MovePiece;