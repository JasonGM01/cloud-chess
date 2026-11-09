import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import getRoutes from "./api/get/get.js";
import postRoutes from "./api/post/post.js";
import updateRoutes from "./api/update/update.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());

app.use("/api", getRoutes);
app.use("/api", postRoutes);
app.use("/api", updateRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});