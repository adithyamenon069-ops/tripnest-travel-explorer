import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(100, { message: "Name must be under 100 characters" })
    .regex(/^[\p{L}][\p{L}\s.'-]*$/u, { message: "Name can only contain letters, spaces and . ' -" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be under 255 characters" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .regex(/^\+?[\d\s()-]+$/, { message: "Use digits, spaces, +, - or brackets only" })
    .refine((v) => {
      const digits = v.replace(/\D/g, "").length;
      return digits >= 10 && digits <= 15;
    }, { message: "Phone number must have 10–15 digits" }),
  destination: z.string().min(1, { message: "Please choose a destination" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Tell us a little more (at least 10 characters)" })
    .max(1000, { message: "Message must be under 1000 characters" }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
