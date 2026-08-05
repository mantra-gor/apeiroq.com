import { cn } from "@/lib/utils";
import { Container } from "./container";

/**
 * A page section on one of the two sanctioned canvases. Do not invent a third.
 * DESIGN.md §4 (surfaces), §6 (vertical rhythm).
 */
const tones = {
  light: "bg-paper text-ink",
  tint: "bg-ink-050 text-ink",
  dark: "bg-ink text-paper",
} as const;

export function Section({
  tone = "light",
  className,
  containerClassName,
  bleed = false,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  tone?: keyof typeof tones;
  containerClassName?: string;
  /** Skip the Container — for full-bleed media sections. */
  bleed?: boolean;
}) {
  return (
    <section className={cn("py-section", tones[tone], className)} {...props}>
      {bleed ? (
        children
      ) : (
        <Container className={containerClassName}>{children}</Container>
      )}
    </section>
  );
}

/** Eyebrow label above a section heading. */
export function Overline({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("text-overline uppercase text-ink-500", className)}>
      {children}
    </p>
  );
}
