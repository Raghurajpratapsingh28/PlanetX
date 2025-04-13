// controllers/propertyControllers/getPropertyByIdController.js
const Property = require("../../modals/PropertyModals/BasePropertySchema");
const User = require("../../modals/Users");

exports.getPropertyById = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user?.userId;

    console.log("pI:",propertyId," ","uI:",userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Find the property by ID
    const property = await Property.findById(propertyId)
      .populate({
        path: "reviews",
        populate: { path: "user", select: "name number email" },
      })
      .populate("user", "name number email") // Optionally populate user details
      .lean();
      console.log(property)

    if (!property) {
      return res.status(404).json({ error: "Property not found." });
    }

    // Handle image URLs with CloudFront CDN
    const cloudfrontBaseUrl = process.env.CLOUDFRONT_BASE_URL;
    const s3Base = process.env.S3_BASE_URL;

    const modifiedImageUrl = property.images?.map((image) => {
      const relativePath = image.url.replace(s3Base, "");
      return {
        ...image,
        url: `${cloudfrontBaseUrl}${relativePath}`,
      };
    }) || [];

    const modifiedProperty = {
      ...property,
      images: modifiedImageUrl,
    };

    res.status(200).json({
      message: "Property fetched successfully.",
      property: modifiedProperty,
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({
      error: "An error occurred while fetching the property.",
      details: error.message,
    });
  }
};