import './App.css'
import { useState } from 'react';
import Board from "../src/game//board/board";
// import MovePiece from './game/movement/movePiece';
import StartBoard from '../src/game/board/startBoard';
import ChessBoard from './components/ChessBoard';

function App() {
  const startBoard = Board();
  // const start = StartBoard(startBoard);
  // const test = Test(startBoard);
  // const [lastMove, setLastMove] = useState(null);
  const [board, setBoard] = useState(() => StartBoard(startBoard));
  // const [turn, setTurn] = useState("White");
  // const [selectedSquare, setSelectedSquare] = useState(null);
  // const testBoard = structuredClone(test);
  // let testLastMove = null;
  // let testTurn = "White";

  console.log(board);

  return (
    <div className="board">
      <div className="rows">
        {<ChessBoard board={board}/>}
      </div>
    </div>
  )
}

export default App
