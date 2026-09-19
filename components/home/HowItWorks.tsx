import { ArrowRight, FileText, Hammer, MessageCircle, Ruler } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/site";

const icons = {
  message: MessageCircle,
  ruler: Ruler,
  file: FileText,
  hammer: Hammer,
} as const;

export function HowItWorks() {
  return (
    <section className="border-b border-line bg-shell py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From enquiry to installed"
          lead="The same four steps for every job, whatever its size."
          align="center"
          className="mx-auto"
        />

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {processSteps.map((step, i) => {
            const Icon = icons[step.icon];
            return (
              <Reveal as="li" key={step.index} delay={i * 80}>
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="relative flex items-center gap-3">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-red shadow-[0_1px_2px_rgba(20,23,26,0.08)]">
                      <Icon size={20} strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className="text-[1.6rem] font-extrabold leading-none tracking-tight text-mute tabular-nums">
                      {step.index}
                    </span>

                    {/* Connects each step to the next on desktop only — on
                        mobile the steps stack in two columns and a
                        horizontal arrow between them would point at the
                        wrong neighbour. */}
                    {i < processSteps.length - 1 ? (
                      <ArrowRight
                        aria-hidden
                        size={18}
                        strokeWidth={1.5}
                        className="absolute right-[-1.9rem] top-1/2 hidden -translate-y-1/2 text-line lg:block"
                      />
                    ) : null}
                  </div>
                  <h3 className="mt-5 text-[0.9rem] font-semibold uppercase tracking-[0.1em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-slate">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
