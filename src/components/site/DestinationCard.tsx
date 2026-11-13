import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Destination } from "@/data/destinations";
import { SmartImage } from "./SmartImage";
import { cn } from "@/lib/utils";

export function DestinationCard({ destination, className }: { destination: Destination; className?: string }) {
  const d = destination;
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card",
        className,
      )}
    >
      <div className="relative">
        <SmartImage
          src={d.image}
          alt={`${d.name}, ${d.location}`}
          width={1024}
          height={768}
          wrapperClassName="aspect-[4/3]"
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur",
            d.region === "domestic" ? "bg-sun/90 text-sun-foreground" : "bg-ocean/90 text-ocean-foreground",
          )}
        >
          {d.region === "domestic" ? "Domestic" : "International"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-primary">
          <MapPin className="size-4" /> {d.location}
        </p>
        <h3 className="mt-2 text-2xl font-bold text-card-foreground">{d.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
        <Link
          to="/destinations/$slug"
          params={{ slug: d.slug }}
          className="mt-5 inline-flex items-center justify-between rounded-full bg-secondary py-2 pl-5 pr-2 text-sm font-bold text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
          aria-label={`Explore ${d.name}`}
        >
          Explore
          <span className="grid size-8 place-items-center rounded-full bg-background text-primary transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
      </div>
    </article>
  );
}
