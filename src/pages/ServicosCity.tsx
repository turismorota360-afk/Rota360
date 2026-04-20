import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Phone, Mail, Instagram, Search, UtensilsCrossed, Hotel, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCityBySlug } from "@/data/tocantinsCities";
import { useState } from "react";

// ─── TIPOS ────────────────────────────────────────────────────────────────────

interface Empresa {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  endereco: string;
  telefone: string;
  email?: string;
  instagram?: string;
  rating: number;
  avaliacoes: number;
  preco: string; // "$" | "$$" | "$$$"
  destaque: boolean;
}

// ─── DADOS MOCKADOS ───────────────────────────────────────────────────────────

const empresasMock: Empresa[] = [
  // Restaurantes
  {
    id: "r1", nome: "Sabor do Cerrado", categoria: "restaurantes",
    descricao: "Culinária regional com pratos típicos do cerrado tocantinense. Especialidade em pequi, baru e peixe do rio.",
    endereco: "Rua das Flores, 123 - Centro", telefone: "(63) 99999-0001",
    instagram: "@sabordocerrado", rating: 4.8, avaliacoes: 124, preco: "$$", destaque: true,
  },
  {
    id: "r2", nome: "Pescaria do Tocantins", categoria: "restaurantes",
    descricao: "O melhor peixe fresco da região. Tucunaré, piau e pintado preparados na brasa ou ao molho.",
    endereco: "Av. Beira Rio, 45", telefone: "(63) 99999-0002",
    rating: 4.6, avaliacoes: 89, preco: "$$", destaque: false,
  },
  {
    id: "r3", nome: "Cantina do João", categoria: "restaurantes",
    descricao: "Comida caseira e bufê por quilo. Ambiente familiar com receitas tradicionais da avó.",
    endereco: "Rua Goiás, 78 - Centro", telefone: "(63) 99999-0003",
    rating: 4.4, avaliacoes: 56, preco: "$", destaque: false,
  },
  {
    id: "r4", nome: "Bistrô Savana", categoria: "restaurantes",
    descricao: "Gastronomia contemporânea inspirada no cerrado. Carta de vinhos e drinques autorais.",
    endereco: "Av. Palmas, 200 - Setor Sul", telefone: "(63) 99999-0004",
    email: "contato@bistrosavana.com.br", instagram: "@bistrosavana",
    rating: 4.9, avaliacoes: 201, preco: "$$$", destaque: true,
  },

  // Hospedagem
  {
    id: "h1", nome: "Pousada Serra Verde", categoria: "hospedagem",
    descricao: "Chalés em meio à natureza com café da manhã incluso. Vista panorâmica para o cerrado e piscina natural.",
    endereco: "Estrada da Serra, km 12", telefone: "(63) 99999-0010",
    instagram: "@pousadaserraverde", rating: 4.9, avaliacoes: 178, preco: "$$", destaque: true,
  },
  {
    id: "h2", nome: "Hotel Central Plaza", categoria: "hospedagem",
    descricao: "Hotel de negócios no coração da cidade. Wi-Fi, academia e restaurante no local.",
    endereco: "Praça Central, 1 - Centro", telefone: "(63) 99999-0011",
    email: "reservas@centralplaza.com.br",
    rating: 4.5, avaliacoes: 312, preco: "$$", destaque: false,
  },
  {
    id: "h3", nome: "Camping Natureza Viva", categoria: "hospedagem",
    descricao: "Área de camping com infraestrutura completa. Banheiros, churrasqueiras e loja de suprimentos.",
    endereco: "Rod. TO-080, km 5", telefone: "(63) 99999-0012",
    rating: 4.3, avaliacoes: 45, preco: "$", destaque: false,
  },
  {
    id: "h4", nome: "Eco Lodge Cerrado", categoria: "hospedagem",
    descricao: "Hospedagem sustentável com energia solar e captação de água da chuva. Experiência imersiva na natureza.",
    endereco: "Zona Rural - Acesso pela TO-164", telefone: "(63) 99999-0013",
    instagram: "@ecolodgecerrado", email: "eco@lodge.com.br",
    rating: 4.8, avaliacoes: 93, preco: "$$$", destaque: true,
  },

  // Guias
  {
    id: "g1", nome: "João Expedições", categoria: "guias",
    descricao: "Guia certificado com 15 anos de experiência no cerrado. Trilhas, cachoeiras e observação de fauna.",
    endereco: "Atendimento pelo WhatsApp", telefone: "(63) 99999-0020",
    instagram: "@joaoexpedicoes", rating: 5.0, avaliacoes: 87, preco: "$$", destaque: true,
  },
  {
    id: "g2", nome: "Maria Guia Turística", categoria: "guias",
    descricao: "Especialista em turismo cultural e histórico. Tours pelos patrimônios e comunidades tradicionais.",
    endereco: "Atendimento pelo WhatsApp", telefone: "(63) 99999-0021",
    rating: 4.7, avaliacoes: 54, preco: "$", destaque: false,
  },
  {
    id: "g3", nome: "Aventura Tocantins", categoria: "guias",
    descricao: "Equipe de guias para esportes de aventura: rapel, canoagem e mountain bike.",
    endereco: "Rua das Palmeiras, 33", telefone: "(63) 99999-0022",
    instagram: "@aventuratocantins", email: "contato@aventurato.com.br",
    rating: 4.8, avaliacoes: 110, preco: "$$", destaque: true,
  },

  // Empresas de Turismo
  {
    id: "t1", nome: "Rota Viva Turismo", categoria: "turismo",
    descricao: "Agência especializada em roteiros pelo Tocantins. Pacotes completos com transporte, guia e hospedagem.",
    endereco: "Av. JK, 500 - Centro", telefone: "(63) 99999-0030",
    email: "vendas@rotaviva.com.br", instagram: "@rotavivaturismo",
    rating: 4.9, avaliacoes: 203, preco: "$$$", destaque: true,
  },
  {
    id: "t2", nome: "Cerrado Tour", categoria: "turismo",
    descricao: "Operadora local com transfers, passeios e pacotes personalizados para grupos e famílias.",
    endereco: "Rua Tocantins, 88", telefone: "(63) 99999-0031",
    rating: 4.6, avaliacoes: 78, preco: "$$", destaque: false,
  },
  {
    id: "t3", nome: "Jalapão Experience", categoria: "turismo",
    descricao: "Expedições exclusivas para o Jalapão com estrutura completa de camping e guias especializados.",
    endereco: "Atendimento remoto", telefone: "(63) 99999-0032",
    email: "info@jalapaoexp.com.br", instagram: "@jalapaoexperience",
    rating: 5.0, avaliacoes: 156, preco: "$$$", destaque: true,
  },
];

