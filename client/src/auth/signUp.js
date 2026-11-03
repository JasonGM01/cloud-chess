import { supabase } from "../supabase.js";

export async function SignUp(email, password){
    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if(error) {
        console.error("Sign up failed: ", error.message);
        return null;
    }

    return data;

}