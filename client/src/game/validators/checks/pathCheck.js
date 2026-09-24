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

export function Horizontal(board, startRow, startCol, endCol) {
    if (startCol < endCol) {
        for (let i = startCol + 1; i < endCol; i++) {
            if (board[startRow][i] != null) {
                return false;
            }
            
        }return true;
    } else if (startCol > endCol) {
        for (let i = startCol - 1; i > endCol; i--) {
            if (board[startRow][i] != null) {
                return false;
            }
            
        }return true;
    } else return false;
}

export function Vertical(board, startRow, startCol, endRow) {
    if (startRow < endRow) {
        for (let i = startRow + 1; i < endRow; i++) {
            // console.log("lower");
            if (board[i][startCol] != null) {
                // console.log(board[i][startCol]);
                return false;
            }
            
        }return true;
    } else if (startRow > endRow) {
        for (let i = startRow - 1; i > endRow; i--) {
            // console.log("upper");
            if (board[i][startCol] != null) {
                // console.log(board[i][startCol]);
                return false;
            }
            
        }return true;
    } else return false;
}