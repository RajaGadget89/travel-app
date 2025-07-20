import Image from 'next/image';
import Link from 'next/link';

export default function TravelPackageList() {
  // 7 travel packages with sample images and descriptions
  const packages = [
    {
      id: 1,
      title: "Island Adventure",
      subtitle: "Explore the beautiful islands",
      description: "Guided tours through pristine landscapes with local cuisine experiences",
      image: "/images/hero-image.png", // Using hero image as sample
      price: "฿12,000",
      duration: "3 Days",
      category: "Adventure"
    },
    {
      id: 2,
      title: "Cultural Escape",
      subtitle: "Immerse in local culture",
      description: "Discover traditional arts, history, and authentic cultural experiences",
      image: "/images/hero-image.png", // Using hero image as sample
      price: "฿9,500",
      duration: "2 Days",
      category: "Culture"
    },
    {
      id: 3,
      title: "Nature Retreat",
      subtitle: "Relax in pristine nature",
      description: "Hiking trails, waterfalls, and breathtaking scenic views",
      image: "/images/hero-image.png", // Using hero image as sample
      price: "฿15,000",
      duration: "4 Days",
      category: "Nature"
    },
    {
      id: 4,
      title: "Coastal Discovery",
      subtitle: "Explore coastal wonders",
      description: "Beach activities, marine life, and coastal village tours",
      image: "/images/hero-image.png", // Using hero image as sample
      price: "฿11,500",
      duration: "3 Days",
      category: "Coastal"
    },
    {
      id: 5,
      title: "Mountain Expedition",
      subtitle: "Conquer the peaks",
      description: "Challenging hikes, mountain views, and adventure sports",
      image: "/images/hero-image.png", // Using hero image as sample
      price: "฿18,000",
      duration: "5 Days",
      category: "Adventure"
    },
    {
      id: 6,
      title: "Heritage Journey",
      subtitle: "Walk through history",
      description: "Historical sites, ancient temples, and traditional crafts",
      image: "/images/hero-image.png", // Using hero image as sample
      price: "฿8,500",
      duration: "2 Days",
      category: "Heritage"
    },
    {
      id: 7,
      title: "Wellness Escape",
      subtitle: "Rejuvenate your spirit",
      description: "Spa treatments, meditation, and peaceful retreat experiences",
      image: "/images/hero-image.png", // Using hero image as sample
      price: "฿13,500",
      duration: "3 Days",
      category: "Wellness"
    }
  ];

  return (
    <section id="travel-packages" className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Travel Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated travel experiences designed to showcase the best of our region
          </p>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <Link 
              href={`/package/${pkg.id}`} 
              key={pkg.id}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                      {pkg.category}
                    </span>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4">
                    <span className="inline-block bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                      {pkg.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-blue-600 font-medium text-sm mb-3">
                    {pkg.subtitle}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pkg.description}
                  </p>
                  
                  {/* CTA Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors">
                      Learn More
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/packages" 
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            View All Packages
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 