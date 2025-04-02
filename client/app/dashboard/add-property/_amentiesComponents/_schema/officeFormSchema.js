import { z } from "zod";

export const officeAmmentiesSchema = z.object({
  amenities: z.object({
    security24x7: z.boolean().optional(),
    cctv: z.boolean().optional(),
    powerBackup: z.boolean().optional(),
    lift: z.boolean().optional(),
    parking: z
      .object({
        covered: z.boolean().optional(),
        open: z.boolean().optional(),
      })
      .optional(),
    wifi: z.boolean().optional(),
    fireSafety: z.boolean().optional(),
    housekeeping: z.boolean().optional(),
    visitorParking: z.boolean().optional(),
    pantry: z.boolean().optional(),
    cafeteria: z.boolean().optional(),
    receptionService: z.boolean().optional(),
    gymFitnessCentre: z.boolean().optional(),
    breakoutArea: z.boolean().optional(),
  }),
  buildingFeatures: z.object({
    buildingType: z.enum(
      ["Standalone Building", "IT Park", "Commercial Complex"],
      {
        required_error: "Building type is required",
      }
    ),
    grade: z.enum(["Grade A", "Grade B", "Grade C"], {
      required_error: "Grade is required",
    }),
    fireSafetyCompliance: z.boolean().optional(),
    wheelChairAccessibility: z.boolean().optional(),
    greenBuildingCertification: z.boolean().optional(),
    rainWaterHarvesting: z.boolean().optional(),
    wasteManagement: z.boolean().optional(),
  }),
  roomDetails: z.object({
    totalCabins: z.number().optional(),
    workstations: z.number().optional(),
    meetingRooms: z.number().optional(),
    conferenceRooms: z.number().optional(),
    pantryType: z.enum(["Dry", "Wet"]).optional(),
    commonArea: z
      .object({
        size: z.number().optional(),
        unit: z.enum(["sq ft"]).optional(),
      })
      .optional(),
  }),
  additionalFeatures: z.object({
    petFriendly: z.boolean().optional(),
    coupleFriendly: z.boolean().optional(),
    childFriendly: z.boolean().optional(),
    localIDAccepted: z.boolean().optional(),
    alcoholAllowed: z.boolean().optional(),
    visitorEntryPolicy: z.string().optional(),
  }),
  rules: z.object({
    operatingHours: z.string({
      required_error: "Operating hours are required",
    }),
    smokingAllowed: z.boolean().optional(),
    alcoholAllowed: z.boolean().optional(),
    quietHours: z.string().optional(),
    hourlyAvailability: z
      .object({
        available: z.boolean().optional(),
        timings: z
          .object({
            start: z.string().optional(),
            end: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
  }),
});
