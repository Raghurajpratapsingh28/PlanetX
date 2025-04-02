import { z } from "zod";

export const hotelFormSchema = z.object({
  amenities: z.object({
    wifi: z.boolean().default(false),
    powerBackup: z.boolean().default(false),
    parking: z.object({
      twoWheeler: z.boolean().default(false),
      fourWheeler: z.boolean().default(false),
    }),
    hotWater: z.boolean().default(false),
    laundryService: z.boolean().default(false),
    housekeeping: z.boolean().default(false),
    roomService: z.boolean().default(false),
    airConditioning: z.boolean().default(false),
    restaurant: z.boolean().default(false),
    bar: z.boolean().default(false),
    conferenceRoom: z.boolean().default(false),
    gym: z.boolean().default(false),
    swimmingPool: z.boolean().default(false),
    lift: z.boolean().default(false),
    cctv: z.boolean().default(false),
    security24x7: z.boolean().default(false),
    firstAidKit: z.boolean().default(false),
    fireExtinguisher: z.boolean().default(false),
    wheelChairAccess: z.boolean().default(false),
  }),
  mealOptions: z.object({
    includedMeals: z.object({
      breakfast: z.boolean().default(false),
      lunch: z.boolean().default(false),
      dinner: z.boolean().default(false),
    }),
    availableCuisines: z.enum([
      "Indian",
      "Continental",
      "Chinese",
      "Italian",
      "Local Cuisine",
    ]),
    specialDietaryMeals: z.object({
      vegetarian: z.boolean().default(false),
      vegan: z.boolean().default(false),
      glutenFree: z.boolean().default(false),
      halal: z.boolean().default(false),
      kosher: z.boolean().default(false),
    }),
    mealCharges: z.object({
      breakfast: z
        .number()
        .min(0, { message: "Charge cannot be negative" })
        .default(0),
      lunch: z
        .number()
        .min(0, { message: "Charge cannot be negative" })
        .default(0),
      dinner: z
        .number()
        .min(0, { message: "Charge cannot be negative" })
        .default(0),
    }),
    diningOptions: z.object({
      inRoomDining: z.boolean().default(false),
      buffet: z.boolean().default(false),
      aLaCarte: z.boolean().default(false),
      commonDiningArea: z.boolean().default(false),
    }),
  }),
  dormitorySpecificDetails: z.object({
    totalBeds: z
      .number({ invalid_type_error: "Total Beds is required" })
      .min(0, { message: "Total Beds cannot be negative" }),
    bunkBedAvailability: z.boolean().default(false),
    lockerFacility: z.boolean().default(false),
    commonRoom: z.boolean().default(false),
    kitchenAccess: z.boolean().default(false),
    diningArea: z.boolean().default(false),
  }),
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
  rules: z.object({
    checkInTime: z.string().nonempty({ message: "Check-In Time is required" }),
    checkOutTime: z
      .string()
      .nonempty({ message: "Check-Out Time is required" }),
    smokingAllowed: z.boolean().default(false),
    alcoholAllowed: z.boolean().default(false),
    petsAllowed: z.boolean().default(false),
    quietHours: z.string().optional(),
    visitorPolicy: z.string().optional(),
    cancellationPolicy: z.string().optional(),
  }),
  bookingOptions: z.object({
    onlineBooking: z.boolean().default(false),
    walkIn: z.boolean().default(false),
    preBookingRequired: z.boolean().default(false),
    groupDiscounts: z.boolean().default(false),
    longStayDiscounts: z.boolean().default(false),
  }),
  additionalFeatures: z.object({
    childFriendly: z.boolean().default(false),
    coupleFriendly: z.boolean().default(false),
    seniorCitizenFriendly: z.boolean().default(false),
    localIDAccepted: z.boolean().default(false),
    pickupDropService: z.boolean().default(false),
    tourGuidance: z.boolean().default(false),
  }),
});
