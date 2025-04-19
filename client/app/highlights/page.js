// Highlights.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import PropertyVideoPlayer from "@/components/property-video-player";
import AdPlaceholder from "@/components/ad-placeholder";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square, Heart, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { useToast } from "@/hooks/use-toast";

export default function Highlights() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedVideos, setViewedVideos] = useState(new Set());
  const [showAd, setShowAd] = useState(false);
  const touchStartX = useRef(null);
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState({});
  const [adCounter, setAdCounter] = useState(0); // Track ad frequency

  // Fetch user ID and wishlist
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      if (!token) return;

      try {
        const userResponse = await axios.get(`${BACKEND_URL}/auth/get-user`, {
          headers: { Authorization: token },
        });
        const fetchedUserId = userResponse.data.user._id;
        setUserId(fetchedUserId);

        const wishlistResponse = await axios.get(
          `${BACKEND_URL}/wishlist/get-wishlist/${fetchedUserId}`,
          { headers: { Authorization: token } }
        );
        const wishlistProperties =
          wishlistResponse.data.wishlistsData?.map((item) => item._id) || [];
        setWishlist(wishlistProperties);
      } catch (error) {
        console.error("Error fetching user or wishlist data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch properties
  useEffect(() => {
    const fetchPropertyData = async () => {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      if (!token) {
        toast({
          title: "Error",
          description: "Please log in to view properties",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/highlights/get-highlights`, {
          headers: { Authorization: token },
        });
        if (response.status === 200) {
          setPropertyData(response.data.properties);
        }
      } catch (error) {
        console.error("Error fetching properties!", error);
        toast({
          title: "Error",
          description: "Failed to fetch properties",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyData();
  }, []);

  const currentProperty = propertyData[currentIndex];

  // Handle wishlist toggle
  const handleWishlistToggle = async (propertyId) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "Please log in to manage your wishlist",
        variant: "destructive",
      });
      return;
    }

    setWishlistLoading((prev) => ({ ...prev, [propertyId]: true }));
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
      setWishlistLoading((prev) => ({ ...prev, [propertyId]: false }));
    }
  };

  // Handle ad display logic
  const triggerAd = () => {
    if (adCounter % 2 === 0) {
      setShowAd(true);
    }
    setAdCounter((prev) => prev + 1);
  };

  const goToNextProperty = () => {
    if (showAd) return;
    triggerAd(); // Show ad on next property navigation
    setCurrentIndex((prev) => (prev === propertyData.length - 1 ? 0 : prev + 1));
  };

  const goToPreviousProperty = () => {
    if (showAd) return;
    triggerAd(); // Show ad on previous property navigation
    setCurrentIndex((prev) => (prev === 0 ? propertyData.length - 1 : prev - 1));
  };

  const handleTouchStart = (e) => {
    if (showAd) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (showAd || !touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    if (deltaX > 50) {
      goToPreviousProperty();
    } else if (deltaX < -50) {
      goToNextProperty();
    }
    touchStartX.current = null;
  };

  const handleAdClose = () => {
    setShowAd(false);
  };

  const getFullAddress = (location) =>
    [
      location?.houseNumber,
      location?.apartment,
      location?.subLocality,
      location?.locality,
      location?.city,
      location?.state,
    ]
      .filter(Boolean)
      .join(", ");

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 text-teal-600 animate-spin mx-auto" />
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        ) : !currentProperty && propertyData.length === 0 ? (
          <p className="text-center text-gray-600 py-12">
            No properties available at the moment.
          </p>
        ) : (
          <>
            {/* Navigation controls for desktop */}
            <div className="hidden sm:flex sm:flex-row justify-between items-center mb-8 gap-4">
              <Button
                variant="outline"
                size="lg"
                className="w-auto flex items-center gap-2 bg-blue-400 hover:bg-blue-500 transition-colors rounded-full px-4 py-2 border-gray-200"
                onClick={goToPreviousProperty}
                aria-label="Previous property"
                disabled={showAd}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </Button>
              <div className="text-sm text-gray-500">
                Property {currentIndex + 1} of {propertyData.length}
              </div>
              <Button
                variant="outline"
                size="lg"
                className="w-auto flex items-center gap-2 bg-blue-400 hover:bg-blue-500 transition-colors rounded-full px-4 py-2 border-gray-200"
                onClick={goToNextProperty}
                aria-label="Next property"
                disabled={showAd}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Video player */}
            {currentProperty ? (
              <PropertyVideoPlayer
                video={currentProperty.video}
                onAddToWishlist={() => handleWishlistToggle(currentProperty.propertyId)}
                onViewDetails={() => router.push(`/show-property/${currentProperty.propertyId}`)}
                onNext={goToNextProperty}
                onPrevious={goToPreviousProperty}
                onPlay={() => {
                  triggerAd(); // Show ad on video play
                }}
                onPause={() => {
                  triggerAd(); // Show ad on video pause
                }}
                onEnd={() => {
                  triggerAd(); // Show ad on video end
                }}
              />
            ) : (
              <p className="text-center text-gray-600">Select a property to view</p>
            )}

            {/* Ad overlay */}
            {showAd && <AdPlaceholder onClose={handleAdClose} />}

            {/* Property details */}
            {currentProperty && (
              <div className="sm:container sm:mx-auto sm:px-4 sm:pt-8">
                <div className="sm:mb-8 px-4 sm:px-0">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                    {currentProperty.category !== "N/A"
                      ? currentProperty.category
                      : currentProperty.description}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-6 sm:mb-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span className="text-sm sm:text-base">
                      {getFullAddress(currentProperty.location) || "Location N/A"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
                  <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 mb-2 sm:mb-0">
                          {currentProperty?.pricing?.price?.amount
                            ? `₹${currentProperty.pricing.price.amount.toLocaleString(
                                "en-IN"
                              )}`
                            : currentProperty?.pricing?.expectedPrice
                            ? `₹${currentProperty.pricing.expectedPrice.toLocaleString(
                                "en-IN"
                              )}`
                            : currentProperty?.pricing?.monthlyRent
                            ? `₹${currentProperty.pricing.monthlyRent.toLocaleString(
                                "en-IN"
                              )}/mo`
                            : "Price N/A"}
                        </h2>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-white/90 hover:bg-white transition-all duration-200"
                          onClick={() => handleWishlistToggle(currentProperty.propertyId)}
                          disabled={wishlistLoading[currentProperty.propertyId]}
                          aria-label="Toggle wishlist"
                        >
                          {wishlistLoading[currentProperty.propertyId] ? (
                            <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
                          ) : (
                            <Heart
                              className={`h-12 w-12 transition-all duration-200 ${
                                wishlist.includes(currentProperty.propertyId)
                                  ? "text-red-500 fill-red-500"
                                  : "text-gray-500 hover:text-red-500"
                              }`}
                            />
                          )}
                        </Button>
                      </div>

                      <div className="mb-6 sm:mb-8">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                          Description
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          {currentProperty.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {currentProperty.tags.length > 0 ? (
                          currentProperty.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-teal-50 text-teal-600"
                            >
                              {tag}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No tags available</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
                      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                        Contact Agent
                      </h3>
                      <Button
                        onClick={() =>
                          router.push(`/show-property/${currentProperty.propertyId}`)
                        }
                        className="w-full mb-3 text-sm sm:text-base rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors"
                      >
                        Show Details
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-sm sm:text-base rounded-lg border-teal-600 text-teal-600 hover:bg-teal-50"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}