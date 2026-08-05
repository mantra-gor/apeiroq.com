import { services } from "@/content/services";
import { Disclosure } from "@/components/ui/disclosure";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";

/**
 * What we do — DESIGN.md §11 §3, using the expandable service card from §2 #3.
 *
 * One claim: strong expertise, flexible capacity, predictable delivery. Three
 * cards support it and nothing else competes for the eye.
 */
export function WhatWeDo() {
  return (
    <Section id="what-we-do" tone="light" aria-labelledby="what-we-do-heading">
      <div className="max-w-[52ch]">
        <Reveal>
          <Overline>What we do</Overline>
          <h2 id="what-we-do-heading" className="mt-6 text-display-l">
            Strong expertise. Flexible capacity. Predictable delivery.
          </h2>
          <p className="mt-6 text-body-l text-ink-500">
            Three ways an engagement starts. Each one ends with something you
            can hold us to.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 md:mt-20">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={index * 70}>
            <Disclosure title={service.title} summary={service.summary}>
              <p className="max-w-[68ch] text-body text-ink-500">
                {service.detail}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.points.map((point) => (
                  <li key={point} className="flex items-baseline gap-3 text-body">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 translate-y-[-0.15em] rounded-full bg-ember"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Disclosure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
