import { MessageCircle, Phone } from "lucide-react";
import { phones } from "@/lib/site";
import { telHref, whatsappHref } from "@/lib/utils";

/**
 * Persistent bottom bar on phones only. The desktop/tablet nav always shows a
 * "Get a Quote" button, but on mobile that button is hidden inside the
 * collapsed menu — this keeps a call and WhatsApp path one tap away while
 * browsing, which is where most enquiries for a trade business start.
 */
export function MobileActionBar() {
  const primary = phones[0];

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-white shadow-[0_-4px_16px_rgba(20,23,26,0.1)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={telHref(primary.number)}
        className="flex min-h-14 items-center justify-center gap-2 bg-red text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors active:bg-red-dark"
      >
        <Phone size={17} aria-hidden />
        Call Now
      </a>
      <a
        href={whatsappHref(primary.number, "Hi Betta Aluminium, I'd like a quote.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 items-center justify-center gap-2 border-l border-white/10 bg-charcoal text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors active:bg-ink"
      >
        <MessageCircle size={17} aria-hidden />
        WhatsApp
      </a>
    </div>
  );
}
