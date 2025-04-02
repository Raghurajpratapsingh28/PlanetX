const mongoose = require("mongoose");
const { Schema } = mongoose;
const Property = require("./BasePropertySchema");

const warehouseStorageSchema = new Schema(
  {
    subCategory: {
      type: String,
      enum: ["Warehouse/Storage"],
      required: true,
    },
    transactionType: {
      type: [String],
      enum: ["For Sale", "For Rent", "Hourly Basis"],
      required: true,
    },
    propertyDetails: {
      propertyName: { type: String, required: true },
      warehouseType: {
        type: [String],
        enum: [
          "Standalone Warehouse",
          "Shared Space",
          "Cold Storage",
          "Container Yard",
          "Logistics Hub",
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
        enum: ["Unfurnished", "Semi-Furnished", "Fully Furnished"],
        required: true,
      },
      floorDetails: {
        totalFloors: { type: Number, required: true },
        propertyOnFloor: { type: Number, required: true },
      },
      floorLoadCapacity: {
        value: { type: Number, required: true },
        unit: { type: String, required: true, enum: ["kg/sq ft"] },
      },
      clearHeight: {
        value: { type: Number, required: true },
        unit: { type: String, required: true, enum: ["ft"] },
      },
      dockDoors: { type: Number, required: true },
      rampAccess: { type: Boolean, required: true },
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
      loadingDock: { type: Boolean },
      coldStorageFacility: { type: Boolean },
    },
    warehouseFeatures: {
      entryType: {
        type: String,
        enum: ["Single Entry", "Multiple Entry"],
        required: true,
      },
      shutterType: {
        type: String,
        enum: ["Manual", "Automatic"],
        required: true,
      },
      ventilation: {
        type: String,
        enum: ["Natural", "Mechanical"],
        required: true,
      },
      powerSupply: {
        type: {
          type: String,
          enum: ["3-Phase"],
          required: true,
        },
        capacity: {
          value: { type: Number, required: true },
          unit: { type: String, required: true, enum: ["kVA"] },
        },
      },
      waterSupply: { type: Boolean, required: true },
      flooringType: {
        type: String,
        enum: ["Concrete", "Epoxy", "Paved"],
        required: true,
      },
      hazardousMaterialStorage: { type: Boolean },
      temperatureControlled: { type: Boolean },
      fireSprinklerSystem: { type: Boolean },
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
      complianceCertificates: {
        fireSafetyCertificate: { type: Boolean, required: true },
        buildingStabilityCertificate: { type: Boolean, required: true },
        environmentalClearance: { type: Boolean },
      },
      rules: {
        operatingHours: { type: String, required: true },
        petFriendly: { type: Boolean },
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
    },
    ageOfProperty: { type: Number, required: true },
    availabilityStatus: { type: String, required: true },
    availableFrom: { type: Date, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const WarehouseStorage = Property.discriminator(
  "Warehouse",
  warehouseStorageSchema
);

module.exports = WarehouseStorage;
