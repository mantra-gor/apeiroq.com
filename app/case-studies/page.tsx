import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { PageHero } from "@/components/sections/page-hero";
import { Arrow } from "@/components/ui/arrow";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Products we built to a thesis, then reshaped for the clients who wanted them. The problem in each case, how the product solves it, and what changed.",
  alternates: { canonical: "/case-studies" },
};

/**
 * Case study index — DESIGN.md §11.
 *
 * Every card leads with the problem, not the screenshot. With three to four
 * entries, a grid of product shots reads as a thin portfolio; the same three
 * entries read as depth when each one names a problem a buyer recognises and
 * then shows the product that removes it.
 *
 * The list is content-gated: while `content/case-studies.ts` is empty the page
 * is the hero alone. No placeholder cards — see CLAUDE.md on filler.
 *
 * TODO: the three to four real entries, blocked on screenshots and client
 * sign-off. Say "prototype" when it is one; that honesty is the differentiator.
 */
export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
        ])}
      />

      <PageHero
        overline="Case studies"
        title="Products built to a thesis."
        lede="Each one started as our own product bet. Clients saw them, and asked us to reshape them around a problem of their own. Here is what the problem was, and what the product does about it."
      />

      {caseStudies.length > 0 && (
        <Section tone="light" aria-label="Case studies">
          <ul className="flex flex-col gap-20 md:gap-28">
            {caseStudies.map((study, index) => (
              <Reveal as="li" key={study.slug}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group grid gap-8 md:grid-cols-2 md:items-center md:gap-12"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-100">
                    <Image
                      src={study.image}
                      alt={study.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover transition-transform duration-420 ease-out-expo group-hover:scale-[1.03]"
                    />
                  </div>

                  <div>
                    <Overline>
                      {String(index + 1).padStart(2, "0")} — Case study
                    </Overline>
                    <h2 className="mt-5 text-h2">{study.title}</h2>
                    <p className="mt-4 text-body-l text-ink-500">
                      {study.summary}
                    </p>

                    <dl className="mt-8 flex flex-col gap-5 border-t border-ink-100 pt-8">
                      <div>
                        <dt className="text-overline uppercase text-ink-400">
                          The problem
                        </dt>
                        <dd className="mt-2 text-body text-ink-600">
                          {study.problem}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-overline uppercase text-ink-400">
                          How the product solves it
                        </dt>
                        <dd className="mt-2 text-body text-ink-600">
                          {study.solution}
                        </dd>
                      </div>
                    </dl>

                    {study.outcome && (
                      <p className="mt-8 flex items-baseline gap-3">
                        <span className="text-h2">{study.outcome.stat}</span>
                        <span className="text-caption text-ink-500">
                          {study.outcome.label}
                        </span>
                      </p>
                    )}

                    <span className="mt-8 inline-flex items-center gap-2 text-caption">
                      Read the case study
                      <Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
