import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { pingSupabase } from "./lib/keepAlive";

// Fire-and-forget: wake Supabase from free-tier sleep on app startup
pingSupabase();

createRoot(document.getElementById("root")!).render(<App />);
