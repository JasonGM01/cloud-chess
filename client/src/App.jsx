import './App.css'
// import { useState } from 'react';
import Board from "../src/game//board/board";
import MovePiece from './game/movement/movePiece';
import StartBoard from '../src/game/board/startBoard';
// import { Castling } from './game/validators/rules/rules';
// import Test from '../src/game/board/test';
// import { GetPiece } from './game/pieces/getPiece';
// import { EnPassant } from './game/rules/atkRules';

function App() {
  const startBoard = Board();
  const start = StartBoard(startBoard);
  // const test = Test(startBoard);
  // const [lastMove, setLastMove] = useState(null);
  // const [board, setBoard] = useState(test);
  // const [turn, setTurn] = useState("White");
  // const testBoard = structuredClone(test);
  // let testLastMove = null;
  // let testTurn = "White";

  console.log(start);

  return (
    <div className="board">
      <div className="rows">
        Check Console
      </div>
    </div>
  )
}

export default App
