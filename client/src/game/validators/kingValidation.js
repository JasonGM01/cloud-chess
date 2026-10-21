import HasLegalMove from "./hasLegalMove";
import MovePiece from "../movement/movePiece";
import { GetPiece } from "../pieces/getPiece";
import { Horizontal} from "./checks/pathCheck";
import { ValidatePawnATK } from "./pawnValidation";
import { ValidateMove } from "./validation";

export function ValidateKingSide(board, kingRow, kingCol, rookCol, King, turn, lastMove) {
    console.log("Kingside");
    // console.log("First row check");
    if (Horizontal(board, kingRow, kingCol, rookCol) == false) return false;

    if (ValidateCheck(board, kingRow, kingCol, King)) return false;
    
    const test = structuredClone(board);

    // console.log("Second row check");
    if (MovePiece(test, kingRow, kingCol, kingRow, kingCol + 1, turn, true, lastMove) == false) return false;

    if (ValidateCheck(test, kingRow, kingCol + 1)) return false;
    
    const test2 = structuredClone(test);

    const test2King = test2[kingRow][kingCol+1];
    const test2Rook = test2[kingRow][rookCol];

    test2[kingRow][kingRow + 2] = test2Rook;
    test2[kingRow][kingRow + 1] = test2King;

    test2[kingRow][kingCol] = null;
    test2[kingRow][rookCol] = null;

    // console.log("Third row check");
    // if (MovePiece(test, kingRow, kingCol, kingRow, kingCol + 2, turn, true, lastMove) == false) return false;
    
    if (ValidateCheck(test2, kingRow, kingCol + 2)) return false;
   
    // console.log("Pass");
    return true;
}

export function ValidateQueenSide(board, kingRow, kingCol, rookCol, King, turn) {
    // console.log("Queenside");
    // console.log("first row check");
    if (Horizontal(board, kingRow, kingCol, rookCol) == false) return false;

    if (ValidateCheck(board, kingRow, kingCol, King)) return false;

    const test = structuredClone(board);

    // console.log("second row check");
    if (MovePiece(test, kingRow, kingCol, kingRow, kingCol - 1, turn, true) == false) return false;

    if(ValidateCheck(test, kingRow, kingCol - 1)) return false;

    const test2 = structuredClone(test);
    const test2King = test2[kingRow][kingCol-1];
    const test2Rook = test2[kingRow][rookCol];

    test2[kingRow][kingCol - 1] = test2Rook;
    test2[kingRow][kingCol - 2] = test2King;

    test2[kingRow][kingCol] = null;
    test2[kingRow][rookCol] = null;

    // console.log("Third row check");
    // if (MovePiece(test, kingRow, kingCol, kingRow, kingCol - 2, turn, true) == false) {
    //     console.log("failed move");
    //     return false;
    //     }
    
    // console.log(test2);
    if (ValidateCheck(test2, kingRow, kingCol - 2)) return false;
    // console.log("Passed validation 3")

    return true;
}

export function ValidateCheck(board, row, col) {
    const piece = GetPiece(board, row, col);

    // console.log("Check 2");
    if (piece == null || piece.type != "King") return false;
    for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
            let square = GetPiece(board, i, j);
            // console.log(square);
            if (square == null) continue;
            if (square.color == piece.color) continue;
            if (square.type == "Pawn") {
                // console.log("Pawn atk");
                if (ValidatePawnATK(board, i, j, row, col, square, piece)) {
                    // console.log("Pawn can attack king");
                    return true;
                }
            }
            else if(square.type != "Pawn") { 
                // console.log("Validate move");
                // console.log(row, col);
                // console.log(square);
                // console.log(i, j);
                // console.log(" ");
                if (ValidateMove(board, i, j, row, col, square.type, square.color)){
                    // console.log(square);
                    // console.log("check 2");
                    return true;
                }
            }
            // console.log("not a piece");
            // console.log(square);
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
        ValidateCheck(board, row, col) &&
        HasLegalMove(board, piece, turn, lastMove));
}

export function ValidateStalemate(board, row, col, turn, lastMove) {
    const piece = GetPiece(board, row, col);
    // console.log(HasLegalMove(board, piece, turn, lastMove));
    return (
        ValidateCheck(board, row, col) &&
        !HasLegalMove(board, piece, turn, lastMove));
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

    // console.log("Side");
    if (kingCol < rookCol) {
        //execute
        // console.log("Kingside");
        if (ValidateKingSide(board, kingRow, kingCol, rookCol, King, turn, true) == false) {
            // console.log("fail to execute");
            return false;
        }
        // board[kingRow][kingCol + 2] = King;
        // board[rookRow][kingCol + 1] = Rook
        // board[kingRow][kingCol] = null;
        // board[rookRow][rookCol] = null;
        return true;

    } else if (kingCol > rookCol) {
        //execute
        // console.log("Queenside");
        if (ValidateQueenSide(board, kingRow, kingCol, rookCol, King, turn, true) == false) return false;
        // board[kingRow][kingCol-2] = King;
        // board[rookRow][kingCol-1] = Rook;
        // board[kingRow][kingCol] = null;
        // board[rookRow][rookCol] = null;
        return true;

    } else return false;
}