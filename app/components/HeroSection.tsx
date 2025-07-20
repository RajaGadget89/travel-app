"use client";

import { useEffect, useState } from "react";
import YouTubeBackground from "./YouTubeBackground";

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Scroll handler for the CTA button
  const handleScroll = () => {
    const target = document.getElementById("travel-packages");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Debug border for HeroSection in development - only show on client */}
      {isClient && (
        <div className="absolute inset-0 border-4 border-blue-500 z-40 pointer-events-none">
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs">
            HeroSection Container
          </div>
        </div>
      )}
      
      {/* Video background - full viewport coverage */}
      <YouTubeBackground videoUrl="https://www.youtube.com/embed/g56DdJ5YFBU?autoplay=1&mute=1&controls=0&loop=1&playlist=g56DdJ5YFBU&modestbranding=1&showinfo=0&rel=0&enablejsapi=1&playsinline=1" />
      
      {/* Hero content */}
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
          Discover Amazing
          <span className="block text-yellow-400">Travel Experiences</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
          Explore breathtaking destinations and create unforgettable memories
        </p>
      </div>
      
      {/* Call-to-action button */}
      <div className="absolute bottom-24 md:bottom-32 left-0 w-full flex justify-center z-20">
        <button
          onClick={handleScroll}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full shadow-lg transition-all text-base md:text-lg transform hover:scale-105"
        >
          See Travel Packages
        </button>
      </div>
    </section>
  );
} 