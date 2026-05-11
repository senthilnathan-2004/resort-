"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Menu, X, Trash2, Mail, Phone, Calendar as CalendarIcon, MessageCircle } from "lucide-react";

export default function InquiriesManagement() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' });
      fetchInquiries();
    } catch (error) {
      console.error("Error deleting inquiry", error);
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
            <h1 className="text-xl font-bold text-primary uppercase tracking-widest">Inquiries Management</h1>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-24 animate-pulse text-gray-400">Loading inquiries...</div>
            ) : inquiries.length === 0 ? (
              <div className="col-span-full text-center py-24 text-gray-400">No inquiries found.</div>
            ) : (
              inquiries.map((inquiry) => (
                <div key={inquiry._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-bold text-primary">{inquiry.name}</h3>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button onClick={() => handleDelete(inquiry._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <Mail className="w-4 h-4 text-accent" /> {inquiry.email}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <Phone className="w-4 h-4 text-accent" /> {inquiry.phone}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <CalendarIcon className="w-4 h-4 text-accent" /> {inquiry.guests} Guests
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                       <MessageCircle className="w-3 h-3 text-gray-400" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Message</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed italic line-clamp-4">
                      "{inquiry.message}"
                    </p>
                  </div>

                  <button className="w-full py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-primary transition-all duration-300 shadow-md">
                    Reply to Inquiry
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
