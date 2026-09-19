import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Every photographic slot on the site goes through this component.
 *
 * The placeholder artwork currently shipped is SVG, which the Next image
 * optimizer will not process. Rather than turning on `dangerouslyAllowSVG`
 * globally, SVG sources are passed through unoptimized. Swap a real `.jpg`,
 * `.webp` or `.avif` in at the same path and optimization turns itself on with
 * no other change.
 */
export function ArchImage({
  src,
  alt,
  sizes,
  priority,
  className,
  imgClassName,
  ratio = "aspect-[4/3]",
  hover = true,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  hover?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-shell-deep", ratio, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        unoptimized={src.endsWith(".svg")}
        className={cn(
          "object-cover",
          hover &&
            "transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-visible:scale-[1.04]",
          imgClassName,
        )}
      />
    </div>
  );
}
