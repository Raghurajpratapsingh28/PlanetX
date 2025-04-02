const mongoose = require("mongoose")
const { Schema } = mongoose;
const Property = require("./BasePropertySchema.js");

const pgSchema = new Schema(
  {
    subCategory: {
      type: [String],
      enum: ["Boys PG", "Girls PG", "Co-ed PG", "Couples PG"],
      required: true,
    },
    roomDetails: {
      sharingType: {
        type: [String],
        enum: [
          "Single Sharing",
          "Double Sharing",
          "Triple Sharing",
          "Quad Sharing",
          "Dormitory",
        ],
        required: true,
      },
      bedCount: { type: Number, required: true },
      attachedBathroom: { type: Boolean, required: true },
      balcony: { type: Boolean, required: true },
      roomSize: { type: String, required: true },
    },
    mealDetails: {
      mealIncluded: { type: Boolean, required: true },
      mealType: {
        type: [String],
        enum: ["Vegetarian", "Non-Vegetarian", "Both"],
        required: true,
      },
      mealFrequency: {
        type: [String],
        enum: ["Breakfast", "Lunch", "Dinner"],
        required: true,
      },
      customizationAllowed: { type: Boolean, required: true },
    },
    availabilityStatus: { type: String, required: true },
    availableFrom: { type: Date, required: true },
    ageOfProperty: { type: Number, required: true },
    description: { type: String, required: true },
    amenities: {
      wifi: { type: Boolean },
      housekeeping: { type: Boolean },
      laundry: { type: Boolean },
      powerBackup: { type: Boolean },
      security24x7: { type: Boolean },
      commonRefrigerator: { type: Boolean },
      ROWater: { type: Boolean },
      cookingAllowed: { type: Boolean },
      twoWheelerParking: { type: Boolean },
      fourWheelerParking: { type: Boolean },
      airConditioning: { type: Boolean },
      geyser: { type: Boolean },
      lift: { type: Boolean },
      gym: { type: Boolean },
      swimmingPool: { type: Boolean },
      studyTable: { type: Boolean },
      wardrobe: { type: Boolean },
      TV: { type: Boolean },
      microwave: { type: Boolean },
      recreationRoom: { type: Boolean },
      hotWater: { type: Boolean },
      readingRoom: { type: Boolean },
      garden: { type: Boolean },
    },
    rules: {
      timings: {
        entry: { type: String },
        exit: { type: String },
      },
      guestPolicy: { type: String },
      smokingAllowed: { type: Boolean },
      alcoholAllowed: { type: Boolean },
      petsAllowed: { type: Boolean },
    },
    otherFeatures: {
      separateEntryForRooms: { type: Boolean },
      noOpenDrainageAround: { type: Boolean },
      petFriendly: { type: Boolean },
      wheelChairFriendly: { type: Boolean },
      rainWaterHarvesting: { type: Boolean },
      cornerProperty: { type: Boolean },
    },
    societyBuildingFeatures: {
      swimmingPool: { type: Boolean },
      security24x7: { type: Boolean },
      gymFitnessCentre: { type: Boolean },
      shoppingCenter: { type: Boolean },
      clubHouse: { type: Boolean },
      childrenPlayArea: { type: Boolean },
      sportsFacilities: { type: Boolean },
      joggingWalkingTracks: { type: Boolean },
      gardenParks: { type: Boolean },
      communityHalls: { type: Boolean },
      cinemaRoom: { type: Boolean },
      libraryReadingRoom: { type: Boolean },
    },
    nearbyPlaces: {
      hospital: { type: Boolean, default: false },
      school: { type: Boolean, default: false },
      metro: { type: Boolean, default: false },
      mall: { type: Boolean, default: false },
      market: { type: Boolean, default: false },
      railway: { type: Boolean, default: false },
      airport: { type: Boolean, default: false },
      highway: { type: Boolean, default: false },
      busStation: { type: Boolean, default: false },
    },
    pricing: {
      monthlyRent: { type: Number, required: true },
      securityDeposit: { type: Number, required: true },
      electricityCharges: { type: String, required: true },
      otherCharges: { type: String },
    },
  },
  { timestamps: true }
);

const PG = Property.discriminator("PG", pgSchema);

module.exports = PG;
