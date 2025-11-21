// src/components/AuthTabs.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient.js";

export default function AuthTabs({ onAuthSuccess }) {
  const [tab, setTab] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // success or error messages
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e?.preventDefault();
    setMessage(""); setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setMessage(error.message);
    else {
      setMessage("Logged in!");
      onAuthSuccess?.(data.user); // notify parent
    }
  }

  async function handleSignup(e) {
    e?.preventDefault();
    setMessage(""); setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setMessage(error.message);
    else {
      setMessage("Check your email for confirmation (if required).");
      onAuthSuccess?.(data.user);
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: "20px auto", padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setTab("login")} style={{ flex: 1, padding: 8, background: tab==="login" ? "#111" : "#eee", color: tab==="login" ? "#fff" : "#000" }}>Login</button>
        <button onClick={() => setTab("signup")} style={{ flex: 1, padding: 8, background: tab==="signup" ? "#111" : "#eee", color: tab==="signup" ? "#fff" : "#000" }}>Sign up</button>
      </div>

      <form onSubmit={tab === "login" ? handleLogin : handleSignup}>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Email</label>
          <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Password</label>
          <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
            {loading ? "Please wait..." : (tab === "login" ? "Login" : "Create account")}
          </button>
          {tab === "login" && (
            <button type="button" onClick={async () => {
              // magic link (optional)
              setMessage(""); setLoading(true);
              const { error } = await supabase.auth.signInWithOtp({ email });
              setLoading(false);
              if (error) setMessage(error.message); else setMessage("Magic link sent to your email.");
            }} style={{ padding: "8px 12px" }}>
              Send magic link
            </button>
          )}
        </div>

        {message && <p style={{ marginTop: 12, color: "crimson" }}>{message}</p>}
      </form>
    </div>
  );
}
