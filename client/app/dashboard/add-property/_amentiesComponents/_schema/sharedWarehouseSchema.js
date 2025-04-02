import { z } from "zod";

export const sharedWorkspaceAmentiesSchema = z.object({
  amenities: z.object({
    highSpeedWiFi: z.boolean({
      required_error: "High-speed WiFi information is required",
      invalid_type_error: "High-speed WiFi must be a boolean",
    }),
    powerBackup: z.boolean({
      required_error: "Power backup information is required",
      invalid_type_error: "Power backup must be a boolean",
    }),
    airConditioning: z.boolean({
      required_error: "Air conditioning information is required",
      invalid_type_error: "Air conditioning must be a boolean",
    }),
    printingServices: z.boolean({
      required_error: "Printing services information is required",
      invalid_type_error: "Printing services must be a boolean",
    }),
    conferenceRooms: z.boolean({
      required_error: "Conference rooms information is required",
      invalid_type_error: "Conference rooms must be a boolean",
    }),
    phoneBooths: z.boolean({
      required_error: "Phone booths information is required",
      invalid_type_error: "Phone booths must be a boolean",
    }),
    teaCoffee: z.boolean({
      required_error: "Tea/Coffee availability information is required",
      invalid_type_error: "Tea/Coffee must be a boolean",
    }),
    parking: z.boolean({
      required_error: "Parking availability information is required",
      invalid_type_error: "Parking must be a boolean",
    }),
    access24x7: z.boolean({
      required_error: "24x7 access information is required",
      invalid_type_error: "24x7 access must be a boolean",
    }),
    security: z.boolean({
      required_error: "Security information is required",
      invalid_type_error: "Security must be a boolean",
    }),
    receptionServices: z.boolean({
      required_error: "Reception services information is required",
      invalid_type_error: "Reception services must be a boolean",
    }),
  }),
  workspaceFeatures: z.object({
    privateAccess: z.boolean({
      required_error: "Private access is required",
      invalid_type_error: "Private access must be a boolean",
    }),
    dedicatedSpace: z.boolean({
      required_error: "Dedicated space is required",
      invalid_type_error: "Dedicated space must be a boolean",
    }),
    lockableOffice: z.boolean({
      required_error: "Lockable office is required",
      invalid_type_error: "Lockable office must be a boolean",
    }),
    availabilityStatus: z.string({
      required_error: "Availability status is required",
      invalid_type_error: "Availability status must be a string",
    }),
    availableFrom: z.preprocess(
      (arg) => {
        if (typeof arg === "string" && arg.trim() !== "") {
          return new Date(arg);
        }
        return arg;
      },
      z.date({
        required_error: "Available from date is required",
        invalid_type_error: "Available from must be a date",
      })
    ),
  }),
  meetingAndEventSpaces: z.object({
    projector: z.boolean({
      required_error: "Projector availability is required",
      invalid_type_error: "Projector must be a boolean",
    }),
    whiteboard: z.boolean({
      required_error: "Whiteboard availability is required",
      invalid_type_error: "Whiteboard must be a boolean",
    }),
    videoConferencing: z.boolean({
      required_error: "Video conferencing availability is required",
      invalid_type_error: "Video conferencing must be a boolean",
    }),
    soundSystem: z.boolean().optional(),
    cateringServices: z.boolean().optional(),
  }),
  bookingDetails: z.object({
    minimumBookingDuration: z.string({
      required_error: "Minimum booking duration is required",
      invalid_type_error: "Minimum booking duration must be a string",
    }),
    maximumBookingDuration: z.string({
      required_error: "Maximum booking duration is required",
      invalid_type_error: "Maximum booking duration must be a string",
    }),
    cancellationPolicy: z.string({
      required_error: "Cancellation policy is required",
      invalid_type_error: "Cancellation policy must be a string",
    }),
  }),
  additionalDetails: z.object({
    nearbyPlaces: z.object({
      hospital: z.boolean(),
      school: z.boolean(),
      metro: z.boolean(),
      mall: z.boolean(),
      market: z.boolean(),
      railway: z.boolean(),
      airport: z.boolean(),
      highway: z.boolean(),
      busStation: z.boolean(),
    }),
    rules: z.object({
      operatingHours: z.string({
        required_error: "Operating hours is required",
        invalid_type_error: "Operating hours must be a string",
      }),
      quietHours: z.string({
        required_error: "Quiet hours is required",
        invalid_type_error: "Quiet hours must be a string",
      }),
      petFriendly: z.boolean({
        required_error: "Pet-friendly status is required",
        invalid_type_error: "Pet-friendly status must be a boolean",
      }),
      smokingAllowed: z.boolean({
        required_error: "Smoking policy is required",
        invalid_type_error: "Smoking policy must be a boolean",
      }),
    }),
  }),
});
