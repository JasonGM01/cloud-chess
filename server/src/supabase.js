import {createClient} from "@supabase/supabase-js";
import "dotenv/config";

const supabaseURL = process.env.NODE_SUPABASE_URL;
const supabaseKey = process.env.NODE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseURL, supabaseKey);