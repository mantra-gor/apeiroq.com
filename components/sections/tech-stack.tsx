import { techStack } from "@/content/tech-stack";
import { techIcons } from "@/lib/tech-icons";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";

/**
 * The stack — a section DESIGN.md §11 does not list, added because the content
 * brief calls for it and because a specific stack is exactly the kind of proof
 * §1 asks for: verifiable, unpadded, no adjectives.
 *
 * Deliberately typographic. No vendor logos: they are all coloured, which
 * fights the two-colour palette in §4; they are third-party trademarks; and
 * roughly forty logo files would be the heaviest thing on a page that already
 * carries a WebGL hero. Text costs nothing and reads more confident.
 *
 * Marked up as a description list — each category genuinely defines a group of
 * terms, so <dl>/<dt>/<dd> is the honest structure rather than nested divs.
 */
export function TechStack() {
  return (
    <Section id="stack" tone="dark" aria-labelledby="stack-heading">
      <div className="max-w-[52ch]">
        <Reveal>
          <Overline className="text-white/50">The stack</Overline>
          <h2 id="stack-heading" className="mt-6 text-display-l">
            What we build it in.
          </h2>
          <p className="mt-6 text-body-l text-white/72">
            We pick per problem, not per preference. This is the ground we have
            already covered.
          </p>
        </Reveal>
      </div>

      <dl className="mt-16 md:mt-24">
        {techStack.map((category, index) => (
          <Reveal
            key={category.name}
            // Cap the stagger chain at 6 (DESIGN.md §7); the tail arrives with
            // the group rather than trailing half a second behind it.
            delay={Math.min(index, 5) * 70}
            className="grid gap-4 border-t border-white/10 py-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-8"
          >
            <dt className="text-h3 text-paper">{category.name}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {category.items.map((item) => {
                  const icon = item.icon ? techIcons[item.icon] : undefined;
                  return (
                    <li key={item.name}>
                      <Pill tone="dark" className="gap-2">
                        {icon && (
                          /*
                           * Decorative — the pill's own text names the
                           * technology, so announcing the mark as well would
                           * just repeat it. Monochrome via currentColor; brand
                           * colours would fight DESIGN.md §4.
                           */
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-3.5 w-3.5 shrink-0 opacity-70"
                          >
                            <path d={icon.path} />
                          </svg>
                        )}
                        {item.name}
                      </Pill>
                    </li>
                  );
                })}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
