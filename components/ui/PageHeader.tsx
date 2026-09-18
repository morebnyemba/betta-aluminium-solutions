import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-shell">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 lg:block"
      >
        <div className="absolute right-10 top-0 h-full w-px bg-line" />
        <div className="absolute right-10 top-16 h-16 w-16 bg-orange/90 [clip-path:polygon(0_100%,100%_100%,100%_0)]" />
      </div>

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-[2rem] leading-[1.08] sm:text-[2.75rem] lg:text-[3.25rem]">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate sm:text-[1.05rem]">
            {lead}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
