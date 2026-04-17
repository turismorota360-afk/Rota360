import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, MapPin, TrendingUp, Users, BarChart3, Smartphone,
  Globe, CheckCircle, Mail, Phone, Hotel, Utensils, Compass,
  Camera, Star, Zap, Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import rota360Logo from "@/assets/rota360-logo.png";

// ─── DADOS MUNICÍPIOS ────────────────────────────────────────────────────────

const beneficiosMunicipios = [
  {
    icon: Globe,
    titulo: "Presença Digital",
    descricao: "Seu município representado em uma plataforma moderna e acessível para turistas de todo o Brasil.",
  },
  {
    icon: TrendingUp,
    titulo: "Mais Turistas",
    descricao: "Aumente o fluxo turístico com atrativos bem apresentados, rotas organizadas e informações completas.",
  },
  {
    icon: BarChart3,
    titulo: "Dados e Analytics",
    descricao: "Painel com dados de acesso, origem dos visitantes e atrativos mais procurados — informação para tomada de decisão.",
  },
  {
    icon: Smartphone,
    titulo: "Acesso Mobile",
    descricao: "Plataforma responsiva que funciona em qualquer dispositivo, facilitando o acesso do turista em campo.",
  },
  {
    icon: Users,
    titulo: "Conecta o Ecossistema",
    descricao: "Une guias locais, restaurantes típicos e hospedagens em um único ambiente digital.",
  },
  {
    icon: CheckCircle,
    titulo: "Fácil de Atualizar",
    descricao: "Nossa equipe cuida da manutenção e atualização do conteúdo. Você só nos envia as informações.",
  },
];

const etapasMunicipios = [
  {
    numero: "01",
    titulo: "Primeiro contato",
    descricao: "Agende uma conversa com nossa equipe para entender as necessidades do seu município.",
  },
  {
    numero: "02",
    titulo: "Levantamento",
    descricao: "Mapeamos os atrativos, rotas, serviços e história local para montar o conteúdo.",
  },
  {
    numero: "03",
    titulo: "Implantação",
    descricao: "Seu município entra na plataforma com página completa, mapa interativo e atrativos cadastrados.",
  },
  {
    numero: "04",
    titulo: "Acompanhamento",
    descricao: "Relatórios periódicos e suporte contínuo para manter o conteúdo atualizado.",
  },
];

// ─── DADOS EMPRESAS ──────────────────────────────────────────────────────────

const tiposEmpresa = [
  { icon: Hotel,    label: "Hotéis & Pousadas" },
  { icon: Utensils, label: "Restaurantes Típicos" },
  { icon: Compass,  label: "Guias de Turismo" },
  { icon: Camera,   label: "Agências & Passeios" },
];

const beneficiosEmpresas = [
  {
    icon: Star,
    titulo: "Vitrine qualificada",
    descricao: "Apareça para turistas que já estão planejando visitar o Tocantins — audiência 100% interessada.",
  },
  {
    icon: MapPin,
    titulo: "Localização no mapa",
    descricao: "Seu negócio marcado no mapa interativo da cidade, visível a qualquer turista que explorar a região.",
  },
  {
    icon: TrendingUp,
    titulo: "Mais reservas e clientes",
    descricao: "Aumente sua visibilidade e converta turistas em clientes com uma apresentação profissional.",
  },
  {
    icon: Zap,
    titulo: "Cadastro rápido",
    descricao: "Em poucos dias sua empresa já aparece na plataforma com fotos, descrição, contato e localização.",
  },
  {
    icon: BarChart3,
    titulo: "Relatório de desempenho",
    descricao: "Acompanhe quantos turistas visualizaram seu negócio e de onde eles vêm.",
  },
  {
    icon: Users,
    titulo: "Rede de parceiros",
    descricao: "Faça parte de um ecossistema turístico conectado com outros negócios e municípios do estado.",
  },
];

const etapasEmpresas = [
  {
    numero: "01",
    titulo: "Envie seu interesse",
    descricao: "Preencha o formulário ou nos chame no WhatsApp contando sobre o seu negócio.",
  },
  {
    numero: "02",
    titulo: "Envio do conteúdo",
    descricao: "Você nos envia fotos, descrição, contato e localização. Nossa equipe cuida do resto.",
  },
  {
    numero: "03",
    titulo: "Publicação",
    descricao: "Seu negócio entra na plataforma vinculado à página da cidade onde atua.",
  },
  {
    numero: "04",
    titulo: "Resultados",
    descricao: "Acompanhe os acessos e atualize suas informações sempre que precisar.",
  },
];

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

type Aba = "municipios" | "empresas";

