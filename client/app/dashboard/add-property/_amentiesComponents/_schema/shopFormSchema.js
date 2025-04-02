import { z } from "zod";

// Define the amenities schema
const amenitiesSchema = z.object({
  parking: z.object({
    covered: z.boolean({
      required_error: "Parking 'covered' field is required.",
      invalid_type_error: "Parking 'covered' must be a boolean.",
    }),
    open: z.boolean({
      required_error: "Parking 'open' field is required.",
      invalid_type_error: "Parking 'open' must be a boolean.",
    }),
  }),
  visitorParking: z.boolean({
    required_error: "'visitorParking' field is required.",
    invalid_type_error: "'visitorParking' must be a boolean.",
  }),
  powerBackup: z.boolean({
    required_error: "'powerBackup' field is required.",
    invalid_type_error: "'powerBackup' must be a boolean.",
  }),
  security24x7: z.boolean({
    required_error: "'security24x7' field is required.",
    invalid_type_error: "'security24x7' must be a boolean.",
  }),
  cctv: z.boolean({
    required_error: "'cctv' field is required.",
    invalid_type_error: "'cctv' must be a boolean.",
  }),
  fireSafety: z.boolean({
    required_error: "'fireSafety' field is required.",
    invalid_type_error: "'fireSafety' must be a boolean.",
  }),
  wifi: z.boolean({
    required_error: "'wifi' field is required.",
    invalid_type_error: "'wifi' must be a boolean.",
  }),
  elevator: z.boolean({
    required_error: "'elevator' field is required.",
    invalid_type_error: "'elevator' must be a boolean.",
  }),
  maintenanceStaff: z.boolean({
    required_error: "'maintenanceStaff' field is required.",
    invalid_type_error: "'maintenanceStaff' must be a boolean.",
  }),
});

// Define the building features schema
const buildingFeaturesSchema = z.object({
  buildingType: z.enum(
    ["Standalone Building", "Shopping Mall", "Mixed-Use Complex"],
    {
      errorMap: () => ({
        message:
          "Building type must be one of: 'Standalone Building', 'Shopping Mall', or 'Mixed-Use Complex'.",
      }),
    }
  ),
  fireSafetyCompliance: z.boolean({
    required_error: "'fireSafetyCompliance' field is required.",
    invalid_type_error: "'fireSafetyCompliance' must be a boolean.",
  }),
  wheelChairAccessibility: z.boolean({
    required_error: "'wheelChairAccessibility' field is required.",
    invalid_type_error: "'wheelChairAccessibility' must be a boolean.",
  }),
  greenBuildingCertification: z.boolean({
    required_error: "'greenBuildingCertification' field is required.",
    invalid_type_error: "'greenBuildingCertification' must be a boolean.",
  }),
  rainWaterHarvesting: z.boolean({
    required_error: "'rainWaterHarvesting' field is required.",
    invalid_type_error: "'rainWaterHarvesting' must be a boolean.",
  }),
  wasteManagement: z.boolean({
    required_error: "'wasteManagement' field is required.",
    invalid_type_error: "'wasteManagement' must be a boolean.",
  }),
});

