"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * WebGL, so never server-rendered and never in the initial bundle. `three`
 * lands in its own lazy chunk that is only requested if every gate below
 * passes.
 */
const PixelBlast = dynamic(() => import("@/components/reactbits/PixelBlast"), {
  ssr: false,
});

/** Not in lib.dom yet. Both fields are optional at runtime. */
type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

function shouldRenderCanvas() {
  // DESIGN.md §7 — functional requirement, not a nicety.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  /*
   * Phones get the static field. Same cutoff DESIGN.md §8 puts on hero video,
   * and for the same reason: a full-viewport fragment shader is the single most
   * expensive thing we could hand a mid-range Android, and mobile Lighthouse is
   * the number that matters.
   */
  if (window.matchMedia("(max-width: 767px)").matches) return false;

  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g") {
    return false;
  }

  return true;
}

/**
 * The hero backdrop and every gate on it — DESIGN.md §7, §8, §9.
 *
 * Layering, bottom to top:
 *   1. opaque --ink, so the headline always has a compliant background
 *   2. `.pixel-field`, a pure-CSS pixel grid in the server HTML
 *   3. the WebGL field, if and only if it is allowed to mount
 *   4. `.field-weight`, pulling the field's energy to the top-right
 *   5. `.hero-scrim`, the contrast guarantee under the copy
 *
 * Layers 4 and 5 sit above the canvas and are painted in the server HTML, so
 * the composition is identical on every path — canvas or no canvas. 5 is the
 * one that makes the copy legible and is not optional; 4 is what stops the
 * surviving field from reading as evenly-spread wallpaper.
 *
 * The canvas is scheduled on idle *after* first paint, so the LCP element is
 * the headline — never the canvas, and never a canvas-shaped hole. Because
 * layer 2 is already painted, there is nothing to fade in from and no CLS: all
 * three layers are the same absolutely-positioned box.
 *
 * This is the page's one WebGL component and one of its three permitted React
 * Bits components. It is also the only client component in the hero — the
 * headline, lede and CTAs stay server-rendered.
 */
export function HeroBackdrop() {
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    if (!shouldRenderCanvas()) return;

    if (typeof window.requestIdleCallback !== "function") {
      const timeout = window.setTimeout(() => setCanvasReady(true), 200);
      return () => window.clearTimeout(timeout);
    }

    const handle = window.requestIdleCallback(() => setCanvasReady(true), {
      timeout: 2000,
    });
    return () => window.cancelIdleCallback(handle);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-ink">
      <div className="pixel-field absolute inset-0" />
      {canvasReady && (
        <div className="absolute inset-0 animate-fade-in">
          <PixelBlast
            className="h-full w-full"
            /*
             * --color-ink-200, resolved. The prop takes a colour value, not a
             * custom property — the shader uploads it as a uniform, so it can
             * never be a var(). Pure white was the old value and it is the
             * worst case for legibility: it puts a maximum-luminance block
             * directly behind a letterform.
             */
            color="#d9d4d1"
            pixelSize={4}
            patternScale={2.4}
            /* 0.5 is neutral in the shader's `feed` term. 0.9 was near-full
             * coverage, which is what buried the lede; the scrim and weight
             * layers now handle legibility, so this only has to stop the field
             * from reading as solid noise. */
            patternDensity={0.7}
            speed={0.35}
            /* .field-weight owns the falloff now; this only keeps the canvas
             * from ending on a hard line at the top-right corner, which is the
             * one place the weight layer is fully transparent. */
            edgeFade={0.15}
          />
        </div>
      )}
      <div className="field-weight absolute inset-0" />
      <div className="hero-scrim absolute inset-0" />
    </div>
  );
}
