import { Ruler, LayoutGrid, PencilRuler, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { valueProps } from "@/lib/site";

const icons = {
  ruler: Ruler,
  layout: LayoutGrid,
  pencil: PencilRuler,
  wrench: Wrench,
} as const;

export function TrustStrip() {
  return (
    <section aria-label="What we focus on" className="border-b border-line bg-white">
      <Container>
        <ul className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {valueProps.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 70}
                className="flex gap-4 py-8 sm:border-b sm:border-line sm:py-10 lg:border-b-0 lg:border-l lg:border-line lg:py-12 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <Icon
                  size={22}
                  strokeWidth={1.4}
                  className="mt-0.5 shrink-0 text-red"
                  aria-hidden
                />
                <div>
                  <h3 className="text-[0.78rem] font-semibold uppercase leading-[1.5] tracking-[0.16em] text-ink lg:min-h-[2.4em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
