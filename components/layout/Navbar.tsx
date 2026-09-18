"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { nav, phones } from "@/lib/site";
import { cn, telHref } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the panel on navigation, and never leave the page locked behind it.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,border-color,box-shadow,padding] duration-300",
        scrolled || open
          ? "border-b border-line bg-white py-2.5 shadow-[0_1px_0_rgba(20,23,26,0.04)]"
          : "border-b border-transparent bg-white/85 py-4 backdrop-blur-md",
      )}
    >
      <Container className="flex items-center justify-between gap-4">
        <Logo
          width={184}
          priority
          className={cn(
            "transition-[width] duration-300",
            scrolled ? "w-[124px] sm:w-[148px]" : "w-[134px] sm:w-[184px]",
          )}
        />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                isActive(item.href) ? "text-ink" : "text-slate hover:text-ink",
              )}
            >
              {item.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-orange transition-transform duration-300",
                  isActive(item.href) ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center bg-red px-6 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-dark sm:inline-flex"
          >
            Get a Quote
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center border border-line text-ink transition-colors hover:border-charcoal lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </Container>

      {/* Slide-down mobile panel. Height-animated so it never causes a jump. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className={cn(
          "border-t border-line bg-white lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="py-6">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex min-h-14 items-center border-b border-line-soft text-[0.95rem] font-semibold uppercase tracking-[0.12em]",
                  isActive(item.href) ? "text-red" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="mt-6 flex min-h-13 w-full items-center justify-center bg-red px-6 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white"
          >
            Get a Quote
          </Link>

          <div className="mt-6 space-y-3">
            {phones.map((phone) => (
              <a
                key={phone.number}
                href={telHref(phone.number)}
                className="flex min-h-11 items-center gap-3 text-sm text-slate"
              >
                <Phone size={15} className="text-orange" aria-hidden />
                <span className="tabular-nums">{phone.number}</span>
              </a>
            ))}
          </div>
        </Container>
      </div>
    </header>
  );
}
