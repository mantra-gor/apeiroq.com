import { principles } from "@/content/principles";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";

/**
 * Engineering principles — how we build, stated as practice rather than
 * adjective. Placed after the stack: a buyer who has just read the tool list
 * wants to know what we do with it.
 *
 * Pills (§2 #8), not another hairline card grid. "Why Apeiroq" further down is
 * already six items in three columns with a rule over each one, and two
 * six-item grids on one page read as a template rather than a decision. These
 * are bare labels with no body copy, so they want the more compact form
 * anyway — the tech stack uses the same pill for the same reason.
 *
 * One Reveal around the whole set, not one per pill: §7 caps a stagger chain at
 * six, and six pills firing individually would be a shimmer, not an entrance.
 */
export function EngineeringPrinciples() {
  return (
    <Section
      id="principles"
      tone="light"
      aria-labelledby="principles-heading"
    >
      <div className="max-w-[52ch]">
        <Reveal>
          <Overline>Engineering principles</Overline>
          <h2 id="principles-heading" className="mt-6 text-display-l">
            How the work gets built.
          </h2>
          <p className="mt-6 text-body-l text-ink-500">
            Not a philosophy. These are the things we do on every engagement,
            and the things you should hold us to on yours.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-12 md:mt-16">
        <ul className="flex flex-wrap gap-3">
          {principles.map((principle) => (
            <li key={principle}>
              <Pill className="text-body">{principle}</Pill>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
