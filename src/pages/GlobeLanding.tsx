import { Suspense, lazy, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Compass, ChevronDown } from "lucide-react";
import CitySearch from "@/components/CitySearch";
import { useNavigate } from "react-router-dom";
import rota360Logo from "@/assets/rota360-logo.png";

const RealisticGlobe = lazy(() => import("@/components/RealisticGlobe"));

const ESTADOS = [
  { nome: "Tocantins", slug: "/tocantins" },
  { nome: "Acre", slug: null },
  { nome: "Alagoas", slug: null },
  { nome: "Amapá", slug: null },
  { nome: "Amazonas", slug: null },
  { nome: "Bahia", slug: null },
  { nome: "Ceará", slug: null },
  { nome: "Distrito Federal", slug: null },
  { nome: "Espírito Santo", slug: null },
  { nome: "Goiás", slug: null },
  { nome: "Maranhão", slug: null },
  { nome: "Mato Grosso", slug: null },
  { nome: "Mato Grosso do Sul", slug: null },
  { nome: "Minas Gerais", slug: null },
  { nome: "Pará", slug: null },
  { nome: "Paraíba", slug: null },
  { nome: "Paraná", slug: null },
  { nome: "Pernambuco", slug: null },
  { nome: "Piauí", slug: null },
  { nome: "Rio de Janeiro", slug: null },
  { nome: "Rio Grande do Norte", slug: null },
  { nome: "Rio Grande do Sul", slug: null },
  { nome: "Rondônia", slug: null },
  { nome: "Roraima", slug: null },
  { nome: "Santa Catarina", slug: null },
  { nome: "São Paulo", slug: null },
  { nome: "Sergipe", slug: null },
];

const GlobeLanding = () => {
  const navigate = useNavigate();
  const [estadoOpen, setEstadoOpen] = useState(false);
  const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(null);
  const seletorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (seletorRef.current && !seletorRef.current.contains(e.target as Node)) {
        setEstadoOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEstado = (estado: { nome: string; slug: string | null }) => {
    setEstadoSelecionado(estado.nome);
    setEstadoOpen(false);
    if (estado.slug) navigate(estado.slug);
  };

  return (
    // ✅ CORREÇÃO PRINCIPAL: overflow-hidden removido do root, colocado só no globo
    <div className="min-h-screen bg-[hsl(220,30%,6%)]">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[60]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <img
            src={rota360Logo}
            alt="Rota360"
            className="h-12 md:h-14 w-auto drop-shadow-lg"
          />
          <nav className="hidden md:flex items-center gap-8">
            <a href="/sobre" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-lg font-medium">Sobre</a>
            <a href="/parceiros" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-lg font-medium">Parceiros</a>
            <a href="/contato" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-lg font-medium">Contato</a>
            <Button
              size="sm"
              onClick={() => navigate("/tocantins")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-5"
            >
              Explorar
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col lg:flex-row">

        {/* Left Panel — overflow visible para dropdown escapar */}
        <div
          className="relative w-full lg:w-1/2 xl:w-2/5 min-h-screen flex flex-col justify-center px-6 lg:px-12 xl:px-16 pt-32 pb-32"
          style={{ zIndex: 50, overflow: "visible" }}
        >
          <div className="max-w-lg" style={{ overflow: "visible" }}>

            {/* Badge */}
            <div
              className="animate-fade-up inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-8"
              style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
            >
              <Compass className="w-4 h-4 text-accent" />
              <span className="text-primary-foreground text-sm font-medium">Turismo Digital Imersivo</span>
            </div>

            {/* Title */}
            <h1
              className="animate-fade-up font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
              style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
            >
              Descubra o <span className="text-accent">Brasil</span>
              <br />em 360°
            </h1>

            {/* Description */}
            <p
              className="animate-fade-up text-lg text-primary-foreground/80 mb-10 leading-relaxed"
              style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
            >
              Explore destinos únicos, planeje rotas personalizadas e
              viva experiências imersivas nos mais belos lugares do Brasil.
            </p>

            {/* Search */}
            <div
              className="animate-fade-up mb-6"
              style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards", position: "relative", zIndex: 110 }}
            >
              <CitySearch />
            </div>

            {/* Seletor de Estado */}
            <div
              className="animate-fade-up mb-12"
              style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards", position: "relative", zIndex: 100 }}
            >
              <p className="text-primary-foreground/50 text-xs uppercase tracking-widest mb-3 font-medium">
                Explorar por estado
              </p>

              <div ref={seletorRef} className="relative w-full max-w-xs">
                {/* Botão */}
                <button
                  onClick={() => setEstadoOpen(!estadoOpen)}
                  className="flex items-center justify-between w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-5 py-3 rounded-xl shadow-lg transition-all"
                >
                  <span>{estadoSelecionado ?? "Selecione um estado"}</span>
                  <ChevronDown className={`w-4 h-4 ml-3 transition-transform duration-200 ${estadoOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown — portal via style para escapar de qualquer overflow */}
                {estadoOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-full rounded-xl shadow-2xl border border-white/10"
                    style={{
                      zIndex: 99999,
                      background: "hsl(220,30%,10%)",
                      // Garante que não é cortado por nenhum pai
                      clipPath: "none",
                      overflow: "visible",
                    }}
                  >
                    <div className="px-4 py-2 border-b border-white/10 rounded-t-xl">
                      <p className="text-xs text-primary-foreground/40 uppercase tracking-widest">27 estados</p>
                    </div>
                    <ul
                      className="divide-y divide-white/5"
                      style={{ maxHeight: "240px", overflowY: "auto" }}
                    >
                      {ESTADOS.map((estado) => (
                        <li key={estado.nome}>
                          <button
                            onClick={() => handleEstado(estado)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                              estadoSelecionado === estado.nome
                                ? "bg-accent/20 text-accent"
                                : "text-primary-foreground/80 hover:bg-white/5 hover:text-primary-foreground"
                            }`}
                          >
                            <span>{estado.nome}</span>
                            {estado.slug ? (
                              <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium">
                                Disponível
                              </span>
                            ) : (
                              <span className="text-xs text-primary-foreground/30">Em breve</span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Hint */}
            <div
              className="animate-fade-up flex items-center gap-3 text-primary-foreground/50 text-sm"
              style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
              <span>Clique no ponto laranja no globo para explorar o Tocantins</span>
            </div>

          </div>
        </div>

        {/* Right Panel - Globe — overflow hidden só aqui para o globo não vazar */}
        <div className="relative z-20 w-full lg:w-1/2 xl:w-3/5 h-[60vh] lg:h-screen overflow-hidden">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white/40 animate-pulse">Carregando globo...</div>
            </div>
          }>
            <RealisticGlobe />
          </Suspense>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="bg-[hsl(220,30%,6%)] border-t border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center gap-8">
              {[
                { value: "139", label: "Municípios" },
                { value: "500+", label: "Atrativos" },
                { value: "360°", label: "Visualização" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl font-bold text-accent">{stat.value}</div>
                  <div className="text-xs text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/tocantins")}
              className="ml-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Guia Tocantins
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GlobeLanding;