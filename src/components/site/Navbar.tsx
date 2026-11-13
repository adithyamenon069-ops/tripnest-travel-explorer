import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Packages" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Every page opens with an image hero, so the bar stays transparent until scrolled.
  const solid = scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "border-b border-border/70 bg-background/85 shadow-soft backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="container-page flex h-20 items-center justify-between gap-6" aria-label="Main">
        <Logo light={!solid} />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  solid
                    ? "text-foreground/75 hover:bg-secondary hover:text-primary"
                    : "text-primary-foreground/85 hover:bg-primary-foreground/10 hover:text-primary-foreground",
                )}
                activeProps={{
                  className: solid ? "!text-primary bg-secondary" : "!text-primary-foreground bg-primary-foreground/15",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild size="lg" className="rounded-full bg-sun px-6 font-bold text-sun-foreground shadow-soft hover:bg-sun/90">
            <Link to="/contact">Plan my trip</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className={cn(
                "grid size-11 place-items-center rounded-full border transition-colors lg:hidden",
                solid ? "border-border bg-background text-foreground" : "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground backdrop-blur",
              )}
            >
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm border-l-0 p-0 [&>button]:hidden">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div className="flex h-20 items-center justify-between border-b px-6">
              <Logo />
              <SheetClose asChild>
                <button type="button" aria-label="Close menu" className="grid size-10 place-items-center rounded-full bg-secondary text-secondary-foreground">
                  <X className="size-5" />
                </button>
              </SheetClose>
            </div>
            <ul className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    activeOptions={{ exact: link.to === "/" }}
                    className="block rounded-2xl px-4 py-3.5 font-display text-xl font-semibold text-foreground transition-colors hover:bg-secondary"
                    activeProps={{ className: "bg-secondary !text-primary" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mx-4 rounded-3xl bg-gradient-brand p-6 text-primary-foreground">
              <p className="font-display text-xl font-bold">Ready for your next trip?</p>
              <p className="mt-1 text-sm text-primary-foreground/85">Tell us where you dream of going.</p>
              <Button asChild className="mt-4 w-full rounded-full bg-background font-bold text-primary hover:bg-background/90">
                <Link to="/contact">
                  <Phone /> Plan my trip
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
