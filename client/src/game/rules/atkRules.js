import { GetPiece } from "../pieces/getPiece";

export function EnPassant(board, startRow, startCol, endRow, endCol, lastMove){
    const pawn = GetPiece(board, startRow, startCol);
    if (lastMove == null) return false;

    board[startRow][startCol] = null;
    board[endRow][endCol] = pawn;
    board[lastMove.endRow][lastMove.endCol] = null;

    console.log("Captured pawn");
    return true;
}

export function Attack(board, startRow, startCol, endRow, endCol){
    const piece = GetPiece(board, startRow, startCol);

    board[startRow][startCol] = null;
    board[endRow][endCol] = piece;

    console.log("Captured opponent");
    return true;
}