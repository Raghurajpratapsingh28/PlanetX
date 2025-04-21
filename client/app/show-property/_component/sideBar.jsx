import React, { useState } from "react";
// import { ReusableCollapsible } from "./collapsible"; // Updated import name
import BudgetFilter from "./BudgetFilter";
// import { AreaFilter } from "./areaFilter";
import { ReusableCollapsible } from "./collapisble";

const SideBarListingview = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedBedroom, setSelectedBedroom] = useState(null);
  // const [selectedRole, setSelectedRole] = useState(null);
  // const [selectedParking, setSelectedParking] = useState(null);
  // const [selectedFurnished, setSelectedFurnished] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter toggle

  return (
    <div className="w-full md:w-[300px] md:border-r p-4 space-y-6 bg-white rounded-xl">
      {/* Filter Button for Mobile */}
      <button
        className="md:hidden w-full bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <span>Filters</span>
        <svg
          className={`w-4 h-4 transform ${isFilterOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter Options - Hidden on mobile unless toggled */}
      <div className={`${isFilterOpen ? "block" : "hidden"} md:block space-y-6`}>
        <BudgetFilter />
        {/* <AreaFilter /> */}
        <ReusableCollapsible
          title="Property Type"
          options={["For Sale", "For Rent", "Commercial"]}
          selected={selectedType}
          setSelected={setSelectedType}
          paramName="propertyType"
        />
        <ReusableCollapsible
          title="Category"
          options={[
            "Residential",
            "Pg",
            "Hotel",
            "Office",
            "Shop",
            "Warehouse",
            "Shared Warehouse",
            "EventSpace",
          ]}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
          paramName="category"
        />
        {/* <ReusableCollapsible
          title="Number of Bedrooms"
          options={["1", "2", "3", "4", "5", "6+"]}
          selected={selectedBedroom}
          setSelected={setSelectedBedroom}
          paramName="bedrooms"
        /> */}
        {/* <ReusableCollapsible
          title="Posted By"
          options={[
            "Buyer",
            "Renter",
            "Landlord",
            "Property Owner",
            "Rental Provider",
            "Builder",
            "Dealer",
          ]}
          selected={selectedRole}
          setSelected={setSelectedRole}
          paramName="postedBy"
        /> */}
        {/* <ReusableCollapsible
          title="Parking"
          options={["Open Parking", "Closed Parking"]}
          selected={selectedParking}
          setSelected={setSelectedParking}
          paramName="parking"
        /> */}
        {/* <ReusableCollapsible
          title="Furnishing Status"
          options={["Furnished", "Semi furnished", "Unfurnished"]}
          selected={selectedFurnished}
          setSelected={setSelectedFurnished}
          paramName="furnishing"
        /> */}
      </div>
    </div>
  );
};

export default SideBarListingview;