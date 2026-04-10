import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { attractions } from "@/data/tocantinsCities";
import { tocantinsCities } from "@/data/tocantinsCities";
import { useNavigate } from "react-router-dom";

// Fix default marker icon issue with Vite/Webpack
const markerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapSection = () => {
  const navigate = useNavigate();

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
            Explore o mapa interativo com todos os pontos turísticos do Tocantins.
            Clique em uma cidade para ver seus atrativos.
          </p>
        </div>

        <Card variant="elevated" className="overflow-hidden">
          <div className="relative h-[500px]">
            <MapContainer
              center={[-10.2491, -48.3243]}
              zoom={7}
              style={{ height: "100%", width: "100%" }}
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
                  icon={markerIcon}
                >
                  <Popup>
                    <div className="p-1">
                      <h3 className="font-bold text-base mb-1">{city.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{city.shortDescription}</p>
                      <p className="text-xs text-gray-500 mb-2">{city.attractions}+ atrativos</p>
                      <button
                        onClick={() => navigate(`/cidade/${city.slug}`)}
                        className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors w-full"
                      >
                        Ver atrativos
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MapSection;
