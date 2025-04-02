const User = require("../../modals/Users");
const Wishlist = require("../../modals/Wishlist");
const Property = require("../../modals/PropertyModals/BasePropertySchema");

const createWishlist = async (req, res) => {
  const { userId, propertyIds } = req.body;

  if (!userId || !propertyIds || !Array.isArray(propertyIds)) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const properties = await Property.find({ _id: { $in: propertyIds } });
    if (properties.length !== propertyIds.length) {
      return res.status(404).json({ error: "Some properties not found" });
    }

    const wishlist = new Wishlist({
      user: userId,
      properties: propertyIds,
    });
    await wishlist.save();

    user.wishlist.push(wishlist._id);
    await user.save();

    res.status(201).json({
      message: "Wishlist created successfully",
      wishlist,
    });
  } catch (error) {
    console.error("Error creating wishlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createWishlist };
