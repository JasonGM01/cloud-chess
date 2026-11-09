import { useState, useEffect } from "react";
import { supabase } from "../database/supabase.js"
import { AuthContext } from "./AuthContext.jsx"

function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);
    
    return (
        <AuthContext.Provider value={session}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;