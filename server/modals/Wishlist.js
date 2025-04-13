const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
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
  pricing:[{type:Number }],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
