import TopMenuBar from "./components/TopMenuBar";
import HeroSection from "./components/HeroSection";
import TravelPackageList from "./components/TravelPackageList";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <TopMenuBar />
      <HeroSection />
      <TravelPackageList />
    </main>
  );
}
