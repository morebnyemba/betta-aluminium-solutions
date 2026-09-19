import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AboutPreview } from "@/components/home/AboutPreview";
import { WhyBetta } from "@/components/home/WhyBetta";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CtaBand } from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <FeaturedProjects />
      <AboutPreview />
      <WhyBetta />
      <HowItWorks />
      <CtaBand />
    </>
  );
}
