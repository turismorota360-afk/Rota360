import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, Star, ChevronRight, ArrowLeft, Eye, Users, Phone, Hotel, UtensilsCrossed,} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCityBySlug, getAttractionsByCity, tocantinsCities } from "@/data/tocantinsCities";
import heroJalapao from "@/assets/hero-jalapao.jpg";
import fervedouro from "@/assets/fervedouro.jpg";
import dunas from "@/assets/dunas.jpg";
import cachoeira from "@/assets/cachoeira.jpg";
import { useState } from "react";

// Map of images for attractions
const attractionImages: Record<string, string> = {
  "fervedouro-ceica": fervedouro,
  "dunas-jalapao": dunas,
  "cachoeira-velha": cachoeira,
};

const CityDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const city = getCityBySlug(slug || "");
  const attractions = getAttractionsByCity(city?.id || "");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredAttractions = selectedCategory === "Todos"
    ? attractions
    : attractions.filter(a => a.category === selectedCategory);

  if (!city) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cidade não encontrada</h1>
          <Button onClick={() => navigate("/tocantins")}>Voltar ao mapa</Button>
        </div>
      </div>
    );
  }

  // Use Jalapão hero image for all cities for now
  const heroImage = heroJalapao;

  const categories = ["Todos", "Natureza", "Aventura", "Cachoeira", "Cultural", "Gastronomia"];

  const services = [
    { icon: UtensilsCrossed, title: "Restaurantes", count: "15+" },
    { icon: Hotel, title: "Hospedagem", count: "25+" },
    { icon: Users, title: "Guias", count: "30+" },
    { icon: Star, title: "Empresas de Turismo", count: "10+" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-border/30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/tocantins")}>
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
            <a href="#atrativos" className="text-muted-foreground hover:text-foreground transition-colors">Atrativos</a>
            <a href="#servicos" className="text-muted-foreground hover:text-foreground transition-colors">Serviços</a>
            <a href="#roteiro" className="text-muted-foreground hover:text-foreground transition-colors">Roteiro</a>
          </nav>
          <Button size="sm">Criar Roteiro</Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt={city.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 pb-12">
            <div className="animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
              <div className="flex items-center gap-2 mb-4">
                <Button variant="glass" size="sm" onClick={() => navigate("/tocantins")}>
                  <MapPin className="w-4 h-4 mr-1" />
                  Tocantins
                </Button>
              </div>
            </div>
            
            <h1 
              className="animate-fade-up font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4"
              style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
            >
              {city.name}
            </h1>
            
            <p 
              className="animate-fade-up text-lg text-background/80 max-w-2xl mb-8"
              style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
            >
              {city.description}
            </p>

            <div 
              className="animate-fade-up flex flex-wrap items-center gap-6"
              style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
            >
              <div className="flex items-center gap-2 text-background/80">
                <Star className="w-5 h-5 fill-primary text-primary" />
                <span className="font-semibold">{city.attractions}+ Atrativos</span>
              </div>
              <div className="flex items-center gap-2 text-background/80">
                <Users className="w-5 h-5" />
                <span>Pop. {city.population}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Attractions Section */}
        <section id="atrativos" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                O que fazer
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Principais Atrativos
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {attractions.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAttractions.map((attraction) => (
                  <Card key={attraction.id} variant="image" className="group cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={attractionImages[attraction.id] || fervedouro} 
                        alt={attraction.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                      
                      {attraction.has360 && (
                        <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          360°
                        </div>
                      )}
                      
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground">
                        {attraction.category}
                      </div>
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-display text-xl font-semibold text-background mb-2">
                          {attraction.name}
                        </h3>
                        <div className="flex items-center gap-4 text-background/80 text-sm">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {attraction.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {attraction.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-3">{attraction.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="font-semibold">{attraction.rating}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Ver detalhes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Atrativos desta cidade ainda estão sendo cadastrados.
                </p>
                <Button variant="outline">Sugerir um atrativo</Button>
              </div>
            )}
          </div>
        </section>

        {/* Services Section */}
        <section id="servicos" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Serviços Locais
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Tudo que você precisa
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((service, index) => (
                <Card key={index} variant="elevated" className="group cursor-pointer hover:border-primary/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                    <p className="text-sm text-primary">{service.count}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="roteiro" className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Pronto para explorar {city.name}?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Monte seu roteiro personalizado e planeje cada detalhe da sua aventura.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="heroOutline" size="xl">
                Criar Meu Roteiro
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Button variant="glass" size="xl">
                <Phone className="w-5 h-5 mr-2" />
                Falar com Especialista
              </Button>
            </div>
          </div>
        </section>

        {/* Other Cities */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Explore outras cidades
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {tocantinsCities
                .filter(c => c.id !== city.id)
                .slice(0, 5)
                .map((otherCity) => (
                  <Button
                    key={otherCity.id}
                    variant="outline"
                    onClick={() => navigate(`/cidade/${otherCity.slug}`)}
                  >
                    {otherCity.name}
                  </Button>
                ))}
              <Button variant="default" onClick={() => navigate("/tocantins")}>
                Ver todas
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">R</span>
              </div>
              <span className="font-display text-xl font-semibold">Rota360</span>
            </div>
            <p className="text-background/60 text-sm">
              © 2025 Rota360. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CityDetail;
