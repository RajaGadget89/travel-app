"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TopMenuBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:py-3">
        {/* Left: Logo and Organization Names */}
        <div className="flex items-center space-x-2 md:space-x-3 mr-auto">
          <div className="relative w-10 h-10 md:w-16 md:h-16">
            <Image 
              src="/images/logo.png" 
              alt="Songkhla Chamber of Commerce Logo" 
              fill
              className="rounded-full object-contain"
              sizes="(max-width: 768px) 40px, 64px"
            />
          </div>
          <div className={`flex flex-col leading-tight z-10 md:z-auto transition-all duration-300 ${
            !scrolled 
              ? "translate-y-[-100px] pointer-events-none md:translate-y-0 md:pointer-events-auto" 
              : "translate-y-0 pointer-events-auto"
          }`}>
            <span className="font-bold text-sm md:text-2xl text-blue-900">Songkhla Chamber of Commerce</span>
            <span className={`text-xs md:text-lg transition-colors duration-300 ${scrolled ? "text-gray-700" : "text-gray-300"}`}>หอการค้า จังหวัดสงขลา</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-lg transition-colors duration-300 hover:bg-gray-100"
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className={`flex space-x-8 font-semibold text-lg transition-colors duration-300 ${scrolled ? "text-black" : "text-white"}`}>
            <li><a href="#see-do" className="hover:text-blue-700">SEE & DO</a></li>
            <li><a href="#plan-stay" className="hover:text-blue-700">PLAN YOUR STAY</a></li>
            <li><a href="#whats-on" className="hover:text-blue-700">SharePoint</a></li>
            <li><a href="#about" className="hover:text-blue-700">ABOUT</a></li>
          </ul>
          <div className={`flex items-center space-x-4 text-xl transition-colors duration-300 ${scrolled ? "text-black" : "text-white"}`}>
            <button aria-label="Favorites" className="hover:text-blue-700"><span>♡</span></button>
            <button aria-label="Search" className="hover:text-blue-700"><span>🔍</span></button>
            <button aria-label="Language" className="hover:text-blue-700"><span>🌐</span></button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            <ul className="space-y-4 font-semibold text-lg text-black">
              <li><a href="#see-do" className="block py-2 hover:text-blue-700" onClick={() => setMobileMenuOpen(false)}>SEE & DO</a></li>
              <li><a href="#plan-stay" className="block py-2 hover:text-blue-700" onClick={() => setMobileMenuOpen(false)}>PLAN YOUR STAY</a></li>
              <li><a href="#whats-on" className="block py-2 hover:text-blue-700" onClick={() => setMobileMenuOpen(false)}>SharePoint</a></li>
              <li><a href="#about" className="block py-2 hover:text-blue-700" onClick={() => setMobileMenuOpen(false)}>ABOUT</a></li>
            </ul>
            <div className="flex items-center space-x-6 text-xl text-black pt-4 border-t border-gray-200">
              <button aria-label="Favorites" className="p-2 hover:text-blue-700"><span>♡</span></button>
              <button aria-label="Search" className="p-2 hover:text-blue-700"><span>🔍</span></button>
              <button aria-label="Language" className="p-2 hover:text-blue-700"><span>🌐</span></button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 