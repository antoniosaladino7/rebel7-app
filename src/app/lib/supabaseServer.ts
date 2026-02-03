import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export function createClient() {
  // Passiamo a Supabase la funzione cookies di Next App Router
  const supabase = createServerComponentClient({
    cookies,
  });

  return supabase;
}
