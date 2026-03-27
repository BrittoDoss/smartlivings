"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(result.message ?? "Login failed.");
      }

      router.push("/admin");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unable to login.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="soft-panel w-full max-w-md rounded-2xl p-7"
      noValidate
    >
      <h1 className="font-display text-3xl tracking-tight text-zinc-900">
        Admin Login
      </h1>
      <p className="mt-2 text-sm text-zinc-600">
        Sign in to view SmartLivings contact submissions.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="username" className="mb-2 block text-sm font-medium text-zinc-800">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-800">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
