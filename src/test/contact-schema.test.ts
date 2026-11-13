import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

const valid = {
  name: "Priya Sharma",
  email: "priya@example.com",
  phone: "+91 98765 43210",
  destination: "kerala",
  message: "We'd love a 5-day family trip in December.",
};

describe("contact form validation", () => {
  it("accepts a complete enquiry", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(contactSchema.safeParse({ ...valid, email: "priya@" }).success).toBe(false);
  });

  it("rejects a phone number with fewer than 10 digits", () => {
    expect(contactSchema.safeParse({ ...valid, phone: "98765" }).success).toBe(false);
  });

  it("requires a destination of interest", () => {
    expect(contactSchema.safeParse({ ...valid, destination: "" }).success).toBe(false);
  });

  it("requires a message of at least 10 characters", () => {
    expect(contactSchema.safeParse({ ...valid, message: "Hi" }).success).toBe(false);
  });
});
