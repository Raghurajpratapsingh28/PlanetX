const User = require("../../modals/Users");
const Wishlist = require("../../modals/Wishlist");
const basePropertySchema = require("../../modals/PropertyModals/BasePropertySchema");

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

    // console.log(user);

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

      const properties = wishlists[0]?.properties || [];
      const wishlistData = properties.map((property) => {
        return {
          propertyId: property._id
        }
      })

      // console.log(wishlistData);

      const propertyDetails = await basePropertySchema.find({
        _id: { $in: wishlistData.map((item) => item.propertyId)}
      })

      // console.log(propertyDetails);

      const cloudfrontBaseUrl = process.env.CLOUDFRONT_BASE_URL;

      const modifiedProperties = propertyDetails.map((property) => {
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

      console.log(modifiedProperties);

    if (!wishlists || wishlists.length === 0) {
      return res
        .status(404)
        .json({ error: "No wishlists found for this user" });
    }

    res.status(200).json({
      message: "Wishlists retrieved successfully",
      wishlistsData: modifiedProperties,
    });
  } catch (error) {
    console.error("Error retrieving wishlists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getWishlists };
