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

    const {data: authData, error: authError} = await userClient.auth.getUser();

    console.log("Middleware:", req.user.id);
    console.log("Database:", authData?.user?.id);
    console.log("Auth error:", authError?.message);
    console.log("Invite code:", inviteCode);

    const { data, error } = await userClient.from("games").insert({
        white_player_id: whitePlayerId,
        invite_code: inviteCode,
        board_state: start
    }).select().single();

    if(error) {
        console.error("Game creation failed:", {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
        });
        return res.status(500).json({error: "Unable to create game"});
    }

    return res.status(201).json(data);
});

router.post("/games/join", RequireAuth, async (req, res) => {
    const { invite_code } = req.body;
    
    if(typeof invite_code != "string" || !/^[0-9A-F]{12}$/.test(invite_code)) {
        return res.status(400).json({error: "Invalid invitation code format"});
    }

    const userClient = CreateUserClient(req.accessToken);

    const { data, error } = await userClient.rpc("join_game", {
        p_invite_code: invite_code
    });

    if(error) {
        console.error("Game joining failed:", {
            code: error.code,
            message: error.message
        });

        return res.status(500).json({error: "Unable to join game"});
    }

    return res.status(200).json(data);
});

export default router;