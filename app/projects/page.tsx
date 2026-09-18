import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { CtaBand } from "@/components/home/CtaBand";
import { getGalleryItems } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Aluminium glass facades, windows, doors, partitions, shower enclosures and shopfronts — residential and commercial aluminium work by Betta Aluminium Solutions.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const gallery = await getGalleryItems();
  const hasReference = gallery.some((item) => item.kind === "reference");

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Built for modern spaces"
        lead="Aluminium glazing, doors, partitions, shower enclosures and shopfronts across residential and commercial settings."
      />

      <section className="border-b border-line bg-white py-14 sm:py-20">
        <Container>
          <ProjectGallery items={gallery} />

          {hasReference ? (
            <p className="mt-12 max-w-2xl border-l-2 border-line pl-5 text-sm leading-relaxed text-mute">
              Images marked as design references illustrate the type of work
              described and are not presented as completed Betta Aluminium
              Solutions installations.
            </p>
          ) : null}
        </Container>
      </section>

      <CtaBand
        title="Have a project in mind?"
        text="Send through the details and we will come back to you with a quote."
      />
    </>
  );
}
