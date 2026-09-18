import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArchImage } from "@/components/ui/ArchImage";
import { Reveal } from "@/components/ui/Reveal";
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
              className={
                i < 2
                  ? "group bg-white lg:col-span-3"
                  : "group bg-white lg:col-span-2"
              }
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
