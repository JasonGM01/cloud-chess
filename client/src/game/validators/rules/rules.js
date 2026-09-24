import { GetPiece } from "../../pieces/getPiece";
import ValidateMove from "../validateMove";

export function TurnOrder(turn, piece){
    return turn == piece.color;
}

export function PawnATK(startRow, startCol, endRow, endCol, pawn, target){
    
    if(!pawn) return false;
    if(!target) return false;

    if(
        Math.abs(startRow - endRow) == 1 && 
        Math.abs(startCol - endCol) == 1 && 
        pawn.color != target.color){
        return true;
    } else return false;
}

export function PawnExtend(startRow, endRow, piece){
    const rowDistance = Math.abs(startRow - endRow);

    if(!piece.hasMoved && rowDistance == 1) return true;
    else if(piece.hasMoved && (rowDistance == 1 || rowDistance == 2)) return true;
    else return false;
}

export function PawnPromo(endRow, piece){
    if(!piece.type == "Pawn") return false;
    if(endRow != 7 || endRow != 0) return false;
    return true;
}

export function CheckKing(board, row, col, piece){
    if(!piece.type == "King") return false;
    for(let i = 0; i <= 7; i++){
        for(let j = 0; j <= 7; j++){
            let square = GetPiece(board, i, j);
            if(square == null) continue;
            if(square.color == piece.color) continue;
            if(square.type == "Pawn") return PawnATK(i, j, row, col, square, piece);
            else return ValidateMove(board, i, j, row, col, square);
        }
    }
    return false;
}