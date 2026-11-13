import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeIndianRupee, Compass, HeartHandshake, Quote, Route as RouteIcon, ShieldCheck, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero.webp";
import promoImage from "@/assets/promo-beach.webp";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import { sampleTestimonials } from "@/data/testimonials";
import { SearchBar } from "@/components/site/SearchBar";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { SmartImage } from "@/components/site/SmartImage";
import { PackageCard } from "@/components/site/PackageCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TripNest — Your Next Adventure Starts Here" },
      {
        name: "description",
        content:
          "Discover extraordinary destinations, explore unforgettable experiences and plan your perfect getaway with TripNest.",
      },
      { property: "og:title", content: "TripNest — Your Next Adventure Starts Here" },
      {
        property: "og:description",
        content: "Handpicked destinations and travel packages across India and the world. Discover Places. Create Memories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const POPULAR = ["kerala", "maldives", "paris", "bali", "switzerland"] as const;

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Handpicked experiences",
    text: "Every stay, guide and activity is selected for quality, character and genuine local flavour.",
    tone: "bg-secondary text-primary",
  },
  {
    icon: BadgeIndianRupee,
    title: "Transparent pricing",
    text: "Clear inclusions and exclusions up front, so you always know exactly what your trip covers.",
    tone: "bg-sun-soft text-sun-foreground",
  },
  {
    icon: RouteIcon,
    title: "Tailor-made itineraries",
    text: "Start with a package or a blank page — we shape every journey around your pace and budget.",
    tone: "bg-ocean-soft text-ocean-foreground",
  },
  {
    icon: ShieldCheck,
    title: "Care before & during travel",
    text: "A dedicated trip planner to guide you from first idea to safe return home.",
    tone: "bg-secondary text-primary",
  },
];

