"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export function ClientSignOutButton() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const onSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={onSignOut}
      className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
    >
      Sign Out
    </button>
  );
}
