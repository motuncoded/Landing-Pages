"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    setMessage(error ? error.message : "Check your email for confirmation!");
  };

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    setMessage(error ? error.message : "Logged in successfully!");
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-center">Supabase Auth</h1>
      <input
        type="email"
        className="w-full px-4 py-2 border rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full px-4 py-2 border rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          Log In
        </button>
        <button
          onClick={handleSignUp}
          className="w-full py-2 bg-green-600 text-white rounded"
          disabled={loading}
        >
          Sign Up
        </button>
      </div>
      {message && <p className="text-center text-sm text-red-600">{message}</p>}
    </div>
  );
}
