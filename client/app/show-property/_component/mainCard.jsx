"use client";
import React, { useEffect, useState } from "react";
import {
  Heart,
  Search,
  Star,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SortFilter } from "./sortFilter";
import Image from "next/image";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";

const MainCard = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);


  

  // useEffect(() => {
  //   const fetchPropertyData = async () => {
  //     const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  //     if (!token) return;

  //     try {
  //       const response = await axios.get(
  //         `${BACKEND_URL}/properties/availableProperty`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       setPropertyData(response.data.properties || []);
  //     } catch (error) {
  //       console.error("Error fetching property data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPropertyData();
  // }, []);

  return (
    <div className="flex-1 p-4 rounded-xl">
      {/* Search Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input className="pl-10 bg-white" placeholder="Search area, city" />
        </div>
        <SortFilter />
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500">Loading properties...</p>
      ) : propertyData.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        <div className="space-y-6">
          {propertyData.map((property) => (
            <div key={property._id} className="border p-4 flex gap-4 bg-white rounded-xl">
              {/* Property Image */}
              <div className="relative w-[240px] h-[180px]">
                <Image
                  src={property.imageUrl || "/default-property.jpg"}
                  alt={property.name || "Property"}
                  fill
                  className="rounded-lg object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white rounded-full"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              {/* Property Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{property.name}</h3>
                    <p className="text-sm text-gray-600">{property.location}</p>
                  </div>

                  {/* Reviews (if available) */}
                  {property.reviews && property.reviews.length > 0 ? (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">
                        {(
                          property.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                          property.reviews.length
                        ).toFixed(1)}{" "}
                        ({property.reviews.length})
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">No Reviews</span>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex gap-8">
                    <div>
                      <p className="font-semibold">₹{property.price} Lac</p>
                      <p className="text-sm text-gray-600">Price</p>
                    </div>
                    <div>
                      <p className="font-semibold">{property.area} Sqft</p>
                      <p className="text-sm text-gray-600">Carpet Area</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      {property.propertyStatus} • Available
                    </p>
                    <div className="flex gap-2">
                      <Button size="icon" className="rounded-full bg-green-500">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button size="icon" className="rounded-full bg-purple-600">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainCard;
