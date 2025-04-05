const mongoose = require("mongoose");
const { Schema } = mongoose;
const Property = require("./BasePropertySchema");

const hotelSchema = new Schema(
  {
    subCategory: {
      type: [String],
      enum: ["Hotel", "Dormitory"],
      required: false,
    },
    propertyDetails: {
      propertyName: { type: String, required: false },
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
        required: false,
      },
      starRating: { type: Number, min: 1, max: 5, required: false },
      totalRooms: { type: Number, required: false },
      roomTypes: {
        type: [String],
        enum: [
          "Single Room",
          "Double Room",
          "Suite",
          "Dormitory Bed",
          "Family Room",
        ],
        required: false,
      },
    },
    roomDetails: {
      roomType: { type: String, required: false },
      roomSize: { type: String, required: false },
      beds: { type: Number, required: false },
      bathroomType: { type: String, required: false },
      airConditioning: { type: Boolean, required: false },
      balcony: { type: Boolean, required: false },
      smokingAllowed: { type: Boolean, required: false },
      occupancy: { type: String, required: false },
      pricePerNight: { type: Number, required: false },
      availability: { type: Boolean, required: false },
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
        required: false,
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
      checkInTime: { type: String, required: false },
      checkOutTime: { type: String, required: false },
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
      basePricePerNight: { type: Number, required: false },
      discountedPrice: { type: Number },
      taxes: { type: Number, required: false },
      finalPrice: { type: Number, required: false },
    },
    availabilityStatus: { type: String, required: false },
    availableFrom: { type: Date, required: false },
    ageOfProperty: { type: Number },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

const Hotel = Property.discriminator("Hotel", hotelSchema);

module.exports = Hotel;
