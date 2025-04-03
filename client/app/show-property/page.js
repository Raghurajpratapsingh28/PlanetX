"use client";

import SideBarListingview from "./_component/sideBar";
import MainCard from "./_component/mainCard";

export default function ListingView() {
  return (
    <div className="flex min-h-screen bg-[#f8f4fc] p-10 gap-3">
      {/* Left Sidebar */}
      <SideBarListingview />
      {/* Main Content */}
      <MainCard />
    </div>
  );
}
