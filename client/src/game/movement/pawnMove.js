function Pawn(startRow, startCol, endRow, endCol, hasMoved){
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

export default Pawn;