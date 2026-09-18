import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArchImage } from "@/components/ui/ArchImage";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function AboutPreview() {
  return (
    <section className="border-b border-line bg-shell py-20 sm:py-24 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -bottom-4 -left-4 hidden h-32 w-32 border-b-[3px] border-l-[3px] border-red lg:block"
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
            eyebrow="About Betta"
            title="Spaces that make life better"
            lead="Betta Aluminium Solutions designs, fabricates and installs aluminium systems for residential and commercial environments — windows, doors, partitions, shopfronts and custom work made to suit the space it goes into."
          />
          <p className="mt-5 max-w-2xl leading-relaxed text-slate">
            The work is measured on site, fabricated to those measurements and
            installed by the same people who made it. That keeps the detail
            consistent from the drawing through to the finished opening, and it
            is how a modern aluminium system ends up looking deliberate rather
            than approximate.
          </p>
          <Button href="/about" variant="dark" className="mt-9">
            More About Us
            <ArrowRight size={15} aria-hidden />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
