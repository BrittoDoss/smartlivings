import { randomUUID } from "crypto";
import { getSupabaseAdminClient } from "@/lib/supabase";

export type SubmissionFile = {
  name: string;
  type: string;
  size: number;
};

export type SubmissionInput = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budgetRange: string;
  message: string;
  submittedAt: string;
  fileMeta: SubmissionFile | null;
  fileBytes: Buffer | null;
};

const FILE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "contact-files";
const TABLE_NAME = process.env.SUPABASE_SUBMISSIONS_TABLE ?? "contact_submissions";

function sanitizeFilename(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9._-]+/g, "_");
}

export async function storeSubmission(input: SubmissionInput) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  let filePath: string | null = null;

  if (input.fileMeta && input.fileBytes) {
    const dateFolder = input.submittedAt.slice(0, 10);
    filePath = `${dateFolder}/${randomUUID()}-${sanitizeFilename(input.fileMeta.name)}`;

    const { error: uploadError } = await supabase.storage
      .from(FILE_BUCKET)
      .upload(filePath, input.fileBytes, {
        contentType: input.fileMeta.type,
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Failed to upload file: ${uploadError.message}`);
    }
  }

  const { error: insertError } = await supabase.from(TABLE_NAME).insert({
    name: input.name,
    email: input.email,
    phone: input.phone,
    project_type: input.projectType,
    budget_range: input.budgetRange,
    message: input.message,
    file_name: input.fileMeta?.name ?? null,
    file_type: input.fileMeta?.type ?? null,
    file_size: input.fileMeta?.size ?? null,
    file_path: filePath,
    submitted_at: input.submittedAt,
  });

  if (insertError) {
    throw new Error(`Failed to save submission: ${insertError.message}`);
  }

  return { filePath };
}

export async function listSubmissions(limit = 100) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select(
      "id,name,email,phone,project_type,budget_range,message,file_name,file_type,file_size,file_path,submitted_at,created_at",
    )
    .order("submitted_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch submissions: ${error.message}`);
  }

  return data ?? [];
}
