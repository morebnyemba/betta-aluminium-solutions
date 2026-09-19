import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArchImage } from "@/components/ui/ArchImage";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/home/CtaBand";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Aluminium windows, doors, partitions, shopfronts and custom aluminium fabrication — designed, fabricated and installed for residential and commercial spaces.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Aluminium solutions for every space"
        lead="From residential projects to commercial installations, we design, fabricate and install aluminium solutions tailored to your space."
      />

      <section className="bg-white">
        <Container className="divide-y divide-line">
          {services.map((service, i) => (
            <Reveal
              as="article"
              key={service.slug}
              className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-16 lg:py-20"
            >
              <Link
                href={`/services/${service.slug}`}
                aria-label={`${service.name} — explore this service`}
                className={
                  i % 2 === 0
                    ? "group block lg:col-span-6"
                    : "group block lg:col-span-6 lg:order-2"
                }
              >
                <ArchImage
                  src={service.image}
                  alt={service.imageAlt}
                  ratio="aspect-[16/10]"
                  sizes="(min-width: 1024px) 48vw, 92vw"
                />
              </Link>

              <div className={i % 2 === 0 ? "lg:col-span-6" : "lg:col-span-6 lg:order-1"}>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-2xl tracking-tight sm:text-3xl lg:text-[2.1rem]">
                  {service.name}
                </h2>
                <span aria-hidden className="rule-brand mt-5 block" />
                <p className="mt-5 leading-relaxed text-slate">{service.body[0]}</p>

                <ul className="mt-6 space-y-2.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-slate">
                      <span
                        aria-hidden
                        className="mt-[0.45rem] size-1.5 shrink-0 bg-orange"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-8 inline-flex min-h-11 items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-red transition-colors hover:text-red-dark focus-visible:text-red-dark"
                >
                  Explore Service
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
