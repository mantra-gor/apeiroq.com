import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { Arrow } from "@/components/ui/arrow";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

/**
 * A single case study — DESIGN.md §11: problem → thesis → what we built →
 * stack → what changed for the client.
 *
 * The page is built around the first two of those. A buyer is not shopping for
 * a screenshot; they are checking whether we have met their problem before and
 * whether the thing we built actually answers it. So "The problem" and "How the
 * product solves it" are the two full-width, full-measure blocks, and the build
 * list, stack and outcome support them.
 *
 * Fully static: `generateStaticParams` enumerates the content file and
 * `dynamicParams = false` means an unknown slug 404s at the edge instead of
 * opting this route into dynamic rendering (CLAUDE.md). While the content file
 * is empty, no paths are generated and every /case-studies/* URL 404s — which
 * is correct, since nothing links to one.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  props: PageProps<"/case-studies/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      type: "article",
      title: study.title,
      description: study.summary,
      images: [{ url: study.image, alt: study.imageAlt }],
    },
  };
}

export default async function CaseStudyPage(
  props: PageProps<"/case-studies/[slug]">,
) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
          { name: study.title, href: `/case-studies/${slug}` },
        ])}
      />

      <article>
        <header className="pt-24 pb-12 md:pt-32 md:pb-16">
          <Container>
            <Overline>Case study</Overline>
            <h1 className="mt-5 max-w-[18ch] text-h1">{study.title}</h1>
            <p className="mt-6 max-w-[52ch] text-body-l text-ink-500">
              {study.summary}
            </p>
          </Container>
        </header>

        <Container>
          {/*
            The one priority image on this route, above the fold. Fixed aspect
            ratio so it reserves its box and CLS stays at 0.
          */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-ink-100">
            <Image
              src={study.image}
              alt={study.imageAlt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        </Container>

        <Section tone="light">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <h2 className="text-h2">The problem</h2>
              <p className="mt-6 max-w-[52ch] text-body-l text-ink-600">
                {study.problem}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="text-h2">How the product solves it</h2>
              <p className="mt-6 max-w-[52ch] text-body-l text-ink-600">
                {study.solution}
              </p>
            </Reveal>
          </div>

          {study.build && study.build.length > 0 && (
            <Reveal className="mt-20 md:mt-28">
              <h2 className="text-h2">What we built</h2>
              <ol className="mt-8 flex flex-col border-t border-ink-100">
                {study.build.map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-6 border-b border-ink-100 py-6"
                  >
                    <span className="text-overline uppercase text-ink-400 pt-1.5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="max-w-[60ch] text-body text-ink-600">
                      {item}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          )}

          {study.stack && study.stack.length > 0 && (
            <Reveal className="mt-20 md:mt-28">
              <h2 className="text-h2">Stack</h2>
              <ul className="mt-8 flex flex-wrap gap-3">
                {study.stack.map((tech) => (
                  <li key={tech}>
                    <Pill>{tech}</Pill>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {study.outcome && (
            <Reveal className="mt-20 md:mt-28">
              <h2 className="text-h2">What changed</h2>
              <p className="mt-8 flex flex-wrap items-baseline gap-4">
                <span className="text-display-l">{study.outcome.stat}</span>
                <span className="max-w-[32ch] text-body-l text-ink-500">
                  {study.outcome.label}
                </span>
              </p>
            </Reveal>
          )}
        </Section>

        <Section tone="dark" aria-labelledby="case-study-cta">
          <h2 id="case-study-cta" className="max-w-[20ch] text-display-l">
            Have a problem shaped like this one?
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/hire-us" variant="primary">
              Hire Us
              <Arrow />
            </ButtonLink>
            <ButtonLink href="/case-studies" variant="ghostDark">
              All case studies
            </ButtonLink>
          </div>
        </Section>
      </article>
    </>
  );
}
