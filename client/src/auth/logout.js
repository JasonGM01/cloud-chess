import { supabase } from "../database/supabase.js"

async function Logout(){
    const {error} = await supabase.auth.signOut();

    if(error) {
        console.error("Logout failed: ", error.message)
        return false;
    } 

    return true;
}

export default Logout;