const Property = require("../../modals/PropertyModals/BasePropertySchema");
const User = require("../../modals/Users");

exports.getAvailablePropertiesForReel = async (req, res) => {
  const { userId } = req.user.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const user = await User.findById(userId).select("name mobile");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const availableProperties = await Property.find({
      propertyStatus: "Active",
      user: { $ne: userId },
    })
      .populate({
        path: "user",
        select: "name mobile",
      })
      .populate({
        path: "reviews",
        select: "user stars text",
        populate: {
          path: "user",
          select: "name mobile",
        },
      })
      .select("video user reviews propertyStatus");

    if (!availableProperties.length) {
      return res.status(404).json({
        message: "No available properties found.",
        properties: [],
      });
    }

    const propertiesForReel = availableProperties.map((property) => ({
      propertyId: property._id,
      video: property.video,
      user: {
        name: property.user.name,
        mobile: property.user.mobile,
      },
      reviews: property.reviews,
    }));

    res.status(200).json({
      message: "Available properties fetched successfully for the reel.",
      properties: propertiesForReel,
    });
  } catch (error) {
    console.error("Error fetching available properties for reel:", error);
    res.status(500).json({
      error:
        "An error occurred while fetching available properties for the reel.",
      details: error.message,
    });
  }
};
