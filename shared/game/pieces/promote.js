function Promote(piece) {
    while (true) {
        let choice = prompt("Promote Pawn: 1. Bishop\n2. Knight\n3. Queen\n4. Rook");
        switch (choice) {
            case "1":
                piece.type = "Bishop";
                return true;
            case "2":
                piece.type = "Knight";
                return true;
            case "3":
                piece.type = "Queen";
                return true;
            case "4":
                piece.type = "Rook";
                return true;
            default:
                alert("Invalid Selection. Choose 1, 2, 3, or 4.");
        }
    }

}

export default Promote;