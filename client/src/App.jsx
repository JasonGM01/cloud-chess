import './App.css'
import { useState } from 'react-dom';
import Board from "../src/game//board/board";
import MovePiece from './game/movement/movePiece';
// import StartBoard from '../src/game/board/startBoard';
// import MovePiece from './game/movement/movePiece';
// import { GetPiece } from './game/pieces/getPiece';
// import { Castling } from './game/validators/rules/rules';
// import Test from '../src/game/board/test';

function App() {
  const startBoard = Board();
  const [lastMove, setLastMove] = useState(null);
  const [board, setBoard] = useState(startBoard);
  const [turn, setTurn] = useState("White");
  const testBoard = structuredClone(board);

  // console.log(board);
  if (MovePiece(testBoard, startRow, startCol, endRow, endCol, turn, false, lastMove)) {
    setLastMove({
      type: type,
      color: color,
      startRow,
      startCol,
      endRow,
      endCol
    });

    setTurn(turn === "White" ? "Black" : "White");

    setBoard(board);
  }

  return (
    <div className="board">
      <div className="rows">
        Check Console
      </div>
    </div>
  )
}

export default App
