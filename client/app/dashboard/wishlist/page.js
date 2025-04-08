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
import { SlidersHorizontal, Eye, Heart } from "lucide-react";
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
  // const [userId, setUserId] = useState(null);
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
    houseVilla2: false,
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
          headers: {
            Authorization: token,
          },
        });
        
        console.log("user Data:",userResponse.data);

        if (!userResponse.data.user) {
          throw new Error("User data not found");
        }
        
        const currentUserId = userResponse.data.user._id;
        // setUserId(currentUserId);
        console.log(currentUserId);

        const wishlistResponse = await axios.get(
          `${BACKEND_URL}/wishlist/get-wishlist/${currentUserId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (wishlistResponse.status === 200) {
          const wishlistsData = wishlistResponse.data.wishlists;
          console.log("Wishlists Data:", wishlistsData);
          if (!wishlistsData || !Array.isArray(wishlistsData)) {
            throw new Error("Invalid wishlist data format");
          }

          const validatedWishlists = wishlistsData.map(wishlist => {
            if (!wishlist.properties || wishlist.properties.length === 0) {
              console.warn(`Wishlist ${wishlist._id} has no properties`);
              return { ...wishlist, properties: [] };
            }
            const validProperties = wishlist.properties.filter(prop => {
              if (!prop._id) {
                console.error(`Invalid property in wishlist ${wishlist._id}:`, prop);
                return false;
              }
              return true;
            });
            return { ...wishlist, properties: validProperties };
          });

          setWishlists(validatedWishlists);
          
          if (validatedWishlists.every(w => w.properties.length === 0)) {
            throw new Error("Failed to fetch property");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: error.message === "Failed to fetch property" 
            ? "Failed to fetch property"
            : error.response?.data?.error || "Failed to fetch wishlists",
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
      sortedWishlists.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (value === "desc") {
      sortedWishlists.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    setWishlists(sortedWishlists);
  };

  const handleFilterChange = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // console.log("Wishlists:", wishlists);

  //Isko uncomment mat karna ya erase mat krna
  // const propertyId = wishlists.map((wishlist) => wishlist.properties.map((prop) => prop._id));

  //   const fetchPropertyData = async (propertyId) => {
  //     try {
  //       const response = axios.get(`${BACKEND_URL}/properties/availableProperty`, {})
  //     } catch (error) {
  //       
  //     }
  //   } 

  const filteredWishlists = wishlists.filter((wishlist) => {
    const propertyTypes = wishlist.properties.map((prop) => prop.type);
    if (filters.flatApartment && !propertyTypes.includes("Flat / Apartment"))
      return false;
    if (filters.houseVilla && !propertyTypes.includes("House / Villa"))
      return false;
    if (filters.hotels && !propertyTypes.includes("Hotels")) return false;
    if (filters.warehouse && !propertyTypes.includes("Warehouse")) return false;
    if (
      filters.retailProperties &&
      !propertyTypes.includes("Retail Properties")
    )
      return false;
    if (
      filters.industrialProperties &&
      !propertyTypes.includes("Industrial Properties")
    )
      return false;
    if (
      filters.coworkingOffices &&
      !propertyTypes.includes("Co-working Offices")
    )
      return false;
    if (filters.pgCoLiving && !propertyTypes.includes("PG / Co-Living"))
      return false;
    if (filters.farmHouse && !propertyTypes.includes("Farm House"))
      return false;
    if (filters.vacationHomes && !propertyTypes.includes("Vacation Homes"))
      return false;
    if (filters.houseVilla2 && !propertyTypes.includes("House / Villa"))
      return false;
    return true;
  });

  const handleViewProperty = (propertyId) => {
    router.push(`/property/${propertyId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>
        
        {/* Filter and Sort Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center mb-6">
          <Button
            className="flex items-center gap-2 text-gray-700 hover:bg-gray-100"
            variant="ghost"
            onClick={() => setIsFilterOpen(true)}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="text-lg font-medium">Filters</span>
          </Button>
          <Select onValueChange={handleSortChange} value={sortBy}>
            <SelectTrigger className="w-48 border-gray-200">
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
          <DialogContent className="sm:max-w-[425px] rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Filter Properties</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {Object.entries(filters).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={() => handleFilterChange(key)}
                    className="border-gray-300"
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
            <DialogFooter>
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
                    houseVilla2: false,
                  })
                }
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Clear
              </Button>
              <Button
                onClick={() => setIsFilterOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Wishlist Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your wishlist...</p>
          </div>
        ) : filteredWishlists.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No properties in your wishlist yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWishlists.map((wishlist) =>
              wishlist.properties.map((property) => (
                <div
                  key={property._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={property.image || "/placeholder-image.jpg"}
                      alt={property.title}
                      className="w-full h-56 object-cover"
                    />
                    <Button
                      variant="ghost"
                      className="absolute top-2 right-2 text-red-500 hover:text-red-600 p-1"
                    >
                      <Heart className="w-6 h-6" />
                    </Button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800 truncate">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {property.address}
                    </p>
                    <p className="text-gray-500 text-sm mt-2 font-medium">
                      {property.type}
                    </p>
                    <p className="text-2xl font-bold text-blue-600 mt-3">
                      ₹{property.price} Lac
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                        onClick={() => handleViewProperty(property._id)}
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-gray-600">
                          <svg
                            className="w-5 h-5 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishListPage;