export function Bishop(startRow, startCol, endRow, endCol){
    if(Math.abs(startRow - endRow) == Math.abs(startCol - endCol)) return true;
    else return false; 
}

export function King(startRow, startCol, endRow, endCol){
    if(Math.abs(startRow - endRow) <= 1 && Math.abs(startCol - endCol) <= 1) 
        return Queen(startRow, startCol, endRow, endCol);
    else return false;
}

export function Knight(startRow, startCol, endRow, endCol){
    if(Math.abs(startRow - endRow) == 2 && Math.abs(startCol - endCol) == 1) return true;
    else if(Math.abs(startRow - endRow) == 1 && Math.abs(startCol - endCol) == 2) return true;
    else return false; 
}

export function Pawn(startCol, endCol){
    if(startCol != endCol) return false;
    return true;
}

export function Queen(startRow, startCol, endRow, endCol){
    return (Bishop(startRow, startCol, endRow, endCol) || Rook(startRow, startCol, endRow, endCol));
}

export function Rook(startRow, startCol, endRow, endCol){
    if(startRow == endRow && startCol != endCol) return true;
    else if(startRow != endRow && startCol == endCol) return true;
    else return false; 
}