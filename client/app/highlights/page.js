"use client";
import React, { useEffect, useState } from "react";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const HighlightsCard = () => {
    const router = useRouter();
    const {toast} = useToast();
  const [highlightData, setHighlightData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch highlight data from backend
  useEffect(() => {
    const fetchHighlightData = async () => {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      if (!token){
        setLoading(false)
        router.push("/login")
        toast({
            title: "Error",
            description: "You have to login first!",
            variant: "destructive",
          });
       
      }

      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/highlights/get-highlights`, {
          headers: { Authorization: token },
        });
        const properties = response.data.properties || [];
        setHighlightData(properties);
        console.log(properties);
        console.log(response);
      } catch (error) {
        console.error("Error fetching highlight data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlightData();
  }, []);

  return (
    <section className="flex-1 p-4 md:p-6 max-w-full">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Property Highlights</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading highlights...</p>
        ) : highlightData.length === 0 ? (
          <p className="text-center text-gray-600">No highlight videos available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {highlightData.map((highlight) => (
              <article
                key={highlight.propertyId}
                className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Video */}
                <div className="relative w-full h-64">
                  {highlight.video ? (
                    <video
                      src={highlight.video}
                      controls
                      className="rounded-lg object-cover w-full h-full"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
                      <Video className="h-12 w-12 text-gray-500" />
                      <span className="ml-2 text-gray-500">No Video Available</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Property ID: {highlight.propertyId}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Owner: {highlight.user.name} ({highlight.user.mobile})
                  </p>
                  {highlight.reviews?.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-700">
                        Reviews: {highlight.reviews.length}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    className="rounded-full bg-teal-600 hover:bg-teal-700 transition-colors"
                  >
                    View Details
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HighlightsCard;