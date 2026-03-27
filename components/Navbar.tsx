import Image from "next/image";
import Link from "next/link";
import type { Locale, SiteCopy } from "@/lib/i18n";
import { LanguageSelector } from "@/components/LanguageSelector";

type NavbarProps = {
  locale: Locale;
  copy: SiteCopy["navbar"];
};

export function Navbar({ locale, copy }: NavbarProps) {
  const navItems = [
    { label: copy.home, href: "#home" },
    { label: copy.services, href: "#services" },
    { label: copy.projects, href: "#projects" },
    { label: copy.contact, href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
        <a
          href="#home"
          className="inline-flex items-center"
          aria-label="SmartLivings home"
        >
          <Image
            src="/images/smartlivings_logo.png"
            alt="SmartLivings logo"
            width={400}
            height={150}
            priority
            className="h-10 w-auto sm:h-14"
          />
        </a>
        <nav aria-label="Main navigation" className="flex items-center gap-4">
          <ul className="hidden items-center gap-8 text-sm font-medium text-zinc-700 md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/login"
            className="hidden text-sm font-semibold text-zinc-700 transition hover:text-zinc-900 md:inline-flex"
          >
            {copy.clientLogin}
          </Link>
          <LanguageSelector locale={locale} label={copy.language} />
          <a
            href="#contact"
            className="inline-flex h-10 items-center rounded-full bg-teal-700 px-4 text-xs font-semibold tracking-wide text-white transition hover:bg-teal-600"
          >
            {copy.consultationCta}
          </a>
        </nav>
      </div>
    </header>
  );
}
