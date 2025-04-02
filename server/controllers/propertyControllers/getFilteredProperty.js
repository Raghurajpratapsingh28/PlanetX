const Property = require("../../modals/PropertyModals/BasePropertySchema");
const { getPropertyPrice, getPropertyAreaFilter } = require("../../utils");

const getFilteredProperty = async (req, res) => {
  try {
    const {
      propertyType,
      category,
      bedrooms,
      role,
      furnished,
      minBudget,
      maxBudget,
      minArea,
      maxArea,
    } = req.body;

    let filter = {};
    if (propertyType) filter.propertyType = propertyType;
    if (category) filter.category = category;
    if (bedrooms) filter.bedrooms = bedrooms;
    if (role) filter.role = role;
    if (furnished !== undefined) filter.furnished = furnished;

    const propertyData = await Property.find(filter);

    const filteredByPrice = propertyData.filter((property) => {
      const { price } = getPropertyPrice(property);
      const numericPrice = parseFloat(price);
      return (
        !isNaN(numericPrice) &&
        numericPrice >= minBudget &&
        numericPrice <= maxBudget
      );
    });

    const filteredData = filteredByPrice.filter((property) => {
      const { minArea: computedMin, maxArea: computedMax } =
        getPropertyAreaFilter(property);
      return computedMin >= minArea && computedMax <= maxArea;
    });
    res.status(200).json({ success: true, data: filteredData });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = getFilteredProperty;
