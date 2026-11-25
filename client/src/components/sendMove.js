import { supabase } from "../database/supabase";

async function SendMove(start, destination){
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
        console.error("No active session")
        return;
    }

    const gameid = "69677448-5261-4d85-93af-022c9005f0cb";
    
    const response = await fetch(
        `http://localhost:4000/api/games/${gameid}/moves`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${data.session.access_token}`
            },
            body: JSON.stringify({
                startRow: start.row,
                startCol: start.col,
                endRow: destination.row,
                endCol: destination.col
            })
    });

    const result = await response.json();

    console.log("Result:", result);
    if(response.ok) {
        return result;
    } else {
        return null;
    }

}

export default SendMove;