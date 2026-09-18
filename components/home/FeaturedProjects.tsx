import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { gallery } from "@/lib/site";

export function FeaturedProjects() {
  const featured = gallery.slice(0, 6);
  const hasReference = featured.some((item) => item.kind === "reference");

  return (
    <section className="border-b border-line bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our Work"
            title="Built for modern spaces"
            lead="Aluminium glazing, doors, partitions and shopfronts across residential and commercial settings."
          />
          <Button href="/projects" variant="outline" className="self-start lg:self-auto">
            View All Projects
            <ArrowRight size={15} aria-hidden />
          </Button>
        </div>

        <div className="mt-12">
          <ProjectGallery items={featured} showFilters={false} />
        </div>

        {hasReference ? (
          <p className="mt-12 max-w-2xl border-l-2 border-line pl-5 text-sm leading-relaxed text-mute">
            Images marked as design references illustrate the type of work
            described and are not presented as completed Betta Aluminium
            Solutions installations.
          </p>
        ) : null}
      </Container>
    </section>
  );
}
