import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Tell us what you are building. Send a brief or a rough idea — we reply to every enquiry, and we will tell you if we are not the right fit.",
  alternates: { canonical: "/contact" },
};

// TODO (DESIGN.md §2 #9): brief-first form — name, work email, company, budget
// range, message, optional file upload (<=10MB, validated server-side in the
// Server Action). State the response time in writing. Add the timezone note.
export default function ContactPage() {
  return (
    <PageHero
      overline="Contact"
      title="Tell us what you are building."
      lede="Send a full brief or a rough idea. We read every message, and we will tell you plainly if we are not the right team for it."
    />
  );
}
