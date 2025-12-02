import { createClient } from "@/lib/supabaseServer";
export default async function SfidePage() {
  const supabase = createClient();
  const { data: quests, error } = await supabase
    .from("daily_quests")
    .select("id, title, description, points, is_active")
    .order("title", { ascending: true });
  if (error) return <div className="text-red-400">Errore: {error.message}</div>;
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Sfide giornaliere</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(quests ?? []).map((q: any) => (
          <div key={q.id} className="border border-neutral-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{q.title}</h3>
              <span className="text-xs opacity-60">{q.points ?? 0} XP</span>
            </div>
            <p className="opacity-80 text-sm">{q.description}</p>
            <div className="text-xs opacity-60">{q.is_active ? "Attiva" : "Non attiva"}</div>
            <form action={`/api/quests/complete?id=${q.id}`} method="post">
              <button className="mt-2 px-3 py-1 rounded-lg bg-white text-black text-sm font-semibold">Completa</button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
