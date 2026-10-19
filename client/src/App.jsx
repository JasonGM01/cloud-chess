import './App.css'
// import { useState } from 'react';
import Board from "../src/game//board/board";
import MovePiece from './game/movement/movePiece';
// import StartBoard from '../src/game/board/startBoard';
// import { Castling } from './game/validators/rules/rules';
import Test from '../src/game/board/test';
// import { GetPiece } from './game/pieces/getPiece';
// import { EnPassant } from './game/rules/atkRules';

function App() {
  const startBoard = Board();
  const test = Test(startBoard);
  // const [lastMove, setLastMove] = useState(null);
  // const [board, setBoard] = useState(test);
  // const [turn, setTurn] = useState("White");
  const testBoard = structuredClone(test);
  let testLastMove = null;
  let testTurn = "Black";

  console.log(testBoard);

  // console.log(GetPiece(testBoard, 1, 3));
  // console.log("Pawn extend");
  if (MovePiece(testBoard, 1, 3, 3, 3, testTurn, false, testLastMove) == true) {
    testLastMove = ({
      type: "Pawn",
      color: "Black",
      startRow: 1,
      startCol: 3,
      endRow: 3,
      endCol: 3
    });
    // console.log(GetPiece(testBoard, 3, 3));
    // setTurn(turn == "Black" ? "White" : "Black");
    testTurn = "White"
    console.log("Passed");
    // console.log(board);

    // setBoard(testBoard);
    // console.log(testBoard);
  }
  // console.log(testLastMove);
  // console.log("Turn: " + testTurn);
  // console.log(GetPiece(testBoard, 3, 4));
  // console.log("En Passant");
  if (MovePiece(testBoard, 3, 4, 2, 3, testTurn, false, testLastMove) == true) {
    // testLastMove = ({
    //   type: "Pawn",
    //   color: "White",
    //   startRow: 3,
    //   startCol: 4,
    //   endRow: 2,
    //   endCol: 3
    // });

    // setTurn(turn == "Black" ? "White" : "Black");
    // testTurn = "Black"
    console.log("Passed");
    // setBoard(testBoard);
  }
  // console.log(testLastMove);
  // console.log("Turn: " + testTurn);

  // console.log(board);

  return (
    <div className="board">
      <div className="rows">
        Check Console
      </div>
    </div>
  )
}

export default App
