import { useState } from "react";
import { Plus, Minus, MapPin, Clock, Calendar, ChevronRight, GripVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ItineraryDay {
  day: number;
  date: string;
  activities: {
    id: string;
    name: string;
    time: string;
    duration: string;
    type: "attraction" | "restaurant" | "hotel" | "transport";
  }[];
}

const sampleItinerary: ItineraryDay[] = [
  {
    day: 1,
    date: "15 Jan",
    activities: [
      { id: "1", name: "Chegada em Palmas", time: "09:00", duration: "1h", type: "transport" },
      { id: "2", name: "Traslado para Ponte Alta", time: "10:00", duration: "4h", type: "transport" },
      { id: "3", name: "Pousada Chalé do Jalapão", time: "14:00", duration: "2h", type: "hotel" },
      { id: "4", name: "Pôr do sol nas Dunas", time: "17:00", duration: "2h", type: "attraction" },
    ],
  },
  {
    day: 2,
    date: "16 Jan",
    activities: [
      { id: "5", name: "Fervedouro do Ceiça", time: "08:00", duration: "3h", type: "attraction" },
      { id: "6", name: "Almoço na Comunidade Mumbuca", time: "12:00", duration: "1h30", type: "restaurant" },
      { id: "7", name: "Cachoeira da Velha", time: "14:00", duration: "4h", type: "attraction" },
    ],
  },
  {
    day: 3,
    date: "17 Jan",
    activities: [
      { id: "8", name: "Fervedouro do Buritizinho", time: "07:00", duration: "2h", type: "attraction" },
      { id: "9", name: "Cânion do Sussuapara", time: "10:00", duration: "3h", type: "attraction" },
      { id: "10", name: "Retorno para Palmas", time: "14:00", duration: "5h", type: "transport" },
    ],
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "attraction": return "bg-primary/10 text-primary border-primary/30";
    case "restaurant": return "bg-sunset/10 text-sunset border-sunset/30";
    case "hotel": return "bg-water/10 text-water border-water/30";
    case "transport": return "bg-muted text-muted-foreground border-border";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "attraction": return "Atrativo";
    case "restaurant": return "Restaurante";
    case "hotel": return "Hospedagem";
    case "transport": return "Transporte";
    default: return type;
  }
};

const RoutePlannerSection = () => {
  const [days, setDays] = useState(3);
  const [itinerary, setItinerary] = useState(sampleItinerary);

  return (
    <section id="roteiros" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Planeje Sua Viagem
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Monte seu roteiro personalizado
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Organize sua aventura dia a dia. Arraste e solte atividades, calcule 
            distâncias e tenha uma visão completa da sua viagem.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Trip Configuration */}
          <Card variant="glass" className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Duração</label>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setDays(Math.max(1, days - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold text-lg w-16 text-center">{days} dias</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setDays(days + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Data de início</label>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Calendar className="w-4 h-4" />
                      15 Janeiro, 2025
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Distância total estimada</div>
                  <div className="text-2xl font-bold text-foreground">480 km</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Days Timeline */}
          <div className="space-y-6">
            {itinerary.map((day) => (
              <Card key={day.day} variant="elevated" className="overflow-hidden">
                <CardHeader className="bg-secondary/50 py-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {day.day}
                      </span>
                      <div>
                        <div className="text-lg">Dia {day.day}</div>
                        <div className="text-sm text-muted-foreground font-normal">{day.date}</div>
                      </div>
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Plus className="w-4 h-4" />
                      Adicionar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {day.activities.map((activity, index) => (
                      <div 
                        key={activity.id}
                        className="flex items-center gap-4 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors cursor-move group"
                      >
                        <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-2 w-24">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{activity.time}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{activity.name}</div>
                          <div className="text-sm text-muted-foreground">{activity.duration}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(activity.type)}`}>
                          {getTypeLabel(activity.type)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full gap-2" onClick={() => setDays(days + 1)}>
              <Plus className="w-4 h-4" />
              Adicionar Dia
            </Button>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              Salvar Roteiro
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Compartilhar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoutePlannerSection;
