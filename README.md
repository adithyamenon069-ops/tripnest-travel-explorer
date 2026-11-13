# TripNest — Discover Places. Create Memories.

A premium, multi-page travel agency and tour discovery website built with React, TypeScript and Tailwind CSS.

## Pages

| Route | Description |
| --- | --- |
| `/` | Home — hero, destination search, popular destinations, featured packages, benefits, promo banner, sample testimonials |
| `/destinations` | All destinations with live search plus Domestic / International and experience filters |
| `/destinations/:slug` | Destination detail with highlights, best time to visit and matching packages |
| `/packages` | Travel packages with Adventure / Family / Honeymoon / Budget categories, destination filter and sorting |
| `/packages/:slug` | Package detail with day-by-day itinerary, inclusions, exclusions and enquiry button |
| `/about` | Company story, mission, vision, values, services and process |
| `/contact` | Validated enquiry form with success feedback, contact details and social links |

## Tech stack

- React 19 + TypeScript
- TanStack Start / TanStack Router (file-based routing in `src/routes`)
- Tailwind CSS v4 (design tokens in `src/styles.css`)
- react-hook-form + zod for form validation
- lucide-react icons

## Project structure

```
src/
  assets/            Optimised WebP travel photography
  components/site/   Reusable site components (Navbar, Footer, cards, search bar…)
  components/ui/     shadcn/ui primitives
  data/              Destinations, packages, sample testimonials, company info
  lib/               Filtering, formatting and validation helpers
  routes/            One file per page
  test/              Vitest unit tests
```

## Scripts

```bash
bun install
bun run dev      # start the dev server
bun run build    # production build
bun run test     # run unit tests
```

## Important notes

- **Prices are indicative samples** shown for illustration only.
- **No bookings are processed.** The contact form validates input in the browser and shows a confirmation summary; it does not send or store enquiries until a backend is connected.
- **Testimonials are clearly labelled samples**, not real customer reviews.
- Contact details in `src/data/company.ts` are placeholders — replace them before launch.
