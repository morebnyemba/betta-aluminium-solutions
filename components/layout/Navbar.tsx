"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { email, nav, phones } from "@/lib/site";
import { cn, telHref, whatsappHref } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close the panel on navigation, and never leave the page locked behind it.
  // Adjusted during render (not an effect) so the reset lands in the same
  // pass as the pathname change instead of costing an extra render.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll, close on Escape, and — since this is a real off-canvas
  // dialog now, not just an expanding panel — trap Tab inside it and hand
  // focus back to the toggle button when it closes.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;

    const drawer = drawerRef.current;
    const focusable = () =>
      Array.from(
        drawer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
    focusable()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
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
                isActive(item.href)
                  ? "text-ink"
                  : "text-slate hover:text-ink focus-visible:text-ink",
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

        <div className="flex items-center gap-5">
          <a
            href={telHref(phones[0].number)}
            className="hidden items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-slate transition-colors hover:text-ink focus-visible:text-ink lg:inline-flex"
          >
            <Phone size={15} className="text-orange" aria-hidden />
            <span className="tabular-nums">{phones[0].number}</span>
          </a>

          <Link
            href="/contact"
            className="hidden min-h-11 items-center bg-red px-6 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white transition-[background-color,transform,box-shadow] hover:bg-red-dark focus-visible:bg-red-dark motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_10px_24px_-8px_rgba(20,23,26,0.35)] motion-safe:focus-visible:-translate-y-0.5 motion-safe:focus-visible:shadow-[0_10px_24px_-8px_rgba(20,23,26,0.35)] lg:inline-flex"
          >
            Get a Quote
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center border border-line text-ink transition-colors hover:border-charcoal focus-visible:border-charcoal lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </Container>

      {/* Backdrop */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-ink/60 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Off-canvas drawer, slides in from the right. Rendered at rest
          (never `hidden`) so the transform can animate; `inert` when closed
          keeps it out of the tab order and off-screen for assistive tech
          without needing a manual focus trap teardown. */}
      <div
        id="mobile-nav"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-white shadow-[-24px_0_48px_-24px_rgba(20,23,26,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Roofline accent, echoing the logo mark. Decorative only. */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-24 w-24 overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 h-16 w-16 rotate-45 bg-orange/15" />
        </div>

        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <Logo width={140} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex size-10 items-center justify-center border border-line text-ink transition-colors hover:border-charcoal focus-visible:border-charcoal"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav aria-label="Mobile" className="flex flex-col px-6 py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative flex min-h-16 items-center border-b border-line-soft pl-4 text-[1rem] font-semibold uppercase tracking-[0.1em] transition-colors",
                  isActive(item.href) ? "text-red" : "text-ink",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-y-3 left-0 w-[3px] rounded-full bg-gradient-to-b from-red to-orange transition-opacity",
                    isActive(item.href) ? "opacity-100" : "opacity-0",
                  )}
                />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-line px-6 py-6">
          <Link
            href="/contact"
            className="flex min-h-13 w-full items-center justify-center bg-red px-6 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white transition-[background-color,transform,box-shadow] hover:bg-red-dark focus-visible:bg-red-dark motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_10px_24px_-8px_rgba(20,23,26,0.35)] motion-safe:focus-visible:-translate-y-0.5 motion-safe:focus-visible:shadow-[0_10px_24px_-8px_rgba(20,23,26,0.35)]"
          >
            Get a Quote
          </Link>

          <div className="mt-6 space-y-1">
            {phones.map((phone) => (
              <a
                key={phone.number}
                href={telHref(phone.number)}
                className="flex min-h-11 items-center gap-3 text-sm text-slate transition-colors hover:text-ink focus-visible:text-ink"
              >
                <Phone size={15} className="shrink-0 text-orange" aria-hidden />
                <span className="tabular-nums">{phone.number}</span>
              </a>
            ))}
            <a
              href={whatsappHref(phones[0].number, "Hi Betta Aluminium, I'd like a quote.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-3 text-sm text-slate transition-colors hover:text-ink focus-visible:text-ink"
            >
              <MessageCircle size={15} className="shrink-0 text-orange" aria-hidden />
              <span>WhatsApp</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex min-h-11 items-center gap-3 break-all text-sm text-slate transition-colors hover:text-ink focus-visible:text-ink"
            >
              <Mail size={15} className="shrink-0 text-orange" aria-hidden />
              <span>{email}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
