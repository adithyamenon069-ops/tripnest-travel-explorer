/**
 * Sample testimonials for demonstration only — these are illustrative and do not
 * represent real customers. Replace with genuine, consented reviews before launch.
 */
export interface Testimonial {
  name: string;
  trip: string;
  quote: string;
  initials: string;
}

export const sampleTestimonials: Testimonial[] = [
  {
    name: "Ananya & Rohit",
    trip: "Kashmir Paradise Retreat",
    initials: "AR",
    quote:
      "Every detail felt considered — from the houseboat welcome to the shikara at sunset. It was the calm, beautiful start to married life we hoped for.",
  },
  {
    name: "The Pillai Family",
    trip: "Kerala Backwater Bliss",
    initials: "PF",
    quote:
      "Travelling with two kids and grandparents can be tricky, but the pace was perfect. The houseboat night was everyone's favourite memory.",
  },
  {
    name: "Arjun Mehta",
    trip: "Himalayan Snow Trails",
    initials: "AM",
    quote:
      "Paragliding over Solang and rafting the Beas in the same week — exactly the adrenaline I was looking for, without any of the planning headaches.",
  },
];
