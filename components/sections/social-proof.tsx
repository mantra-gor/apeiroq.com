import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/*
 * Capabilities, not metrics — and deliberately not a logo wall.
 *
 * DESIGN.md §11 §2 specifies a trust bar of three real client logos. We do not
 * have signed permission for those, and CLAUDE.md rules out a placeholder logo
 * grid absolutely, so this holds the slot with six things that are true today
 * and need nobody's sign-off. Each one is a claim a buyer can check in the
 * sections below it rather than a number we would have to invent.
 *
 * These become metrics as the numbers become real ("Custom Platforms" → "9
 * platforms shipped"). Swap them one at a time; there is no reason to keep a
 * capability label once a verifiable figure exists to replace it.
 */
const capabilities = [
  "Custom Platforms",
  "International Teams",
  "End-to-End Development",
  "Modern Technologies",
  "Agile Delivery",
  "Long-Term Support",
];

/**
 * Social proof strip — DESIGN.md §11 §2.
 *
 * A band, not a section: `py-section` is 96–176px and would give six short
 * labels the same weight as the case studies. The tint canvas plus a hairline
 * over each label is the whole treatment.
 */
export function SocialProof() {
  return (
    <Section
      tone="tint"
      className="py-12 md:py-16"
      aria-label="What we deliver"
    >
      <Reveal>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {capabilities.map((capability) => (
            <li
              key={capability}
              className="border-t border-ink-200 pt-4 text-caption text-ink-600"
            >
              {capability}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
