import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login | SmartLivings",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (token && (await verifyAdminSessionToken(token))) {
    redirect("/admin");
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl items-center justify-center px-6 py-14 lg:px-8">
      <AdminLoginForm />
    </main>
  );
}
