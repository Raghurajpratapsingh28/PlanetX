"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import BACKEND_URL from "@/lib/BACKEND_URL";

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();

  // State for properties, loading, user, and feedback modal
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [sortBy, setSortBy] = useState("Relevance");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [userId, setUserId] = useState(null);

  // Fetch user data to get userId
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await fetch(`${BACKEND_URL}/auth/get-user`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();
      setUserId(data.user._id);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to load user data",
        variant: "destructive",
      });
      if (error.message === "No access token found") {
        router.push("/login");
      }
    }
  };

  // Fetch properties from backend
  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await fetch(`${BACKEND_URL}/properties/alluser-properties`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      setProperties(data.properties || []);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to load properties",
        variant: "destructive",
      });
      if (error.message === "No access token found") {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle delete property with feedback
  const handleDeleteProperty = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not available",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");

      const response = await fetch(`${BACKEND_URL}/properties/deleteProperty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          propertyId: selectedPropertyId,
          userId,
          feedback: feedbackText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete property");
      }

      toast({
        title: "Success",
        description: "Property deleted successfully. Thank you for your feedback!",
      });

      setIsFeedbackModalOpen(false);
      setFeedbackText("");
      setSelectedPropertyId(null);
      fetchProperties(); // Refresh properties
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete property",
        variant: "destructive",
      });
    }
  };

  // Check authentication, fetch user, and fetch properties on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      toast({
        title: "Error",
        description: "You have to login first!",
        variant: "destructive",
      });
    } else {
      fetchUser(); // Fetch userId first
      fetchProperties();
    }
  }, [router, toast]);

  // Filter and sort properties
  const filteredProperties = properties
    .filter((property) => (searchId ? property._id.includes(searchId) : true))
    .filter((property) =>
      filterStatus === "All" ? true : property.propertyStatus === filterStatus
    )
    .sort((a, b) => {
      if (sortBy === "Latest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "Oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 space-y-8">
      {/* Greeting Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome Back! 👋
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Manage your properties with ease.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
          onClick={() => router.push("/dashboard/add-property")}
        >
          <span className="font-medium">Add Property</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { title: "Total Properties", value: properties.length, icon: "🏠" },
          { title: "Active Properties", value: properties.filter((p) => p.propertyStatus === "Active").length, icon: "✅" },
          { title: "On-Hold Properties", value: properties.filter((p) => p.propertyStatus === "On-Hold").length, icon: "⏳" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by Property ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm w-full sm:w-auto"
        >
          <option>Relevance</option>
          <option>Latest</option>
          <option>Oldest</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm w-full sm:w-auto"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="On-Hold">On-Hold</option>
        </select>
      </div>

      {/* Property List */}
      <div className="space-y-6">
        {filteredProperties.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No properties found</p>
        ) : (
          filteredProperties.map((property, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-5"
            >
              <div className="w-full h-40 relative rounded-xl overflow-hidden">
                <Image
                  src={property.image || "/images/placeholder.jpg"}
                  alt={property.location.city}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                      Property Details
                    </p>
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                      {property.location.subLocality}, {property.location.locality}, {property.location.city}, {property.location.state}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {property.description || "No description available"}
                    </p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-500 capitalize">{property.propertyType || "N/A"}</p>
                      <p className="text-sm font-medium text-green-600">{property.category || "N/A"}</p>
                      <h1 className="text-lg font-semibold text-gray-900">
                        {property?.pricing?.price?.amount
                          ? `₹${property.pricing.price.amount.toLocaleString("en-IN")}`
                          : property?.pricing?.expectedPrice
                          ? `₹${property.pricing.expectedPrice.toLocaleString("en-IN")}`
                          : property?.pricing?.monthlyRent
                          ? `₹${property.pricing.monthlyRent.toLocaleString("en-IN")}/mo`
                          : "Price N/A"}
                      </h1>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">ID: {property._id}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0 Causative-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span className="text-sm">{property.likes || 0}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <span className="text-sm">Rating</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-400"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="text-sm">{property.rating || 0}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <motion.a
                    href={`/show-property/${property._id}`}
                    whileHover={{ scale: 1.05 }}
                    className="text-purple-600 flex items-center gap-1 hover:underline text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span>View Property</span>
                  </motion.a>
                  <p className="text-sm text-gray-500">
                    Added{" "}
                    {property.createdAt
                      ? new Date(property.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={property.propertyStatus}
                  onChange={(e) => {
                    toast({
                      title: "Info",
                      description: "Status update not implemented yet",
                    });
                  }}
                  className={`p-2 border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm ${
                    property.propertyStatus === "Active"
                      ? "border-green-500 text-green-600 bg-green-50"
                      : "border-yellow-500 text-yellow-600 bg-yellow-50"
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="On-Hold">On-Hold</option>
                </select>
                <div className="flex gap-2">
                  {[
                    { icon: "ℹ️", tooltip: "Info" },
                    { icon: "✏️", tooltip: "Edit" },
                    { icon: "🗑️", tooltip: "Delete" },
                  ].map((action, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                      title={action.tooltip}
                      onClick={() => {
                        if (action.tooltip === "Delete") {
                          setSelectedPropertyId(property._id);
                          setIsFeedbackModalOpen(true);
                        } else {
                          toast({
                            title: "Info",
                            description: `${action.tooltip} not implemented yet`,
                          });
                        }
                      }}
                    >
                      {action.icon}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Provide Feedback
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Why are you deleting this property? Your feedback helps us improve.
            </p>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Enter your feedback..."
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
              rows="4"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setIsFeedbackModalOpen(false);
                  setFeedbackText("");
                  setSelectedPropertyId(null);
                }}
                className="px-4 py-2 text-gray-600 rounded-xl hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProperty}
                disabled={!feedbackText.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all disabled:bg-gray-300"
              >
                Submit & Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}