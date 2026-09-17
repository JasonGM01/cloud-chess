import './App.css'
import Board from "../src/game//board/board";
import StartBoard from '../src/game/board/startBoard';
import Movement from './game/movement/movement';
import Knight from './game/movement/knightMove';
import Rook from './game/movement/rookMove';

function App() {
  const board = Board();
  const start = StartBoard(board);

  console.log(start);
  console.log(Movement(start, 0, 1, 2, 2) ? "Movement is free" : "Movement is blocked");
  console.log(`Movement is ${Knight(0,1,2,2)}`);

  console.log(Movement(start, 0, 1, 1, 2) ? "Movement is free" : "Movement is blocked");
  console.log(`Movement is ${Knight(0,1,1,2)}`);

  console.log(Movement(start, 0, 0, 0, 2) ? "Movement is free" : "Movement is blocked");
  console.log(`Movement is ${Rook(0,0,0,2)}`);

  console.log(Movement(start, 0, 0, 0, 6) ? "Movement is free" : "Movement is blocked");
  console.log(`Movement is ${Rook(0,0,0,6)}`);

  return (
    <div className="board">
      <div className="rows">
        Check Console
      </div>
    </div>
  )
}

export default App
