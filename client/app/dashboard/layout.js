"use client";

import { AppSidebar } from "./add-property/_components/sideBar";
import { Navbar } from "../(home)/_components/navbar";
import { useState } from "react";

const Dashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5FA]">
      {/* Navbar */}
      {/* <Navbar /> */}
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar - Hidden on mobile, visible on md+ */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r md:relative md:w-[280px] md:translate-x-0 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AppSidebar />
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>

        {/* Toggle Button for Sidebar (Mobile) */}
        <button
          className="fixed bottom-4 right-4 md:hidden p-2 bg-[#7B00FF] text-white rounded-full z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h18" />
            <path d="M3 6h18" />
            <path d="M3 18h18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;