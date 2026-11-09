import { supabase } from "../supabase";

async function Session() {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    const response = await fetch("http://localhost:4000/api/games",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    console.log(response);
}

export default Session;