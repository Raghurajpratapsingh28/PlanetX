export const eventSpaceDefaultValues = {
  amenities: {
    projector: false,
    screen: false,
    soundSystem: false,
    lightingSetup: false,
    airConditioning: false,
    WiFi: false,
    cateringServices: false,
    decorationServices: false,
    stageSetup: false,
    podium: false,
    parkingFacilities: {
      covered: false,
      open: false,
    },
    securityServices: false,
    cleaningServices: false,
  },
  facilities: {
    restrooms: false,
    changingRoom: false,
    powerBackup: false,
    photoBooth: false,
  },
  availableSpaces: {
    indoorSpace: false,
    outdoorSpace: false,
    balconyAccess: false,
  },
  bookingDetails: {
    minimumBookingDuration: "",
    maximumBookingDuration: "",
    cancellationPolicy: "",
  },
  additionalServices: {
    eventPlannerSupport: false,
    technicalStaffOnSite: false,
    customizableLayouts: false,
    loungeArea: false,
  },
  rules: {
    alcoholAllowed: false,
    smokingAllowed: false,
    petFriendly: false,
    noiseLimit: "",
    decorRestrictions: "",
  },
};
