import HasLegalMove from "../../movement/hasLegalMove";
import { GetPiece } from "../../pieces/getPiece";
import { ValidateMove } from "../validation";

export function TurnOrder(turn, piece) {
    return turn == piece.color;
}

export function PawnATK(startRow, startCol, endRow, endCol, pawn, target) {
    if (!pawn) return false;
    if (!target) return false;
    if (
        Math.abs(startRow - endRow) == 1 &&
        Math.abs(startCol - endCol) == 1 &&
        pawn.color != target.color) {
        return true;
    } else return false;
}

export function PawnExtend(startRow, endRow, piece) {
    const rowDistance = Math.abs(startRow - endRow);
    if (!piece.hasMoved && rowDistance == 1) return true;
    else if (piece.hasMoved && (rowDistance == 1 || rowDistance == 2)) return true;
    else return false;
}

export function PawnPromo(endRow, piece) {
    if (!piece.type == "Pawn") return false;
    if (endRow != 7 || endRow != 0) return false;
    return true;
}

export function CheckKing(board, row, col, piece) {
    if (!piece.type == "King") return false;
    for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
            let square = GetPiece(board, i, j);
            if (square == null) continue;
            if (square.color == piece.color) continue;
            if (square.type == "Pawn") return PawnATK(i, j, row, col, square, piece);
            else return ValidateMove(board, i, j, row, col, square);
        }
    }
    return false;
}

export function Checkmate(board, row, col, piece, turn) {
    // console.log(CheckKing(board, row, col, piece));
    // console.log(!ValidateLegal(board, piece, turn));
    return (
        CheckKing(board, row, col, piece) &&
        !HasLegalMove(board, piece, turn));
}

export function Stalemate(board, row, col, piece, turn) {
    // console.log(!CheckKing(board, row, col, piece) && !HasLegalMove(board, piece, turn));
    return (
        !CheckKing(board, row, col, piece) &&
        !HasLegalMove(board, piece, turn));
}

export function Castling(board, row1, col1, row2, col2, piece1, piece2, turn) {
    const King = piece1.type == "King" ? piece1 : piece2;
    const kingRow = piece1.type == "King" ? row1 : row2;
    const kingCol = piece1.type == "King" ? col1 : col2;

    const Rook = piece1.type == "Rook" ? piece1 : piece2;
    const rookRow = piece1.type == "Rook" ? row1 : row2;
    const rookCol = piece1.type == "Rook" ? col1 : col2;

    if (King.type != "King" || Rook.type != "Rook") return false;

    if (King.color != Rook.color) return false;

    if (kingRow != rookRow) return false;

    if (King.hasMoved == true || Rook.hasMoved == true) return false;

    if (CheckKing(board, kingRow, kingCol, King, turn)) return false;

    if (kingCol < rookCol) {
        if (
            (CheckKing(board, kingRow, kingCol + 1, King, turn)) ||
            (CheckKing(board, kingRow, kingCol + 2, King, turn))
        ) return false;
    } else if (kingCol > rookCol) {
        if (
            (CheckKing(board, kingRow, kingCol - 1, King, turn)) ||
            (CheckKing(board, kingRow, kingCol - 2, King, turn))
        ) return false;
    } else return true;

}
