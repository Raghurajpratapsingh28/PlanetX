import { z } from "zod";

export const ShopSchema = z.object({
  subCategory: z.enum(["Retail/Shop"], {
    required_error: "Sub-Category is required",
  }),
  transactionType: z.enum(["For Sale", "For Rent", "Hourly Basis"], {
    errorMap: () => ({ message: "Invalid transaction type" }),
  }),
  propertyDetails: z.object({
    propertyName: z.string().min(1, "Property name is required"),
    shopType: z.enum(
      ["Standalone Shop", "Shopping Mall Unit", "High-Street Retail", "Kiosk"],
      {
        errorMap: () => ({ message: "Invalid shop type" }),
      }
    ),
    builtUpArea: z.object({
      size: z.number({
        required_error: "Built-up area size is required",
        invalid_type_error: "Built-up area size must be a number",
      }),
      unit: z.literal("sq ft", {
        errorMap: () => ({ message: "Unit must be 'sq ft'" }),
      }),
    }),
    carpetArea: z.object({
      size: z.number({
        required_error: "Carpet area size is required",
        invalid_type_error: "Carpet area size must be a number",
      }),
      unit: z.literal("sq ft", {
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
      shelves: z.number({
        required_error: "Shelves is required",
        invalid_type_error: "Shelves must be a number",
      }),
      displayRacks: z.number({
        required_error: "Display racks is required",
        invalid_type_error: "Display racks must be a number",
      }),
      cashCounter: z.number({
        required_error: "Cash counter is required",
        invalid_type_error: "Cash counter must be a number",
      }),
      airConditioning: z.boolean({
        required_error: "Air conditioning is required",
        invalid_type_error: "Air conditioning must be a boolean",
      }),
      cctvCameras: z.number({
        required_error: "CCTV cameras is required",
        invalid_type_error: "CCTV cameras must be a number",
      }),
      powerBackup: z.boolean({
        required_error: "Power backup is required",
        invalid_type_error: "Power backup must be a boolean",
      }),
      washroom: z.boolean({
        required_error: "Washroom is required",
        invalid_type_error: "Washroom must be a boolean",
      }),
      pantry: z.boolean({
        required_error: "Pantry is required",
        invalid_type_error: "Pantry must be a boolean",
      }),
    }),
    floorDetails: z.object({
      totalFloors: z.number({
        required_error: "Total floors is required",
        invalid_type_error: "Total floors must be a number",
      }),
      shopOnFloor: z.number({
        required_error: "Shop on floor is required",
        invalid_type_error: "Shop on floor must be a number",
      }),
    }),
  }),
});
