import { testimonials } from "@/content/testimonials";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";

/**
 * Testimonials — DESIGN.md §11 §6.
 *
 * Three quotes, large, static, one per band. Never a carousel: dots and
 * auto-advance manufacture a velocity we do not have, and §2's skip-list rules
 * out the paginated quote block outright. The scroll-snap rail is for work.
 *
 * Renders nothing while `content/testimonials.ts` is empty — see the integrity
 * note in that file.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section id="clients" tone="light" aria-labelledby="clients-heading">
      <div className="max-w-[52ch]">
        <Reveal>
          <Overline>Clients</Overline>
          <h2 id="clients-heading" className="mt-6 text-display-l">
            In their words.
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-16 md:mt-24 md:gap-24">
        {testimonials.map((testimonial) => (
          <Reveal
            as="article"
            key={testimonial.id}
            className="border-t border-ink-200 pt-10 md:pt-12"
          >
            <figure>
              <blockquote className="max-w-[24ch] text-h2 md:max-w-[20ch]">
                <p>{testimonial.quote}</p>
              </blockquote>

              <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <span className="text-body">
                  <span className="font-medium">{testimonial.name}</span>
                  <span className="text-ink-500">
                    {" — "}
                    {testimonial.role}, {testimonial.company}
                  </span>
                </span>
                {/*
                  Text country code, never a flag emoji — flags render
                  inconsistently across platforms (DESIGN.md §2 #8).
                */}
                <Pill>
                  {testimonial.city}, {testimonial.countryCode}
                </Pill>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
