import Link from "next/link";
import { engagementModels } from "@/content/engagement-models";
import { Arrow } from "@/components/ui/arrow";
import { Reveal } from "@/components/ui/reveal";
import { Overline, Section } from "@/components/ui/section";
import { primaryCta } from "@/lib/site";

/**
 * Engagement models — DESIGN.md §11 puts these on /hire-us and /about; this is
 * the Home summary that answers "how would we actually work together" before a
 * buyer has to click through to find out.
 *
 * Three cards, not the §2 #3 disclosure: a disclosure implies there is detail
 * worth opening, and each model is one sentence. The detail lives on /hire-us,
 * which is where the arrow points.
 *
 * Deliberately no price, team size, or minimum term on this page. Those are
 * commercial terms, they belong next to the form on /hire-us, and inventing a
 * number here to make the cards look finished is the one thing CLAUDE.md rules
 * out absolutely.
 */
export function EngagementModels() {
  return (
    <Section id="engagement" tone="light" aria-labelledby="engagement-heading">
      <div className="max-w-[52ch]">
        <Reveal>
          <Overline>Engagement models</Overline>
          <h2 id="engagement-heading" className="mt-6 text-display-l">
            Three ways to work together.
          </h2>
          <p className="mt-6 text-body-l text-ink-500">
            Pick the one that matches where your product is. If none of them
            quite fits, say so — the shape is negotiable.
          </p>
        </Reveal>
      </div>

      <ul className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-3">
        {engagementModels.map((model, index) => (
          <Reveal
            key={model.id}
            as="li"
            delay={index * 70}
            className="flex flex-col rounded-lg border border-ink-200 bg-paper p-6 md:p-8"
          >
            <h3 className="text-h3">{model.title}</h3>
            <p className="mt-3 text-body text-ink-500">{model.description}</p>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-10">
        <Link
          href={primaryCta.href}
          className="group inline-flex items-center gap-2 text-body font-medium text-ink hover:text-ember-strong"
        >
          See how an engagement starts
          <Arrow />
        </Link>
      </Reveal>
    </Section>
  );
}
