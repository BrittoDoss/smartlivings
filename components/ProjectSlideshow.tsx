"use client";

import Image from "next/image";
import { startTransition, useEffect, useState } from "react";

type ProjectSlideshowProps = {
  images: string[];
  alt: string;
};

export function ProjectSlideshow({ images, alt }: ProjectSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const total = images.length;

  const goTo = (index: number) => {
    const nextIndex = (index + total) % total;
    startTransition(() => {
      setActiveIndex(nextIndex);
    });
  };

  const goToNext = () => {
    startTransition(() => {
      setActiveIndex((previousIndex) => (previousIndex + 1) % total);
    });
  };

  const goToPrevious = () => {
    startTransition(() => {
      setActiveIndex((previousIndex) => (previousIndex - 1 + total) % total);
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

  useEffect(() => {
    if (!isFullscreen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
        return;
      }
      if (event.key === "ArrowRight") {
        startTransition(() => {
          setActiveIndex((previousIndex) => (previousIndex + 1) % total);
        });
        return;
      }
      if (event.key === "ArrowLeft") {
        startTransition(() => {
          setActiveIndex((previousIndex) => (previousIndex - 1 + total) % total);
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFullscreen, total]);

  useEffect(() => {
    if (!isFullscreen) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFullscreen]);

  return (
    <>
      <div className="group relative h-80 w-full overflow-hidden bg-zinc-100 sm:h-[70vh]">
        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`cursor-zoom-in object-cover transition-all duration-700 group-hover:scale-[1.02] ${index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"}`}
            priority={index === 0}
            onClick={() => setIsFullscreen(true)}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 left-4 z-30 rounded-full bg-black/45 p-3 text-xl leading-none font-bold text-white backdrop-blur transition hover:bg-black/70"
          aria-label={`Open ${alt} slideshow in fullscreen`}
        >
          ⤢
        </button>

        <div className="absolute top-4 right-4 z-20 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
          {activeIndex + 1} / {total}
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-black/45 p-4 text-4xl leading-none font-bold text-white backdrop-blur transition hover:bg-black/70"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={goToNext}
          className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-black/45 p-4 text-4xl leading-none font-bold text-white backdrop-blur transition hover:bg-black/70"
          aria-label="Next slide"
        >
          ›
        </button>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/35 px-3 py-1.5 backdrop-blur-sm">
          {images.map((image, index) => (
            <button
              type="button"
              key={`${image}-dot`}
              onClick={() => goTo(index)}
              className={`h-2 w-2 rounded-full transition ${index === activeIndex ? "bg-white" : "bg-white/45 hover:bg-white/80"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <p className="absolute bottom-4 right-4 z-20 rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          Click image or zoom icon
        </p>
      </div>

      {isFullscreen ? (
        <div className="fixed inset-0 z-[120] bg-black">
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute top-5 right-5 z-30 rounded-full bg-white/20 p-3 text-2xl leading-none font-bold text-white backdrop-blur transition hover:bg-white/35"
            aria-label="Close fullscreen slideshow"
          >
            ×
          </button>
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute top-1/2 left-5 z-30 -translate-y-1/2 rounded-full bg-white/15 p-5 text-6xl leading-none font-bold text-white backdrop-blur transition hover:bg-white/30"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute top-1/2 right-5 z-30 -translate-y-1/2 rounded-full bg-white/15 p-5 text-6xl leading-none font-bold text-white backdrop-blur transition hover:bg-white/30"
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="relative h-screen w-screen">
            <Image
              src={images[activeIndex]}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            <span>
              {activeIndex + 1} / {total}
            </span>
            <div className="flex gap-1.5">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-fullscreen-dot`}
                  onClick={() => goTo(index)}
                  className={`h-2 w-2 rounded-full transition ${index === activeIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <p className="absolute bottom-5 right-5 z-30 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            Press ESC to exit
          </p>
        </div>
      ) : null}
    </>
  );
}
