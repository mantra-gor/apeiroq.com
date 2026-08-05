"use client";

import { useEffect } from "react";

/**
 * Smooth scrolling, via locomotive-scroll v5.
 *
 * v5 is a thin wrapper around Lenis (~12KB gzipped for both) and, unlike v4, it
 * does not hijack scrolling with a transformed container: the native scrollbar,
 * `position: fixed` on the header, and IntersectionObserver all keep working
 * because the page is still genuinely scrolling. That is the only reason this
 * is safe to add to a page whose header, reveals and rail are all built on
 * scroll position.
 *
 * Renders nothing. Loaded from a dynamic import inside the effect so the
 * library never enters the initial bundle — it arrives after first paint or not
 * at all.
 *
 * Skipped entirely under `prefers-reduced-motion: reduce`. Smoothing is
 * animation applied to the one interaction a user cannot opt out of, so this is
 * not optional (DESIGN.md §7). Touch devices are handled by the library, which
 * leaves native momentum scrolling alone.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let instance: { destroy: () => void } | null = null;
    let cancelled = false;

    import("locomotive-scroll").then(({ default: LocomotiveScroll }) => {
      if (cancelled) return;

      instance = new LocomotiveScroll({
        lenisOptions: {
          // Interpolation factor. Lower is smoother and laggier; 0.1 is the
          // point where it reads as damped rather than delayed.
          lerp: 0.1,
          smoothWheel: true,
        },
      });

      /*
       * CSS `scroll-behavior: smooth` and Lenis both want to own programmatic
       * scrolling, and together they visibly fight — the anchor jump animates
       * twice. Native smoothing goes off only once Lenis is actually running,
       * so with JS off or the library never loading, the CSS behaviour stands.
       */
      document.documentElement.dataset.lenis = "on";
    });

    return () => {
      cancelled = true;
      instance?.destroy();
      delete document.documentElement.dataset.lenis;
    };
  }, []);

  return null;
}
