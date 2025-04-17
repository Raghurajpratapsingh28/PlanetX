const mongoose = require("mongoose");
const Property = require("./BasePropertySchema.js");


if (!Property) {
  throw new Error("Property model must be initialized before creating PG.");
}

const Schema = mongoose.Schema;

const pgSchema = new Schema(
  {
    subCategory: {
      type: [String],
      enum: ["Boys PG", "Girls PG", "Co-ed PG", "Couples PG"],
      require: false,
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
        required: false,
      },
      bedCount: { type: Number, required: false },
      attachedBathroom: { type: Boolean, required: false },
      balcony: { type: Boolean, required: false },
      roomSize: { type: String, required: false },
    },
    mealDetails: {
      mealIncluded: { type: Boolean, required: false },
      mealType: {
        type: [String],
        enum: ["Vegetarian", "Non-Vegetarian", "Both"],
        required: false,
      },
      mealFrequency: {
        type: [String],
        enum: ["Breakfast", "Lunch", "Dinner"],
        required: false,
      },
      customizationAllowed: { type: Boolean, required: false },
    },
    availabilityStatus: { type: String, required: false },
    availableFrom: { type: Date, required: false },
    ageOfProperty: { type: Number, required: false },
    description: { type: String, required: false },
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
      monthlyRent: { type: Number, required: false },
      securityDeposit: { type: Number, required: false },
      electricityCharges: { type: String, required: false },
      otherCharges: { type: String },
    },
  },
  { timestamps: true }
);

const PG = Property.discriminator("Pg", pgSchema);

module.exports = PG;
