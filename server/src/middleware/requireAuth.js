import { supabase } from "../database/supabase.js"

export async function RequireAuth(req, res, next){
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return res.status(400).json({error: "Missing authorization header"});
    }
    
    const parts = authHeader.split(" ");

    if(
        parts.length != 2 || 
        parts[0] != "Bearer" || 
        !parts[1]){
            return res.status(401).json({error: "Invalid authorization header"});
    }

    const token = parts[1];

    try{
        // console.log("Begin verify");
        const {data, error} = await supabase.auth.getUser(token);
        // console.log("Supabase responded");

        // console.log("Error check");
        if(error){
            return res.status(401).json({error: "Invalid or expired token"});
        }

        // console.log("No error");
        req.user = data.user;
        req.accessToken = token;

        // console.log("Next");
        next();
    } catch (error){
        console.error("Authentication verification failed: ", error?.message);
        return res.status(503).json({error: "Authentication verification unavailable"});
    }
}