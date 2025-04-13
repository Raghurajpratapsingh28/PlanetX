"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";

export const NearbyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNearbyProperties = async () => {
      try {
        if (!navigator.geolocation) {
          console.error("Geolocation not supported");
          setLoading(false);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const token = localStorage.getItem("accessToken")?.replace(
              /^"|"$/g,
              ""
            );

            try {
              const response = await axios.get(
                `${BACKEND_URL}/properties/nearby-properties`,
                {
                  headers: { Authorization: token },
                  params: { latitude, longitude, maxDistance: 10 },
                }
              );

              setProperties(response.data.nearbyProperties || []);
            } catch (error) {
              console.error("Error fetching nearby properties:", error);
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error("Unexpected error:", error);
        setLoading(false);
      }
    };

    fetchNearbyProperties();
  }, []);

  // Helper to format address
  const getFullAddress = (location) =>
    [
      location?.subLocality,
      location?.locality,
      location?.city,
    ]
      .filter(Boolean)
      .join(", ");

  return (
    <section className="w-full py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Nearby Property</h2>
        </div>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {loading ? (
                <CarouselItem>
                  <p className="text-center text-gray-600 py-12">
                    Loading properties...
                  </p>
                </CarouselItem>
              ) : properties.length === 0 ? (
                <CarouselItem>
                  <p className="text-center text-gray-600 py-12">
                    No nearby properties found.
                  </p>
                </CarouselItem>
              ) : (
                properties.map((property) => (
                  <CarouselItem
                    key={property._id}
                    className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4 first:pl-0"
                  >
                    <Card className="w-[295px] h-[361px] flex flex-col border border-[#E1E1E1] rounded-xl overflow-hidden">
                      <div className="relative w-full h-[200px]">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-3 top-3 z-10 bg-white/80 hover:bg-white/90 rounded-full w-8 h-8"
                        >
                          <Heart className="w-5 h-5" />
                        </Button>
                        <Image
                          src={property.images?.[0]?.url || "/placeholder.svg"}
                          alt={property.location?.subLocality || "Property"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="flex flex-col gap-2 p-4">
                        <h3 className="font-semibold text-lg truncate">
                          {property.location?.subLocality ||
                            property.location?.locality ||
                            "Property"}
                        </h3>
                        <div className="flex flex-col gap-1">
                          <p className="font-medium capitalize">
                            {property.category || "Unknown"}
                          </p>
                          <div className="flex items-center gap-1 text-gray-500">
                            <span className="text-sm truncate">
                              {getFullAddress(property.location)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <p className="font-semibold text-lg">
                              {property.pricing?.[0]
                                ? `₹${(property.pricing[0] / 100000).toFixed(
                                    1
                                  )} Lac`
                                : "Price N/A"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {property.builtUpArea?.size && property.pricing?.[0]
                                ? `₹${Math.round(
                                    property.pricing[0] /
                                      property.builtUpArea.size
                                  )}`
                                : "N/A"}{" "}
                              / sqft
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {property.propertyStatus || "Active"}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            <div className="absolute -top-14 right-0 flex gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};