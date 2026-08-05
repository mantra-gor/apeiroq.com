import { Hero } from "@/components/sections/hero";

/**
 * Home. Section order is fixed by DESIGN.md §11 — build them in this order:
 *
 *   1. Hero                  done
 *   2. Trust bar             TODO — 3 real client logos + country caption
 *   3. What we build         TODO — 4 capability disclosure cards (§2 #3)
 *   4. Products & prototypes TODO — work cards in a scroll-snap rail (§2 #2,#6)
 *   5. How we work           TODO — numbered process timeline (§2 #4)
 *   6. Testimonials          TODO — 3 real quotes + location pills (§2 #8)
 *   7. The team              TODO — 12 engineers, distributed
 *   8. Newsletter            TODO — section version of the footer form
 *   9. Closing CTA           TODO — dark, single primary action
 *
 * Sections 2, 4 and 6 are blocked on real content (logos, screenshots, quotes).
 * Do not scaffold them with placeholder companies or invented metrics.
 */
export default function HomePage() {
  return <Hero />;
}
