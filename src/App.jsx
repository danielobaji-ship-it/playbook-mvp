// src/App.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";
import AuthTabs from "./components/AuthTabs.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  // On mount, check current session/user
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUser(data?.user ?? null);
    });

    // subscribe to auth state change (login/logout)
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      // session?.user contains user after login
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Playbook MVP</h1>

      {user ? (
        <div style={{ marginTop: 20 }}>
          <p>Logged in as <b>{user.email ?? user.id}</b></p>
          <button onClick={handleLogout} style={{ padding: "8px 12px" }}>Log out</button>

          {/* Placeholder: when logged in you can render the protected profile or app here */}
          <div style={{ marginTop: 20, padding: 12, border: "1px dashed #ddd" }}>
            <h3>Welcome — this is your protected area</h3>
            <p>Later you can show profile, upload video, view tryouts, chat, etc.</p>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 20 }}>
          <p>Please log in or create an account to continue.</p>
          <AuthTabs onAuthSuccess={(u) => setUser(u)} />
        </div>
      )}
    </div>
  );
}
