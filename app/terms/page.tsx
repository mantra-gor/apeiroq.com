import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms governing use of the Apeiroq website. Engagement terms are agreed per contract, not through this page.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

// TODO: real terms of use. Needs legal review — do not draft placeholder terms
// that read as binding.
export default function TermsPage() {
  return (
    <PageHero
      title="Terms"
      lede="These terms are being prepared. Engagement terms are agreed per contract and are not governed by this page."
    />
  );
}
