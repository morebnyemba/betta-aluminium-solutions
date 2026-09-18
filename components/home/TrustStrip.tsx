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
    <section aria-label="What we focus on" className="border-b border-line bg-shell">
      <Container>
        <ul className="grid divide-y divide-line/70 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {valueProps.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 70}
                className="flex gap-4 py-8 sm:border-b sm:border-line/70 sm:py-10 lg:border-b-0 lg:border-l lg:border-line/70 lg:py-12 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-red shadow-[0_1px_2px_rgba(20,23,26,0.08)]">
                  <Icon size={20} strokeWidth={1.6} aria-hidden />
                </span>
                <div className="pt-1.5">
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
