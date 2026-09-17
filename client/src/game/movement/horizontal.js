function Horizontal(board, startRow, startCol, endRow, endCol) {
    if (startCol < endCol) {
        for (let i = startCol + 1; i < endCol; i++) {
            if (board[startRow][i] != null) {
                return false;
            }
        }
    } else if (startCol > endCol) {
        for (let i = startCol - 1; i > endCol; i--) {
            if (board[startRow][i] != null) {
                return false;
            }
        }
    } else return true;
}

export default Horizontal;