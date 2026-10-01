import './App.css'
import Board from "../src/game//board/board";
import StartBoard from '../src/game/board/startBoard';
// import MovePiece from './game/movement/movePiece';
// import Test from '../src/game/board/test';
// import { GetPiece } from './game/pieces/getPiece';

function App() {
  const board = Board();
  const start = StartBoard(board);
  // const test = Test(board);
  // let Turn = "White";
  // let sim = false;

  // console.log(test);
  // console.log(MovePiece(start, 0, 1, 2, 2, Turn) ? "Moved" : "Invalid move");
  // Turn == "Black"
  // console.log(MovePiece(start, 0, 0, 0, 6, Turn) ? "Moved" : "Invalid move");

  // console.log(GetPiece(test, 2, 0));
  // console.log(GetPiece(test, 5, 0));

  // console.log(MovePiece(test, 2, 2, 4, 2, Turn, sim) ? "Moved" : "Invalid move");
  // console.log(MovePiece(test, 2, 2, 5, 5, Turn, sim) ? "Moved" : "Invalid move");
  // console.log(MovePiece(test, 2, 2, 3, 3, Turn, sim) ? "Moved" : "Invalid move");
  // console.log(MovePiece(test, 2, 0, 1, 2, Turn, sim) ? "Moved" : "Invalid Move");
  // console.log(MovePiece(test, 0, 7, 0, 2, Turn, sim) ? "Moved" : "Invalid Move");

  // console.log(test);
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
