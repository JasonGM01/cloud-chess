import './App.css'
import Board from "../src/game/board";
import StartBoard from './components/chessboard/StartBoard';

function App() {
  const board = Board();

  console.log(board);

  StartBoard(board);

  return (
    <div>
      check console
    </div>
  )
}

export default App
