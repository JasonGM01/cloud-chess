function Bishop(startRow, startCol, endRow, endCol){
    if(startRow == endRow && startCol == endCol) return false;
    else if(Math.abs(startRow - endRow) == Math.abs(startCol - endCol)) return true;
    else return false; 
}

export default Bishop;