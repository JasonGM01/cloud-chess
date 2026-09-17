function Vertical(board, startRow, startCol, endRow) {
    if (startRow < endRow) {
        for (let i = startRow + 1; i < endRow; i++) {
            if (board[i][startCol] != null) {
                return false;
            }
        }
    } else if (startRow > endRow) {
        for (let i = startRow - 1; i > endRow; i--) {
            if (board[i][startCol] != null) {
                return false;
            }
        }
    } else return true;
}

export default Vertical;