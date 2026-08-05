import { cn } from "@/lib/utils";

/**
 * The affordance marker. On a monochrome site this arrow does the work colour
 * usually does — DESIGN.md §2 #1.
 *
 * Decorative: the link text carries the meaning, so it is aria-hidden. Put
 * `group` on the interactive ancestor and it travels +4px on hover/focus.
 */
export function Arrow({ className }: { className?: string }) {
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
        "h-4 w-4 shrink-0 transition-transform duration-160 ease-standard",
        "group-hover:translate-x-1 group-focus-visible:translate-x-1",
        className,
      )}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
