"use client";

import React, { useState } from "react";
import { ReusableCollapsible } from "./collapisble";
import BudgetFilter from "./BudgetFilter";
import { AreaFilter } from "./areaFilter";

const SideBarListingview = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBedroom, setSelectedBedroom] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedParking, setSelectedParking] = useState(null);
  const [selectedFurnished, setSelectedFurnished] = useState(null);

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-6">
      {/* Budget Section */}
      <BudgetFilter />
      <AreaFilter />
      {/* Property Type Section */}
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
      <ReusableCollapsible
        title="Number of Bedrooms"
        options={["1", "2", "3", "4", "5", "6+"]}
        selected={selectedBedroom}
        setSelected={setSelectedBedroom}
        paramName="bedrooms"
      />
      <ReusableCollapsible
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
      />
      <ReusableCollapsible
        title="Parking"
        options={["Open Parking", "Closed Parking"]}
        selected={selectedParking}
        setSelected={setSelectedParking}
        paramName="parking"
      />
      <ReusableCollapsible
        title="Furnishing Status"
        options={["Furnished", "Semi Furnished", "Unfurnished"]}
        selected={selectedFurnished}
        setSelected={setSelectedFurnished}
        paramName="furnishing"
      />
    </div>
  );
};

export default SideBarListingview;