"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email) {
      setError("Inserisci una email valida.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      },
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setError("Errore durante l’invio del link magico. Riprova tra pochi secondi.");
    } else {
      setMessage(
        "Ti abbiamo inviato un link magico. Controlla la tua casella email e apri il link da questo dispositivo."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 text-slate-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_top,_#4f46e5_0,_transparent_55%),_radial-gradient(circle_at_bottom,_#06b6d4_0,_transparent_55%)]" />

      <main className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-black/40 px-4 py-1 text-xs uppercase tracking-[0.2em] text-indigo-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Rebel7 ESG Core Engine
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Accedi a <span className="text-indigo-400">Rebel7</span>
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Inserisci la tua email e riceverai un{" "}
            <span className="font-medium text-indigo-200">link magico</span> per entrare.
          </p>
          <p className="mt-1 text-xs text-slate-400 uppercase tracking-[0.25em]">
            SII AUDACE · CAMBIA LE REGOLE DEL GIOCO
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-black/50 shadow-xl shadow-black/50 backdrop-blur-xl p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-slate-200">
              Email di accesso
              <input
                type="email"
                autoComplete="email"
                placeholder="tu@azienda.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Invio in corso..." : "Invia link magico"}
            </button>
          </form>

          {message && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
              {message}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-100">
              {error}
            </div>
          )}

          <p className="pt-2 text-[11px] leading-relaxed text-slate-500">
            L’accesso è senza password: ogni link è valido per un tempo limitato e può essere usato
            solo una volta. Se non ricevi l’email, controlla anche la cartella spam.
          </p>
        </div>
      </main>
    </div>
  );
}
