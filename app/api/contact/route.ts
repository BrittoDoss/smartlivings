import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const allowedProjectTypes = new Set(["New Build", "Renovation", "Interiors"]);
const allowedBudgetRanges = new Set([
  "Below €25k",
  "€25k - €50k",
  "€50k - €100k",
  "€100k+",
]);
const allowedFileTypes = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = readString(formData, "name");
    const email = readString(formData, "email");
    const phone = readString(formData, "phone");
    const projectType = readString(formData, "projectType");
    const budgetRange = readString(formData, "budgetRange");
    const message = readString(formData, "message");

    if (!name || !email || !phone || !projectType || !budgetRange || !message) {
      return NextResponse.json(
        { message: "Please complete all required form fields." },
        { status: 400 },
      );
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
    }

    if (!allowedProjectTypes.has(projectType)) {
      return NextResponse.json({ message: "Invalid project type." }, { status: 400 });
    }

    if (!allowedBudgetRanges.has(budgetRange)) {
      return NextResponse.json({ message: "Invalid budget range." }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json(
        { message: "Project message is too short." },
        { status: 400 },
      );
    }

    const file = formData.get("file");
    let fileMeta: { name: string; type: string; size: number } | null = null;

    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { message: "File must be under 10MB." },
          { status: 400 },
        );
      }

      if (!allowedFileTypes.has(file.type)) {
        return NextResponse.json(
          { message: "Unsupported file type." },
          { status: 400 },
        );
      }

      const bytes = Buffer.from(await file.arrayBuffer());
      fileMeta = {
        name: file.name,
        type: file.type,
        size: file.size,
      };

      console.log("[contact] file bytes received:", bytes.byteLength);
    }

    const payload = {
      name,
      email,
      phone,
      projectType,
      budgetRange,
      message,
      file: fileMeta,
      submittedAt: new Date().toISOString(),
    };

    console.log("[contact] lead payload:", payload);

    // Integration point: send payload via email service (Resend/Nodemailer).
    // Integration point: store bytes/file in S3 or Cloudinary and save public URL.

    return NextResponse.json(
      { message: "Thanks! Your request has been received." },
      { status: 200 },
    );
  } catch (error) {
    console.error("[contact] API error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
