"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";
import { Bell, ChevronDown, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { formatDistanceToNow } from "date-fns";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    setIsLoggedIn(!!token);

    if (token) {
      // Fetch user data
      const fetchUserData = async () => {
        try {
          const userResponse = await axios.get(`${BACKEND_URL}/auth/get-user`, {
            headers: { Authorization: token },
          });
          setUser(userResponse.data.user);
          
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      // Fetch notifications
      const fetchNotifications = async () => {
        try {
          setLoading(true);
          const userResponse = await axios.get(`${BACKEND_URL}/auth/get-user`, {
            headers: { Authorization: token },
          });
          const userId = userResponse.data.user._id;
          const response = await axios.get(
            `${BACKEND_URL}/properties/notification/${userId}`,
            { headers: { Authorization: token } }
          );
          // Only update state if notifications have changed
          setNotifications((prev) => {
            const prevIds = prev.map((n) => n._id);
            const newNotifications = response.data || [];
            const newIds = newNotifications.map((n) => n._id);
            if (JSON.stringify(prevIds) !== JSON.stringify(newIds)) {
              return newNotifications;
            }
            return prev;
          });
          
        } catch (error) {
          if(error.response.data.message === "No notifications found for this user."){return}
          console.error("Error fetching notifications:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
      fetchNotifications();

      // Set up polling for notifications every 30 seconds
      const intervalId = setInterval(fetchNotifications, 30000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setUser(null);
    setNotifications([]);
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
    router.push("/login");
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ").filter(Boolean);
    const initials = words
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("");
    return initials || "";
  };

  const firstName = user?.name?.split(" ")[0] || "User";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/show-property", label: "All Properties" },
    { href: "/dashboard/add-property", label: "Post Property", badge: "FREE" },
    { href: "/highlights", label: "Highlights" },
    { href: "/dashboard/wishlist", label: "Wishlist" },
  ];

  return (
    <nav className="w-full border-b border-[#E1E1E1] bg-gradient-to-r from-white to-gray-50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
              <Image
                src={logo || "/placeholder.svg"}
                width={48}
                height={48}
                alt="Planet X Logo"
                className="object-contain"
              />
              <span className="font-extrabold text-xl md:text-2xl text-[#0F0D0D] tracking-tight">
                PLANET X
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[#0F0D0D]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-base font-semibold hover:text-[#4CAF50] transition-all duration-200 hover:scale-105"
              >
                {link.label}
                {link.badge && (
                  <span className="bg-[#4CAF50] text-white px-2 py-0.5 text-xs rounded-full animate-pulse">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4 relative">
            {isLoggedIn ? (
              <>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-white/80 hover:bg-[#4CAF50] hover:text-white transition-all duration-300 border-gray-200 shadow-sm"
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                  >
                    <Bell className="h-5 w-5" />
                  </Button>
                  {notificationsOpen && (
                    <div className="absolute top-full right-0 mt-3 w-80 bg-white border rounded-xl shadow-xl animate-in fade-in-0 duration-200 max-h-[400px] overflow-y-auto md:w-96">
                      <div className="p-4 border-b">
                        <h3 className="font-semibold text-lg">Notifications</h3>
                      </div>
                      {loading ? (
                        <div className="p-4 text-center text-gray-500">
                          Loading notifications...
                        </div>
                      ) : notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification._id}
                            className={`p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors ${
                              notification.unread ? "bg-gray-50" : ""
                            }`}
                          >
                            <p className="text-sm font-semibold text-gray-800">
                              {notification.heading}
                            </p>
                            <p className="text-sm text-gray-800">
                              {notification.text}
                            </p>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-xs text-gray-500">
                                From: {notification.userId?.name || "Unknown User"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(notification.date), {
                                  addSuffix: true,
                                })}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No notifications yet
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 p-2 rounded-full hover:bg-gray-100/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CED5D8] to-[#A1A8AB] flex items-center justify-center text-white font-semibold text-lg shadow-inner">
                      {getInitials(user?.name)}
                    </div>
                    <span className="font-semibold hidden lg:block text-gray-800">
                      {firstName}
                    </span>
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute top-full right-0 mt-3 w-56 bg-white border rounded-xl shadow-xl animate-in fade-in-0 duration-200">
                      <Link
                        href="/dashboard/profile"
                        className="block px-5 py-3 hover:bg-gray-50 rounded-t-xl transition-colors"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/dashboard"
                        className="block px-5 py-3 hover:bg-gray-50 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-3 hover:bg-gray-50 rounded-b-xl transition-colors text-red-600"
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
                className="bg-[#4CAF50] flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-[#45a049] transition-all duration-300 shadow-md"
              >
                <CgProfile color="white" className="text-xl" />
                <span className="text-white text-sm font-semibold">Login</span>
              </Link>
            )}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full w-10 h-10 md:w-12 md:h-12 hover:bg-gray-100"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-800" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-800" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-6 bg-white border-t animate-in slide-in-from-top-5">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-lg font-semibold text-[#0F0D0D] px-4 py-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  {link.badge && (
                    <span className="bg-[#4CAF50] text-white px-2 py-0.5 text-xs rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              {isLoggedIn ? (
                <div className="space-y-2 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CED5D8] to-[#A1A8AB] flex items-center justify-center text-white font-semibold text-lg">
                      {getInitials(user?.name)}
                    </div>
                    <span className="font-semibold text-lg">{firstName}</span>
                  </div>
                  <Link
                    href="/dashboard/profile"
                    className="block py-2 px-4 hover:bg-gray-100 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block py-2 px-4 hover:bg-gray-100 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg text-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-6 py-3 bg-[#4CAF50] text-white rounded-full mx-4 hover:bg-[#45a049]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CgProfile className="text-xl" />
                  <span className="text-sm font-semibold">Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};