import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Red-to-ember gradient rather than red-to-orange: white text on #FD7A00 is
 * only 2.6:1, while this range stays above 6:1. The bright orange appears as
 * the angular accent instead, so the section still reads red/orange.
 */
export function CtaBand({
  title = "Ready to improve your space?",
  text = "Let's discuss your next aluminium project.",
  cta = "Request a Free Quote",
}: {
  title?: string;
  text?: string;
  cta?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-dark via-red to-[#b03a00] bg-hatch-light">
      {/* Was a border-only rotated square offset off-canvas on both axes —
          border-top above the section's top edge, border-right past its
          right edge, both clipped away by overflow-hidden, leaving only two
          stray diagonal fragments where the rotated corners happened to
          cross back into view (not the square the code intended). Swapped
          for a filled wedge on one axis only, same fix as the homepage
          sections this same bug turned up in. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 hidden h-72 w-72 -translate-y-1/2 bg-orange/[0.14] [clip-path:polygon(0_0,100%_0,100%_100%)] lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-full bg-orange"
      />

      <Container className="relative flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:py-24">
        <div className="max-w-2xl">
          <h2 className="text-[1.9rem] leading-[1.1] text-white sm:text-4xl lg:text-[2.9rem]">
            {title}
          </h2>
          <p className="mt-4 text-base text-white/85 sm:text-lg">{text}</p>
        </div>
        <Button href="/contact" variant="light" size="lg" className="self-start lg:self-auto">
          {cta}
          <ArrowRight size={16} aria-hidden />
        </Button>
      </Container>
    </section>
  );
}
