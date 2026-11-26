import './App.css'
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import Board from "../../shared/board/board.js";
import StartBoard from '../../shared/board/startBoard.js';
import ChessBoard from './components/ChessBoard';
import { GetPiece } from '../../shared/game/pieces/getPiece.js';
import SendMove from './components/sendMove.js';
import TestLoadGame from './database/testLoadGame.js';
import { supabase } from './database/supabase.js';

function App() {
  const session = useContext(AuthContext);
  const startBoard = Board();
  const [board, setBoard] = useState(() => StartBoard(startBoard));
  const [turn, setTurn] = useState("White");
  const [selectedStart, setSelectedStart] = useState(null);
  const [gameid, setGameID] = useState(null);

  useEffect(() => {
    if (session) {
      LoadStates();
    }
  }, [session]);

  useEffect(() => {
    const channel = supabase.channel(`room:game:${gameid}`)
    .on(
      "postgres_changes", 
      {event: "UPDATE", 
      schema: "public",
      table: "games",
      filter: `id=eq.${gameid}`},
      async (payload) => {
        await LoadStates();
        console.log("Move recieved");
        console.log(payload);
      })
    .subscribe();

    return() => {
      supabase.removeChannel(channel)
    }
  }, [gameid]);

  async function LoadStates() {
    const loading = await TestLoadGame();
    console.log("Results:", loading?.version, loading?.turn, loading?.last_move);

    if (loading) {
      setGameID(loading.id);
      setBoard(loading.board_state);
      setTurn(loading.turn);
    }
  }

  async function HandleSquareClick(row, col) {
    const testBoard = structuredClone(board);
    const piece = GetPiece(testBoard, row, col);
    // console.log(piece);
    // console.log(selectedSquare);

    if (selectedStart == null) {
      if (piece != null && piece.color == turn) {
        console.log("First select");
        setSelectedStart({ row, col });
      }
    } else {
      console.log("Second select");
      let destination = ({ row, col });
      // console.log(startRow, startCol);
      if (piece != null && piece.color == turn) {
        console.log("Change piece");
        setSelectedStart({ row, col });
      }
      // console.log(endRow, endCol);
      else {
        const info = await SendMove(selectedStart, destination)
        if (info) {
          // console.log("Valid move");
          setTurn(info.turn);
          setBoard(info.board_state);
          setSelectedStart(null);
        } else {
          console.log("Invalid move - select again");
        }
      }
    }
  }

  console.log(board);
  console.log("Auth: ", session !== null);

  return (
    <div>
      <div className="buttons">
        {session ? <p>Turn: {turn}</p> : (<p></p>)}

        {session ? (<ChessBoard board={board} onSquareClick={HandleSquareClick} />) : (<p>Please log in</p>)}

        <button onClick={LoadStates}>Load</button>
      </div>
    </div>
  )
}


export default App;