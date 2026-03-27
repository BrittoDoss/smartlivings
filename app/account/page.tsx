import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ClientSignOutButton } from "@/components/ClientSignOutButton";
import { createSupabaseAuthServerClient } from "@/lib/supabase-auth-server";
import { isClientLoginEnabled } from "@/lib/features";

export const metadata: Metadata = {
  title: "My Account | SmartLivings",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  if (!isClientLoginEnabled()) {
    redirect("/");
  }

  const supabase = await createSupabaseAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const providers = user.app_metadata?.providers as string[] | undefined;

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12 lg:px-8">
      <div className="soft-panel rounded-2xl p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Client Area</p>
            <h1 className="mt-2 font-display text-4xl tracking-tight text-zinc-900">
              Welcome
            </h1>
          </div>
          <ClientSignOutButton />
        </div>

        <div className="mt-7 grid gap-4 rounded-xl border border-zinc-200 bg-white p-5 text-sm text-zinc-700">
          <p>
            <span className="font-semibold text-zinc-900">Email:</span>{" "}
            {user.email ?? "-"}
          </p>
          <p>
            <span className="font-semibold text-zinc-900">User ID:</span> {user.id}
          </p>
          <p>
            <span className="font-semibold text-zinc-900">Provider(s):</span>{" "}
            {providers?.join(", ") ?? "email"}
          </p>
          <p className="text-zinc-500">
            Application tracking and user messaging will be added next.
          </p>
        </div>
      </div>
    </main>
  );
}
