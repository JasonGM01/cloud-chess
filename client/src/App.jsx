import './App.css'
import { useState } from 'react';
import Board from "../src/game//board/board";
import MovePiece from './game/movement/movePiece';
import StartBoard from '../src/game/board/startBoard';
import ChessBoard from './components/ChessBoard';
import { GetPiece } from "./game/pieces/getPiece";

function App() {
  const startBoard = Board();
  // const start = StartBoard(startBoard);
  // const test = Test(startBoard);
  const [lastMove, setLastMove] = useState(null);
  const [board, setBoard] = useState(() => StartBoard(startBoard));
  const [turn, setTurn] = useState("White");
  const [selectedSquare, setSelectedSquare] = useState(null);

  function HandleSquareClick(row, col) {
    const testBoard = structuredClone(board);
    const piece = GetPiece(testBoard, row, col);
    // console.log(piece);
    // console.log(selectedSquare);

    if (selectedSquare == null) {
      if (piece != null && piece.color == turn) {
        console.log("First select");
        setSelectedSquare({ row, col });
      }
    } else {
      console.log("Second select");
      const startRow = selectedSquare.row;
      const startCol = selectedSquare.col;
      const endRow = row;
      const endCol = col;
      const movingPiece = GetPiece(testBoard, startRow, startCol);
      // console.log(startRow, startCol);
      if (piece != null && piece.color == turn) {
        console.log("Change piece");
        setSelectedSquare({row , col});
      }
      // console.log(endRow, endCol);
      else {
        if (MovePiece(testBoard, startRow, startCol, endRow, endCol, turn, false, lastMove) == true) {
          // console.log("Valid move");
          setTurn(turn == "White" ? "Black" : "White");
          setBoard(testBoard);
          setSelectedSquare(null);
          setLastMove({
            type: movingPiece.type,
            color: turn,
            startRow: startRow,
            startCol: startCol,
            endRow: endRow,
            endCol: endCol
          })
        } else{
          console.log("Invalid move - select again");
          setSelectedSquare(null);
        }
      }
    }
  }
  console.log(board);


  return (
    <div>
      <div>
      Turn: {turn}
        {<ChessBoard
          board={board}
          onSquareClick={HandleSquareClick}
        />}
      </div>
    </div>
  )
}


export default App;