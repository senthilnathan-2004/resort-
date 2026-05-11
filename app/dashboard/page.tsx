"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, DollarSign, Calendar, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch('/api/admin/dashboard');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const stats = [
    { label: "Total Bookings", value: data?.stats?.totalBookings || 0, icon: Calendar, color: "bg-blue-600" },
    { label: "New Inquiries", value: data?.stats?.totalInquiries || 0, icon: MessageSquare, color: "bg-emerald-600" },
    { label: "Revenue", value: `$${data?.stats?.totalRevenue?.toLocaleString() || 0}`, icon: DollarSign, color: "bg-amber-600" },
  ];

  return (
    <div className="min-h-screen flex bg-[#f8f9fa] text-gray-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 hidden lg:block sticky top-0 h-screen shadow-xl z-20">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible"}`}>
        <div 
          className={`absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`} 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
        <div className={`absolute inset-y-0 left-0 w-72 bg-white shadow-2xl transition-transform duration-500 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <Sidebar />
          <button 
            className="absolute top-4 right-[-48px] bg-white text-primary p-2 rounded-lg shadow-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-400 hover:text-primary transition-colors" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Overview</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none">Logged in as</p>
                <p className="text-xs font-bold text-primary">Aura Admin</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-black border-2 border-white shadow-md">
                A
             </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 space-y-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-6 group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className={`${stat.color} p-4 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-primary">
                    {loading ? "..." : stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-1 gap-10">
            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden flex flex-col">
              <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary">Recent Activity</h2>
                <Link href="/dashboard/bookings" className="text-[10px] font-black uppercase tracking-widest text-accent hover:text-primary transition-colors flex items-center gap-2 group">
                  Manage All <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white text-[9px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                    <tr>
                      <th className="px-8 py-4">Guest Details</th>
                      <th className="px-8 py-4">Room</th>
                      <th className="px-8 py-4">Stay Duration</th>
                      <th className="px-8 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      [1, 2, 3].map((i) => (
                        <tr key={i} className="animate-pulse">
                          <td className="px-8 py-6"><div className="h-4 w-32 bg-gray-100 rounded" /></td>
                          <td className="px-8 py-6"><div className="h-4 w-24 bg-gray-100 rounded" /></td>
                          <td className="px-8 py-6"><div className="h-4 w-40 bg-gray-100 rounded" /></td>
                          <td className="px-8 py-6"><div className="h-6 w-16 bg-gray-100 rounded-full" /></td>
                        </tr>
                      ))
                    ) : data?.recentBookings?.length > 0 ? (
                      data.recentBookings.map((booking: any) => (
                        <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <p className="text-sm font-bold text-primary">{booking.firstName} {booking.lastName}</p>
                            <p className="text-[10px] text-gray-400 font-medium">{booking.email}</p>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-widest">
                              {booking.roomId?.name || "Suite"}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-xs text-gray-500 font-medium">
                            {new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </td>
                          <td className="px-8 py-6">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-8 py-16 text-center text-gray-400 text-sm italic font-medium">
                          No recent bookings found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
