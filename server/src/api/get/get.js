import { supabase } from "../../database/supabase.js";
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


export default router;