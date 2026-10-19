import HasLegalMove from "../movement/hasLegalMove";
import MovePiece from "../movement/movePiece";
import { GetPiece } from "../pieces/getPiece";
import { Horizontal } from "./checks/pathCheck";
import { ValidatePawnATK } from "./pawnValidation";
import { ValidateMove } from "./validation";

export function ValidateKingSide(board, kingRow, kingCol, rookCol, King, turn) {
    // console.log("Kingside");
    if (Horizontal(board, kingRow, kingCol, rookCol) == false) return false;

    if (ValidateCheck(board, kingRow, kingCol, King)) return false;

    const test = structuredClone(board);

    if (MovePiece(test, kingRow, kingCol, kingRow, kingCol + 1, turn) == false) return false;

    const test2 = structuredClone(board);

    const test2King = test2[kingRow][kingCol];
    const test2Rook = test2[kingRow][rookCol];

    test2[kingRow][kingRow + 2] = test2Rook;
    test2[kingRow][kingRow + 1] = test2King;

    test2[kingRow][kingCol] = null;
    test2[kingRow][rookCol] = null;

    if (ValidateCheck(test2, kingRow, kingCol + 2, test2[kingRow][6])) return false;

    return true;
}

export function ValidateQueenSide(board, kingRow, kingCol, rookCol, King, turn) {
    // console.log("Queenside");
    if (Horizontal(board, kingRow, kingCol, rookCol) == false) return false;

    if (ValidateCheck(board, kingRow, kingCol, King)) return false;

    const test = structuredClone(board);

    if (MovePiece(test, kingRow, kingCol, kingRow, kingCol - 1, turn, true) == false) return false;

    const test2 = structuredClone(board);

    const test2King = test2[kingRow][kingCol];
    const test2Rook = test2[kingRow][rookCol];

    test2[kingRow][kingCol - 1] = test2Rook;
    test2[kingRow][kingCol - 2] = test2King;

    test2[kingRow][kingCol] = null;
    test2[kingRow][rookCol] = null;

    if (ValidateCheck(test2, kingRow, kingCol - 2, test2[kingRow][2])) return false;

    return true;
}

export function ValidateCheck(board, row, col) {
    const piece = GetPiece(board, row, col);

    if (piece == null || piece.type != "King") return false;
    for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
            let square = GetPiece(board, i, j);
            if (square == null) continue;
            if (square.color == piece.color) continue;
            if (square.type == "Pawn") return ValidatePawnATK(board, i, j, row, col, square, piece);
            else { 
                // console.log("Validate check move");
                // console.log(piece);
                // console.log(ValidateMove(board, i, j, row, col, square.type, square.color) == false ? true : false);
                // console.log("sim 4");
                // console.log(ValidateMove(board, i, j, row, col, square.type, square.color) == false ? true : false);
                if (ValidateMove(board, i, j, row, col, square.type, square.color)){
                    return true;
                };
            }
        }
    }
    // console.log("no check");
    return false;
}

export function ValidateCheckmate(board, row, col, turn, lastMove) {
    const piece = GetPiece(board, row, col);
    // console.log("Check");
    // console.log(ValidateCheck(board, row, col, piece) && (HasLegalMove(board, piece, turn, lastMove)));
    return (
        ValidateCheck(board, row, col, piece) &&
        HasLegalMove(board, piece, turn, lastMove));
}

export function ValidateStalemate(board, row, col, turn, lastMove) {
    const piece = GetPiece(board, row, col);
    // console.log(!ValidateCheck(board, row, col, piece) == true && HasLegalMove(board, piece, turn, lastMove) == false);
    return (
        !ValidateCheck(board, row, col, piece) &&
        HasLegalMove(board, piece, turn, lastMove));
}

export function ValidateCastling(board, startRow, startCol, endRow, endCol, turn) {
    const piece1 = GetPiece(board, startRow, startCol);
    const piece2 = GetPiece(board, endRow, endCol);
    if (piece1 == null || piece2 == null) return false;

    const King = piece1.type == "King" ? piece1 : piece2;
    const kingRow = piece1.type == "King" ? startRow : endRow;
    const kingCol = piece1.type == "King" ? startCol : endCol;

    const Rook = piece1.type == "Rook" ? piece1 : piece2;
    const rookRow = piece1.type == "Rook" ? startRow : endRow;
    const rookCol = piece1.type == "Rook" ? startCol : endCol;

    if (King == null || Rook == null) return false;

    if (King.color != turn) return false;

    if (King.type != "King" || Rook.type != "Rook") return false;

    if (board[kingRow][kingCol] != King) return false;

    if (board[rookRow][rookCol] != Rook) return false;

    if (King.color != Rook.color) return false;

    if (kingRow != rookRow) return false;

    if (kingCol != 4) return false;

    if (rookCol != 0 && rookCol != 7) return false;

    if ((King.color == "White" && kingRow != 7) || (King.color == "Black" && kingRow != 0)) return false;

    if (King.hasMoved == true || Rook.hasMoved == true) return false;

    if (kingCol < rookCol) {
        //execute
        //console.log("Kingside");
        if (ValidateKingSide(board, kingRow, kingCol, rookCol, King, turn, true) == false) return false;
        board[kingRow][kingCol + 2] = King;
        board[rookRow][kingCol + 1] = Rook
        board[kingRow][kingCol] = null;
        board[rookRow][rookCol] = null
        return true;

    } else if (kingCol > rookCol) {
        //execute
        //console.log("Queenside");
        if (ValidateQueenSide(board, kingRow, kingCol, rookCol, King, turn, true) == false) return false;
        board[kingRow][kingCol-2] = King;
        board[rookRow][kingCol-1] = Rook;
        board[kingRow][kingCol] = null;
        board[rookRow][rookCol] = null;
        return true;

    } else return false;
}