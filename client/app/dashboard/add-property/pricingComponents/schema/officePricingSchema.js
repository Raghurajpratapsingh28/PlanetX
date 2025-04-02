import { z } from "zod";

export const officePricingSchema = z.object({
  price: z.object({
    amount: z.coerce.number({
      required_error: "Price amount is required",
      invalid_type_error: "Price amount must be a number",
    }),
    currency: z.enum(["INR"], {
      required_error: "Currency is required",
      invalid_type_error: "Currency must be INR",
    }),
  }),
  maintenanceCharges: z.object({
    amount: z.coerce.number({
      required_error: "Maintenance charges amount is required",
      invalid_type_error: "Maintenance charges amount must be a number",
    }),
    currency: z.enum(["INR"], {
      required_error: "Maintenance currency is required",
      invalid_type_error: "Currency must be INR",
    }),
    frequency: z.enum(["Monthly"], {
      required_error: "Frequency is required",
      invalid_type_error: "Frequency must be Monthly",
    }),
  }),
  rentalDetails: z.object({
    monthlyRent: z.coerce
      .number({
        invalid_type_error: "Monthly Rent must be a number",
      })
      .optional(),
    securityDeposit: z.coerce
      .number({
        invalid_type_error: "Security Deposit must be a number",
      })
      .optional(),
    hourlyRent: z.coerce
      .number({
        invalid_type_error: "Hourly Rent must be a number",
      })
      .optional(),
  }),
});
