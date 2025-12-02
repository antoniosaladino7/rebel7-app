import { NextResponse } from "next/server"; import { createClient } from "@/lib/supabaseServer";
export async function GET() {
  const supabase = createClient(); const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return NextResponse.json({ url: `${origin}/login?ref=${user.id}` });
}
