import { supabase } from "./supabase";

async function TestCreateGame() {
    const { data, error } = await supabase.auth.getSession();
    
    if (error || !data.session) {
        console.log("No active session");
        return;
    }
    
    const response = await fetch("http://localhost:4000/api/games", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${data.session.access_token}`
        }
    });

    const result = await response.json();

    console.log("Status:", response.status);
    console.log("Game ID:", result.id);
    console.log("Invite Code:", result.invite_code);
}

export default TestCreateGame;