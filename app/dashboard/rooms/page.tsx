"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Plus, Pencil, Trash2, Menu, X, Image as ImageIcon } from "lucide-react";

export default function RoomsManagement() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<any>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/admin/rooms');
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    try {
      await fetch(`/api/admin/rooms/${id}`, { method: 'DELETE' });
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Add dummy required fields for now
    const payload = {
      ...data,
      pricePerNight: Number(data.pricePerNight),
      capacity: Number(data.capacity),
      size: Number(data.size),
      featuredImage: data.featuredImage || "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80",
      isAvailable: true,
      shortDescription: data.description, // Simplified
      beds: "1 King Bed" // Simplified
    };

    try {
      const url = currentRoom ? `/api/admin/rooms/${currentRoom._id}` : '/api/admin/rooms';
      const method = currentRoom ? 'PATCH' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setCurrentRoom(null);
        fetchRooms();
      }
    } catch (error) {
      console.error("Error saving room", error);
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
            <h1 className="text-xl font-bold text-primary uppercase tracking-widest">Rooms Management</h1>
          </div>
          <button 
            onClick={() => { setCurrentRoom(null); setIsModalOpen(true); }}
            className="bg-accent text-primary px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-accent-light transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Room
          </button>
        </header>

        <div className="p-4 lg:p-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Room</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                   <tr><td colSpan={4} className="px-6 py-12 text-center animate-pulse text-gray-400">Loading rooms...</td></tr>
                ) : rooms.length === 0 ? (
                   <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">No rooms found. Add your first room!</td></tr>
                ) : (
                  rooms.map((room) => (
                    <tr key={room._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            <img src={room.featuredImage} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-primary">{room.name}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">{room.capacity} Guests</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-primary">
                        ${room.pricePerNight?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${room.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {room.isAvailable ? 'Active' : 'Maintenance'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => { setCurrentRoom(room); setIsModalOpen(true); }}
                            className="p-2 text-gray-400 hover:text-accent transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(room._id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
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
      </main>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-playfair text-2xl font-bold text-primary">{currentRoom ? 'Edit Room' : 'Add New Room'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Room Name</label>
                  <input name="name" defaultValue={currentRoom?.name} required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-accent text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Price per Night ($)</label>
                  <input name="pricePerNight" type="number" defaultValue={currentRoom?.pricePerNight} required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-accent text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Capacity (Guests)</label>
                  <input name="capacity" type="number" defaultValue={currentRoom?.capacity} required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-accent text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Description</label>
                  <textarea name="description" defaultValue={currentRoom?.description} rows={4} required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-accent text-sm resize-none" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Featured Image URL</label>
                  <input name="featuredImage" defaultValue={currentRoom?.featuredImage} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-accent text-sm" placeholder="https://..." />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-400 uppercase tracking-widest text-xs">Cancel</button>
                <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-accent hover:text-primary transition-all duration-300 shadow-lg">
                  {currentRoom ? 'Save Changes' : 'Create Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
