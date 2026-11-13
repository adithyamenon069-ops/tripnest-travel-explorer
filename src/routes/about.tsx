import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BedDouble,
  Building2,
  Car,
  Compass,
  Eye,
  FileCheck2,
  Heart,
  Leaf,
  Map,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import heroImage from "@/assets/dest-kerala.webp";
import teamImage from "@/assets/about-team.webp";
import kashmirImage from "@/assets/dest-kashmir.webp";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { SmartImage } from "@/components/site/SmartImage";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TripNest — Modern Travel Discovery & Planning" },
      {
        name: "description",
        content: "Learn about TripNest's mission, vision, values and the travel planning services we offer to travellers, families, couples and adventurers.",
      },
      { property: "og:title", content: "About TripNest" },
      { property: "og:description", content: "A modern travel discovery and planning company helping you discover places and create memories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Heart, title: "Traveller first", text: "Every recommendation starts with what's right for you — not what's easiest to sell." },
  { icon: ShieldCheck, title: "Honesty & transparency", text: "Clear pricing, clear inclusions and straight answers, always." },
  { icon: Leaf, title: "Responsible travel", text: "We favour local partners and experiences that respect people and places." },
  { icon: Sparkles, title: "Craft in the details", text: "Small touches — the right room, the right guide — make the biggest memories." },
];

const SERVICES = [
  { icon: Map, title: "Curated tour packages", text: "Ready-to-go itineraries for adventure, family, honeymoon and budget travel." },
  { icon: Compass, title: "Custom itineraries", text: "Tell us your dream trip; we design it day by day around your pace." },
  { icon: BedDouble, title: "Hotel & stay planning", text: "From houseboats to overwater villas, stays matched to your style." },
  { icon: Car, title: "Transfers & sightseeing", text: "Airport pick-ups, private cabs and guided local experiences." },
  { icon: FileCheck2, title: "Visa & document guidance", text: "Checklists and guidance to prepare for international journeys." },
  { icon: Building2, title: "Group & corporate trips", text: "College tours, family reunions and team offsites, handled end to end." },
];

const STEPS = [
  { title: "Share your idea", text: "Tell us where, when and who's travelling." },
  { title: "Get a tailored plan", text: "We suggest an itinerary and transparent estimate." },
  { title: "Refine together", text: "Adjust stays, pace and experiences until it's perfect." },
  { title: "Travel with support", text: "Your planner stays reachable throughout your journey." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        image={heroImage}
        eyebrow="About TripNest"
        title="We help the world's curious travel better"
        description="TripNest is a modern travel discovery and planning company — blending local expertise with thoughtful design to make every journey feel effortless."
      />

      <section className="container-page grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-2">
        <Reveal className="relative">
          <SmartImage src={teamImage} alt="A group of travellers planning their route on a map at a mountain viewpoint" width={1024} height={1280} wrapperClassName="aspect-[4/5] rounded-[2rem] shadow-card" />
          <div className="absolute -bottom-8 -right-4 hidden w-56 overflow-hidden rounded-3xl border-4 border-background shadow-card sm:block lg:-right-10">
            <SmartImage src={kashmirImage} alt="Shikara boat on Dal Lake, Kashmir" width={1024} height={768} wrapperClassName="aspect-[4/3]" />
          </div>
          <div className="absolute -left-4 top-8 rounded-2xl bg-sun px-5 py-4 text-sun-foreground shadow-card">
            <p className="font-display text-3xl font-extrabold">9</p>
            <p className="text-xs font-bold uppercase tracking-wider">Handpicked destinations</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <SectionHeading
            eyebrow="Our story"
            title={
              <>
                Built by travellers, <span className="text-gradient-brand">for travellers</span>
              </>
            }
          />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              TripNest began with a simple frustration: planning a great trip took too many tabs, too many calls and too much guesswork. We set out
              to change that with one place to discover destinations, compare journeys and talk to people who genuinely know the road.
            </p>
            <p>
              Today we design trips for solo explorers, families, couples, student groups and adventure seekers — across India and to favourite
              international escapes like Bali, Dubai, Paris, Switzerland and the Maldives.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: Users, label: "Every kind of traveller" },
              { icon: Map, label: "Domestic & international" },
              { icon: Heart, label: "Personal planning" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl bg-muted p-4 text-center">
                <Icon className="mx-auto size-6 text-primary" />
                <p className="mt-2 text-xs font-bold text-foreground">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-forest py-20 text-forest-foreground sm:py-28">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Target,
              label: "Our mission",
              text: "To make extraordinary travel accessible to everyone by combining expert local knowledge, honest pricing and genuinely personal planning.",
              tone: "bg-primary",
            },
            {
              icon: Eye,
              label: "Our vision",
              text: "To become India's most trusted travel companion — the first place people turn when they dream of discovering somewhere new.",
              tone: "bg-ocean text-ocean-foreground",
            },
          ].map(({ icon: Icon, label, text, tone }, i) => (
            <Reveal key={label} delay={i * 120}>
              <div className="h-full rounded-[2rem] border border-forest-foreground/10 bg-forest-foreground/5 p-8 sm:p-10">
                <span className={cn("grid size-14 place-items-center rounded-2xl", tone)}>
                  <Icon className="size-6" />
                </span>
                <h2 className="mt-6 text-3xl font-extrabold">{label}</h2>
                <p className="mt-4 text-lg leading-relaxed text-forest-foreground/80">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <Reveal>
          <SectionHeading align="center" eyebrow="Our values" title="What guides every trip we plan" />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="h-full rounded-3xl border border-border/70 bg-card p-7 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-card">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-sun-soft text-sun-foreground">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-card-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-secondary to-background py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="What we do" title="Services for every step of your journey" description="Whether you need a full holiday or just a helping hand, we've got you covered." />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="group flex h-full gap-5 rounded-3xl bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground transition-transform duration-500 group-hover:-rotate-6">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-card-foreground">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <Reveal>
          <SectionHeading align="center" eyebrow="How it works" title="From first idea to final memory" />
        </Reveal>
        <ol className="mt-14 grid gap-6 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <li className="relative h-full rounded-3xl border border-border/70 p-6">
                <span className="font-display text-5xl font-extrabold text-gradient-brand">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-14 text-center">
          <Button asChild size="lg" className="rounded-full px-8 font-bold shadow-glow">
            <Link to="/contact">
              Start planning with us <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
