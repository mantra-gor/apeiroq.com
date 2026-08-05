import { Arrow } from "@/components/ui/arrow";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { primaryCta } from "@/lib/site";

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
  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-ink text-paper">
      {/*
        Marks the top of the dark hero. The header watches this to decide when
        to switch from transparent to solid — see globals.css and Header.
      */}
      <div id="hero-sentinel" aria-hidden="true" className="absolute top-0 h-6 w-full" />

      <HeroBackdrop />

      <Container className="pb-20 pt-40 md:pb-28">
        <p className="text-overline uppercase text-white/50">
          Custom software engineering
        </p>

        <h1 className="mt-6 max-w-[16ch] text-display-xl">
          Scale Beyond Limits
        </h1>

        <p className="mt-8 max-w-[52ch] text-body-l text-white/75">
          We build custom platforms for teams shipping internationally. Twelve
          engineers, fully remote — you talk to the people writing the code.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href={primaryCta.href} variant="primary" size="hero">
            {primaryCta.label}
            <Arrow />
          </ButtonLink>
          <ButtonLink href="/projects" variant="ghostDark" size="hero">
            See our work
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
