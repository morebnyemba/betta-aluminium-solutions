import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArchImage } from "@/components/ui/ArchImage";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/home/CtaBand";
import { WhyBetta } from "@/components/home/WhyBetta";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Betta Aluminium Solutions designs, fabricates and installs aluminium windows, doors, partitions, shopfronts and custom aluminium work for residential and commercial spaces in Zimbabwe.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Spaces that make life better"
        lead="Aluminium fabrication and installation for residential and commercial environments."
      />

      <section className="border-b border-line bg-white py-20 sm:py-24 lg:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -left-4 -top-4 hidden h-32 w-32 border-l-[3px] border-t-[3px] border-red lg:block"
              />
              <ArchImage
                src="/images/about-workshop.jpg"
                alt="Aluminium and glass installation in a contemporary interior"
                ratio="aspect-[4/3] lg:aspect-[6/5]"
                sizes="(min-width: 1024px) 48vw, 92vw"
                hover={false}
                className="relative"
              />
            </div>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-6">
            <SectionHeading
              eyebrow="Who We Are"
              title="Aluminium work made for the space it goes into"
            />
            <div className="mt-6 space-y-5 leading-relaxed text-slate">
              <p>
                Betta Aluminium Solutions provides aluminium fabrication and
                installation for residential and commercial environments. The
                work covers windows, doors, partitions, shopfronts and custom
                aluminium fabrication — from a single replacement opening
                through to a full commercial frontage.
              </p>
              <p>
                Aluminium suits modern buildings because it holds a slim
                sightline across a wide opening, which is what lets a room keep
                its daylight. Getting that right is a question of measurement
                and assembly rather than of catalogue selection, so each system
                is set out around the opening it belongs to.
              </p>
              <p>
                Fabrication and installation are handled as one job. The
                sections are cut and assembled to the measurements taken on
                site, then fitted, adjusted and left clean, which is what keeps
                the finished result consistent with what was drawn.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-shell py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What We Focus On"
            title="Quality, design and installation as one process"
            lead="The same four things shape every job, whatever its size."
          />

          <dl className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                term: "Quality workmanship",
                desc: "Sections cut cleanly, joints assembled square, glazing set properly.",
              },
              {
                term: "Modern architectural aesthetics",
                desc: "Slim frames and consistent sightlines that suit contemporary buildings.",
              },
              {
                term: "Custom fabrication",
                desc: "Systems made to the opening rather than the opening adapted to a unit.",
              },
              {
                term: "Functional design",
                desc: "Openings, ventilation and access planned around how the space is used.",
              },
            ].map((item, i) => (
              <Reveal key={item.term} delay={i * 70} className="bg-shell p-8 lg:p-10">
                <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ink">
                  {item.term}
                </dt>
                <span aria-hidden className="rule-brand mt-4 block" />
                <dd className="mt-4 text-sm leading-relaxed text-slate">{item.desc}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-b border-line bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Capability"
            title="What we fabricate and install"
          />
          <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service, i) => (
              <Reveal as="li" key={service.slug} delay={i * 60} className="bg-white">
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full p-7 transition-colors hover:bg-shell"
                >
                  <h3 className="flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink">
                    {service.name}
                    <ArrowRight
                      size={13}
                      aria-hidden
                      className="text-red opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">
                    {service.summary}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <WhyBetta />
      <CtaBand />
    </>
  );
}
