import * as z from "zod";

export const ResidentialformSchema = z.object({
  about: z.object({
    bedrooms: z.number().min(1).max(10),
    bathrooms: z.number().min(1).max(10),
    balconies: z.number().min(0).max(10),
  }),
  propertyArea: z.object({
    carpetArea: z.number().min(1, "Carpet area is required"),
    builtUpArea: z.number().optional(),
  }),
  otherRooms: z.object({
    poojaRoom: z.boolean(),
    guestRoom: z.boolean(),
    servantRoom: z.boolean(),
    studyRoom: z.boolean(),
  }),
  furnishingStatus: z.enum([
    "Unfurnished",
    "Semi Furnished",
    "Fully Furnished",
  ]),
  furnishingDetails: z.object({
    fans: z.number().optional(),
    lights: z.number().optional(),
    tv: z.number().optional(),
    beds: z.number().optional(),
    ac: z.number().optional(),
    wardrobes: z.number().optional(),
    exhaustFans: z.number().optional(),
    curtains: z.number().optional(),
    floorLamps: z.number().optional(),
    diningTable: z.boolean().optional(),
    sofa: z.boolean().optional(),
    stove: z.boolean().optional(),
    kitchenCabinets: z.boolean().optional(),
    chimney: z.boolean().optional(),
    coffeeTable: z.boolean().optional(),
    refrigerator: z.boolean().optional(),
    microwave: z.boolean().optional(),
    dishwasher: z.boolean().optional(),
    waterPurifier: z.boolean().optional(),
    washingMachine: z.boolean().optional(),
  }),
  totalFloors: z.number().min(1, "Total floors is required"),
  propertyOnFloor: z.number().min(0),
  flatNumber: z.string().optional(),
  parking: z.object({
    covered: z.number().min(0),
    open: z.number().min(0),
  }),
});
