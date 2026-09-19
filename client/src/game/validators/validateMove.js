import ValidateDestination from "../validators/validateDestination";
import ValidatePath from "../validators/validatePath";
// import { TurnOrder } from "./rules/rules";
import ValidateBoard from "./validateBoard";
import ValidatePattern from "./validatePattern";

function ValidateMove(board, startRow, startCol, endRow, endCol, piece){
    if (!ValidateBoard(startRow, startCol, endRow, endCol)) return false;
    
    if(startRow == endRow && startCol == endCol) return false;
    
    if (!piece) return false;
    // console.log("Got piece");

    // if(!TurnOrder(turn, piece)) return false;

    if(!ValidatePattern(startRow, startCol, endRow, endCol, piece)) return false;

    // console.log("Path validation");
    if(!ValidatePath(board, startRow, startCol, endRow, endCol, piece)) return false;

    // console.log("Destination check");
    if(!ValidateDestination(board, endRow, endCol)) return true;
    
    console.log("Passed");
    return true;
}

export default ValidateMove;