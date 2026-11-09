import { supabase } from "../database/supabase.js";

async function Register(email, username, password){
    const {data, error} = await supabase.auth.signUp({
        email,
        username,
        password
    });

    if(error) {
        alert(`${error}`);
        console.error("Sign up failed: ", error.message);
        return null;
    }

    return data;

}

export default Register;