import { Arrow } from "@/components/ui/arrow";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryCta } from "@/lib/site";

/**
 * Home hero. DESIGN.md §11 — full-bleed media under a scrim, one H1, two CTAs.
 *
 * TODO: add the background video (Pexels/Pixabay, teams working / code) per
 * DESIGN.md §8. The poster image must be the LCP element and the <video> must
 * mount post-paint on idle — do not add a <video> here without that wrapper.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-ink text-paper">
      {/*
        Marks the top of the dark hero. The header watches this to decide when
        to switch from transparent to solid — see globals.css and Header.
      */}
      <div id="hero-sentinel" aria-hidden="true" className="absolute top-0 h-6 w-full" />

      {/* Placeholder backdrop until the video lands. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink" />
      <div aria-hidden="true" className="scrim absolute inset-0 -z-10" />

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
