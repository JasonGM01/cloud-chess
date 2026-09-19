import ValidateDestination from "../validators/validateDestination";
import ValidatePath from "../validators/validatePath";
import ValidatePattern from "./validatePattern";

function ValidateMove(board, startRow, startCol, endRow, endCol, piece){
    if (startRow < 0 || 
        startRow > 7 || 
        startCol < 0 || 
        startCol > 7 || 
        endRow < 0 || 
        endRow > 7 || 
        endCol < 0 || 
        endCol > 7) 
        return false;
    
    if (!piece) return false;
    // console.log("Got piece");

    if(startRow == endRow && startCol == endCol) return false;

    if(!ValidatePattern(startRow, startCol, endRow, endCol, piece)) return false;

    // console.log("Path validation");
    if(!ValidatePath(board, startRow, startCol, endRow, endCol, piece)) return false;

    // console.log("Destination check");
    if(!ValidateDestination(board, endRow, endCol)) return true;
    
    console.log("Passed");
    return true;
}

export default ValidateMove;