"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TopMenuBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:py-3">
        {/* Left: Logo and Organization Names */}
        <div className="flex items-center space-x-3 mr-auto">
          <Image src="/images/logo.png" alt="Songkhla Chamber of Commerce Logo" width={64} height={64} className="rounded-full" />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-2xl text-blue-900">Songkhla Chamber of Commerce</span>
            <span className={`text-lg transition-colors duration-300 ${scrolled ? "text-gray-700" : "text-gray-300"}`}>หอการค้า จังหวัดสงขลา</span>
          </div>
        </div>
        {/* Right: Menu and Icons */}
        <div className="flex items-center space-x-8">
          <ul className={`hidden md:flex space-x-8 font-semibold text-lg transition-colors duration-300 ${scrolled ? "text-black" : "text-white"}`}>
            <li><a href="#see-do" className="hover:text-blue-700">SEE & DO</a></li>
            <li><a href="#plan-stay" className="hover:text-blue-700">PLAN YOUR STAY</a></li>
            <li><a href="#whats-on" className="hover:text-blue-700">WHAT'S ON</a></li>
            <li><a href="#about" className="hover:text-blue-700">ABOUT</a></li>
          </ul>
          <div className={`flex items-center space-x-4 text-xl transition-colors duration-300 ${scrolled ? "text-black" : "text-white"}`}>
            <button aria-label="Favorites" className="hover:text-blue-700"><span>♡</span></button>
            <button aria-label="Search" className="hover:text-blue-700"><span>🔍</span></button>
            <button aria-label="Language" className="hover:text-blue-700"><span>🌐</span></button>
          </div>
        </div>
      </nav>
    </header>
  );
} 