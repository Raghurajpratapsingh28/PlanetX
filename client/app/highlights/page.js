"use client";

import { useState, useRef, useEffect } from "react";
import PropertyVideoPlayer from "@/components/property-video-player";
import AdPlaceholder from "@/components/ad-placeholder";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square, Heart, HomeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { set } from "date-fns";

export default function Home() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedVideos, setViewedVideos] = useState(new Set()); // Track unique video views
  const [showAd, setShowAd] = useState(false); // Control ad visibility
  const touchStartX = useRef(null);
  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    const fetchPropertyData = async ()=>{
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      console.log(token);
      try {
        const response = await axios.get(`${BACKEND_URL}/highlights/get-highlights`,{
          headers: {
            Authorization: token
          }
        });
        console.log("Response:", response);
        if(response.status === 200){
          setPropertyData(response.data.properties);
        }
      } catch (error) {
        console.error("Error fecthing properties!", error);
      }
    }
    fetchPropertyData();
  },[]);

  console.log(propertyData);
  const currentProperty = propertyData[currentIndex];
  console.log("Current Property:", currentProperty);

  // Track video view and trigger ad after every 2 unique videos
  const handleVideoPlay = (videoId) => {
    if (!viewedVideos.has(videoId)) {
      const newViewedVideos = new Set(viewedVideos).add(videoId);
      setViewedVideos(newViewedVideos);

      // Show ad after every 2 unique videos (2, 4, 6, etc.)
      if (newViewedVideos.size >= 2 && newViewedVideos.size % 2 === 0) {
        setShowAd(true);
      }
    }
  };

  const goToNextProperty = () => {
    if (showAd) return; // Prevent navigation while ad is shown
    setCurrentIndex((prev) => (prev === propertyData.length - 1 ? 0 : prev + 1));
  };

  const goToPreviousProperty = () => {
    if (showAd) return; // Prevent navigation while ad is shown
    setCurrentIndex((prev) => (prev === 0 ? propertyData.length - 1 : prev - 1));
  };

  // Swipe gesture handling for mobile
  const handleTouchStart = (e) => {
    if (showAd) return; // Disable swipe during ad
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

  // Close ad and allow navigation
  const handleAdClose = () => {
    setShowAd(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:py-12">
        {/* Navigation controls for desktop */}
        <div className="hidden sm:flex sm:flex-row justify-between items-center mb-8 gap-4">
          <Button
            variant="outline"
            size="lg"
            className="w-auto flex items-center gap-2 hover:bg-gray-100 transition-colors rounded-full px-4 py-2"
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
            className="w-auto flex items-center gap-2 hover:bg-gray-100 transition-colors rounded-full px-4 py-2"
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
    onAddToWishlist={(id) => console.log(`Added ${id} to wishlist`)}
    onViewDetails={() => router.push(`/show-property/${currentProperty.propertyId}`)}
    onNext={goToNextProperty}
  />
) : (
  <p>Loading property...</p> // or a spinner component
)}

        {/* Ad overlay */}
        {showAd && <AdPlaceholder onClose={handleAdClose} />}

        {/* Property details */}
        <div className="sm:container sm:mx-auto sm:px-4 sm:pt-8">
          {/* <div className="sm:mb-8 px-4 sm:px-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              {currentProperty.title? currentProperty.title: "N/A"}
            </h1>
            <div className="flex items-center text-gray-600 mb-6 sm:mb-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">{currentProperty.location?currentProperty.location:'N/A'}</span>
            </div>
          </div> */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                {/* <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2 sm:mb-0">
                    {currentProperty.price}
                  </h2>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-gray-100 transition-transform hover:scale-105"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div> */}

                {/* <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-sm sm:text-base">{currentProperty.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <HomeIcon  className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-sm sm:text-base">{currentProperty.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-sm sm:text-base">{currentProperty.area}</span>
                  </div>
                </div> */}

                {/* <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Description</h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {currentProperty.description}
                  </p>
                </div> */}

                {/* <div className="flex flex-wrap gap-2 sm:gap-3">
                  {currentProperty.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs sm:text-sm px-2 sm:px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div> */}
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Contact Agent</h3>
                <Button
                  onClick={() => router.push(`/show-property/${currentProperty.propertyId}`)}
                  className="w-full mb-3 text-sm sm:text-base rounded-lg"
                >
                  Show in Details
                </Button>
                <Button variant="outline" className="w-full text-sm sm:text-base rounded-lg">
                  Request Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}