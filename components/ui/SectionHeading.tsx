import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone} className={cn("mb-5", align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag
        className={cn(
          "text-[1.9rem] leading-[1.1] sm:text-4xl lg:text-[2.9rem]",
          tone === "light" && "text-white",
        )}
      >
        {title}
      </Tag>
      {lead ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-[1.05rem]",
            tone === "light" ? "text-white/80" : "text-slate",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
