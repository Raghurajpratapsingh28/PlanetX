import { z } from "zod";

export const OfficeSchema = z.object({
  subCategory: z.enum(["Office"], {
    required_error: "Sub-Category is required",
  }),
  transactionType: z.enum(["For Sale", "For Rent", "Hourly Basis"], {
    errorMap: () => ({ message: "Invalid transaction type" }),
  }),
  propertyDetails: z.object({
    propertyName: z.string().min(1, "Property name is required"),
    officeType: z.enum(
      ["Commercial Office", "Co-Working Space", "Business Center"],
      {
        errorMap: () => ({ message: "Invalid office type" }),
      }
    ),

    builtUpArea: z.object({
      size: z.number({
        required_error: "Built-up area size is required",
        invalid_type_error: "Built-up area size must be a number",
      }),
      unit: z.enum(["sq ft"], {
        errorMap: () => ({ message: "Unit must be 'sq ft'" }),
      }),
    }),
    carpetArea: z.object({
      size: z.number({
        required_error: "Carpet area size is required",
        invalid_type_error: "Carpet area size must be a number",
      }),
      unit: z.enum(["sq ft"], {
        errorMap: () => ({ message: "Unit must be 'sq ft'" }),
      }),
    }),
    furnishedStatus: z.enum(
      ["Fully Furnished", "Semi-Furnished", "Unfurnished"],
      {
        errorMap: () => ({ message: "Invalid furnished status" }),
      }
    ),

    furnishingDetails: z.object({
      workstations: z.number().optional(),
      cabinRooms: z.number().optional(),
      meetingRooms: z.number().optional(),
      conferenceRooms: z.number().optional(),
      pantry: z.boolean().optional(),
      cafeteria: z.boolean().optional(),
      serverRoom: z.boolean().optional(),
      airConditioning: z.boolean().optional(),
    }),
    floorDetails: z.object({
      totalFloors: z.number().optional(),
      officeOnFloor: z.number().optional(),
    }),
  }),
});
