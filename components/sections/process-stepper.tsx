"use client";

import { useState } from "react";
import type { ProcessStep } from "@/content/process";
import { cn } from "@/lib/utils";

/** Steps per page. 8 steps → 4 pages of 2, pairing adjacent phases. */
const GROUP_SIZE = 2;

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
 * Paged process stepper — DESIGN.md §2 #4, no longer built on the scroll-snap
 * rail (§2 #6). Eight steps don't fit a row of columns without becoming
 * unreadable, but a swipeable track read as unfinished rather than deliberate,
 * so this pages through four pairs instead: real `<button>`s move the index,
 * nothing scrolls or drags.
 *
 * The connector rail across the top stays permanently in view — an overview
 * of all eight steps — so paging down to a pair doesn't hide the sequence
 * the way a one-step-at-a-time view would. The fill tracks pages reached,
 * not scroll position, and moves on `transform` per §7.
 */
export function ProcessStepper({ steps }: { steps: ProcessStep[] }) {
  const totalPages = Math.ceil(steps.length / GROUP_SIZE);
  const [page, setPage] = useState(0);

  const current = steps.slice(page * GROUP_SIZE, page * GROUP_SIZE + GROUP_SIZE);
  const atStart = page === 0;
  const atEnd = page === totalPages - 1;

  return (
    <div>
      {/* Overview rail: decorative, always shows all 8 steps. The live region
          below carries the same information for assistive tech. */}
      <div aria-hidden="true" className="relative">
        <div className="absolute inset-x-0 bottom-1 h-px bg-ink-200" />
        <div
          className="absolute left-0 bottom-1 h-px origin-left bg-ink-900 transition-transform duration-420 ease-out-expo"
          style={{ width: "100%", transform: `scaleX(${(page + 1) / totalPages})` }}
        />
        <ol className="relative flex justify-between">
          {steps.map((step, index) => {
            const group = Math.floor(index / GROUP_SIZE);
            const state = group < page ? "done" : group === page ? "active" : "upcoming";
            return (
              <li key={step.number} className="flex flex-col items-center gap-3">
                <span
                  className={cn(
                    "text-caption tabular-nums transition-colors duration-240 ease-standard",
                    state === "upcoming" && "text-ink-300",
                    state === "done" && "text-ink-500",
                    state === "active" && "text-ink-900",
                  )}
                >
                  {step.number}
                </span>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full border transition-colors duration-240 ease-standard",
                    state === "done" && "border-ink-900 bg-ink-900",
                    state === "active" && "border-ink-900 bg-ink-050 ring-4 ring-ink-900/12",
                    state === "upcoming" && "border-ink-300 bg-ink-050",
                  )}
                />
              </li>
            );
          })}
        </ol>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {current.map((step) => `Step ${step.number}, ${step.title}`).join(". ")}
      </p>

      <div key={page} className="animate-rise mt-16 grid gap-10 sm:grid-cols-2 sm:gap-12 md:mt-20">
        {current.map((step) => (
          <div key={step.number} className="border-t border-ink-200 pt-8">
            <span className="block text-display-l font-semibold text-ink-200 tabular-nums">
              {step.number}
            </span>
            <h3 className="mt-4 text-h3">{step.title}</h3>
            <p className="mt-3 text-body text-ink-500">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-4 md:mt-12">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={atStart}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-600",
            "transition-colors duration-160 ease-standard",
            "hover:border-ember-strong hover:text-ember-strong disabled:pointer-events-none disabled:opacity-40",
          )}
        >
          <ChevronIcon direction="prev" />
          <span className="sr-only">Previous steps</span>
        </button>

        <span className="text-caption tabular-nums text-ink-400">
          {String(page + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={atEnd}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-600",
            "transition-colors duration-160 ease-standard",
            "hover:border-ember-strong hover:text-ember-strong disabled:pointer-events-none disabled:opacity-40",
          )}
        >
          <ChevronIcon direction="next" />
          <span className="sr-only">Next steps</span>
        </button>
      </div>
    </div>
  );
}
