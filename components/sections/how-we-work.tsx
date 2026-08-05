import { processSteps } from "@/content/process";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";

/**
 * How we work — DESIGN.md §11 §5, built on the numbered timeline from §2 #4.
 *
 * Oversized Sora numerals carry the section instead of icons, joined by a 1px
 * connector rail: horizontal on desktop, vertical down the left on mobile. The
 * rail is drawn with a border on the list item rather than a pseudo-element per
 * step, so there is one box to get right at each breakpoint.
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
            There is no bench, no account-manager layer, and no delivery team
            you meet after signing. You talk to the people writing the code, in
            every week of the engagement.
          </p>
        </Reveal>
      </div>

      <ol className="mt-16 grid gap-10 md:mt-24 md:grid-cols-5 md:gap-8">
        {processSteps.map((step, index) => (
          <Reveal
            as="li"
            key={step.number}
            delay={index * 70}
            className="relative border-ink-200 pl-8 md:border-t md:pt-8 md:pl-0"
          >
            {/*
              Mobile runs the connector down the left of the text; desktop uses
              the top border above. Only one is visible at a time.
            */}
            <span
              aria-hidden="true"
              className="absolute left-0 h-full w-px bg-ink-200 md:hidden"
            />
            <span
              aria-hidden="true"
              className="block text-h1 font-semibold text-ink-200 tabular-nums"
            >
              {step.number}
            </span>
            <h3 className="mt-4 text-h3">{step.title}</h3>
            <p className="mt-3 text-body text-ink-500">{step.description}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
