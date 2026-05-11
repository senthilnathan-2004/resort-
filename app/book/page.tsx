"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Users, ArrowRight, CheckCircle2, ChevronRight, Home, CreditCard, Lock, Sparkles } from "lucide-react";

export default function BookNowPage() {
  const [step, setStep] = useState(1);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    roomId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    specialRequests: "",
    paymentPreference: "pay_at_hotel"
  });

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch('/api/rooms/featured');
        if (response.ok) {
          const data = await response.json();
          setRooms(data);
        }
      } catch (error) {
        console.error("Error fetching rooms", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStep(4);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Floating Card Header */}
      <nav className="fixed top-6 left-0 right-0 z-50 px-4 pointer-events-none">
        <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full py-3 px-8 flex justify-between items-center shadow-2xl pointer-events-auto">
          <Link href="/" className="font-playfair text-xl font-bold tracking-[0.3em]">AURA</Link>
          <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-accent transition-colors flex items-center gap-2">
            <ArrowRight className="w-3 h-3 rotate-180" /> Cancel Reservation
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto pt-32 pb-20 px-6">
        {/* Step Indicator - Glossy Cards */}
        {step < 4 && (
          <div className="flex justify-center gap-4 mb-20">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`px-6 py-2 rounded-full border transition-all duration-500 flex items-center gap-3 ${
                step === s ? "bg-accent text-primary border-accent scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)]" : 
                step > s ? "bg-white/10 text-accent border-white/20" : "bg-white/5 text-white/20 border-white/10"
              }`}>
                <span className="text-xs font-black">{s}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">
                  {s === 1 ? 'Sanctuary' : s === 2 ? 'Details' : 'Confirm'}
                </span>
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-12 animate-fadeIn">
            <div className="text-center space-y-4">
              <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-black">Step One</span>
              <h1 className="font-playfair text-5xl md:text-6xl font-bold">Your Escape Awaits</h1>
              <p className="text-white/40 font-light max-w-lg mx-auto">Select the sanctuary that resonates with your spirit.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <div className="col-span-full text-center py-20 text-white/20 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">Curating Available Sanctuaries</p>
                </div>
              ) : rooms.map((room) => (
                <div 
                  key={room._id} 
                  onClick={() => { updateField('roomId', room._id); setStep(2); }}
                  className={`group cursor-pointer bg-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 ${
                    formData.roomId === room._id ? "border-accent shadow-[0_0_30px_rgba(212,175,55,0.2)]" : "border-white/10 shadow-xl"
                  }`}
                >
                  <div className="h-64 overflow-hidden relative">
                    <img src={room.featuredImage} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="font-playfair text-2xl font-bold text-white mb-1">{room.name}</h3>
                          <p className="text-[10px] font-black uppercase tracking-widest text-accent">${room.pricePerNight} / Night</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{room.shortDescription || room.description}</p>
                    <div className="flex justify-between items-center group-hover:text-accent transition-colors">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Select Sanctuary</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-3xl mx-auto space-y-12 animate-fadeIn">
            <div className="text-center space-y-4">
               <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-black">Step Two</span>
              <h2 className="font-playfair text-5xl font-bold">Guest Particulars</h2>
              <p className="text-white/40 font-light">Elegance is in the details. Tell us about your party.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">First Name</label>
                  <input 
                    required 
                    placeholder="John"
                    className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent focus:bg-white/10 transition-all text-sm placeholder:text-white/10"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Last Name</label>
                  <input 
                    required 
                    placeholder="Doe"
                    className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent focus:bg-white/10 transition-all text-sm placeholder:text-white/10"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                  />
                </div>
                <div className="col-span-full space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Email Sanctuary Access</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="john@example.com"
                    className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent focus:bg-white/10 transition-all text-sm placeholder:text-white/10"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Arrival Date</label>
                   <input 
                     type="date" 
                     required 
                     className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent focus:bg-white/10 transition-all text-sm [color-scheme:dark]"
                     value={formData.checkIn}
                     onChange={(e) => updateField('checkIn', e.target.value)}
                   />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Departure Date</label>
                   <input 
                     type="date" 
                     required 
                     className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent focus:bg-white/10 transition-all text-sm [color-scheme:dark]"
                     value={formData.checkOut}
                     onChange={(e) => updateField('checkOut', e.target.value)}
                   />
                </div>
              </div>
              
              <button 
                onClick={() => setStep(3)}
                className="w-full bg-accent text-primary py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-xs hover:bg-white hover:scale-[1.02] transition-all duration-500 shadow-[0_15px_40px_rgba(212,175,55,0.2)]"
              >
                Continue to Confirmation
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-2xl mx-auto space-y-12 animate-fadeIn">
             <div className="text-center space-y-4">
              <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-black">Step Three</span>
              <h2 className="font-playfair text-5xl font-bold">Final Review</h2>
              <p className="text-white/40 font-light">Confirm your stay in paradise.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl space-y-12">
              <div className="p-8 bg-accent/10 rounded-[2rem] flex items-center gap-8 border border-accent/20">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-primary shadow-xl">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-1">Reservation Policy</p>
                  <p className="text-xs text-white/60 font-light">Complimentary breakfast & priority spa access included.</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex justify-between items-center text-sm font-bold border-b border-white/5 pb-6">
                  <span className="text-white/30 uppercase tracking-[0.2em] text-[10px]">Your Sanctuary</span>
                  <span className="text-accent">{rooms.find(r => r._id === formData.roomId)?.name || 'Suite'}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold border-b border-white/5 pb-6">
                  <span className="text-white/30 uppercase tracking-[0.2em] text-[10px]">Guest Name</span>
                  <span className="text-white">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold border-b border-white/5 pb-6">
                  <span className="text-white/30 uppercase tracking-[0.2em] text-[10px]">Payment</span>
                  <span className="text-white/60">Pay at Hotel</span>
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                className="w-full bg-accent text-primary py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-xs hover:bg-white hover:scale-[1.02] transition-all duration-500 shadow-[0_15px_40px_rgba(212,175,55,0.3)]"
              >
                Secure Reservation
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-12 animate-scaleIn py-20">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-accent rounded-full blur-[60px] opacity-20 animate-pulse" />
              <div className="w-32 h-32 bg-white/5 backdrop-blur-xl border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-12 relative shadow-2xl">
                <CheckCircle2 className="w-16 h-16 text-accent" />
              </div>
            </div>
            <h1 className="font-playfair text-6xl md:text-7xl font-bold text-white mb-6">Reservation Secured</h1>
            <p className="text-xl text-white/40 font-light max-w-xl mx-auto leading-relaxed">
              Welcome to the Aura family. A detailed itinerary has been sent to <span className="text-accent font-bold">{formData.email}</span>.
            </p>
            <div className="pt-16">
              <Link href="/" className="inline-flex items-center gap-4 bg-white/5 hover:bg-accent hover:text-primary border border-white/10 px-12 py-6 rounded-full font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-700">
                Return to Sanctuary <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
