/**
 * Client testimonials — Home, and reused on /projects and /hire-us
 * (DESIGN.md §11). Three real quotes, shown large and static. Never a carousel.
 *
 * CONTENT INTEGRITY — read before editing (CLAUDE.md):
 * Nothing goes in this array that a named person did not actually say and give
 * us permission to publish. No composites, no "representative" quotes, no
 * paraphrases attributed to a real person, not even as temporary filler.
 * The Testimonials section renders nothing at all while this array is empty,
 * which is the correct behaviour — an empty section is honest, an invented one
 * is not.
 *
 * TODO: awaiting the three real quotes. Each needs:
 *   quote · name · role · company · city · countryCode · permission to publish
 *
 * Location is a text country code, not a flag emoji — flags render
 * inconsistently across platforms (DESIGN.md §2 #8).
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  /** City name, e.g. "Stockholm". */
  city: string;
  /** ISO 3166-1 alpha-2, e.g. "SE". Rendered as text, never as a flag. */
  countryCode: string;
};

export const testimonials: Testimonial[] = [];
