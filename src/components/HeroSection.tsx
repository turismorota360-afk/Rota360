import { MapPin, Calendar, Clock, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-jalapao.jpg";

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-border/30">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">R</span>
        </div>
        <span className="font-display text-xl font-semibold text-foreground">Rota360</span>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        <a href="#destinos" className="text-muted-foreground hover:text-foreground transition-colors">Destinos</a>
        <a href="#roteiros" className="text-muted-foreground hover:text-foreground transition-colors">Roteiros</a>
        <a href="#mapa" className="text-muted-foreground hover:text-foreground transition-colors">Mapa</a>
        <a href="#servicos" className="text-muted-foreground hover:text-foreground transition-colors">Serviços</a>
      </nav>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">Entrar</Button>
        <Button size="sm">Criar Roteiro</Button>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img 
        src={heroImage} 
        alt="Jalapão - Tocantins" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />
    </div>
    
    <div className="relative z-10 container mx-auto px-4 text-center">
      <div className="animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
        <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-background/90 text-sm font-medium">Tocantins, Brasil</span>
        </div>
      </div>
      
      <h1 className="animate-fade-up text-4xl md:text-6xl lg:text-7xl font-display font-bold text-background mb-6" style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
        Descubra o <span className="text-primary">Jalapão</span>
        <br />como nunca viu
      </h1>
      
      <p className="animate-fade-up text-lg md:text-xl text-background/80 max-w-2xl mx-auto mb-10" style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}>
        Explore dunas douradas, fervedouros cristalinos e cachoeiras 
        deslumbrantes. Planeje sua aventura de forma imersiva com rotas 
        personalizadas e visualização 360°.
      </p>
      
      <div className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}>
        <Button variant="hero" size="xl">
          Explorar Destinos
          <ChevronRight className="w-5 h-5" />
        </Button>
        <Button variant="heroOutline" size="xl">
          Criar Meu Roteiro
        </Button>
      </div>
      
      <div className="animate-fade-up mt-16 flex flex-wrap items-center justify-center gap-8" style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}>
        {[
          { icon: MapPin, label: "50+ Atrativos", value: "Mapeados" },
          { icon: Star, label: "4.9", value: "Avaliação" },
          { icon: Calendar, label: "100+", value: "Roteiros" },
        ].map((stat, index) => (
          <div key={index} className="flex items-center gap-3 text-background/80">
            <div className="w-12 h-12 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center">
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-semibold">{stat.label}</div>
              <div className="text-sm text-background/60">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 rounded-full border-2 border-background/30 flex items-start justify-center p-2">
        <div className="w-1 h-2 bg-background/60 rounded-full" />
      </div>
    </div>
  </section>
);

export { Header, HeroSection };
