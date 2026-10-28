// import GetDestination from "../pieces/getDestination";
import GetDestination from "../pieces/getDestination";
import { GetPiece, GetKing } from "../pieces/getPiece";
import { Attack, EnPassant } from "../rules/atkRules";
import Castle from "../rules/castle";
import { ValidateCastling, ValidateCheck } from "../validators/kingValidation";
import { ValidateEnPassant, ValidatePawnATK } from "../validators/pawnValidation";
import { ValidateFirstTurn, ValidateMove, ValidateTurn } from "../validators/validation";
import Simulation from "./simulation";

function MovePiece(board, startRow, startCol, endRow, endCol, turn, sim, lastMove) {
    const piece = GetPiece(board, startRow, startCol);
    if (piece == null) return false;

    const rowDistance = Math.abs(startRow - endRow);
    const colDistance = Math.abs(startCol - endCol);

    const destination = GetDestination(board, endRow, endCol);
    const KingData = GetKing(board, piece.color);
    // const King = KingData[0];
    const row = KingData[1];
    const col = KingData[2];

    // console.log("last turn check");
    if (lastMove != null) {
        if (ValidateTurn(turn, piece.color, lastMove.color) == false) {
            return false;
        }
    }
    else if (lastMove == null) {
        if (ValidateFirstTurn(turn, piece.color) == false) return false;
    }
    
    // console.log("move type");
    if (lastMove != null && destination == null && piece.type == "Pawn" && rowDistance == 1 && colDistance == 1) {
        if(sim == false){
        console.log("En Passant");}
        if (ValidateEnPassant(board, startRow, startCol, endRow, endCol, lastMove) == false) {
            console.log("Not en passant");
            return false;
        }

        EnPassant(board, startRow, startCol, endRow, endCol, lastMove);
    }

    else if (piece.type == "Pawn" && destination != null && (destination.color != piece.color)){
        if(sim == false){
            console.log("Pawn attack");}
        if(ValidatePawnATK(board, startRow, startCol, endRow, endCol) == false) {
            if(sim == false) {
            console.log("Pawn attack fail");}
            return false;
        }
        Attack(board, startRow, startCol, endRow, endCol);
        if(destination.type == "King"){
            console.log("King dethroned");
            alert("Checkmate");
        }
    }
    
    else if ((piece.type == "King" || piece.type == "Rook") && destination != null && (piece.color == destination.color)){
        if(sim == false){
        console.log("Castle");}
        if (ValidateCastling(board, startRow, startCol, endRow, endCol, turn) == false) return false;
        Castle(board, startRow, startCol, endRow, endCol);
    } 
    
    else if (piece != null && destination != null && (destination.color != piece.color)){
        if(sim == false){
        console.log("Attack");}
        if (ValidateMove(board, startRow, startCol, endRow, endCol, piece.type, piece.color) == false) {
            if(sim == false){
            console.log("Attack failed");}
            return false;
        }
        // console.log("attack success")
        Attack(board, startRow, startCol, endRow, endCol, sim);
        if(destination.type == "King"){
            console.log("King dethroned");
            alert("Checkmate");
        }
        // console.log("Captured opponent: ", destination);
    } 
    
    else if (piece.type != null) {
        // if(sim == false){
        // console.log("Reg move");}
        // console.log(piece);
        if (ValidateMove(board, startRow, startCol, endRow, endCol, piece.type, piece.color) == false) {
            // console.log("Failed move validation");
            return false;
        }
        // console.log("Execute");
        board[startRow][startCol] = null;
        board[endRow][endCol] = piece;
    }

    // console.log("Check 1");
    if (ValidateCheck(board, row, col)) {
        // console.log("Check 4");
        board[startRow][startCol] = piece;
        board[endRow][endCol] = null
        return false;
    }
    // console.log("No check 2");

    if (sim == false) {
        // console.log("sim 1");
        if (Simulation(board, startRow, startCol, endRow, endCol, piece, turn, lastMove) == false) {
            // board[startRow][startCol] = piece;
            // board[endRow][endCol] = null;
            return false;
        };
    }

    piece.hasMoved = true;
    // console.log("accepted");
    return true;
}

export default MovePiece;