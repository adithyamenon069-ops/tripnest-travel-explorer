import { useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Info, SlidersHorizontal } from "lucide-react";
import heroImage from "@/assets/dest-maldives.webp";
import { destinations } from "@/data/destinations";
import { PACKAGE_CATEGORIES, packages, type PackageCategory } from "@/data/packages";
import { filterPackages, type PackageSort } from "@/lib/filters";
import { PageHero } from "@/components/site/PageHero";
import { PackageCard } from "@/components/site/PackageCard";
import { EmptyState } from "@/components/site/EmptyState";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PackageSearch {
  category?: PackageCategory | undefined;
  destination?: string | undefined;
  sort?: PackageSort | undefined;
}

const SORTS: { value: PackageSort; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "duration", label: "Shortest trips first" },
];

export const Route = createFileRoute("/packages/")({
  validateSearch: (search: Record<string, unknown>): PackageSearch => ({
    category: PACKAGE_CATEGORIES.includes(search["category"] as PackageCategory) ? (search["category"] as PackageCategory) : undefined,
    destination: destinations.some((d) => d.slug === search["destination"]) ? (search["destination"] as string) : undefined,
    sort: SORTS.some((s) => s.value === search["sort"]) && search["sort"] !== "recommended" ? (search["sort"] as PackageSort) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Travel Packages — Adventure, Family, Honeymoon & Budget | TripNest" },
      {
        name: "description",
        content: "Browse TripNest travel packages with itineraries, inclusions and indicative sample prices in INR for Adventure, Family, Honeymoon and Budget trips.",
      },
      { property: "og:title", content: "Travel Packages | TripNest" },
      { property: "og:description", content: "Curated Adventure, Family, Honeymoon and Budget packages across India and the world." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/packages/" });
  const results = useMemo(() => filterPackages(packages, search), [search]);
  const update = (patch: Partial<PackageSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true, resetScroll: false });

  const counts = useMemo(() => {
    const base = filterPackages(packages, { destination: search.destination });
    return Object.fromEntries(PACKAGE_CATEGORIES.map((c) => [c, base.filter((p) => p.category === c).length])) as Record<PackageCategory, number>;
  }, [search.destination]);
  const totalForDestination = Object.values(counts).reduce((a, b) => a + b, 0);

  const tabs: { value: PackageCategory | undefined; label: string; count: number }[] = [
    { value: undefined, label: "All packages", count: totalForDestination },
    ...PACKAGE_CATEGORIES.map((c) => ({ value: c, label: c, count: counts[c] })),
  ];

  const selectClass =
    "h-11 cursor-pointer rounded-full border border-input bg-background px-4 text-sm font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";

  return (
    <>
      <PageHero
        image={heroImage}
        eyebrow="Travel packages"
        title="Journeys designed around you"
        description="Choose a travel style, compare itineraries and send us an enquiry — we'll tailor the details to your dates."
      />

      <section className="container-page relative -mt-10 pb-24">
        <div className="rounded-3xl border border-border/70 bg-background p-4 shadow-card sm:p-6">
          <div role="tablist" aria-label="Package category" className="flex gap-2 overflow-x-auto pb-1">
            {tabs.map((t) => {
              const active = search.category === t.value;
              return (
                <button
                  key={t.label}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => update({ category: t.value })}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all",
                    active ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted text-foreground/75 hover:bg-secondary hover:text-primary",
                  )}
                >
                  {t.label}
                  <span className={cn("rounded-full px-2 py-0.5 text-xs", active ? "bg-primary-foreground/20" : "bg-background")}>{t.count}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <SlidersHorizontal className="size-4" /> Refine
            </span>
            <label className="sr-only" htmlFor="pkg-destination">Destination</label>
            <select
              id="pkg-destination"
              value={search.destination ?? ""}
              onChange={(e) => update({ destination: e.target.value || undefined })}
              className={selectClass}
            >
              <option value="">All destinations</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="pkg-sort">Sort by</label>
            <select
              id="pkg-sort"
              value={search.sort ?? "recommended"}
              onChange={(e) => update({ sort: e.target.value === "recommended" ? undefined : (e.target.value as PackageSort) })}
              className={selectClass}
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-ocean-soft px-5 py-4 text-sm text-ocean-foreground">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>
            <strong>All prices are indicative sample prices</strong> per person in INR, shown for illustration. Actual costs vary by travel dates,
            hotel availability and group size. Sending an enquiry does not create a booking.
          </p>
        </div>

        <p className="mt-10 text-sm text-muted-foreground" aria-live="polite">
          <span className="font-bold text-foreground">{results.length}</span> {results.length === 1 ? "package" : "packages"} found
        </p>

        <div className="mt-6">
          {results.length === 0 ? (
            <EmptyState
              title="No packages in this combination yet"
              description="Try another category or destination — or ask us to build a custom itinerary."
              action={
                <div className="flex flex-wrap justify-center gap-2">
                  <Button className="rounded-full font-bold" onClick={() => update({ category: undefined, destination: undefined })}>
                    Show all packages
                  </Button>
                  <Button asChild variant="outline" className="rounded-full font-bold">
                    <Link to="/contact" search={{ destination: search.destination }}>Request a custom trip</Link>
                  </Button>
                </div>
              }
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((p, i) => (
                <div key={p.slug} className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500" style={{ animationDelay: `${i * 60}ms` }}>
                  <PackageCard pkg={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
