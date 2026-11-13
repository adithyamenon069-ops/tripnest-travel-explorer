import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock, Info, MapPin, Send, X } from "lucide-react";
import { getDestination } from "@/data/destinations";
import { getPackage, packages as allPackages } from "@/data/packages";
import { formatDuration, formatInr } from "@/lib/format";
import { PackageCard } from "@/components/site/PackageCard";
import { EmptyState } from "@/components/site/EmptyState";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/packages/$slug")({
  loader: ({ params }) => {
    const pkg = getPackage(params.slug);
    const destination = pkg && getDestination(pkg.destinationSlug);
    if (!pkg || !destination) throw notFound();
    const related = allPackages.filter((p) => p.slug !== pkg.slug && (p.category === pkg.category || p.destinationSlug === pkg.destinationSlug)).slice(0, 3);
    return { pkg, destination, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Package not found | TripNest" }, { name: "robots", content: "noindex" }] };
    const { pkg, destination } = loaderData;
    const title = `${destination.name} ${pkg.name} — ${formatDuration(pkg.nights)} ${pkg.category} package | TripNest`;
    return {
      meta: [
        { title },
        { name: "description", content: pkg.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: pkg.summary },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: PackageNotFound,
  component: PackageDetail,
});

function PackageNotFound() {
  return (
    <div className="bg-forest pt-32">
      <div className="container-page pb-24">
        <div className="rounded-3xl bg-background p-4">
          <EmptyState
            title="We couldn't find that package"
            description="It may no longer be available. Browse our current journeys instead."
            action={
              <Button asChild className="rounded-full font-bold">
                <Link to="/packages">View all packages</Link>
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}

function PackageDetail() {
  const { pkg, destination, related } = Route.useLoaderData();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-forest">
        <img src={destination.image} alt={`${destination.name}, ${destination.location}`} width={1024} height={768} fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="container-page flex min-h-[64svh] flex-col justify-end pb-16 pt-32">
          <Link to="/packages" className="mb-auto inline-flex w-fit items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-primary-foreground/25">
            <ArrowLeft className="size-4" /> All packages
          </Link>
          <div className="mt-16 flex flex-wrap gap-2">
            <span className="rounded-full bg-sun px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sun-foreground">{pkg.category}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3.5 py-1 text-xs font-bold text-primary-foreground backdrop-blur">
              <Clock className="size-3.5" /> {formatDuration(pkg.nights)}
            </span>
          </div>
          <h1 className="animate-in fade-in slide-in-from-bottom-4 mt-4 max-w-3xl text-4xl font-extrabold text-primary-foreground duration-700 sm:text-6xl">
            {destination.name} {pkg.name}
          </h1>
          <p className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-primary-foreground/85">
            <MapPin className="size-5 text-sun" /> {destination.location}
          </p>
        </div>
      </section>

      <section className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <Reveal>
            <h2 className="text-3xl font-extrabold text-foreground">Trip overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{pkg.summary}</p>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-2xl font-extrabold text-foreground">Day-by-day itinerary</h2>
            <ol className="relative mt-8 space-y-6 border-l-2 border-dashed border-primary/30 pl-8">
              {pkg.itinerary.map((day) => (
                <li key={day.day} className="relative">
                  <span className="absolute -left-[3.05rem] grid size-10 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground ring-4 ring-background">
                    {day.day}
                  </span>
                  <div className="rounded-2xl border border-border/70 bg-card p-5 transition-shadow hover:shadow-soft">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Day {day.day}</p>
                    <h3 className="mt-1 text-lg font-bold text-card-foreground">{day.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{day.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="mt-12 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl bg-secondary p-6">
              <h3 className="text-lg font-bold text-secondary-foreground">What's included</h3>
              <ul className="mt-4 space-y-3">
                {pkg.inclusions.map((i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-sun-soft p-6">
              <h3 className="text-lg font-bold text-sun-foreground">Not included</h3>
              <ul className="mt-4 space-y-3">
                {pkg.exclusions.map((i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-foreground">
                    <X className="mt-0.5 size-4 shrink-0 text-sun-foreground" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-border/70 bg-card p-7 shadow-card">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Indicative sample price</p>
            <p className="mt-1 font-display text-4xl font-extrabold text-foreground">{formatInr(pkg.priceInr)}</p>
            <p className="text-sm text-muted-foreground">per person · {formatDuration(pkg.nights)}</p>
            <div className="mt-5 flex gap-2.5 rounded-2xl bg-ocean-soft p-4 text-xs leading-relaxed text-ocean-foreground">
              <Info className="size-4 shrink-0" />
              This is a sample price for illustration, not a live quote. Sending an enquiry does not book or reserve this trip.
            </div>
            <Button asChild size="lg" className="mt-6 h-12 w-full rounded-full text-base font-bold shadow-glow">
              <Link to="/contact" search={{ package: pkg.slug }}>
                <Send /> Send booking enquiry
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="mt-3 w-full rounded-full font-bold">
              <Link to="/destinations/$slug" params={{ slug: destination.slug }}>About {destination.name}</Link>
            </Button>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="bg-muted/60 py-16 sm:py-20">
          <div className="container-page">
            <h2 className="text-3xl font-extrabold text-foreground">You might also like</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
