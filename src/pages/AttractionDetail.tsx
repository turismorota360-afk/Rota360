import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Star, Eye, Users, Phone, Share2, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { attractions, getCityBySlug, tocantinsCities } from "@/data/tocantinsCities";
import fervedouro from "@/assets/fervedouro.jpg";
import dunas from "@/assets/dunas.jpg";
import cachoeira from "@/assets/cachoeira.jpg";
import heroJalapao from "@/assets/hero-jalapao.jpg";

// Mapa de imagens por atrativo
const attractionImages: Record<string, string> = {
  "fervedouro-ceica": fervedouro,
  "dunas-jalapao":    dunas,
  "cachoeira-velha":  cachoeira,
};

const fallback = heroJalapao;

// Dicas mockadas por categoria
const dicasPorCategoria: Record<string, string[]> = {
  Natureza:     ["Leve protetor solar e repelente", "Evite horários de pico entre 11h e 14h", "Respeite a fauna e flora local"],
  Aventura:     ["Use calçado adequado para trilhas", "Leve água suficiente para a atividade", "Informe alguém sobre seu roteiro"],
  Cachoeira:    ["Tome cuidado com pedras escorregadias", "Não mergulhe em áreas sinalizadas", "Leve roupa de banho extra"],
  Cultural:     ["Respeite os horários de visitação", "Proibido fotografar sem autorização em alguns locais", "Contrate guias locais credenciados"],
  Gastronomia:  ["Reserve com antecedência nos fins de semana", "Experimente os pratos típicos do cerrado", "Pergunte sobre ingredientes regionais"],
  Histórico:    ["Vista-se adequadamente para locais religiosos", "Leia as placas informativas", "Não toque nas estruturas históricas"],
  Turístico:    ["Melhor horário: início da manhã ou fim de tarde", "Leve câmera para os registros", "Confira a previsão do tempo"],
  Praia:        ["Observe as bandeiras de segurança", "Não deixe lixo na praia", "Hidrate-se bastante"],
};

const AttractionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const attraction = attractions.find((a) => a.id === id);
  const city = attraction ? tocantinsCities.find((c) => c.id === attraction.cityId) : null;

  // Outros atrativos da mesma cidade
  const outrosAtrativos = attraction
    ? attractions.filter((a) => a.cityId === attraction.cityId && a.id !== attraction.id).slice(0, 3)
    : [];

  if (!attraction) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Atrativo não encontrado</h1>
          <Button onClick={() => navigate(-1)}>Voltar</Button>
        </div>
      </div>
    );
  }

  const dicas = dicasPorCategoria[attraction.category] ?? dicasPorCategoria["Turístico"];
  const imgSrc = attractionImages[attraction.id] ?? fallback;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <p className="text-xs text-muted-foreground">{city?.name}</p>
              <p className="font-semibold text-foreground leading-none text-sm">{attraction.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[320px] overflow-hidden">
          <img
            src={imgSrc}
            alt={attraction.name}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* Badges sobre a imagem */}
          <div className="absolute top-6 left-6 flex gap-2">
            <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full">
              {attraction.category}
            </span>
            {attraction.has360 && (
              <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                <Eye className="w-3 h-3" />
                360°
              </span>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Conteúdo principal */}
            <div className="lg:col-span-2 space-y-6">

              {/* Título e rating */}
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {attraction.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold text-foreground">{attraction.rating}</span>
                    <span>/ 5.0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{attraction.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{attraction.duration}</span>
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <Card variant="elevated">
                <CardContent className="p-6">
                  <h2 className="font-display font-semibold text-lg text-foreground mb-3">Sobre o atrativo</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {attraction.description}
                  </p>
                  {/* Descrição expandida mockada */}
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Este é um dos pontos turísticos mais visitados de {city?.name}, atraindo visitantes
                    de todo o Brasil e do exterior. A região oferece uma experiência única em contato
                    com a natureza e a cultura do cerrado tocantinense, sendo ideal para famílias,
                    casais e grupos de aventureiros.
                  </p>
                </CardContent>
              </Card>

              {/* Dicas */}
              <Card variant="elevated">
                <CardContent className="p-6">
                  <h2 className="font-display font-semibold text-lg text-foreground mb-4">
                    Dicas importantes
                  </h2>
                  <ul className="space-y-3">
                    {dicas.map((dica, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-xs font-bold">{i + 1}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{dica}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Outros atrativos da cidade */}
              {outrosAtrativos.length > 0 && (
                <div>
                  <h2 className="font-display font-semibold text-lg text-foreground mb-4">
                    Outros atrativos em {city?.name}
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {outrosAtrativos.map((outro) => (
                      <Card
                        key={outro.id}
                        variant="elevated"
                        className="cursor-pointer hover:border-primary/30 transition-all"
                        onClick={() => navigate(`/atrativo/${outro.id}`)}
                      >
                        <div className="h-28 overflow-hidden rounded-t-lg">
                          <img
                            src={attractionImages[outro.id] ?? fallback}
                            alt={outro.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
                          />
                        </div>
                        <CardContent className="p-3">
                          <p className="font-semibold text-sm text-foreground">{outro.name}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 fill-primary text-primary" />
                            <span className="text-xs text-muted-foreground">{outro.rating}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">

              {/* Card de ação */}
              <Card variant="elevated" className="sticky top-20">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Cidade</p>
                    <p className="font-semibold text-foreground">{city?.name}, TO</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Duração estimada</p>
                    <p className="font-semibold text-foreground">{attraction.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Categoria</p>
                    <p className="font-semibold text-foreground">{attraction.category}</p>
                  </div>

                  <hr className="border-border" />

                  <Button
                    className="w-full"
                    onClick={() => navigate(`/cidade/${city?.slug}`)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ver mais em {city?.name}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/cidade/${city?.slug}/servicos?categoria=guias`)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Contratar guia local
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/parceiros")}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Planejar roteiro
                  </Button>
                </CardContent>
              </Card>

              {/* Contato emergência */}
              <Card variant="elevated">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Serviços de apoio
                  </p>
                  <div className="space-y-2">
                    <a href="tel:192" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                      SAMU — 192
                    </a>
                    <a href="tel:193" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                      Bombeiros — 193
                    </a>
                    <a href="tel:190" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                      Polícia — 190
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="h-16" />
      </main>
    </div>
  );
};

export default AttractionDetail;
