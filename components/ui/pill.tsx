import { cn } from "@/lib/utils";

/**
 * Hairline pill. Two tones for the two sanctioned canvases (DESIGN.md §4).
 *
 * Used for tech-stack items and for the testimonial location badge
 * (DESIGN.md §2 #8). Non-interactive by design — these label, they do not link.
 */
const tones = {
  light: "border-ink-200 bg-ink-100 text-ink-600",
  dark: "border-white/15 text-white/80",
} as const;

export function Pill({
  tone = "light",
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1.5 text-caption",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
