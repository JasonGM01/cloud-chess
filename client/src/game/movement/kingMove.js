import Queen from "./queenMove";

function King(startRow, startCol, endRow, endCol){
    if(Math.abs(startRow - endRow) <= 1 && Math.abs(startCol - endCol) <= 1) 
        return Queen(startRow, startCol, endRow, endCol);
    else return false;
}

export default King;