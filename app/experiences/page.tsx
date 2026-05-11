"use client";

import Link from "next/link";
import { ArrowRight, Compass, Waves, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ExperiencesPage() {
  const experiences = [
    {
      title: "Ocean Exploration",
      description: "Dive into the crystalline waters and discover a world of vibrant coral reefs and majestic marine life. Our expert instructors guide you through unforgettable diving and snorkeling adventures.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80",
      icon: Waves
    },
    {
      title: "Wellness & Spa",
      description: "Rejuvenate your body and spirit at our world-class spa. Combining ancient healing traditions with modern wellness techniques, our therapies offer a path to total relaxation and renewal.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80",
      icon: Heart
    },
    {
      title: "Island Adventures",
      description: "Explore the hidden gems of our island and beyond. From private sunset cruises to guided nature treks, we curate experiences that connect you with the raw beauty of our surroundings.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80",
      icon: Compass
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <Navbar />

      {/* Header */}
      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="Island Experiences"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <span className="block text-accent uppercase tracking-[0.5em] text-sm font-black mb-6 drop-shadow-lg animate-fadeIn">Curated Adventures</span>
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-[10rem] font-black mb-8 drop-shadow-2xl">Experiences</h1>
        </div>
      </header>

      {/* Experiences Grid */}
      <main className="max-w-7xl mx-auto py-32 px-6 lg:px-12 mb-32 space-y-48">
        {experiences.map((exp, index) => (
          <div key={exp.title} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center group`}>
            <div className="flex-1 w-full relative overflow-hidden h-[400px] lg:h-[600px] rounded-lg shadow-2xl">
              <img src={exp.image} alt={exp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700" />
            </div>
            <div className="flex-1 space-y-10">
              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-flex p-4 bg-background rounded-full mb-4 shadow-inner">
                  <exp.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-playfair text-4xl lg:text-6xl text-primary">{exp.title}</h3>
                <div className="w-20 h-1 bg-accent mx-auto lg:mx-0"></div>
              </div>
              <p className="text-xl text-primary-light font-light leading-relaxed text-center lg:text-left">
                {exp.description}
              </p>
              <div className="flex justify-center lg:justify-start pt-6">
                <button className="px-12 py-5 bg-primary text-white font-bold uppercase tracking-[0.3em] text-xs hover:bg-accent hover:text-primary transition-all duration-500 shadow-xl flex items-center gap-4">
                  Discover More <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Seasonal Highlights */}
      <section className="bg-primary text-white py-32 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 space-y-10">
            <span className="text-accent uppercase tracking-[0.4em] text-sm font-bold block">Seasonal Selection</span>
            <h2 className="font-playfair text-4xl md:text-6xl font-bold leading-tight">Sunset Serenade Cruises</h2>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Experience the magic of the golden hour on our private traditional dhoni. Sip chilled champagne and enjoy artisanal hors d'oeuvres as the sun dips below the horizon in a spectacle of color.
            </p>
            <button className="flex items-center gap-4 text-accent font-bold uppercase tracking-[0.3em] text-sm hover:gap-8 transition-all duration-500">
              Book Experience <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 w-full h-[500px] rounded-lg overflow-hidden shadow-2xl relative group">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s]" alt="Sunset" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b1120] text-white py-24 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="font-playfair text-4xl font-bold tracking-[0.3em]">AURA</div>
            <p className="text-gray-400 max-w-sm text-lg font-light leading-relaxed">
              Where luxury meets the untamed beauty of nature.
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="uppercase tracking-[0.3em] font-black text-sm text-accent">Experiences</h4>
            <ul className="space-y-5 text-gray-400 font-medium tracking-widest text-xs uppercase">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/rooms" className="hover:text-white transition-colors">Accommodations</Link></li>
              <li><Link href="/experiences" className="text-white">Experiences</Link></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="uppercase tracking-[0.3em] font-black text-sm text-accent">Connect</h4>
            <p className="text-gray-400">@aura_resort_luxury</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
