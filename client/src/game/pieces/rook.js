function Rook(startRow, startCol, endRow, endCol){
    if(startRow == endRow && startCol != endCol) return true;
    else if(startRow != endRow && startCol == endCol) return true;
    else return false; 
}

export default Rook;