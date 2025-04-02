const mongoose = require("mongoose");
const { Schema } = mongoose;
const Property = require("./BasePropertySchema");

const sharedWorkspaceSchema = new Schema(
  {
    subCategory: {
      type: String,
      enum: ["Shared Workspace"],
      required: true,
    },
    types: {
      type: [String],
      enum: [
        "Hot Desk",
        "Dedicated Desk",
        "Private Office",
        "Meeting Room",
        "Conference Room",
      ],
      required: true,
    },
    propertyDetails: {
      workspaceName: { type: String, required: true },
      type: {
        type: String,
        enum: [
          "Hot Desk",
          "Dedicated Desk",
          "Private Office",
          "Meeting Room",
          "Conference Room",
        ],
        required: true,
      },

      capacity: {
        totalSeats: { type: Number, required: true },
        availableSeats: { type: Number, required: true },
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
    description: { type: String, required: true },
    amenities: {
      highSpeedWiFi: { type: Boolean, default: false },
      powerBackup: { type: Boolean, default: false },
      airConditioning: { type: Boolean, default: false },
      printingServices: { type: Boolean, default: false },
      conferenceRooms: { type: Boolean, default: false },
      phoneBooths: { type: Boolean, default: false },
      teaCoffee: { type: Boolean, default: false },
      parking: { type: Boolean, default: false },
      access24x7: { type: Boolean, default: false },
      security: { type: Boolean, default: false },
      receptionServices: { type: Boolean, default: false },
    },
    workspaceFeatures: {
      privateAccess: { type: Boolean, required: true },
      dedicatedSpace: { type: Boolean, required: true },
      lockableOffice: { type: Boolean, required: true },
      availabilityStatus: { type: String, required: true },
      availableFrom: { type: Date, required: true },
    },
    meetingAndEventSpaces: {
      projector: { type: Boolean, required: true },
      whiteboard: { type: Boolean, required: true },
      videoConferencing: { type: Boolean, required: true },
      soundSystem: { type: Boolean },
      cateringServices: { type: Boolean },
    },
    bookingDetails: {
      minimumBookingDuration: { type: String, required: true },
      maximumBookingDuration: { type: String, required: true },
      cancellationPolicy: { type: String, required: true },
    },
    additionalDetails: {
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
      rules: {
        operatingHours: { type: String, required: true },
        quietHours: { type: String, required: true },
        petFriendly: { type: Boolean, required: true },
        smokingAllowed: { type: Boolean, required: true },
      },
    },
    ageOfProperty: { type: Number },
  },
  { timestamps: true }
);

const SharedWorkspace = Property.discriminator(
  "Shared Warehouse",
  sharedWorkspaceSchema
);

module.exports = SharedWorkspace;
