// page.js
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  MoreVertical,
  Phone,
  PhoneIcon as WhatsApp,
  X,
  Heart,
  Share2,
  Home,
  Layers,
  SquareIcon as SquareFootage,
  Tag,
  Clock,
  Send,
} from "lucide-react";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { useParams, useSearchParams } from "next/navigation";

const transformPropertyData = (data) => {
  const category = data.category || "Residential";

  // Convert array-based fields to objects
  const arrayToObject = (arr, map) =>
    arr?.reduce((acc, key) => {
      if (map[key]) acc[key] = true;
      return acc;
    }, {}) || {};

  // Define mappings
  const amenitiesMap = {
    maintenanceStaff: "Maintenance Staff",
    vastuCompliant: "Vaastu Compliant",
    securityFireAlarm: "Security / Fire Alarm",
    visitorParking: "Visitor Parking",
    gasLine: "Gas Line",
    wifi: "Wi-Fi/Cable",
    waterSupply: "Water Supply",
    powerBackup: "Power Backup",
    parking: "Parking",
    clubHouse: "Club House",
    childrensPlayArea: "Children's Play Area",
    sportsFacilities: "Sports Facilities",
    joggingWalkingTracks: "Jogging/Walking Tracks",
    swimmingPool: "Swimming Pool",
    gym: "Gym",
    cinemaRoom: "Cinema Room",
    libraryReadingRoom: "Library/Reading Room",
    projector: "Projector",
    screen: "Screen",
    soundSystem: "Sound System",
    lightingSetup: "Lighting Setup",
    airConditioning: "Air Conditioning",
    cateringServices: "Catering Services",
    decorationServices: "Decoration Services",
    stageSetup: "Stage Setup",
    podium: "Podium",
    securityServices: "Security Services",
    cleaningServices: "Cleaning Services",
    hotWater: "Hot Water",
    laundryService: "Laundry Service",
    housekeeping: "Housekeeping",
    roomService: "Room Service",
    restaurant: "Restaurant",
    bar: "Bar",
    conferenceRoom: "Conference Room",
    lift: "Lift",
    cctv: "CCTV",
    security24x7: "24x7 Security",
    firstAidKit: "First Aid Kit",
    fireExtinguisher: "Fire Extinguisher",
    wheelChairAccess: "Wheelchair Access",
    fireSafety: "Fire Safety",
    pantry: "Pantry",
    cafeteria: "Cafeteria",
    receptionService: "Reception Service",
    gymFitnessCentre: "Gym/Fitness Centre",
    breakoutArea: "Breakout Area",
    commonRefrigerator: "Common Refrigerator",
    roWater: "RO Water",
    cookingAllowed: "Cooking Allowed",
    twoWheelerParking: "Two-Wheeler Parking",
    fourWheelerParking: "Four-Wheeler Parking",
    geyser: "Geyser",
    studyTable: "Study Table",
    wardrobe: "Wardrobe",
    tv: "TV",
    microwave: "Microwave",
    recreationRoom: "Recreation Room",
    readingRoom: "Reading Room",
    garden: "Garden",
    wifiCable: "Wi-Fi/Cable",
    highSpeedWiFi: "High-Speed Wi-Fi",
    printingServices: "Printing Services",
    conferenceRooms: "Conference Rooms",
    phoneBooths: "Phone Booths",
    teaCoffee: "Tea/Coffee",
    access24x7: "24x7 Access",
    security: "Security",
    receptionServices: "Reception Services",
    elevator: "Elevator",
    loadingDock: "Loading Dock",
    coldStorageFacility: "Cold Storage Facility",
  };

  const otherFeaturesMap = {
    separateEntryForServantRoom: "Separate Entry for Servant Room",
    noOpenDrainageAround: "No Open Drainage Around",
    petFriendly: "Pet-Friendly",
    wheelchairFriendly: "Wheelchair Friendly",
    rainWaterHarvesting: "Rain Water Harvesting",
    cornerProperty: "Corner Property",
    poojaRoom: "Pooja Room",
    guestRoom: "Guest Room",
    servantRoom: "Servant Room",
    studyRoom: "Study Room",
    shopFrontage: "Shop Frontage",
    height: "Height",
    parkingAvailability: "Parking Availability",
    electricityLoad: "Electricity Load",
    shutterType: "Shutter Type",
    advertisingSpace: "Advertising Space",
    entryType: "Entry Type",
    ventilation: "Ventilation",
    powerSupply: "Power Supply",
    flooringType: "Flooring Type",
    hazardousMaterialStorage: "Hazardous Material Storage",
    temperatureControlled: "Temperature Controlled",
    fireSprinklerSystem: "Fire Sprinkler System",
    fireSafetyCertificate: "Fire Safety Certificate",
    buildingStabilityCertificate: "Building Stability Certificate",
    environmentalClearance: "Environmental Clearance",
    eventPlannerSupport: "Event Planner Support",
    technicalStaffOnSite: "Technical Staff On-Site",
    customizableLayouts: "Customizable Layouts",
    loungeArea: "Lounge Area",
  };

  const societyFeaturesMap = {
    swimmingPool: "Swimming Pool",
    security24x7: "24/7 Security",
    gymFitnessCentre: "Gym/Fitness Center",
    shoppingCenter: "Shopping Centre",
    clubHouse: "Clubhouse",
    childrensPlayArea: "Children's Play Area",
    sportsFacilities: "Sports Facilities",
    joggingWalkingTracks: "Jogging/Walking Tracks",
    gardenParks: "Garden/Parks",
    communityHalls: "Community Halls",
    cinemaRoom: "Cinema Room",
    libraryReadingRoom: "Library/Reading Room",
  };

  const furnishingMap = {
    fans: "Fans",
    lights: "Lights",
    tv: "TV",
    beds: "Beds",
    ac: "AC",
    wardrobes: "Wardrobes",
    exhaustFans: "Exhaust Fans",
    curtains: "Curtains",
    floorLamps: "Floor Lamps",
    diningTable: "Dining Table",
    sofa: "Sofa",
    stove: "Stove",
    kitchenCabinets: "Kitchen Cabinets",
    chimney: "Chimney",
    coffeeTable: "Coffee Table",
    refrigerator: "Refrigerator",
    microwave: "Microwave",
    dishwasher: "Dishwasher",
    waterPurifier: "Water Purifier",
    washingMachine: "Washing Machine",
    workstations: "Workstations",
    meetingRooms: "Meeting Rooms",
    conferenceRooms: "Conference Rooms",
  };

  const nearbyPlacesMap = {
    hospital: "Hospital",
    school: "School",
    metro: "Metro Station",
    mall: "Mall",
    market: "Market",
    railway: "Railway Station",
    airport: "Airport",
    highway: "Highway",
    busStation: "Bus Station",
  };

  // Transform fields
  const amenitiesObj = Array.isArray(data.amenities)
    ? arrayToObject(data.amenities, amenitiesMap)
    : data.amenities || {};
  const furnishingObj = Array.isArray(data.furnishingDetails)
    ? arrayToObject(data.furnishingDetails, furnishingMap)
    : data.furnishingDetails || {};

  const amenities = Object.entries(amenitiesObj).reduce((acc, [key, value]) => {
    if (value && amenitiesMap[key]) {
      acc.push({ icon: "user", label: amenitiesMap[key] });
    }
    return acc;
  }, []);

  const furnishing = Object.entries(furnishingObj).reduce((acc, [key, value]) => {
    if ((typeof value === "number" && value > 0) || (typeof value === "boolean" && value)) {
      acc.push({
        icon: "fan",
        label: `${typeof value === "number" ? value : 1} ${furnishingMap[key] || key}`,
      });
    }
    return acc;
  }, []);

  const societyFeatures = Object.entries(data.societyBuildingFeatures || {}).reduce(
    (acc, [key, value]) => {
      if (value && societyFeaturesMap[key]) {
        acc.push({ icon: "swimming-pool", label: societyFeaturesMap[key] });
      }
      return acc;
    },
    []
  );

  const otherFeatures = Object.entries(data.otherFeatures || {}).reduce(
    (acc, [key, value]) => {
      if (value && otherFeaturesMap[key]) {
        acc.push({ icon: "door", label: otherFeaturesMap[key] });
      }
      return acc;
    },
    []
  );

  const nearbyPlaces = Object.entries(data.nearbyPlaces || {}).reduce(
    (acc, [key, value]) => {
      if (value && nearbyPlacesMap[key]) {
        acc.push({ icon: "train", label: nearbyPlacesMap[key] });
      }
      return acc;
    },
    []
  );

  // Category-specific logic
  let pricing = {};
  let features = [];
  let propertyDetails = [];
  let areaDetails = [];

  switch (category) {
    case "Residential":
      pricing = {
        expectedPrice: data.pricing?.expectedPrice || null,
        PricePerSqft: data.pricing?.PricePerSqft || null,
      };
      features = [
        {
          icon: "layout",
          label: data.about ? `${data.about.bedrooms || 0} BHK & ${data.about.bathrooms || 0} Baths` : "N/A",
        },
        {
          icon: "square",
          label: data.propertyArea?.carpetArea ? `${data.propertyArea.carpetArea} sq.ft.` : "N/A",
        },
        {
          icon: "layers",
          label: data.propertyOnFloor ? `${data.propertyOnFloor} / ${data.totalFloors || "N/A"} floors` : "N/A",
        },
        {
          icon: "tag",
          label: pricing.PricePerSqft ? `₹${pricing.PricePerSqft.toLocaleString("en-IN")} / sq.ft.` : "N/A",
        },
        {
          icon: "home",
          label: data.ageOfProperty ? `${data.ageOfProperty} Year Old` : "New Property",
        },
      ];
      propertyDetails = [
        { label: "Bedrooms", value: data.about?.bedrooms || "N/A" },
        { label: "Bathrooms", value: data.about?.bathrooms || "N/A" },
        { label: "Balconies", value: data.about?.balconies || "N/A" },
        { label: "Total no. of Floor", value: data.totalFloors || "N/A" },
        { label: "Property on Floor", value: data.propertyOnFloor || "N/A" },
        { label: "Availability Status", value: data.availabilityStatus || "N/A" },
        {
          label: "Available From",
          value: data.availableFrom ? new Date(data.availableFrom).toLocaleDateString() : "N/A",
        },
        { label: "Age of Property", value: data.ageOfProperty ? `${data.ageOfProperty} years` : "N/A" },
        { label: "Furnishing Status", value: data.furnishingStatus || "N/A" },
        { label: "Facing", value: data.facing || "N/A" },
        { label: "Power backup", value: data.powerBackup || "N/A" },
        { label: "Wheelchair Friendly", value: data.otherFeatures?.wheelchairFriendly ? "Yes" : "No" },
        { label: "Water Source", value: data.waterSource || "N/A" },
        { label: "Width of facing road", value: data.roadWidth || "N/A" },
        { label: "Type of flooring", value: data.flooring || "N/A" },
        { label: "Property ID", value: data._id },
      ];
      areaDetails = [
        {
          label: "Carpet Area",
          value: data.propertyArea?.carpetArea ? `${data.propertyArea.carpetArea} Sq.ft.` : "N/A",
          subValue: data.propertyArea?.carpetArea
            ? `${(data.propertyArea.carpetArea * 0.092903).toFixed(2)} Sq.m.` : "N/A",
        },
        {
          label: "Built-up Area",
          value: data.propertyArea?.carpetArea
            ? `${(data.propertyArea.carpetArea * 1.1).toFixed(0)} Sq.ft.` : "N/A",
          subValue: data.propertyArea?.carpetArea
            ? `${(data.propertyArea.carpetArea * 1.1 * 0.092903).toFixed(2)} Sq.m.` : "N/A",
        },
        {
          label: "Super Built-up Area",
          value: data.propertyArea?.carpetArea
            ? `${(data.propertyArea.carpetArea * 1.2).toFixed(0)} Sq.ft.` : "N/A",
          subValue: data.propertyArea?.carpetArea
            ? `${(data.propertyArea.carpetArea * 1.2 * 0.092903).toFixed(2)} Sq.m.` : "N/A",
        },
      ];
      break;

    case "Hotel":
      pricing = {
        expectedPrice: data.pricing?.basePricePerNight || data.pricing?.finalPrice || null,
      };
      features = [
        {
          icon: "layout",
          label: data.propertyDetails?.totalRooms ? `${data.propertyDetails.totalRooms} Rooms` : "N/A",
        },
        {
          icon: "star",
          label: data.propertyDetails?.starRating ? `${data.propertyDetails.starRating} Star` : "N/A",
        },
        {
          icon: "home",
          label: data.ageOfProperty ? `${data.ageOfProperty} Year Old` : "New Property",
        },
      ];
      propertyDetails = [
        { label: "Property Name", value: data.propertyDetails?.propertyName || "N/A" },
        { label: "Total Rooms", value: data.propertyDetails?.totalRooms || "N/A" },
        { label: "Star Rating", value: data.propertyDetails?.starRating || "N/A" },
        { label: "Availability Status", value: data.availabilityStatus || "N/A" },
        { label: "Property ID", value: data._id },
      ];
      areaDetails = [
        {
          label: "Total Area",
          value: data.propertyDetails?.totalArea?.size ? `${data.propertyDetails.totalArea.size} Sq.ft.` : "N/A",
          subValue: data.propertyDetails?.totalArea?.size
            ? `${(data.propertyDetails.totalArea.size * 0.092903).toFixed(2)} Sq.m.` : "N/A",
        },
      ];
      break;

    case "Office":
    case "Shop":
    case "Warehouse":
    case "EventSpace":
    case "PG":
      pricing = {
        expectedPrice:
          data.pricing?.price?.amount ||
          data.pricing?.rentalDetails?.monthlyRent ||
          data.pricing?.monthlyRent ||
          null,
      };
      features = [
        {
          icon: "layout",
          label: data.propertyDetails?.propertyName || data.subCategory || category,
        },
        {
          icon: "square",
          label: data.propertyDetails?.carpetArea?.size || data.carpetArea?.size
            ? `${data.propertyDetails?.carpetArea?.size || data.carpetArea?.size} sq.ft.` : "N/A",
        },
        {
          icon: "layers",
          label: data.propertyDetails?.floorDetails
            ? `${data.propertyDetails.floorDetails.officeOnFloor || "N/A"} / ${data.propertyDetails.floorDetails.totalFloors || "N/A"} floors`
            : "N/A",
        },
      ];
      propertyDetails = [
        { label: "Type", value: data.propertyDetails?.officeType || data.subCategory || category },
        { label: "Total Floors", value: data.propertyDetails?.floorDetails?.totalFloors || "N/A" },
        { label: "Property on Floor", value: data.propertyDetails?.floorDetails?.officeOnFloor || "N/A" },
        { label: "Furnished Status", value: data.propertyDetails?.furnishedStatus || data.furnishingStatus || "N/A" },
        { label: "Availability Status", value: data.availabilityStatus || "N/A" },
        { label: "Property ID", value: data._id },
      ];
      areaDetails = [
        {
          label: "Carpet Area",
          value: data.propertyDetails?.carpetArea?.size || data.carpetArea?.size
            ? `${data.propertyDetails?.carpetArea?.size || data.carpetArea?.size} Sq.ft.` : "N/A",
          subValue: data.propertyDetails?.carpetArea?.size || data.carpetArea?.size
            ? `${((data.propertyDetails?.carpetArea?.size || data.carpetArea?.size) * 0.092903).toFixed(2)} Sq.m.` : "N/A",
        },
      ];
      break;

    default:
      pricing = {
        expectedPrice: Array.isArray(data.pricing) ? data.pricing[0] : data.pricing?.expectedPrice || null,
      };
      features = [
        {
          icon: "home",
          label: data.ageOfProperty ? `${data.ageOfProperty} Year Old` : "New Property",
        },
      ];
      propertyDetails = [
        { label: "Category", value: category },
        { label: "Availability Status", value: data.availabilityStatus || "N/A" },
        { label: "Property ID", value: data._id },
      ];
      areaDetails = [
        {
          label: "Total Area",
          value: data.carpetArea?.size ? `${data.carpetArea.size} Sq.ft.` : "N/A",
          subValue: data.carpetArea?.size
            ? `${(data.carpetArea.size * 0.092903).toFixed(2)} Sq.m.` : "N/A",
        },
      ];
  }

  return {
    id: data._id,
    title: `${category} in ${data.location?.locality || "Unknown"}`,
    location: [
      data.location?.houseNumber,
      data.location?.apartment,
      data.location?.subLocality,
      data.location?.locality,
      data.location?.city,
      data.location?.state,
    ]
      .filter(Boolean)
      .join(", "),
    price:data.pricing?.expectedPrice
    ? `₹${data.pricing.expectedPrice.toLocaleString("en-IN")}`
    : data.pricing?.price?.amount
    ? `₹${data.pricing.price.amount.toLocaleString("en-IN")}`
    : data.pricing?.monthlyRent
    ? `₹${data.pricing.monthlyRent.toLocaleString("en-IN")}/mo`
    : "Price N/A",
    pricePerSqft: data.pricing.PricePerSqft ? `₹${data.pricing.PricePerSqft.toLocaleString("en-IN")} / sqft` : "N/A",
    isNegotiable: true,
    tags: [category, data.availabilityStatus || "N/A", data.furnishingStatus || "Unfurnished"].filter(Boolean),
    features,
    owner: {
      name: data.user?.name || "Unknown Owner",
      image: "/placeholder.svg?height=80&width=80",
      rating: data.reviews?.length
        ? (data.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / data.reviews.length).toFixed(1)
        : 0,
      reviews: data.reviews?.length || 0,
      phone: data.user?.mobile || "+91 00000 00000",
      WhatsApp: data.user?.whatsappMobile || "+91 00000 00000",
    },
    description: data.description || "No description available.",
    images: data.images?.map((img, index) => ({
      src: img.url || "/placeholder.svg?height=400&width=600",
      alt: img.name || `Image ${index + 1}`,
      label: img.name || `Image ${index + 1}`,
    })) || [],
    amenities,
    otherFeatures,
    societyFeatures,
    furnishing,
    propertyDetails,
    areaDetails,
    parking: [
      { label: "Covered Parking", value: data.parking?.covered || "0" },
      { label: "Open Parking", value: data.parking?.open || "0" },
    ],
    nearbyPlaces,
    reviews: data.reviews?.map((review) => ({
      user: {
        name: review.user?.name || "Anonymous",
        image: "/placeholder.svg?height=40&width=40",
        rating: review.rating || 0,
      },
      comment: review.comment || "No comment provided.",
      time: review.createdAt ? new Date(review.createdAt).toLocaleString() : "Unknown time",
    })) || [],
    ratingDistribution: {
      excellent: data.reviews?.length
        ? Math.round((data.reviews.filter((r) => r.rating >= 4.5).length / data.reviews.length) * 100)
        : 0,
      good: data.reviews?.length
        ? Math.round((data.reviews.filter((r) => r.rating >= 3.5 && r.rating < 4.5).length / data.reviews.length) * 100)
        : 0,
      average: data.reviews?.length
        ? Math.round((data.reviews.filter((r) => r.rating >= 2.5 && r.rating < 3.5).length / data.reviews.length) * 100)
        : 0,
      belowAverage: data.reviews?.length
        ? Math.round((data.reviews.filter((r) => r.rating >= 1.5 && r.rating < 2.5).length / data.reviews.length) * 100)
        : 0,
      poor: data.reviews?.length
        ? Math.round((data.reviews.filter((r) => r.rating < 1.5).length / data.reviews.length) * 100)
        : 0,
    },
  };
};

