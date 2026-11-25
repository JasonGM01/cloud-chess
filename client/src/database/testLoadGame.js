import TestGetGame from "./testGetGame";

async function LoadGame() {
    const loadBoard = await TestGetGame();

    console.log(loadBoard);

    return loadBoard;
}

export default LoadGame;