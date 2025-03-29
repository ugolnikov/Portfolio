import { createClient } from "@supabase/supabase-js";

const supabaseU = import.meta.env.PUBLIC_SUPABASE_URL ?? process.env.PUBLIC_SUPABASE_URL
const supabaseK = import.meta.env.PUBLIC_SUPABASE_KEY ?? process.env.PUBLIC_SUPABASE_KEY
export const supabase = createClient(supabaseU,supabaseK);