// ─── CATEGORIAS ───────────────────────────────────────────────────────────────

const categorias = [
  { id: "restaurantes", label: "Restaurantes",        icon: UtensilsCrossed },
  { id: "hospedagem",   label: "Hospedagem",           icon: Hotel           },
  { id: "guias",        label: "Guias Turísticos",     icon: Users           },
  { id: "turismo",      label: "Empresas de Turismo",  icon: Building2       },
];

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

const ServicosCity = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoriaParam = searchParams.get("categoria") || "restaurantes";
  const [busca, setBusca] = useState("");

  const city = getCityBySlug(slug || "");

  const empresasFiltradas = empresasMock.filter(
    (e) =>
      e.categoria === categoriaParam &&
      (busca === "" ||
        e.nome.toLowerCase().includes(busca.toLowerCase()) ||
        e.descricao.toLowerCase().includes(busca.toLowerCase()))
  );

  const categoriaAtual = categorias.find((c) => c.id === categoriaParam);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/cidade/${slug}`)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <p className="text-xs text-muted-foreground">Serviços em</p>
              <p className="font-semibold text-foreground leading-none">{city.name}</p>
            </div>
          </div>
          <Button size="sm" onClick={() => navigate("/parceiros")}>
            Cadastre sua empresa
          </Button>
        </div>
      </header>

      <main className="pt-16">
        {/* Filtros de categoria */}
        <div className="sticky top-16 z-40 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
              {categorias.map((cat) => {
                const Icon = cat.icon;
                const ativo = cat.id === categoriaParam;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSearchParams({ categoria: cat.id })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                      ativo
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Título + busca */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <MapPin className="w-4 h-4" />
                <span>{city.name}, Tocantins</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {categoriaAtual?.label}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {empresasFiltradas.length} {empresasFiltradas.length === 1 ? "resultado" : "resultados"} encontrados
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Cards em destaque */}
          {empresasFiltradas.some((e) => e.destaque) && busca === "" && (
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Em destaque
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {empresasFiltradas
                  .filter((e) => e.destaque)
                  .map((empresa) => (
                    <EmpresaCard key={empresa.id} empresa={empresa} destaque />
                  ))}
              </div>
            </div>
          )}

          {/* Todos os resultados */}
          {empresasFiltradas.filter((e) => !e.destaque || busca !== "").length > 0 && (
            <div>
              {busca === "" && empresasFiltradas.some((e) => e.destaque) && (
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Todos os serviços
                </p>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {empresasFiltradas
                  .filter((e) => !e.destaque || busca !== "")
                  .map((empresa) => (
                    <EmpresaCard key={empresa.id} empresa={empresa} />
                  ))}
              </div>
            </div>
          )}

          {empresasFiltradas.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">
                Nenhum resultado encontrado para "{busca}".
              </p>
              <Button variant="outline" onClick={() => setBusca("")}>
                Limpar busca
              </Button>
            </div>
          )}

          {/* CTA para empresas */}
          <div className="mt-16 rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Sua empresa não está aqui?
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
              Cadastre seu negócio na Rota360 e apareça para turistas que estão
              planejando visitar {city.name}.
            </p>
            <Button onClick={() => navigate("/parceiros?tipo=empresas")}>
              Quero aparecer aqui
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

// ─── CARD DE EMPRESA ──────────────────────────────────────────────────────────

const EmpresaCard = ({ empresa, destaque = false }: { empresa: Empresa; destaque?: boolean }) => (
  <Card
    variant="elevated"
    className={`group transition-all duration-300 hover:border-primary/30 ${
      destaque ? "border-primary/20" : ""
    }`}
  >
    <CardContent className="p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-semibold text-foreground">
              {empresa.nome}
            </h3>
            {destaque && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                Destaque
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="text-sm font-semibold">{empresa.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">
              ({empresa.avaliacoes} avaliações)
            </span>
            <span className="text-muted-foreground mx-1">·</span>
            <span className="text-xs text-muted-foreground">{empresa.preco}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {empresa.descricao}
      </p>

      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
        <MapPin className="w-3.5 h-3.5 shrink-0" />
        <span>{empresa.endereco}</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <a
          href={`tel:${empresa.telefone}`}
          className="flex items-center gap-1.5 text-xs bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-3 py-1.5 rounded-lg transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          {empresa.telefone}
        </a>
        {empresa.email && (
          <a
            href={`mailto:${empresa.email}`}
            className="flex items-center gap-1.5 text-xs bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-3 py-1.5 rounded-lg transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            E-mail
          </a>
        )}
        {empresa.instagram && (
          <a
            href={`https://instagram.com/${empresa.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-3 py-1.5 rounded-lg transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            Instagram
          </a>
        )}
      </div>
    </CardContent>
  </Card>
);

export default ServicosCity;
