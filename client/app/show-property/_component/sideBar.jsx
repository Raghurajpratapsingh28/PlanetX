import React from "react";
import { useState } from "react";
import { ReusableCollapsible } from "./collapisble";
import BudgetFilter from "./BudgetFilter";
import { AreaFilter } from "./areaFilter";

const SideBarListingview = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBedroom, setSelectedBedroom] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [parking, setParking] = useState(null);
  const [furnished, setFurnished] = useState(null);
  return (
    <div className="w-[300px] border-r p-4 space-y-6 bg-white rounded-xl">
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
      />{" "}
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
        selected={parking}
        setSelected={setParking}
        paramName="parking"
      />
      <ReusableCollapsible
        title="Furnishing status"
        options={["Furnished", "Semi furnished", "Unfurnished"]}
        selected={furnished}
        setSelected={setFurnished}
        paramName="furnishing"
      />
    </div>
  );
};

export default SideBarListingview;
