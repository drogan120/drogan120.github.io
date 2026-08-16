"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element first scrolls into view.
 *
 * Starts false on both server and client so hydration matches, which is the
 * same constraint Reveal works under.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.3
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/**
 * Counts from 0 up to `target` once `active` turns true.
 *
 * Driven by requestAnimationFrame against real elapsed time rather than a
 * per-frame increment, so the duration holds regardless of refresh rate. Honours
 * prefers-reduced-motion by jumping straight to the final value.
 */
export function useCountUp(target: number, active: boolean, duration = 1400) {
  // Seeded with the final value, not 0. Starting at 0 meant the prerendered
  // HTML (and anyone without JS) showed "0+" instead of the real figure, and
  // since the value is identical on server and client there's no hydration
  // mismatch. The rAF below overwrites it with ~0 on its first frame once the
  // section scrolls into view, so the count-up still plays.
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!active) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion collapses the duration to zero rather than short-circuiting
    // with a synchronous setValue — writing state directly in an effect body
    // triggers a cascading render (and the lint rule that guards against it),
    // so the very first frame just resolves to the final number instead.
    const span = reduced ? 0 : duration;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = span <= 0 ? 1 : Math.min((now - start) / span, 1);
      // easeOutCubic: fast start, settles gently on the final number.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}

/**
 * Splits a numeric stat like "5+" or "20+" into the number to animate and the
 * suffix to keep. Returns null when there is no leading number, so callers can
 * fall back to rendering the raw string.
 */
export function splitStat(raw: string) {
  const match = /^(\d[\d,.]*)(.*)$/.exec(raw.trim());
  if (!match) return null;
  return {
    number: Number(match[1].replace(/[,.]/g, "")),
    suffix: match[2],
  };
}
