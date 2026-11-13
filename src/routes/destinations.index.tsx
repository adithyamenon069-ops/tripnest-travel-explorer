import { useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CalendarDays, Globe2, Search, Users, X } from "lucide-react";
import heroImage from "@/assets/dest-switzerland.webp";
import { destinations, THEMES, type Region, type Theme } from "@/data/destinations";
import { filterDestinations } from "@/lib/filters";
import { PageHero } from "@/components/site/PageHero";
import { DestinationCard } from "@/components/site/DestinationCard";
import { EmptyState } from "@/components/site/EmptyState";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DestinationSearch {
  q?: string | undefined;
  region?: Region | undefined;
  theme?: Theme | undefined;
  date?: string | undefined;
  travellers?: number | undefined;
}

const REGIONS: { value: Region | undefined; label: string }[] = [
  { value: undefined, label: "All" },
  { value: "domestic", label: "Domestic" },
  { value: "international", label: "International" },
];

export const Route = createFileRoute("/destinations/")({
  validateSearch: (search: Record<string, unknown>): DestinationSearch => {
    const q = typeof search["q"] === "string" ? search["q"].slice(0, 60) : undefined;
    const region = search["region"] === "domestic" || search["region"] === "international" ? search["region"] : undefined;
    const theme = THEMES.some((t) => t.value === search["theme"]) ? (search["theme"] as Theme) : undefined;
    const date = typeof search["date"] === "string" && /^\d{4}-\d{2}-\d{2}$/.test(search["date"]) ? search["date"] : undefined;
    const t = Number(search["travellers"]);
    const travellers = Number.isInteger(t) && t >= 1 && t <= 20 ? t : undefined;
    return { q: q || undefined, region, theme, date, travellers };
  },
  head: () => ({
    meta: [
      { title: "Destinations — Kerala, Bali, Paris & more | TripNest" },
      {
        name: "description",
        content: "Explore TripNest destinations across India and the world — Kerala, Goa, Manali, Kashmir, Bali, Dubai, Paris, Switzerland and the Maldives.",
      },
      { property: "og:title", content: "Explore Destinations | TripNest" },
      { property: "og:description", content: "Search and filter domestic and international destinations handpicked by TripNest." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/destinations/" });
  const results = useMemo(() => filterDestinations(destinations, search), [search]);

  const update = (patch: Partial<DestinationSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true, resetScroll: false });

  const hasFilters = Boolean(search.q || search.region || search.theme);
  const dateLabel = search.date
    ? new Date(`${search.date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : null;

  return (
    <>
      <PageHero
        image={heroImage}
        eyebrow="Destinations"
        title="Find the place that moves you"
        description="Nine handpicked destinations across India and the world — from Himalayan valleys to Indian Ocean lagoons."
      />

      <section className="container-page relative -mt-10 pb-24">
        <div className="rounded-3xl border border-border/70 bg-background p-4 shadow-card sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="flex flex-1 items-center gap-3 rounded-2xl border border-input bg-muted/40 px-4 transition-colors focus-within:border-primary focus-within:bg-background">
              <Search className="size-5 text-muted-foreground" />
              <span className="sr-only">Search destinations</span>
              <input
                type="search"
                value={search.q ?? ""}
                onChange={(e) => update({ q: e.target.value || undefined })}
                placeholder="Search by name, region or experience…"
                maxLength={60}
                className="h-12 w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {search.q && (
                <button type="button" onClick={() => update({ q: undefined })} aria-label="Clear search" className="text-muted-foreground hover:text-foreground">
                  <X className="size-4" />
                </button>
              )}
            </label>
            <div role="group" aria-label="Region" className="flex rounded-2xl bg-muted p-1">
              {REGIONS.map((r) => {
                const active = search.region === r.value;
                return (
                  <button
                    key={r.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => update({ region: r.value })}
                    className={cn(
                      "flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition-all sm:px-5",
                      active ? "bg-background text-primary shadow-soft" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div role="group" aria-label="Experience" className="mt-4 flex flex-wrap gap-2">
            {THEMES.map((t) => {
              const active = search.theme === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ theme: active ? undefined : t.value })}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                    active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground/80 hover:border-primary/40 hover:text-primary",
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {(dateLabel || search.travellers) && (
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-sun-soft px-5 py-4 text-sm text-sun-foreground">
            <span className="font-bold">Your trip:</span>
            {dateLabel && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" /> {dateLabel}
              </span>
            )}
            {search.travellers && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-4" /> {search.travellers} {search.travellers === 1 ? "traveller" : "travellers"}
              </span>
            )}
            <Link to="/contact" className="ml-auto font-bold underline-offset-4 hover:underline">
              Get a tailored quote →
            </Link>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Showing <span className="font-bold text-foreground">{results.length}</span> of {destinations.length} destinations
          </p>
          {hasFilters && (
            <button type="button" onClick={() => update({ q: undefined, region: undefined, theme: undefined })} className="text-sm font-bold text-primary hover:underline">
              Clear all filters
            </button>
          )}
        </div>

        <div className="mt-6">
          {results.length === 0 ? (
            <EmptyState
              title="No destinations match your search"
              description="Try a different keyword or remove a filter — or tell us where you'd like to go and we'll help plan it."
              action={
                <div className="flex flex-wrap justify-center gap-2">
                  <Button className="rounded-full font-bold" onClick={() => update({ q: undefined, region: undefined, theme: undefined })}>
                    <Globe2 /> Show all destinations
                  </Button>
                  <Button asChild variant="outline" className="rounded-full font-bold">
                    <Link to="/contact">Ask a trip planner</Link>
                  </Button>
                </div>
              }
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((d, i) => (
                <div key={d.slug} className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500" style={{ animationDelay: `${i * 60}ms` }}>
                  <DestinationCard destination={d} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
