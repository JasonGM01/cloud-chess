import { supabase } from "./supabase";

async function TestJoinGame(){
    const { data, error } = await supabase.auth.getSession();

    if(error || !data.session){
        console.log("No active session");
        return;
    }

    const inviteCode = "12E455E869E6";

    const response = await fetch("http://localhost:4000/api/games/join", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.session.access_token}`
        },
        body: JSON.stringify({
            invite_code: inviteCode
        })
    });

    const result = await response.json();

    console.log("Status:", response.status);
    console.log("Result:", result);
}

export default TestJoinGame;