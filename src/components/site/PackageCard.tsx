import { Link } from "@tanstack/react-router";
import { Check, Clock, MapPin } from "lucide-react";
import type { TravelPackage } from "@/data/packages";
import { getDestination } from "@/data/destinations";
import { formatDuration, formatInr } from "@/lib/format";
import { SmartImage } from "./SmartImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<TravelPackage["category"], string> = {
  Adventure: "bg-primary text-primary-foreground",
  Family: "bg-ocean text-ocean-foreground",
  Honeymoon: "bg-sun text-sun-foreground",
  Budget: "bg-background text-foreground",
};

export function PackageCard({ pkg, className }: { pkg: TravelPackage; className?: string }) {
  const destination = getDestination(pkg.destinationSlug);
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card",
        className,
      )}
    >
      <Link to="/packages/$slug" params={{ slug: pkg.slug }} className="relative block" tabIndex={-1} aria-hidden>
        <SmartImage
          src={destination?.image}
          alt=""
          width={1024}
          height={768}
          wrapperClassName="aspect-[16/10]"
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <span className={cn("absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-soft", CATEGORY_STYLES[pkg.category])}>
          {pkg.category}
        </span>
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-foreground backdrop-blur">
          <Clock className="size-3.5 text-primary" /> {formatDuration(pkg.nights)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-primary">
          <MapPin className="size-4" /> {destination?.name}, {destination?.location}
        </p>
        <h3 className="mt-2 text-xl font-bold text-card-foreground">
          <Link to="/packages/$slug" params={{ slug: pkg.slug }} className="hover:text-primary">
            {destination?.name} {pkg.name}
          </Link>
        </h3>
        <ul className="mt-4 space-y-2">
          {pkg.inclusions.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-dashed pt-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Indicative sample price</p>
            <p className="font-display text-2xl font-extrabold text-foreground">
              {formatInr(pkg.priceInr)}
              <span className="ml-1 font-sans text-xs font-medium text-muted-foreground">/ person</span>
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button asChild variant="outline" className="rounded-full font-semibold">
            <Link to="/packages/$slug" params={{ slug: pkg.slug }}>View details</Link>
          </Button>
          <Button asChild className="rounded-full font-bold">
            <Link to="/contact" search={{ package: pkg.slug }}>Enquire</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
