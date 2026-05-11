"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Menu, X, Check, XCircle, Trash2, Mail, Phone } from "lucide-react";

export default function BookingsManagement() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/bookings`, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) fetchBookings();
    } catch (error) {
      console.error("Error updating booking", error);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await fetch(`/api/admin/bookings?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchBookings();
    } catch (error) {
      console.error("Error deleting booking", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      <aside className="w-64 hidden lg:block sticky top-0 h-screen">
        <Sidebar />
      </aside>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 shadow-2xl">
            <Sidebar />
            <button className="absolute top-4 right-[-40px] text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-primary uppercase tracking-widest">Bookings Management</h1>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Guest</th>
                    <th className="px-6 py-4">Room Details</th>
                    <th className="px-6 py-4">Dates</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center animate-pulse text-gray-400">Loading bookings...</td></tr>
                  ) : bookings.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium">No bookings found.</td></tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <p className="font-bold text-primary">{booking.firstName} {booking.lastName}</p>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                              <Mail className="w-3 h-3" /> {booking.email}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                              <Phone className="w-3 h-3" /> {booking.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-gray-700">{booking.roomId?.name || 'Suite'}</p>
                          <p className="text-xs text-gray-400 uppercase tracking-widest">{booking.guests} Guests</p>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-600">
                           {new Date(booking.checkIn).toLocaleDateString()} <br/> to <br/>
                           {new Date(booking.checkOut).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {booking.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => updateStatus(booking._id, 'confirmed')}
                                  className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                  title="Confirm Booking"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => updateStatus(booking._id, 'cancelled')}
                                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                  title="Cancel Booking"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button 
                              onClick={() => deleteBooking(booking._id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                              title="Delete Booking"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
