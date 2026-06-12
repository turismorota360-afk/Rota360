import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tocantinsCities, getFeaturedCities } from "@/data/tocantinsCities";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const featuredIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Imagens fictícias do Unsplash para cada cidade
const cityImages: Record<string, string> = {
  palmas:          "/assets/palmas-to.jpg",
  jalapao:         "/assets/dunas-jalapao.jpg",
  taquarucu:       "/assets/festival-taquarucu.jpg",
  arraias:         "/assets/serra-espirito-santo.jpg",
  natividade:      "/assets/comunidade-mumbuca.jpg",
  araguaina:       "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80",
  "porto-nacional":"/assets/catedral-palmas.jpg",
  lajeado:         "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&q=80",
  "ilha-do-bananal":"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80",
  miracema:        "https://images.unsplash.com/photo-1504214208698-ea446addbbfb?w=400&q=80",
  gurupi:          "/assets/feira-artesanato-gurupi.jpg",
};

const fallback = "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80";

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

              {/* Leaflet Map */}
              <div className="lg:col-span-2">
                <Card variant="elevated" className="overflow-hidden">
                  <div className="relative h-[600px]">
                    <MapContainer
                      center={[-10.5, -48.0]}
                      zoom={7}
                      style={{ height: "100%", width: "100%", zIndex: 0 }}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {tocantinsCities.map((city) => (
                        <Marker
                          key={city.id}
                          position={[city.coordinates.lat, city.coordinates.lng]}
                          icon={featuredIcon}
                          eventHandlers={{
                            mouseover: () => setHoveredCity(city.id),
                            mouseout: () => setHoveredCity(null),
                          }}
                        >
                          <Popup>
                            <div className="min-w-[220px] overflow-hidden rounded-lg" style={{ margin: "-14px -20px -14px -20px" }}>
                              <img
                                src={cityImages[city.id] ?? fallback}
                                alt={city.name}
                                style={{ width: "100%", height: "110px", objectFit: "cover", display: "block" }}
                                onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
                              />
                              <div style={{ padding: "12px" }}>
                                <h3 style={{ fontWeight: "700", fontSize: "15px", marginBottom: "4px" }}>{city.name}</h3>
                                <p style={{ fontSize: "13px", color: "#555", marginBottom: "4px" }}>{city.shortDescription}</p>
                                <p style={{ fontSize: "11px", color: "#888", marginBottom: "10px" }}>
                                  {city.attractions}+ atrativos · Pop. {city.population}
                                </p>
                                <button
                                  onClick={() => navigate(`/cidade/${city.slug}`)}
                                  style={{
                                    background: "#2563eb", color: "#fff", fontSize: "12px",
                                    padding: "6px 12px", borderRadius: "6px", border: "none",
                                    cursor: "pointer", width: "100%",
                                  }}
                                >
                                  Ver atrativos →
                                </button>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
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
                    className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                      hoveredCity === city.id ? "border-primary shadow-warm" : ""
                    }`}
                    onMouseEnter={() => setHoveredCity(city.id)}
                    onMouseLeave={() => setHoveredCity(null)}
                    onClick={() => navigate(`/cidade/${city.slug}`)}
                  >
                    <img
                      src={cityImages[city.id] ?? fallback}
                      alt={city.name}
                      className="w-full h-36 object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
                    />
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
                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button variant="outline" className="w-full mt-4">
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
