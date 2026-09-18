import { cn } from "@/lib/utils";

/** Small uppercase label with the logo's two-tone rule beside it. */
export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em]",
        tone === "dark" ? "text-slate" : "text-white/75",
        className,
      )}
    >
      <span aria-hidden className="rule-brand w-8 shrink-0" />
      {children}
    </p>
  );
}
