import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarRange, Check, MapPin, Users } from "lucide-react";
import { getDestination } from "@/data/destinations";
import { packagesForDestination } from "@/data/packages";
import { PackageCard } from "@/components/site/PackageCard";
import { EmptyState } from "@/components/site/EmptyState";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const destination = getDestination(params.slug);
    if (!destination) throw notFound();
    return { destination, packages: packagesForDestination(destination.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Destination not found | TripNest" }, { name: "robots", content: "noindex" }] };
    const d = loaderData.destination;
    const title = `${d.name}, ${d.location} — ${d.tagline} | TripNest`;
    return {
      meta: [
        { title },
        { name: "description", content: d.description },
        { property: "og:title", content: title },
        { property: "og:description", content: d.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: DestinationNotFound,
  component: DestinationDetail,
});

function DestinationNotFound() {
  return (
    <div className="bg-forest pt-32">
      <div className="container-page pb-24">
        <div className="rounded-3xl bg-background p-4">
          <EmptyState
            title="We couldn't find that destination"
            description="It may have moved or isn't on our list yet."
            action={
              <Button asChild className="rounded-full font-bold">
                <Link to="/destinations">Browse destinations</Link>
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}

function DestinationDetail() {
  const { destination: d, packages } = Route.useLoaderData();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-forest">
        <img src={d.image} alt={`${d.name}, ${d.location}`} width={1024} height={768} fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="container-page flex min-h-[70svh] flex-col justify-end pb-16 pt-32">
          <Link to="/destinations" className="mb-auto inline-flex w-fit items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-primary-foreground/25">
            <ArrowLeft className="size-4" /> All destinations
          </Link>
          <p className="mt-16 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-sun">
            <MapPin className="size-4" /> {d.location} · {d.region === "domestic" ? "Domestic" : "International"}
          </p>
          <h1 className="animate-in fade-in slide-in-from-bottom-4 mt-3 text-5xl font-extrabold text-primary-foreground duration-700 sm:text-7xl">{d.name}</h1>
          <p className="mt-3 text-xl font-semibold text-primary-foreground/85">{d.tagline}</p>
        </div>
      </section>

      <section className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">About {d.name}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{d.overview}</p>
          <h3 className="mt-10 text-xl font-bold text-foreground">Experience highlights</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {d.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 font-medium text-card-foreground">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                  <Check className="size-4" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <aside className="sticky top-28 space-y-5 rounded-3xl bg-muted/70 p-7">
            <div className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ocean-soft text-ocean-foreground">
                <CalendarRange className="size-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Best time to visit</p>
                <p className="mt-1 font-semibold text-foreground">{d.bestTime}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sun-soft text-sun-foreground">
                <Users className="size-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ideal for</p>
                <p className="mt-1 font-semibold text-foreground">{d.idealFor.join(" · ")}</p>
              </div>
            </div>
            <Button asChild size="lg" className="w-full rounded-full font-bold">
              <Link to="/contact" search={{ destination: d.slug }}>Plan a trip to {d.name}</Link>
            </Button>
          </aside>
        </Reveal>
      </section>

      <section className="bg-muted/60 py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">{d.name} packages</h2>
          <p className="mt-3 text-muted-foreground">Indicative sample prices per person. Final quotes depend on dates, hotels and group size.</p>
          <div className="mt-10">
            {packages.length === 0 ? (
              <EmptyState
                title={`No ready-made ${d.name} packages yet`}
                description="We can still design a custom itinerary around your dates and budget."
                action={
                  <Button asChild className="rounded-full font-bold">
                    <Link to="/contact" search={{ destination: d.slug }}>Request a custom plan</Link>
                  </Button>
                }
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {packages.map((p) => (
                  <PackageCard key={p.slug} pkg={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
