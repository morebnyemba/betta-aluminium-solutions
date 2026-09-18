import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArchImage } from "@/components/ui/ArchImage";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { services } from "@/lib/site";

export function ServicesGrid() {
  return (
    <section id="services" className="border-b border-line bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="Aluminium solutions for every space"
          lead="From residential projects to commercial installations, we design, fabricate and install aluminium solutions tailored to your space."
        />

        {/* Two wide cards, then three — a deliberate break from a uniform grid. */}
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-6">
          {services.map((service, i) => (
            <Reveal
              as="article"
              key={service.slug}
              delay={(i % 3) * 80}
              className={cn(
                "group relative bg-white transition-shadow duration-300 hover:z-10 hover:shadow-[0_24px_48px_-28px_rgba(20,23,26,0.35)]",
                i < 2 ? "lg:col-span-3" : "lg:col-span-2",
              )}
            >
              <Link href={`/services/${service.slug}`} className="block h-full">
                <ArchImage
                  src={service.image}
                  alt={service.imageAlt}
                  ratio={i < 2 ? "aspect-[16/10]" : "aspect-[4/3]"}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="p-6 lg:p-8">
                  <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
                    {service.name}
                  </h3>
                  {/* A plain (non-animated) two-tone bar, not `.rule-brand` — that
                      class now plays its own draw-in animation once on mount,
                      which would already be finished by the time this is
                      revealed on hover. */}
                  <span
                    aria-hidden
                    style={{
                      background:
                        "linear-gradient(90deg, var(--color-red) 0%, var(--color-red) 45%, var(--color-orange) 45%, var(--color-orange) 100%)",
                    }}
                    className="mt-3 block h-[3px] w-8 origin-left scale-x-0 transition-transform duration-300 motion-safe:group-hover:scale-x-100"
                  />
                  <p className="mt-3 text-sm leading-relaxed text-slate">
                    {service.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-red transition-colors group-hover:text-red-dark">
                    Explore Service
                    <ArrowRight
                      size={14}
                      aria-hidden
                      className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
