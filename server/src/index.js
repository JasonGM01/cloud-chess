import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());

app.get("/", () => {
    console.log("This is a homepage");
});

app.post("/api/move", (req, res) => {
    const move = req.body;
    console.log(move);
    res.json({recieved: true});
});

app.get("/api/health", (req, res) => {
    res.json({status: "ok"});
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});