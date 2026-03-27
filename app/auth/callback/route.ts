import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/account";

  if (!url || !anonKey) {
    return NextResponse.redirect(new URL("/login?error=config", requestUrl.origin));
  }

  const redirectResponse = NextResponse.redirect(new URL(next, requestUrl.origin));

  if (!code) {
    return redirectResponse;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          redirectResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  await supabase.auth.exchangeCodeForSession(code);
  return redirectResponse;
}
