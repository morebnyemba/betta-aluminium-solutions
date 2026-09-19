import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { email, phones, site } from "@/lib/site";
import { telHref, whatsappHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Betta Aluminium Solutions in Harare, Zimbabwe for aluminium windows, doors, partitions, shopfronts and custom fabrication. Request a quote for your project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something better"
        lead="Send us the details of your project and we will come back to you with a quote."
      />

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ink">
              Contact details
            </h2>
            <span aria-hidden className="rule-brand mt-4 block" />

            <ul className="mt-8 divide-y divide-line border-y border-line">
              {phones.map((phone) => (
                <li key={phone.number}>
                  <a
                    href={telHref(phone.number)}
                    className="group flex min-h-16 items-center gap-4 py-4 transition-colors hover:bg-shell focus-visible:bg-shell"
                  >
                    <Phone size={18} className="shrink-0 text-red" aria-hidden />
                    <span>
                      <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-mute">
                        {phone.label}
                      </span>
                      <span className="mt-0.5 block text-[1.05rem] font-semibold text-ink tabular-nums">
                        {phone.number}
                      </span>
                    </span>
                  </a>
                </li>
              ))}

              <li>
                <a
                  href={whatsappHref(phones[0].number, "Hi Betta Aluminium, I'd like a quote.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center gap-4 py-4 transition-colors hover:bg-shell focus-visible:bg-shell"
                >
                  <MessageCircle size={18} className="shrink-0 text-red" aria-hidden />
                  <span>
                    <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-mute">
                      WhatsApp
                    </span>
                    <span className="mt-0.5 block text-[1.05rem] font-semibold text-ink tabular-nums">
                      {phones[0].number}
                    </span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${email}`}
                  className="group flex min-h-16 items-center gap-4 py-4 transition-colors hover:bg-shell focus-visible:bg-shell"
                >
                  <Mail size={18} className="shrink-0 text-red" aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-mute">
                      Email
                    </span>
                    <span className="mt-0.5 block break-all text-[1.05rem] font-semibold text-ink">
                      {email}
                    </span>
                  </span>
                </a>
              </li>

              <li className="flex min-h-16 items-center gap-4 py-4">
                <MapPin size={18} className="shrink-0 text-red" aria-hidden />
                <span>
                  <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-mute">
                    Location
                  </span>
                  <span className="mt-0.5 block text-[1.05rem] font-semibold text-ink">
                    {site.location}
                  </span>
                </span>
              </li>
            </ul>

            <div className="mt-10 border-l-2 border-orange bg-shell p-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink">
                {site.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Windows, doors, partitions, shopfronts and custom aluminium
                fabrication for residential and commercial spaces.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="min-h-[36rem] border border-line bg-shell" aria-hidden />
              }
            >
              <QuoteForm />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
}
