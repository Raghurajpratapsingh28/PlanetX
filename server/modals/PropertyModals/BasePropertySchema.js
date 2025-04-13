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
   
   
    
    
  },
  { timestamps: true, discriminatorKey: "category" }
);

const Property = mongoose.model("Property", basePropertySchema);

module.exports = Property;
