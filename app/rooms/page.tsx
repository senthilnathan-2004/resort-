"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, Calendar, Star, Wifi, Coffee, Wind, Users, Home, ChevronRight, Info } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch('/api/rooms/featured');
        if (response.ok) {
          const data = await response.json();
          setRooms(data);
        }
      } catch (error) {
        console.error("Failed to fetch rooms", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  const fallbackRooms = [
    {
      _id: "1",
      name: "Ocean View Suite",
      featuredImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80",
      pricePerNight: 450,
      description: "Wake up to panoramic views of the azure ocean from your private balcony. Our Ocean View Suites combine contemporary luxury with the timeless beauty of the coast.",
      amenities: ["Ocean View", "King Bed", "Private Balcony", "Free Wi-Fi"]
    },
    {
      _id: "2",
      name: "Garden Pool Villa",
      featuredImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80",
      pricePerNight: 650,
      description: "A secluded sanctuary featuring a private plunge pool and lush tropical gardens. Perfect for those seeking privacy and a deep connection with nature.",
      amenities: ["Private Pool", "Garden View", "Outdoor Shower", "Mini Bar"]
    },
    {
      _id: "3",
      name: "Presidential Suite",
      featuredImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80",
      pricePerNight: 1200,
      description: "The pinnacle of luxury with expansive living areas, unparalleled service, and a panoramic terrace overlooking the entire resort and coastline.",
      amenities: ["Butler Service", "Full Kitchen", "Private Spa", "Home Cinema"]
    }
  ];

  const displayRooms = rooms.length > 0 ? rooms : fallbackRooms;

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <Navbar />

      {/* Header */}
      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80" 
            alt="Luxury Rooms" 
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <span className="block text-accent uppercase tracking-[0.5em] text-sm font-black mb-6 drop-shadow-lg animate-fadeIn">Sanctuary of Serenity</span>
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-9xl font-black mb-8 drop-shadow-2xl">Accommodations</h1>
        </div>
      </header>

      {/* Intro */}
      <section className="py-24 px-8 max-w-5xl mx-auto text-center">
        <h2 className="font-playfair text-3xl md:text-5xl text-primary mb-10 leading-snug">Designed for the Discerning Traveler</h2>
        <p className="text-lg md:text-xl text-primary-light font-light leading-relaxed">
          Every space at Aura is a masterpiece of design, blending contemporary luxury with authentic local touches. From our intimate suites to our expansive villas, we offer a sanctuary where time stands still and every detail is tailored to your comfort.
        </p>
      </section>

      {/* Rooms Grid */}
      <main className="max-w-7xl mx-auto py-12 px-6 lg:px-12 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-24">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : (
            displayRooms.map((room, index) => (
              <div key={room._id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center group`}>
                <div className="flex-1 w-full relative overflow-hidden h-[400px] lg:h-[550px] shadow-2xl">
                  <Image 
                    src={room.featuredImage || (room.images && room.images[0]?.url) || fallbackRooms[0].featuredImage} 
                    alt={room.name} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[2s]" 
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur px-6 py-4 shadow-xl z-10">
                    <span className="text-primary font-bold text-2xl">${room.pricePerNight?.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm ml-2">/ night</span>
                  </div>
                </div>

                <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-accent">
                      <Star className="w-4 h-4 fill-accent" />
                      <Star className="w-4 h-4 fill-accent" />
                      <Star className="w-4 h-4 fill-accent" />
                      <Star className="w-4 h-4 fill-accent" />
                      <Star className="w-4 h-4 fill-accent" />
                    </div>
                    <h3 className="font-playfair text-4xl lg:text-5xl text-primary">{room.name}</h3>
                  </div>

                  <p className="text-lg text-primary-light font-light leading-relaxed">
                    {room.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-8">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Wifi className="w-5 h-5 text-accent" />
                      <span className="text-sm font-medium uppercase tracking-widest">Free Wi-Fi</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Wind className="w-5 h-5 text-accent" />
                      <span className="text-sm font-medium uppercase tracking-widest">Air Conditioning</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Coffee className="w-5 h-5 text-accent" />
                      <span className="text-sm font-medium uppercase tracking-widest">Coffee Maker</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-5 h-5 text-accent" />
                      <span className="text-sm font-medium uppercase tracking-widest">Easy Booking</span>
                    </div>
                  </div>

                  <Link
                    href="/admin/login"
                    className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 font-bold uppercase tracking-[0.2em] text-sm hover:bg-accent hover:text-primary transition-all duration-500 group-hover:gap-8 shadow-xl"
                  >
                    Reserve Now <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0b1120] text-white py-24 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="font-playfair text-4xl font-bold tracking-[0.3em]">AURA</div>
            <p className="text-gray-400 max-w-sm text-lg font-light leading-relaxed">
              Experience the perfect blend of natural beauty and refined luxury at our exclusive resort. A sanctuary for the soul, a feast for the senses.
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="uppercase tracking-[0.3em] font-black text-sm text-accent">Quick Links</h4>
            <ul className="space-y-5 text-gray-400 font-medium tracking-widest text-xs uppercase">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/rooms" className="text-white">Accommodations</Link></li>
              <li><Link href="/dining" className="hover:text-white transition-colors">Dining</Link></li>
              <li><Link href="/experiences" className="hover:text-white transition-colors">Experiences</Link></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="uppercase tracking-[0.3em] font-black text-sm text-accent">Contact Us</h4>
            <ul className="space-y-5 text-gray-400 font-light">
              <li className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-1">Address</span>
                123 Paradise Island, Maldives
              </li>
              <li className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-1">Email</span>
                reservations@aura-resort.com
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">
          <div>&copy; {new Date().getFullYear()} Aura Luxury Resort. All rights reserved.</div>
          <div className="flex gap-10">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
