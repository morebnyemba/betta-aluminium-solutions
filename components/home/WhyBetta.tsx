import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { whyBetta } from "@/lib/site";

export function WhyBetta() {
  return (
    <section className="border-b border-line bg-white py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">Why Betta</Eyebrow>
          <h2 className="text-[1.9rem] leading-[1.08] sm:text-4xl lg:text-[3rem]">
            Why Betta Aluminium Solutions?
          </h2>
        </div>

        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2">
          {whyBetta.map((item, i) => (
            <Reveal
              key={item.index}
              delay={(i % 2) * 80}
              className="bg-white py-10 sm:px-8 lg:py-14"
            >
              <div className="flex items-start gap-6">
                {/* The numeral carries brand colour at text weight, so it uses
                    the red (6.6:1) rather than the orange (2.6:1). */}
                <span className="text-[2.6rem] font-extrabold leading-none tracking-tight text-red tabular-nums lg:text-[3.25rem]">
                  {item.index}
                </span>
                <div className="pt-1">
                  <h3 className="text-xl font-bold tracking-tight text-ink lg:text-2xl">
                    {item.title}
                  </h3>
                  <span aria-hidden className="rule-brand mt-4 block" />
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-slate">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
