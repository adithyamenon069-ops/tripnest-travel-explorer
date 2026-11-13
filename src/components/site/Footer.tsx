import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS } from "./Navbar";
import { destinations } from "@/data/destinations";
import { CONTACT_INFO } from "@/data/company";

export const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/", label: "Instagram", icon: Instagram },
  { href: "https://www.facebook.com/", label: "Facebook", icon: Facebook },
  { href: "https://x.com/", label: "X (Twitter)", icon: Twitter },
  { href: "https://www.youtube.com/", label: "YouTube", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest text-forest-foreground">
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 size-96 rounded-full bg-ocean/10 blur-3xl" />

      <div className="container-page relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-4 font-display text-lg font-semibold text-sun">Discover Places. Create Memories.</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-forest-foreground/70">
            A modern travel discovery and planning company crafting journeys across India and around the world.
          </p>
          <ul className="mt-6 flex gap-2.5">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full bg-forest-foreground/10 text-forest-foreground transition-all hover:-translate-y-0.5 hover:bg-primary"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-forest-foreground/60">Explore</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-forest-foreground/85 transition-colors hover:text-sun">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-forest-foreground/60">Destinations</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
            {destinations.slice(0, 6).map((d) => (
              <li key={d.slug}>
                <Link to="/destinations/$slug" params={{ slug: d.slug }} className="text-sm text-forest-foreground/85 transition-colors hover:text-sun">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-forest-foreground/60">Get in touch</h3>
          <ul className="mt-5 space-y-4 text-sm text-forest-foreground/85">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-ocean" /> {CONTACT_INFO.address}
            </li>
            <li>
              <a href={`tel:${CONTACT_INFO.phoneHref}`} className="flex gap-3 hover:text-sun">
                <Phone className="mt-0.5 size-4 shrink-0 text-ocean" /> {CONTACT_INFO.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex gap-3 hover:text-sun">
                <Mail className="mt-0.5 size-4 shrink-0 text-ocean" /> {CONTACT_INFO.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-forest-foreground/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-forest-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} TripNest. All rights reserved.</p>
          <p>All prices shown are indicative sample prices. No bookings are processed on this website.</p>
        </div>
      </div>
    </footer>
  );
}
