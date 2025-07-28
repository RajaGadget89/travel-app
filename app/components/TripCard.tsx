import Image from 'next/image';
import Link from 'next/link';
import { Trip } from '../../src/data/trips';

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  // Format price with Thai Baht symbol
  const formattedPrice = `฿${trip.price.toLocaleString()}`;
  
  // Format duration
  const duration = trip.days === 1 ? '1 Day' : `${trip.days} Days`;
  

  


  return (
    <Link 
      href={`/book/${trip.id}`} 
      className="group block"
    >
      <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <Image
            src={trip.image}
            alt={trip.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3 md:top-4 md:left-4">
            <span className="inline-block bg-white/90 text-gray-900 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold">
              {trip.category === 'OneDay' ? 'One Day' : 'Multi Day'}
            </span>
          </div>

          {/* Duration Badge */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4">
            <span className="inline-block bg-blue-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold">
              {duration}
            </span>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4">
            <span className="inline-block bg-white/90 text-gray-900 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm font-bold">
              {formattedPrice}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {trip.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3">
            {trip.description}
          </p>
          
          {/* CTA Button */}
          <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100">
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
  );
} 