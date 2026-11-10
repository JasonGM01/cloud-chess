import { supabase } from "./supabase";

async function TestGetGame(){
    const { data, error } = await supabase.auth.getSession();

    if(error || !data.session) {
        console.error("No active session");
        return;
    }

    const gameid = "011bba05-d224-40d2-b43a-b03de869708a";

    const response = await fetch(`http://localhost:4000/api/games/${gameid}`, {
        headers: {
            Authorization: `Bearer ${data.session.access_token}`
        }
    });

    const result = await response.json();

    console.log("Status:", response.status);
    console.log("Game:", result);
}

export default TestGetGame;