function HomePage() {
  const popular = POPULAR.map((slug) => destinations.find((d) => d.slug === slug)!);
  const featured = packages.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-forest">
        <img
          src={heroImage}
          alt="A traveller overlooking a turquoise lagoon surrounded by green mountains at sunset"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full scale-105 animate-[hero-zoom_18s_ease-out_forwards] object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="container-page flex min-h-[100svh] flex-col justify-end pb-10 pt-32 sm:pb-14">
          <div className="max-w-3xl">
            <p className="animate-in fade-in slide-in-from-bottom-2 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-sm font-semibold text-primary-foreground backdrop-blur duration-700">
              <Compass className="size-4 text-sun" /> Discover Places. Create Memories.
            </p>
            <h1 className="animate-in fade-in slide-in-from-bottom-6 mt-6 text-5xl font-extrabold leading-[0.98] text-primary-foreground duration-700 sm:text-6xl lg:text-7xl">
              Your Next Adventure <span className="text-sun">Starts Here.</span>
            </h1>
            <p className="animate-in fade-in slide-in-from-bottom-6 mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/85 duration-1000 sm:text-xl">
              Discover extraordinary destinations, explore unforgettable experiences and plan your perfect getaway with TripNest.
            </p>
            <div className="animate-in fade-in slide-in-from-bottom-6 mt-8 flex flex-wrap gap-3 duration-1000">
              <Button asChild size="lg" className="h-13 rounded-full bg-sun px-8 text-base font-bold text-sun-foreground shadow-soft hover:bg-sun/90">
                <Link to="/destinations">
                  Explore Destinations <ArrowRight className="!size-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-full border-primary-foreground/40 bg-primary-foreground/10 px-8 text-base font-bold text-primary-foreground backdrop-blur hover:bg-primary-foreground/20 hover:text-primary-foreground"
              >
                <Link to="/packages">View packages</Link>
              </Button>
            </div>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-8 mt-12 duration-1000">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="container-page py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Popular destinations"
            title={
              <>
                Places travellers <span className="text-gradient-brand">can't stop</span> talking about
              </>
            }
            description="From misty backwaters to overwater villas — a few of our most-loved escapes."
            action={
              <Button asChild variant="outline" size="lg" className="shrink-0 rounded-full font-bold">
                <Link to="/destinations">
                  All destinations <ArrowRight />
                </Link>
              </Button>
            }
          />
        </Reveal>
        <div className="mt-12 grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[280px]">
          {popular.map((d, i) => (
            <Reveal key={d.slug} delay={i * 80} className={cn(i === 0 && "sm:col-span-2 sm:row-span-2")}>
              <Link
                to="/destinations/$slug"
                params={{ slug: d.slug }}
                className="group relative block h-full overflow-hidden rounded-3xl shadow-soft"
              >
                <SmartImage src={d.image} alt={`${d.name}, ${d.location}`} width={1024} height={768} wrapperClassName="absolute inset-0" className="transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="text-sm font-semibold text-sun">{d.location}</p>
                    <h3 className={cn("font-extrabold text-primary-foreground", i === 0 ? "text-4xl" : "text-2xl")}>{d.name}</h3>
                    {i === 0 && <p className="mt-2 max-w-sm text-sm text-primary-foreground/80">{d.description}</p>}
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur transition-all duration-300 group-hover:bg-sun group-hover:text-sun-foreground">
                    <ArrowRight className="size-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured packages */}
      <section className="relative bg-muted/60 py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Featured packages"
              title="Curated journeys, ready when you are"
              description="Thoughtfully planned itineraries with stays, transfers and experiences built in. Prices are indicative samples."
              action={
                <Button asChild size="lg" className="shrink-0 rounded-full font-bold">
                  <Link to="/packages">
                    Browse all packages <ArrowRight />
                  </Link>
                </Button>
              }
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((pkg, i) => (
              <Reveal key={pkg.slug} delay={i * 100}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="container-page py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Why choose TripNest"
            title="Travel planning that feels effortless"
            description="We combine local know-how with modern tools so you can spend less time planning and more time exploring."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, text, tone }, i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="group h-full rounded-3xl border border-border/70 bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card">
                <span className={cn("grid size-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6", tone)}>
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-card-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="container-page pb-20 sm:pb-28">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-forest shadow-card">
            <SmartImage src={promoImage} alt="A couple relaxing in a hammock on a tropical beach at sunset" width={1600} height={800} wrapperClassName="absolute inset-0 -z-10" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/60 to-transparent" />
            <div className="max-w-xl px-8 py-16 sm:px-14 sm:py-20">
              <span className="inline-flex rounded-full bg-sun px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sun-foreground">Honeymoon season</span>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight text-primary-foreground sm:text-5xl">
                Sunsets, sea breeze &amp; just the two of you.
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/85">
                Explore romantic escapes to the Maldives, Bali, Kashmir and Paris — designed for couples who want every moment to count.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full bg-sun px-7 font-bold text-sun-foreground hover:bg-sun/90">
                  <Link to="/packages" search={{ category: "Honeymoon" }}>
                    Explore honeymoon packages <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-ocean-soft to-background py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Sample testimonials"
              title="Stories from the road"
              description="Illustrative reviews to show how traveller stories will appear here — not from real customers."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {sampleTestimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <figure className="relative flex h-full flex-col rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
                  <span className="absolute right-6 top-6 rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Sample
                  </span>
                  <Quote className="size-9 text-sun" />
                  <blockquote className="mt-4 flex-1 text-base leading-relaxed text-card-foreground">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
                    <span className="grid size-11 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-primary-foreground">{t.initials}</span>
                    <span>
                      <span className="block font-bold text-card-foreground">{t.name}</span>
                      <span className="block text-sm text-muted-foreground">{t.trip}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-page py-20 sm:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-brand px-8 py-14 text-center sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-primary-foreground/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-sun/30 blur-3xl" />
            <HeartHandshake className="mx-auto size-12 text-primary-foreground" />
            <h2 className="relative mt-5 text-3xl font-extrabold text-primary-foreground sm:text-5xl">Let's plan something unforgettable</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-primary-foreground/85">
              Share your dream destination, dates and budget — our planners will help shape the perfect itinerary.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-background px-8 font-bold text-primary hover:bg-background/90">
                <Link to="/contact">Start planning</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/50 bg-transparent px-8 font-bold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/about">Meet TripNest</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
