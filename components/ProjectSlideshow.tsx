"use client";

import Image from "next/image";
import { startTransition, useEffect, useState } from "react";

type ProjectSlideshowProps = {
  images: string[];
  alt: string;
};

export function ProjectSlideshow({ images, alt }: ProjectSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;

  const goTo = (index: number) => {
    const nextIndex = (index + total) % total;
    startTransition(() => {
      setActiveIndex(nextIndex);
    });
  };

  useEffect(() => {
    if (total < 2) {
      return;
    }

    const interval = setInterval(() => {
      startTransition(() => {
        setActiveIndex((previousIndex) => (previousIndex + 1) % total);
      });
    }, 4200);

    return () => clearInterval(interval);
  }, [total]);

  return (
    <div className="relative h-80 w-full overflow-hidden bg-zinc-100 sm:h-[80vh]">
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          priority={index === 0}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

      <button
        type="button"
        onClick={() => goTo(activeIndex - 1)}
        className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/45 px-3 py-1 text-sm font-bold text-white backdrop-blur transition hover:bg-black/60"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => goTo(activeIndex + 1)}
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/45 px-3 py-1 text-sm font-bold text-white backdrop-blur transition hover:bg-black/60"
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/35 px-3 py-1 backdrop-blur-sm">
        {images.map((image, index) => (
          <button
            type="button"
            key={`${image}-dot`}
            onClick={() => goTo(index)}
            className={`h-1.5 w-1.5 rounded-full transition ${index === activeIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
