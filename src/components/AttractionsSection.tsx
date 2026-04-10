import { MapPin, Clock, Star, Eye } from "lucide-react";
import { Card, CardContent, CardImage } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import fervedouroImg from "@/assets/fervedouro.jpg";
import dunasImg from "@/assets/dunas.jpg";
import cachoeiraImg from "@/assets/cachoeira.jpg";
import { useState } from "react";
import { attractions } from "@/data/tocantinsCities";

const categories = [
  "todos",
  ...Array.from(new Set(attractions.map((a) => a.category)))
];

const normalize = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const AttractionsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const handleCategoryClick = (category: string) => {
    console.log("SETANDO:", category);
    setSelectedCategory(category);
    console.log("SETADO");
  };

  const filteredAttractions =
    selectedCategory === "todos"
      ? attractions
      : attractions.filter(
          (attraction) =>
            attraction.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  console.log("Selecionado:", selectedCategory);
  console.log("FILTRO:", filteredAttractions);

  return (
    <>
      <div style={{position:'fixed', top:0, left:0, zIndex:9999, background:'red', color:'white', padding:'10px', fontSize:'20px'}}>
        CATEGORIA: {selectedCategory}
      </div>
      <section id="destinos" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Destinos Incríveis
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore os principais atrativos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubra fervedouros de águas cristalinas, dunas douradas e cachoeiras 
              impressionantes. Cada destino oferece uma experiência única e inesquecível.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                size="sm"
                className="rounded-full"
                onClick={() => handleCategoryClick(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction) => (
              <Card key={attraction.id} variant="image" className="group cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={attraction.image} 
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-semibold">{attraction.rating}</span>
                      <span className="text-muted-foreground text-sm">(128 avaliações)</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Ver detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Ver todos os destinos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AttractionsSection;
