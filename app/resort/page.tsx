"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Info, Shield, Trees, Map } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ResortPage() {
  const values = [
    {
      title: "Sustainable Luxury",
      description: "Our commitment to the environment is woven into everything we do, from our solar-powered facilities to our zero-waste initiative.",
      icon: Trees
    },
    {
      title: "Unparalleled Privacy",
      description: "Designed for ultimate seclusion, our resort offers private retreats where you can truly be yourself.",
      icon: Shield
    },
    {
      title: "Authentic Connection",
      description: "We celebrate local culture and traditions, offering experiences that connect you deeply with our heritage.",
      icon: Map
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <Navbar />

      {/* Header */}
      <header className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="The Resort"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <span className="block text-accent uppercase tracking-[0.5em] text-sm font-black mb-6 drop-shadow-lg">Our Sanctuary</span>
          <h1 className="font-playfair text-5xl md:text-8xl font-black mb-8 drop-shadow-2xl">The Aura Story</h1>
        </div>
      </header>

      {/* Philosophy Section */}
      <section className="py-32 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1 space-y-10">
          <div className="inline-flex p-4 bg-background rounded-full shadow-inner">
            <Info className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-playfair text-4xl md:text-6xl text-primary leading-tight">Where Nature Meets Elegance</h2>
          <p className="text-xl text-primary-light font-light leading-relaxed">
            Born from a vision of creating a sanctuary that respects the natural world while providing the pinnacle of luxury, Aura Resort is more than just a destination. It is a philosophy of living in harmony with our surroundings, celebrating the beauty of the present moment.
          </p>
          <p className="text-lg text-gray-500 font-light">
            Founded in 2022, we have quickly become a benchmark for sustainable luxury in the Maldives, offering a unique blend of sophisticated design and raw, untamed nature.
          </p>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-8">
          <div className="h-80 rounded-[2rem] overflow-hidden shadow-2xl mt-12">
            <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Resort Detail" />
          </div>
          <div className="h-80 rounded-[2rem] overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Resort View" />
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-primary text-white py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <span className="text-accent uppercase tracking-[0.4em] text-sm font-bold block">Our Pillars</span>
            <h2 className="font-playfair text-4xl md:text-6xl font-bold">What Defines Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {values.map((v) => (
              <div key={v.title} className="text-center space-y-8 p-8 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                <div className="inline-flex p-6 bg-accent/20 rounded-full">
                  <v.icon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="font-playfair text-3xl font-bold">{v.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed text-lg">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b1120] text-white py-24 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left">
          <div className="col-span-1 md:col-span-2">
            <div className="font-playfair text-4xl font-bold tracking-[0.3em] mb-8">AURA</div>
            <p className="text-gray-400 max-w-sm mx-auto md:mx-0 text-lg font-light leading-relaxed">
              Discover the art of living well at Aura Resort.
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="uppercase tracking-[0.3em] font-black text-sm text-accent">Quick Links</h4>
            <ul className="space-y-5 text-gray-400 font-medium tracking-widest text-xs uppercase">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/rooms" className="hover:text-white transition-colors">Accommodations</Link></li>
              <li><Link href="/resort" className="text-white">The Resort</Link></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="uppercase tracking-[0.3em] font-black text-sm text-accent">Join Our Journey</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 px-4 py-2 rounded-sm text-sm focus:outline-none focus:border-accent w-full" />
              <button className="bg-accent text-primary p-2"><ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
