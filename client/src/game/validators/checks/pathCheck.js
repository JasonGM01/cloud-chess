export function Diagonal(board, startRow, startCol, endRow, endCol) {
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

export function Horizontal(board, startRow, startCol, endRow, endCol) {
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

export function Vertical(board, startRow, startCol, endRow) {
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