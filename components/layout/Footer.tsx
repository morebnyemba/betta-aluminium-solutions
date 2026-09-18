import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { email, nav, phones, services, site } from "@/lib/site";
import { telHref, whatsappHref } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white/70">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo width={230} className="w-[190px] sm:w-[230px]" />
          <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-orange">
            {site.tagline}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            Aluminium windows, doors, partitions, shopfronts and custom
            fabrication for residential and commercial spaces.
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white">
            Services
          </h2>
          <span aria-hidden className="rule-brand mt-4 block" />
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex min-h-11 items-center text-white/65 transition-colors hover:text-white sm:min-h-9"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white">
            Contact
          </h2>
          <span aria-hidden className="rule-brand mt-4 block" />
          <ul className="mt-5 space-y-3 text-sm">
            {phones.map((phone) => (
              <li key={phone.number}>
                <a
                  href={telHref(phone.number)}
                  className="inline-flex min-h-11 items-center gap-3 text-white/65 transition-colors hover:text-white sm:min-h-9"
                >
                  <Phone size={15} className="shrink-0 text-orange" aria-hidden />
                  <span className="tabular-nums">{phone.number}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={whatsappHref(phones[0].number, "Hi Betta Aluminium, I'd like a quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-3 text-white/65 transition-colors hover:text-white sm:min-h-9"
              >
                <MessageCircle size={15} className="shrink-0 text-orange" aria-hidden />
                <span>WhatsApp</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${email}`}
                className="inline-flex min-h-11 items-center gap-3 break-all text-white/65 transition-colors hover:text-white sm:min-h-9"
              >
                <Mail size={15} className="shrink-0 text-orange" aria-hidden />
                <span>{email}</span>
              </a>
            </li>
            <li className="flex min-h-11 items-center gap-3 text-white/65 sm:min-h-9">
              <MapPin size={15} className="shrink-0 text-orange" aria-hidden />
              <span>{site.location}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            &copy; {year} {site.name}
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white sm:min-h-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </footer>
  );
}
