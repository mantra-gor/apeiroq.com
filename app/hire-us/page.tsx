import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Hire Us",
  description:
    "Hire a dedicated software team. Fixed-scope engagements with stated pricing, or an embedded team of engineers who work as part of yours.",
  alternates: { canonical: "/hire-us" },
};

// TODO (DESIGN.md §11): engagement models, process, what we need in order to
// quote, FAQ, one testimonial, and the brief-first form. Add the productized
// offer cards with real prices (§2 #11) and Service JSON-LD.
export default function HireUsPage() {
  return (
    <PageHero
      overline="Hire us"
      title="Start with a bounded first engagement."
      lede="A fixed scope, a stated price, and a working result at the end of it — so the first decision you make about us is a small one."
    />
  );
}
