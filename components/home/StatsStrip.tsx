import { Calendar, CheckCircle2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CountUpStat } from "@/components/home/CountUpStat";
import { stats } from "@/lib/site";

const icons = {
  calendar: Calendar,
  check: CheckCircle2,
  shield: ShieldCheck,
} as const;

export function StatsStrip() {
  return (
    <section
      aria-label="Betta Aluminium Solutions in numbers"
      className="relative overflow-hidden bg-ink"
    >
      {/* Same red-to-orange accent recipe used throughout the site (Eyebrow,
          WhyBetta, ServicesGrid) — ties this section back to the brand mark
          rather than landing as a plain dark band between Hero and TrustStrip. */}
      <div
        aria-hidden
        className="relative h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, var(--color-red) 0%, var(--color-red) 45%, var(--color-orange) 45%, var(--color-orange) 100%)",
        }}
      />

      {/* A large, barely-there triangle bleeding off the right edge only.
          Vertically centred (not offset-and-clipped on both axes) and
          filled rather than outlined, so what's left after overflow-hidden
          crops it is still a clean, predictable wedge instead of a border
          stroke that overflow-hidden can crop into invisibility — see the
          note on ServicesGrid's accent for how that failure mode looks. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-1/2 hidden h-40 w-40 -translate-y-1/2 bg-white/[0.05] [clip-path:polygon(0_0,100%_0,100%_100%)] lg:block"
      />

      <Container>
        <ul className="grid grid-cols-3 divide-x divide-white/10 py-9 sm:py-12">
          {stats.map((stat, i) => {
            const Icon = icons[stat.icon];
            return (
              <Reveal
                as="li"
                key={stat.label}
                delay={i * 80}
                className="flex flex-col items-center gap-2.5 px-1.5 text-center sm:gap-3 sm:px-6"
              >
                <Icon size={20} strokeWidth={1.6} className="text-orange-soft" aria-hidden />

                <span className="whitespace-nowrap text-[1.4rem] font-extrabold leading-none tracking-tight text-white tabular-nums sm:text-4xl">
                  {stat.kind === "count" ? (
                    <>
                      <span className="sr-only">
                        {stat.target}
                        {stat.suffix}
                      </span>
                      <CountUpStat target={stat.target} suffix={stat.suffix} />
                    </>
                  ) : (
                    stat.value
                  )}
                </span>

                <span className="text-[0.6rem] font-semibold uppercase leading-snug tracking-[0.1em] text-white/60 sm:text-xs sm:tracking-[0.12em]">
                  {stat.label}
                </span>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
