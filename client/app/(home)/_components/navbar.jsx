"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";
import { Bell, ChevronDown, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/show-property", label: "All Properties" },
    { 
      href: "/dashboard/add-property", 
      label: "Post Property",
      badge: "FREE"
    },
    { href: "/highlights", label: "Highlights" },
    { href: "/dashboard/wishlist", label: "Wishlist" },
  ];

  return (
    <nav className="w-full border-b border-[#E1E1E1] shadow-lg bg-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo || "/placeholder.svg"}
                width={40}
                height={40}
                alt="Planet X Logo"
                className="object-contain"
              />
              <span className="font-extrabold text-lg md:text-xl text-[#0F0D0D]">
                PLANET X
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-[#0F0D0D]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 text-base font-medium hover:text-[#4CAF50] transition-colors"
              >
                {link.label}
                {link.badge && (
                  <span className="bg-[#4CAF50] text-white px-2 py-0.5 text-xs rounded">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center gap-4 relative">
            {isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10 relative hover:bg-gray-100"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute w-2 h-2 bg-[#4CAF50] rounded-full right-2 top-2" />
                </Button>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#CED5D8]" />
                    <span className="font-medium hidden lg:block">User</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-md shadow-lg animate-in fade-in-0 duration-200">
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-gray-100 flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                <CgProfile color="#7B00FF" className="text-xl" />
                <span className="text-[#0F0D0D] text-sm font-medium">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-in slide-in-from-top-5">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-base font-medium text-[#0F0D0D] px-2 py-1 hover:bg-gray-100 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  {link.badge && (
                    <span className="bg-[#4CAF50] text-white px-2 py-0.5 text-xs rounded">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              {isLoggedIn ? (
                <div className="space-y-2 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#CED5D8]" />
                    <span className="font-medium">User</span>
                  </div>
                  <Link
                    href="/dashboard/profile"
                    className="block py-2 hover:text-[#4CAF50]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block py-2 hover:text-[#4CAF50]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                   Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 hover:text-[#4CAF50]"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CgProfile color="#7B00FF" className="text-xl" />
                  <span className="text-[#0F0D0D] text-sm font-medium">Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};