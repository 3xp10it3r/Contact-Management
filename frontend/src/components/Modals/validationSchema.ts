import { z } from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Maximum 20 chars allowed"),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  phone: z
    .string()
    .min(10, "Minimum 10 digits required")
    .max(10, "Maximum 10 digits required")
    .refine(
      (phone) => {
        if (phone !== "") return /^\d+$/.test(phone);
        return true;
      },
      { message: "Please enter digits only" }
    ),
});
