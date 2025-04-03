"use client";

import SideBarListingview from "./_component/sideBar";
import MainCard from "./_component/mainCard";
import { Footer } from "../(home)/_components/footer";

export default function ListingView() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8f4fc] p-4 md:p-10 gap-3">
      {/* Left Sidebar */}
      <SideBarListingview />
      {/* Main Content */}
      <MainCard />
      
    </div>
  );
}