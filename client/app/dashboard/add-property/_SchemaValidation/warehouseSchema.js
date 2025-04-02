import { z } from "zod";

const warehouseSchema = z.object({
  subCategory: z.enum(["Warehouse/Storage"]),
  transactionType: z.enum(["For Sale", "For Rent", "Hourly Basis"]),
  propertyDetails: z.object({
    propertyName: z.string(),
    warehouseType: z.enum([
      "Standalone Warehouse",
      "Shared Space",
      "Cold Storage",
      "Container Yard",
      "Logistics Hub",
    ]),
    builtUpArea: z.object({
      size: z.number(),
      unit: z.enum(["sq ft"]),
    }),
    carpetArea: z.object({
      size: z.number(),
      unit: z.enum(["sq ft"]),
    }),
    furnishedStatus: z.enum([
      "Unfurnished",
      "Semi-Furnished",
      "Fully Furnished",
    ]),
    floorDetails: z.object({
      totalFloors: z.number(),
      propertyOnFloor: z.number(),
    }),
    floorLoadCapacity: z.object({
      value: z.number(),
      unit: z.enum(["kg/sq ft"]),
    }),
    clearHeight: z.object({
      value: z.number(),
      unit: z.enum(["ft"]),
    }),
    dockDoors: z.number(),
    rampAccess: z.boolean(),
  }),
});

export { warehouseSchema };
