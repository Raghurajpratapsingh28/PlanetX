const mongoose = require("mongoose");
const { Schema } = mongoose;

const basePropertySchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    propertyType: {
      type: String,
      enum: ["For Sale", "For Rent", "Commercial"],
      required: true,
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
      required: true,
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
      required: true,
    },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      locality: { type: String, required: true },
      subLocality: { type: String },
      apartment: { type: String },
      houseNumber: { type: String },
    },
    propertyStatus: {
      type: String,
      enum: ["Active", "On-Hold"],
      default: "Active",
      required: true,
    },
    images: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    video: { type: String },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true, discriminatorKey: "category" }
);

const Property = mongoose.model("Property", basePropertySchema);

module.exports = Property;
