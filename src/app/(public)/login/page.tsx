"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    // Usiamo la configurazione di default (SITE_URL) che già funziona
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setError("Errore durante l'invio del link. Riprova tra pochi secondi.");
    } else {
      setMessage("Link di accesso inviato. Controlla la tua email.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo-rebel7.svg"
            alt="Rebel7 Logo"
            width={72}
            height={72}
          />
        </div>

        <h1 className="text-center text-xl font-semibold text-gray-900 mb-2">
          Rebel7 ESG Core Engine
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          Inserisci la tua email per ricevere un link magico di accesso.
        </p>

        <form onSubmit={handleMagicLink} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email di lavoro
            </label>
            <input
              type="email"
              required
              placeholder="tu@azienda.com"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-900
                         focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
                         placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-sm rounded-md bg-red-50 text-red-800 px-3 py-2">
              {error}
            </div>
          )}

          {message && (
            <div className="text-sm rounded-md bg-green-50 text-green-800 px-3 py-2">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-sm font-semibold rounded-md
                       bg-blue-600 text-white hover:bg-blue-700
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition-colors"
          >
            {loading ? "Invio del link..." : "Accedi con Magic Link"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          L&apos;accesso è senza password. Ogni link è valido per un tempo limitato
          e può essere usato una sola volta.
        </p>

        <p className="mt-4 text-center text-[11px] text-gray-400">
          © {new Date().getFullYear()} Rebel7 — Sii Audace. Cambia le Regole del Gioco.
        </p>
      </div>
    </div>
  );
}

