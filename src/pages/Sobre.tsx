import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target, Heart, Lightbulb, Globe, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import rota360Logo from "@/assets/rota360-logo.png";

const equipe = [
  {
    nome: "Miguel",
    cargo: "Co-fundador & CEO",
    descricao: "Responsável pela visão estratégica e desenvolvimento da plataforma.",
    inicial: "M",
  },
  {
    nome: "Luma Moisés",
    cargo: "Co-fundadora & Design",
    descricao: "Responsável pela experiência do usuário e identidade visual da Rota360.",
    inicial: "L",
  },
  {
    nome: "Douglas",
    cargo: "Co-fundador & Tecnologia",
    descricao: "Responsável pela arquitetura técnica e infraestrutura da plataforma.",
    inicial: "D",
  },
];

const valores = [
  {
    icon: Target,
    titulo: "Missão",
    descricao: "Democratizar o acesso ao turismo no Tocantins, conectando viajantes aos destinos mais incríveis do estado de forma digital e imersiva.",
  },
  {
    icon: Heart,
    titulo: "Propósito",
    descricao: "Valorizar a cultura, a natureza e as pessoas do Tocantins, gerando desenvolvimento econômico sustentável através do turismo.",
  },
  {
    icon: Lightbulb,
    titulo: "Visão",
    descricao: "Ser a principal plataforma de turismo digital do Brasil Central, expandindo para todos os estados do Centro-Oeste e Norte.",
  },
];

const Sobre = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,30%,6%)]/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img src={rota360Logo} alt="Rota360" className="h-10 w-auto" />
          </div>
          <Button
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => navigate("/tocantins")}
          >
            Explorar
          </Button>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-28 bg-[hsl(220,30%,6%)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-2 mb-8">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">Nossa História</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Nascemos no <span className="text-accent">Tocantins</span>
              <br />para o Brasil
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              A Rota360 nasceu da vontade de mostrar ao mundo as riquezas naturais e culturais 
              do Tocantins — um estado cheio de belezas que o turismo digital ainda não havia descoberto.
            </p>
          </div>
        </section>

        {/* História */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Como tudo começou
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Uma ideia que virou plataforma
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  A Rota360 surgiu da percepção de que o Tocantins — com seus fervedouros cristalinos, 
                  dunas douradas e cachoeiras imponentes — merecia uma vitrine digital à altura de suas belezas.
                </p>
                <p>
                  Com 139 municípios e mais de 500 atrativos turísticos mapeados, o estado tem potencial 
                  imenso que ainda é pouco explorado. Nossa missão é mudar isso, conectando viajantes 
                  a destinos únicos e ajudando municípios a crescerem através do turismo.
                </p>
                <p>
                  Desenvolvemos uma plataforma imersiva com mapas interativos, visualização 360°, 
                  planejamento de rotas e informações completas sobre cada destino — tudo pensado 
                  para facilitar a vida de quem quer explorar o Tocantins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                O que nos move
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Missão, propósito e visão
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {valores.map((item, index) => (
                <Card key={index} variant="elevated" className="group hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                      <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-3 text-lg">{item.titulo}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Quem somos
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Os fundadores
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Um time apaixonado pelo Tocantins e pela tecnologia, unido pelo propósito de transformar o turismo do estado.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {equipe.map((pessoa, index) => (
                <Card key={index} variant="elevated" className="group hover:border-primary/30 transition-all duration-300 text-center">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 mx-auto rounded-full bg-primary flex items-center justify-center mb-4 text-primary-foreground font-bold text-2xl shadow-lg">
                      {pessoa.inicial}
                    </div>
                    <h3 className="font-display font-semibold text-foreground text-lg mb-1">{pessoa.nome}</h3>
                    <p className="text-primary text-sm font-medium mb-3">{pessoa.cargo}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pessoa.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[hsl(220,30%,6%)]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Quer fazer parte da Rota360?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Se você representa um município ou quer ser parceiro, entre em contato com a nossa equipe.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => navigate("/parceiros")}
              >
                <Users className="w-5 h-5 mr-2" />
                Ser parceiro
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                onClick={() => navigate("/contato")}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Falar conosco
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[hsl(220,30%,4%)] py-8 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={rota360Logo} alt="Rota360" className="h-8 w-auto" />
          <p className="text-white/40 text-sm">© 2025 Rota360. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Sobre;
