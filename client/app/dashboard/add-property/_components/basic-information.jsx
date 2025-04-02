"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const lookingForOptions = [
  { value: "Buyer", label: "Buyer" },
  { value: "Renter", label: "Renter" },
  { value: "Landlord", label: "Landlord" },
  { value: "Property Owner", label: "Property Owner" },
  { value: "Rental Provider", label: "Rental Provider" },
  { value: "Builder", label: "Builder" },
  { value: "Dealer", label: "Dealer" },
];

const propertyKindOptions = [
  { value: "Residential", label: "Residential" },
  { value: "Pg", label: "Paying Guest" },
  { value: "Hotel", label: "Hotel" },
  { value: "Office", label: "Office" },
  { value: "Shop", label: "Shop" },
  { value: "Warehouse", label: "Warehouse" },
  { value: "Shared Warehouse", label: "Shared Warehouse" },
  { value: "EventSpace", label: "EventSpace" },
];

const propertyTypeOptions = [
  { value: "For Sale", label: "Sale" },
  { value: "For Rent", label: "Rent" },
  { value: "Commercial", label: "Commercial" },
];

export const BasicInformation = ({
  lookingFor,
  setLookingFor,
  propertyKind,
  setPropertyKind,
  propertyType,
  setPropertyType,
}) => {
  return (
    <div className="w-full max-w-[835px] bg-white border border-[#E1E1E1] rounded-xl p-5">
      <div className="pb-2.5 border-b border-[#E1E1E1] mb-5">
        <h2 className="text-xl font-medium leading-8 text-black">
          Basic Information
        </h2>
      </div>

      <div className="flex flex-col gap-[25px]">
        <div className="space-y-[5px]">
          <label className="text-base leading-6 text-[#0F0D0D]">
            Are you looking for
          </label>
          <div className="flex flex-wrap gap-2.5">
            {lookingForOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setLookingFor(option.value)}
                className={`
                  px-[15px] py-2.5 rounded-lg text-base leading-[26px]
                  ${
                    lookingFor === option.value
                      ? "bg-[#F5F5F5] border border-[#7B00FF] text-[#7B00FF]"
                      : "bg-white border border-[#E1E1E1] text-[#6C696A]"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Kind Section */}
        <div className="space-y-[5px]">
          <label className="text-base leading-6 text-[#0F0D0D]">
            What kind of property
          </label>
          <div className="flex flex-wrap gap-2.5">
            {propertyKindOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setPropertyKind(option.value)}
                className={`
                  px-[15px] py-2.5 rounded-lg text-base leading-[26px]
                  ${
                    propertyKind === option.value
                      ? "bg-[#F5F5F5] border border-[#7B00FF] text-[#7B00FF]"
                      : "bg-white border border-[#E1E1E1] text-[#6C696A]"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-[5px]">
          <label className="text-base leading-6 text-[#0F0D0D]">
            Select Property Type
          </label>
          <div className="flex flex-wrap gap-2.5">
            {propertyTypeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setPropertyType(option.value)}
                className={`
                  px-[15px] py-2.5 rounded-lg text-base leading-[26px]
                  ${
                    propertyType === option.value
                      ? "bg-[#F5F5F5] border border-[#7B00FF] text-[#7B00FF]"
                      : "bg-white border border-[#E1E1E1] text-[#6C696A]"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
