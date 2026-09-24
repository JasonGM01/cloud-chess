import ValidateDestination from "../validators/validateDestination";
import ValidatePath from "../validators/validatePath";
import ValidateBoard from "./validateBoard";
import ValidatePattern from "./validatePattern";

function ValidateMove(board, startRow, startCol, endRow, endCol, piece){
    // console.log("Board");
    if (!ValidateBoard(startRow, startCol, endRow, endCol)) return false;

    // console.log("Same space");
    if(startRow == endRow && startCol == endCol) return false;
    
    // console.log("Get piece");
    if (!piece) return false;

    // console.log("Move Validation");
    if(!ValidatePattern(startRow, startCol, endRow, endCol, piece)) return false;

    // console.log("Path validation");
    if(!ValidatePath(board, startRow, startCol, endRow, endCol, piece)) return false;

    // console.log("Destination check");
    if(!ValidateDestination(board, endRow, endCol)) return true;
    
    // console.log("Passed");
    return true;
}

export default ValidateMove;