import { GetPiece } from "../pieces/getPiece";
import MovePiece from "../movement/movePiece";

function HasLegalMove(board, piece, turn, lastMove){
    for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
            // console.log("get piece");
            let square = GetPiece(board, i, j);
            if (square == null) continue;
            if (square.color != piece.color) continue;
            // console.log(square);
            for (let k = 0; k <= 7; k++) {
                for (let l = 0; l <= 7; l++) {
                    // console.log(square);
                    const test = structuredClone(board);
                    // console.log(i, j, k, l);
                    if (MovePiece(test, i, j, k, l, turn, true, lastMove)) return true;
                }
            }
        }
    }
    // console.log("No legal move"); 
    return false;
}

export default HasLegalMove;