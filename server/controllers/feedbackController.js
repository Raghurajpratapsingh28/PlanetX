const mongoose = require("mongoose");
const Feedback = require("../modals/CentralFeedback"); // Correctly imported as Feedback
const User = require("../modals/Users"); // Ensure this path is correct

exports.postFeedback = async (req, res) => {
  const { feedbackType, stars, content } = req.body;
  const userId = req.user.userId;


  if (!feedbackType || !stars || !content) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Create a new feedback entry
    const feedback = new Feedback({
      userId,
      userName: user.name,
      feedbackType,
      stars,
      content,
    });
    await feedback.save();

    await User.findByIdAndUpdate(userId, {
      $push: { feedbacksGiven: feedback._id },
    });

    res.status(201).json({
      message: "Feedback submitted successfully.",
      feedback,
    });
  } catch (error) {
    console.error("Error in postFeedback:", error);
    res.status(500).json({
      error: "Error submitting feedback.",
      details: error.message,
    });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .select("feedbackType userName stars content createdAt");

    res.status(200).json({
      message: feedbacks.length
        ? "Feedback retrieved successfully."
        : "No feedback found for this user.",
      feedbacks,
    });
  } catch (error) {
    console.error("Error in getFeedback:", error);
    res.status(500).json({
      error: "Error retrieving feedback.",
      details: error.message,
    });
  }
};

exports.deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(feedbackId)) {
    return res.status(400).json({ error: "Invalid feedback ID." });
  }

  try {
    const feedback = await Feedback.findOneAndDelete({
      _id: feedbackId,
      userId: req.user._id,
    });

    if (!feedback) {
      return res.status(404).json({
        error: "Feedback not found or not authorized.",
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { feedbacksGiven: feedbackId },
    });

    res.status(200).json({
      message: "Feedback deleted successfully.",
    });
  } catch (error) {
    console.error("Error in deleteFeedback:", error);
    res.status(500).json({
      error: "Error deleting feedback.",
      details: error.message,
    });
  }
};