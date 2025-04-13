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

    const cloudfrontBaseUrl = process.env.CLOUDFRONT_BASE_URL;

    const availableProperties = await Property.find({
      propertyStatus: "Active",
      // user: { $ne: userId }, will uncomment when we have more users
    })
      .populate({
        path: "reviews",
        populate: { path: "user", select: "name email" },
      })
      // .select("name user pricing description role propertyType location builtUpArea area propertyStatus category images reviews")
      .lean();


    //Used Cloudfront CDN to fetch images from s3 bucket
    const modifiedProperties = availableProperties.map((property) => {
      const modifiedImageUrl = property.images?.map((image) => {
        const s3Base = process.env.S3_BASE_URL;
        const relativePath = image.url.replace(s3Base, "");
        return {
          ...image,
          url: `${cloudfrontBaseUrl}${relativePath}`,
        };
      }) || [];
      
      return {
        ...property,
        images: modifiedImageUrl,
      }
    });

    res.status(200).json({
      message: "Available properties fetched successfully.",
      total: modifiedProperties.length,
      properties: modifiedProperties,
    });

  } catch (error) {
    console.error("Error fetching available properties:", error);
    res.status(500).json({
      error: "An error occurred while fetching properties.",
      details: error.message,
    });
  }
};
