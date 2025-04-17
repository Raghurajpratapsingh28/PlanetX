// /server/modals/CentralFeedback.js (or /server/models/CentralFeedback.js)
const mongoose = require("mongoose");

const CentralFeedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  feedbackType: { type: String, required: true },
  stars: { type: Number, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
// Prevent model overwrite
const Feedbacks = mongoose.models.Feedbacks || mongoose.model("Feedbacks", CentralFeedbackSchema);

module.exports = Feedbacks;