import { reasons } from "@/content/reasons";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";

/**
 * Why businesses choose Apeiroq — the objection-handling grid, placed after the
 * stack so it lands once a buyer has seen the work and is looking for reasons
 * not to proceed.
 *
 * `tint`, because TechStack above is dark and Testimonials below is light.
 *
 * No icons. Six of them would be exactly the "icon soup" DESIGN.md §11 §3 rules
 * out, and each entry is already one line — an icon would decorate a sentence
 * that does not need help. The hairline over each item is the same treatment
 * the process timeline uses, so the two sections read as one system.
 *
 * There is no intro paragraph under the heading on purpose: the six answers are
 * the content, and a lede here would only restate them at greater length.
 */
export function WhyApeiroq() {
  return (
    <Section id="why-apeiroq" tone="tint" aria-labelledby="why-apeiroq-heading">
      <div className="max-w-[52ch]">
        <Reveal>
          <Overline>Why Apeiroq</Overline>
          <h2 id="why-apeiroq-heading" className="mt-6 text-display-l">
            Why businesses choose Apeiroq.
          </h2>
        </Reveal>
      </div>

      <ul className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <Reveal
            key={reason.id}
            as="li"
            // §7 caps a stagger chain at six — six items, so this is exactly it.
            delay={Math.min(index, 5) * 70}
            className="border-t border-ink-200 pt-6"
          >
            <h3 className="text-h3">{reason.title}</h3>
            <p className="mt-3 text-body text-ink-500">{reason.description}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
