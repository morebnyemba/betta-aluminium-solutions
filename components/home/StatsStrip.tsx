import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/lib/site";

export function StatsStrip() {
  return (
    <section aria-label="Betta Aluminium Solutions in numbers" className="bg-ink">
      <Container>
        <ul className="grid grid-cols-3 divide-x divide-white/10 py-10 sm:py-12">
          {stats.map((stat, i) => (
            <Reveal
              as="li"
              key={stat.label}
              delay={i * 80}
              className="flex flex-col items-center px-2 text-center sm:px-6"
            >
              <span className="text-[1.7rem] font-extrabold leading-none tracking-tight text-white tabular-nums sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-2 text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.12em] text-white/60 sm:text-xs">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
