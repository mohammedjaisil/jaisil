import { createClient } from "@supabase/supabase-js";

// Make sure to use import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://dvillsmhgccefhstyibd.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2aWxsc21oZ2NjZWZoc3R5aWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNDM2NDksImV4cCI6MjA4ODcxOTY0OX0.dP6ytwUgvtActricTu8rumtE9hPEI0Y0MRmftn-98pU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
