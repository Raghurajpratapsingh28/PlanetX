"use client";

import SideBarListingview from "./_component/sideBar";
import MainCard from "./_component/mainCard";
import { Footer } from "../(home)/_components/footer";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function ListingView() {
  const router = useRouter();
  useEffect(()=>{
      const token = localStorage.getItem("accessToken");
      if(!token) {
        router.push("/login");
      }
  },[])
  return (
   
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8f4fc] p-4 md:p-10 gap-3">
      {/* Left Sidebar */}
      <SideBarListingview />
      {/* Main Content */}
      <Suspense fallback={<div>Loading...</div>}>
      <MainCard />
      </Suspense>
      
      
    </div>
  );
}