"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";

export default function DashboardPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [sortBy, setSortBy] = useState("Relevance");
  const [filterStatus, setFilterStatus] = useState("All");
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeProperties: 0,
    onHoldProperties: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const userMobile = localStorage.getItem("userMobile");
    
    if (!userMobile) {
      setError("User information not found. Please login again.");
      setLoading(false);
      return;
    }

    fetchProperties(userMobile);
  }, []);

  const fetchProperties = async (mobile) => {
    try {
      setLoading(true);
      
      const response = await axios.post(`${BACKEND_URL}/alluser-properties`, { mobile }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      
  console.log("Fetched properties:", response.data.properties);


      const processedProperties = response.data.properties.map(property => ({
        ...property,
        likes: property.reviews?.length || 0,
        rating: calculateAverageRating(property.reviews),
        image: property.images?.[0] || "/images/property-placeholder.jpg",
        addedDate: formatDate(property.createdAt || new Date())
      }));

      setProperties(processedProperties);
      
      const activeCount = processedProperties.filter(p => p.status === "Active").length;
      const onHoldCount = processedProperties.filter(p => p.status === "On-Hold").length;
      
      setStats({
        totalProperties: processedProperties.length,
        activeProperties: activeCount,
        onHoldProperties: onHoldCount
      });
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError(err.response?.data?.error || err.message);
      setLoading(false);
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const updatePropertyStatus = async (propertyId, newStatus) => {
    try {
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
      };
      
      await axios.put(`/api/properties/${propertyId}/status`, { status: newStatus }, axiosConfig);

      // Update local state
      setProperties(prevProperties => 
        prevProperties.map(property => 
          property._id === propertyId ? { ...property, status: newStatus } : property
        )
      );

      // Recalculate stats
      const updatedProperties = properties.map(property => 
        property._id === propertyId ? { ...property, status: newStatus } : property
      );
      const activeCount = updatedProperties.filter(p => p.status === "Active").length;
      const onHoldCount = updatedProperties.filter(p => p.status === "On-Hold").length;
      
      setStats({
        totalProperties: updatedProperties.length,
        activeProperties: activeCount,
        onHoldProperties: onHoldCount
      });
    } catch (err) {
      console.error("Error updating property status:", err);
      alert("Failed to update property status: " + (err.response?.data?.error || err.message));
    }
  };

  // Filter and sort properties
  const filteredProperties = properties
    .filter(property => 
      (filterStatus === "All" || property.status === filterStatus) &&
      (searchId === "" || property._id?.includes(searchId))
    )
    .sort((a, b) => {
      if (sortBy === "Latest") {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      } else if (sortBy === "Oldest") {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      return 0;
    });

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Greeting Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
            Hello, User! 👋
          </h1>
          <p className="text-sm sm:text-lg text-gray-500">Good Morning!</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-[#7B00FF] to-[#A933FF] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg flex items-center gap-2 hover:shadow-xl transition-shadow w-full sm:w-auto"
        >
          <span className="font-semibold text-sm sm:text-base">Add Property</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sm:w-5 sm:h-5"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "Total Property", value: stats.totalProperties, icon: "🏠" },
          { title: "Active Property", value: stats.activeProperties, icon: "✅" },
          { title: "On-Hold Property", value: stats.onHoldProperties, icon: "⏳" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
          >
            <div>
              <p className="text-xs sm:text-sm text-gray-500">{stat.title}</p>
              <p className="text-xl sm:text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className="text-2xl sm:text-4xl">{stat.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-3 items-center bg-white p-3 sm:p-4 rounded-2xl shadow-sm">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full p-2 sm:p-3 pl-8 sm:pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7B00FF] transition-all text-sm sm:text-base"
          />
          <svg
            className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5"
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
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setFilterStatus(filterStatus === "All" ? "Active" : (filterStatus === "Active" ? "On-Hold" : "All"))}
          className="p-2 sm:p-3 border border-gray-200 rounded-xl flex items-center gap-1 sm:gap-2 hover:bg-gray-50 transition-colors w-full sm:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sm:w-5 sm:h-5"
          >
            <path d="M3 6h18" />
            <path d="M7 12h10" />
            <path d="M10 18h4" />
          </svg>
          <span className="text-gray-700 text-sm sm:text-base">Filter: {filterStatus}</span>
        </motion.button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 sm:p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7B00FF] transition-all text-sm sm:text-base w-full sm:w-auto"
        >
          <option>Relevance</option>
          <option>Latest</option>
          <option>Oldest</option>
        </select>
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin w-10 h-10 border-4 border-[#7B00FF] border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      )}
      
      {error && !loading && (
        <div className="text-center py-8 bg-red-50 rounded-2xl p-4">
          <p className="text-red-600">Error: {error}</p>
          <button 
            onClick={() => {
              setError(null);
              fetchProperties(localStorage.getItem("userMobile"));
            }}
            className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      )}
      
      {/* No Results */}
      {!loading && !error && filteredProperties.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-2xl p-4">
          <p className="text-gray-600">No properties found matching your criteria.</p>
        </div>
      )}

      {/* Property List */}
      {!loading && !error && filteredProperties.length > 0 && (
        <div className="space-y-4 sm:space-y-6">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col gap-4"
            >
              {/* Property Image */}
              <div className="w-full h-32 sm:h-40 relative rounded-xl overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Property Details */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                      Property Name
                    </p>
                    <h2 className="text-base sm:text-xl font-semibold text-gray-800 hover:text-[#7B00FF] transition-colors line-clamp-2">
                      {property.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{property.type}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">ID: {property._id}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 sm:mt-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="sm:w-5 sm:h-5"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span className="text-sm sm:text-base">{property.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <span className="text-xs sm:text-sm">Rating</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-400 sm:w-5 sm:h-5"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="text-sm sm:text-base">{property.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                  <motion.a
                    href={`/property/${property._id}`}
                    whileHover={{ scale: 1.05 }}
                    className="text-[#7B00FF] flex items-center gap-1 hover:underline text-sm sm:text-base"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="sm:w-5 sm:h-5"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span>View Property</span>
                  </motion.a>
                  <p className="text-xs sm:text-sm text-gray-500">Added {property.addedDate}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <select
                  value={property.status}
                  onChange={(e) => updatePropertyStatus(property._id, e.target.value)}
                  className={`p-2 sm:p-2 border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#7B00FF] transition-all text-sm sm:text-base w-full sm:w-auto ${
                    property.status === "Active"
                      ? "border-green-500 text-green-600 bg-green-50"
                      : "border-yellow-500 text-yellow-600 bg-yellow-50"
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="On-Hold">On-Hold</option>
                </select>
                <div className="flex gap-2">
                  {[
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="sm:w-5 sm:h-5"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v.01" />
                          <path d="M12 8v4" />
                        </svg>
                      ),
                      tooltip: "Info",
                      onClick: () => window.location.href = `/property/${property._id}`
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="sm:w-5 sm:h-5"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      ),
                      tooltip: "Edit",
                      onClick: () => window.location.href = `/property/edit/${property._id}`
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="sm:w-5 sm:h-5"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                        </svg>
                      ),
                      tooltip: "Delete",
                      onClick: async () => {
                        if (window.confirm("Are you sure you want to delete this property?")) {
                          try {
                            const axiosConfig = {
                              headers: {
                                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                              }
                            };
                            
                            await axios.delete(`/api/properties/${property._id}`, axiosConfig);
                            
                            // Remove property from state
                            setProperties(prevProps => 
                              prevProps.filter(p => p._id !== property._id)
                            );
                            
                            // Update stats
                            setStats(prev => ({
                              totalProperties: prev.totalProperties - 1,
                              activeProperties: property.status === "Active" 
                                ? prev.activeProperties - 1 
                                : prev.activeProperties,
                              onHoldProperties: property.status === "On-Hold" 
                                ? prev.onHoldProperties - 1 
                                : prev.onHoldProperties
                            }));
                          } catch (err) {
                            console.error("Error deleting property:", err);
                            alert("Failed to delete property: " + (err.response?.data?.error || err.message));
                          }
                        }
                      }
                    },
                  ].map((action, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={action.onClick}
                      className="p-2 sm:p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                      title={action.tooltip}
                    >
                      {action.icon}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}