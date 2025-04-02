const mongoose = require("mongoose");
const Property = require("./BasePropertySchema");
const { Schema } = mongoose;

const eventSpaceSchema = new Schema(
  {
    subCategory: {
      type: String,
      enum: ["Event Space"],
      required: true,
    },
    type: {
      type: String,
      enum: ["Event Space"],
      required: true,
    },

    propertyDetails: {
      totalGuests: { type: Number, required: true },
      seatingArrangement: {
        theaterStyle: { type: Number, required: true },
        classroomStyle: { type: Number, required: true },
        banquetStyle: { type: Number, required: true },
        conferenceStyle: { type: Number, required: true },
      },
    },
    pricing: {
      price: {
        amount: { type: Number, required: true },
        currency: { type: String, required: true, enum: ["INR"] },
      },
      maintenanceCharges: {
        amount: { type: Number, required: true },
        currency: { type: String, required: true, enum: ["INR"] },
        frequency: { type: String, required: true, enum: ["Monthly"] },
      },
      rentalDetails: {
        monthlyRent: { type: Number },
        securityDeposit: { type: Number },
        hourlyRent: { type: Number },
      },
    },
    amenities: {
      projector: { type: Boolean, required: true },
      screen: { type: Boolean, required: true },
      soundSystem: { type: Boolean, required: true },
      lightingSetup: { type: Boolean, required: true },
      airConditioning: { type: Boolean, required: true },
      WiFi: { type: Boolean, required: true },
      cateringServices: { type: Boolean, required: true },
      decorationServices: { type: Boolean, required: true },
      stageSetup: { type: Boolean, required: true },
      podium: { type: Boolean, required: true },
      parkingFacilities: {
        covered: { type: Boolean, required: true },
        open: { type: Boolean, required: true },
      },
      securityServices: { type: Boolean, required: true },
      cleaningServices: { type: Boolean, required: true },
    },
    facilities: {
      restrooms: { type: Boolean, required: true },
      changingRoom: { type: Boolean, required: true },
      powerBackup: { type: Boolean, required: true },
      photoBooth: { type: Boolean, required: true },
    },
    availableSpaces: {
      indoorSpace: { type: Boolean, required: true },
      outdoorSpace: { type: Boolean, required: true },
      balconyAccess: { type: Boolean, required: true },
    },
    bookingDetails: {
      minimumBookingDuration: { type: String, required: true },
      maximumBookingDuration: { type: String, required: true },
      cancellationPolicy: { type: String, required: true },
    },
    additionalServices: {
      eventPlannerSupport: { type: Boolean, required: true },
      technicalStaffOnSite: { type: Boolean, required: true },
      customizableLayouts: { type: Boolean, required: true },
      loungeArea: { type: Boolean, required: true },
    },
    rules: {
      alcoholAllowed: { type: Boolean, required: true },
      smokingAllowed: { type: Boolean, required: true },
      petFriendly: { type: Boolean, required: true },
      noiseLimit: { type: String, required: true },
      decorRestrictions: { type: String, required: true },
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
    availabilityStatus: { type: String, required: true },
    ageOfProperty: { type: Number },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const EventSpace = Property.discriminator("EventSpace", eventSpaceSchema);

module.exports = EventSpace;
