"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryItem, ProjectCategory } from "@/lib/site";
import { projectCategories } from "@/lib/site";

const ratioFor = (span: GalleryItem["span"]) =>
  span === "tall" ? "aspect-[9/13]" : span === "wide" ? "aspect-[13/8]" : "aspect-[5/4]";

export function ProjectGallery({
  items,
  showFilters = true,
}: {
  items: GalleryItem[];
  showFilters?: boolean;
}) {
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const visible = useMemo(
    () => (category === "All" ? items : items.filter((i) => i.category === category)),
    [items, category],
  );

  const close = useCallback(() => {
    setOpenIndex(null);
    lastFocused.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + delta + visible.length) % visible.length;
      });
    },
    [visible.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      // Keep focus inside the lightbox while it is open.
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  // A filter change must not leave the lightbox pointing at a removed item.
  useEffect(() => {
    setOpenIndex(null);
  }, [category]);

  const active = openIndex === null ? null : visible[openIndex];

  return (
    <div>
      {showFilters ? (
        <div
          role="group"
          aria-label="Filter projects by category"
          className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0"
        >
          {projectCategories.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              aria-pressed={category === option}
              className={cn(
                "min-h-11 shrink-0 border px-5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                category === option
                  ? "border-charcoal bg-charcoal text-white"
                  : "border-line bg-white text-slate hover:border-charcoal hover:text-ink",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}

      {/* CSS columns give a true masonry rhythm without a layout library. */}
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {visible.map((item, index) => (
          <li key={item.id} className="break-inside-avoid">
            <button
              type="button"
              onClick={(e) => {
                lastFocused.current = e.currentTarget;
                setOpenIndex(index);
              }}
              className="group relative block w-full overflow-hidden bg-shell-deep text-left"
              aria-label={`Open ${item.title}`}
            >
              <div className={cn("relative w-full", ratioFor(item.span))}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                  unoptimized={item.image.endsWith(".svg")}
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.05]"
                />
              </div>

              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
              />

              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <span>
                  <span className="block text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-orange">
                    {item.category}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-white">
                    {item.title}
                  </span>
                </span>
                <Expand size={18} className="shrink-0 text-white" aria-hidden />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {visible.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate">
          No items in this category yet.
        </p>
      ) : null}

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-orange">
                {active.category}
              </p>
              <p className="truncate text-sm font-semibold text-white">{active.title}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="inline-flex size-11 shrink-0 items-center justify-center border border-white/25 text-white transition-colors hover:border-white hover:bg-white/10"
              aria-label="Close image viewer"
            >
              <X size={20} aria-hidden />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3 sm:px-8 sm:pb-6">
            <div className="relative h-full w-full max-w-5xl">
              <Image
                src={active.image}
                alt={active.alt}
                fill
                sizes="100vw"
                unoptimized={active.image.endsWith(".svg")}
                className="object-contain"
              />
            </div>

            {visible.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 inline-flex size-11 items-center justify-center border border-white/25 bg-ink/50 text-white transition-colors hover:border-white sm:left-0"
                >
                  <ChevronLeft size={20} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-2 inline-flex size-11 items-center justify-center border border-white/25 bg-ink/50 text-white transition-colors hover:border-white sm:right-0"
                >
                  <ChevronRight size={20} aria-hidden />
                </button>
              </>
            ) : null}
          </div>

          <p className="px-5 pb-5 text-center text-[0.68rem] uppercase tracking-[0.16em] text-white/45 sm:px-8">
            {active.kind === "reference"
              ? "Design reference image"
              : "Betta Aluminium Solutions project"}{" "}
            &middot; {openIndex! + 1} / {visible.length}
          </p>

          {/* Click-away layer, kept behind the controls. */}
          <button
            type="button"
            onClick={close}
            aria-hidden
            tabIndex={-1}
            className="absolute inset-0 -z-10 cursor-default"
          />
        </div>
      ) : null}
    </div>
  );
}
