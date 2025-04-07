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
        // console.log("wishlist Response:", wishlistResponse.data);
        // console.log(`${BACKEND_URL}/wishlist/get-wishlist/${currentUserId}`);
        // console.log("wishlist Response:",wishlistResponse);

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
    <div className="p-4">
      <span className="text-xl font-semibold">Wishlist</span>
      <div className="bg-white w-full flex justify-between p-4 rounded-xl mt-2">
        <Button
          className="flex items-center gap-2"
          variant="ghost"
          onClick={() => setIsFilterOpen(true)}
        >
          <SlidersHorizontal />
          <label className="text-lg">Filter</label>
        </Button>
        <div>
          <Select onValueChange={handleSortChange} value={sortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By: Relevance</SelectLabel>
                <SelectItem value="asc">Newest First</SelectItem>
                <SelectItem value="desc">Oldest First</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="houseVilla"
                checked={filters.houseVilla}
                onCheckedChange={() => handleFilterChange("houseVilla")}
              />
              <label htmlFor="houseVilla">House / Villa</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="flatApartment"
                checked={filters.flatApartment}
                onCheckedChange={() => handleFilterChange("flatApartment")}
              />
              <label htmlFor="flatApartment">Flat / Apartment</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hotels"
                checked={filters.hotels}
                onCheckedChange={() => handleFilterChange("hotels")}
              />
              <label htmlFor="hotels">Hotels</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pgCoLiving"
                checked={filters.pgCoLiving}
                onCheckedChange={() => handleFilterChange("pgCoLiving")}
              />
              <label htmlFor="pgCoLiving">PG / Co-Living</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="warehouse"
                checked={filters.warehouse}
                onCheckedChange={() => handleFilterChange("warehouse")}
              />
              <label htmlFor="warehouse">Warehouse</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="farmHouse"
                checked={filters.farmHouse}
                onCheckedChange={() => handleFilterChange("farmHouse")}
              />
              <label htmlFor="farmHouse">Farm House</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="retailProperties"
                checked={filters.retailProperties}
                onCheckedChange={() => handleFilterChange("retailProperties")}
              />
              <label htmlFor="retailProperties">Retail Properties</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="vacationHomes"
                checked={filters.vacationHomes}
                onCheckedChange={() => handleFilterChange("vacationHomes")}
              />
              <label htmlFor="vacationHomes">Vacation Homes</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="industrialProperties"
                checked={filters.industrialProperties}
                onCheckedChange={() => handleFilterChange("industrialProperties")}
              />
              <label htmlFor="industrialProperties">Industrial Properties</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="coworkingOffices"
                checked={filters.coworkingOffices}
                onCheckedChange={() => handleFilterChange("coworkingOffices")}
              />
              <label htmlFor="coworkingOffices">Co-working Offices</label>
            </div>
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
            >
              Clear
            </Button>
            <Button onClick={() => setIsFilterOpen(false)}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : filteredWishlists.length === 0 ? (
        <div className="text-center py-10">No wishlists found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredWishlists.map((wishlist) =>
            wishlist.properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={property.image || "/placeholder-image.jpg"}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="text-gray-600 text-sm">{property.address}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {property.type}
                  </p>
                  <p className="text-lg font-bold mt-2">
                    ₹{property.price} Lac
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2"
                      onClick={() => handleViewProperty(property._id)}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {property.rating || "4.5"}
                      </span>
                      <Button variant="ghost" className="text-red-500">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    ID: {property._id}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default WishListPage;