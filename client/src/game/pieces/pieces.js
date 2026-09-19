export function Bishop(startRow, startCol, endRow, endCol){
    if(startRow == endRow && startCol == endCol) return false;
    else if(Math.abs(startRow - endRow) == Math.abs(startCol - endCol)) return true;
    else return false; 
}

export function King(startRow, startCol, endRow, endCol){
    if(Math.abs(startRow - endRow) <= 1 && Math.abs(startCol - endCol) <= 1) 
        return Queen(startRow, startCol, endRow, endCol);
    else return false;
}

export function Knight(startRow, startCol, endRow, endCol){
    if(Math.abs(startRow - endRow) == 2 && Math.abs(startCol - endCol) == 1) {console.log("Path 1");return true;}
    else if(Math.abs(startRow - endRow) == 1 && Math.abs(startCol - endCol) == 2) {console.log("Path 2");return true;}
    else {console.log("Fail");return false;} 
}

export function Pawn(startRow, startCol, endRow, endCol, hasMoved){
    if(startRow == endRow && startCol == endCol) return false;
    if(startCol != endCol) return false;
    
    const rowDistance = Math.abs(startRow - endRow)
    if(hasMoved){
        return rowDistance == 1;
    } else if(!hasMoved){
        hasMoved+1;
        return rowDistance == 1 || rowDistance == 2;
    }
}

export function Queen(startRow, startCol, endRow, endCol){
    return (Bishop(startRow, startCol, endRow, endCol) || Rook(startRow, startCol, endRow, endCol));
}

export function Rook(startRow, startCol, endRow, endCol){
    if(startRow == endRow && startCol != endCol) return true;
    else if(startRow != endRow && startCol == endCol) return true;
    else return false; 
}