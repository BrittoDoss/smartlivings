import type { SiteCopy } from "@/lib/i18n";

const accents = [
  "from-teal-500/20 to-cyan-500/15",
  "from-amber-500/20 to-orange-500/15",
  "from-indigo-500/20 to-violet-500/15",
];

type ServicesProps = {
  copy: SiteCopy["services"];
};

export function Services({ copy }: ServicesProps) {
  return (
    <section id="services" className="border-b border-zinc-200/80 bg-white/75">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="fade-up">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-zinc-900 sm:text-4xl">
            {copy.title}
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {copy.items.map((service, index) => (
            <article
              key={service.title}
              className={`fade-up group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${index === 1 ? "fade-delay-1" : ""} ${index === 2 ? "fade-delay-2" : ""}`}
            >
              <div
                className={`mb-5 h-14 w-14 rounded-2xl bg-gradient-to-br ${accents[index] ?? accents[0]}`}
              />
              <h3 className="text-xl font-semibold tracking-tight text-zinc-900">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
