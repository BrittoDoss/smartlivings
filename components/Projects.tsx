import Image from "next/image";
import type { SiteCopy } from "@/lib/i18n";
import { ProjectSlideshow } from "@/components/ProjectSlideshow";

const almereVogelhorstSlides = [
  "/images/project1/img.png",
  "/images/project1/img_1.png",
  "/images/project1/img_2.png",
  "/images/project1/img_3.png",
  "/images/project1/img_4.png",
  "/images/project1/img_5.png",
  "/images/project1/img_6.png",
  "/images/project1/img_7.png",
  "/images/project1/img_8.png",
  "/images/project1/img_9.png",
  "/images/project1/img_10.png",
  "/images/project1/img_11.png",
  "/images/project1/img_12.png",
  "/images/project1/img_13.png",
  "/images/project1/img_14.png",
  "/images/project1/img_15.png",
  "/images/project1/img_16.png",
  "/images/project1/img_17.png",
  "/images/project1/img_18.png",
  "/images/project1/img_19.png",
  "/images/project1/img_20.png",
  "/images/project1/img_21.png",
  "/images/project1/img_22.png",
  "/images/project1/img_23.png",
];

const projectImages = [
  "https://images.pexels.com/photos/27059629/pexels-photo-27059629.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/10827348/pexels-photo-10827348.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/8082562/pexels-photo-8082562.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

type ProjectsProps = {
  copy: SiteCopy["projects"];
};

export function Projects({ copy }: ProjectsProps) {
  return (
    <section id="projects" className="border-b border-zinc-200/80 bg-zinc-50/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="fade-up">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-zinc-900 sm:text-4xl">
            {copy.title}
          </h2>
        </div>
        <div className="mt-10 grid gap-6">
          {copy.items.map((project, index) => (
            <article
              key={project.title}
              className={`fade-up group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${index % 2 === 1 ? "fade-delay-1" : ""}`}
            >
              {index === 0 ? (
                <ProjectSlideshow images={almereVogelhorstSlides} alt={project.title} />
              ) : (
                <div className="relative h-80 w-full bg-zinc-100 sm:h-[80vh]">
                  <Image
                    src={projectImages[index - 1] ?? projectImages[0]}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                </div>
              )}
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
