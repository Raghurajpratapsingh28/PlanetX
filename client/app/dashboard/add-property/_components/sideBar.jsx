"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  User,
  MessageSquare,
  ClipboardList,
} from "lucide-react";

export const AppSidebar = () => {
  const pathname = usePathname();

  const sidebarItems = [
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      label: "Add Property",
      href: "/dashboard/add-property",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: "Wishlist",
      href: "/dashboard/wishlist",
    },
    {
      icon: <User className="w-6 h-6" />,
      label: "Profile",
      href: "/dashboard/profile",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      label: "Share Feedback",
      href: "/dashboard/feedback",
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      label: "Privacy & Policy",
      href: "/dashboard/privacy-policy",
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      label: "Terms & Conditions",
      href: "/dashboard/terms-conditions",
    },
  ];

  return (
    <aside className="w-[280px] bg-white flex flex-col border-r max-h-full">
      <nav className="flex flex-col p-5 pt-5 gap-[15px]">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-[15px] px-5 py-[15px] rounded-l-xl
                transition-colors duration-200
                ${
                  isActive
                    ? "text-[#7B00FF] [&_svg]:stroke-[#7B00FF]"
                    : "text-[#6C696A] hover:text-[#7B00FF] [&_svg]:stroke-[#6C696A] hover:[&_svg]:stroke-[#7B00FF]"
                }
              `}
            >
              {item.icon}
              <span className="font-medium text-base">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
