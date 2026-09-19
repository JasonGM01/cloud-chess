import GetDestination from "../pieces/getDestination";

function ValidateDestination(board, endRow, endCol){
    if(!GetDestination(board, endRow, endCol)) return false;
    else return true;
}

export default ValidateDestination;