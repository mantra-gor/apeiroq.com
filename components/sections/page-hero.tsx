import { Container } from "@/components/ui/container";
import { Overline } from "@/components/ui/section";

/** Standard opener for inner routes. Light canvas, one H1, one lede. */
export function PageHero({
  overline,
  title,
  lede,
}: {
  overline?: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <Container>
        {overline && <Overline>{overline}</Overline>}
        <h1 className="mt-5 max-w-[18ch] text-h1">{title}</h1>
        {lede && (
          <p className="mt-6 max-w-[52ch] text-body-l text-ink-500">{lede}</p>
        )}
      </Container>
    </section>
  );
}
