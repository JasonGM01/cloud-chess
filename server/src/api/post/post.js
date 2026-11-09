import { CreateUserClient } from "../../database/supabase.js";
import { randomBytes } from "node:crypto";
import { RequireAuth } from "../../middleware/requireAuth.js";
import { Router } from "express";
import Board from "../../../../shared/board/board.js";
import StartBoard from "../../../../shared/board/startBoard.js";

const router = Router();

router.post("/move", (req, res) => {
    const move = req.body;
    console.log(move);
    res.json({recieved: true});
});

router.post("/games", RequireAuth, async (req, res) => {
    const userClient = CreateUserClient(req.accessToken);

    const inviteCode = randomBytes(6).toString("hex").toUpperCase();

    const empty = Board();

    const start = StartBoard(empty);

    const whitePlayerId = req.user.id;

    const { data, error } = await userClient.from("games").insert({
        white_player_id: whitePlayerId,
        invite_code: inviteCode,
        board_state: start
    }).select().single();

    if(error) {
        console.error("Game creation failed:", error.message);
        return res.status(500).json({error: "Unable to create game"});
    }

    return res.status(201).json(data);
});

export default router;