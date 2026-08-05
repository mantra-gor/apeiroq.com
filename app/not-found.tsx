import type { Metadata } from "next";
import { Arrow } from "@/components/ui/arrow";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Overline } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="pt-24 pb-24 md:pt-32 md:pb-32">
      <Container>
        <Overline>404</Overline>
        <h1 className="mt-5 max-w-[18ch] text-h1">
          That page does not exist.
        </h1>
        <p className="mt-6 max-w-[52ch] text-body-l text-ink-500">
          The link may be out of date, or the page may have moved.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="secondary">
            Back to home
            <Arrow />
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
