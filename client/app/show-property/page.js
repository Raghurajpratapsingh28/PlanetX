"use client";

import SideBarListingview from "./_component/sideBar";
import MainCard from "./_component/mainCard";

export default function ListingView() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row py-6 px-4 sm:px-6 lg:px-8 gap-6">
      {/* Left Sidebar */}
      <div className="w-full lg:w-1/3 xl:w-1/4">
        <SideBarListingview />
      </div>
      {/* Main Content */}
      <div className="w-full lg:w-2/3 xl:w-3/4">
        <MainCard />
      </div>
    </div>
  );
}