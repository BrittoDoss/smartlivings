import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="border-b border-zinc-200/80">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 pt-14 pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8 lg:pt-18 lg:pb-24">
        <div className="fade-up lg:col-span-6">
          <p className="mb-5 inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs uppercase tracking-[0.16em] text-teal-800">
            Interior Design & Execution in NL
          </p>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Build your dream home in the Netherlands &mdash; smarter and more
            affordable
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            Interior design, global sourcing, and full execution.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-teal-700 px-7 text-sm font-semibold text-white shadow-lg shadow-teal-900/20 transition hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2"
            >
              Get Free Consultation
            </a>
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 bg-white/80 px-7 text-sm font-semibold text-zinc-800 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
            >
              View Projects
            </a>
          </div>
        </div>
        <div className="fade-up fade-delay-1 lg:col-span-6">
          <div className="soft-panel relative overflow-hidden rounded-3xl p-2">
            <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[420px]">
              <Image
                src="https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Modern premium interior living room"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
              <p className="absolute right-4 bottom-4 rounded-full bg-white/92 px-4 py-2 text-xs font-medium tracking-wide text-zinc-800">
                Dutch-style premium finish
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
