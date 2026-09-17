import Bishop from "./bishopMove";
import Rook from "./rookMove";

export function Queen(startRow, startCol, endRow, endCol){
    return (Bishop(startRow, startCol, endRow, endCol) || Rook(startRow, startCol, endRow, endCol));
}

export default Queen;