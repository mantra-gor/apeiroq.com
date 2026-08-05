import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Twelve engineers building custom software, fully remote. No bench, no juniors billed as seniors, no handoff to a delivery team you never met.",
  alternates: { canonical: "/about" },
};

// TODO (DESIGN.md §11): origin story, operating principles, the 12-person team,
// how full-remote actually works (overlap hours, comms cadence, demo rhythm),
// engagement models.
export default function AboutPage() {
  return (
    <PageHero
      overline="About us"
      title="Twelve engineers. No layers in between."
      lede="Apeiroq is a fully remote software team building custom platforms for clients working across timezones. Small is the point: you talk to the people writing the code."
    />
  );
}
