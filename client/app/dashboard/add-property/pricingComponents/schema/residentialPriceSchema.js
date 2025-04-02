import { z } from "zod";

export const residentialDefaultPriceSchema = z.object({
  expectedPrice: z.coerce.number({
    required_error: "Expected Price is required",
    invalid_type_error: "Expected Price must be a number",
  }),
  PricePerSqft: z.coerce.number({
    required_error: "Price per Sqft is required",
    invalid_type_error: "Price per Sqft must be a number",
  }),
  maintenanceFrequency: z
    .enum(["monthly", "yearly", "quarterly", ""], {
      invalid_type_error:
        "Maintenance Frequency must be one of: monthly, yearly, or quarterly",
    })
    .optional(),

  maintenancePrice: z.coerce
    .number({
      invalid_type_error: "Maintenance Price must be a number",
    })
    .optional(),
});
