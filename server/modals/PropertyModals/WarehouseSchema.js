const mongoose = require("mongoose");
const { Schema } = mongoose;
const Property = require("./BasePropertySchema");

const warehouseStorageSchema = new Schema(
  {
    subCategory: {
      type: String,
      enum: ["Warehouse/Storage"],
      required: false,
    },
    transactionType: {
      type: [String],
      enum: ["For Sale", "For Rent", "Hourly Basis"],
      required: false,
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
        enum: ["Unfurnished", "Semi-Furnished", "Fully Furnished"],
        required: false,
      },
      floorDetails: {
        totalFloors: { type: Number, required: false },
        propertyOnFloor: { type: Number, required: false },
      },
      floorLoadCapacity: {
        value: { type: Number, required: false },
        unit: { type: String, required: false, enum: ["kg/sq ft"] },
      },
      clearHeight: {
        value: { type: Number, required: false },
        unit: { type: String, required: false, enum: ["ft"] },
      },
      dockDoors: { type: Number, required: false },
      rampAccess: { type: Boolean, required: false },
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
      loadingDock: { type: Boolean },
      coldStorageFacility: { type: Boolean },
    },
    warehouseFeatures: {
      entryType: {
        type: String,
        enum: ["Single Entry", "Multiple Entry"],
        required: false,
      },
      shutterType: {
        type: String,
        enum: ["Manual", "Automatic"],
        required: false,
      },
      ventilation: {
        type: String,
        enum: ["Natural", "Mechanical"],
        required: false,
      },
      powerSupply: {
        type: {
          type: String,
          enum: ["3-Phase"],
          required: false,
        },
        capacity: {
          value: { type: Number, required: false },
          unit: { type: String, required: false, enum: ["kVA"] },
        },
      },
      waterSupply: { type: Boolean, required: false },
      flooringType: {
        type: String,
        enum: ["Concrete", "Epoxy", "Paved"],
        required: false,
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
        fireSafetyCertificate: { type: Boolean, required: false },
        buildingStabilityCertificate: { type: Boolean, required: false },
        environmentalClearance: { type: Boolean },
      },
      rules: {
        operatingHours: { type: String, required: false },
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
    ageOfProperty: { type: Number, required: false },
    availabilityStatus: { type: String, required: false },
    availableFrom: { type: Date, required: false },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

const WarehouseStorage = Property.discriminator(
  "Warehouse",
  warehouseStorageSchema
);

module.exports = WarehouseStorage;
