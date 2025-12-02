import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // <-- QUI passiamo URL e ANON KEY esplicitamente
  const supabase = createMiddlewareClient(
    { req, res },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const p = req.nextUrl.pathname;
  const isProtected = p === "/" || p.startsWith("/sfide");
  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return res;
}

export const config = { matcher: ["/((?!_next|favicon.ico|api|public).*)"] };
