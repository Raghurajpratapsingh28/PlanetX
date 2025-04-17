"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { useToast } from "@/hooks/use-toast";

export const Testimonials = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const { toast } = useToast();

  // Fetch feedback data
  useEffect(() => {
    const fetchFeedbacks = async () => {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/centralfeedback`, {
          headers: { Authorization: token },
        });
        if (response.status === 200) {
          // Filter feedbacks to include only 3, 4, or 5 stars and sort by stars in descending order
          const filteredAndSortedFeedbacks = (response.data.feedbacks || [])
            .filter((feedback) => feedback.stars >= 3)
            .sort((a, b) => b.stars - a.stars);
          setFeedbacks(filteredAndSortedFeedbacks);
        }
      } catch (error) {
        toast({
          title: "Error",
          description:
            error.response?.data?.error || "Failed to fetch feedback.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [toast]);

  const nextSlide = () => {
    if (scrollContainerRef.current && feedbacks.length > 0) {
      const newSlide = (currentSlide + 1) % feedbacks.length;
      setCurrentSlide(newSlide);
      const cardWidth = scrollContainerRef.current.children[0].offsetWidth + 16;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * newSlide,
        behavior: "smooth",
      });
    }
  };

  const prevSlide = () => {
    if (scrollContainerRef.current && feedbacks.length > 0) {
      const newSlide = (currentSlide - 1 + feedbacks.length) % feedbacks.length;
      setCurrentSlide(newSlide);
      const cardWidth = scrollContainerRef.current.children[0].offsetWidth + 16;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * newSlide,
        behavior: "smooth",
      });
    }
  };

  const handleDotClick = (index) => {
    if (scrollContainerRef.current) {
      setCurrentSlide(index);
      const cardWidth = scrollContainerRef.current.children[0].offsetWidth + 16;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  };

  // Function to get initials from the user's name
  const getInitials = (name) => {
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }
    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section className="relative py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-br from-white to-gray-50 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-16 gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight tracking-tight">
              What Our Users Say
            </h2>
            <p className="mt-3 font-poppins font-medium text-base md:text-lg text-gray-500 leading-relaxed">
              Discover why thousands trust us to find their perfect property.
            </p>
          </div>

          {feedbacks.length > 0 && (
            <div className="hidden md:flex items-center gap-5">
              <button
                onClick={prevSlide}
                className="p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-200 ease-in-out"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div className="flex gap-2">
                {feedbacks.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`rounded-full transition-all duration-200 ${
                      idx === currentSlide
                        ? "w-3 h-3 bg-gray-900"
                        : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    aria-current={idx === currentSlide ? "true" : "false"}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-200 ease-in-out"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          )}
        </div>

        {/* Testimonials */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-poppins text-lg">Loading feedback...</p>
          </div>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-600 font-poppins py-16 text-lg font-medium">
            No feedback available at the moment.
          </p>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-x-hidden"
          >
            {feedbacks.map((feedback, idx) => (
              <div
                key={feedback._id}
                className="flex-none w-80 sm:w-96 md:w-[28rem] bg-white border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col gap-6 snap-center shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-opacity-90 backdrop-blur-sm"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white font-poppins font-semibold text-lg md:text-xl border border-gray-100 shadow-sm">
                      {getInitials(feedback.userName)}
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-lg md:text-xl text-gray-900 tracking-tight">
                        {feedback.userName}
                      </h3>
                      <p className="font-poppins text-sm md:text-base text-gray-500 capitalize">
                        {feedback.feedbackType}
                      </p>
                    </div>
                  </div>
                  <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-purple-50 rounded-lg shadow-sm">
                    <Quote className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="font-poppins font-medium text-sm md:text-base text-gray-600 leading-relaxed line-clamp-4">
                    {feedback.content}
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 md:w-6 md:h-6 ${
                          i < feedback.stars
                            ? "fill-yellow-500 text-yellow-500"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Navigation */}
        {feedbacks.length > 0 && (
          <div className="flex md:hidden justify-center items-center gap-2 mt-6">
            {feedbacks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`rounded-full transition-all duration-200 ${
                  idx === currentSlide
                    ? "w-3 h-3 bg-gray-900"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
                aria-current={idx === currentSlide ? "true" : "false"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};