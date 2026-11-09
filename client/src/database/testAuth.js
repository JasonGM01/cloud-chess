import { supabase } from "./supabase";

async function TestAuth() {
    const { data, error } = await supabase.auth.getSession();
    
    if (error || !data.session) {
        console.log("No active session");
        return;
    }

    const response = await fetch("http://localhost:4000/api/auth-test", {
            headers: {
                Authorization: `Bearer ${data.session.access_token}`
            }
        });

        const result = await response.json();

        console.log("Status: ", response.status);
        console.log("Result: ", result);
        alert("Check console");
}

export default TestAuth;