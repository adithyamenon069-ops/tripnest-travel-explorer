import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Light variant for dark/transparent backgrounds. */
  light?: boolean;
}

export function Logo({ className, light }: LogoProps) {
  return (
    <Link to="/" aria-label="TripNest home" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative grid size-10 place-items-center rounded-2xl bg-gradient-brand shadow-glow transition-transform duration-300 group-hover:-rotate-6">
        <svg viewBox="0 0 24 24" className="size-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 12 3.5 6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z" />
          <path d="M8.5 10.5c1.2 1.4 5.8 1.4 7 0" />
          <circle cx="12" cy="8.5" r="1.3" fill="currentColor" stroke="none" />
        </svg>
        <span className="absolute -right-1 -top-1 size-3 rounded-full bg-sun ring-2 ring-background" />
      </span>
      <span className={cn("font-display text-2xl font-extrabold tracking-tight", light ? "text-primary-foreground" : "text-foreground")}>
        Trip<span className={light ? "text-sun" : "text-primary"}>Nest</span>
      </span>
    </Link>
  );
}
