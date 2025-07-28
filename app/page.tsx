import TopMenuBar from "./components/TopMenuBar";
import HeroSection from "./components/HeroSection";
import TripCard from "./components/TripCard";
import { trips } from "../src/data/trips";

export default function HomePage() {
  // Filter trips into categories
  const oneDayTrips = trips.filter(trip => trip.category === 'OneDay');
  const multiDayTrips = trips.filter(trip => trip.category === 'MultiDay');

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <TopMenuBar />
      <HeroSection />
      
      {/* Travel Packages Section */}
      <section id="travel-packages" className="w-full bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Travel Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our carefully curated travel experiences designed to showcase the best of our region
            </p>
          </div>
          
          {/* One Day Trips Subsection */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              One Day Trips
            </h3>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Perfect for quick getaways and day excursions
            </p>
            
            {oneDayTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {oneDayTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No one-day trips available at the moment.</p>
              </div>
            )}
          </div>

          {/* Multi-Day Trips Subsection */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Multi-Day Trips
            </h3>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Extended adventures for deeper exploration
            </p>
            
            {multiDayTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {multiDayTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No multi-day trips available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
