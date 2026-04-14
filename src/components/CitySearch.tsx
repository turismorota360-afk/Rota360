import { useState, useRef, useEffect } from "react";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { tocantinsCities } from "@/data/tocantinsCities";

const CitySearch = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filteredCities = tocantinsCities.filter(
    (city) =>
      city.name.toLowerCase().startsWith(query.toLowerCase())
  );

  const handleSelect = (slug: string) => {
    navigate(`/cidade/${slug}`);
    setIsOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredCities.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filteredCities[selectedIndex]) {
      handleSelect(filteredCities[selectedIndex].slug);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <div ref={containerRef} className="relative w-full max-w-md" style={{ zIndex: 100 }}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar cidade ou região..."
          className="w-full h-14 pl-12 pr-4 bg-primary-foreground/95 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all shadow-lg"
        />
      </div>

      {isOpen && query.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-2xl overflow-hidden"
          style={{ zIndex: 200 }}
        >
          {filteredCities.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto">
              {filteredCities.map((city, index) => (
                <li key={city.slug}>
                  <button
                    onMouseDown={() => handleSelect(city.slug)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      index === selectedIndex
                        ? "bg-accent/10 text-foreground"
                        : "text-foreground/80 hover:bg-muted/50"
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{city.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {city.shortDescription} • {city.attractions} atrativos
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-muted-foreground">
              <p>Nenhuma cidade encontrada</p>
              <p className="text-xs mt-1">Tente buscar por "Palmas" ou "Jalapão"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CitySearch;
