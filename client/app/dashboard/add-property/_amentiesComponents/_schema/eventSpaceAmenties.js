import { z } from "zod";

export const eventSpaceSchema = z.object({
  amenities: z.object({
    projector: z.boolean({
      required_error: "Projector is required",
      invalid_type_error: "Projector must be a boolean",
    }),
    screen: z.boolean({
      required_error: "Screen is required",
      invalid_type_error: "Screen must be a boolean",
    }),
    soundSystem: z.boolean({
      required_error: "Sound System is required",
      invalid_type_error: "Sound System must be a boolean",
    }),
    lightingSetup: z.boolean({
      required_error: "Lighting Setup is required",
      invalid_type_error: "Lighting Setup must be a boolean",
    }),
    airConditioning: z.boolean({
      required_error: "Air Conditioning is required",
      invalid_type_error: "Air Conditioning must be a boolean",
    }),
    WiFi: z.boolean({
      required_error: "WiFi is required",
      invalid_type_error: "WiFi must be a boolean",
    }),
    cateringServices: z.boolean({
      required_error: "Catering Services is required",
      invalid_type_error: "Catering Services must be a boolean",
    }),
    decorationServices: z.boolean({
      required_error: "Decoration Services is required",
      invalid_type_error: "Decoration Services must be a boolean",
    }),
    stageSetup: z.boolean({
      required_error: "Stage Setup is required",
      invalid_type_error: "Stage Setup must be a boolean",
    }),
    podium: z.boolean({
      required_error: "Podium is required",
      invalid_type_error: "Podium must be a boolean",
    }),
    parkingFacilities: z.object({
      covered: z.boolean({
        required_error: "Covered parking is required",
        invalid_type_error: "Covered parking must be a boolean",
      }),
      open: z.boolean({
        required_error: "Open parking is required",
        invalid_type_error: "Open parking must be a boolean",
      }),
    }),
    securityServices: z.boolean({
      required_error: "Security Services is required",
      invalid_type_error: "Security Services must be a boolean",
    }),
    cleaningServices: z.boolean({
      required_error: "Cleaning Services is required",
      invalid_type_error: "Cleaning Services must be a boolean",
    }),
  }),
  facilities: z.object({
    restrooms: z.boolean({
      required_error: "Restrooms are required",
      invalid_type_error: "Restrooms must be a boolean",
    }),
    changingRoom: z.boolean({
      required_error: "Changing Room is required",
      invalid_type_error: "Changing Room must be a boolean",
    }),
    powerBackup: z.boolean({
      required_error: "Power Backup is required",
      invalid_type_error: "Power Backup must be a boolean",
    }),
    photoBooth: z.boolean({
      required_error: "Photo Booth is required",
      invalid_type_error: "Photo Booth must be a boolean",
    }),
  }),
  availableSpaces: z.object({
    indoorSpace: z.boolean({
      required_error: "Indoor Space is required",
      invalid_type_error: "Indoor Space must be a boolean",
    }),
    outdoorSpace: z.boolean({
      required_error: "Outdoor Space is required",
      invalid_type_error: "Outdoor Space must be a boolean",
    }),
    balconyAccess: z.boolean({
      required_error: "Balcony Access is required",
      invalid_type_error: "Balcony Access must be a boolean",
    }),
  }),
  bookingDetails: z.object({
    minimumBookingDuration: z
      .string({
        required_error: "Minimum booking duration is required",
        invalid_type_error: "Minimum booking duration must be a string",
      })
      .nonempty("Minimum booking duration cannot be empty"),

    maximumBookingDuration: z
      .string({
        required_error: "Maximum booking duration is required",
        invalid_type_error: "Maximum booking duration must be a string",
      })
      .nonempty("Maximum booking duration cannot be empty"),

    cancellationPolicy: z
      .string({
        required_error: "Cancellation policy is required",
        invalid_type_error: "Cancellation policy must be a string",
      })
      .nonempty("Cancellation policy cannot be empty"),
  }),

  additionalServices: z.object({
    eventPlannerSupport: z.boolean({
      required_error: "Event Planner Support is required",
      invalid_type_error: "Event Planner Support must be a boolean",
    }),
    technicalStaffOnSite: z.boolean({
      required_error: "Technical Staff On Site is required",
      invalid_type_error: "Technical Staff On Site must be a boolean",
    }),
    customizableLayouts: z.boolean({
      required_error: "Customizable Layouts is required",
      invalid_type_error: "Customizable Layouts must be a boolean",
    }),
    loungeArea: z.boolean({
      required_error: "Lounge Area is required",
      invalid_type_error: "Lounge Area must be a boolean",
    }),
  }),
  rules: z.object({
    alcoholAllowed: z.boolean({
      required_error: "Alcohol Allowed is required",
      invalid_type_error: "Alcohol Allowed must be a boolean",
    }),
    smokingAllowed: z.boolean({
      required_error: "Smoking Allowed is required",
      invalid_type_error: "Smoking Allowed must be a boolean",
    }),
    petFriendly: z.boolean({
      required_error: "Pet Friendly is required",
      invalid_type_error: "Pet Friendly must be a boolean",
    }),
    noiseLimit: z.string({
      required_error: "Noise Limit is required",
      invalid_type_error: "Noise Limit must be a string",
    }),
    decorRestrictions: z.string({
      required_error: "Decor Restrictions are required",
      invalid_type_error: "Decor Restrictions must be a string",
    }),
  }),
});
