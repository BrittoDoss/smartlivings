"use client";

import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

type FormFields =
  | "name"
  | "email"
  | "phone"
  | "projectType"
  | "budgetRange"
  | "message"
  | "file";

type FormErrors = Partial<Record<FormFields, string>>;

const PROJECT_TYPES = ["New Build", "Renovation", "Interiors"] as const;

const BUDGET_RANGES = [
  "Below €25k",
  "€25k - €50k",
  "€50k - €100k",
  "€100k+",
] as const;

const inputClassName =
  "w-full rounded-xl border border-zinc-300 bg-white/95 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 transition focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-200";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\s()-]{7,20}$/;

function validate(formData: FormData): FormErrors {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const projectType = String(formData.get("projectType") ?? "").trim();
  const budgetRange = String(formData.get("budgetRange") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const file = formData.get("file");

  const errors: FormErrors = {};

  if (name.length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!phonePattern.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!PROJECT_TYPES.includes(projectType as (typeof PROJECT_TYPES)[number])) {
    errors.projectType = "Please choose a project type.";
  }

  if (!BUDGET_RANGES.includes(budgetRange as (typeof BUDGET_RANGES)[number])) {
    errors.budgetRange = "Please choose a budget range.";
  }

  if (message.length < 10) {
    errors.message = "Please share a short project brief (minimum 10 characters).";
  }

  if (file instanceof File && file.size > 0) {
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      errors.file = "File must be under 10MB.";
    }
  }

  return errors;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Could not submit your request.");
      }

      setStatus({
        type: "success",
        message: result.message ?? "Thank you. We will contact you shortly.",
      });
      formElement.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Submission failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="border-b border-zinc-200/80 bg-gradient-to-br from-amber-50/70 via-white to-teal-50/60"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="fade-up max-w-3xl">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
            Contact
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-zinc-950 sm:text-4xl">
            Request your free quote
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Share your project details and upload any floor plans or references.
            Our team will respond with the next steps.
          </p>
        </div>

        <form
          className="fade-up fade-delay-1 soft-panel mt-10 grid gap-5 rounded-2xl p-6 sm:grid-cols-2"
          onSubmit={onSubmit}
          encType="multipart/form-data"
          noValidate
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-800">
              Name
            </label>
            <input id="name" name="name" type="text" className={cn(inputClassName, errors.name ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "")} />
            {errors.name ? <p className="mt-2 text-xs text-red-600">{errors.name}</p> : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-800">
              Email
            </label>
            <input id="email" name="email" type="email" className={cn(inputClassName, errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "")} />
            {errors.email ? <p className="mt-2 text-xs text-red-600">{errors.email}</p> : null}
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-zinc-800">
              Phone
            </label>
            <input id="phone" name="phone" type="tel" className={cn(inputClassName, errors.phone ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "")} />
            {errors.phone ? <p className="mt-2 text-xs text-red-600">{errors.phone}</p> : null}
          </div>

          <div>
            <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-zinc-800">
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              defaultValue=""
              className={cn(
                inputClassName,
                errors.projectType ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "",
              )}
            >
              <option value="" disabled>
                Select project type
              </option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.projectType ? <p className="mt-2 text-xs text-red-600">{errors.projectType}</p> : null}
          </div>

          <div>
            <label htmlFor="budgetRange" className="mb-2 block text-sm font-medium text-zinc-800">
              Budget Range
            </label>
            <select
              id="budgetRange"
              name="budgetRange"
              defaultValue=""
              className={cn(
                inputClassName,
                errors.budgetRange ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "",
              )}
            >
              <option value="" disabled>
                Select budget range
              </option>
              {BUDGET_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            {errors.budgetRange ? <p className="mt-2 text-xs text-red-600">{errors.budgetRange}</p> : null}
          </div>

          <div>
            <label htmlFor="file" className="mb-2 block text-sm font-medium text-zinc-800">
              File Upload
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept=".pdf,image/png,image/jpeg,image/webp"
              className={cn(
                "block w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-600 file:mr-4 file:rounded-full file:border-0 file:bg-teal-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-600 focus:outline-none",
                errors.file ? "border-red-400" : "",
              )}
            />
            <p className="mt-2 text-xs text-zinc-500">
              Upload floor plans, inspiration images, or PDFs (max 10MB).
            </p>
            {errors.file ? <p className="mt-2 text-xs text-red-600">{errors.file}</p> : null}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-800">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={cn(
                inputClassName,
                "resize-y",
                errors.message ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "",
              )}
              placeholder="Tell us about your timeline, preferences, and goals."
            />
            {errors.message ? <p className="mt-2 text-xs text-red-600">{errors.message}</p> : null}
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 items-center justify-center rounded-full bg-teal-700 px-7 text-sm font-semibold text-white shadow-lg shadow-teal-900/20 transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Get Free Consultation"}
            </button>
            {status ? (
              <p
                className={cn(
                  "mt-4 text-sm",
                  status.type === "success" ? "text-green-700" : "text-red-600",
                )}
              >
                {status.message}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
