import { MessageCircle } from "lucide-react";
import { phones } from "@/lib/site";
import { whatsappHref } from "@/lib/utils";

/**
 * Desktop/tablet equivalent of the WhatsApp shortcut in MobileActionBar
 * (which is `lg:hidden`) — a persistent one-click path to the channel this
 * trade's customers actually use, without waiting for someone to scroll to
 * the footer or open Contact.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref(phones[0].number, "Hi Betta Aluminium, I'd like a quote.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center rounded-full bg-charcoal text-white shadow-[0_8px_24px_rgba(20,23,26,0.35)] transition-colors hover:bg-ink lg:flex"
    >
      <MessageCircle size={24} aria-hidden />
    </a>
  );
}
