import { NextResponse } from "next/server"; import { cookies } from "next/headers";
export async function POST() {
  const res = NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
  );

  const cookieStore = await cookies(); // aspetta l'oggetto cookies

  cookieStore.getAll().forEach((ck) => {
    if (ck.name.includes("sb-")) {
      res.cookies.set(ck.name, "", {
        path: "/",
        maxAge: 0,
      });
    }
  });

  return res;
}

