"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Utensils, Wine, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function DiningPage() {
  const restaurants = [
    {
      name: "The Azure Grill",
      type: "Fine Dining",
      description: "Experience modern coastal cuisine with panoramic ocean views. Our signature restaurant specializes in fresh, locally-sourced seafood and prime cuts of meat prepared over an open flame.",
      hours: "18:30 - 22:30",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80",
      location: "Cliffside Terrace"
    },
    {
      name: "Saffron Lounge",
      type: "Authentic Flavors",
      description: "A journey through the vibrant spices and aromas of the East. Saffron Lounge offers an intimate setting for exploring traditional dishes reimagined with contemporary techniques.",
      hours: "12:00 - 15:00, 19:00 - 22:00",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
      location: "Main Pavilion"
    },
    {
      name: "The Sand Bar",
      type: "Casual & Cocktails",
      description: "Feel the sand between your toes as you enjoy signature cocktails and light Mediterranean-inspired bites. The perfect spot for watching the sunset with a drink in hand.",
      hours: "10:00 - 00:00",
      image: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80",
      location: "Beachfront"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <Navbar />

      {/* Header */}
      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="Fine Dining"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <span className="block text-accent uppercase tracking-[0.5em] text-sm font-black mb-6 drop-shadow-lg animate-fadeIn">Culinary Masterpieces</span>
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-9xl font-black mb-8 drop-shadow-2xl">Exquisite Dining</h1>
        </div>
      </header>

      {/* Intro */}
      <section className="py-24 px-8 max-w-5xl mx-auto text-center">
        <h2 className="font-playfair text-3xl md:text-5xl text-primary mb-10 leading-snug">A Symphony of Flavors</h2>
        <p className="text-lg md:text-xl text-primary-light font-light leading-relaxed">
          Dining at Aura is more than just a meal; it's a sensory journey. From the freshest catches of the day to exotic spices from across the globe, our master chefs create culinary experiences that celebrate the finest ingredients and breathtaking surroundings.
        </p>
      </section>

      {/* Restaurants */}
      <main className="max-w-7xl mx-auto py-12 px-6 lg:px-12 mb-32 space-y-32">
        {restaurants.map((res, index) => (
          <div key={res.name} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
            <div className="flex-1 w-full h-[400px] lg:h-[600px] overflow-hidden shadow-2xl rounded-sm">
              <img src={res.image} alt={res.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[3s]" />
            </div>
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold">{res.type}</span>
                <h3 className="font-playfair text-4xl lg:text-6xl text-primary">{res.name}</h3>
              </div>
              <p className="text-lg text-primary-light font-light leading-relaxed">
                {res.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-2 bg-background rounded-full"><Clock className="w-5 h-5 text-accent" /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Hours</p>
                    <p className="text-sm font-medium">{res.hours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-2 bg-background rounded-full"><MapPin className="w-5 h-5 text-accent" /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Location</p>
                    <p className="text-sm font-medium">{res.location}</p>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-4 text-accent font-bold uppercase tracking-[0.3em] text-sm hover:gap-8 transition-all duration-500">
                Reserve Table <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
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
              <li><Link href="/rooms" className="hover:text-white transition-colors">Accommodations</Link></li>
              <li><Link href="/dining" className="text-white">Dining</Link></li>
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
                dining@aura-resort.com
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">
          <div>&copy; {new Date().getFullYear()} Aura Luxury Resort. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
