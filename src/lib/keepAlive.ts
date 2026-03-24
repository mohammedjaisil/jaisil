import { supabase } from "./supabase";

/**
 * Pings Supabase on app startup to wake it from sleep (Supabase free tier pauses after 7 days of inactivity).
 * This is a lightweight query that simply wakes the DB connection without loading any meaningful data.
 */
export async function pingSupabase(): Promise<void> {
  try {
    const start = Date.now();
    const { error } = await supabase
      .from("products")
      .select("id")
      .limit(1)
      .maybeSingle();

    const elapsed = Date.now() - start;

    if (error) {
      // RLS / empty table errors are fine — the DB is still awake
      console.warn("[Supabase Keep-Alive] Ping completed with note:", error.message);
    } else {
      console.log(`[Supabase Keep-Alive] ✅ DB is awake (${elapsed}ms)`);
    }
  } catch (err) {
    // Network error — DB may still be waking up, not critical
    console.warn("[Supabase Keep-Alive] ⚠️ Ping failed (DB may still be waking up):", err);
  }
}
