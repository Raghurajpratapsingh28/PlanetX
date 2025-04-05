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
      required: false,
    },
    propertyDetails: {
      propertyName: { type: String, required: false },
      shopType: {
        type: String,
        enum: [
          "Standalone Shop",
          "Shopping Mall Unit",
          "High-Street Retail",
          "Kiosk",
        ],
        required: false,
      },
      builtUpArea: {
        size: { type: Number, required: false },
        unit: { type: String, required: false, enum: ["sq ft"] },
      },
      carpetArea: {
        size: { type: Number, required: false },
        unit: { type: String, required: false, enum: ["sq ft"] },
      },
      furnishedStatus: {
        type: [String],
        enum: ["Fully Furnished", "Semi-Furnished", "Unfurnished"],
        required: true,
      },
      furnishingDetails: {
        shelves: { type: Number, required: false },
        displayRacks: { type: Number, required:false },
        cashCounter: { type: Number, required:false },
        airConditioning: { type: Boolean, required:false },
        cctvCameras: { type: Number, required:false },
        powerBackup: { type: Boolean, required:false },
        washroom: { type: Boolean, required:false },
        pantry: { type: Boolean, required:false },
      },
      floorDetails: {
        totalFloors: { type: Number, required: false },
        shopOnFloor: { type: Number, required: false },
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
        required: false,
      },
      fireSafetyCompliance: { type: Boolean },
      wheelChairAccessibility: { type: Boolean },
      greenBuildingCertification: { type: Boolean },
      rainWaterHarvesting: { type: Boolean },
      wasteManagement: { type: Boolean },
    },
    shopFeatures: {
      shopFrontage: {
        length: { type: Number, required: false },
        unit: { type: String, required: false, enum: ["ft"] },
      },
      height: {
        value: { type: Number, required: false },
        unit: { type: String, required: false, enum: ["ft"] },
      },
      parkingAvailability: {
        type: [String],
        enum: ["Dedicated", "Public", "None"],
        required: false,
      },
      waterSupply: { type: Boolean, required: false },
      electricityLoad: {
        value: { type: Number, required: false },
        unit: { type: String, required: false, enum: ["kW"] },
      },
      shutterType: {
        type: [String],
        enum: ["Manual", "Automatic"],
        required: false,
      },
      advertisingSpace: { type: Boolean, required: false },
    },
    additionalFeatures: {
      petFriendly: { type: Boolean },
      childFriendly: { type: Boolean },
      localIDAccepted: { type: Boolean },
      alcoholAllowed: { type: Boolean },
      visitorEntryPolicy: { type: String },
    },
    rules: {
      operatingHours: { type: String, required: false },
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
    availabilityStatus: { type: String, required: false },
    availableFrom: { type: Date, required: false },
    ageOfProperty: { type: Number, required: false },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

const RetailShop = Property.discriminator("Shop", retailShopSchema);

module.exports = RetailShop;
