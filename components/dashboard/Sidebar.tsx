"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Calendar, MessageSquare, Settings, LogOut, TrendingUp, Home } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: TrendingUp },
    { label: "Rooms", href: "/dashboard/rooms", icon: Home },
    { label: "Bookings", href: "/dashboard/bookings", icon: Calendar },
    { label: "Inquiries", href: "/dashboard/inquiries", icon: MessageSquare },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="font-playfair font-bold text-xl tracking-wider text-primary">AURA ADMIN</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                isActive 
                ? "bg-accent text-primary shadow-md" 
                : "text-gray-500 hover:bg-gray-50 hover:text-primary"
              }`}
            >
              <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-primary" : "text-gray-400"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
