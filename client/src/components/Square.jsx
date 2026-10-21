function Square({piece, row, col}){
    const symbols = {
    White: {
        King: "♔",
        Queen: "♕",
        Rook: "♖",
        Bishop: "♗",
        Knight: "♘",
        Pawn: "♙"
    },
    Black: {
        King: "♚",
        Queen: "♛",
        Rook: "♜",
        Bishop: "♝",
        Knight: "♞",
        Pawn: "♟"
    }
};
    const isLight = (row + col) % 2 == 0
    const squareColor = isLight ? "light" : "dark";
    return (
        <div className={`square ${squareColor}`}>
            {piece ? symbols[piece.color][piece.type] : null}
        </div>
    );
}


export default Square;