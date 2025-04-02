const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  otp: { type: String },
  otpExpiry: { type: Date },
  refreshToken: { type: String, default: null },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
  name: { type: String, default: "user" },
  email: { type: String, default: "user@example.com" },
  whatsappMobile: { type: String, default: "" },
  mobile: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
  state: { type: String, default: "" },
  city: { type: String, default: "" },
  feedbacksGiven: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
  ],
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wishlist",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
