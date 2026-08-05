import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Apeiroq collects, uses, and stores personal data submitted through this site, and how to request its removal.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

// TODO: real privacy policy. Required before the newsletter or contact form
// goes live — GDPR applies, the audience is international. Needs legal review;
// do not draft placeholder policy text that reads as binding.
export default function PrivacyPage() {
  return (
    <PageHero
      title="Privacy"
      lede="This policy is being prepared and will be published before any form on this site starts collecting data."
    />
  );
}
