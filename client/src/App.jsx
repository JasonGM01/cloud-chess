import './App.css'
import { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import Board from "../src/game//board/board";
import MovePiece from './game/movement/movePiece';
import StartBoard from '../src/game/board/startBoard';
import ChessBoard from './components/ChessBoard';
import { GetPiece } from "./game/pieces/getPiece";

function App() {
  const session = useContext(AuthContext);
  const startBoard = Board();
  const [lastMove, setLastMove] = useState(null);
  const [board, setBoard] = useState(() => StartBoard(startBoard));
  const [turn, setTurn] = useState("White");
  const [selectedSquare, setSelectedSquare] = useState(null);

  async function CheckServer() {
    const response = await fetch("http://localhost:4000/api/health");
    const data = await response.json();
    console.log(data);
  }

  async function SendMove() {
    const move = {
      piece: "Pawn",
      startRow: 1,
      startCol: 1,
      endRow: 2,
      endCol: 2
    };

    const response = await fetch(
      "http://localhost:4000/api/move",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(move)
      }
    );

    const data = await response.json();

    console.log(data);
  }

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
        setSelectedSquare({ row, col });
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
        } else {
          console.log("Invalid move - select again");
          setSelectedSquare(null);
        }
      }
    }
  }

  console.log(board);
  console.log("Auth: ", session !== null);
  return (
    <div>
      <div className="buttons">
        <button onClick={CheckServer}>
          Check Server
        </button>

        {session ? <p>Turn: {turn}</p> : (<p></p>)}

        {session ? (<ChessBoard board={board} onSquareClick={HandleSquareClick} />) : (<p>Please log in</p>)}

        <button onClick={SendMove}>
          Send Move
        </button>
      </div>
    </div>
  )
}


export default App;