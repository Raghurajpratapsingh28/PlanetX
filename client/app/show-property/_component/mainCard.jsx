"use client";
import React, { useEffect, useState } from "react";
import { Heart, Search, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// SortFilter Component
const SortFilter = ({ onSortChange }) => {
  const handleSortChange = (value) => {
    onSortChange(value);
  };

  return (
    <Select onValueChange={handleSortChange} defaultValue="default">
      <SelectTrigger className="w-[180px] bg-white border-gray-200 focus:border-teal-600 rounded-lg">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Default</SelectItem>
        <SelectItem value="price-asc">Price: High to Low</SelectItem>
        <SelectItem value="price-desc">Price: Low to High</SelectItem>
      </SelectContent>
    </Select>
  );
};

// MainCard Component
const MainCard = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState({});
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Fetch user ID and wishlist data
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
      if (!token) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${BACKEND_URL}/properties/availableProperty?${new URLSearchParams(
            searchParams
          ).toString()}`,
          { headers: { Authorization: token } }
        );
        const properties = response.data.properties || [];
        setPropertyData(properties);
        setFilteredProperties(properties);
      } catch (error) {
        console.error("Error fetching property data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [searchParams]);

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

  // Filter and sort properties
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    let filtered = propertyData;
    if (term) {
      filtered = propertyData.filter((property) => {
        const name = property.name?.toLowerCase() || "";
        const description = property.description?.toLowerCase() || "";
        const category = property.category?.toLowerCase() || "";
        const propertyType = property.propertyType?.toLowerCase() || "";
        const propertyStatus = property.propertyStatus?.toLowerCase() || "";
        const location = getFullAddress(property.location).toLowerCase();

        return (
          name.includes(term) ||
          description.includes(term) ||
          category.includes(term) ||
          propertyType.includes(term) ||
          propertyStatus.includes(term) ||
          location.includes(term)
        );
      });
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      const getPrice = (property) =>
        property?.pricing?.price?.amount ||
        property?.pricing?.expectedPrice ||
        property?.pricing?.monthlyRent ||
        0;

      const priceA = getPrice(a);
      const priceB = getPrice(b);

      if (sortOption === "price-asc") {
        return priceA - priceB;
      } else if (sortOption === "price-desc") {
        return priceB - priceA;
      }
      return 0; // Default: no sorting
    });

    setFilteredProperties(sorted);
  };

  // Handle sort change
  const handleSortChange = (value) => {
    setSortOption(value);
    handleSearch({ target: { value: searchTerm } }); // Re-apply search with current term and new sort
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

  const getAverageRating = (reviews) =>
    reviews?.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.stars || 0), 0) / reviews.length
        ).toFixed(1)
      : null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <section className="flex-1 p-6 max-w-full bg-gray-50">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-6xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 w-full bg-white border-gray-200 focus:border-teal-600 rounded-lg py-2 transition-all duration-200"
            placeholder="Search by area, city, name, category, or type"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <SortFilter onSortChange={handleSortChange} />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <p className="text-center text-gray-600 py-12">
            {searchTerm
              ? `No properties found for "${searchTerm}". Try a different search term.`
              : "No properties available at the moment."}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {filteredProperties.map((property) => {
              const averageRating = getAverageRating(property.reviews);
              return (
                <article
                  key={property._id}
                  className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative w-full md:w-72 h-56 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={property.images?.[0]?.url || "/default-property.jpg"}
                      alt={property.location.subLocality || "Property"}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full transition-all duration-200"
                      onClick={() => handleWishlistToggle(property._id)}
                      disabled={wishlistLoading[property._id]}
                    >
                      {wishlistLoading[property._id] ? (
                        <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
                      ) : (
                        <Heart
                          className={`h-6 w-6 transition-all duration-200 ${
                            wishlist.includes(property._id)
                              ? "text-red-500 fill-red-500"
                              : "text-gray-500 hover:text-red-500"
                          }`}
                        />
                      )}
                    </Button>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col md:flex-row justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 truncate">
                            {property.location.subLocality},{" "}
                            {property.location.locality}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                            {getFullAddress(property.location)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {averageRating ? (
                            <>
                              <div className="flex">{renderStars(averageRating)}</div>
                              <span className="text-sm font-medium text-gray-700">
                                {averageRating} ({property.reviews.length})
                              </span>
                            </>
                          ) : (
                            <span className="text-sm text-gray-500">
                              No Reviews
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3 mt-2">
                        <span className="text-sm text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-full capitalize">
                          {property.category || "Unknown"}
                        </span>
                        <span className="text-sm text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full capitalize">
                          {property.propertyType || "Unknown"}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                        {property.description ||
                          "No description available for this property."}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">
                            {property?.pricing?.price?.amount
                              ? `₹${property.pricing.price.amount.toLocaleString(
                                  "en-IN"
                                )}`
                              : property?.pricing?.expectedPrice
                              ? `₹${property.pricing.expectedPrice.toLocaleString(
                                  "en-IN"
                                )}`
                              : property?.pricing?.monthlyRent
                              ? `₹${property.pricing.monthlyRent.toLocaleString(
                                  "en-IN"
                                )}/mo`
                              : "Price N/A"}
                          </p>
                          <p className="text-xs text-gray-500">Price</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">
                            {property.area} Sqft
                          </p>
                          <p className="text-xs text-gray-500">Carpet Area</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <p className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full capitalize">
                        {property.propertyStatus}
                      </p>
                      <div className="flex gap-2">
                        <Link href={`/show-property/${property._id}`}>
                          <Button
                            size="sm"
                            className="rounded-full bg-teal-600 hover:bg-teal-700 transition-colors px-4"
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MainCard;