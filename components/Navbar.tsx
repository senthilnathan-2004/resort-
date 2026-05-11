"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Lock } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll for dynamic background if needed
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Resort", href: "/resort" },
    { label: "Rooms", href: "/rooms" },
    { label: "Dining", href: "/dining" },
    { label: "Experiences", href: "/experiences" }
  ];

  // Determine if the current page should have a light or dark theme
  // For simplicity, we'll use a dark theme (white text) as it looks premium over images.
  // But we can adjust based on pathname.
  const isDarkPage = pathname === "/" || pathname === "/book";

  return (
    <nav className="fixed top-8 left-0 right-0 z-[100] px-4 md:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-center pointer-events-none">
        <div className={`flex justify-between items-center backdrop-blur-3xl border rounded-full py-3 px-6 md:px-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto relative overflow-hidden transition-all duration-700 w-full ${
          isScrolled ? "bg-[#0b1120]/90 border-white/10 scale-95" : "bg-white/10 border-white/20"
        }`}>
          {/* Glossy Reflection Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-30" />
          
          <Link href="/" className="font-playfair text-xl lg:text-3xl font-black tracking-[0.4em] text-white relative z-20 hover:scale-105 transition-transform duration-500">
            AURA
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-2 items-center relative z-20">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all duration-500 block ${
                    isActive ? "bg-accent text-primary shadow-lg" : "text-white hover:text-primary hover:bg-accent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="w-[1px] h-4 bg-white/20 mx-4" />
            <Link href="/admin/login" className="p-2 text-white/60 hover:text-accent transition-colors block relative z-20">
              <Lock className="w-4 h-4"/>
            </Link>
          </div>
          
          <div className="hidden lg:block relative z-20">
            <Link href="/book" className="bg-accent text-primary px-8 py-3 rounded-full text-[9px] font-black tracking-[0.3em] uppercase hover:bg-white hover:scale-105 transition-all duration-700 shadow-xl block">
              Book Now
            </Link>
          </div>

          {/* Mobile & Tablet Menu Button */}
          <button 
            className="lg:hidden relative z-20 text-white p-2 hover:bg-white/10 rounded-full transition-colors pointer-events-auto"
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Glossy Card Style */}
      <div className={`mt-4 mx-auto max-w-sm bg-[#0b1120]/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden pointer-events-auto relative z-[110] ${
        isMenuOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-95 pointer-events-none"
      }`}>
        <div className="flex flex-col gap-8 text-center">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-playfair transition-all block ${
                pathname === item.href ? "text-accent" : "text-white hover:text-accent"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="h-[1px] bg-white/10 mx-auto w-20" />
          <Link 
            href="/admin/login" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] hover:text-accent transition-colors block"
          >
            Owner Access
          </Link>
          <Link href="/book" onClick={() => setIsMenuOpen(false)} className="bg-accent text-primary py-6 rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase shadow-2xl block hover:bg-white transition-colors">
            Secure Your Sanctuary
          </Link>
        </div>
      </div>
    </nav>
  );
}
