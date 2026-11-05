import { supabase } from "../supabase.js";

async function Register(email, password){
    const {data, error} = await supabase.auth.signUp({
        email,
        password
    });

    if(error) {
        console.error("Sign up failed: ", error.message);
        return null;
    }

    return data;

}

export default Register;