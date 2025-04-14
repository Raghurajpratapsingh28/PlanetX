import * as z from "zod";

export const BasePropertySchema = z.object({
  propertyType: z.enum(["For Sale", "For Rent", "Commercial"]),
  category: z.enum([
    "Residential",
    "Pg",
    "Hotel",
    "Office",
    "Shop",
    "Warehouse",
    "Shared Warehouse",
    "EventSpace",
  ]),
  location: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    locality: z.string().min(1, "Locality is required"),
    subLocality: z.string().optional(),
    apartment: z.string().min(1, "Apartment is required"),
    houseNumber: z.string().optional(),
  }),
  availabilityStatus: z.enum(["Available", "Rented", "Sold", "Under Construction"]),
  availableFrom: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      const date = new Date(arg);
      return isNaN(date.getTime()) ? undefined : date;
    }
  }, z.date({ invalid_type_error: "Invalid date" })),
  ageOfProperty: z.number().min(0, "Age of property must be non-negative"),
  description: z.string().min(1, "Description is required"),
  furnishingDetails: z.object({
    fans: z.boolean(),
    lights: z.boolean(),
    tv: z.boolean(),
    beds: z.boolean(),
    ac: z.boolean(),
    wardrobe: z.boolean(),
    exhaustFans: z.boolean(),
    curtains: z.boolean(),
    floorLamps: z.boolean(),
    diningTable: z.boolean(),
    sofa: z.boolean(),
    stove: z.boolean(),
    kitchenCabinets: z.boolean(),
    chimney: z.boolean(),
    coffeeTable: z.boolean(),
    refrigerator: z.boolean(),
    microwave: z.boolean(),
    dishwasher: z.boolean(),
    waterPurifier: z.boolean(),
    washingMachine: z.boolean(),
  }),
});
