import type { Destination, Region, Theme } from "@/data/destinations";
import type { PackageCategory, TravelPackage } from "@/data/packages";

export interface DestinationFilter {
  q?: string | undefined;
  region?: Region | undefined;
  theme?: Theme | undefined;
}

export function filterDestinations(list: Destination[], filter: DestinationFilter): Destination[] {
  const q = filter.q?.trim().toLowerCase() ?? "";
  return list.filter((d) => {
    if (filter.region && d.region !== filter.region) return false;
    if (filter.theme && !d.themes.includes(filter.theme)) return false;
    if (!q) return true;
    const haystack = [d.name, d.location, d.tagline, d.description, ...d.themes, ...d.highlights]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export type PackageSort = "recommended" | "price-asc" | "price-desc" | "duration";

export interface PackageFilter {
  category?: PackageCategory | undefined;
  destination?: string | undefined;
  sort?: PackageSort | undefined;
}

export function filterPackages(list: TravelPackage[], filter: PackageFilter): TravelPackage[] {
  const result = list.filter((p) => {
    if (filter.category && p.category !== filter.category) return false;
    if (filter.destination && p.destinationSlug !== filter.destination) return false;
    return true;
  });
  switch (filter.sort) {
    case "price-asc":
      return [...result].sort((a, b) => a.priceInr - b.priceInr);
    case "price-desc":
      return [...result].sort((a, b) => b.priceInr - a.priceInr);
    case "duration":
      return [...result].sort((a, b) => a.nights - b.nights);
    default:
      return result;
  }
}
