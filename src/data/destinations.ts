import kerala from "@/assets/dest-kerala.webp";
import goa from "@/assets/dest-goa.webp";
import manali from "@/assets/dest-manali.webp";
import kashmir from "@/assets/dest-kashmir.webp";
import bali from "@/assets/dest-bali.webp";
import dubai from "@/assets/dest-dubai.webp";
import paris from "@/assets/dest-paris.webp";
import switzerland from "@/assets/dest-switzerland.webp";
import maldives from "@/assets/dest-maldives.webp";

export type Region = "domestic" | "international";
export type Theme = "beaches" | "mountains" | "culture" | "nature";

export const THEMES: { value: Theme; label: string }[] = [
  { value: "beaches", label: "Beaches & Islands" },
  { value: "mountains", label: "Mountains" },
  { value: "culture", label: "Culture & City" },
  { value: "nature", label: "Nature & Wildlife" },
];

export interface Destination {
  slug: string;
  name: string;
  location: string;
  region: Region;
  themes: Theme[];
  tagline: string;
  description: string;
  overview: string;
  image: string;
  bestTime: string;
  idealFor: string[];
  highlights: string[];
}

export const destinations: Destination[] = [
  {
    slug: "kerala",
    name: "Kerala",
    location: "South India",
    region: "domestic",
    themes: ["nature", "beaches", "culture"],
    tagline: "God's Own Country",
    description: "Glide through palm-fringed backwaters, tea-covered hills and golden Arabian Sea beaches.",
    overview:
      "Kerala is a slow, soulful escape — houseboats drifting along Alleppey's backwaters, misty tea estates in Munnar, spice-scented markets in Kochi and Ayurvedic retreats on the coast of Varkala.",
    image: kerala,
    bestTime: "September – March",
    idealFor: ["Families", "Couples", "Wellness seekers"],
    highlights: ["Alleppey houseboat stay", "Munnar tea plantations", "Fort Kochi heritage walk", "Kathakali performance"],
  },
  {
    slug: "goa",
    name: "Goa",
    location: "West India",
    region: "domestic",
    themes: ["beaches", "culture"],
    tagline: "Sun, sand & susegad",
    description: "Lively beaches, Portuguese-era churches, sunset shacks and an easy-going coastal rhythm.",
    overview:
      "From the buzzing shores of North Goa to the quiet coves of the south, Goa blends beach life with Indo-Portuguese heritage, spice farms, water sports and some of India's best seafood.",
    image: goa,
    bestTime: "November – February",
    idealFor: ["Friends", "Students", "Couples"],
    highlights: ["Palolem & Anjuna beaches", "Old Goa churches", "Dudhsagar Falls", "Sunset river cruise"],
  },
  {
    slug: "manali",
    name: "Manali",
    location: "Himachal Pradesh",
    region: "domestic",
    themes: ["mountains", "nature"],
    tagline: "Gateway to the Himalayas",
    description: "Snow-capped peaks, pine valleys and thrilling adventures from paragliding to river rafting.",
    overview:
      "Set in the Kullu Valley, Manali is a playground for adventure lovers — trek to alpine meadows, cross the Atal Tunnel to Sissu, raft the Beas river and unwind in cosy cafés of Old Manali.",
    image: manali,
    bestTime: "March – June, December – February for snow",
    idealFor: ["Adventurers", "Students", "Families"],
    highlights: ["Solang Valley paragliding", "Rohtang Pass / Atal Tunnel", "Hadimba Temple", "Beas river rafting"],
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    location: "Jammu & Kashmir",
    region: "domestic",
    themes: ["mountains", "nature"],
    tagline: "Paradise on Earth",
    description: "Shikara rides on Dal Lake, Mughal gardens and meadows framed by the mighty Himalayas.",
    overview:
      "Kashmir enchants in every season — tulip-filled springs, golden chinar autumns and snowy winters in Gulmarg. Stay on a traditional houseboat and explore Pahalgam and Sonamarg's valleys.",
    image: kashmir,
    bestTime: "March – October, December – February for snow",
    idealFor: ["Honeymooners", "Families", "Photographers"],
    highlights: ["Dal Lake shikara ride", "Gulmarg gondola", "Pahalgam valleys", "Mughal gardens of Srinagar"],
  },
  {
    slug: "bali",
    name: "Bali",
    location: "Indonesia",
    region: "international",
    themes: ["beaches", "culture", "nature"],
    tagline: "Island of the Gods",
    description: "Emerald rice terraces, cliff-top temples, surf beaches and a deeply spiritual culture.",
    overview:
      "Bali balances serenity and energy — yoga in Ubud's jungles, sunsets at Uluwatu, rice terraces at Tegallalang and vibrant beach clubs in Seminyak, all wrapped in warm Balinese hospitality.",
    image: bali,
    bestTime: "April – October",
    idealFor: ["Honeymooners", "Friends", "Wellness seekers"],
    highlights: ["Tegallalang rice terraces", "Uluwatu temple sunset", "Nusa Penida day trip", "Ubud monkey forest"],
  },
  {
    slug: "dubai",
    name: "Dubai",
    location: "United Arab Emirates",
    region: "international",
    themes: ["culture", "beaches"],
    tagline: "Where the future meets the desert",
    description: "Record-breaking skylines, golden desert safaris, luxury shopping and family theme parks.",
    overview:
      "Dubai delivers spectacle at every turn — the view from Burj Khalifa, dune-bashing at dusk, abra rides across the Creek, world-class malls and theme parks that keep every age group entertained.",
    image: dubai,
    bestTime: "November – March",
    idealFor: ["Families", "Shoppers", "Couples"],
    highlights: ["Burj Khalifa observation deck", "Desert safari with BBQ dinner", "Dubai Marina cruise", "Old Dubai souks"],
  },
  {
    slug: "paris",
    name: "Paris",
    location: "France",
    region: "international",
    themes: ["culture"],
    tagline: "The City of Light",
    description: "Iconic landmarks, world-famous art, charming cafés and evenings along the Seine.",
    overview:
      "Paris is timeless romance — the Eiffel Tower sparkling at night, masterpieces at the Louvre, buttery croissants in Montmartre and leisurely walks along the Seine's elegant boulevards.",
    image: paris,
    bestTime: "April – June, September – October",
    idealFor: ["Couples", "Art lovers", "First-time Europe travellers"],
    highlights: ["Eiffel Tower summit", "Louvre Museum", "Seine river cruise", "Montmartre & Sacré-Cœur"],
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    location: "Central Europe",
    region: "international",
    themes: ["mountains", "nature"],
    tagline: "Postcard-perfect Alps",
    description: "Turquoise lakes, scenic trains, chocolate-box villages and snow-capped alpine summits.",
    overview:
      "Switzerland is the definition of scenic — ride glacier trains, ascend Jungfraujoch, cruise Lake Lucerne and wander through Interlaken and Zermatt, with the Swiss Travel Pass making it seamless.",
    image: switzerland,
    bestTime: "June – September, December – March for snow",
    idealFor: ["Families", "Couples", "Nature lovers"],
    highlights: ["Jungfraujoch – Top of Europe", "Glacier Express journey", "Lake Lucerne cruise", "Mt. Titlis cable car"],
  },
  {
    slug: "maldives",
    name: "Maldives",
    location: "Indian Ocean",
    region: "international",
    themes: ["beaches", "nature"],
    tagline: "Barefoot luxury",
    description: "Overwater villas, crystal-clear lagoons, coral reefs and the softest white-sand beaches.",
    overview:
      "The Maldives is pure escape — wake up above a turquoise lagoon, snorkel with manta rays and reef sharks, dine on a sandbank under the stars and let island time take over.",
    image: maldives,
    bestTime: "November – April",
    idealFor: ["Honeymooners", "Couples", "Divers"],
    highlights: ["Overwater villa stay", "Snorkelling & diving", "Sunset dolphin cruise", "Sandbank dinner"],
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
