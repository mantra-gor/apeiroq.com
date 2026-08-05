import { NewsletterForm } from "@/components/sections/newsletter-form";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";

/**
 * Newsletter — DESIGN.md §12.
 *
 * An engineering letter, not a marketing list, and the promise is specific
 * enough to be keepable. Email only: every extra field costs conversions.
 *
 * Reuses the footer's form via its `tone` prop rather than forking it, so the
 * honeypot, timing check and aria-live status logic exist in exactly one place.
 */
export function Newsletter() {
  return (
    <Section id="newsletter" tone="tint" aria-labelledby="newsletter-heading">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <Overline>Newsletter</Overline>
          <h2 id="newsletter-heading" className="mt-6 text-h1">
            One letter a month on how we build.
          </h2>
          <p className="mt-6 max-w-[52ch] text-body-l text-ink-500">
            Architecture decisions, the tradeoffs behind them, and what broke.
            No pitches.
          </p>
        </Reveal>

        <Reveal delay={70} className="md:self-end">
          <NewsletterForm tone="light" />
        </Reveal>
      </div>
    </Section>
  );
}
