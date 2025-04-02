import { z } from "zod";

export const sharedWarehouseSchema = z.object({
  subCategory: z.literal("Shared Workspace"),
  propertyDetails: z.object({
    workspaceName: z.string().min(1, "Workspace name is required"),
    type: z.enum([
      "Hot Desk",
      "Dedicated Desk",
      "Private Office",
      "Meeting Room",
      "Conference Room",
    ]),
    capacity: z.object({
      totalSeats: z.number().min(1, "Total seats must be at least 1"),
      availableSeats: z.number().min(0, "Available seats cannot be negative"),
    }),
  }),
});
