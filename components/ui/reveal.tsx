"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Section entrance wrapper — DESIGN.md §7.
 *
 * Fade + 16px rise, fired once at 20% visibility and then unobserved. Nothing
 * on this site re-animates when you scroll back up.
 *
 * The visual state lives in the `.reveal` utility in globals.css, including a
 * `@media (scripting: none)` escape so content is never invisible without JS.
 * Reduced motion is handled globally: the §7 media block collapses the
 * transition to 0.01ms, so the element simply appears.
 *
 * Stagger siblings with `delay` — 60–80ms apart, capped at 6 items per §7.
 */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  as?: "div" | "li" | "section" | "article";
  /** Milliseconds. Keep chains to 6 items; item 7+ should share a delay. */
  delay?: number;
}) {
  // The element varies but the props and ref do not — every target here is a
  // plain block container, so one cast keeps the call sites free of generics.
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-revealed={revealed}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn("reveal", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
