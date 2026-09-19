import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { ArchImage } from "@/components/ui/ArchImage";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A single project shown before/after, rather than the general grid in
 * FeaturedProjects. These two photos are the only pair on the site that
 * actually document the same job mid-install and complete, so it's called
 * out on its own rather than lost among the wider gallery.
 */
export function FeaturedProject() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white py-20 sm:py-24 lg:py-28">
      {/* Was a two-sided border bracket offset off-canvas on both axes —
          which put the border-top above the section's top edge and the
          border-right past its right edge, so overflow-hidden clipped away
          both strokes and left nothing visible at all. Sitting flush in the
          corner with zero bleed sidesteps that: a filled triangle, no
          offset to get wrong. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 hidden h-24 w-24 bg-orange/[0.08] [clip-path:polygon(100%_0,100%_100%,0_0)] lg:block"
      />

      <Container>
        <SectionHeading
          eyebrow="Featured Project"
          title="A modular room, glazed and installed"
          lead="Aluminium-framed windows and door fitted into a prefabricated room addition — shown during installation and complete."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="relative">
              <ArchImage
                src="/images/gallery/commercial-project-modular-room-installation-in-progress.jpg"
                alt="Prefabricated room addition being lifted into place during installation, with aluminium window and door frames fitted"
                ratio="aspect-[4/3]"
                sizes="(min-width: 640px) 46vw, 92vw"
                hover={false}
              />
              <span className="absolute left-4 top-4 bg-ink/85 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white">
                During Installation
              </span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="relative">
              <ArchImage
                src="/images/gallery/commercial-project-modular-glass-room-complete.jpg"
                alt="Completed modular room addition at dusk, with aluminium-framed glazing installed"
                ratio="aspect-[4/3]"
                sizes="(min-width: 640px) 46vw, 92vw"
                hover={false}
              />
              <span className="absolute left-4 top-4 bg-red px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white">
                Complete
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
