const Property = require("../../modals/PropertyModals/BasePropertySchema");

const getPropertiesByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const userId = req.user.userId;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    const properties = await Property.find({
      category,
      user: { $ne: userId },
    }).lean();
    if (!properties || properties.length === 0) {
      return res
        .status(404)
        .json({ message: `No properties found for category: ${category}` });
    }

    return res.status(200).json({ properties });
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

module.exports = { getPropertiesByCategory };
