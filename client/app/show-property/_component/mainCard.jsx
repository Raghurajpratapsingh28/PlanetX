"use client";

import React, { useEffect, useState } from "react";
import {
  Heart,
  Search,
  Star,
  ChevronDown,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SortFilter } from "./sortFilter";
import Image from "next/image";
import axios from "axios";
import BACKEND_URL, { token } from "@/lib/BACKEND_URL";

const MainCard = () => {
  const [propertyData, setPropertyData] = useState({});

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/properties/availableProperty`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPropertyData(response.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    if (token) {
      fetchPropertyData();
    }
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="w-full pl-10 py-2 sm:py-3 text-sm sm:text-base"
            placeholder="Search area, city"
          />
        </div>
        <SortFilter />
      </div>

      {/* Property Cards */}
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-shadow"
          >
            {/* Property Image */}
            <div className="relative w-full sm:w-60 h-48 sm:h-44 flex-shrink-0">
              <Image
                src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201000002818-szLXOpbE2ilxY1Q6amjLapJ3p1NlSl.png`}
                alt="Property"
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 640px) 100vw, 240px"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white rounded-full"
              >
                <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
              </Button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-white opacity-60"
                  />
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Vishwami Society
                  </h3>
                  <p className="text-sm text-gray-600">
                    4 BHK Flat in Paharganj, Delhi
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">4</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <div>
                    <p className="font-semibold text-gray-800">₹17.5 Lac</p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      ₹3,500 / sqft
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">500 Sqft</p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Carpet Area
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  Lorem ipsum is simply dummy text of the printing and
                  typesetting industry...
                </p>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="rounded-full text-xs py-1 px-3"
                  >
                    Ready to Move
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full text-xs py-1 px-3"
                  >
                    Furnished
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Property Owner • 2d ago
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      className="rounded-full bg-green-500 hover:bg-green-600"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="rounded-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCard;