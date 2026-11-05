import { supabase } from "../supabase";

async function Login(email, password){
    const {data, error} = await supabase.auth.signInWithPassword({
        email, 
        password
    });

    if(error) {
        console.error("Sign in failed: ", error.message);
        return null;
    }

    return data;
}

export default Login;