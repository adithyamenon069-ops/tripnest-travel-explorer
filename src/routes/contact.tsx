import { useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, Clock, Info, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import heroImage from "@/assets/dest-goa.webp";
import { destinations, getDestination } from "@/data/destinations";
import { getPackage } from "@/data/packages";
import { CONTACT_INFO } from "@/data/company";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { PageHero } from "@/components/site/PageHero";
import { SOCIAL_LINKS } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactSearch {
  package?: string | undefined;
  destination?: string | undefined;
}

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    package: typeof search["package"] === "string" && getPackage(search["package"]) ? search["package"] : undefined,
    destination: typeof search["destination"] === "string" && getDestination(search["destination"]) ? search["destination"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact TripNest — Plan Your Trip" },
      { name: "description", content: "Send TripNest a travel enquiry with your destination of interest, dates and questions. We'll help plan your perfect getaway." },
      { property: "og:title", content: "Contact TripNest" },
      { property: "og:description", content: "Tell us where you'd like to go and start planning your next adventure with TripNest." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const search = Route.useSearch();
  const pkg = search.package ? getPackage(search.package) : undefined;
  const presetDestination = pkg?.destinationSlug ?? search.destination ?? "";
  const presetName = pkg ? `${getDestination(pkg.destinationSlug)?.name} ${pkg.name}` : undefined;

  const [submitted, setSubmitted] = useState<ContactFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      destination: presetDestination,
      message: presetName ? `Hi TripNest, I'm interested in the "${presetName}" package. ` : "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    // No backend is connected: simulate a short processing step, then show the result locally.
    await new Promise((r) => setTimeout(r, 700));
    toast.dismiss();
    setSubmitted(values);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onInvalid = () => toast.error("Please fix the highlighted fields before submitting.");

  const fieldClass = (hasError: boolean) =>
    cn(
      "w-full rounded-2xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:outline-none focus:ring-4",
      hasError ? "border-destructive focus:ring-destructive/15" : "border-input focus:border-primary focus:ring-primary/15",
    );

  return (
    <>
      <PageHero
        image={heroImage}
        eyebrow="Contact us"
        title="Let's plan your next getaway"
        description="Share a few details and a TripNest planner can help shape your itinerary, stays and experiences."
      />

      <section className="container-page relative -mt-10 grid gap-8 pb-24 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-card sm:p-10">
          {submitted ? (
            <div role="status" className="animate-in fade-in zoom-in-95 duration-500">
              <span className="grid size-16 place-items-center rounded-full bg-secondary text-primary">
                <CheckCircle2 className="size-8" />
              </span>
              <h2 className="mt-6 text-3xl font-extrabold text-card-foreground">Thanks, {submitted.name.split(" ")[0]}! Your enquiry looks great.</h2>
              <p className="mt-3 text-muted-foreground">Here's a summary of what you entered:</p>
              <dl className="mt-6 grid gap-4 rounded-2xl bg-muted/70 p-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-bold text-muted-foreground">Email</dt>
                  <dd className="mt-0.5 break-all text-foreground">{submitted.email}</dd>
                </div>
                <div>
                  <dt className="font-bold text-muted-foreground">Phone</dt>
                  <dd className="mt-0.5 text-foreground">{submitted.phone}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-bold text-muted-foreground">Destination of interest</dt>
                  <dd className="mt-0.5 text-foreground">{getDestination(submitted.destination)?.name ?? "Not decided yet"}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-bold text-muted-foreground">Message</dt>
                  <dd className="mt-0.5 whitespace-pre-line text-foreground">{submitted.message}</dd>
                </div>
              </dl>
              <div className="mt-6 flex gap-3 rounded-2xl bg-sun-soft p-4 text-sm text-sun-foreground">
                <Info className="mt-0.5 size-4 shrink-0" />
                <p>
                  <strong>Demo website:</strong> this enquiry was validated in your browser only — it has not been sent to anyone, and no booking or
                  reservation has been made. To reach us directly, email{" "}
                  <a className="font-bold underline" href={`mailto:${CONTACT_INFO.email}`}>
                    {CONTACT_INFO.email}
                  </a>
                  .
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  className="rounded-full font-bold"
                  onClick={() => {
                    reset({ name: "", email: "", phone: "", destination: "", message: "" });
                    setSubmitted(null);
                  }}
                >
                  Send another enquiry
                </Button>
                <Button asChild variant="outline" className="rounded-full font-bold">
                  <Link to="/packages">Keep exploring packages</Link>
                </Button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-5" aria-label="Travel enquiry form">
              <div>
                <h2 className="text-2xl font-extrabold text-card-foreground sm:text-3xl">Send us an enquiry</h2>
                <p className="mt-2 text-sm text-muted-foreground">Fields marked * are required.</p>
              </div>
              {presetName && (
                <p className="rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground">Enquiring about: {presetName}</p>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Full name *" error={errors.name?.message}>
                  <input id="name" autoComplete="name" maxLength={100} placeholder="e.g. Priya Sharma" className={fieldClass(!!errors.name)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
                </Field>
                <Field id="email" label="Email address *" error={errors.email?.message}>
                  <input id="email" type="email" autoComplete="email" maxLength={255} placeholder="you@example.com" className={fieldClass(!!errors.email)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
                </Field>
                <Field id="phone" label="Phone number *" error={errors.phone?.message}>
                  <input id="phone" type="tel" autoComplete="tel" maxLength={20} placeholder="+91 98765 43210" className={fieldClass(!!errors.phone)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />
                </Field>
                <Field id="destination" label="Destination of interest *" error={errors.destination?.message}>
                  <select id="destination" className={cn(fieldClass(!!errors.destination), "cursor-pointer")} aria-invalid={!!errors.destination} aria-describedby={errors.destination ? "destination-error" : undefined} {...register("destination")}>
                    <option value="">Select a destination</option>
                    <optgroup label="Domestic">
                      {destinations.filter((d) => d.region === "domestic").map((d) => (
                        <option key={d.slug} value={d.slug}>{d.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="International">
                      {destinations.filter((d) => d.region === "international").map((d) => (
                        <option key={d.slug} value={d.slug}>{d.name}</option>
                      ))}
                    </optgroup>
                    <option value="undecided">Not sure yet — inspire me</option>
                  </select>
                </Field>
              </div>
              <Field id="message" label="Message *" error={errors.message?.message}>
                <textarea id="message" rows={5} maxLength={1000} placeholder="Tell us about your travel dates, group size, budget and any special requests…" className={cn(fieldClass(!!errors.message), "resize-y")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} />
              </Field>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs text-muted-foreground">
                  Demo form: details are checked in your browser and not sent or stored. No booking is made.
                </p>
                <Button type="submit" size="lg" disabled={isSubmitting} className="h-12 rounded-full px-8 text-base font-bold shadow-glow">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" /> Checking…
                    </>
                  ) : (
                    <>
                      <Send /> Submit enquiry
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-forest p-8 text-forest-foreground shadow-card">
            <h2 className="text-2xl font-extrabold">Contact information</h2>
            <ul className="mt-6 space-y-5">
              {[
                { icon: Mail, label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
                { icon: Phone, label: "Phone", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phoneHref}` },
                { icon: MapPin, label: "Office", value: CONTACT_INFO.address },
                { icon: Clock, label: "Hours", value: CONTACT_INFO.hours },
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-forest-foreground/10 text-ocean">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-forest-foreground/60">{label}</p>
                    {href ? (
                      <a href={href} className="mt-0.5 block font-semibold hover:text-sun">{value}</a>
                    ) : (
                      <p className="mt-0.5 font-semibold">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-forest-foreground/10 pt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-forest-foreground/60">Follow our journeys</p>
              <ul className="mt-4 flex gap-2.5">
                {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-11 place-items-center rounded-full bg-forest-foreground/10 transition-all hover:-translate-y-0.5 hover:bg-primary">
                      <Icon className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-[2rem] bg-gradient-sunset p-8 text-sun-foreground">
            <h3 className="text-xl font-extrabold">Not sure where to go?</h3>
            <p className="mt-2 text-sm">Browse our destinations for inspiration, then come back with your favourites.</p>
            <Button asChild className="mt-5 rounded-full bg-background font-bold text-foreground hover:bg-background/90">
              <Link to="/destinations">Explore destinations</Link>
            </Button>
          </div>
        </aside>
      </section>
    </>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
