import './App.css'
import Board from "../src/game/board";
import StartBoard from '../src/game/startBoard';
import Movement from './game/movement/movement';

function App() {
  const board = Board();
  const start = StartBoard(board);

  console.log(start);
  console.log(Movement(start, 0, 1, 2, 2));
  console.log(Movement(start, 0, 1, 1, 2));
  console.log(Movement(start, 0, 0, 0, 2));
  console.log(Movement(start, 0, 0, 0, 6));

  return (
    <div className="board">
      <div className="rows">
        check Console
      </div>
    </div>
  )
}

export default App
