"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates 0 → target once the element scrolls into view. Only used for a
 * genuine accumulation stat (a project total), never a year or a fixed
 * term — counting up to "2020" or "12" doesn't narrate anything real.
 *
 * Purely decorative: the visible counter is `aria-hidden`, and StatsStrip
 * renders the real final value in a `sr-only` span alongside it, so a
 * screen reader gets the fact immediately instead of a moving number.
 */
export function CountUpStat({
  target,
  suffix = "",
  durationMs = 1200,
}: {
  target: number;
  suffix?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // `value` must start at 0 to match the server-rendered markup, so this
      // can't move to a lazy useState initializer without a hydration
      // mismatch — the effect is the correct place to promote it once mounted.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target, durationMs]);

  return (
    <span ref={ref} aria-hidden="true">
      {value}
      {suffix}
    </span>
  );
}
