"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const slides = [
  {
    image: "/images/hero-slide-1.jpg",
    alt: "Contemporary house with a cantilevered, glazed upper storey",
  },
  {
    image: "/images/hero-slide-2.jpg",
    alt: "Glass-fronted commercial tower seen from below",
  },
  {
    image: "/images/hero-slide-3.jpg",
    alt: "Modern house with large aluminium-framed glass doors onto a lawn",
  },
  {
    image: "/images/hero-slide-4.jpg",
    alt: "House with wide sliding glass doors opening onto a garden",
  },
] as const;

const AUTOPLAY_MS = 6500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused || prefersReducedMotion.current) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, index]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={site.name}
      className="relative isolate overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        // Tabbing between the carousel's own buttons re-fires focus/blur on
        // every change; only resume once focus actually leaves the carousel.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="relative h-[600px] sm:h-[660px] lg:h-[760px]">
        {slides.map((slide, i) => (
          <div
            key={slide.image}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Brand-tinted scrim: a flat dark base so text stays readable over any
            slide, plus a red-to-ink gradient (never orange — it fails contrast
            as a text background) concentrated behind the copy. */}
        <div aria-hidden className="absolute inset-0 bg-ink/55" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent lg:bg-gradient-to-r lg:from-red-deep/95 lg:via-ink/65 lg:to-ink/10"
        />

        <Container className="relative flex h-full items-end pb-20 sm:items-center sm:pb-0">
          <div className="max-w-xl">
            <Eyebrow tone="light">{site.name}</Eyebrow>

            <h1 className="mt-6 text-[2.15rem] leading-[1.06] text-white sm:text-5xl lg:text-[3.4rem]">
              Quality aluminium solutions.
              <span className="mt-2 block text-orange-soft">Built for better spaces.</span>
            </h1>

            <p className="mt-7 max-w-lg text-[1.02rem] leading-relaxed text-white/80 sm:text-[1.08rem]">
              Professional aluminium windows, doors, partitions, shopfronts and
              custom fabrication for residential and commercial spaces.
            </p>

            <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <Button href="/contact" variant="light" size="lg">
                Get a Free Quote
                <ArrowRight size={16} aria-hidden />
              </Button>
              <Button href="/projects" variant="outlineLight" size="lg">
                View Our Work
              </Button>
            </div>
          </div>
        </Container>

        <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-6 px-5 sm:justify-end lg:px-12">
          <div className="flex items-center gap-2" role="group" aria-label="Slides">
            {slides.map((slide, i) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1} of ${slides.length}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous slide"
              className="inline-flex size-9 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <ChevronLeft size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next slide"
              className="inline-flex size-9 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <ChevronRight size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play slide show" : "Pause slide show"}
              className="inline-flex size-9 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {paused ? <Play size={15} aria-hidden /> : <Pause size={15} aria-hidden />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
