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