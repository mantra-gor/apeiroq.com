import { processSteps } from "@/content/process";
import { ProcessStepper } from "@/components/sections/process-stepper";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";

/**
 * How we work — DESIGN.md §11 §5, built on the numbered timeline from §2 #4.
 *
 * Eight steps do not fit a row of columns at any breakpoint that still leaves
 * the descriptions readable, so they page through in pairs via ProcessStepper
 * rather than a grid that reflows into an ambiguous 4×2 block or a track that
 * requires swiping. Order stays unambiguous because the connector rail runs
 * left to right and never reorders: Discovery is left of Deployment on a
 * phone exactly as it is on a 1920px display.
 *
 * Oversized Sora numerals carry each step instead of icons. The numerals are
 * read aloud rather than hidden — "01" is the ordering information.
 *
 * This is where DESIGN.md §1 gets stated plainly: twelve engineers, no bench,
 * no handoff. Small framed as the advantage.
 */
export function HowWeWork() {
  return (
    <Section id="how-we-work" tone="tint" aria-labelledby="how-we-work-heading">
      <div className="max-w-[52ch]">
        <Reveal>
          <Overline>How we work</Overline>
          <h2 id="how-we-work-heading" className="mt-6 text-display-l">
            Twelve engineers. No handoffs.
          </h2>
          <p className="mt-6 text-body-l text-ink-500">
            No bench, no account-manager layer, no delivery team you meet after
            signing. Eight steps, and the same people on every one.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-16 md:mt-24">
        <ProcessStepper steps={processSteps} />
      </Reveal>
    </Section>
  );
}
