import { Bitter, Open_Sans } from "next/font/google";
import { z } from "zod";

export const bitter = Bitter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const formSchema = z.object({
  name: z.string().min(2, "Last name must be at least 2 characters"),
  block: z.string().min(1, "Block number is required"),
  lot: z.string().min(1, "Lot number is required"),
  phase: z.string().min(1, "Please select a Phase"),
  email: z.string().email().optional().nullable(),
  contactNumber: z
    .string()
    .min(11, "Enter a valid mobile number ex. 09191234567")
    .optional()
    .nullable(),
  isAdmin: z.boolean().optional(),
  role: z.string().min(1, "Please select a role"),
});
