import { Bitter, Open_Sans, Urbanist } from "next/font/google";
import { z } from "zod";

export const bitter = Bitter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
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

const driverLicenseRegex = /^[A-Za-z]\d{2}-\d{2}-\d{6}$/;

export const purchaseStickerFormSchema = z.object({
  stickerDate: z.string(),
  stickerNumber: z.string(),
  stickerColor: z.string(),
  role: z.enum(["homeowner", "tenant", "visitor", "special", "delivery"]),
  amount: z.coerce.number(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  plate: z.string(),
  vehicleType: z.string(),
  vehicleColor: z.string(),
  driverLicense: z.string().regex(driverLicenseRegex, {
    message: "Invalid driver license format",
  }),
  residentId: z.string(),
  quantity: z.coerce.number(),
});

export const transactionsFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  date: z.string(),
  amount: z.coerce.number(),
  type: z.enum(["income", "expense"]),
});
