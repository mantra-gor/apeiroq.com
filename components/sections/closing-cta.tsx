import { Arrow } from "@/components/ui/arrow";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { primaryCta, siteConfig } from "@/lib/site";

/**
 * Closing CTA — DESIGN.md §11 §9.
 *
 * Dark, one idea, one action. This and the hero are the page's only two Ember
 * buttons and they can never share a viewport, which keeps §4's "one primary
 * per viewport" rule true by construction.
 */
export function ClosingCta() {
  return (
    <Section tone="dark" aria-labelledby="closing-cta-heading">
      <Reveal className="flex flex-col items-start">
        <h2 id="closing-cta-heading" className="max-w-[16ch] text-display-l">
          Tell us what you are building.
        </h2>
        <p className="mt-6 max-w-[52ch] text-body-l text-white/72">
          Send the brief you already have. You will get an engineer&rsquo;s
          reply, not a sales sequence.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href={primaryCta.href} variant="primary" size="hero">
            {primaryCta.label}
            <Arrow />
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghostDark" size="hero">
            Contact us
          </ButtonLink>
        </div>

        <p className="mt-8 text-caption text-white/45">
          Or email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-white/72 underline underline-offset-4 transition-colors duration-160 ease-standard hover:text-paper"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </Reveal>
    </Section>
  );
}
