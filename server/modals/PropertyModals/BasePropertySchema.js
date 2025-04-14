const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const basePropertySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    propertyType: {
      type: String,
      enum: ["For Sale", "For Rent", "Commercial"],
      required: false,
    },
    category: {
      type: String,
      enum: [
        "Residential",
        "Pg",
        "Hotel",
        "Office",
        "Shop",
        "Warehouse",
        "Shared Warehouse",
        "EventSpace",
      ],
      required: false,
    },
    role: {
      type: String,
      enum: [
        "Buyer",
        "Renter",
        "Landlord",
        "Property Owner",
        "Rental Provider",
        "Builder",
        "Dealer",
      ],
      required: false,
    },
    location: {
      city: { type: String, required: false },
      state: { type: String, required: false },
      locality: { type: String, required: false },
      subLocality: { type: String },
      apartment: { type: String },
      houseNumber: { type: String },
    },
    propertyStatus: {
      type: String,
      enum: ["Active", "On-Hold"],
      default: "Active",
      required: false,
    },
    images: [
      {
        name: { type: String, required: false },
        url: { type: String, required: false },
      },
    ],
    video: { type: String },
    
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    pricing:[{type:Number }],
    description: { type: String, required: false },
    builtUpArea: {
      size: { type: Number, required: false },
      unit: { type: String, required: false, enum: ["sq ft"] },
    },
    amenities: [{ type: String, required: false }],
    highlights: [{ type: String, required: false }],
    features: [{ type: String, required: false }],
    propertyAge: { type: Number, required: false },
    propertyCondition: { type: String, required: false },
    propertyType: { type: String, required: false },
    propertyUsage: { type: String, required: false },
    parking: {
      covered: { type: Number, default: 0 },
      open: { type: Number, default: 0 }
    },
    availableFrom: { type: Date },
    availabilityStatus: {
      type: String,
      enum: ["Ready to Move", "Under Construction", "Upcoming"],
      required: false
    },
    builtUpArea: {
      size: { type: Number, required: false },
      unit: { type: String, required: false, enum: ["sq ft", "sq m"] },
    },
    carpetArea: {
      size: { type: Number },
      unit: { type: String, enum: ["sq ft", "sq m"] },
    },
    furnishingStatus: {
      type: String,
      enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
      required: false
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
      busStation: { type: Boolean, default: false }
    },
    furnishingDetails: [{ type: String, required: false }],
    
    

    
   
   
    
    
  },
  { timestamps: true, discriminatorKey: "category" }
);

const Property = mongoose.model("Property", basePropertySchema);

module.exports = Property;
