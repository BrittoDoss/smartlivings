import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";
import { listSubmissions } from "@/lib/submissions";

export const metadata: Metadata = {
  title: "Admin Submissions | SmartLivings",
  robots: {
    index: false,
    follow: false,
  },
};

function formatDate(value?: string | null): string {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

export default async function AdminSubmissionsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token || !(await verifyAdminSessionToken(token))) {
    redirect("/admin/login");
  }

  let submissions: Awaited<ReturnType<typeof listSubmissions>> = [];
  let loadError: string | null = null;

  try {
    submissions = await listSubmissions(200);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unable to load submissions.";
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-tight text-zinc-900">
            Contact Submissions
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            External storage records from the SmartLivings website.
          </p>
        </div>
        <AdminLogoutButton />
      </div>

      {loadError ? (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {loadError}
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Submitted</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Project</th>
              <th className="px-4 py-3 font-semibold">Budget</th>
              <th className="px-4 py-3 font-semibold">Message</th>
              <th className="px-4 py-3 font-semibold">File</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-zinc-500">
                  No submissions found.
                </td>
              </tr>
            ) : (
              submissions.map((submission) => (
                <tr key={submission.id} className="border-t border-zinc-200 align-top">
                  <td className="px-4 py-3 text-zinc-700">
                    {formatDate(submission.submitted_at ?? submission.created_at)}
                  </td>
                  <td className="px-4 py-3 font-medium text-zinc-900">{submission.name}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`mailto:${submission.email}`}
                      className="text-teal-700 hover:text-teal-600"
                    >
                      {submission.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-zinc-700">{submission.phone}</td>
                  <td className="px-4 py-3 text-zinc-700">{submission.project_type}</td>
                  <td className="px-4 py-3 text-zinc-700">{submission.budget_range}</td>
                  <td className="max-w-sm px-4 py-3 text-zinc-700">{submission.message}</td>
                  <td className="px-4 py-3 text-xs text-zinc-600">
                    {submission.file_name ? (
                      <div>
                        <p className="font-medium text-zinc-800">{submission.file_name}</p>
                        <p>{submission.file_type}</p>
                        <p>{submission.file_size ? `${submission.file_size} bytes` : ""}</p>
                        <p className="mt-1 break-all text-zinc-500">{submission.file_path}</p>
                      </div>
                    ) : (
                      "No file"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