const Parceiros = () => {
  const navigate = useNavigate();
  const [aba, setAba] = useState<Aba>("municipios");

  const scrollContato = () =>
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });

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
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={scrollContato}>
            Falar com a equipe
          </Button>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-28 bg-[hsl(220,30%,6%)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-2 mb-8">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-accent text-sm font-medium">
                  Para Municípios, Secretarias e Empresas de Turismo
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Faça parte do{" "}
                <span className="text-accent">turismo digital do Tocantins</span>
              </h1>
              <p className="text-lg text-white/70 mb-10 max-w-2xl leading-relaxed">
                A Rota360 conecta viajantes aos destinos mais incríveis do Tocantins. Seja você um município, 
                hotel, restaurante ou guia — temos uma parceria feita para o seu perfil.
              </p>

              {/* Seletor de aba no hero */}
              <div className="inline-flex bg-white/10 rounded-full p-1 gap-1">
                <button
                  onClick={() => setAba("municipios")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    aba === "municipios"
                      ? "bg-accent text-accent-foreground shadow"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Municípios
                </button>
                <button
                  onClick={() => setAba("empresas")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    aba === "empresas"
                      ? "bg-accent text-accent-foreground shadow"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <Hotel className="w-4 h-4" />
                  Empresas
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ABA MUNICÍPIOS ─────────────────────────────────────────────── */}
        {aba === "municipios" && (
          <>
            {/* Benefícios */}
            <section className="py-24 bg-background">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                  <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                    Por que a Rota360?
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    O que seu município ganha
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Uma parceria que transforma a presença digital do seu município e impulsiona a economia local através do turismo.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {beneficiosMunicipios.map((item, index) => (
                    <Card key={index} variant="elevated" className="group hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                          <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground mb-2">{item.titulo}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.descricao}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Como funciona */}
            <section className="py-24 bg-secondary/30">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                  <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                    Processo
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Como funciona a parceria
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {etapasMunicipios.map((etapa, index) => (
                    <div key={index} className="relative text-center">
                      {index < etapasMunicipios.length - 1 && (
                        <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-primary/20" />
                      )}
                      <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4 shadow-lg">
                        {etapa.numero}
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">{etapa.titulo}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{etapa.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ─── ABA EMPRESAS ────────────────────────────────────────────────── */}
        {aba === "empresas" && (
          <>
            {/* Tipos de empresa */}
            <section className="py-16 bg-background border-b border-border">
              <div className="container mx-auto px-6">
                <p className="text-center text-muted-foreground mb-8 text-sm uppercase tracking-wider font-medium">
                  Ideal para
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {tiposEmpresa.map((tipo, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-secondary border border-border rounded-full px-5 py-2.5 text-sm font-medium text-foreground"
                    >
                      <tipo.icon className="w-4 h-4 text-primary" />
                      {tipo.label}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Benefícios */}
            <section className="py-24 bg-background">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                  <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                    Por que anunciar na Rota360?
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    O que sua empresa ganha
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Coloque seu negócio na frente de turistas que já estão planejando visitar o Tocantins.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {beneficiosEmpresas.map((item, index) => (
                    <Card key={index} variant="elevated" className="group hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                          <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground mb-2">{item.titulo}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.descricao}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Como funciona */}
            <section className="py-24 bg-secondary/30">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                  <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                    Processo
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Como entrar na plataforma
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {etapasEmpresas.map((etapa, index) => (
                    <div key={index} className="relative text-center">
                      {index < etapasEmpresas.length - 1 && (
                        <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-primary/20" />
                      )}
                      <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4 shadow-lg">
                        {etapa.numero}
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">{etapa.titulo}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{etapa.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Contato — compartilhado entre as abas */}
        <section id="contato" className="py-24 bg-[hsl(220,30%,6%)]">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-3">
                Vamos conversar
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                {aba === "municipios"
                  ? "Pronto para dar o próximo passo?"
                  : "Quer colocar seu negócio no mapa?"}
              </h2>
              <p className="text-white/70 mb-12">
                {aba === "municipios"
                  ? "Entre em contato com nossa equipe e agende uma apresentação personalizada para o seu município."
                  : "Fale com a gente e em poucos dias seu negócio já aparece para turistas de todo o Brasil."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="mailto:turismo.rota360@gmail.com">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
                    <Mail className="w-5 h-5 mr-2" />
                    turismo.rota360@gmail.com
                  </Button>
                </a>
                <a
                  href={`https://wa.me/5563999999999?text=${encodeURIComponent(
                    aba === "municipios"
                      ? "Olá! Tenho interesse em cadastrar meu município na plataforma Rota360."
                      : "Olá! Tenho interesse em cadastrar minha empresa na plataforma Rota360."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                </a>
              </div>
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

export default Parceiros;
