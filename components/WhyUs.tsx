const points = [
  "Cost-efficient solutions",
  "Premium quality materials",
  "End-to-end service",
  "Reliable execution in NL",
];

export function WhyUs() {
  return (
    <section className="border-b border-zinc-200/80 bg-gradient-to-br from-zinc-900 via-zinc-800 to-teal-900">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="fade-up lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-300">
            Why Choose Us
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-white sm:text-4xl">
            One team, one process, zero guesswork
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-200 sm:text-base">
            SmartLivings combines design intelligence, sourcing power, and
            disciplined execution to deliver better outcomes for homeowners in
            the Netherlands.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {points.map((point, index) => (
            <div
              key={point}
              className={`fade-up rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm ${index > 0 ? `fade-delay-${Math.min(index, 3)}` : ""}`}
            >
              <p className="text-base font-medium tracking-tight text-white">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
