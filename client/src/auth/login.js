import { supabase } from "../database/supabase.js";

async function Login(email, password){
    const {data, error} = await supabase.auth.signInWithPassword({
        email, 
        password
    });

    if(error) {
        alert(`${error}`);
        console.error("Sign in failed: ", error.message);
        return null;
    }

    return data;
}

export default Login;