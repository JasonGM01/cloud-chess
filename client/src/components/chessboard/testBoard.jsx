function testBoard(Board){
    for(const row of Board){
        console.log(row.map(square => square ?? "R").join(" "));
    }
}

export default testBoard;