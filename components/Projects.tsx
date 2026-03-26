import Image from "next/image";

const projects = [
  {
    title: "Canal Apartment",
    description: "Renovation and interior planning for a compact urban home.",
    image:
      "https://images.pexels.com/photos/27059629/pexels-photo-27059629.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Family Villa",
    description: "Premium materials package and custom furniture sourcing.",
    image:
      "https://images.pexels.com/photos/10827348/pexels-photo-10827348.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Modern Loft",
    description: "Full execution with timeline-led coordination in Rotterdam.",
    image:
      "https://images.pexels.com/photos/8082562/pexels-photo-8082562.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "New Build Finish",
    description: "End-to-end implementation for a newly delivered residence.",
    image:
      "https://images.pexels.com/photos/6487969/pexels-photo-6487969.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export function Projects() {
  return (
    <section id="projects" className="border-b border-zinc-200/80 bg-zinc-50/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="fade-up">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
            Projects
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-zinc-900 sm:text-4xl">
            Recent work snapshots
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`fade-up group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${index % 2 === 1 ? "fade-delay-1" : ""}`}
            >
              <div className="relative h-64 w-full bg-zinc-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
