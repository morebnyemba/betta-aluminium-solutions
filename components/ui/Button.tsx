import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "light" | "outlineLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  // 48px / 56px tall — comfortably above the 44px touch-target minimum.
  md: "min-h-12 px-6 py-3.5",
  lg: "min-h-14 px-8 py-4",
};

/**
 * Brand orange (#FD7A00) only reaches 2.6:1 on white, so it is never used as a
 * text or button-fill colour. The red (#BE0101) carries brand-weight actions at
 * 6.6:1, and orange appears as the hover edge and accent rules.
 */
const variants: Record<Variant, string> = {
  primary: "bg-red text-white hover:bg-red-dark focus-visible:bg-red-dark",
  dark: "bg-charcoal text-white hover:bg-ink focus-visible:bg-ink",
  outline:
    "border border-line bg-white text-ink hover:border-charcoal hover:bg-shell focus-visible:border-charcoal focus-visible:bg-shell",
  light: "bg-white text-ink hover:bg-shell-deep focus-visible:bg-shell-deep",
  outlineLight:
    "border border-white/35 text-white hover:border-white hover:bg-white/10 focus-visible:border-white focus-visible:bg-white/10",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function ButtonEl({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
