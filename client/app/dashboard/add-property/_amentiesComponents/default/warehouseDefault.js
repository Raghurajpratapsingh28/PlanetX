export const warehouseDefault = {
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
    loadingDock: false,
    coldStorageFacility: false,
  },
  warehouseFeatures: {
    entryType: "Single Entry",
    shutterType: "Manual",
    ventilation: "Natural",
    powerSupply: {
      type: "3-Phase",
      capacity: {
        value: 0,
        unit: "kVA",
      },
    },
    waterSupply: false,
    flooringType: "Concrete",
    hazardousMaterialStorage: false,
    temperatureControlled: false,
    fireSprinklerSystem: false,
  },
  additionalDetails: {
    nearbyPlaces: {
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
    complianceCertificates: {
      fireSafetyCertificate: false,
      buildingStabilityCertificate: false,
      environmentalClearance: false,
    },
    rules: {
      operatingHours: "",
      petFriendly: false,
      smokingAllowed: false,
      alcoholAllowed: false,
      quietHours: "",
      hourlyAvailability: {
        available: false,
        timings: {
          start: "",
          end: "",
        },
      },
    },
  },
};
