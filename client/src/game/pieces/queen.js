import Bishop from "./bishop";
import Rook from "./rook";

export function Queen(startRow, startCol, endRow, endCol){
    return (Bishop(startRow, startCol, endRow, endCol) || Rook(startRow, startCol, endRow, endCol));
}

export default Queen;