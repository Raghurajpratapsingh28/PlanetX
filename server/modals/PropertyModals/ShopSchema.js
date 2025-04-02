const mongoose = require("mongoose");
const { Schema } = mongoose;
const Property = require("./BasePropertySchema");

const retailShopSchema = new Schema(
  {
    subCategory: {
      type: String,
      enum: ["Retail/Shop"],
      required: true,
    },
    transactionType: {
      type: [String],
      enum: ["For Sale", "For Rent", "Hourly Basis"],
      required: true,
    },
    propertyDetails: {
      propertyName: { type: String, required: true },
      shopType: {
        type: String,
        enum: [
          "Standalone Shop",
          "Shopping Mall Unit",
          "High-Street Retail",
          "Kiosk",
        ],
        required: true,
      },
      builtUpArea: {
        size: { type: Number, required: true },
        unit: { type: String, required: true, enum: ["sq ft"] },
      },
      carpetArea: {
        size: { type: Number, required: true },
        unit: { type: String, required: true, enum: ["sq ft"] },
      },
      furnishedStatus: {
        type: [String],
        enum: ["Fully Furnished", "Semi-Furnished", "Unfurnished"],
        required: true,
      },
      furnishingDetails: {
        shelves: { type: Number, required: true },
        displayRacks: { type: Number, required: true },
        cashCounter: { type: Number, required: true },
        airConditioning: { type: Boolean, required: true },
        cctvCameras: { type: Number, required: true },
        powerBackup: { type: Boolean, required: true },
        washroom: { type: Boolean, required: true },
        pantry: { type: Boolean, required: true },
      },
      floorDetails: {
        totalFloors: { type: Number, required: true },
        shopOnFloor: { type: Number, required: true },
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
      parking: {
        covered: { type: Boolean },
        open: { type: Boolean },
      },
      visitorParking: { type: Boolean },
      powerBackup: { type: Boolean },
      security24x7: { type: Boolean },
      cctv: { type: Boolean },
      fireSafety: { type: Boolean },
      wifi: { type: Boolean },
      elevator: { type: Boolean },
      maintenanceStaff: { type: Boolean },
    },
    buildingFeatures: {
      buildingType: {
        type: String,
        enum: ["Standalone Building", "Shopping Mall", "Mixed-Use Complex"],
        required: true,
      },
      fireSafetyCompliance: { type: Boolean },
      wheelChairAccessibility: { type: Boolean },
      greenBuildingCertification: { type: Boolean },
      rainWaterHarvesting: { type: Boolean },
      wasteManagement: { type: Boolean },
    },
    shopFeatures: {
      shopFrontage: {
        length: { type: Number, required: true },
        unit: { type: String, required: true, enum: ["ft"] },
      },
      height: {
        value: { type: Number, required: true },
        unit: { type: String, required: true, enum: ["ft"] },
      },
      parkingAvailability: {
        type: [String],
        enum: ["Dedicated", "Public", "None"],
        required: true,
      },
      waterSupply: { type: Boolean, required: true },
      electricityLoad: {
        value: { type: Number, required: true },
        unit: { type: String, required: true, enum: ["kW"] },
      },
      shutterType: {
        type: [String],
        enum: ["Manual", "Automatic"],
        required: true,
      },
      advertisingSpace: { type: Boolean, required: true },
    },
    additionalFeatures: {
      petFriendly: { type: Boolean },
      childFriendly: { type: Boolean },
      localIDAccepted: { type: Boolean },
      alcoholAllowed: { type: Boolean },
      visitorEntryPolicy: { type: String },
    },
    rules: {
      operatingHours: { type: String, required: true },
      smokingAllowed: { type: Boolean },
      alcoholAllowed: { type: Boolean },
      quietHours: { type: String },
      hourlyAvailability: {
        available: { type: Boolean },
        timings: {
          start: { type: String },
          end: { type: String },
        },
      },
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
    availableFrom: { type: Date, required: true },
    ageOfProperty: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const RetailShop = Property.discriminator("Shop", retailShopSchema);

module.exports = RetailShop;
