import { MapPin, Navigation, Layers, ZoomIn } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MapSection = () => {
  return (
    <section id="mapa" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Mapa Interativo
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Navegue pelos destinos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore o mapa interativo com todos os pontos turísticos, restaurantes, 
            hotéis e serviços. Trace rotas e descubra novos lugares.
          </p>
        </div>

        <Card variant="elevated" className="overflow-hidden">
          <div className="relative h-[500px] bg-secondary/50">
            {/* Map placeholder with stylized design */}
            <div className="absolute inset-0 bg-gradient-to-br from-water/10 via-transparent to-primary/10">
              {/* Simulated map elements */}
              <svg className="w-full h-full" viewBox="0 0 800 500" fill="none">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Roads */}
                <path d="M 100 250 Q 300 200 400 280 T 700 200" stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeOpacity="0.3" fill="none" strokeDasharray="10 5"/>
                <path d="M 150 400 Q 350 350 500 380 T 750 350" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeOpacity="0.2" fill="none"/>
                
                {/* Location markers */}
                {[
                  { x: 200, y: 220, name: "Palmas", primary: true },
                  { x: 350, y: 180, name: "Ponte Alta do Tocantins", primary: false },
                  { x: 500, y: 250, name: "Mateiros", primary: true },
                  { x: 580, y: 200, name: "Dunas do Jalapão", primary: true },
                  { x: 620, y: 280, name: "Fervedouros", primary: true },
                  { x: 450, y: 320, name: "Cachoeira da Velha", primary: false },
                ].map((marker, index) => (
                  <g key={index} className="cursor-pointer hover:scale-110 transition-transform origin-center">
                    <circle 
                      cx={marker.x} 
                      cy={marker.y} 
                      r={marker.primary ? 20 : 12} 
                      fill={marker.primary ? "hsl(var(--primary))" : "hsl(var(--accent))"} 
                      opacity={marker.primary ? 0.9 : 0.7}
                    />
                    <circle 
                      cx={marker.x} 
                      cy={marker.y} 
                      r={marker.primary ? 8 : 5} 
                      fill="white"
                    />
                    <text 
                      x={marker.x} 
                      y={marker.y + (marker.primary ? 35 : 25)} 
                      textAnchor="middle" 
                      className="text-xs font-medium fill-foreground"
                    >
                      {marker.name}
                    </text>
                  </g>
                ))}

                {/* Route line */}
                <path 
                  d="M 200 220 C 280 200 320 190 350 180 C 400 165 450 200 500 250 C 540 220 560 205 580 200" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="3" 
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="8 4"
                  className="animate-pulse"
                />
              </svg>
            </div>

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button variant="glass" size="icon" className="h-10 w-10">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="glass" size="icon" className="h-10 w-10">
                <Layers className="w-4 h-4" />
              </Button>
              <Button variant="glass" size="icon" className="h-10 w-10">
                <Navigation className="w-4 h-4" />
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md rounded-lg p-4 shadow-card">
              <div className="text-sm font-semibold mb-3">Legenda</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Atrativos principais</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Pontos de interesse</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-primary rounded" style={{ backgroundImage: "repeating-linear-gradient(90deg, hsl(var(--primary)) 0, hsl(var(--primary)) 8px, transparent 8px, transparent 12px)" }} />
                  <span className="text-muted-foreground">Rota selecionada</span>
                </div>
              </div>
            </div>

            {/* Info card */}
            <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-md rounded-lg p-4 shadow-card max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Fervedouro do Ceiça</div>
                  <div className="text-sm text-muted-foreground mb-2">Nascente de águas cristalinas</div>
                  <Button size="sm" variant="default">Ver em 360°</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MapSection;
