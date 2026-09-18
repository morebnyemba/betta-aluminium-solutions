import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ArchImage } from "@/components/ui/ArchImage";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      {/* Angular accents drawn from the roof line in the logo. Decorative only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 hidden h-full w-[46%] lg:block"
      >
        <div className="absolute right-0 top-16 h-[62%] w-full bg-shell" />
        <div className="absolute right-[18%] top-8 h-24 w-24 bg-orange/90 [clip-path:polygon(0_100%,100%_100%,100%_0)]" />
      </div>

      <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-6 xl:col-span-5">
          <Eyebrow>{site.name}</Eyebrow>

          <h1 className="mt-6 text-[2.15rem] leading-[1.06] sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem]">
            Quality aluminium solutions.
            <span className="mt-2 block text-red">Built for better spaces.</span>
          </h1>

          <p className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-slate sm:text-[1.08rem]">
            Professional aluminium windows, doors, partitions, shopfronts and
            custom fabrication for residential and commercial spaces.
          </p>

          <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button href="/contact" size="lg">
              Get a Free Quote
              <ArrowRight size={16} aria-hidden />
            </Button>
            <Button href="/projects" variant="outline" size="lg">
              View Our Work
            </Button>
          </div>
        </div>

        <div className="lg:col-span-6 xl:col-span-7">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -left-3 -top-3 hidden h-28 w-28 border-l-[3px] border-t-[3px] border-red sm:block"
            />
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 hidden h-28 w-28 border-b-[3px] border-r-[3px] border-orange sm:block"
            />
            <ArchImage
              src="/images/hero-architecture.jpg"
              alt="Contemporary building with aluminium-framed glass windows and doors"
              ratio="aspect-[4/3] lg:aspect-[6/5]"
              sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 50vw, 92vw"
              priority
              hover={false}
              className="relative"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
