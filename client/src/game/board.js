function Board() {
    return Array.from({length: 8}, () => Array.from({length: 8}, () => null));
}

export default Board;