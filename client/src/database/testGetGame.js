import { supabase } from "./supabase";

async function TestGetGame(){
    const { data, error } = await supabase.auth.getSession();

    if(error || !data.session) {
        console.error("No active session");
        return;
    }

    const gameid = "69677448-5261-4d85-93af-022c9005f0cb";

    const response = await fetch(`http://localhost:4000/api/games/${gameid}`, {
        headers: {
            Authorization: `Bearer ${data.session.access_token}`
        }
    });

    const result = await response.json();

    console.log("Status:", response.status);
    console.log("Game:", result);
    if(response.ok) {
        return result;
    } else {
        return null;
    }
}

export default TestGetGame;