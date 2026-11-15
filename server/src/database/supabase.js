import {createClient} from "@supabase/supabase-js";
import "dotenv/config";

const supabaseURL = process.env.NODE_SUPABASE_URL;
const supabaseKey = process.env.NODE_SUPABASE_PUBLISHABLE_KEY;
const secret = process.env.SUPABASE_SECRET_KEY;

export const supabase = createClient(supabaseURL, supabaseKey);

export const adminClient = createClient(supabaseURL, secret, { auth: { persistSession: false, autoRefreshToken: false}});

export function CreateUserClient(accessToken) {
    return createClient(supabaseURL, supabaseKey, {
        global: {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    });
}
