"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function ChevronIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-4 w-4", direction === "prev" && "rotate-180")}
    >
      <path d="m6 3.5 4.5 4.5L6 12.5" />
    </svg>
  );
}

/**
 * Horizontal work rail — DESIGN.md §2 #6.
 *
 * CSS scroll-snap does the actual scrolling (the `.rail` utility in
 * globals.css), so touch and keyboard are native and there is no carousel
 * library against the §9 budget. The only JS is two real <button>s calling
 * scrollBy, plus the enable/disable state so a dead control is never focusable
 * as if it worked.
 *
 * Cards peek at the right edge to signal there is more; that is the caller's
 * job via the card width.
 */
export function Rail({
  label,
  className,
  children,
}: {
  /** Names the scrollable region for screen readers. */
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    // Sub-pixel widths make the exact end unreliable; a 1px tolerance is not.
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    const el = scrollerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  const scroll = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // One card plus its gap, derived from the first child so the step stays
    // correct across breakpoints without duplicating the card width here.
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <div
        ref={scrollerRef}
        onScroll={sync}
        role="region"
        aria-label={label}
        tabIndex={0}
        /*
         * Hands *horizontal* trackpad gestures inside the rail back to the
         * browser. Lenis only ignores a wheel event outright when deltaY is
         * exactly 0, and a real two-finger swipe never is — so without this an
         * attempt to scroll the cards sideways nudges the page down as well.
         *
         * Deliberately the directional attribute, not the blanket
         * `data-lenis-prevent`. That one opts the rail out of Lenis entirely,
         * which also means scrolling *down* the page with the pointer over the
         * cards falls back to native scrolling — the one strip of the page
         * where the smoothing visibly cuts out. This is scoped to gestures
         * where |deltaX| >= |deltaY|, so the rail owns sideways and the page
         * keeps owning vertical.
         */
        data-lenis-prevent-horizontal
        className="rail -mx-gutter flex snap-x gap-6 overflow-x-auto px-gutter pb-2"
      >
        {children}
      </div>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={() => scroll(-1)}
          disabled={atStart}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200",
            "transition-colors duration-160 ease-standard",
            "hover:bg-ink-050 disabled:pointer-events-none disabled:opacity-40",
          )}
        >
          <ChevronIcon direction="prev" />
          <span className="sr-only">Previous</span>
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          disabled={atEnd}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200",
            "transition-colors duration-160 ease-standard",
            "hover:bg-ink-050 disabled:pointer-events-none disabled:opacity-40",
          )}
        >
          <ChevronIcon direction="next" />
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
}
