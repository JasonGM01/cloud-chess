import { CreateUserClient, supabase } from "../../database/supabase.js";
import { RequireAuth } from "../../middleware/requireAuth.js"
import { Router } from "express";

const router = Router();

router.get("/", () => {
    console.log("This is a homepage");
});

router.get("/health", (req, res) => {
    res.json({status: "Connected"});
});

router.get("/games", async (req, res) => {
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

router.get("/auth-test", RequireAuth, (req, res) => {
    res.json({
        authenticated: true,
        userId: req.user.id
    });
});

router.get("/games/:id", RequireAuth, async (req, res) => {
    const gameid = req.params.id;

    const userClient = CreateUserClient(req.accessToken);

    const { data, error } = await userClient.from("games").select("*").eq("id", gameid).maybeSingle();

    if(error) {
        console.error("Game retrieval failed:", error.message);
        return res.status(500).json({error: "Unable to retrieve game"});
    }

    if(!data) {
        return res.status(404).json({error: "Game not found"});
    }

    return res.status(200).json(data);
});

router.get("/games/:id/move", RequireAuth, async (req, res) => {
    const gameid = req.params.id;

    const userClient = CreateUserClient(req.accessToken);

    const { data, error } = await userClient.from("games").select("*").eq("id", gameid).maybeSingle();

    if(error) {
        console.error("Unable to retrieve game");
        return;
    }

    if(!data) {
        return res.status(404).json({error: "Game not found"});
    }

    
});

export default router;