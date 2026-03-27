import type { SiteCopy } from "@/lib/i18n";

type HeroProps = {
  copy: SiteCopy["hero"];
};

export function Hero({ copy }: HeroProps) {
  return (
    <section id="home" className="border-b border-zinc-200/80">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 pt-14 pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8 lg:pt-18 lg:pb-24">
        <div className="fade-up lg:col-span-6">
          <p className="mb-5 inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs uppercase tracking-[0.16em] text-teal-800">
            {copy.badge}
          </p>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            {copy.subtitle}
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-teal-700 px-7 text-sm font-semibold text-white shadow-lg shadow-teal-900/20 transition hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2"
            >
              {copy.primaryCta}
            </a>
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 bg-white/80 px-7 text-sm font-semibold text-zinc-800 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
            >
              {copy.secondaryCta}
            </a>
          </div>
        </div>
        <div className="fade-up fade-delay-1 lg:col-span-6">
          <div className="soft-panel relative overflow-hidden rounded-3xl p-2">
            <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[420px]">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                poster="https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=1600"
                aria-label={copy.videoAriaLabel}
              >
                <source src="/video/Smartlivings.mov" type="video/quicktime" />
                <source src="/video/Smartlivings.mov" />
                Your browser does not support HTML video.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
