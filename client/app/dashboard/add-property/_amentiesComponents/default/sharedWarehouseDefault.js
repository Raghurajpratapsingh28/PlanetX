export const sharedWarehouseDefault = {
  amenities: {
    highSpeedWiFi: false,
    powerBackup: false,
    airConditioning: false,
    printingServices: false,
    conferenceRooms: false,
    phoneBooths: false,
    teaCoffee: false,
    parking: false,
    access24x7: false,
    security: false,
    receptionServices: false,
  },
  workspaceFeatures: {
    privateAccess: false,
    dedicatedSpace: false,
    lockableOffice: false,
    availabilityStatus: "",
    // Set a default date value (here, the current date is used).
    availableFrom: new Date(),
  },
  meetingAndEventSpaces: {
    projector: false,
    whiteboard: false,
    videoConferencing: false,
    // Optional fields can be given defaults too.
    soundSystem: false,
    cateringServices: false,
  },
  bookingDetails: {
    minimumBookingDuration: "",
    maximumBookingDuration: "",
    cancellationPolicy: "",
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
    rules: {
      operatingHours: "",
      quietHours: "",
      petFriendly: false,
      smokingAllowed: false,
    },
  },
};
