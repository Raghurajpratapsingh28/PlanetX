// hotelPricing.schema.js
import { z } from "zod";

export const hotelPricingSchema = z.object({
  basePricePerNight: z.coerce
    .number({
      required_error: "Base Price per Night is required",
      invalid_type_error: "Base Price per Night must be a number",
    })
    .gt(0, "hotel price per Night should be greate than zero"),
  discountedPrice: z.coerce
    .number({
      invalid_type_error: "Discounted Price must be a number",
    })
    .optional(),
  taxes: z.coerce.number({
    required_error: "Taxes are required",
    invalid_type_error: "Taxes must be a number",
  }),
  finalPrice: z.coerce.number({
    required_error: "Final Price is required",
    invalid_type_error: "Final Price must be a number",
  }),
});
