import './App.css'
import Board from "../src/game//board/board";
import StartBoard from '../src/game/board/startBoard';
import MovePiece from './game/movement/movePiece';

function App() {
  const board = Board();
  const start = StartBoard(board);

  console.log(start);
  console.log(MovePiece(start, 0, 1, 2, 2) ? "Movement is free" : "Invalid move");

  console.log(MovePiece(start, 0, 0, 0, 6) ? "Movement is free" : "Invalid move");

  return (
    <div className="board">
      <div className="rows">
        Check Console
      </div>
    </div>
  )
}

export default App
