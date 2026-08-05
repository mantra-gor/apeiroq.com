import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Button styles — DESIGN.md §6. One primary per viewport. */
const button = cva(
  [
    "group inline-flex items-center justify-center gap-2 rounded-full",
    "font-medium tracking-[-0.01em] whitespace-nowrap",
    "transition-[background-color,color,opacity,filter,transform,border-color]",
    "duration-160 ease-standard",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        /** The one Ember fill. Reserve for the single primary action. */
        primary: "bg-ember text-ink hover:brightness-[1.06] hover:-translate-y-px",
        /** Secondary on a light canvas. */
        secondary: "bg-ink text-paper hover:bg-ink-800",
        /** Secondary on a dark canvas. */
        secondaryDark: "bg-paper text-ink hover:opacity-[0.92]",
        /** Tertiary. */
        ghost: "border border-ink-200 text-ink hover:bg-ink-050",
        ghostDark:
          "border border-white/15 text-paper hover:bg-white/10 hover:border-white/25",
      },
      size: {
        default: "h-12 px-7 text-[1rem]",
        hero: "h-13 px-8 text-[1.0625rem]",
        compact: "h-10 px-5 text-caption",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type ButtonVariants = VariantProps<typeof button>;

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & ButtonVariants) {
  return (
    <button className={cn(button({ variant, size }), className)} {...props} />
  );
}

/**
 * Link styled as a button. Always next/link for internal routes so the href is
 * crawlable and the route is prefetched.
 */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Link> & ButtonVariants) {
  return (
    <Link className={cn(button({ variant, size }), className)} {...props} />
  );
}

export { button as buttonVariants };
