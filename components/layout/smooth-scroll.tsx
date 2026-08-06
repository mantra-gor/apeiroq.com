"use client";

import { useEffect } from "react";

/**
 * Smooth scrolling, via Lenis.
 *
 * Lenis does not hijack scrolling with a transformed container: it drives the
 * real document scroll position, so the native scrollbar, `position: fixed` on
 * the header, and IntersectionObserver all keep working. That is the only
 * reason this is safe to add to a page whose header, reveals and rail are all
 * built on scroll position.
 *
 * ---------------------------------------------------------------------------
 * Why Lenis directly and not locomotive-scroll v5
 * ---------------------------------------------------------------------------
 * locomotive-scroll v5 is a thin wrapper around this exact library. It adds
 * `[data-scroll]` viewport triggers and parallax — we use none of them, there
 * is not one `data-scroll` attribute in the repo — and in exchange its ticker
 * does this:
 *
 *     _onRender() { this.lenisInstance?.raf(Date.now()); ... }
 *
 * Lenis integrates on the delta between successive timestamps:
 *
 *     deltaTime = time - this.time
 *     value = damp(value, target, lerp * 60, deltaTime)      // 1 - e^(-λ·dt)
 *
 * so per-frame displacement is a direct function of that delta. `Date.now()` is
 * an integer-millisecond wall clock sampled *inside* the callback, which breaks
 * it two ways: at 120Hz a true 8.33ms frame quantises to 8 or 9 (±6% jitter on
 * every single frame), and any variance in when the callback got scheduled is
 * read as real elapsed time. The result is smoothing that visibly grains — the
 * "still not smooth after adding smooth scroll" symptom.
 *
 * `autoRaf` hands `requestAnimationFrame`'s own DOMHighResTimeStamp straight to
 * `raf()`: sub-millisecond, vsync-aligned, identical for every callback in a
 * frame. Same engine, same feel it was tuned for, without the wrapper's clock —
 * and without its DOM scan, its second rAF layer, or its bundle weight.
 *
 * Renders nothing. Loaded from a dynamic import inside the effect so the
 * library never enters the initial bundle — it arrives after first paint or not
 * at all.
 *
 * Skipped entirely under `prefers-reduced-motion: reduce`, and torn down live
 * if that preference is turned on later. Smoothing is animation applied to the
 * one interaction a user cannot opt out of, so this is not optional
 * (DESIGN.md §7). Touch devices keep native momentum scrolling — see syncTouch.
 */
type LenisInstance = {
  destroy: () => void;
  stop: () => void;
  start: () => void;
};

/**
 * The live instance, or null whenever smoothing is not running — reduced
 * motion, or before the dynamic import resolves. There is exactly one
 * SmoothScroll on the page (it is mounted by the root layout), so a module
 * singleton is the honest shape for this; a context would be ceremony around a
 * browser global that is already a singleton.
 */
let current: LenisInstance | null = null;

/**
 * Freeze the page behind a modal — the mobile menu.
 *
 * `overflow: hidden` alone is not enough once Lenis is running: it stops the
 * document scrolling but not Lenis, which keeps integrating wheel deltas
 * against a scroll position it can no longer apply. Its internal target drifts
 * while the menu is open and the page snaps to it on close. `stop()` parks the
 * animation and adds `.lenis-stopped`, which globals.css turns into the actual
 * lock. Safe to call when smoothing is off — then the caller's own overflow
 * lock is doing all the work, as it did before Lenis existed.
 */
export function lockPageScroll() {
  current?.stop();
}

export function unlockPageScroll() {
  current?.start();
}

export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lenis: LenisInstance | null = null;
    let cancelled = false;

    const start = () => {
      if (lenis || cancelled || reduceMotion.matches) return;

      import("lenis").then(({ default: Lenis }) => {
        if (cancelled || reduceMotion.matches) return;

        lenis = new Lenis({
          /*
           * Lenis owns its own rAF loop, which is the entire point: `raf()` is
           * called with the frame's own timestamp rather than a clock we sample
           * ourselves. Never replace this with a manual loop passing Date.now().
           */
          autoRaf: true,

          /*
           * Interpolation factor — the one number to tune if the feel is off.
           * It sets λ in `1 - e^(-λ·dt)` (λ = lerp × 60), so the scroll chases
           * its target with a time constant of 1/λ seconds:
           *
           *   0.08  ~208ms  syrupy, visibly trailing the wheel
           *   0.10  ~167ms  Lenis' default — smooth, slightly floaty
           *   0.12  ~139ms  damped but still tracks the input closely
           *   0.16  ~104ms  crisp, smoothing is only just perceptible
           *
           * Because the maths is exponential and dt-driven, this is frame-rate
           * independent: 0.12 settles in the same wall-clock time at 60Hz and
           * at 144Hz. That only holds while the timestamp above is honest.
           */
          lerp: 0.12,

          smoothWheel: true,

          /*
           * Leave touch alone. Native momentum scrolling is implemented on the
           * compositor and cannot be beaten from JS — syncTouch moves it onto
           * the main thread and makes phones worse, not better.
           */
          syncTouch: false,

          /*
           * Nested scrollers (the work rail) opt out with `data-lenis-prevent`
           * rather than being auto-detected, which would mean a hit-test on
           * every wheel event.
           */
          allowNestedScroll: false,

          /*
           * Anchor links stay native. The browser's fragment navigation already
           * honours `scroll-padding-top` and moves focus to the target — that
           * second part is what the skip link depends on, and Lenis' `anchors`
           * option does not do it.
           */
          anchors: false,
        });
        current = lenis;

        /*
         * CSS `scroll-behavior: smooth` and Lenis both want to own programmatic
         * scrolling, and together they visibly fight — the anchor jump animates
         * twice. Native smoothing goes off only once Lenis is actually running,
         * so with JS off or the library never loading, the CSS behaviour stands.
         *
         * Also the hook the `html.lenis` layout rules in globals.css hang off.
         */
        document.documentElement.dataset.lenis = "on";
      });
    };

    const stop = () => {
      lenis?.destroy();
      lenis = null;
      current = null;
      delete document.documentElement.dataset.lenis;
    };

    const onPreferenceChange = () => (reduceMotion.matches ? stop() : start());

    start();
    reduceMotion.addEventListener("change", onPreferenceChange);

    return () => {
      cancelled = true;
      reduceMotion.removeEventListener("change", onPreferenceChange);
      stop();
    };
  }, []);

  return null;
}
