"use client";

import YouTubeBackground from "./YouTubeBackground";

export default function HeroSection() {
  // Scroll handler for the CTA button
  const handleScroll = () => {
    const target = document.getElementById("travel-packages");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* YouTube video background - full viewport coverage */}
      <div className="absolute inset-0 w-full h-full z-0">
        <YouTubeBackground />
      </div>
      {/* Call-to-action button - positioned higher to avoid blocking subtitles */}
      <div className="absolute bottom-24 md:bottom-32 left-0 w-full flex justify-center z-10">
        <button
          onClick={handleScroll}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full shadow-lg transition-all text-base md:text-lg"
        >
          See Travel Packages
        </button>
      </div>
    </section>
  );
} 