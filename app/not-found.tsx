import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container className="max-w-2xl">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-6 text-[2rem] leading-tight sm:text-4xl">
          We couldn&rsquo;t find that page
        </h1>
        <p className="mt-5 leading-relaxed text-slate">
          The page you were looking for has moved or does not exist. Head back to
          the homepage, or get in touch and we will point you the right way.
        </p>
        <div className="mt-9 flex flex-col gap-3 xs:flex-row">
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
