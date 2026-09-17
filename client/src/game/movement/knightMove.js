function Knight(startRow, startCol, endRow, endCol){
    if(Math.abs(startRow - endRow) == 2 && Math.abs(startCol - endCol) == 1) return true;
    else if(Math.abs(startRow - endRow) == 1 && Math.abs(startCol - endCol) == 2) return true;
    else return false; 
}

export default Knight;