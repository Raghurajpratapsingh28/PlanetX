const Property = require("../../modals/PropertyModals/BasePropertySchema");
const User = require("../../modals/Users");

const getNearbyProperties = async (req, res) => {
  try {
    const mobile = req.user.mobile;
  
    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    // Find the user to get their city
    const user = await User.findOne({ mobile }).lean();
    
    if (!user || !user.city) {
      return res.status(404).json({ message: "User or user city not found" });
    }
 
    
    const cloudfrontBaseUrl = process.env.CLOUDFRONT_BASE_URL;
    const s3Base = process.env.S3_BASE_URL;

    // Find properties matching the user's city
    const nearbyProperties = await Property.find({
      "location.city": user.city,
      propertyStatus: "Active" // Optional: only fetch active properties
    })
      .populate("reviews")
      .lean();

    if (nearbyProperties.length === 0) {
      return res.status(404).json({ message: "No properties found in your city" });
    }

    // Transform image URLs to use CloudFront CDN
    const modifiedProperties = nearbyProperties.map((property) => {
      const modifiedImageUrl = property.images?.map((image) => {
        const relativePath = image.url.replace(s3Base, "");
        return {
          ...image,
          url: `${cloudfrontBaseUrl}${relativePath}`,
        };
      }) || [];

      return {
        ...property,
        images: modifiedImageUrl,
      };
    });

    return res.status(200).json({ 
      message: "Properties fetched successfully",
      nearbyProperties: modifiedProperties 
    });
  } catch (error) {
    console.error("Error fetching nearby properties:", error);
    return res.status(500).json({
      message: "Server error, please try again later",
      error: error.message
    });
  }
};

module.exports = {
  getNearbyProperties,
};