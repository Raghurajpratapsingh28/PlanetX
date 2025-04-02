"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FaSearch } from "react-icons/fa";
import { BiTargetLock } from "react-icons/bi";

export const Search = () => {
  const [activeBox, setActiveBox] = useState("residential");

  const options = {
    residential: ["All", "Buy", "Rent"],
    commercial: ["Office", "Shop", "Warehouse"],
    hotels: [
      "All",
      "Luxury Hotels (5-Star)",
      "Boutique Hotels",
      "Budget Hotels (2-3 Star)",
      "Business Hotels",
      "Resorts",
      "Rent",
    ],
    payingGuest: ["Single Sharing", "Double Sharing", "Triple Sharing"],
  };

  return (
    <div className="p-4 sm:p-6 bg-transparent">
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6 relative justify-center">
        {[
          { id: "residential", label: "Residential" },
          { id: "commercial", label: "Commercial" },
          { id: "hotels", label: "Hotels" },
          { id: "payingGuest", label: "Paying Guest" },
        ].map((box) => (
          <div key={box.id} className="relative">
            <Button
              variant="outline"
              className={`p-3 sm:p-4 rounded-md border-none text-xs sm:text-sm font-medium ${
                activeBox === box.id
                  ? "bg-[#7B00FF] text-white hover:bg-[#7B00FF]"
                  : "bg-white text-[#6C696A] hover:bg-purple-800"
              }`}
              onClick={() => setActiveBox(box.id)}
            >
              {box.label}
            </Button>
            {activeBox === box.id && (
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-8 sm:w-10 h-2 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#7B00FF]" />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white py-2 sm:py-3 px-3 sm:px-5 rounded-lg">
        <Select>
          <SelectTrigger className="w-full sm:w-40 md:w-48 border border-gray-300 bg-transparent text-xs sm:text-sm">
            <span className="text-xs sm:text-sm">
              {options[activeBox][0] || "Select an option"}
            </span>
          </SelectTrigger>
          <SelectContent>
            {options[activeBox].map((option, index) => (
              <SelectItem key={index} value={option} className="text-xs sm:text-sm">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="       Search area, city"
            className="w-full p-2 pr-14 sm:pr-16 border border-gray-300 rounded-md text-xs sm:text-sm"
          />
          <FaSearch className="absolute text-stone-300 top-[10px] sm:top-[12px] left-[10px]" />
          <Button
            variant="outline"
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none hover:bg-transparent text-[#7B00FF] text-xs sm:text-sm"
          >
            Near Me
            <BiTargetLock className="text-[20px] sm:text-[25px]" />
          </Button>
        </div>

        <Button
          variant="default"
          className="w-full sm:w-auto bg-[#7B00FF] text-white text-xs sm:text-sm px-4 sm:px-6 py-2"
        >
          Search
        </Button>
      </div>
    </div>
  );
};