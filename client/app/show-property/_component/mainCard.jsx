"use client";
import React, { useEffect, useState } from "react";
import { Heart, Search, Star, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SortFilter } from "./sortFilter";
import Image from "next/image";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { useSearchParams } from "next/navigation";

const MainCard = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // data backend se maga rha hu yrr
  useEffect(() => {
    const fetchPropertyData = async () => {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      if (!token) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${BACKEND_URL}/properties/availableProperty?${new URLSearchParams(searchParams).toString()}`,
          { headers: { Authorization: token } }
        );
        const properties = response.data.properties || [];
        setPropertyData(properties);
        setFilteredProperties(properties);
        console.log(properties);
      } catch (error) {
        console.error("Error fetching property data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [searchParams]);

  // Filter properties based on search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = propertyData.filter(
      (property) =>
        property.name?.toLowerCase().includes(term) ||
        JSON.stringify(property.location)?.toLowerCase().includes(term)
    );
    setFilteredProperties(filtered);
  };

  // adress ko sahi se kia hai 
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

  // rating hai bhai
  const getAverageRating = (reviews) =>
    reviews?.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <section className="flex-1 p-4 md:p-6 max-w-full">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 max-w-6xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="pl-10 w-full bg-white border-gray-200 focus:border-teal-500 transition-colors"
            placeholder="Search area, city, or property name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <SortFilter />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-600">Loading properties...</p>
        ) : filteredProperties.length === 0 ? (
          <p className="text-center text-gray-600">
            {searchTerm ? "No properties match your search." : "No properties available."}
          </p>
        ) : (
          <div className="grid gap-6">
            {filteredProperties.map((property) => (
              <article
                key={property._id}
                className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-full md:w-64 h-48 flex-shrink-0">
                  <img
                    src={
                      property.images?.[0]?.url || "/default-property.jpg"
                    }
                    alt={property.name || "Property"}
                    fill
                    className="rounded-lg object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                  >
                    <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                  </Button>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col md:flex-row justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
                          {property.location.subLocality}, {property.location.locality}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {getFullAddress(property.location)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {property.reviews?.length > 0 ? (
                          <>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-700">
                              {getAverageRating(property.reviews)} ({property.reviews.length})
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">No Reviews</span>
                        )}
                      </div>
                    </div>

                    <p className="text-md text-teal-600 mt-1 capitalize">
                      {property.category || "Unknown Category"}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                      {property.description || "No description available for this property."}
                    </p>
                         
                    <p className="text-sm text-teal-600 mt-1 capitalize">
                      {property.propertyType || "Unknown Type"}
                    </p>
                    

                    <div className="mt-3 flex flex-col sm:flex-row gap-4">
                      <div className="min-w-[100px]">
                        <p className="text-lg font-semibold text-gray-800">
                          {property?.pricing?.price?.amount
                            ? `₹${property.pricing.price.amount.toLocaleString("en-IN")}`
                            : property?.pricing?.monthlyRent
                            ? `₹${property.pricing.monthlyRent.toLocaleString("en-IN")}/mo`
                            : "N/A"}
                        </p>
                        <p className="text-xs text-gray-500">Price</p>
                      </div>
                      <div className="min-w-[100px]">
                        <p className="text-lg font-semibold text-gray-800">
                          {property.area} Sqft
                        </p>
                        <p className="text-xs text-gray-500">Carpet Area</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <p className="text-sm text-green-600 capitalize">
                      {property.propertyStatus}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="rounded-full bg-green-600 hover:bg-green-700 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MainCard;