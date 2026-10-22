import Square from "./Square";

function ChessBoard({board, onSquareClick}){
    return (
        <div className="chessboard">
            {board.map((row, rowIndex) => {
                return(
                    <div key={rowIndex} className="board-row">
                        {row.map((square, colIndex) => {
                            return (
                                <Square 
                                key={colIndex} 
                                piece={square}
                                row={rowIndex}
                                col={colIndex} 
                                onSquareClick={onSquareClick}
                                />
                            );
                        })}
                    </div>
                );
            })}

        </div>
    );
}

export default ChessBoard;