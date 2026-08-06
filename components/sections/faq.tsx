import { answeredFaqs } from "@/content/faqs";
import { Arrow } from "@/components/ui/arrow";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";

/**
 * FAQ — thirteen buying questions, answered before they are asked.
 *
 * One open at a time, with no JavaScript: every <details> shares a `name`, which
 * is the HTML exclusive-accordion group. The browser closes the previous one.
 * Where `name` is not supported the panels simply toggle independently — the
 * content is all still reachable, which is the right way for this to degrade.
 *
 * Note this reverses the position taken in components/ui/disclosure.tsx, which
 * argues that closing someone's previous choice is hostile. That holds for three
 * service cards a buyer wants to compare side by side. It does not hold for
 * thirteen unrelated questions, where the cost of leaving them all open is a
 * section several screens tall and a scrollbar that jumps under the cursor.
 *
 * Native <details>, not the Disclosure component, for the same reason as before:
 * zero JS, correct keyboard and screen-reader semantics for free, content in the
 * DOM whether open or closed so it is crawlable, and the section stays a Server
 * Component. Thirteen instances of a client component here would be the single
 * largest avoidable JS cost on the page.
 *
 * Two columns from lg. Thirteen rows in one full-width stack is a wall; putting
 * the heading in a sticky rail beside them keeps the section anchored while the
 * list scrolls. Below lg it is one column and the heading scrolls away normally.
 *
 * No FAQPage JSON-LD. Google restricted FAQ rich results to authoritative
 * government and health sites, so the markup earns no snippet for us — it is
 * weight in the document for an appearance we are not eligible for. DESIGN.md
 * §10's schema table does not list it either.
 */
export function Faq() {
  if (answeredFaqs.length === 0) return null;

  return (
    <Section id="faq" tone="tint" aria-labelledby="faq-heading">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Overline>FAQ</Overline>
            <h2 id="faq-heading" className="mt-6 text-display-l">
              Questions worth asking early.
            </h2>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <ul>
              {answeredFaqs.map((faq) => (
                <li key={faq.id}>
                  <details
                    /*
                     * The exclusive-accordion group. Shared across every item,
                     * so opening one closes the last.
                     */
                    name="faq"
                    className="group border-b border-ink-200 first:border-t"
                  >
                    <summary
                      className={[
                        "flex cursor-pointer list-none items-start gap-6 py-5",
                        "text-h3 transition-colors duration-160 ease-standard",
                        "hover:text-ember-strong",
                        "[&::-webkit-details-marker]:hidden",
                      ].join(" ")}
                    >
                      <span className="flex-1">{faq.question}</span>
                      {/*
                        A plus that turns into an ×. The rotation is on the
                        wrapper, not the bars: `rotate-90` on a bar and
                        `group-open:rotate-0` are the same utility family at the
                        same specificity in the same layer, so the variant loses
                        on source order and the marker would never change. The
                        wrapper carries no competing rotate, so 45° always wins.
                      */}
                      <span
                        aria-hidden="true"
                        className="relative mt-1.5 h-4 w-4 shrink-0 text-ink-500 transition-transform duration-240 ease-standard group-open:rotate-45"
                      >
                        <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
                        <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 rotate-90 bg-current" />
                      </span>
                    </summary>
                    <p className="max-w-[68ch] pb-6 text-body text-ink-500">
                      {faq.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </Reveal>

          {/*
            Ends the section on an action rather than on the last answer — a
            visitor whose question is not here otherwise has nowhere to go.
            /contact, not /hire-us: this is framed as a question, not a brief.
          */}
          <Reveal className="mt-12">
            <div className="rounded-lg border border-ink-200 bg-paper p-8 md:p-10">
              <h3 className="text-h2">Still have questions?</h3>
              <p className="mt-4 max-w-[56ch] text-body-l text-ink-500">
                Every project is unique. If you don&apos;t see your question
                here, we&apos;d be happy to discuss your requirements and
                recommend the best approach.
              </p>
              <ButtonLink href="/contact" variant="secondary" className="mt-8">
                Let&apos;s Talk
                <Arrow />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
