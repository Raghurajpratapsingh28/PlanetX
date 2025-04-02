const mongoose = require("mongoose");
const { Schema } = mongoose;
const Property = require("./BasePropertySchema");

const hotelSchema = new Schema(
  {
    subCategory: {
      type: [String],
      enum: ["Hotel", "Dormitory"],
      required: true,
    },
    propertyDetails: {
      propertyName: { type: String, required: true },
      propertyType: {
        type: [String],
        enum: [
          "Budget",
          "Luxury",
          "Boutique",
          "Business",
          "Heritage",
          "Resort",
          "Hostel",
          "Shared Dormitory",
        ],
        required: true,
      },
      starRating: { type: Number, min: 1, max: 5, required: true },
      totalRooms: { type: Number, required: true },
      roomTypes: {
        type: [String],
        enum: [
          "Single Room",
          "Double Room",
          "Suite",
          "Dormitory Bed",
          "Family Room",
        ],
        required: true,
      },
    },
    roomDetails: {
      roomType: { type: String, required: true },
      roomSize: { type: String, required: true },
      beds: { type: Number, required: true },
      bathroomType: { type: String, required: true },
      airConditioning: { type: Boolean, required: true },
      balcony: { type: Boolean, required: true },
      smokingAllowed: { type: Boolean, required: true },
      occupancy: { type: String, required: true },
      pricePerNight: { type: Number, required: true },
      availability: { type: Boolean, required: true },
    },
    amenities: {
      wifi: { type: Boolean },
      powerBackup: { type: Boolean },
      parking: {
        twoWheeler: { type: Boolean },
        fourWheeler: { type: Boolean },
      },
      hotWater: { type: Boolean },
      laundryService: { type: Boolean },
      housekeeping: { type: Boolean },
      roomService: { type: Boolean },
      airConditioning: { type: Boolean },
      restaurant: { type: Boolean },
      bar: { type: Boolean },
      conferenceRoom: { type: Boolean },
      gym: { type: Boolean },
      swimmingPool: { type: Boolean },
      lift: { type: Boolean },
      cctv: { type: Boolean },
      security24x7: { type: Boolean },
      firstAidKit: { type: Boolean },
      fireExtinguisher: { type: Boolean },
      wheelChairAccess: { type: Boolean },
    },
    mealOptions: {
      includedMeals: {
        breakfast: { type: Boolean },
        lunch: { type: Boolean },
        dinner: { type: Boolean },
      },
      availableCuisines: {
        type: String,
        enum: ["Indian", "Continental", "Chinese", "Italian", "Local Cuisine"],
        required: true,
      },
      specialDietaryMeals: {
        vegetarian: { type: Boolean },
        vegan: { type: Boolean },
        glutenFree: { type: Boolean },
        halal: { type: Boolean },
        kosher: { type: Boolean },
      },
      mealCharges: {
        breakfast: { type: Number },
        lunch: { type: Number },
        dinner: { type: Number },
      },
      diningOptions: {
        inRoomDining: { type: Boolean },
        buffet: { type: Boolean },
        aLaCarte: { type: Boolean },
        commonDiningArea: { type: Boolean },
      },
    },
    dormitorySpecificDetails: {
      totalBeds: { type: Number },
      bunkBedAvailability: { type: Boolean },
      lockerFacility: { type: Boolean },
      commonRoom: { type: Boolean },
      kitchenAccess: { type: Boolean },
      diningArea: { type: Boolean },
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
    rules: {
      checkInTime: { type: String, required: true },
      checkOutTime: { type: String, required: true },
      smokingAllowed: { type: Boolean },
      alcoholAllowed: { type: Boolean },
      petsAllowed: { type: Boolean },
      quietHours: { type: String },
      visitorPolicy: { type: String },
      cancellationPolicy: { type: String },
    },
    bookingOptions: {
      onlineBooking: { type: Boolean },
      walkIn: { type: Boolean },
      preBookingRequired: { type: Boolean },
      groupDiscounts: { type: Boolean },
      longStayDiscounts: { type: Boolean },
    },
    additionalFeatures: {
      childFriendly: { type: Boolean },
      coupleFriendly: { type: Boolean },
      seniorCitizenFriendly: { type: Boolean },
      localIDAccepted: { type: Boolean },
      pickupDropService: { type: Boolean },
      tourGuidance: { type: Boolean },
    },
    pricing: {
      basePricePerNight: { type: Number, required: true },
      discountedPrice: { type: Number },
      taxes: { type: Number, required: true },
      finalPrice: { type: Number, required: true },
    },
    availabilityStatus: { type: String, required: true },
    availableFrom: { type: Date, required: true },
    ageOfProperty: { type: Number },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Hotel = Property.discriminator("Hotel", hotelSchema);

module.exports = Hotel;
