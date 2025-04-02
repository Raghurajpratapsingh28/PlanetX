const Property = require("../../modals/PropertyModals/BasePropertySchema");

const filterProperties = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(403).json({ message: "You are not an admin" });
    }
    const { propertyType, category } = req.query;

    if (!propertyType || !category) {
      return res.status(400).json({
        message:
          "Please provide all required fields: propertyType, category, and role.",
      });
    }

    const properties = await Property.find({
      propertyType: propertyType,
      category: category,
    })
      .populate({ path: "user", select: "name email role whatsappMobile" })
      .lean();

    if (properties.length === 0) {
      return res
        .status(404)
        .json({ message: "No properties found matching the criteria." });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  filterProperties,
};
