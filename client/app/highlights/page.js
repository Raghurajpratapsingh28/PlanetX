"use client";

import { useState, useRef } from "react";
import PropertyVideoPlayer from "@/components/property-video-player";
import AdPlaceholder from "@/components/ad-placeholder";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square, Heart, HomeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

// Mock data (unchanged)
const propertyData = [
  {
    id: "1",
    title: "Modern Beachfront Villa",
    description:
      "Experience luxury living in this stunning 4-bedroom beachfront villa with panoramic ocean views. This property features a private infinity pool, spacious outdoor entertaining area, and direct beach access. The interior boasts high ceilings, floor-to-ceiling windows, and premium finishes throughout.",
    location: "Malibu, California",
    price: "$4,500,000",
    bedrooms: 4,
    bathrooms: 5,
    area: "3,200 sq ft",
    tags: ["Beachfront", "Pool", "Luxury"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "2",
    title: "Downtown Penthouse Loft",
    description:
      "Stunning penthouse in the heart of downtown with 360-degree city views. This open-concept loft features exposed brick walls, industrial-style finishes, and a private rooftop terrace. Recently renovated with high-end appliances and smart home technology throughout.",
    location: "New York, NY",
    price: "$3,200,000",
    bedrooms: 3,
    bathrooms: 2.5,
    area: "2,800 sq ft",
    tags: ["Penthouse", "City View", "Modern"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "3",
    title: "Rustic Mountain Retreat",
    description:
      "Escape to this charming mountain cabin nestled among towering pines. This cozy retreat features a stone fireplace, vaulted ceilings with exposed beams, and a wraparound deck with mountain views. Perfect for year-round getaways with skiing nearby in winter and hiking in summer.",
    location: "Aspen, Colorado",
    price: "$1,850,000",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,950 sq ft",
    tags: ["Mountain View", "Fireplace", "Secluded"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "4",
    title: "Mediterranean Villa with Vineyard",
    description:
      "Exquisite Mediterranean-style estate surrounded by 5 acres of private vineyards. This property features a wine cellar, tasting room, and outdoor kitchen perfect for entertaining. The main residence offers luxurious living spaces with authentic architectural details and modern amenities.",
    location: "Napa Valley, California",
    price: "$5,750,000",
    bedrooms: 5,
    bathrooms: 6,
    area: "4,500 sq ft",
    tags: ["Vineyard", "Wine Cellar", "Estate"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "5",
    title: "Minimalist Urban Townhouse",
    description:
      "Contemporary townhouse with clean lines and minimalist design in a trendy neighborhood. This three-story home features an open floor plan, designer kitchen, and a rooftop deck with city views. Walking distance to boutique shops, cafes, and public transportation.",
    location: "Portland, Oregon",
    price: "$1,250,000",
    bedrooms: 3,
    bathrooms: 2.5,
    area: "2,100 sq ft",
    tags: ["Modern", "Urban", "Rooftop"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "6",
    title: "Waterfront Contemporary Home",
    description:
      "Sleek contemporary home situated on a private lake with floor-to-ceiling windows showcasing water views from every room. This architectural masterpiece features an open concept living area, gourmet kitchen, and a floating staircase. The outdoor space includes a dock and infinity-edge pool.",
    location: "Seattle, Washington",
    price: "$3,950,000",
    bedrooms: 4,
    bathrooms: 4.5,
    area: "3,800 sq ft",
    tags: ["Waterfront", "Contemporary", "Pool"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "7",
    title: "Historic Brownstone Renovation",
    description:
      "Meticulously restored 19th-century brownstone that blends historic charm with modern luxury. This home features original hardwood floors, crown moldings, and fireplaces alongside contemporary updates including a chef's kitchen and spa-like bathrooms. Includes a private garden oasis.",
    location: "Boston, Massachusetts",
    price: "$2,850,000",
    bedrooms: 4,
    bathrooms: 3.5,
    area: "3,200 sq ft",
    tags: ["Historic", "Renovated", "Garden"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "8",
    title: "Desert Modern Oasis",
    description:
      "Striking modern home designed to harmonize with the desert landscape. This architectural gem features walls of glass, a negative-edge pool, and a central courtyard with native landscaping. The interior showcases polished concrete floors, custom cabinetry, and mountain views from every room.",
    location: "Scottsdale, Arizona",
    price: "$2,400,000",
    bedrooms: 3,
    bathrooms: 3.5,
    area: "2,900 sq ft",
    tags: ["Desert", "Modern", "Pool"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "9",
    title: "Tropical Island Bungalow",
    description:
      "Luxurious beachfront bungalow with thatched roof and panoramic ocean views. This tropical paradise features indoor-outdoor living spaces, a private plunge pool, and direct access to white sand beaches. The property is surrounded by lush gardens and swaying palm trees.",
    location: "Maui, Hawaii",
    price: "$3,100,000",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,800 sq ft",
    tags: ["Beachfront", "Tropical", "Bungalow"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: "10",
    title: "Converted Industrial Loft",
    description:
      "Unique loft conversion in a former textile factory with soaring 14-foot ceilings and original architectural details. This one-of-a-kind space features exposed brick walls, massive factory windows, and preserved industrial elements alongside modern luxury finishes and smart home technology.",
    location: "Chicago, Illinois",
    price: "$1,750,000",
    bedrooms: 2,
    bathrooms: 2,
    area: "2,400 sq ft",
    tags: ["Loft", "Industrial", "Converted"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
  },
]


export default function Home() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedVideos, setViewedVideos] = useState(new Set()); // Track unique video views
  const [showAd, setShowAd] = useState(false); // Control ad visibility
  const touchStartX = useRef(null);
  const currentProperty = propertyData[currentIndex];

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
        <div
          className="mb-0 sm:mb-12"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <PropertyVideoPlayer
            video={currentProperty}
            onAddToWishlist={(id) => console.log(`Added ${id} to wishlist`)}
            onViewDetails={() => router.push(`/show-property/${currentProperty.id}`)}
            onNext={goToNextProperty}
            onPrevious={goToPreviousProperty}
            onPlay={() => handleVideoPlay(currentProperty.id)}
          />
        </div>

        {/* Ad overlay */}
        {showAd && <AdPlaceholder onClose={handleAdClose} />}

        {/* Property details */}
        <div className="sm:container sm:mx-auto sm:px-4 sm:pt-8">
          <div className="sm:mb-8 px-4 sm:px-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              {currentProperty.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-6 sm:mb-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">{currentProperty.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6">
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
                </div>

                <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8">
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
                </div>

                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Description</h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {currentProperty.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {currentProperty.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs sm:text-sm px-2 sm:px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Contact Agent</h3>
                <Button
                  onClick={() => router.push(`/show-property/${currentProperty.id}`)}
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