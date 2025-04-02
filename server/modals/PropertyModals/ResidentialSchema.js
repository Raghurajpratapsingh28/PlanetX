const mongoose = require("mongoose");
const Property = require("./BasePropertySchema");
const { Schema } = mongoose;

const residentialSchema = new Schema(
  {
    about: {
      bedrooms: { type: Number, required: true },
      bathrooms: { type: Number, required: true },
      balconies: { type: Number, required: true },
    },
    propertyArea: {
      carpetArea: { type: Number, required: true },
      builtUpArea: { type: Number, required: true },
    },
    otherRooms: {
      poojaRoom: { type: Boolean, default: false },
      guestRoom: { type: Boolean, default: false },
      servantRoom: { type: Boolean, default: false },
      studyRoom: { type: Boolean, default: false },
    },
    furnishingStatus: {
      type: String,
      required: true,
    },
    furnishingDetails: {
      fans: { type: Number, default: 0 },
      lights: { type: Number, default: 0 },
      tv: { type: Number, default: 0 },
      beds: { type: Number, default: 0 },
      ac: { type: Number, default: 0 },
      wardrobes: { type: Number, default: 0 },
      exhaustFans: { type: Number, default: 0 },
      curtains: { type: Number, default: 0 },
      floorLamps: { type: Number, default: 0 },
      diningTable: { type: Boolean, default: false },
      sofa: { type: Boolean, default: false },
      stove: { type: Boolean, default: false },
      kitchenCabinets: { type: Boolean, default: false },
      chimney: { type: Boolean, default: false },
      coffeeTable: { type: Boolean, default: false },
      refrigerator: { type: Boolean, default: false },
      microwave: { type: Boolean, default: false },
      dishwasher: { type: Boolean, default: false },
      waterPurifier: { type: Boolean, default: false },
      washingMachine: { type: Boolean, default: false },
    },
    totalFloors: { type: Number, required: true },
    propertyOnFloor: { type: Number, required: true },
    flatNumber: { type: String },
    parking: {
      covered: { type: Number, default: 0 },
      open: { type: Number, default: 0 },
    },
    amenities: {
      maintenanceStaff: { type: Boolean, default: false },
      vastuCompliant: { type: Boolean, default: false },
      securityFireAlarm: { type: Boolean, default: false },
      visitorParking: { type: Boolean, default: false },
      gasLine: { type: Boolean, default: false },
      wifiCable: { type: Boolean, default: false },
    },
    otherFeatures: {
      separateEntryForServantRoom: { type: Boolean, default: false },
      noOpenDrainageAround: { type: Boolean, default: false },
      petFriendly: { type: Boolean, default: false },
      wheelchairFriendly: { type: Boolean, default: false },
      rainWaterHarvesting: { type: Boolean, default: false },
      cornerProperty: { type: Boolean, default: false },
    },
    societyBuildingFeatures: {
      swimmingPool: { type: Boolean, default: false },
      security24x7: { type: Boolean, default: false },
      gymFitnessCentre: { type: Boolean, default: false },
      shoppingCenter: { type: Boolean, default: false },
      clubHouse: { type: Boolean, default: false },
      childrensPlayArea: { type: Boolean, default: false },
      sportsFacilities: { type: Boolean, default: false },
      joggingWalkingTracks: { type: Boolean, default: false },
      gardenParks: { type: Boolean, default: false },
      communityHalls: { type: Boolean, default: false },
      cinemaRoom: { type: Boolean, default: false },
      libraryReadingRoom: { type: Boolean, default: false },
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
    availabilityStatus: {
      type: String,
      required: true,
    },
    pricing: {
      expectedPrice: { type: Number, required: true },
      PricePerSqft: { type: Number, required: true },
      maintenanceFrequency: {
        type: String,
        enum: ["monthly", "yearly", "quarterly"],
      },
      maintenancePrice: {
        type: Number,
      },
    },
    availableFrom: { type: Date },
    ageOfProperty: { type: Number },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Residential = Property.discriminator("Residential", residentialSchema);

module.exports = Residential;
