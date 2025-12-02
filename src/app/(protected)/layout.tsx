import { createClient } from "@/lib/supabaseServer";
import Link from "next/link";
export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  await supabase.auth.getUser();
  return (
    <section>
      <header className="flex items-center justify-between p-4 border-b border-neutral-800">
        <div className="font-bold">Rebel7</div>
        <nav className="flex gap-4 text-sm opacity-90">
          <Link href="/">Dashboard</Link>
          <Link href="/sfide">Sfide</Link>
          <form action="/api/logout" method="post"><button className="opacity-80 hover:opacity-100">Logout</button></form>
        </nav>
      </header>
      <div className="p-4 border-b border-neutral-800">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            <div className="text-xs uppercase opacity-60">XP</div>
            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden"><div className="h-full bg-white w-[35%]" /></div>
          </div>
          <Link href={`/api/referral/link`} className="px-3 py-1 rounded-lg bg-white text-black text-sm font-semibold">Copia referral</Link>
          <Link href={`/api/referral/qr`} className="px-3 py-1 rounded-lg border border-white/20 text-sm">QR</Link>
        </div>
      </div>
      <div className="max-w-5xl mx-auto p-4">{children}</div>
    </section>
  );
}
