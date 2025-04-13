const Property = require("../../modals/PropertyModals/BasePropertySchema");
const User = require("../../modals/Users");
const Feedback = require("../../modals/Feedback");

exports.submitFeedbackAndDeleteProperty = async (req, res) => {
  const { propertyId, userId, feedback } = req.body;
  console.log(req.body);

  if (!propertyId || !userId || !feedback) {
    return res.status(400).json({
      error: "Property ID, User ID, Feedback are required.",
    });
  }

  try {
    const newFeedback = new Feedback({
      userId,
      feedback,
    });

    const savedFeedback = await newFeedback.save();
    await User.findByIdAndUpdate(userId, {
      $push: { feedbacksGiven: savedFeedback._id },
    });

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found." });
    }

    await Property.findByIdAndDelete(propertyId);
    await User.findByIdAndUpdate(userId, {
      $pull: { properties: propertyId },
    });

    return res.status(200).json({
      message: "Property deleted successfully. Thank you for your feedback!",
    });
  } catch (error) {
    console.log("Error in handling feedback and deleting property:", error);
    return res.status(500).json({
      error: "An error occurred while processing the request.",
      details: error.message,
    });
  }
};
