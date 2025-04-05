const mongoose = require("mongoose");
const { Schema } = mongoose;
const Property = require("./BasePropertySchema");

const sharedWorkspaceSchema = new Schema(
  {
    subCategory: {
      type: String,
      enum: ["Shared Workspace"],
      required: false,
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
      required: false,
    },
    propertyDetails: {
      workspaceName: { type: String, required: false },
      type: {
        type: String,
        enum: [
          "Hot Desk",
          "Dedicated Desk",
          "Private Office",
          "Meeting Room",
          "Conference Room",
        ],
        required: false,
      },

      capacity: {
        totalSeats: { type: Number, required: false },
        availableSeats: { type: Number, required: false },
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
    description: { type: String, required: false },
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
      privateAccess: { type: Boolean, required: false },
      dedicatedSpace: { type: Boolean, required: false },
      lockableOffice: { type: Boolean, required: false },
      availabilityStatus: { type: String, required: false },
      availableFrom: { type: Date, required: false },
    },
    meetingAndEventSpaces: {
      projector: { type: Boolean, required: false },
      whiteboard: { type: Boolean, required: false },
      videoConferencing: { type: Boolean, required: false },
      soundSystem: { type: Boolean },
      cateringServices: { type: Boolean },
    },
    bookingDetails: {
      minimumBookingDuration: { type: String, required: false },
      maximumBookingDuration: { type: String, required: false },
      cancellationPolicy: { type: String, required: false },
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
        operatingHours: { type: String, required: false },
        quietHours: { type: String, required: false },
        petFriendly: { type: Boolean, required: false },
        smokingAllowed: { type: Boolean, required: false },
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
