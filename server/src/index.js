import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    console.log("This is a homepage");
});

app.get("/api/health", (req, res) => {
    res.json({status: "ok"});
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});