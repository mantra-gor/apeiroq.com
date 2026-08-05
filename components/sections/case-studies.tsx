import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { Arrow } from "@/components/ui/arrow";
import { Rail } from "@/components/ui/rail";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";

/**
 * Products & prototypes — DESIGN.md §11 §4, using the work card from §2 #2 in
 * the scroll-snap rail from §2 #6.
 *
 * Renders nothing while `content/projects.ts` is empty. That is the intended
 * behaviour, not a gap to paper over: an absent section is honest, a section
 * padded with stock screenshots and invented outcomes is the exact thing
 * CLAUDE.md forbids. Add real entries and it appears.
 */
export function CaseStudies() {
  if (projects.length === 0) return null;

  return (
    <Section id="work" tone="light" aria-labelledby="work-heading">
      <div className="max-w-[52ch]">
        <Reveal>
          <Overline>Selected work</Overline>
          <h2 id="work-heading" className="mt-6 text-display-l">
            Built to a thesis. Shipped for a client.
          </h2>
          <p className="mt-6 text-body-l text-ink-500">
            Each of these started as our own product bet, then got reshaped for
            the team that wanted it.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-16 md:mt-20">
        <Rail label="Selected work">
          {projects.map((project) => (
            <article
              key={project.slug}
              // ~85% on mobile so the next card peeks and the rail reads as
              // scrollable without a scrollbar or an instruction.
              className="w-[85%] shrink-0 sm:w-[60%] lg:w-[42%]"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block rounded-xl transition-transform duration-420 ease-out-expo hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-100">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 42vw"
                    className="object-cover transition-transform duration-420 ease-out-expo group-hover:scale-[1.03]"
                  />

                  {/* Scrim so the title holds AA over whatever the screenshot is. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent transition-opacity duration-420 ease-out-expo group-hover:opacity-85"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-6 text-paper">
                    <div className="flex-1">
                      <h3 className="text-h3">{project.title}</h3>
                      <p className="mt-2 text-caption text-white/80">
                        {project.summary}
                      </p>
                    </div>
                    <Arrow className="mb-1" />
                  </div>
                </div>
              </Link>

              {project.outcome && (
                <p className="mt-5 flex items-baseline gap-3">
                  <span className="text-h2">{project.outcome.stat}</span>
                  <span className="text-caption text-ink-500">
                    {project.outcome.label}
                  </span>
                </p>
              )}
            </article>
          ))}
        </Rail>
      </Reveal>
    </Section>
  );
}
