"use client";

import { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type LanguageSelectorProps = {
  locale: Locale;
  label: string;
};

export function LanguageSelector({ locale, label }: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLocale);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <label className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
      <select
        value={locale}
        onChange={onLanguageChange}
        className="cursor-pointer bg-transparent text-xs font-semibold text-zinc-800 outline-none"
        aria-label={label}
      >
        <option value="nl">🇳🇱 NL</option>
        <option value="en">🇬🇧 EN</option>
      </select>
    </label>
  );
}
