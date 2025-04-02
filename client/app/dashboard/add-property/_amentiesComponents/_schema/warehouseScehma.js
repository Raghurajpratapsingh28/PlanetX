import { z } from "zod";

export const WarehouseSchema = z.object({
  amenities: z.object({
    parking: z.object({
      covered: z.boolean({
        required_error: "Number of covered parking spots is required",
        invalid_type_error: "Covered parking spots must be a boolean",
      }),
      open: z.boolean({
        required_error: "Number of open parking spots is required",
        invalid_type_error: "Open parking spots must be a boolean",
      }),
    }),
    visitorParking: z.boolean({
      required_error: "Visitor parking information is required",
      invalid_type_error: "Visitor parking must be a boolean",
    }),
    powerBackup: z.boolean({
      required_error: "Power backup information is required",
      invalid_type_error: "Power backup must be a boolean",
    }),
    security24x7: z.boolean({
      required_error: "24/7 security information is required",
      invalid_type_error: "24/7 security must be a boolean",
    }),
    cctv: z.boolean({
      required_error: "CCTV information is required",
      invalid_type_error: "CCTV must be a boolean",
    }),
    fireSafety: z.boolean({
      required_error: "Fire safety information is required",
      invalid_type_error: "Fire safety must be a boolean",
    }),
    wifi: z.boolean({
      required_error: "Wi-Fi information is required",
      invalid_type_error: "Wi-Fi must be a boolean",
    }),
    elevator: z.boolean({
      required_error: "Elevator information is required",
      invalid_type_error: "Elevator must be a boolean",
    }),
    maintenanceStaff: z.boolean({
      required_error: "Maintenance staff information is required",
      invalid_type_error: "Maintenance staff must be a boolean",
    }),
    loadingDock: z.boolean({
      required_error: "Loading dock information is required",
      invalid_type_error: "Loading dock must be a boolean",
    }),
    coldStorageFacility: z.boolean({
      required_error: "Cold storage facility information is required",
      invalid_type_error: "Cold storage facility must be a boolean",
    }),
  }),
  warehouseFeatures: z.object({
    entryType: z.enum(["Single Entry", "Multiple Entry"], {
      required_error: "Entry type is required",
    }),
    shutterType: z.enum(["Manual", "Automatic"], {
      required_error: "Shutter type is required",
    }),
    ventilation: z.enum(["Natural", "Mechanical"], {
      required_error: "Ventilation type is required",
    }),
    powerSupply: z.object({
      type: z.enum(["3-Phase"], {
        required_error: "Power supply type is required",
      }),
      capacity: z.object({
        value: z.number({
          required_error: "Power capacity is required",
          invalid_type_error: "Power capacity must be a number",
        }),
        unit: z.enum(["kVA"], {
          required_error: "Power capacity unit is required",
        }),
      }),
    }),
    waterSupply: z.boolean({
      required_error: "Water supply information is required",
      invalid_type_error: "Water supply must be a boolean",
    }),
    flooringType: z.enum(["Concrete", "Epoxy", "Paved"], {
      required_error: "Flooring type is required",
    }),
    hazardousMaterialStorage: z.boolean().optional(),
    temperatureControlled: z.boolean().optional(),
    fireSprinklerSystem: z.boolean().optional(),
  }),
  additionalDetails: z.object({
    nearbyPlaces: z.object({
      hospital: z.boolean().default(false),
      school: z.boolean().default(false),
      metro: z.boolean().default(false),
      mall: z.boolean().default(false),
      market: z.boolean().default(false),
      railway: z.boolean().default(false),
      airport: z.boolean().default(false),
      highway: z.boolean().default(false),
      busStation: z.boolean().default(false),
    }),
    complianceCertificates: z.object({
      fireSafetyCertificate: z.boolean({
        required_error: "Fire safety certificate is required",
        invalid_type_error: "Fire safety certificate must be a boolean",
      }),
      buildingStabilityCertificate: z.boolean({
        required_error: "Building stability certificate is required",
        invalid_type_error: "Building stability certificate must be a boolean",
      }),
      environmentalClearance: z.boolean().optional(),
    }),
    rules: z.object({
      operatingHours: z.string({
        required_error: "Operating hours is required",
      }),
      petFriendly: z.boolean().optional(),
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
  }),
});
