type ClassValue = string | number | null | undefined | false | ClassValue[];

/** Minimal class joiner — no dependency needed for the class patterns used here. */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) {
    if (!value && value !== 0) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }
  return out.join(" ");
}

/** Turns "+263 776 596 851" into a tel: target. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Turns "+263 776 596 851" into a wa.me chat link, digits only. */
export function whatsappHref(phone: string, message?: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${query}`;
}
