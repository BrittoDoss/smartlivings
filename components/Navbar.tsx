const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <a
          href="#home"
          className="font-display text-2xl leading-none tracking-tight text-zinc-900"
          aria-label="SmartLivings home"
        >
          SmartLivings
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
          <a
            href="#contact"
            className="inline-flex h-10 items-center rounded-full bg-teal-700 px-4 text-xs font-semibold tracking-wide text-white transition hover:bg-teal-600"
          >
            Free Consultation
          </a>
        </nav>
      </div>
    </header>
  );
}
