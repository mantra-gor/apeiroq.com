import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Remote-first engineering roles at Apeiroq. A transparent hiring process with stated stages and timelines, on a team of twelve.",
  alternates: { canonical: "/careers" },
};

// TODO (DESIGN.md §11): remote-first pitch, transparent hiring stages with
// timelines, open roles with JobPosting JSON-LD (drives Google Jobs — outsized
// value for a team this size). Keep the page live even with zero openings.
export default function CareersPage() {
  return (
    <PageHero
      overline="Careers"
      title="Remote-first, deliberately."
      lede="We hire engineers who want ownership of what they ship. Transparent stages, stated timelines, and an answer either way."
    />
  );
}
