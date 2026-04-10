import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Users, Star, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tocantinsCities, getFeaturedCities } from "@/data/tocantinsCities";

const TocantinsMap = () => {
  const navigate = useNavigate();
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const featuredCities = getFeaturedCities();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-border/30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">R</span>
              </div>
              <span className="font-display text-xl font-semibold text-foreground">Rota360</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <span className="text-primary font-medium">Tocantins</span>
          </nav>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Brasil</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Tocantins
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubra as maravilhas do estado mais jovem do Brasil. 
                Selecione uma cidade no mapa para começar sua aventura.
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Interactive Map */}
              <div className="lg:col-span-2">
                <Card variant="elevated" className="overflow-hidden">
                  <div className="relative h-[600px] bg-secondary/30">
                    {/* SVG Map of Tocantins */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Background */}
                      <defs>
                        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
                        </linearGradient>
                      </defs>
                      
                      {/* Simplified Tocantins shape */}
                      <path
                        d="M 30 5 
                           L 75 5 
                           L 85 20 
                           L 88 40 
                           L 82 60 
                           L 78 80 
                           L 65 95 
                           L 45 95 
                           L 35 85 
                           L 20 70 
                           L 15 50 
                           L 18 30 
                           L 25 15 
                           Z"
                        fill="url(#mapGradient)"
                        stroke="hsl(var(--primary))"
                        strokeWidth="0.5"
                        strokeOpacity="0.5"
                      />

                      {/* Grid lines */}
                      {[20, 40, 60, 80].map((pos) => (
                        <g key={pos}>
                          <line x1={pos} y1="0" x2={pos} y2="100" stroke="hsl(var(--border))" strokeWidth="0.2" strokeDasharray="2,2" />
                          <line x1="0" y1={pos} x2="100" y2={pos} stroke="hsl(var(--border))" strokeWidth="0.2" strokeDasharray="2,2" />
                        </g>
                      ))}

                      {/* City markers */}
                      {tocantinsCities.map((city) => (
                        <g
                          key={city.id}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredCity(city.id)}
                          onMouseLeave={() => setHoveredCity(null)}
                          onClick={() => navigate(`/cidade/${city.slug}`)}
                        >
                          {/* Outer ring */}
                          <circle
                            cx={city.mapPosition.x}
                            cy={city.mapPosition.y}
                            r={hoveredCity === city.id ? 4 : 3}
                            fill={city.featured ? "hsl(var(--primary))" : "hsl(var(--accent))"}
                            opacity={hoveredCity === city.id ? 0.3 : 0.2}
                            className="transition-all duration-300"
                          />
                          
                          {/* Inner dot */}
                          <circle
                            cx={city.mapPosition.x}
                            cy={city.mapPosition.y}
                            r={hoveredCity === city.id ? 2.5 : 1.5}
                            fill={city.featured ? "hsl(var(--primary))" : "hsl(var(--accent))"}
                            className="transition-all duration-300"
                          />
                          
                          {/* Label */}
                          {(hoveredCity === city.id || city.featured) && (
                            <text
                              x={city.mapPosition.x}
                              y={city.mapPosition.y - 5}
                              textAnchor="middle"
                              className={`text-[3px] font-medium fill-foreground transition-opacity duration-300 ${
                                hoveredCity === city.id ? "opacity-100" : "opacity-70"
                              }`}
                            >
                              {city.name}
                            </text>
                          )}
                        </g>
                      ))}

                      {/* Connection lines for featured cities */}
                      {featuredCities.slice(0, -1).map((city, index) => {
                        const nextCity = featuredCities[index + 1];
                        if (!nextCity) return null;
                        return (
                          <line
                            key={`${city.id}-${nextCity.id}`}
                            x1={city.mapPosition.x}
                            y1={city.mapPosition.y}
                            x2={nextCity.mapPosition.x}
                            y2={nextCity.mapPosition.y}
                            stroke="hsl(var(--primary))"
                            strokeWidth="0.3"
                            strokeOpacity="0.3"
                            strokeDasharray="1,1"
                          />
                        );
                      })}
                    </svg>

                    {/* Hover tooltip */}
                    {hoveredCity && (
                      <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80">
                        <Card variant="glass" className="animate-scale-in">
                          <CardContent className="p-4">
                            {(() => {
                              const city = tocantinsCities.find(c => c.id === hoveredCity);
                              if (!city) return null;
                              return (
                                <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-display font-semibold text-foreground mb-1">
                                      {city.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-3">
                                      {city.shortDescription}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {city.population}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-primary text-primary" />
                                        {city.attractions} atrativos
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {/* Legend */}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md rounded-lg p-3 shadow-card">
                      <div className="text-xs font-semibold mb-2">Legenda</div>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          <span className="text-muted-foreground">Destinos principais</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          <span className="text-muted-foreground">Outros destinos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Cities List */}
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Destinos em Destaque
                </h2>
                {featuredCities.map((city) => (
                  <Card
                    key={city.id}
                    variant="elevated"
                    className={`cursor-pointer transition-all duration-300 ${
                      hoveredCity === city.id ? "border-primary shadow-warm" : ""
                    }`}
                    onMouseEnter={() => setHoveredCity(city.id)}
                    onMouseLeave={() => setHoveredCity(null)}
                    onClick={() => navigate(`/cidade/${city.slug}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-display font-semibold text-foreground mb-1">
                            {city.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {city.shortDescription}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span>{city.attractions} atrativos</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => {}}
                >
                  Ver todas as cidades
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Cidades", value: tocantinsCities.length.toString() },
                { label: "Atrativos", value: "200+" },
                { label: "Área", value: "277.720 km²" },
                { label: "Roteiros", value: "50+" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TocantinsMap;
