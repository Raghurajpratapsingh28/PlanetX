const mongoose = require("mongoose");
const Property = require("./BasePropertySchema");
const { Schema } = mongoose;

const eventSpaceSchema = new Schema(
  {
    subCategory: {
      type: String,
      enum: ["Event Space"],
      required: false,
    },
    type: {
      type: String,
      enum: ["Event Space"],
      required: false,
    },

    propertyDetails: {
      totalGuests: { type: Number, required: false },
      seatingArrangement: {
        theaterStyle: { type: Number, required: false },
        classroomStyle: { type: Number, required: false },
        banquetStyle: { type: Number, required: false },
        conferenceStyle: { type: Number, required: false },
      },
    },
    pricing: {
      price: {
        amount: { type: Number, required: false },
        currency: { type: String, required: false, enum: ["INR"] },
      },
      maintenanceCharges: {
        amount: { type: Number, required: false },
        currency: { type: String, required: false, enum: ["INR"] },
        frequency: { type: String, required: false, enum: ["Monthly"] },
      },
      rentalDetails: {
        monthlyRent: { type: Number },
        securityDeposit: { type: Number },
        hourlyRent: { type: Number },
      },
    },
    amenities: {
      projector: { type: Boolean, required: false },
      screen: { type: Boolean, required: false },
      soundSystem: { type: Boolean, required: false },
      lightingSetup: { type: Boolean, required: false },
      airConditioning: { type: Boolean, required: false },
      WiFi: { type: Boolean, required: false },
      cateringServices: { type: Boolean, required: false },
      decorationServices: { type: Boolean, required: false },
      stageSetup: { type: Boolean, required: false },
      podium: { type: Boolean, required: false },
      parkingFacilities: {
        covered: { type: Boolean, required: false },
        open: { type: Boolean, required: false },
      },
      securityServices: { type: Boolean, required: false },
      cleaningServices: { type: Boolean, required: false },
    },
    facilities: {
      restrooms: { type: Boolean, required: false },
      changingRoom: { type: Boolean, required: false },
      powerBackup: { type: Boolean, required: false },
      photoBooth: { type: Boolean, required: false },
    },
    availableSpaces: {
      indoorSpace: { type: Boolean, required: false },
      outdoorSpace: { type: Boolean, required: false },
      balconyAccess: { type: Boolean, required: false },
    },
    bookingDetails: {
      minimumBookingDuration: { type: String, required: false },
      maximumBookingDuration: { type: String, required: false },
      cancellationPolicy: { type: String, required: false },
    },
    additionalServices: {
      eventPlannerSupport: { type: Boolean, required: false },
      technicalStaffOnSite: { type: Boolean, required: false },
      customizableLayouts: { type: Boolean, required: false },
      loungeArea: { type: Boolean, required: false },
    },
    rules: {
      alcoholAllowed: { type: Boolean, required: false },
      smokingAllowed: { type: Boolean, required: false },
      petFriendly: { type: Boolean, required: false },
      noiseLimit: { type: String, required: false },
      decorRestrictions: { type: String, required: false },
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
    availabilityStatus: { type: String, required: false },
    ageOfProperty: { type: Number },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

const EventSpace = Property.discriminator("EventSpace", eventSpaceSchema);

module.exports = EventSpace;
