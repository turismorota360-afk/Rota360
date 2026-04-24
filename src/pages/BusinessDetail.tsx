import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────
type MediaItem =
  | { type: "image"; url: string; caption?: string }
  | { type: "image360"; url: string; caption?: string }
  | { type: "video"; url: string; caption?: string }
  | { type: "video360"; url: string; caption?: string };

interface Business {
  id: string;
  name: string;
  category: "hospedagem" | "restaurante" | "guia" | "turismo";
  badge?: "Destaque";
  rating: number;
  reviews: number;
  priceLevel: "$" | "$$" | "$$$";
  description: string;
  longDescription: string;
  address: string;
  phone?: string;
  email?: string;
  instagram?: string;
  website?: string;
  amenities: string[];
  media: MediaItem[];
  openHours?: string;
  tags: string[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const BUSINESSES: Business[] = [
  {
    id: "pousada-serra-verde",
    name: "Pousada Serra Verde",
    category: "hospedagem",
    badge: "Destaque",
    rating: 4.9,
    reviews: 178,
    priceLevel: "$$",
    description: "Chalés em meio à natureza com café da manhã incluso. Vista panorâmica para o cerrado e piscina natural.",
    longDescription:
      "Encravada entre os morros do Jalapão, a Pousada Serra Verde oferece uma experiência única de imersão na natureza do cerrado tocantinense. Nossos chalés foram construídos com madeira de reflorestamento e contam com varanda privativa, de onde você pode apreciar o nascer do sol tingindo o cerrado de laranja e dourado. O café da manhã é servido com produtos orgânicos da região — queijos artesanais, frutas do cerrado, pães de forno e sucos naturais.",
    address: "Estrada da Serra, km 12",
    phone: "(63) 99999-0010",
    instagram: "pousadaserraverde",
    amenities: ["Café da manhã incluso", "Piscina natural", "Wi-Fi", "Estacionamento", "Trilhas guiadas", "Vista panorâmica"],
    openHours: "Check-in: 14h | Check-out: 12h",
    tags: ["Ecoturismo", "Natureza", "Romântico", "Família"],
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200", caption: "Vista panorâmica do cerrado" },
      { type: "image360", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200", caption: "Tour 360° do chalé principal" },
      { type: "image", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200", caption: "Piscina natural" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "Vídeo da pousada" },
      { type: "image", url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200", caption: "Café da manhã regional" },
    ],
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
    longDescription:
      "O Eco Lodge Cerrado é pioneiro em turismo sustentável no Tocantins. Toda a energia é gerada por painéis solares, a água é captada da chuva e tratada localmente, e os resíduos são compostados. Os bangalôs flutuam sobre o espelho d'água, criando uma experiência de conexão total com o ambiente. Guias ambientais conduzem expedições para observação de aves, flora do cerrado e formações rochosas únicas.",
    address: "Zona Rural – Acesso pela TO-164",
    phone: "(63) 99999-0013",
    email: "contato@ecolodgecerrado.com.br",
    instagram: "ecolodgecerrado",
    amenities: ["Energia solar", "Captação de chuva", "Bangalôs flutuantes", "Guia ambiental", "Observação de aves", "Sem plástico"],
    openHours: "Check-in: 15h | Check-out: 11h",
    tags: ["Sustentável", "Ecoturismo", "Natureza", "Aventura"],
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200", caption: "Bangalô sobre a água" },
      { type: "image360", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200", caption: "Tour 360° da área verde" },
      { type: "video360", url: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "Vídeo 360° da natureza" },
      { type: "image", url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200", caption: "Painéis solares" },
    ],
  },
  {
    id: "hotel-central-plaza",
    name: "Hotel Central Plaza",
    category: "hospedagem",
    rating: 4.5,
    reviews: 312,
    priceLevel: "$$",
    description: "Hotel de negócios no coração da cidade. Wi-Fi, academia e restaurante no local.",
    longDescription:
      "O Hotel Central Plaza é a escolha ideal para viajantes de negócios e turistas que buscam conforto e conveniência. Localizado no centro da cidade, oferece fácil acesso a restaurantes, comércio e pontos turísticos urbanos. Quartos modernos com ar-condicionado, TV a cabo e frigobar. O restaurante serve buffet completo no café da manhã e pratos à la carte no almoço e jantar.",
    address: "Av. Central, 450 – Centro",
    phone: "(63) 99999-0020",
    email: "reservas@hotelcentralplaza.com.br",
    amenities: ["Wi-Fi gratuito", "Academia", "Restaurante", "Estacionamento", "Ar-condicionado", "Frigobar"],
    openHours: "Recepção 24h",
    tags: ["Negócios", "Centro", "Conforto"],
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200", caption: "Fachada do hotel" },
      { type: "image", url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200", caption: "Quarto standard" },
      { type: "image360", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200", caption: "Tour 360° do lobby" },
    ],
  },
  {
    id: "camping-natureza-viva",
    name: "Camping Natureza Viva",
    category: "hospedagem",
    rating: 4.3,
    reviews: 45,
    priceLevel: "$",
    description: "Área de camping com infraestrutura completa. Banheiros, churrasqueiras e loja de suprimentos.",
    longDescription:
      "O Camping Natureza Viva é o ponto de partida perfeito para aventureiros que querem explorar o Jalapão de forma autêntica. A área é ampla, sombreada e conta com infraestrutura completa para barracas e veículos. Além dos sanitários com chuveiros, temos churrasqueiras, mesas de piquenique e uma loja de suprimentos com equipamentos para trilha e alimentos.",
    address: "Estrada do Jalapão, km 45",
    phone: "(63) 99999-0030",
    amenities: ["Banheiros e chuveiros", "Churrasqueiras", "Loja de suprimentos", "Área de fogueira", "Estacionamento", "Sombra natural"],
    openHours: "Aberto todos os dias",
    tags: ["Camping", "Aventura", "Econômico", "Natureza"],
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200", caption: "Área de camping" },
      { type: "image", url: "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=1200", caption: "Fogueira ao pôr do sol" },
    ],
  },
];

// ─── 360° Viewer Component ────────────────────────────────────────────────────
function Viewer360({ url, caption }: { url: string; caption?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - rotation.y * 2, y: e.clientY - rotation.x * 2 };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setRotation({
      y: (e.clientX - dragStart.current.x) / 2,
      x: (e.clientY - dragStart.current.y) / 2,
    });
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-black select-none cursor-grab active:cursor-grabbing"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: `${50 + rotation.y * 0.3}% ${50 + rotation.x * 0.3}%`,
          transition: isDragging ? "none" : "background-position 0.1s",
        }}
      />
      <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
        <span>↔</span> Arraste para explorar 360°
      </div>
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-sm px-4 py-3">
          {caption}
        </div>
      )}
    </div>
  );
}

