// shopdefault.js

export const shopDefault = {
  amenities: {
    parking: {
      covered: false,
      open: false,
    },
    visitorParking: false,
    powerBackup: false,
    security24x7: false,
    cctv: false,
    fireSafety: false,
    wifi: false,
    elevator: false,
    maintenanceStaff: false,
  },
  buildingFeatures: {
    // Defaulting to the first option for buildingType; adjust as needed.
    buildingType: "Standalone Building",
    fireSafetyCompliance: false,
    wheelChairAccessibility: false,
    greenBuildingCertification: false,
    rainWaterHarvesting: false,
    wasteManagement: false,
  },
  shopFeatures: {
    shopFrontage: {
      length: 0, // Set to 0 by default; update as required
      unit: "ft",
    },
    height: {
      value: 0, // Set to 0 by default; update as required
      unit: "ft",
    },
    // Defaulting parking availability to "None"
    parkingAvailability: ["None"],
    waterSupply: false,
    electricityLoad: {
      value: 0, // Set to 0 by default; update as required
      unit: "kW",
    },
    // Default shutter type; adjust if necessary
    shutterType: ["Manual"],
    advertisingSpace: false,
  },
  additionalFeatures: {
    petFriendly: false,
    childFriendly: false,
    localIDAccepted: false,
    alcoholAllowed: false,
    visitorEntryPolicy: "", // Default to an empty string; update as needed
  },
  rules: {
    operatingHours: "", // Must be provided; empty string by default
    smokingAllowed: false,
    alcoholAllowed: false,
    quietHours: "", // Optional; defaulting to an empty string
    hourlyAvailability: {
      available: false,
      timings: {
        start: "", // Default to an empty string; update if necessary
        end: "", // Default to an empty string; update if necessary
      },
    },
  },
  nearbyPlaces: {
    // These have defaults set in the schema; including them here explicitly.
    hospital: false,
    school: false,
    metro: false,
    mall: false,
    market: false,
    railway: false,
    airport: false,
    highway: false,
    busStation: false,
  },
};
