import './App.css'
import Board from "../src/game/board";

function App() {
  const board = Board();

  console.log(board);

  return (
    <div className="board">
      <div className="rows">
        check Console
      </div>
    </div>
  )
}

export default App
