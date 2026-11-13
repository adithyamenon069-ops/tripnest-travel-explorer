import type { ReactNode } from "react";

interface PageHeroProps {
  image: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

export function PageHero({ image, eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <img src={image} alt="" aria-hidden className="absolute inset-0 -z-10 h-full w-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="container-page pb-20 pt-36 sm:pb-24 sm:pt-44">
        <p className="animate-in fade-in slide-in-from-bottom-2 text-sm font-bold uppercase tracking-[0.2em] text-sun duration-700">{eyebrow}</p>
        <h1 className="animate-in fade-in slide-in-from-bottom-4 mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] text-primary-foreground duration-700 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="animate-in fade-in slide-in-from-bottom-4 mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/85 duration-1000">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