export default function PropertyDetails() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [showNotify, setShowNotify] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      if (!token) {
        setError("Please log in to view property details.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${BACKEND_URL}/properties/getProperty/${propertyId}`,
          {
            headers: { Authorization: token },
          }
        );
        const fetchedProperty = response.data.property;
        console.log("Fetched Property:", fetchedProperty); // Fixed typo: fetchProperty -> fetchedProperty
        if (!fetchedProperty) {
          throw new Error("No property data returned.");
        }
        const transformedProperty = transformPropertyData(fetchedProperty);
        console.log("Transformed Property:", transformedProperty);
        setProperty(transformedProperty);
      } catch (err) {
        setError(`Failed to fetch property details: ${err.response?.data?.error || err.message}`);
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ));
  };

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  const handleRatingHover = (rating) => {
    setHoverRating(rating);
  };

  const handleSubmitReview = async () => {
    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    if (!token) {
      alert("Please log in to submit a review.");
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/properties/add-review`,
        {
          propertyId: propertyId,
          rating: userRating,
          comment: reviewText,
        },
        {
          headers: { Authorization: token },
        }
      );
      alert("Review submitted successfully!");
      // Reset form
      setUserRating(0);
      setReviewText("");
      // Refetch property to update reviews
      const response = await axios.get(
        `${BACKEND_URL}/properties/getProperty/${propertyId}`,
        {
          headers: { Authorization: token },
        }
      );
      setProperty(transformPropertyData(response.data.property));
    } catch (err) {
      alert("Failed to submit review.");
      console.error("Error submitting review:", err);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="py-4">
            <h3 className="font-semibold text-lg mb-3">Description</h3>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
              {property.description}
            </p>

            <h3 className="font-semibold text-lg mb-3">Places Nearby</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {property.nearbyPlaces.map((place, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 text-xs"
                >
                  <span className="mr-1.5 bg-purple-100 rounded-full p-1 flex items-center justify-center">
                    <MapPin className="h-3 w-3 text-purple-600" />
                  </span>
                  {place.label}
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-lg mb-3">Property Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {property.propertyDetails.map((detail, index) => (
                <div key={index} className="flex justify-between border-b pb-2">
                  <span className="text-sm text-gray-600">{detail.label}</span>
                  <span className="text-sm font-medium">{detail.value}</span>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-lg mt-6 mb-3">Area of Property</h3>
            <div className="space-y-4 mb-8">
              {property.areaDetails.map((area, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <span className="text-sm text-gray-600">{area.label}</span>
                  <div className="text-right">
                    <div className="text-sm font-medium">{area.value}</div>
                    <div className="text-xs text-gray-500">{area.subValue}</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-lg mt-6 mb-3">Parking</h3>
            <div className="grid grid-cols-2 gap-4">
              {property.parking.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "amenities":
        return (
          <div className="py-4">
            <h3 className="font-semibold text-lg mb-4">Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {property.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-purple-500 bg-purple-50 p-2 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{amenity.label}</span>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-lg mt-6 mb-4">Other Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {property.otherFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-blue-500 bg-blue-50 p-2 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-lg mt-6 mb-4">
              Society/Building Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.societyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-green-500 bg-green-50 p-2 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "furnishing":
        return (
          <div className="py-4">
            <h3 className="font-semibold text-lg mb-4">Furnishing Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.furnishing.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-amber-500 bg-amber-50 p-2 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "gallery":
        return (
          <div className="py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {property.images.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden group shadow-sm cursor-pointer"
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                    <div className="text-white text-xs font-medium">
                      {image.label}
                    </div>
                    <button className="bg-white rounded-full p-1">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "review":
        return (
          <div className="py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 bg-gray-50 p-6 rounded-xl">
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600">
                  {property.owner.rating}
                </div>
                <div className="flex justify-center my-2">
                  {renderStars(property.owner.rating)}
                </div>
                <div className="text-sm text-gray-500">
                  Based on {property.owner.reviews} reviews
                </div>
              </div>

              <div className="flex-1 space-y-2 w-full max-w-md">
                <div className="flex items-center gap-2">
                  <span className="w-24 text-sm font-medium">Excellent</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: `${property.ratingDistribution.excellent}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">
                    {property.ratingDistribution.excellent}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-sm font-medium">Good</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="bg-lime-500 h-full"
                      style={{ width: `${property.ratingDistribution.good}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">
                    {property.ratingDistribution.good}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-sm font-medium">Average</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="bg-yellow-500 h-full"
                      style={{ width: `${property.ratingDistribution.average}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">
                    {property.ratingDistribution.average}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-sm font-medium">Below Average</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="bg-orange-500 h-full"
                      style={{
                        width: `${property.ratingDistribution.belowAverage}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">
                    {property.ratingDistribution.belowAverage}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-sm font-medium">Poor</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="bg-red-500 h-full"
                      style={{ width: `${property.ratingDistribution.poor}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">
                    {property.ratingDistribution.poor}%
                  </span>
                </div>
              </div>
            </div>

            {/* Review Submission Form */}
            <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Write a Review</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Your Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => handleRatingHover(star)}
                      onMouseLeave={() => handleRatingHover(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoverRating || userRating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Your Review
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this property..."
                  className="w-full border rounded-lg py-3 px-4 h-32 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                ></textarea>
              </div>

              <button
                onClick={handleSubmitReview}
                disabled={!userRating || !reviewText.trim()}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium ${
                  userRating && reviewText.trim()
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                } transition-colors`}
              >
                <Send className="h-4 w-4" />
                Submit Review
              </button>
            </div>

            <h3 className="font-semibold text-lg mb-4">Recent Reviews</h3>
            <div className="space-y-6">
              {property.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={review.user.image || "/placeholder.svg"}
                      alt={review.user.name}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white shadow-sm"
                    />
                    <div>
                      <div className="font-medium">{review.user.name}</div>
                      <div className="flex items-center">
                        {renderStars(review.user.rating)}
                        <span className="ml-1 text-sm font-medium">
                          {review.user.rating}
                        </span>
                      </div>
                    </div>
                    <div className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {review.time}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {review.comment}
                  </p>
                  <div className="flex gap-4 mt-2">
                    <button className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                      Reply
                    </button>
                    <button className="text-xs text-red-500 hover:text-red-700 font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const FeatureIcon = ({ type }) => {
    switch (type) {
      case "layout":
        return <Home className="h-5 w-5" />;
      case "square":
        return <SquareFootage className="h-5 w-5" />;
      case "layers":
        return <Layers className="h-5 w-5" />;
      case "tag":
        return <Tag className="h-5 w-5" />;
      case "home":
        return <Clock className="h-5 w-5" />;
      case "star":
        return <Star className="h-5 w-5" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  const ImageModal = ({ image, onClose }) => {
    if (!image) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
          <img
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            className="max-h-full max-w-full object-contain"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error || "Property not found."}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Property Details
          </h1>
          <div className="flex items-center text-sm">
            <span className="text-gray-500">
              Property ({property.propertyType || "N/A"})
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-gray-500">{property.propertyType || "Sell"}</span>
            <span className="mx-2 text-gray-300">•</span>
            <Link
              href="#"
              className="text-purple-600 font-medium hover:text-purple-800"
            >
              View
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Images and Details */}
          <div className="lg:col-span-2">
            {/* Property Image Carousel */}
            <div className="relative rounded-xl overflow-hidden mb-6 shadow-md bg-white">
              <div className="relative aspect-video">
                <img
                  src={property.images[currentImageIndex].src || "/placeholder.svg"}
                  alt={property.images[currentImageIndex].alt}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md">
                  {property.images[currentImageIndex].label}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                    <Heart className="h-5 w-5 text-red-500" />
                  </button>
                  <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                    <Share2 className="h-5 w-5 text-blue-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Title and Location */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {property.title}
                  </h2>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1.5 text-purple-500" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                </div>
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              {/* Price */}
              <div className="flex justify-between items-center mt-4 pb-4 border-b">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-purple-600">
                      {property.price}
                    </span>
                    <span className="text-sm text-gray-600">
                      {property.pricePerSqft}
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  {property.isNegotiable && "Negotiable"}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {property.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
                <button className="ml-auto bg-purple-100 text-purple-800 text-xs px-3 py-1.5 rounded-full flex items-center font-medium">
                  Play Video <ChevronRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {property.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-purple-500 bg-purple-50 p-2.5 rounded-full mb-2">
                    <FeatureIcon type={feature.icon} />
                  </div>
                  <span className="text-xs text-gray-700 font-medium">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-t-xl shadow-sm">
              <div className="flex overflow-x-auto scrollbar-hide">
                {["about", "amenities", "furnishing", "gallery", "review"].map(
                  (tab) => (
                    <button
                      key={tab}
                      className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === tab
                          ? "text-purple-600 border-purple-600"
                          : "text-gray-600 border-transparent hover:text-purple-500 hover:border-purple-200"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-b-xl shadow-sm p-6 mb-6">
              {renderTabContent()}
            </div>
          </div>

          {/* Right Column - Owner Info */}
          <div>
            <div className="bg-white border rounded-xl p-6 mb-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Property Owner
              </h3>
              <div className="flex flex-col items-center">
                <Image
                  src={property.owner.image || "/placeholder.svg"}
                  alt={property.owner.name}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white shadow-md mb-3"
                />
                <h4 className="font-semibold text-lg">{property.owner.name}</h4>
                <div className="flex items-center my-2">
                  {renderStars(property.owner.rating)}
                  <span className="ml-1 font-medium">
                    {property.owner.rating}
                  </span>
                  <span className="ml-1 text-xs text-gray-500">
                    {property.owner.reviews} reviews
                  </span>
                </div>
                <div className="w-full mt-4 space-y-3">
                  <a
                    href={`https://wa.me/${property.owner.WhatsApp.replace(
                      /\s+/g,
                      ""
                    )}`}
                    className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    <WhatsApp className="h-5 w-5" />
                    <span>Message on WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${property.owner.phone.replace(/\s+/g, "")}`}
                    className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Call Owner</span>
                  </a>
                </div>
                <div className="w-full mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowNotify(true)}
                    className="border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Notify
                  </button>
                  <button className="bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notify Modal */}
      {showNotify && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-lg">Notify</h3>
              <button
                onClick={() => setShowNotify(false)}
                className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Select Reason
                </label>
                <div className="relative">
                  <select className="w-full border rounded-lg py-2.5 px-3 appearance-none pr-8 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Change Photos</option>
                    <option>Wrong Information</option>
                    <option>Property Not Available</option>
                    <option>Other</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Notification
                </label>
                <textarea
                  placeholder="Enter Notification Text"
                  className="w-full border rounded-lg py-2.5 px-3 h-32 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => setShowNotify(false)}
                  className="border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
                <button className="bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Share Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}