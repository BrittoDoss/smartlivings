"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Mode = "login" | "signup";

export function ClientLoginPanel() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [mode, setMode] = useState<Mode>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "error" | "success"; text: string } | null>(
    null,
  );

  const onOAuthSignIn = async (provider: "google" | "twitter") => {
    setStatus(null);
    setIsSubmitting(true);

    const redirectTo = `${window.location.origin}/auth/callback?next=/account`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });

    if (error) {
      setStatus({ type: "error", text: error.message });
      setIsSubmitting(false);
    }
  };

  const onPasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setStatus({ type: "error", text: "Email and password are required." });
      setIsSubmitting(false);
      return;
    }

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setStatus({ type: "error", text: error.message });
      } else {
        router.push("/account");
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setStatus({ type: "error", text: error.message });
      } else {
        setStatus({
          type: "success",
          text: "Account created. Check your inbox to confirm your email.",
        });
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="soft-panel w-full max-w-md rounded-2xl p-7">
      <h1 className="font-display text-3xl tracking-tight text-zinc-900">Client Login</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Sign in with social account or email to manage your applications.
      </p>

      <div className="mt-6 grid gap-3">
        <button
          type="button"
          onClick={() => onOAuthSignIn("google")}
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-800 transition hover:border-zinc-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Continue with Google
        </button>
        <button
          type="button"
          onClick={() => onOAuthSignIn("twitter")}
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-800 transition hover:border-zinc-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Continue with X
        </button>
      </div>

      <div className="my-6 h-px bg-zinc-200" />

      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`rounded-full px-4 py-1 text-xs font-semibold ${mode === "login" ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-700"}`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`rounded-full px-4 py-1 text-xs font-semibold ${mode === "signup" ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-700"}`}
        >
          Sign Up
        </button>
      </div>

      <form className="grid gap-3" onSubmit={onPasswordSubmit} noValidate>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-200"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-200"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center rounded-full bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
        </button>
      </form>

      {status ? (
        <p className={`mt-4 text-sm ${status.type === "error" ? "text-red-600" : "text-green-700"}`}>
          {status.text}
        </p>
      ) : null}
    </div>
  );
}
