const Review = require("../../modals/Reviews");
const Property = require("../../modals/PropertyModals/BasePropertySchema");

const postReview = async (req, res) => {
  const { propertyId, stars, text } = req.body;
  const userId = req.user.userId;

  if (!propertyId || !stars || !text) {
    return res
      .status(400)
      .json({ error: "Missing required fields: propertyId, stars, or text" });
  }

  if (stars < 1 || stars > 5) {
    return res
      .status(400)
      .json({ error: "Stars rating must be between 1 and 5" });
  }

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const review = new Review({
      user: userId,
      property: propertyId,
      stars,
      text,
    });

    await review.save();

    property.reviews.push(review._id);
    await property.save();
    res.status(201).json({ message: "Review posted successfully", review });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", error: error.message });
  }
};

module.exports = { postReview };
