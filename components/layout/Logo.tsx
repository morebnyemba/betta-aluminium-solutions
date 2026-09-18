import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * The supplied artwork (1774 × 887) is used unmodified — not recoloured,
 * redrawn, cropped or boxed. Width is set per placement and the height follows
 * the real aspect ratio, so proportions are always preserved.
 */
export function Logo({
  width,
  className,
  priority,
  asLink = true,
}: {
  width: number;
  className?: string;
  priority?: boolean;
  asLink?: boolean;
}) {
  const image = (
    <Image
      src="/images/betta-logo.png"
      alt={`${site.name} — ${site.tagline}`}
      width={1774}
      height={887}
      priority={priority}
      sizes={`${width}px`}
      style={{ width, height: "auto" }}
      className={cn("h-auto max-w-full", className)}
    />
  );

  if (!asLink) return image;

  return (
    <Link href="/" aria-label={`${site.name} — home`} className="inline-flex shrink-0">
      {image}
    </Link>
  );
}
