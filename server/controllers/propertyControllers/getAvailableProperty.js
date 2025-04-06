const Property = require("../../modals/PropertyModals/BasePropertySchema");
const User = require("../../modals/Users");

exports.getAvailableProperties = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const availableProperties = await Property.find({
      propertyStatus: "Active",
      // user: { $ne: userId }, will uncomment when we have more users
    })
      .populate({
        path: "reviews",
        populate: { path: "user", select: "name email" },
      })
      .select("name price location area propertyStatus imageUrl reviews")
      .lean();

    res.status(200).json({
      message: "Available properties fetched successfully.",
      total: availableProperties.length,
      properties: availableProperties,
    });
  } catch (error) {
    console.error("Error fetching available properties:", error);
    res.status(500).json({
      error: "An error occurred while fetching properties.",
      details: error.message,
    });
  }
};
