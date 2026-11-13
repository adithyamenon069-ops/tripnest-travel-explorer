import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className, action }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-secondary-foreground">
          <span className="size-1.5 rounded-full bg-sun" />
          {eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
        {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>}
      </div>
      {action}
    </div>
  );
}
