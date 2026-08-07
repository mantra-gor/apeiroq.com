import { Arrow } from "@/components/ui/arrow";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { primaryCta } from "@/lib/site";

/*
 * Capabilities, not metrics — every one of these is verifiable today, which is
 * the DESIGN.md §1 / CLAUDE.md content-integrity bar. Headcount is deliberately
 * absent: a buyer is deciding who they will work with, not how many.
 */
const proofPoints = [
  "Product Strategy",
  "Full-Stack Engineering",
  "Remote-First Team",
  "Long-Term Partnership",
];

/**
 * Home hero. DESIGN.md §11 — full-bleed media, one H1, two CTAs.
 *
 * The backdrop is a pixel field rather than the background video §8 describes:
 * one ambient treatment, not both. Everything §8 asks of the video still holds
 * for it — mounts post-paint, never the LCP element, skipped under
 * reduced-motion / save-data / 2G / small viewports. See HeroBackdrop.
 *
 * This component stays a Server Component. Only the backdrop is client-side.
 */
export function Hero() {
  /*
   * `min-h-svh`, not `h-screen`. `h-screen` is 100*vh*, the *large* viewport —
   * on mobile Safari that is taller than what is actually visible, so the CTAs
   * sat under the browser chrome. And a fixed height plus `overflow-hidden`
   * clips the copy at large text-zoom levels.
   */
  return (
    <section className="relative isolate flex min-h-svh items-end overflow-hidden bg-ink text-paper select-none [-webkit-touch-callout:none]">
      {/*
        Marks the top of the dark hero. The header watches this to decide when
        to switch from transparent to solid — see globals.css and Header.
      */}
      <div
        id="hero-sentinel"
        aria-hidden="true"
        className="absolute top-0 h-6 w-full"
      />

      <HeroBackdrop />

      {/*
        Tighter vertical rhythm below md. The hero grew by a tagline and four
        proof points, and at 375x812 that pushed the list off the bottom of the
        viewport — a list cut after its second item reads as a bug. pt-28 still
        clears the 72px fixed header with room to spare.
      */}
      <Container className="select-none no-callout pb-20 pt-28 md:pb-28 md:pt-40">
        <h1 className="max-w-[16ch] text-display-xl">Scale Beyond Limits.</h1>

        {/*
          Deliberately a <p>, not an <h2>. It is a tagline, not the heading of a
          section — an h2 here would sit above the real section headings and
          make the page outline claim the hero has subsections.
        */}
        <p className="mt-4 max-w-[24ch] text-h2 md:mt-5 text-white/90">
          Build your business digitally.
        </p>

        <p className="mt-6 max-w-[56ch] text-body-l md:mt-8 text-white/75">
          We design and engineer custom software platforms for ambitious
          businesses — from product strategy to deployment. Work directly with
          the engineers building your solution.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
          {/*
            Label differs from primaryCta.label on purpose: the nav CTA stays
            "Hire Us" sitewide (DESIGN.md §11), while the hero asks for the
            first step rather than the transaction. Same destination.
          */}
          <ButtonLink href={primaryCta.href} variant="primary" size="hero">
            Start a Project
            <Arrow />
          </ButtonLink>
          <ButtonLink href="/case-studies" variant="ghostDark" size="hero">
            View Case Studies
          </ButtonLink>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 md:mt-10 text-caption text-white/60">
          {proofPoints.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <svg
                viewBox="0 0 12 12"
                aria-hidden="true"
                className="size-3 shrink-0 text-ember"
              >
                <path
                  d="M1 6.5 4.5 10 11 2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {point}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
