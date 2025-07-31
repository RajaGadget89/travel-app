"use client";

import YouTubeBackground from "./YouTubeBackground";

export default function HeroSection() {
  // Scroll handler for the CTA button
  const handleScroll = () => {
    const target = document.getElementById("travel-packages");
    if (target) {
      // Get the header height to offset the scroll position
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80; // Default to 80px if header not found
      
      // Calculate the target position to completely eliminate hero video area
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative w-full">
      {/* Video background - maintaining 16:9 aspect ratio with native controls */}
      <YouTubeBackground videoUrl="https://www.youtube.com/embed/g56DdJ5YFBU?autoplay=1&mute=1&controls=1&loop=1&playlist=g56DdJ5YFBU&modestbranding=1&showinfo=0&rel=0&playsinline=1&vq=hd1080&enablejsapi=1" />
      
      {/* CTA button overlay - positioned 20% down from center */}
      <div className="absolute inset-0 flex items-center justify-center z-35 px-4" style={{ transform: 'translateY(20%)', pointerEvents: 'none' }}>
        <button
          onClick={handleScroll}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 md:px-8 md:py-3 rounded-full shadow-lg transition-all text-sm md:text-lg transform hover:scale-105 active:scale-95 pointer-events-auto min-h-[44px] min-w-[120px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2"
          aria-label="View available travel packages and tours"
        >
          See Travel Packages
        </button>
      </div>
    </section>
  );
} 