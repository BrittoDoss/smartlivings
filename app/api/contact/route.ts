import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { storeSubmission } from "@/lib/submissions";

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

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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
    let fileBytes: Buffer | null = null;

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

      fileBytes = Buffer.from(await file.arrayBuffer());
      fileMeta = {
        name: file.name,
        type: file.type,
        size: file.size,
      };

      console.log("[contact] file bytes received:", fileBytes.byteLength);
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

    try {
      await storeSubmission({
        name,
        email,
        phone,
        projectType,
        budgetRange,
        message,
        submittedAt: payload.submittedAt,
        fileMeta,
        fileBytes,
      });
    } catch (storageError) {
      console.error("[contact] storage error:", storageError);
      return NextResponse.json(
        { message: "Submission storage failed. Please try again." },
        { status: 500 },
      );
    }

    const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT ?? "465");
    const smtpSecure =
      process.env.SMTP_SECURE !== undefined
        ? process.env.SMTP_SECURE === "true"
        : smtpPort === 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.error(
        "[contact] SMTP_USER or SMTP_PASS missing. Cannot send email notification.",
      );
      return NextResponse.json(
        { message: "Email service is not configured yet." },
        { status: 500 },
      );
    }

    const toEmail =
      process.env.CONTACT_TO_EMAIL ?? "smartlivingsinteriordesigner@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? `SmartLivings <${smtpUser}>`;
    const subject = `New SmartLivings consultation request (${projectType})`;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const html = `
      <h2>New Consultation Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
      <p><strong>Budget Range:</strong> ${escapeHtml(budgetRange)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>
      <p><strong>Submitted At:</strong> ${escapeHtml(payload.submittedAt)}</p>
      ${
        fileMeta
          ? `<p><strong>Attachment:</strong> ${escapeHtml(fileMeta.name)} (${fileMeta.type}, ${fileMeta.size} bytes)</p>`
          : "<p><strong>Attachment:</strong> None</p>"
      }
    `;

    const text = [
      "New Consultation Request",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Project Type: ${projectType}`,
      `Budget Range: ${budgetRange}`,
      `Message: ${message}`,
      `Submitted At: ${payload.submittedAt}`,
      fileMeta
        ? `Attachment: ${fileMeta.name} (${fileMeta.type}, ${fileMeta.size} bytes)`
        : "Attachment: None",
    ].join("\n");

    const ownerEmailResult = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject,
      html,
      text,
      replyTo: email,
      attachments:
        fileMeta && fileBytes
          ? [
              {
                filename: fileMeta.name,
                content: fileBytes,
                contentType: fileMeta.type,
              },
            ]
          : undefined,
    });

    const confirmationSubject =
      "We received your SmartLivings consultation request";
    const confirmationHtml = `
      <h2>Thank you for contacting SmartLivings</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>We have received your request and our team will contact you shortly.</p>
      <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
      <p><strong>Budget Range:</strong> ${escapeHtml(budgetRange)}</p>
      <p><strong>Your Message:</strong><br/>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>
      <p>Regards,<br/>SmartLivings</p>
    `;
    const confirmationText = [
      `Hi ${name},`,
      "We have received your SmartLivings consultation request.",
      `Project Type: ${projectType}`,
      `Budget Range: ${budgetRange}`,
      `Your Message: ${message}`,
      "",
      "We will contact you shortly.",
      "SmartLivings",
    ].join("\n");

    const customerEmailResult = await transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: confirmationSubject,
      html: confirmationHtml,
      text: confirmationText,
      replyTo: toEmail,
    });

    console.log("[contact] owner email sent:", ownerEmailResult.messageId);
    console.log("[contact] customer email sent:", customerEmailResult.messageId);

    return NextResponse.json(
      { message: "Thanks! Your request has been received." },
      { status: 200 },
    );
  } catch (error) {
    console.error("[contact] API error / SMTP send failed:", error);
    return NextResponse.json(
      { message: "Something went wrong while sending email. Please try again." },
      { status: 502 },
    );
  }
}
