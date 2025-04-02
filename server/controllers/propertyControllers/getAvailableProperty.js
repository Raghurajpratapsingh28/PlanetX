const Property = require("../../modals/PropertyModals/BasePropertySchema");
const User = require("../../modals/Users");

exports.getAvailableProperties = async (req, res) => {
  const { userId } = req.user;
  console.log(userId);
  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const user = await User.findById(userId).populate("properties");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const availableProperties = await Property.find({
      propertyStatus: "Active",
      user: { $ne: userId },
    })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .lean();

    res.status(200).json({
      message: "Available properties fetched successfully.",
      length: availableProperties.length,
      properties: availableProperties,
    });
  } catch (error) {
    console.log("Error fetching available properties:", error);
    res.status(500).json({
      error: "An error occurred while fetching available properties.",
      details: error.message,
    });
  }
};
