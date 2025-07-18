import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Top Section - Light Grey Background */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo and Company Name */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 relative">
                <Image
                  src="/images/logo.png"
                  alt="หอการค้า จังหวัดสงขลา"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-black font-medium text-lg">
                หอการค้า จังหวัดสงขลา
              </span>
            </div>

            {/* Social Media Icons */}
            <div className="flex flex-col items-center space-y-2">
              <span className="text-gray-500 text-sm">Follow Us</span>
              <div className="flex space-x-4">
                <Link href="#" className="text-black hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-black hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-black hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-black hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-black hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </Link>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Bottom Section - White Background */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Language Selector */}
            <div className="space-y-3">
              <h3 className="text-gray-500 text-sm font-normal">Language</h3>
              <div className="relative">
                <select className="appearance-none bg-transparent border-b border-gray-300 text-black font-medium py-2 pr-8 focus:outline-none focus:border-blue-600">
                  <option>English</option>
                  <option>ไทย</option>
                </select>
                <div className="absolute right-0 top-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* INFO Column */}
            <div className="space-y-3">
              <h3 className="text-black font-bold text-sm">INFO</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                  Contact information
                </Link>
                <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                  Press & Professionals newsletter
                </Link>
                <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                  Regional Information Centres
                </Link>
                <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                  Full-service DMCs
                </Link>
                <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                  Local Coordinators
                </Link>
              </div>
            </div>

            {/* INSPIRATION Column */}
            <div className="space-y-3">
              <h3 className="text-black font-bold text-sm">INSPIRATION</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                  See & Do
                </Link>
                <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                  Plan your Stay
                </Link>
                <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                  What's On
                </Link>
                <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                  About the Faroe Islands
                </Link>
              </div>
            </div>

            {/* SHORT LINKS & LEGAL Column */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-black font-bold text-sm">SHORT LINKS</h3>
                <div className="space-y-2">
                  <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                    What's On Submissions
                  </Link>
                  <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                    Sitemap
                  </Link>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-black font-bold text-sm">LEGAL</h3>
                <div className="space-y-2">
                  <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>

            {/* IN FAROESE Column */}
            <div className="space-y-3">
              <h3 className="text-black font-bold text-sm">IN FAROESE</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                  Um Visit Faroe Islands
                </Link>
                <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                  Menning
                </Link>
                <Link href="#" className="block text-black hover:text-blue-600 transition-colors text-sm">
                  Hagtøl
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie/Accessibility Button */}
      <div className="fixed bottom-4 left-4">
        <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </button>
      </div>
    </footer>
  );
} 