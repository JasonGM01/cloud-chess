import { adminClient, CreateUserClient } from "../../database/supabase.js";
import { randomBytes } from "node:crypto";
import { RequireAuth } from "../../middleware/requireAuth.js";
import { Router } from "express";
import Board from "../../../../shared/board/board.js";
import StartBoard from "../../../../shared/board/startBoard.js";
import MovePiece from "../../../../shared/game/movement/movePiece.js";
import { GetPiece } from "../../../../shared/game/pieces/getPiece.js";

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

router.post("/games/:id/moves", RequireAuth, async (req, res) => {
    const gameid = req.params.id;
    const playerId = req.user.id;
    const { startRow, startCol, endRow, endCol } = req.body;
    const coordinates = [startRow, startCol, endRow, endCol];
    const userClient = CreateUserClient(req.accessToken);
    const { data: game, error} = await userClient.from("games").select("*").eq("id", gameid).maybeSingle();
    let valid;

    if (error) {
        console.error("Game retrieval failed")
        return res.status(500).json({error: "Unable to retrieve game"});
    }

    if (!game) {
        return res.status(404).json({error: "Game not found"});
    }

    if (game.status != "active") {
        return res.status(409).json({error: "Game is not active"});
    }

    if (game.turn == "White" && playerId != game.white_player_id) {
        return res.status(403).json({error: "It is not your turn"});
    }

    if (game.turn == "Black" && playerId != game.black_player_id) {
        return res.status(403).json({error: "It is not your turn"});
    }

    if (coordinates.some(num => num > 7 || num < 0 || !Number.isInteger(num))) {
        return res.status(400).json({error: "Invalid move coordinates"});
    }

    const testBoard = structuredClone(game.board_state);
    const piece = GetPiece(testBoard, startRow, startCol);

    if (piece == null) {
        return res.status(400).json({error: "No piece at starting position"});
    }

    if (piece.color != game.turn) {
        return res.status(400).json({error: "Cannot move opponent's piece"});
    }

    const lastMove = {
        type: piece.type,
        color: piece.color,
        startRow,
        startCol,
        endRow,
        endCol
    };

    try {
        valid = MovePiece(
            testBoard,
            startRow,
            startCol,
            endRow,
            endCol,
            game.turn,
            false,
            game.last_move
        );
    } catch (error) {
        console.error("Chess engine error:", error.message);
        return res.status(500).json({error: "Unable to process move"});
    }

    if (!valid) {
        return res.status(400).json({error: "Illegal move"});
    }

    const nextTurn = game.turn == "White" ? "Black" : "White";

    const { data: updateGame, error: updateError } = await adminClient
    .from("games")
    .update({
        board_state: testBoard,
        turn: nextTurn,
        last_move: lastMove,
        version: game.version + 1
    })
    .eq("id", gameid)
    .eq("version", game.version)
    .eq("turn", game.turn)
    .eq("status", "active")
    .select()
    .maybeSingle();

    if (updateError) {
        console.error("Move update failed:", updateError.message);
        return res.status(500).json({error: "Unable to save move"});
    }

    if (!updateGame) {
        return res.status(409).json({error: "Game state has changed. Please refresh"});
    }

    return res.status(200).json(updateGame);
});

export default router;