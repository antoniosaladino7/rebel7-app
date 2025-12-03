"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  // Protezione della pagina: se non sei loggato vai al login
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        router.replace("/login");
        return;
      }

      setUserEmail(data.user.email ?? null);
      setLoading(false);
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
        <p>Carico il tuo ESG Hub…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Rebel7 ESG Core Engine</h1>
          <p className="text-xs text-slate-400">
            Accesso riservato · {userEmail}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs px-3 py-1 rounded-md border border-white/20 hover:bg-white/10"
        >
          Esci
        </button>
      </header>

      <main className="px-6 py-8">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
          <h2 className="text-xl font-semibold mb-2">
            Benvenuto nel tuo ESG Hub
          </h2>
          <p className="text-sm text-slate-300 mb-4">
            Qui collegheremo ESG Premium, AI Endogena, Certificazione, Alert
            predittivi e tutto il resto del motore Rebel7.
          </p>
          <p className="text-xs text-slate-500">
            Per ora è una dashboard placeholder, ma è già protetta da login
            con magic link Supabase.
          </p>
        </div>
      </main>
    </div>
  );
}

