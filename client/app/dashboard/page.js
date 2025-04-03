"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Sample data for properties (replace with API data)
const properties = [
  {
    id: "9876543210",
    name: "B-12, Green Park Extension, South Delhi, New Delhi, 110016",
    type: "Flat / Apartment",
    likes: 152,
    rating: 4,
    status: "Active",
    addedDate: "26 Dec, 2024",
    image: "/images/property1.jpg", // Replace with actual image path
  },
  {
    id: "9876543210",
    name: "B-12, Green Park Extension, South Delhi, New Delhi, 110016",
    type: "Flat / Apartment",
    likes: 152,
    rating: 4,
    status: "On-Hold",
    addedDate: "26 Dec, 2024",
    image: "/images/property2.jpg", // Replace with actual image path
  },
  {
    id: "9876543210",
    name: "B-12, Green Park Extension, South Delhi, New Delhi, 110016",
    type: "Flat / Apartment",
    likes: 152,
    rating: 4,
    status: "Active",
    addedDate: "26 Dec, 2024",
    image: "/images/property3.jpg", // Replace with actual image path
  },
  {
    id: "9876543210",
    name: "B-12, Green Park Extension, South Delhi, New Delhi, 110016",
    type: "Flat / Apartment",
    likes: 152,
    rating: 4,
    status: "Active",
    addedDate: "26 Dec, 2024",
    image: "/images/property4.jpg", // Replace with actual image path
  },
];

export default function DashboardPage() {

  useEffect(()=>{
    const token = localStorage.getItem("accessToken")
    if(!token){
      window.location.href="/login"
    }
  },[])


  const [searchId, setSearchId] = useState("");
  const [sortBy, setSortBy] = useState("Relevance");
  const [filterStatus, setFilterStatus] = useState("All");

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
          { title: "Total Property", value: 12, icon: "🏠" },
          { title: "Active Property", value: 12, icon: "✅" },
          { title: "On-Hold Property", value: 12, icon: "⏳" },
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
          <span className="text-gray-700 text-sm sm:text-base">Filter</span>
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

      {/* Property List */}
      <div className="space-y-4 sm:space-y-6">
        {properties.map((property, index) => (
          <motion.div
            key={index}
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
                <p className="text-xs sm:text-sm text-gray-500">ID: {property.id}</p>
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
                  href="#"
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
                  },
                ].map((action, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
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
    </div>
  );
}