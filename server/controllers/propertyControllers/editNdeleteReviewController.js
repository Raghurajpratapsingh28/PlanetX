const Review = require("../../modals/Reviews");
const Property = require("../../modals/PropertyModals/BasePropertySchema");

exports.editReview = async (req, res) => {
  const { reviewId } = req.params;
  const { stars, text } = req.body;
  console.log(reviewId, stars, text);

  if (!stars || !text)
    return res.status(400).json({ message: "Rating and comment are required" });

  try {
    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.userId.toString()) {
      return res
        .status(403)
        .json({ message: "You can only edit your own reviews" });
    }

    review.stars = stars;
    review.text = text;

    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating review", error });
  }
};

exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.userId.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own reviews" });
    }

    await Review.findByIdAndDelete(reviewId);

    const property = await Property.findById(review.property);
    if (property) {
      property.reviews.pull(review._id);
      await property.save();
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting review", error: error.message });
  }
};
