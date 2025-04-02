const User = require("../../modals/Users");
const Wishlist = require("../../modals/Wishlist");
const getWishlists = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const wishlists = await Wishlist.find({ user: userId })
      .populate({
        path: "properties",
        populate: {
          path: "reviews",
          populate: {
            path: "user",
            select: "name email",
          },
        },
      })
      .lean();

    if (!wishlists || wishlists.length === 0) {
      return res
        .status(404)
        .json({ error: "No wishlists found for this user" });
    }

    res.status(200).json({
      message: "Wishlists retrieved successfully",
      wishlists,
    });
  } catch (error) {
    console.error("Error retrieving wishlists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getWishlists };
