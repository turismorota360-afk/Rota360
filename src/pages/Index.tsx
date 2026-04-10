import { Header, HeroSection } from "@/components/HeroSection";
import AttractionsSection from "@/components/AttractionsSection";
import RoutePlannerSection from "@/components/RoutePlannerSection";
import MapSection from "@/components/MapSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AttractionsSection />
        <RoutePlannerSection />
        <MapSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
