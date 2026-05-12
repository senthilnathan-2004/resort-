"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Users, ArrowRight, Lock, Menu, X, Play, Star, ChevronRight, MessageSquare, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomsLoading, setRoomsLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch('/api/rooms/featured');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) setRooms(data);
        }
      } catch (error) {
        console.error("Failed to fetch rooms", error);
      } finally {
        setRoomsLoading(false);
      }
    }
    fetchRooms();
  }, []);

  const defaultRooms = [
    {
      _id: "1",
      name: "Ocean View Suite",
      featuredImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80",
      pricePerNight: 450,
      shortDescription: "Wake up to panoramic views of the azure ocean from your private balcony."
    },
    {
      _id: "2",
      name: "Garden Pool Villa",
      featuredImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80",
      pricePerNight: 650,
      shortDescription: "A secluded sanctuary featuring a private plunge pool and lush tropical gardens."
    },
    {
      _id: "3",
      name: "Presidential Suite",
      featuredImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80",
      pricePerNight: 1200,
      shortDescription: "The pinnacle of luxury with expansive living areas and unparalleled service."
    }
  ];

  const displayRooms = rooms.length > 0 ? rooms : defaultRooms;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80"
            alt="Luxury Resort"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4 mt-20 lg:mt-0">
          <span className="block text-sm font-black tracking-[0.3em] uppercase mb-4 text-accent drop-shadow-lg">
            Welcome to Paradise
          </span>
          <h1 className="font-playfair text-[15vw] sm:text-[13vw] md:text-8xl lg:text-9xl font-black mb-6 drop-shadow-2xl whitespace-nowrap">
            Aura Resort
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-xl font-black uppercase tracking-[0.2em] mb-10 text-white drop-shadow-lg">
            Experience unparalleled luxury and serenity.
          </p>

          {/* Quick Booking Bar */}
          <div className="bg-white/10 backdrop-blur-md p-2 max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-2 border border-white/20">
            <div className="flex-1 w-full bg-white/10 px-4 py-3 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-accent" />
              <div className="text-left w-full">
                <div className="text-xs uppercase tracking-wider text-white/70">Check In</div>
                <div className="text-sm font-medium">Select Date</div>
              </div>
            </div>
            <div className="flex-1 w-full bg-white/10 px-4 py-3 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-accent" />
              <div className="text-left w-full">
                <div className="text-xs uppercase tracking-wider text-white/70">Check Out</div>
                <div className="text-sm font-medium">Select Date</div>
              </div>
            </div>
            <div className="flex-1 w-full bg-white/10 px-4 py-3 flex items-center gap-3">
              <Users className="w-5 h-5 text-accent" />
              <div className="text-left w-full">
                <div className="text-xs uppercase tracking-wider text-white/70">Guests</div>
                <div className="text-sm font-medium">2 Adults</div>
              </div>
            </div>
            <button className="w-full lg:w-auto bg-accent hover:bg-accent-light text-primary px-8 py-4 font-bold uppercase tracking-widest transition-colors h-full flex items-center justify-center">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl text-primary mb-8">
            An Unforgettable Escape
          </h2>
          <p className="text-lg text-primary-light leading-relaxed mb-10">
            Nestled in the heart of untouched nature, Aura Resort offers a sanctuary for those seeking to disconnect from the everyday and reconnect with themselves. Our meticulously designed suites, world-class dining, and personalized experiences create a symphony of luxury that caters to your every desire.
          </p>
          <Link href="/resort" className="inline-flex items-center gap-2 text-accent font-semibold tracking-widest uppercase hover:gap-4 transition-all">
            Discover the Resort <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent uppercase tracking-widest text-sm font-bold mb-2 block">Accommodations</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-primary">Luxury Suites</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayRooms.map((room) => (
              <div key={room._id} className="group cursor-pointer text-gray-900">
                <div className="relative h-72 sm:h-80 overflow-hidden mb-6 rounded-sm">
                  <Image 
                    src={room.featuredImage || (room.images && room.images[0]?.url) || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"} 
                    alt={room.name} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="font-playfair text-2xl mb-2 group-hover:text-accent transition-colors text-primary">{room.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{room.shortDescription || room.description}</p>
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <span className="font-bold text-lg text-primary">${room.pricePerNight?.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ night</span></span>
                  <span className="text-accent uppercase tracking-widest text-xs font-bold flex items-center gap-1">Explore <ArrowRight className="w-4 h-4" /></span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/rooms" className="inline-block border border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 uppercase tracking-widest text-sm font-bold transition-colors">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>
      {/* Dining Highlights Section */}
      <section className="py-24 px-8 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <span className="text-accent uppercase tracking-widest text-sm font-bold mb-2 block">Gastronomy</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-primary mb-6">Culinary Excellence</h2>
            <p className="text-lg text-primary-light leading-relaxed mb-8">
              Indulge your senses with our diverse dining options. From authentic local flavors served by the beach to fine dining under the stars, our master chefs curate experiences that tantalize your taste buds.
            </p>
            <Link href="/dining" className="inline-flex items-center gap-2 text-accent font-semibold tracking-widest uppercase hover:gap-4 transition-all">
              Explore Dining <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="flex-1 w-full">
            <div className="relative h-96 w-full shadow-2xl rounded-sm overflow-hidden">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80" alt="Fine Dining" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-24 px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-accent uppercase tracking-widest text-sm font-bold mb-2 block">Activities</span>
              <h2 className="font-playfair text-4xl md:text-5xl">Curated Experiences</h2>
            </div>
            <Link href="/experiences" className="inline-flex items-center gap-2 text-accent font-semibold tracking-widest uppercase hover:gap-4 transition-all">
              All Experiences <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="relative h-72 overflow-hidden mb-6">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" alt="Spa & Wellness" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <h3 className="font-playfair text-2xl mb-2 text-white">Spa & Wellness</h3>
              <p className="text-gray-300 line-clamp-2">Rejuvenate your body and mind with our traditional healing therapies.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="relative h-72 overflow-hidden mb-6">
                <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80" alt="Water Sports" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <h3 className="font-playfair text-2xl mb-2 text-white">Ocean Adventures</h3>
              <p className="text-gray-300 line-clamp-2">Explore vibrant coral reefs with our expert diving instructors.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="relative h-72 overflow-hidden mb-6">
                <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80" alt="Private Tours" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <h3 className="font-playfair text-2xl mb-2 text-white">Private Tours</h3>
              <p className="text-gray-300 line-clamp-2">Exclusive guided tours to the most scenic spots on the island.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="relative h-72 overflow-hidden mb-6">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80" alt="Island Excursions" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <h3 className="font-playfair text-2xl mb-2 text-white">Island Excursions</h3>
              <p className="text-gray-300 line-clamp-2">Discover hidden beaches and local culture on private guided tours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-8 bg-background overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent uppercase tracking-widest text-sm font-bold mb-2 block">Guest Stories</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-primary">Words from our Guests</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: "Sarah Jenkins", text: "An absolute paradise. The service was impeccable and the views were beyond description.", role: "CEO, Tech Corp" },
              { name: "Michael Chen", text: "The perfect escape from the city. Aura Resort redefined luxury for me.", role: "Architect" },
              { name: "Elena Rodriguez", text: "Every detail was perfect. From the food to the spa, it was an unforgettable experience.", role: "Artist" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 shadow-xl rounded-sm border border-gray-50 relative">
                <div className="text-accent text-6xl font-serif absolute top-4 left-4 opacity-20">"</div>
                <p className="text-primary-light italic mb-8 relative z-10 leading-relaxed text-lg">{t.text}</p>
                <div>
                  <p className="font-bold text-primary">{t.name}</p>
                  <p className="text-xs text-accent uppercase tracking-widest font-bold mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-8 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-playfair text-4xl md:text-6xl text-white mb-8">Join the Aura Circle</h2>
          <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto">Subscribe to our newsletter for exclusive offers, curated travel inspiration, and updates from paradise.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-accent"
              required
            />
            <button className="bg-accent hover:bg-accent-light text-primary px-10 py-4 font-bold uppercase tracking-widest transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b1120] text-white py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="font-playfair text-3xl font-bold tracking-wider mb-6">AURA</div>
            <p className="text-gray-400 max-w-sm">Experience the perfect blend of natural beauty and refined luxury at our exclusive resort.</p>
          </div>
          <div>
            <h4 className="uppercase tracking-widest font-bold mb-6 text-sm">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/resort" className="hover:text-accent transition-colors">The Resort</Link></li>
              <li><Link href="/rooms" className="hover:text-accent transition-colors">Accommodations</Link></li>
              <li><Link href="/dining" className="hover:text-accent transition-colors">Dining</Link></li>
              <li><Link href="/admin/login" className="hover:text-accent transition-colors flex items-center gap-2"><Lock className="w-3 h-3" /> Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase tracking-widest font-bold mb-6 text-sm">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li>123 Paradise Island, Maldives</li>
              <li>info@aura-resort.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Aura Resort. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
