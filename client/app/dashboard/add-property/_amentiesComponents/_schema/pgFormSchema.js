import { z } from "zod";

export const pgFormSchema = z.object({
  amenities: z.object({
    wifi: z.boolean().default(false),
    housekeeping: z.boolean().default(false),
    laundry: z.boolean().default(false),
    powerBackup: z.boolean().default(false),
    security24x7: z.boolean().default(false),
    commonRefrigerator: z.boolean().default(false),
    ROWater: z.boolean().default(false),
    cookingAllowed: z.boolean().default(false),
    twoWheelerParking: z.boolean().default(false),
    fourWheelerParking: z.boolean().default(false),
    airConditioning: z.boolean().default(false),
    geyser: z.boolean().default(false),
    lift: z.boolean().default(false),
    gym: z.boolean().default(false),
    swimmingPool: z.boolean().default(false),
    studyTable: z.boolean().default(false),
    wardrobe: z.boolean().default(false),
    TV: z.boolean().default(false),
    microwave: z.boolean().default(false),
    recreationRoom: z.boolean().default(false),
    hotWater: z.boolean().default(false),
    readingRoom: z.boolean().default(false),
    garden: z.boolean().default(false),
  }),
  rules: z.object({
    timings: z.object({
      entry: z.string().optional(),
      exit: z.string().optional(),
    }),
    guestPolicy: z.string().optional(),
    smokingAllowed: z.boolean().default(false),
    alcoholAllowed: z.boolean().default(false),
    petsAllowed: z.boolean().default(false),
  }),
  otherFeatures: z.object({
    separateEntryForRooms: z.boolean().default(false),
    noOpenDrainageAround: z.boolean().default(false),
    petFriendly: z.boolean().default(false),
    wheelChairFriendly: z.boolean().default(false),
    rainWaterHarvesting: z.boolean().default(false),
    cornerProperty: z.boolean().default(false),
  }),
  societyBuildingFeatures: z.object({
    swimmingPool: z.boolean().default(false),
    security24x7: z.boolean().default(false),
    gymFitnessCentre: z.boolean().default(false),
    shoppingCenter: z.boolean().default(false),
    clubHouse: z.boolean().default(false),
    childrenPlayArea: z.boolean().default(false),
    sportsFacilities: z.boolean().default(false),
    joggingWalkingTracks: z.boolean().default(false),
    gardenParks: z.boolean().default(false),
    communityHalls: z.boolean().default(false),
    cinemaRoom: z.boolean().default(false),
    libraryReadingRoom: z.boolean().default(false),
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
});
