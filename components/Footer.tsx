import type { SiteCopy } from "@/lib/i18n";

type FooterProps = {
  copy: SiteCopy["footer"];
};

export function Footer({ copy }: FooterProps) {
  return (
    <footer className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-teal-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-zinc-300 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="font-display text-xl tracking-tight text-white">SmartLivings</p>
        <p className="text-sm text-zinc-200/85">{copy.description}</p>
      </div>
    </footer>
  );
}
