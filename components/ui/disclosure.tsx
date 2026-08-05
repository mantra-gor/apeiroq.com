"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-240 ease-standard",
        open && "rotate-180",
      )}
    >
      <path d="m3.5 6 4.5 4.5L12.5 6" />
    </svg>
  );
}

/**
 * Expandable service card — DESIGN.md §2 #3.
 *
 * Hairline card, no icon illustration, chevron rotating 180° over 240ms.
 *
 * The body animates on `grid-template-rows: 0fr -> 1fr`, which gets a real
 * height transition without a magic pixel number and without measuring layout.
 * The content stays mounted in both states so it is crawlable — `hidden` or
 * conditional rendering would take it out of the page for a search engine.
 *
 * Closing your previous choice when you open a new one is hostile, so one-open-
 * at-a-time is deliberately not enforced.
 */
export function Disclosure({
  title,
  summary,
  children,
  className,
}: {
  title: string;
  summary: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  return (
    <div
      className={cn(
        "rounded-lg border border-ink-200 bg-paper",
        "transition-colors duration-160 ease-standard hover:border-ink-300",
        className,
      )}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start gap-6 rounded-lg p-6 text-left md:p-8"
        >
          <span className="flex-1">
            <span className="block text-h3">{title}</span>
            <span className="mt-2 block text-body text-ink-500">{summary}</span>
          </span>
          <span className="mt-1 text-ink-600">
            <Chevron open={open} />
          </span>
        </button>
      </h3>

      <div
        id={bodyId}
        className={cn(
          "grid transition-[grid-template-rows] duration-240 ease-standard",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        {/*
          The overflow clip has to sit on the grid child, not the grid itself —
          a 0fr row still lays its content out, it just gives it no height.
        */}
        <div className="overflow-hidden">
          <div className="px-6 pb-6 md:px-8 md:pb-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
