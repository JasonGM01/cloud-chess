import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
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