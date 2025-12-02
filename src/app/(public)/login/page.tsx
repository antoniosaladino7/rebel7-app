"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
export default function LoginPage() {
  const [email, setEmail] = useState(""); const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false); const [err, setErr] = useState<string|null>(null);
  const sendMagic = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setErr(null);
    const { error } = await supabase.auth.signInWithOtp({
      email, options: { emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined }
    });
    setLoading(false); if (error) setErr(error.message); else setSent(true);
  };
  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Accedi a Rebel7</h1>
        <p className="opacity-70">Inserisci la tua email: ti inviamo un link magico.</p>
        <form onSubmit={sendMagic} className="space-y-3">
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
            placeholder="you@email.com" className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700" required />
          <button disabled={loading} className="w-full py-2 rounded-lg bg-white text-black font-semibold">
            {loading ? "Invio..." : "Invia link"}
          </button>
        </form>
        {sent && <p className="text-green-400">Controlla la posta: link inviato.</p>}
        {err && <p className="text-red-400">{err}</p>}
      </div>
    </main>
  );
}
