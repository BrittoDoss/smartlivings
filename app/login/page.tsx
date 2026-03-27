import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ClientLoginPanel } from "@/components/ClientLoginPanel";
import { createSupabaseAuthServerClient } from "@/lib/supabase-auth-server";

export const metadata: Metadata = {
  title: "Client Login | SmartLivings",
};

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const supabase = await createSupabaseAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/account");
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl items-center justify-center px-6 py-14 lg:px-8">
      <ClientLoginPanel />
    </main>
  );
}
