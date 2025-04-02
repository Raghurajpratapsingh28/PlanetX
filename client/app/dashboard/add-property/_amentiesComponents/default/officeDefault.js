const officeDefault = {
  amenities: {
    security24x7: false,
    cctv: false,
    powerBackup: false,
    lift: false,
    parking: {
      covered: false,
      open: false,
    },
    wifi: false,
    fireSafety: false,
    housekeeping: false,
    visitorParking: false,
    pantry: false,
    cafeteria: false,
    receptionService: false,
    gymFitnessCentre: false,
    breakoutArea: false,
  },

  buildingFeatures: {
    buildingType: "",
    grade: "",
    fireSafetyCompliance: false,
    wheelChairAccessibility: false,
    greenBuildingCertification: false,
    rainWaterHarvesting: false,
    wasteManagement: false,
  },

  roomDetails: {
    totalCabins: 0,
    workstations: 0,
    meetingRooms: 0,
    conferenceRooms: 0,
    pantryType: "Dry",
    commonArea: {
      size: 0,
      unit: "sq ft",
    },
  },

  additionalFeatures: {
    petFriendly: false,
    coupleFriendly: false,
    childFriendly: false,
    localIDAccepted: false,
    alcoholAllowed: false,
    visitorEntryPolicy: "",
  },

  rules: {
    operatingHours: "",
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
};

export default officeDefault;
