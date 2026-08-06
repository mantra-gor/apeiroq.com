import { services } from "@/content/services";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";

/**
 * What we do — DESIGN.md §11 §3.
 *
 * Four cards, one per stage of an engagement. They are a journey, not a menu,
 * so order carries the meaning: an <ol>, read left to right at xl. Nothing is
 * drawn to say so.
 *
 * Not the §2 #3 disclosure — a chevron over one sentence hides nothing. Not
 * the §2 #4 numbered timeline either — How We Work sits directly below with
 * oversized numerals, and a second numbered progression against it is the pair
 * of competing focal points §3 rules out.
 */
export function WhatWeDo() {
  return (
    <Section id="what-we-do" tone="light" aria-labelledby="what-we-do-heading">
      <div className="max-w-[52ch]">
        <Reveal>
          <Overline>What we do</Overline>
          <h2 id="what-we-do-heading" className="mt-6 text-display-l">
            From idea to production.
          </h2>
          <p className="mt-6 text-body-l text-ink-500">
            We partner with businesses throughout the software lifecycle — from
            validating an idea to designing scalable architectures, developing
            products, and continuously improving them after launch.
          </p>
        </Reveal>
      </div>

      {/*
        role="list" is not redundant here: Tailwind's preflight sets
        list-style: none on every ol, and WebKit drops the list role with it.
        Without this, Safari never announces "1 of 4" — which is the only place
        the sequence is stated to a screen reader.
      */}
      <ol
        role="list"
        className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8 xl:grid-cols-4"
      >
        {services.map((service, index) => (
          <Reveal
            as="li"
            key={service.id}
            delay={index * 70}
            className="rounded-lg border border-ink-200 p-6"
          >
            <h3 className="text-h3">{service.title}</h3>
            <p className="mt-3 text-body text-ink-500">{service.description}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
