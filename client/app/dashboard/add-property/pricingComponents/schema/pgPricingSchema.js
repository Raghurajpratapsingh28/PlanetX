import { z } from "zod";

export const pgPricingSchema = z.object({
  monthlyRent: z.coerce
    .number({
      required_error: "Monthly Rent is required",
      invalid_type_error: "Monthly Rent must be a number",
    })
    .gt(0, "Monthly Rent cannot be 0"),
  securityDeposit: z.coerce.number({
    required_error: "Security Deposit is required",
    invalid_type_error: "Security Deposit must be a number",
  }),
  electricityCharges: z.coerce.number({
    required_error: "electricity Charges is required",
    invalid_type_error: "Security Deposit must be a number",
  }),
  otherCharges: z.coerce.number({
    required_error: "Other charges is required",
    invalid_type_error: "Other charges must be a number",
  }),
});
