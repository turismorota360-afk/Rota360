import { Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Compass, ChevronRight } from "lucide-react";
import CitySearch from "@/components/CitySearch";
import { useNavigate } from "react-router-dom";
import rota360Logo from "@/assets/rota360-logo.png";

const RealisticGlobe = lazy(() => import("@/components/RealisticGlobe"));

const GlobeLanding = () => {
  const navigate = useNavigate();
  
  <button onClick={() => navigate("/home")}>
    Entrar
  </button>
  return (
    <div className="min-h-screen bg-[hsl(220,30%,6%)] overflow-hidden">

      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <img 
            src={rota360Logo} 
            alt="Rota360 - Turismo Digital" 
            className="h-12 md:h-14 w-auto drop-shadow-lg"
          />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
              Sobre
            </a>
            <a href="/parceiros" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
              Parceiros
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
              Contato
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <div className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Content */}
        <div className="relative z-20 w-full lg:w-1/2 xl:w-2/5 min-h-screen flex flex-col justify-center px-6 lg:px-12 xl:px-16 py-24">
          <div className="max-w-lg">
            {/* Badge */}
            <div 
              className="animate-fade-up inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-8"
              style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
            >
              <Compass className="w-4 h-4 text-accent" />
              <span className="text-primary-foreground text-sm font-medium">Turismo Digital Imersivo</span>
            </div>
            
            {/* Main Title */}
            <h1 
              className="animate-fade-up font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
              style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
            >
              Descubra o{" "}
              <span className="text-accent">Brasil</span>
              <br />
              em 360°
            </h1>
            
            {/* Description */}
            <p 
              className="animate-fade-up text-lg text-primary-foreground/80 mb-10 leading-relaxed"
              style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
            >
              Explore destinos únicos, planeje rotas personalizadas e 
              viva experiências imersivas nos mais belos lugares do Brasil.
            </p>

            {/* Search Bar */}
            <div 
              className="animate-fade-up mb-8"
              style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
            >
              <CitySearch />
            </div>

            {/* CTA Button */}
            <div 
              className="animate-fade-up flex items-center gap-4 mb-12"
              style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}
            >
              <Button 
                size="lg" 
                onClick={() => navigate("/tocantins")}
                className="group bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
              >
                Explorar Tocantins
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Hint */}
            <div 
              className="animate-fade-up flex items-center gap-3 text-primary-foreground/60 text-sm"
              style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
            >
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
              <span>Clique no ponto laranja no globo para explorar o Tocantins</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Interactive Globe (full height) */}
        <div className="relative z-20 w-full lg:w-1/2 xl:w-3/5 h-[60vh] lg:h-screen">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white/40 animate-pulse">Carregando globo...</div>
            </div>
          }>
            <RealisticGlobe />
          </Suspense>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[hsl(220,30%,6%)]/80 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center gap-8">
              {[
                { value: "139", label: "Municípios" },
                { value: "500+", label: "Atrativos" },
                { value: "360°", label: "Visualização" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl font-bold text-accent">{stat.value}</div>
                  <div className="text-xs text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={() => navigate("/tocantins")}
              className="ml-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Guia Tocantins
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobeLanding;
