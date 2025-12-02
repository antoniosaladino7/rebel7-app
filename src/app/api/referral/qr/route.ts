import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";
import QRCode from "qrcode";

export async function GET(request: Request) {
  const origin =
    request.headers.get("origin") ??
    (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const refUrl = `${origin}/login?ref=${user.id}`;
  const png = await QRCode.toBuffer(refUrl, { width: 512, margin: 1 });

  // Converte il Buffer Node in Uint8Array compatibile con NextResponse
  const pngUint8 = new Uint8Array(png);

  return new NextResponse(pngUint8, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}
