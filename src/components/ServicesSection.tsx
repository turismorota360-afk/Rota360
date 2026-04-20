import { UtensilsCrossed, Hotel, Users, Calendar, Phone, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  count: string;
  to: string;
}

const services: Service[] = [
  {
    id: "restaurants",
    icon: UtensilsCrossed,
    title: "Restaurantes",
    description: "Gastronomia local e regional com pratos típicos do cerrado",
    count: "25+ locais",
    to: "/parceiros?tipo=empresas",
  },
  {
    id: "hotels",
    icon: Hotel,
    title: "Hospedagem",
    description: "Pousadas, hotéis e camping em meio à natureza",
    count: "40+ opções",
    to: "/parceiros?tipo=empresas",
  },
  {
    id: "guides",
    icon: Users,
    title: "Guias Turísticos",
    description: "Condutores locais certificados para sua aventura",
    count: "50+ guias",
    to: "/parceiros?tipo=empresas",
  },
  {
    id: "tourism-companies",
    icon: Star,
    title: "Empresas de Turismo",
    description: "Agências e operadoras especializadas em turismo local",
    count: "10+ empresas",
    to: "/parceiros?tipo=empresas",
  },
  {
    id: "events",
    icon: Calendar,
    title: "Eventos",
    description: "Festivais, shows e celebrações culturais",
    count: "10+ eventos/mês",
    to: "/parceiros#contato",
  },
  {
    id: "emergency",
    icon: Phone,
    title: "Serviços de Apoio",
    description: "Emergência, saúde e informações turísticas",
    count: "24h disponível",
    to: "/parceiros#contato",
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="servicos" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Serviços Integrados
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encontre restaurantes, hotéis, guias turísticos e muito mais.
            Todos os serviços verificados e integrados ao seu roteiro.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              variant="elevated"
              className="group cursor-pointer hover:border-primary/30"
              onClick={() => navigate(service.to)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">{service.count}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(service.to);
                        }}
                      >
                        Ver todos
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured partners */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Parceiros Verificados
            </h3>
            <p className="text-sm text-muted-foreground">
              Empresas e prestadores de serviço avaliados pela comunidade
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-32 h-16 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 hover:shadow-card transition-all cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-semibold">Parceiro</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;