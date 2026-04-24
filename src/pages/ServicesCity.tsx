import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = "hospedagem" | "restaurante" | "guia" | "turismo";

interface Business {
  id: string;
  name: string;
  category: Category;
  badge?: "Destaque";
  rating: number;
  reviews: number;
  priceLevel: "$" | "$$" | "$$$";
  description: string;
  address: string;
  phone?: string;
  email?: string;
  instagram?: string;
  hasMedia?: boolean;
}

// ─── Mock Data (mesma fonte do BusinessDetail) ────────────────────────────────
const ALL_BUSINESSES: Business[] = [
  {
    id: "pousada-serra-verde",
    name: "Pousada Serra Verde",
    category: "hospedagem",
    badge: "Destaque",
    rating: 4.9,
    reviews: 178,
    priceLevel: "$$",
    description: "Chalés em meio à natureza com café da manhã incluso. Vista panorâmica para o cerrado e piscina natural.",
    address: "Estrada da Serra, km 12",
    phone: "(63) 99999-0010",
    instagram: "pousadaserraverde",
    hasMedia: true,
  },
  {
    id: "eco-lodge-cerrado",
    name: "Eco Lodge Cerrado",
    category: "hospedagem",
    badge: "Destaque",
    rating: 4.8,
    reviews: 93,
    priceLevel: "$$$",
    description: "Hospedagem sustentável com energia solar e captação de água da chuva. Experiência imersiva na natureza.",
    address: "Zona Rural – Acesso pela TO-164",
    phone: "(63) 99999-0013",
    email: "contato@ecolodgecerrado.com.br",
    instagram: "ecolodgecerrado",
    hasMedia: true,
  },
  {
    id: "hotel-central-plaza",
    name: "Hotel Central Plaza",
    category: "hospedagem",
    rating: 4.5,
    reviews: 312,
    priceLevel: "$$",
    description: "Hotel de negócios no coração da cidade. Wi-Fi, academia e restaurante no local.",
    address: "Av. Central, 450 – Centro",
    phone: "(63) 99999-0020",
    hasMedia: true,
  },
  {
    id: "camping-natureza-viva",
    name: "Camping Natureza Viva",
    category: "hospedagem",
    rating: 4.3,
    reviews: 45,
    priceLevel: "$",
    description: "Área de camping com infraestrutura completa. Banheiros, churrasqueiras e loja de suprimentos.",
    address: "Estrada do Jalapão, km 45",
    phone: "(63) 99999-0030",
    hasMedia: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function PriceTag({ level }: { level: "$" | "$$" | "$$$" }) {
  const colors = { $: "text-emerald-600", $$: "text-amber-500", $$$: "text-rose-500" };
  return <span className={`font-bold text-sm ${colors[level]}`}>{level}</span>;
}

// ─── Business Card ────────────────────────────────────────────────────────────
function BusinessCard({ business, featured }: { business: Business; featured?: boolean }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to business detail page
    // Adjust the path to match your router setup
    navigate(`/empresa/${business.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group relative bg-white rounded-2xl border border-gray-200 p-5 cursor-pointer
        transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-emerald-200
        ${featured ? "shadow-sm" : ""}
      `}
    >
      {/* Badge */}
      {business.badge && (
        <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
          {business.badge}
        </span>
      )}

      {/* 360 / Media badge */}
      {business.hasMedia && (
        <span className="absolute top-4 right-4 mr-[80px] bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5">
          🔄 360°
        </span>
      )}

      <h3 className="font-bold text-gray-900 text-base mb-1.5 pr-20 group-hover:text-emerald-700 transition-colors">
        {business.name}
      </h3>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Stars rating={business.rating} />
        <span className="font-semibold text-gray-800">{business.rating}</span>
        <span>({business.reviews} avaliações)</span>
        <span>·</span>
        <PriceTag level={business.priceLevel} />
      </div>

      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{business.description}</p>

      <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
        <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {business.address}
      </div>

      {/* Contact buttons (stop propagation so clicks don't navigate) */}
      <div className="flex gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
        {business.phone && (
          <a
            href={`tel:${business.phone}`}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {business.phone}
          </a>
        )}
        {business.email && (
          <a
            href={`mailto:${business.email}`}
            className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            E-mail
          </a>
        )}
        {business.instagram && (
          <a
            href={`https://instagram.com/${business.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
          >
            Instagram
          </a>
        )}
      </div>

      {/* Arrow indicator */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

// ─── Category Tabs ────────────────────────────────────────────────────────────
const CATEGORY_TABS: { id: Category | "all"; label: string; icon: string }[] = [
  { id: "all", label: "Todos", icon: "🏙" },
  { id: "restaurante", label: "Restaurantes", icon: "🍽" },
  { id: "hospedagem", label: "Hospedagem", icon: "🏨" },
  { id: "guia", label: "Guias Turísticos", icon: "🧭" },
  { id: "turismo", label: "Empresas de Turismo", icon: "🏕" },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ServicesCity() {
  const { cityId } = useParams<{ cityId: string }>();
  const [activeCategory, setActiveCategory] = useState<Category | "all">("hospedagem");
  const [search, setSearch] = useState("");

  const cityName = "Jalapão, Tocantins"; // Derive from cityId in real app

  const filtered = ALL_BUSINESSES.filter((b) => {
    const matchCat = activeCategory === "all" || b.category === activeCategory;
    const matchSearch = search === "" || b.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.filter((b) => b.badge === "Destaque");
  const rest = filtered.filter((b) => b.badge !== "Destaque");

  const categoryLabel = CATEGORY_TABS.find((t) => t.id === activeCategory)?.label ?? "Serviços";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category nav */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold px-4 py-2 rounded-full transition ${
                activeCategory === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-sm text-gray-400 flex items-center gap-1 mb-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {cityName}
            </p>
            <h1 className="text-3xl font-bold text-gray-900">{categoryLabel}</h1>
            <p className="text-sm text-gray-400 mt-0.5">{filtered.length} resultado{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}</p>
          </div>
          {/* Search */}
          <div className="relative w-full md:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
          </div>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Em Destaque</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {featured.map((b) => <BusinessCard key={b.id} business={b} featured />)}
            </div>
          </section>
        )}

        {/* All */}
        {rest.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              {featured.length > 0 ? "Todos os Serviços" : "Resultados"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {rest.map((b) => <BusinessCard key={b.id} business={b} />)}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium">Nenhum resultado encontrado.</p>
            <p className="text-sm">Tente outra categoria ou busca.</p>
          </div>
        )}
      </div>
    </div>
  );
}
