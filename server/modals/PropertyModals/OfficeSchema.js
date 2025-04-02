const mongoose = require("mongoose");
const { Schema } = mongoose;
const Property = require("./BasePropertySchema");

const officeSchema = new Schema(
  {
    subCategory: {
      type: String,
      enum: ["Office"],
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["For Sale", "For Rent", "Hourly Basis"],
      required: true,
    },
    propertyDetails: {
      propertyName: { type: String, required: true },
      officeType: {
        type: String,
        enum: ["Commercial Office", "Co-Working Space", "Business Center"],
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
        type: String,
        enum: ["Fully Furnished", "Semi-Furnished", "Unfurnished"],
        required: true,
      },
      furnishingDetails: {
        workstations: { type: Number },
        cabinRooms: { type: Number },
        meetingRooms: { type: Number },
        conferenceRooms: { type: Number },
        pantry: { type: Boolean },
        cafeteria: { type: Boolean },
        serverRoom: { type: Boolean },
        airConditioning: { type: Boolean },
      },
      floorDetails: {
        totalFloors: { type: Number },
        officeOnFloor: { type: Number },
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
      security24x7: { type: Boolean },
      cctv: { type: Boolean },
      powerBackup: { type: Boolean },
      lift: { type: Boolean },
      parking: {
        covered: { type: Boolean },
        open: { type: Boolean },
      },
      wifi: { type: Boolean },
      fireSafety: { type: Boolean },
      housekeeping: { type: Boolean },
      visitorParking: { type: Boolean },
      pantry: { type: Boolean },
      cafeteria: { type: Boolean },
      receptionService: { type: Boolean },
      gymFitnessCentre: { type: Boolean },
      breakoutArea: { type: Boolean },
    },
    buildingFeatures: {
      buildingType: {
        type: String,
        enum: ["Standalone Building", "IT Park", "Commercial Complex"],
        required: true,
      },
      grade: {
        type: String,
        enum: ["Grade A", "Grade B", "Grade C"],
        required: true,
      },
      fireSafetyCompliance: { type: Boolean },
      wheelChairAccessibility: { type: Boolean },
      greenBuildingCertification: { type: Boolean },
      rainWaterHarvesting: { type: Boolean },
      wasteManagement: { type: Boolean },
    },
    roomDetails: {
      totalCabins: { type: Number },
      workstations: { type: Number },
      meetingRooms: { type: Number },
      conferenceRooms: { type: Number },
      pantryType: { type: String, enum: ["Dry", "Wet"] },
      commonArea: {
        size: { type: Number },
        unit: { type: String, enum: ["sq ft"] },
      },
    },
    additionalFeatures: {
      petFriendly: { type: Boolean },
      coupleFriendly: { type: Boolean },
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
    availabilityStatus: { type: String, required: true },
    availableFrom: { type: Date, required: true },
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
    ageOfProperty: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Office = Property.discriminator("Office", officeSchema);

module.exports = Office;
