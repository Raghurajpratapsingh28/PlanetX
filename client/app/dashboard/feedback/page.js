"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import BACKEND_URL from "@/lib/BACKEND_URL";

const FeedBackPage = () => {
  const [feedbackType, setFeedbackType] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit feedback.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to submit feedback.",
        variant: "destructive",
      });
      return;
    }

    if (!feedbackType || !rating || !comment) {
      toast({
        title: "Error",
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/centralfeedback`,
        {
          feedbackType,
          stars: rating,
          content: comment,
        },
        {
          headers: { Authorization: token },
        }
      );

      if (response.status === 201) {
        setIsSubmitted(true);
        toast({
          title: "Success",
          description: "Feedback submitted successfully!",
          variant: "success",
        });
        setTimeout(() => {
          setFeedbackType("");
          setRating(0);
          setComment("");
          setIsSubmitted(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Feedback submission error:", {
        message: error.message,
        response: error.response?.data,
      });
      toast({
        title: "Error",
        description:
          error.response?.data?.error || "Failed to submit feedback.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl transform transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
          Share Your Feedback
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
          We value your feedback! Your insights help us enhance our services and
          deliver the best experience tailored for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Feedback Type
            </label>
            <select
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 bg-white transition-all duration-200"
              disabled={isSubmitting}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="website">Website Experience</option>
              <option value="service">Service Quality</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Rate Your Experience
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl ${
                    star <= rating
                      ? "text-yellow-500"
                      : "text-gray-300 hover:text-yellow-400"
                  } transition-colors duration-200`}
                  disabled={isSubmitting}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Your Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe your experience here"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 resize-none text-gray-700 bg-white transition-all duration-200"
              disabled={isSubmitting}
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full p-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>

        {isSubmitted && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl text-center transform transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 mb-6">
                We truly appreciate your time and valuable insights.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white p-2 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedBackPage;