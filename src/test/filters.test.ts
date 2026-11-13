import { describe, expect, it } from "vitest";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import { filterDestinations, filterPackages } from "@/lib/filters";

describe("destination filters", () => {
  it("domestic shows only the Indian destinations", () => {
    const names = filterDestinations(destinations, { region: "domestic" }).map((d) => d.name);
    expect(names.sort()).toEqual(["Goa", "Kashmir", "Kerala", "Manali"]);
  });

  it("international shows only the overseas destinations", () => {
    const names = filterDestinations(destinations, { region: "international" }).map((d) => d.name);
    expect(names.sort()).toEqual(["Bali", "Dubai", "Maldives", "Paris", "Switzerland"]);
  });

  it("search matches destination names case-insensitively", () => {
    const names = filterDestinations(destinations, { q: "  bAlI " }).map((d) => d.name);
    expect(names).toEqual(["Bali"]);
  });

  it("returns nothing for an unknown place", () => {
    expect(filterDestinations(destinations, { q: "Antarctica" })).toHaveLength(0);
  });
});

describe("package filters", () => {
  it("each category filter returns only that category", () => {
    for (const category of ["Adventure", "Family", "Honeymoon", "Budget"] as const) {
      const result = filterPackages(packages, { category });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((p) => p.category === category)).toBe(true);
    }
  });

  it("sorts by price from low to high", () => {
    const prices = filterPackages(packages, { sort: "price-asc" }).map((p) => p.priceInr);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
});
