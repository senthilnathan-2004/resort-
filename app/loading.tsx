"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0b1120]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(191,155,48,0.05)_0%,_transparent_70%)]" />
      
      <div className="relative flex flex-col items-center gap-12">
        {/* Luxury Logo Animation */}
        <div className="relative">
          <div className="font-playfair text-5xl md:text-7xl font-black tracking-[0.4em] text-white animate-pulse">
            AURA
          </div>
          <div className="absolute -bottom-4 left-0 right-0 h-[2px] bg-accent animate-[loading-bar_2s_infinite_ease-in-out]" />
        </div>
        
        {/* Elegant Text */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-black animate-fadeIn">
            Sanctuary of Serenity
          </span>
          <div className="flex gap-1.5 mt-4">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: scaleX(0); transform-origin: left; }
          45% { transform: scaleX(1); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  );
}
