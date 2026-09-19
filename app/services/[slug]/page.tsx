import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArchImage } from "@/components/ui/ArchImage";
import { Button } from "@/components/ui/Button";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { CtaBand } from "@/components/home/CtaBand";
import { services } from "@/lib/site";
import { getGalleryItems } from "@/lib/gallery";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.name,
    description: `${service.summary} Aluminium ${service.name.toLowerCase()} designed, fabricated and installed by Betta Aluminium Solutions.`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | Betta Aluminium Solutions`,
      description: service.summary,
      url: `/services/${service.slug}`,
    },
  };
}

/** Category most closely matching each service, for the related strip. */
const relatedCategory: Record<string, string> = {
  windows: "Windows",
  doors: "Doors",
  partitions: "Partitions",
  shopfronts: "Shopfronts",
  "aluminium-fabrication": "Commercial",
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = services.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const service = services[index];
  const next = services[(index + 1) % services.length];
  const gallery = await getGalleryItems();
  const related = gallery.filter(
    (item) => item.category === relatedCategory[service.slug],
  );

  return (
    <>
      <section className="border-b border-line bg-shell">
        <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
          <div className="lg:col-span-6">
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate transition-colors hover:text-ink"
            >
              <ArrowLeft size={14} aria-hidden />
              All Services
            </Link>
            <Eyebrow className="mt-4">Service</Eyebrow>
            <h1 className="mt-5 text-[2rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3rem]">
              {service.name}
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-slate">
              {service.summary}
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <Button href="/contact">
                Get a Free Quote
                <ArrowRight size={15} aria-hidden />
              </Button>
              <Button href="/projects" variant="outline">
                View Our Work
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <ArchImage
              src={service.image}
              alt={service.imageAlt}
              ratio="aspect-[16/10]"
              sizes="(min-width: 1024px) 48vw, 92vw"
              priority
              hover={false}
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-2xl tracking-tight sm:text-[1.9rem]">
              About this service
            </h2>
            <span aria-hidden className="rule-brand mt-5 block" />
            <div className="mt-6 space-y-5 leading-relaxed text-slate">
              {service.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-line bg-shell p-8">
              <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ink">
                What this covers
              </h2>
              <ul className="mt-6 space-y-4">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate">
                    <Check size={16} className="mt-0.5 shrink-0 text-red" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?service=${encodeURIComponent(service.name)}`}
                className="mt-8 inline-flex min-h-12 w-full items-center justify-center bg-red px-6 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-dark"
              >
                Enquire About {service.name}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="border-b border-line bg-white py-16 sm:py-20">
          <Container>
            <Eyebrow className="mb-5">Related work</Eyebrow>
            <h2 className="text-2xl tracking-tight sm:text-[1.9rem]">
              {service.name} in context
            </h2>
            <div className="mt-10">
              <ProjectGallery items={related} showFilters={false} />
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-line bg-white py-12">
        <Container>
          <Link
            href={`/services/${next.slug}`}
            className="group flex flex-col gap-2 border border-line p-8 transition-colors hover:border-charcoal focus-visible:border-charcoal sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate">
                Next service
              </span>
              <span className="mt-2 block text-xl font-bold tracking-tight text-ink">
                {next.name}
              </span>
            </span>
            <ArrowRight
              size={20}
              aria-hidden
              className="text-red transition-transform duration-300 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
            />
          </Link>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
