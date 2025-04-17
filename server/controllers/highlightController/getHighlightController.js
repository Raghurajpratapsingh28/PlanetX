const Property = require("../../modals/PropertyModals/BasePropertySchema");
const User = require("../../modals/Users");

exports.getAvailablePropertiesForReel = async (req, res) => {
  const { userId } = req.user;
console.log("user Data",req.user)
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
      .select(
        "video location description pricing user reviews propertyStatus builtUpArea highlights features category bedrooms bathrooms"
      );

    if (!availableProperties.length) {
      return res.status(404).json({
        message: "No available properties found.",
        properties: [],
      });
    }

    console.log("Available properties:", availableProperties);

    const propertiesForReel = availableProperties.map((property) => ({
      propertyId: property._id,
      video: property.video,
      user: {
        name: property.user.name,
        mobile: property.user.mobile,
      },
      location: property.location,
      description: property.description || "No description available",
      pricing: property.pricing || [],
      reviews: property.reviews || [],
      area: property.builtUpArea
        ? `${property.builtUpArea.size} ${property.builtUpArea.unit}`
        : "N/A",
      tags: property.highlights || property.features || [],
      category: property.category || "N/A",
      bedrooms:
        property.bedrooms ||
        (property.features?.find((f) => f.toLowerCase().includes("bedroom"))
          ? parseInt(
              f.match(/\d+/)?.[0]
            ) || "N/A"
          : "N/A"),
      bathrooms:
        property.bathrooms ||
        (property.features?.find((f) => f.toLowerCase().includes("bathroom"))
          ? parseInt(
              f.match(/\d+/)?.[0]
            ) || "N/A"
          : "N/A"),
    }));

    console.log("Properties for reel:", propertiesForReel);

    const cloudfrontBaseUrl = process.env.CLOUDFRONT_BASE_URL;
    const s3Base = process.env.S3_BASE_URL;

    const modifiedProperties = propertiesForReel.map((property) => {
      const video = property.video || "";
      const relativePath = video.replace(s3Base, "");
      return {
        ...property,
        video: video ? `${cloudfrontBaseUrl}${relativePath}` : "",
      };
    });

    res.status(200).json({
      message: "Available properties fetched successfully for the reel.",
      properties: modifiedProperties,
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