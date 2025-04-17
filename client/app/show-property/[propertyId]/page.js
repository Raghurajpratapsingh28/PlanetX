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
  Edit,
  Trash,
} from "lucide-react";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

const transformPropertyData = (data) => {
  const category = data.category || "Residential";

  const arrayToObject = (arr, map) =>
    arr?.reduce((acc, key) => {
      if (map[key]) acc[key] = true;
      return acc;
    }, {}) || {};

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
    price: data.pricing?.expectedPrice
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
        ? (data.reviews.reduce((sum, r) => sum + (r.stars || 0), 0) / data.reviews.length).toFixed(1)
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
    ratingDistribution: {
      excellent: data.reviews?.length
        ? Math.round((data.reviews.filter((r) => r.stars >= 4.5).length / data.reviews.length) * 100)
        : 0,
      good: data.reviews?.length
        ? Math.round((data.reviews.filter((r) => r.stars >= 3.5 && r.stars < 4.5).length / data.reviews.length) * 100)
        : 0,
      average: data.reviews?.length
        ? Math.round((data.reviews.filter((r) => r.stars >= 2.5 && r.stars < 3.5).length / data.reviews.length) * 100)
        : 0,
      belowAverage: data.reviews?.length
        ? Math.round((data.reviews.filter((r) => r.stars >= 1.5 && r.stars < 2.5).length / data.reviews.length) * 100)
        : 0,
      poor: data.reviews?.length
        ? Math.round((data.reviews.filter((r) => r.stars < 1.5).length / data.reviews.length) * 100)
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
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchPropertyAndReviews = async () => {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      if (!token) {
        setError("Please log in to view property details.");
        setLoading(false);
        return;
      }
  
      try {
        setLoading(true);
  
        // Decode token to get userId
        const payload = JSON.parse(atob(token.split('.')[1]));
        const fetchedUserId = payload.userId;
        setUserId(fetchedUserId);
  
        // Fetch wishlist
        let wishlistProperties = [];
        try {
          const wishlistResponse = await axios.get(
            `${BACKEND_URL}/wishlist/get-wishlist/${fetchedUserId}`,
            { headers: { Authorization: token } }
          );
          wishlistProperties =
            wishlistResponse.data.wishlistsData?.map((item) => item._id) || [];
        } catch (wishlistError) {
          if (wishlistError.response?.data?.error === "No wishlists found for this user") {
            // Handle empty wishlist gracefully
            wishlistProperties = [];
          } else {
            throw wishlistError; // Rethrow other errors
          }
        }
        setWishlist(wishlistProperties);
  
        // Fetch property
        const propertyResponse = await axios.get(
          `${BACKEND_URL}/properties/getProperty/${propertyId}`,
          {
            headers: { Authorization: token },
          }
        );
        const fetchedProperty = propertyResponse.data.property;
        if (!fetchedProperty) {
          throw new Error("No property data returned.");
        }
        const transformedProperty = transformPropertyData(fetchedProperty);
        setProperty(transformedProperty);
  
        // Fetch reviews
        const reviewsResponse = await axios.get(
          `${BACKEND_URL}/properties/reviews/${propertyId}`,
          {
            headers: { Authorization: token },
          }
        );
        setReviews(reviewsResponse.data.reviews || []);
  
      } catch (err) {
        setError(`Failed to fetch data: ${err.response?.data?.error || err.message}`);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPropertyAndReviews();
  }, [propertyId]);

  const handleWishlistToggle = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "Please log in to manage your wishlist",
        variant: "destructive",
      });
      return;
    }

    setWishlistLoading(true);
    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    const isInWishlist = wishlist.includes(propertyId);

    try {
      if (isInWishlist) {
        const response = await axios.delete(
          `${BACKEND_URL}/wishlist/remove/${propertyId}`,
          {
            headers: { Authorization: token },
          }
        );

        if (response.status === 200) {
          setWishlist(wishlist.filter((id) => id !== propertyId));
          toast({
            title: "Success",
            description: "Property removed from wishlist",
            variant: "success",
          });
        }
      } else {
        await axios.post(
          `${BACKEND_URL}/wishlist/add-wishlist`,
          { userId, propertyIds: [propertyId] },
          { headers: { Authorization: token } }
        );
        setWishlist([...wishlist, propertyId]);
        toast({
          title: "Success",
          description: "Property added to wishlist",
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isInWishlist ? "remove from" : "add to"} wishlist`,
        variant: "destructive",
      });
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleShare = (platform) => {
    if (!property) return;
    
    const shareUrl = `${window.location.origin}/show-property/${propertyId}`;
    const shareText = `Check out this property: ${property.title} at ${property.location} for ${property.price}`;
    
    let url;
    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }
    
    window.open(url, "_blank");
    setShowShareOptions(false);
  };

  const handleSubmitNotification = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "Please log in to send a notification.",
        variant: "destructive",
      });
      return;
    }

    if (!notificationTitle.trim() || !notificationText.trim()) {
      toast({
        title: "Error",
        description: "Please provide both a title and notification text.",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    try {
      await axios.post(
        `${BACKEND_URL}/properties/post-notifications`,
        {
          userId,
          propertyId,
          title: notificationTitle,
          text: notificationText,
        },
        {
          headers: { Authorization: token },
        }
      );
      toast({
        title: "Success",
        description: "Notification sent successfully!",
        variant: "success",
      });
      setShowNotify(false);
      setNotificationTitle("");
      setNotificationText("");
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to send notification.",
        variant: "destructive",
      });
      console.error("Error sending notification:", err);
    }
  };

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
      toast({
        title: "Error",
        description: "Please log in to submit a review.",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/properties/add-review`,
        {
          propertyId: propertyId,
          stars: userRating,
          text: reviewText,
        },
        {
          headers: { Authorization: token },
        }
      );
      toast({
        title: "Success",
        description: "Review submitted successfully!",
        variant: "success",
      });
      setUserRating(0);
      setReviewText("");
      const [propertyResponse, reviewsResponse] = await Promise.all([
        axios.get(
          `${BACKEND_URL}/properties/getProperty/${propertyId}`,
          {
            headers: { Authorization: token },
          }
        ),
        axios.get(
          `${BACKEND_URL}/properties/reviews/${propertyId}`,
          {
            headers: { Authorization: token },
          }
        ),
      ]);
      setProperty(transformPropertyData(propertyResponse.data.property));
      setReviews(reviewsResponse.data.reviews || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to submit review.",
        variant: "destructive",
      });
      console.error("Error submitting review:", err);
    }
  };

  const handleEditReview = async (
    reviewId,
    currentStars,
    currentText
  ) => {
    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to edit a review.",
        variant: "destructive",
      });
      return;
    }

    const newText = prompt("Edit your review:", currentText);
    const newStarsInput = prompt("Edit your rating (1-5):", currentStars);
    const newStars = parseInt(newStarsInput);

    if (!newText || isNaN(newStars) || newStars < 1 || newStars > 5) {
      toast({
        title: "Error",
        description: "Invalid input. Please provide a valid review and rating (1-5).",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.patch(
        `${BACKEND_URL}/properties/edit-review/${reviewId}`,
        {
          stars: newStars,
          text: newText,
        },
        {
          headers: { Authorization: token },
        }
      );
      toast({
        title: "Success",
        description: "Review updated successfully!",
        variant: "success",
      });
      const reviewsResponse = await axios.get(
        `${BACKEND_URL}/properties/reviews/${propertyId}`,
        {
          headers: { Authorization: token },
        }
      );
      setReviews(reviewsResponse.data.reviews || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update review.",
        variant: "destructive",
      });
      console.error("Error updating review:", err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to delete a review.",
        variant: "destructive",
      });
      return;
    }

    if (!confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      await axios.delete(
        `${BACKEND_URL}/properties/delete-review/${reviewId}`,
        {
          headers: { Authorization: token },
        }
      );
      toast({
        title: "Success",
        description: "Review deleted successfully!",
        variant: "success",
      });
      const [propertyResponse, reviewsResponse] = await Promise.all([
        axios.get(
          `${BACKEND_URL}/properties/getProperty/${propertyId}`,
          {
            headers: { Authorization: token },
          }
        ),
        axios.get(
          `${BACKEND_URL}/properties/reviews/${propertyId}`,
          {
            headers: { Authorization: token },
          }
        ),
      ]);
      setProperty(transformPropertyData(propertyResponse.data.property));
      setReviews(reviewsResponse.data.reviews || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete review.",
        variant: "destructive",
      });
      console.error("Error deleting review:", err);
    }
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(property.images[index]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="py-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Places Nearby</h3>
            <div className="flex flex-wrap gap-2">
              {property.nearbyPlaces.map((place, index) => (
                <div
                  key={index}
                  className="flex items-center bg-indigo-50 text-indigo-700 rounded-full px-4 py-2 text-sm font-medium"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {place.label}
                </div>
              ))}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Property Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.propertyDetails.map((detail, index) => (
                <div key={index} className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">{detail.label}</span>
                  <span className="font-medium text-gray-800">{detail.value}</span>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Area of Property</h3>
            <div className="space-y-4">
              {property.areaDetails.map((area, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <span className="text-gray-600">{area.label}</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-800">{area.value}</div>
                    <div className="text-sm text-gray-500">{area.subValue}</div>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Parking</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.parking.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "amenities":
        return (
          <div className="py-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-indigo-600 bg-indigo-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-800">{amenity.label}</span>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Other Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.otherFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-blue-600 bg-blue-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-800">{feature.label}</span>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Society/Building Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.societyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-green-600 bg-green-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-800">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "furnishing":
        return (
          <div className="py-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Furnishing Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.furnishing.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-amber-600 bg-amber-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-800">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "gallery":
        return (
          <div className="py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {property.images.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden group shadow-md cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-sm font-medium">{image.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "review":
        return (
          <div className="py-6">
            <div className="bg-white rounded-xl p-6 shadow-md mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600">{property.owner.rating}</div>
                  <div className="flex justify-center my-2">{renderStars(property.owner.rating)}</div>
                  <div className="text-sm text-gray-500">Based on {property.owner.reviews} reviews</div>
                </div>
                <div className="flex-1 space-y-2 w-full max-w-md">
                  {[
                    { label: "Excellent", value: property.ratingDistribution.excellent, color: "bg-green-500" },
                    { label: "Good", value: property.ratingDistribution.good, color: "bg-lime-500" },
                    { label: "Average", value: property.ratingDistribution.average, color: "bg-yellow-500" },
                    { label: "Below Average", value: property.ratingDistribution.belowAverage, color: "bg-orange-500" },
                    { label: "Poor", value: property.ratingDistribution.poor, color: "bg-red-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-24 text-sm font-medium">{item.label}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`${item.color} h-full`} style={{ width: `${item.value}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500 w-8 text-right">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl piekzl shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Write a Review</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Rating</label>
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
                        className={`h-6 w-6 ${
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
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this property..."
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 h-32 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                onClick={handleSubmitReview}
                disabled={!userRating || !reviewText.trim()}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium w-full ${
                  userRating && reviewText.trim()
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                } transition-colors`}
              >
                <Send className="h-4 w-4" />
                Submit Review
              </button>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Reviews</h3>
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-sm text-gray-500">No reviews yet.</p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-600 border-2 border-white shadow-sm">
                        {(review.user?.name || "Anonymous").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{review.user?.name || "Anonymous"}</div>
                        <div className="flex items-center">
                          {renderStars(review.stars)}
                          <span className="ml-1 text-sm font-medium">{review.stars}</span>
                        </div>
                      </div>
                      <div className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {formatDistanceToNow(new Date(review.createdAt), {
                                  addSuffix: true,
                                })}
                        {/* {new Date(review.createdAt).toLocaleString()} */}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{review.text}</p>
                    {review.user?._id === userId && (
                      <div className="flex gap-4 mt-2">
                        <button
                          onClick={() => handleEditReview(review._id, review.stars, review.text)}
                          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center"
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
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
            className="max-h-full max-w-full object-contain rounded-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
    );
  };

  const ShareModal = () => {
    if (!showShareOptions) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-sm mx-4 shadow-xl">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Share Property</h3>
            <button
              onClick={() => setShowShareOptions(false)}
              className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6 flex flex-col gap-3">
            <button
              onClick={() => handleShare("whatsapp")}
              className="flex items-center gap-3 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.099-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.112-5.505 4.49-9.984 9.997-9.984 2.655 0 5.146.984 7.018 2.761a9.835 9.835 0 012.976 7.022c-.112 5.506-4.491 9.984-9.998 9.985zm6.403-1.714c.225.112.471.347.537.694.074.347.074.694-.173 1.103-.248.694-1.255 1.612-2.306 1.761-.571.085-1.213.112-1.996-.15-.446-.149-1.017-.347-1.758-.625-3.493-1.314-5.892-4.427-6.04-4.626-.149-.198-1.213-1.612-1.213-3.074 0-1.314.669-1.961.94-2.258.272-.297.571-.371.792-.371h.372c.198 0 .446-.025.669.446.272.595.892 1.985.892 1.985.025.099.05.198-.025.297-.074.099-.173.198-.347.297-.173.099-.347.297-.495.595-.149.297-.272.595-.149.892.123.297.619 1.016 1.48 1.985 1.115 1.255 2.033 1.612 2.33 1.784.297.173.595.074.792-.074.198-.149.446-.595.669-.892.223-.297.446-.347.669-.248.223.099.892.595 1.985 1.314.892.595 1.389.892 1.612.992z"/>
              </svg>
              WhatsApp
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center gap-3 px-4 py-3 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.095 7.14 2.095 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
              </svg>
              Twitter
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-500 text-lg font-medium">{error || "Property not found."}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Property Details</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>Property ({property.propertyType || "N/A"})</span>
            <span className="mx-2">•</span>
            <span>{property.propertyType || "Sell"}</span>
            <span className="mx-2">•</span>
            <Link href="#" className="text-indigo-600 font-medium hover:text-indigo-800">
              View
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="relative aspect-[16/9]">
                <img
                  src={property.images[currentImageIndex].src || "/placeholder.svg"}
                  alt={property.images[currentImageIndex].alt}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-gray-700" />
                </button>
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg text-sm font-medium shadow-md">
                  {property.images[currentImageIndex].label}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={handleWishlistToggle}
                    disabled={wishlistLoading}
                    className={`bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors ${
                      wishlistLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        wishlist.includes(propertyId)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => setShowShareOptions(true)}
                    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Share2 className="h-5 w-5 text-indigo-500" />
                  </button>
                </div>
              </div>
              <div className="flex overflow-x-auto gap-2 p-4 bg-white">
                {property.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                      currentImageIndex === index ? "border-indigo-500" : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{property.title}</h2>
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                </div>
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              <div className="flex justify-between items-center mt-4 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-indigo-600">{property.price}</span>
                  <span className="text-sm text-gray-600">{property.pricePerSqft}</span>
                </div>
                <div className="text-sm font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  {property.isNegotiable && "Negotiable"}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {property.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
                <button className="ml-auto bg-indigo-100 text-indigo-800 text-xs px-3 py-1.5 rounded-full flex items-center font-medium hover:bg-indigo-200 transition-colors">
                  Play Video <ChevronRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {property.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-indigo-500 bg-indigo-50 p-3 rounded-full mb-2">
                    <FeatureIcon type={feature.icon} />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="flex border-b border-gray-100">
                {["about", "amenities", "furnishing", "gallery", "review"].map((tab) => (
                  <button
                    key={tab}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-600 hover:text-indigo-500"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div className="p-6">{renderTabContent()}</div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Property Owner</h3>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 border-4 border-white shadow-md mb-3">
                  {property.owner.name.slice(0, 2).toUpperCase()}
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{property.owner.name}</h4>
                <div className="flex items-center my-2">
                  {renderStars(property.owner.rating)}
                  <span className="ml-1 font-medium">{property.owner.rating}</span>
                  <span className="ml-1 text-xs text-gray-500">({property.owner.reviews})</span>
                </div>
                <div className="w-full mt-4 space-y-3">
                  <a
                    href={`https://wa.me/${property.owner.WhatsApp.replace(/\s+/g, "")}`}
                    className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    <WhatsApp className="h-5 w-5" />
                    Message on WhatsApp
                  </a>
                  <a
                    href={`tel:${property.owner.phone.replace(/\s+/g, "")}`}
                    className="flex items-center justify-center gap-2 w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors font-medium"
                  >
                    <Phone className="h-5 w-5" />
                    Call Owner
                  </a>
                  <button
                    onClick={() => setShowNotify(true)}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Notify
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {showNotify && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Notify Owner</h3>
              <button
                onClick={() => setShowNotify(false)}
                className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Notification Title</label>
                <input
                  type="text"
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  placeholder="Enter Notification Title"
                  className="w-full border border-gray-200 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Notification Message</label>
                <textarea
                  value={notificationText}
                  onChange={(e) => setNotificationText(e.target.value)}
                  placeholder="Enter Notification Message"
                  className="w-full border border-gray-200 rounded-lg py-2.5 px-3 h-32 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => {
                    setNotificationTitle("");
                    setNotificationText("");
                  }}
                  className="border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleSubmitNotification}
                  disabled={!notificationTitle.trim() || !notificationText.trim()}
                  className={`py-2.5 rounded-lg font-medium transition-colors ${
                    notificationTitle.trim() && notificationText.trim()
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Send Notification
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
      <ShareModal />
    </div>
  );
}