// Define the shop features schema
const shopFeaturesSchema = z.object({
  shopFrontage: z.object({
    length: z.number({
      required_error: "Shop frontage length is required.",
      invalid_type_error: "Shop frontage length must be a number.",
    }),
    unit: z.enum(["ft"], {
      errorMap: () => ({
        message: "Shop frontage unit must be 'ft'.",
      }),
    }),
  }),
  height: z.object({
    value: z.number({
      required_error: "Shop height value is required.",
      invalid_type_error: "Shop height value must be a number.",
    }),
    unit: z.enum(["ft"], {
      errorMap: () => ({
        message: "Shop height unit must be 'ft'.",
      }),
    }),
  }),
  parkingAvailability: z
    .array(
      z.enum(["Dedicated", "Public", "None"], {
        errorMap: () => ({
          message:
            "Each parking availability option must be one of: 'Dedicated', 'Public', or 'None'.",
        }),
      })
    )
    .nonempty({
      message: "At least one parking availability option is required.",
    }),
  waterSupply: z.boolean({
    required_error: "'waterSupply' field is required.",
    invalid_type_error: "'waterSupply' must be a boolean.",
  }),
  electricityLoad: z.object({
    value: z.number({
      required_error: "Electricity load value is required.",
      invalid_type_error: "Electricity load value must be a number.",
    }),
    unit: z.enum(["kW"], {
      errorMap: () => ({
        message: "Electricity load unit must be 'kW'.",
      }),
    }),
  }),
  shutterType: z
    .array(
      z.enum(["Manual", "Automatic"], {
        errorMap: () => ({
          message: "Shutter type must be either 'Manual' or 'Automatic'.",
        }),
      })
    )
    .nonempty({ message: "At least one shutter type is required." }),
  advertisingSpace: z.boolean({
    required_error: "'advertisingSpace' field is required.",
    invalid_type_error: "'advertisingSpace' must be a boolean.",
  }),
});

// Define the additional features schema
const additionalFeaturesSchema = z.object({
  petFriendly: z.boolean({
    required_error: "'petFriendly' field is required.",
    invalid_type_error: "'petFriendly' must be a boolean.",
  }),
  childFriendly: z.boolean({
    required_error: "'childFriendly' field is required.",
    invalid_type_error: "'childFriendly' must be a boolean.",
  }),
  localIDAccepted: z.boolean({
    required_error: "'localIDAccepted' field is required.",
    invalid_type_error: "'localIDAccepted' must be a boolean.",
  }),
  alcoholAllowed: z.boolean({
    required_error: "'alcoholAllowed' field is required.",
    invalid_type_error: "'alcoholAllowed' must be a boolean.",
  }),
  visitorEntryPolicy: z.string({
    required_error: "'visitorEntryPolicy' field is required.",
    invalid_type_error: "'visitorEntryPolicy' must be a string.",
  }),
});

// Define the rules schema
const rulesSchema = z.object({
  operatingHours: z
    .string({
      required_error: "Operating hours are required.",
      invalid_type_error: "Operating hours must be a string.",
    })
    .min(1, "Operating hours cannot be empty."),
  smokingAllowed: z.boolean({
    required_error: "'smokingAllowed' field is required.",
    invalid_type_error: "'smokingAllowed' must be a boolean.",
  }),
  alcoholAllowed: z.boolean({
    required_error: "'alcoholAllowed' field is required.",
    invalid_type_error: "'alcoholAllowed' must be a boolean.",
  }),
  quietHours: z
    .string({
      required_error: "'quietHours' field is required.",
      invalid_type_error: "'quietHours' must be a string.",
    })
    .optional(),
  hourlyAvailability: z
    .object({
      available: z.boolean({
        required_error: "'hourlyAvailability.available' is required.",
        invalid_type_error: "'hourlyAvailability.available' must be a boolean.",
      }),
      timings: z
        .object({
          start: z
            .string({
              required_error: "Hourly availability start time is required.",
              invalid_type_error: "Start time must be a string.",
            })
            .optional(),
          end: z
            .string({
              required_error: "Hourly availability end time is required.",
              invalid_type_error: "End time must be a string.",
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),
});

// Define the nearby places schema with default values
const nearbyPlacesSchema = z.object({
  hospital: z.boolean().default(false),
  school: z.boolean().default(false),
  metro: z.boolean().default(false),
  mall: z.boolean().default(false),
  market: z.boolean().default(false),
  railway: z.boolean().default(false),
  airport: z.boolean().default(false),
  highway: z.boolean().default(false),
  busStation: z.boolean().default(false),
});

// Combine all schemas into one main schema
export const shopFormAmmentiesScehma = z.object({
  amenities: amenitiesSchema,
  buildingFeatures: buildingFeaturesSchema,
  shopFeatures: shopFeaturesSchema,
  additionalFeatures: additionalFeaturesSchema,
  rules: rulesSchema,
  nearbyPlaces: nearbyPlacesSchema,
});
