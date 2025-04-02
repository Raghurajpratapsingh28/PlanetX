const Property = require("../../modals/PropertyModals/BasePropertySchema");

const getNearbyProperties = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance } = req.query;

    if (!latitude || !longitude || !maxDistance) {
      return res
        .status(400)
        .json({ message: "Latitude, longitude, and maxDistance are required" });
    }

    const maxDistanceInMeters = maxDistance * 1000;

    const nearbyProperties = await Property.find({
      "location.coordinates": {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: maxDistanceInMeters,
        },
      },
    })
      .populate("reviews")
      .lean();

    if (nearbyProperties.length === 0) {
      return res.status(404).json({ message: "No nearby properties found" });
    }

    return res.status(200).json({ nearbyProperties });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Server error, please try again later",
        error: error.message,
      });
  }
};

module.exports = {
  getNearbyProperties,
};
