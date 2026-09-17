function Diagonal(board, startRow, startCol, endRow, endCol) {
    const rowStep = startRow < endRow ? 1 : -1;
    const columnStep = startCol < endCol ? 1 : -1;

    let row = startRow + rowStep;
    let column = startCol + columnStep;
    while (row != endRow && column != endCol) {
        if (board[row][column] != null) {
            return false;
        }
        row += rowStep;
        column += columnStep;
    } return true;
}

export default Diagonal;