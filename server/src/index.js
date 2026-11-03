import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { supabase } from "./supabase.js";

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

app.get("/api/games", async (req, res) => {
    const {data, error} = await supabase.from("games").select("*");

    if(error) {
        console.log("Supabase error: ", error.message);
        return res.status(500).json({
            code: error.code, 
            message: error.message, 
            details: error.details, 
            hint: error.hint});
    }

    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});