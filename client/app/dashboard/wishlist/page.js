"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SlidersHorizontal, Eye, Heart, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import BACKEND_URL from "@/lib/BACKEND_URL";
import axios from "axios";

const WishListPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [deletingPropertyId, setDeletingPropertyId] = useState(null); // Track deleting property
  const [filters, setFilters] = useState({
    houseVilla: false,
    hotels: false,
    warehouse: false,
    retailProperties: false,
    industrialProperties: false,
    coworkingOffices: false,
    flatApartment: false,
    pgCoLiving: false,
    farmHouse: false,
    vacationHomes: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    if (!token) {
      router.push("/login");
      toast({
        title: "Error",
        description: "You have to login first!",
        variant: "destructive",
      });
      return;
    }

    const fetchUserAndWishlists = async () => {
      try {
        setLoading(true);
        const userResponse = await axios.get(`${BACKEND_URL}/auth/get-user`, {
          headers: { Authorization: token },
        });

        if (!userResponse.data.user) {
          throw new Error("User data not found");
        }

        const currentUserId = userResponse.data.user._id;
        const wishlistResponse = await axios.get(
          `${BACKEND_URL}/wishlist/get-wishlist/${currentUserId}`,
          { headers: { Authorization: token } }
        );

        if (wishlistResponse.status === 200) {
          const wishlistsData = wishlistResponse.data.wishlistsData;
          if (!Array.isArray(wishlistsData)) {
            throw new Error("Invalid wishlist data format");
          }
          setWishlists(wishlistsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description:
            error.response?.data?.error || "Failed to fetch wishlists",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndWishlists();
  }, [router, toast]);

  const handleSortChange = (value) => {
    setSortBy(value);
    const sortedWishlists = [...wishlists];
    if (value === "asc") {
      sortedWishlists.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (value === "desc") {
      sortedWishlists.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    setWishlists(sortedWishlists);
  };

  const handleFilterChange = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredWishlists = wishlists.filter((property) => {
    const propertyType = property.type;
    if (filters.houseVilla && propertyType !== "House / Villa") return false;
    if (filters.hotels && propertyType !== "Hotels") return false;
    if (filters.warehouse && propertyType !== "Warehouse") return false;
    if (filters.retailProperties && propertyType !== "Retail Properties") return false;
    if (filters.industrialProperties && propertyType !== "Industrial Properties") return false;
    if (filters.coworkingOffices && propertyType !== "Co-working Offices") return false;
    if (filters.flatApartment && propertyType !== "Flat / Apartment") return false;
    if (filters.pgCoLiving && propertyType !== "PG / Co-Living") return false;
    if (filters.farmHouse && propertyType !== "Farm House") return false;
    if (filters.vacationHomes && propertyType !== "Vacation Homes") return false;
    return true;
  });

  const handleViewProperty = (propertyId) => {
    router.push(`/show-property/${propertyId}`);
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

  const handleRemoveFromWishlist = async (propertyId) => {
    try {
      setDeletingPropertyId(propertyId); // Set loading state for this property
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      const DeleteResponse = await axios.delete(`${BACKEND_URL}/wishlist/remove/${propertyId}`, 
        {
          headers: { Authorization: token },
        });

      if (DeleteResponse.statusText === "OK") {
        setWishlists(wishlists.filter((prop) => prop._id !== propertyId));
        toast({
          title: "Success",
          description: "Property removed from wishlist",
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove property from wishlist",
        variant: "destructive",
      });
    } finally {
      setDeletingPropertyId(null); // Clear loading state
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">My Wishlist</h1>

        {/* Filter and Sort Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <Button
            className="flex items-center gap-2 text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2 rounded-md w-full sm:w-auto"
            onClick={() => setIsFilterOpen(true)}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="text-sm font-medium">Filters</span>
          </Button>
          <Select onValueChange={handleSortChange} value={sortBy}>
            <SelectTrigger className="w-full sm:w-48 border-gray-200 rounded-md focus:ring-indigo-500">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="asc">Newest First</SelectItem>
                <SelectItem value="desc">Oldest First</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Filter Dialog */}
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogContent className="sm:max-w-lg rounded-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900">Filter Properties</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              {Object.entries(filters).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={() => handleFilterChange(key)}
                    className="border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={key}
                    className="text-sm font-medium text-gray-700 capitalize"
                  >
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                </div>
              ))}
            </div>
            <DialogFooter className="flex justify-between sm:justify-end gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setFilters({
                    houseVilla: false,
                    hotels: false,
                    warehouse: false,
                    retailProperties: false,
                    industrialProperties: false,
                    coworkingOffices: false,
                    flatApartment: false,
                    pgCoLiving: false,
                    farmHouse: false,
                    vacationHomes: false,
                  })
                }
                className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Clear
              </Button>
              <Button
                onClick={() => setIsFilterOpen(false)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4"
              >
                Apply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Wishlist Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-base">Loading your wishlist...</p>
          </div>
        ) : wishlists.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {(filters.houseVilla ||
              filters.hotels ||
              filters.warehouse ||
              filters.retailProperties ||
              filters.industrialProperties ||
              filters.coworkingOffices ||
              filters.flatApartment ||
              filters.pgCoLiving ||
              filters.farmHouse ||
              filters.vacationHomes
              ? filteredWishlists
              : wishlists
            ).map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg w-full"
              >
                <div className="relative">
                  <img
                    src={property.images?.[0]?.url || "/placeholder-image.jpg"}
                    alt={property.title}
                    className="w-full h-48 sm:h-56 object-cover"
                    loading="lazy"
                  />
                  <Button
                    variant="ghost"
                    className="absolute top-3 right-3 text-red-500 hover:text-red-600 bg-white rounded-full p-2 shadow-sm"
                    onClick={() => handleRemoveFromWishlist(property._id)}
                    title="Remove from Wishlist"
                    disabled={deletingPropertyId === property._id}
                  >
                    {deletingPropertyId === property._id ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-500"></div>
                    ) : (
                      <Trash className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate flex-1">
                      {property.location.subLocality}, {property.location.locality}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {getFullAddress(property.location) || "Address not available"}
                  </p>
                  <p className="text-gray-600 text-sm mt-2 font-medium">
                    {property.propertyType || "Unknown Type"}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-indigo-600 mt-3">
                    {property?.pricing?.price?.amount
                      ? `₹${property.pricing.price.amount.toLocaleString("en-IN")}`
                      : property?.pricing?.expectedPrice
                      ? `₹${property.pricing.expectedPrice.toLocaleString("en-IN")}`
                      : property?.pricing?.monthlyRent
                      ? `₹${property.pricing.monthlyRent.toLocaleString("en-IN")}/mo`
                      : "Price N/A"}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-3">
                    <Button
                      className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md px-4 py-2 w-full sm:w-auto"
                      onClick={() => handleViewProperty(property._id)}
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-gray-600 text-sm">
                        <svg
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {property.rating || "4.5"}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mt-3">
                    ID: {property._id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishListPage;