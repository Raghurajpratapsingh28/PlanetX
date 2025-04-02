"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";
import { Bell, ChevronDown, Menu, X } from "lucide-react"; // Added for mobile toggle
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Added for mobile menu
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="w-full border-b border-[#E1E1E1] shadow-lg bg-white">
      <div className="py-[15px] px-[15px] sm:px-[30px] flex justify-between items-center max-w-[1440px] mx-auto">
        <div className="flex gap-2 items-center cursor-pointer justify-center" onClick={()=>{window.location.href="/"}}>
          <Image
            src={logo || "/placeholder.svg"}
            width={40}
            height={40}
            alt="logo of planet-x"
          />
          <span className="font-extrabold text-base sm:text-lg">PLANET X</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 lg:gap-6 font-medium text-sm sm:text-base justify-center items-center text-[#0F0D0D]">
          <Link href="/">Home</Link>
          <div className="flex items-center gap-1">
            <Select>
              <SelectTrigger className="w-[80px] sm:w-[100px] p-1 ring-0 focus:ring-0 focus:ring-offset-0 border-none focus:border-none">
                <SelectValue placeholder="Properties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Warehouse">Warehouse</SelectItem>
              </SelectContent>
            </Select>
            <ChevronDown className="h-4 w-4" />
          </div>
          <Link href="/dashboard/add-property" className="flex items-center gap-1">
            Post Property
            <span className="bg-[#4CAF50] text-white px-2 py-0.5 text-xs sm:text-sm rounded text-center">
              FREE
            </span>
          </Link>
          <Link href="/show-property" className="flex items-center gap-1">
            See Property
          </Link>
          <Link href="/highlights">Highlights</Link>
          <Link href="/dashboard/wishlist">Wishlist</Link>
        </div>

        {/* Desktop User Section */}
        <div className="hidden md:flex items-center gap-3 lg:gap-5">
          {isLoggedIn ? (
            <>
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-9 sm:w-11 h-9 sm:h-11"
                >
                  <Bell className="h-5 sm:h-6 w-5 sm:w-6" />
                </Button>
                <div className="absolute w-2.5 h-2.5 bg-[#4CAF50] rounded-full right-2 top-2 sm:right-2.5 sm:top-3" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-[#CED5D8]" />
                <span className="font-medium text-sm sm:text-base">User</span>
                <ChevronDown className="h-4 sm:h-5 w-4 sm:w-5" />
              </div>
            </>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              className="bg-gray-100 flex items-center justify-center gap-2 px-3 sm:px-4 py-1 sm:py-2"
            >
              <CgProfile color="#7B00FF" className="text-[18px] sm:text-[20px]" />
              <p className="text-black text-[14px] sm:text-[15px]">Login</p>
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E1E1E1] px-[15px] py-4">
          <div className="flex flex-col gap-4 font-medium text-base text-[#0F0D0D]">
            <Link href="/">Home</Link>
            <div className="flex items-center gap-1">
              <Select>
                <SelectTrigger className="w-full p-1 ring-0 focus:ring-0 focus:ring-offset-0 border border-[#E1E1E1]">
                  <SelectValue placeholder="Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Warehouse">Warehouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Link href="/dashboard/add-property" className="flex items-center gap-1">
              Post Property
              <span className="bg-[#4CAF50] text-white px-2 py-0.5 text-sm rounded text-center">
                FREE
              </span>
            </Link>
            <Link href="/highlights">Highlights</Link>
            <Link href="/dashboard/wishlist">Wishlist</Link>
            {isLoggedIn ? (
              <>
                <div className="relative flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-11 h-11"
                  >
                    <Bell className="h-6 w-6" />
                  </Button>
                  <div className="absolute w-2.5 h-2.5 bg-[#4CAF50] rounded-full right-2.5 top-3" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-11 h-11 rounded-full bg-[#CED5D8]" />
                  <span className="font-medium">User</span>
                </div>
              </>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                className="bg-gray-100 flex items-center justify-center gap-2 w-full py-2"
              >
                <CgProfile color="#7B00FF" className="text-[20px]" />
                <p className="text-black text-[15px]">Login</p>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};