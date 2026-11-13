export type PackageCategory = "Adventure" | "Family" | "Honeymoon" | "Budget";

export const PACKAGE_CATEGORIES: PackageCategory[] = ["Adventure", "Family", "Honeymoon", "Budget"];

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TravelPackage {
  slug: string;
  name: string;
  destinationSlug: string;
  category: PackageCategory;
  nights: number;
  /** Indicative sample price per person in INR — not a live quote. */
  priceInr: number;
  summary: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  featured?: boolean;
}

export const packages: TravelPackage[] = [
  {
    slug: "kerala-backwater-bliss",
    name: "Backwater Bliss",
    destinationSlug: "kerala",
    category: "Family",
    nights: 5,
    priceInr: 28500,
    summary: "Munnar's tea hills, Thekkady's spice gardens and a night aboard an Alleppey houseboat.",
    inclusions: ["4-star hotels & 1-night houseboat", "Daily breakfast", "Private AC cab", "Sightseeing as per itinerary"],
    exclusions: ["Flights", "Lunch & dinner (except houseboat)", "Entry tickets", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive in Kochi, drive to Munnar", description: "Scenic drive past waterfalls and spice plantations to the hills of Munnar." },
      { day: 2, title: "Munnar sightseeing", description: "Tea museum, Mattupetty Dam, Echo Point and Eravikulam National Park." },
      { day: 3, title: "Munnar to Thekkady", description: "Spice plantation tour and an optional boat ride on Periyar Lake." },
      { day: 4, title: "Alleppey houseboat", description: "Board a traditional kettuvallam and cruise the backwaters overnight." },
      { day: 5, title: "Kochi heritage", description: "Chinese fishing nets, Jew Town and a Kathakali performance." },
      { day: 6, title: "Departure", description: "Transfer to Kochi airport with memories to keep." },
    ],
    featured: true,
  },
  {
    slug: "goa-beach-hopper",
    name: "Beach Hopper",
    destinationSlug: "goa",
    category: "Budget",
    nights: 3,
    priceInr: 12999,
    summary: "A breezy long weekend of North and South Goa beaches, forts and sunset cruises.",
    inclusions: ["3-star beach resort", "Daily breakfast", "Airport transfers", "North & South Goa tours"],
    exclusions: ["Flights", "Water sports", "Meals not mentioned", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive & unwind", description: "Check in near Calangute and catch your first Goan sunset." },
      { day: 2, title: "North Goa trail", description: "Fort Aguada, Baga, Anjuna and an evening Mandovi river cruise." },
      { day: 3, title: "South Goa & heritage", description: "Old Goa churches, Colva and Palolem beaches." },
      { day: 4, title: "Departure", description: "Breakfast and transfer to the airport." },
    ],
  },
  {
    slug: "manali-snow-trails",
    name: "Himalayan Snow Trails",
    destinationSlug: "manali",
    category: "Adventure",
    nights: 5,
    priceInr: 22000,
    summary: "Paragliding in Solang, rafting the Beas and a high-altitude drive through the Atal Tunnel.",
    inclusions: ["Boutique mountain stays", "Breakfast & dinner", "Volvo / cab transfers", "Paragliding & rafting session"],
    exclusions: ["Train / flights to Delhi", "Rohtang permits", "Snow gear rental", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive in Manali", description: "Overnight journey from Delhi, check in and explore Mall Road." },
      { day: 2, title: "Local sightseeing", description: "Hadimba Temple, Vashisht hot springs and Old Manali cafés." },
      { day: 3, title: "Solang Valley thrills", description: "Paragliding, zorbing and ropeway rides in Solang." },
      { day: 4, title: "Atal Tunnel & Sissu", description: "Cross into Lahaul for dramatic mountain views." },
      { day: 5, title: "Kullu rafting", description: "White-water rafting on the Beas and a shawl factory visit." },
      { day: 6, title: "Departure", description: "Return journey to Delhi." },
    ],
    featured: true,
  },
  {
    slug: "manali-backpacker",
    name: "Mountain Backpacker",
    destinationSlug: "manali",
    category: "Budget",
    nights: 4,
    priceInr: 9999,
    summary: "A wallet-friendly hostel-and-trek trip designed for students and solo travellers.",
    inclusions: ["Hostel / homestay dorms", "Daily breakfast", "Guided Jogini Falls trek", "Delhi–Manali Volvo"],
    exclusions: ["Lunch & dinner", "Adventure activities", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive & settle in", description: "Check in to a social hostel in Old Manali." },
      { day: 2, title: "Jogini Falls trek", description: "A guided half-day hike through apple orchards to the falls." },
      { day: 3, title: "Solang & Sethan", description: "Explore mountain villages and snow points." },
      { day: 4, title: "Café trail", description: "Free day for cafés, markets and riverside walks." },
      { day: 5, title: "Departure", description: "Overnight Volvo back to Delhi." },
    ],
  },
  {
    slug: "kashmir-paradise-retreat",
    name: "Paradise Retreat",
    destinationSlug: "kashmir",
    category: "Honeymoon",
    nights: 6,
    priceInr: 42000,
    summary: "Romantic houseboat nights in Srinagar with Gulmarg, Pahalgam and Sonamarg.",
    inclusions: ["Deluxe houseboat & hotels", "Breakfast & dinner", "Private cab", "Candle-light dinner & shikara ride"],
    exclusions: ["Flights", "Gondola tickets", "Pony rides", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Welcome to Srinagar", description: "Check in to a houseboat and enjoy a sunset shikara ride." },
      { day: 2, title: "Mughal gardens", description: "Nishat, Shalimar and Chashme Shahi gardens." },
      { day: 3, title: "Gulmarg", description: "Meadows of flowers and the famous Gulmarg gondola." },
      { day: 4, title: "Pahalgam", description: "Drive via saffron fields to the Lidder valley." },
      { day: 5, title: "Pahalgam valleys", description: "Aru, Betaab and Chandanwari valleys." },
      { day: 6, title: "Sonamarg", description: "A day trip to the 'Meadow of Gold' and Thajiwas glacier." },
      { day: 7, title: "Departure", description: "Transfer to Srinagar airport." },
    ],
  },
  {
    slug: "bali-island-escape",
    name: "Island Escape",
    destinationSlug: "bali",
    category: "Honeymoon",
    nights: 6,
    priceInr: 79900,
    summary: "Private pool villa in Ubud, beach days in Seminyak and a Nusa Penida island tour.",
    inclusions: ["Pool villa & beach resort", "Daily breakfast", "Private transfers", "Nusa Penida tour & couple spa"],
    exclusions: ["International flights", "Visa on arrival", "Travel insurance", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive in Bali", description: "Private transfer to your Ubud pool villa." },
      { day: 2, title: "Ubud culture", description: "Rice terraces, monkey forest and a Balinese cooking class." },
      { day: 3, title: "Kintamani volcano", description: "Views of Mount Batur and a coffee plantation stop." },
      { day: 4, title: "Seminyak beaches", description: "Move to the coast; sunset at Tanah Lot temple." },
      { day: 5, title: "Nusa Penida", description: "Kelingking Beach, Broken Beach and snorkelling." },
      { day: 6, title: "Uluwatu", description: "Cliff-top temple and a Kecak fire dance at sunset." },
      { day: 7, title: "Departure", description: "Transfer to Denpasar airport." },
    ],
    featured: true,
  },
  {
    slug: "dubai-family-fiesta",
    name: "Family Fiesta",
    destinationSlug: "dubai",
    category: "Family",
    nights: 4,
    priceInr: 64500,
    summary: "Burj Khalifa, a desert safari and a full day at a Dubai theme park for the whole family.",
    inclusions: ["4-star city hotel", "Daily breakfast", "Desert safari with BBQ dinner", "Burj Khalifa & theme park tickets"],
    exclusions: ["International flights", "UAE visa", "Tourism Dirham fee", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive in Dubai", description: "Airport pick-up and an evening Dhow cruise dinner." },
      { day: 2, title: "City tour & Burj Khalifa", description: "Old Dubai souks, Jumeirah and the 124th-floor deck." },
      { day: 3, title: "Desert safari", description: "Dune bashing, camel rides and a BBQ dinner under the stars." },
      { day: 4, title: "Theme park day", description: "A full day at a Dubai theme park of your choice." },
      { day: 5, title: "Departure", description: "Last-minute shopping and airport transfer." },
    ],
  },
  {
    slug: "paris-romance-getaway",
    name: "Romance Getaway",
    destinationSlug: "paris",
    category: "Honeymoon",
    nights: 5,
    priceInr: 149000,
    summary: "Boutique stays, a Seine dinner cruise, Versailles and evenings in Montmartre.",
    inclusions: ["Boutique 4-star hotel", "Daily breakfast", "Seine dinner cruise", "Paris museum pass & Versailles tour"],
    exclusions: ["International flights", "Schengen visa", "City tax", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Bonjour Paris", description: "Private transfer and an evening walk by the Eiffel Tower." },
      { day: 2, title: "Icons of Paris", description: "Eiffel Tower summit, Champs-Élysées and Arc de Triomphe." },
      { day: 3, title: "Art & the Louvre", description: "Louvre highlights and a Seine dinner cruise." },
      { day: 4, title: "Versailles", description: "Guided tour of the palace and gardens." },
      { day: 5, title: "Montmartre", description: "Artists' square, Sacré-Cœur and a farewell dinner." },
      { day: 6, title: "Au revoir", description: "Transfer to Charles de Gaulle airport." },
    ],
  },
  {
    slug: "swiss-alps-explorer",
    name: "Alpine Explorer",
    destinationSlug: "switzerland",
    category: "Adventure",
    nights: 7,
    priceInr: 189000,
    summary: "Jungfraujoch, Mt. Titlis, scenic train journeys and lakeside stays across Switzerland.",
    inclusions: ["3 & 4-star hotels", "Daily breakfast", "8-day Swiss Travel Pass", "Jungfraujoch & Titlis excursions"],
    exclusions: ["International flights", "Schengen visa", "Lunch & dinner", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive in Zurich", description: "Train to Lucerne and an evening by the Chapel Bridge." },
      { day: 2, title: "Mt. Titlis", description: "Rotating cable car and the glacier cliff walk." },
      { day: 3, title: "Lake Lucerne", description: "Cruise the lake and ride up Mt. Pilatus." },
      { day: 4, title: "To Interlaken", description: "Scenic GoldenPass route to the adventure capital." },
      { day: 5, title: "Jungfraujoch", description: "Journey to the 'Top of Europe' at 3,454 m." },
      { day: 6, title: "Adventure day", description: "Optional paragliding, canyoning or Grindelwald First." },
      { day: 7, title: "Zermatt & Matterhorn", description: "Car-free village with views of the Matterhorn." },
      { day: 8, title: "Departure", description: "Train back to Zurich airport." },
    ],
  },
  {
    slug: "maldives-overwater-dream",
    name: "Overwater Dream",
    destinationSlug: "maldives",
    category: "Honeymoon",
    nights: 4,
    priceInr: 125000,
    summary: "Four nights in an overwater villa with all meals, snorkelling and a sunset cruise.",
    inclusions: ["Overwater villa", "All meals (full board)", "Speedboat transfers", "Snorkel trip & sunset cruise"],
    exclusions: ["International flights", "Green tax", "Spa treatments", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive in Malé", description: "Speedboat transfer to your island resort." },
      { day: 2, title: "Reef day", description: "Guided snorkelling over vibrant house reefs." },
      { day: 3, title: "Island time", description: "Free day; optional spa or diving." },
      { day: 4, title: "Sunset cruise", description: "Dolphin-spotting cruise as the sun sets." },
      { day: 5, title: "Departure", description: "Breakfast and transfer back to Malé." },
    ],
    featured: false,
  },
  {
    slug: "bali-budget-explorer",
    name: "Budget Explorer",
    destinationSlug: "bali",
    category: "Budget",
    nights: 5,
    priceInr: 54999,
    summary: "Stylish guesthouses, shared island tours and all the Bali essentials at a friendly price.",
    inclusions: ["3-star guesthouses", "Daily breakfast", "Shared tours", "Airport transfers"],
    exclusions: ["International flights", "Visa on arrival", "Meals not mentioned", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive in Kuta", description: "Transfer and beach sunset." },
      { day: 2, title: "Ubud day", description: "Rice terraces, waterfalls and the art market." },
      { day: 3, title: "Temple trail", description: "Tanah Lot and Ulun Danu Beratan temples." },
      { day: 4, title: "Nusa Penida", description: "Shared island day trip." },
      { day: 5, title: "Free day", description: "Surf lesson or café hopping in Canggu." },
      { day: 6, title: "Departure", description: "Transfer to the airport." },
    ],
  },
  {
    slug: "goa-family-fun",
    name: "Coastal Family Fun",
    destinationSlug: "goa",
    category: "Family",
    nights: 4,
    priceInr: 24500,
    summary: "A kid-friendly beach resort, dolphin cruise, spice farm lunch and relaxed sightseeing.",
    inclusions: ["4-star family resort", "Breakfast & dinner", "Private cab", "Dolphin cruise & spice farm visit"],
    exclusions: ["Flights", "Water sports", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive in Goa", description: "Check in to a family resort with pools." },
      { day: 2, title: "Dolphin cruise", description: "Morning cruise and beach afternoon." },
      { day: 3, title: "Spice farm", description: "Guided spice plantation tour with a Goan lunch." },
      { day: 4, title: "Heritage & shopping", description: "Old Goa and Panjim's Latin Quarter." },
      { day: 5, title: "Departure", description: "Transfer to the airport." },
    ],
    featured: false,
  },
];

export function getPackage(slug: string): TravelPackage | undefined {
  return packages.find((p) => p.slug === slug);
}

export function packagesForDestination(destinationSlug: string): TravelPackage[] {
  return packages.filter((p) => p.destinationSlug === destinationSlug);
}
