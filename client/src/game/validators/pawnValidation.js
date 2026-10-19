import GetDestination from "../pieces/getDestination";
import { GetPiece } from "../pieces/getPiece";

export function ValidatePawnATK(board, startRow, startCol, endRow, endCol) {
    const piece = GetPiece(board, startRow, startCol);
    const target = GetDestination(board, startRow, startCol);
    if (piece == null) return false;
    if (target == null) return false;
    if (
        Math.abs(startRow - endRow) == 1 &&
        Math.abs(startCol - endCol) == 1 &&
        piece.color != target.color) {
        return true;
    } else return false;
}

export function ValidatePawnExtend(board, startRow, startCol, endRow) {
    const piece = GetPiece(board, startRow, startCol);
    const rowDistance = Math.abs(startRow - endRow);
    if (piece.hasMoved == false && rowDistance == 1) return true;
    else if (piece.hasMoved && (rowDistance == 1 || rowDistance == 2)) return true;
    else return false;
}

export function ValidatePawnPromo(endRow, piece) {
    if (piece.type != "Pawn") return false;
    if (endRow != 7 || endRow != 0) return false;
    return true;
}

export function ValidateEnPassant(board, startRow, startCol, endRow, endCol, lastMove){
    const piece = GetPiece(board, startRow, startCol);
    if (piece == null || piece.type != "Pawn") return false;
    if (lastMove == null || lastMove.type != "Pawn") return false; 
    
    const opponent = GetPiece(board, startRow, endCol);
    if (opponent == null || opponent.type != "Pawn") return false;

    const lastMoveDistance = Math.abs(lastMove.startRow - lastMove.endRow);
    const rowDistance = endRow - startRow;
    const colDistance = endCol - startCol;    
    const atkRowDistance = Math.abs(rowDistance);
    const atkColDistance = Math.abs(colDistance);
    const forward = (piece.color == "White") ? -1 : 1;

    if (lastMove.color == piece.color) return false;

    if (lastMoveDistance != 2) return false;

    if (lastMove.startCol != lastMove.endCol) return false;

    if (atkRowDistance != 1 || atkColDistance != 1) return false;

    if (rowDistance != forward) return false;

    if (GetDestination(board, endRow, endCol) != null) return false;

    if (startRow != lastMove.endRow) return false;

    if (endCol != lastMove.endCol) return false;

    if (opponent.color == piece.color) return false;

    return true;
}