const INT_MAX = 2147483647;

const getPropertyAreaFilter = (property) => {
  let minArea = 0;
  let maxArea = 0;

  if (property.category === "Residential" && property.propertyArea) {
    const { carpetArea, builtUpArea } = property.propertyArea;
    if (carpetArea && builtUpArea) {
      minArea = carpetArea;
      maxArea = builtUpArea;
    } else {
      minArea = 0;
      maxArea = carpetArea || builtUpArea || INT_MAX;
    }
  } else if (
    ["Office", "Warehouse/Storage", "Shop"].includes(property.category) &&
    property.propertyDetails?.builtUpArea
  ) {
    const area = property.propertyDetails.builtUpArea.size;
    minArea = area ? 0 : 0;
    maxArea = area || INT_MAX;
  } else if (
    ["Pg", "Hotel"].includes(property.category) &&
    property.roomDetails?.roomSize
  ) {
    const area = property.roomDetails.roomSize;
    minArea = area ? 0 : 0;
    maxArea = area || INT_MAX;
  }

  return { minArea, maxArea };
};

const getPropertyPrice = (property) => {
  if (!property || !property.pricing) return { price: "N/A", label: "" };

  let price = "N/A",
    label = "";

  if (property.category === "Residential") {
    price = property.pricing.expectedPrice || "N/A";
  } else if (property.category === "Pg") {
    price = property.pricing.monthlyRent || "N/A";
    label = "/ month";
  } else if (property.category === "Hotel") {
    price = property.pricing.finalPrice || "N/A";
    label = "/ night";
  } else if (
    property.category === "Office" ||
    property.category === "Warehouse" ||
    property.category === "Shared Warehouse" ||
    property.category === "EventSpace"
  ) {
    if (property.propertyType === "For Rent") {
      price = property.pricing.rentalDetails?.monthlyRent || "N/A";
      label = "/ month";
    } else {
      price = property.pricing.price?.amount || "N/A";
    }
  } else if (property.category === "Shop") {
    if (property.propertyType === "For Sale") {
      price = property.pricing.price?.amount || "N/A";
    } else {
      price = property.pricing.rentalDetails?.monthlyRent || "N/A";
      label = "/ month";
    }
  }

  return { price, label };
};

module.exports = { getPropertyAreaFilter, getPropertyPrice }; 
