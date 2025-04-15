const Review = require("../../modals/Reviews");

const getReviews = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const reviews = await Review.find({ property: propertyId })
      .populate("user", "name") // Populate user name
      .sort({ createdAt: -1 }); // Sort by newest first

    if (!reviews || reviews.length === 0) {
      return res.status(200).json({ reviews: [] });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

module.exports = { getReviews };