// ─── Media Gallery ────────────────────────────────────────────────────────────
function MediaGallery({ media }: { media: MediaItem[] }) {
  const [active, setActive] = useState(0);
  const current = media[active];

  const badgeMap: Record<string, string> = {
    image: "📷 Foto",
    image360: "🔄 360°",
    video: "▶ Vídeo",
    video360: "🌐 Vídeo 360°",
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main viewer */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-black" style={{ height: 420 }}>
        {current.type === "image" && (
          <div className="relative w-full h-full">
            <img src={current.url} alt={current.caption} className="w-full h-full object-cover" />
            {current.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-sm px-4 py-3">
                {current.caption}
              </div>
            )}
          </div>
        )}
        {current.type === "image360" && <Viewer360 url={current.url} caption={current.caption} />}
        {(current.type === "video" || current.type === "video360") && (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <video src={current.url} controls className="w-full h-full object-contain" />
            {current.type === "video360" && (
              <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                🌐 Vídeo 360°
              </div>
            )}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {media.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${active === i ? "border-emerald-500 scale-105" : "border-transparent opacity-70 hover:opacity-100"}`}
            style={{ width: 96, height: 64 }}
          >
            <img
              src={item.type === "video" || item.type === "video360"
                ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200"
                : item.url}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-1">
              <span className="text-white text-[9px] font-bold leading-tight">{badgeMap[item.type]}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BusinessDetail() {
  const { businessId } = useParams<{ businessId: string }>();
  const navigate = useNavigate();
  const business = BUSINESSES.find((b) => b.id === businessId);

  useEffect(() => { window.scrollTo(0, 0); }, [businessId]);

  if (!business) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-xl font-semibold text-gray-600">Estabelecimento não encontrado.</p>
        <button onClick={() => navigate(-1)} className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition">
          Voltar
        </button>
      </div>
    );
  }

  const priceColors = { $: "text-emerald-600", $$: "text-amber-500", $$$: "text-rose-500" };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-emerald-700 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
        <span className="text-gray-300">|</span>
        <span className="text-sm text-gray-400 truncate">{business.name}</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {business.badge && (
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                ⭐ {business.badge}
              </span>
            )}
            <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full capitalize">
              {business.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{business.name}</h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Stars rating={business.rating} />
              <span className="font-bold text-gray-900">{business.rating}</span>
              <span className="text-gray-400">({business.reviews} avaliações)</span>
            </div>
            <span className={`font-bold ${priceColors[business.priceLevel]}`}>{business.priceLevel}</span>
            {business.openHours && (
              <span className="flex items-center gap-1 text-gray-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
                </svg>
                {business.openHours}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {business.address}
          </div>
        </div>

        {/* ── Media Gallery ─────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Fotos, Vídeos & 360°</h2>
            <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
              {business.media.length} mídias
            </span>
          </div>
          <MediaGallery media={business.media} />
        </section>

        <div className="grid md:grid-cols-3 gap-6">
          {/* ── Description + Amenities ──────────────────────────── */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-3">Sobre o estabelecimento</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{business.longDescription}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {business.tags.map((tag) => (
                  <span key={tag} className="bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {business.amenities.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Comodidades</h2>
                <div className="grid grid-cols-2 gap-2">
                  {business.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs flex-shrink-0">✓</span>
                      {a}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Contact Card ──────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
              <h2 className="text-lg font-bold text-gray-800">Contato</h2>

              {business.phone && (
                <a href={`tel:${business.phone}`}
                  className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-3 text-sm font-semibold transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {business.phone}
                </a>
              )}

              {business.email && (
                <a href={`mailto:${business.email}`}
                  className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-3 text-sm font-semibold transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  E-mail
                </a>
              )}

              {business.instagram && (
                <a href={`https://instagram.com/${business.instagram}`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl px-4 py-3 text-sm font-semibold transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  @{business.instagram}
                </a>
              )}
            </section>

            {/* Share / Map placeholder */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-sm font-bold text-gray-700 mb-3">Localização</h2>
              <div className="w-full rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-400 text-sm" style={{ height: 120 }}>
                📍 {business.address}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
