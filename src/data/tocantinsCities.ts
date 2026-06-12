export interface City {
  id: string; name: string; slug: string; description: string;
  shortDescription: string; coordinates: { lat: number; lng: number };
  mapPosition: { x: number; y: number }; population: string;
  attractions: number; image: string; featured: boolean;
}
export interface Attraction {
  id: string; cityId: string; name: string; category: string;
  location: string; duration: string; rating: number;
  image: string; has360: boolean; description: string;
}

const WM = (f: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}`;

export const tocantinsCities: City[] = [
  {
  id: "gurupi", name: "Gurupi", slug: "gurupi",
  description: "Localizada no sul do Tocantins, Gurupi combina desenvolvimento urbano com atrações naturais e culturais.",
  shortDescription: "Terceira maior cidade do Tocantins.",
  coordinates: { lat: -11.729, lng: -49.068 }, mapPosition: { x: 45, y: 78 },
  population: "85 mil", attractions: 9, featured: true,
  image: "/assets/parque-mutuca.jpg",
  },

  {
    id: "palmas", name: "Palmas", slug: "palmas",
    description: "Capital do Tocantins, cidade planejada com belas praias de água doce, parques e uma qualidade de vida invejável.",
    shortDescription: "Capital planejada com praias de água doce",
    coordinates: { lat: -10.2491, lng: -48.3243 }, mapPosition: { x: 52, y: 55 },
    population: "313 mil", attractions: 25, featured: true,
    image: "/assets/lago-palmas.jpg",
  },
  {
    id: "jalapao", name: "Jalapão", slug: "jalapao",
    description: "Região de beleza única com dunas douradas, fervedouros de águas cristalinas, cachoeiras imponentes e comunidades quilombolas.",
    shortDescription: "Dunas douradas e fervedouros cristalinos",
    coordinates: { lat: -10.5383, lng: -46.8419 }, mapPosition: { x: 78, y: 52 },
    population: "35 mil", attractions: 50, featured: true,
    image: "/assets/dunas-jalapao.jpg",
  },
  {
    id: "taquarucu", name: "Taquaruçu", slug: "taquarucu",
    description: "Distrito de Palmas famoso por suas cachoeiras, trilhas ecológicas e o tradicional Festival Gastronômico.",
    shortDescription: "Cachoeiras e ecoturismo",
    coordinates: { lat: -10.3167, lng: -48.1667 }, mapPosition: { x: 54, y: 57 },
    population: "5 mil", attractions: 15, featured: false,
    image: "/assets/cachoeira-roncadeira.jpg",
  },
  {
    id: "arraias", name: "Arraias", slug: "arraias",
    description: "Cidade histórica com arquitetura colonial preservada, cachoeiras e forte presença da cultura quilombola.",
    shortDescription: "História colonial e cultura quilombola",
    coordinates: { lat: -12.9289, lng: -46.9356 }, mapPosition: { x: 75, y: 78 },
    population: "10 mil", attractions: 12, featured: false,
    image: WM("Natividade TO 2009 Igreja Rosário.JPG"),
  },
  {
    id: "natividade", name: "Natividade", slug: "natividade",
    description: "Uma das cidades mais antigas do estado, patrimônio histórico com igrejas barrocas e ruínas do ciclo do ouro.",
    shortDescription: "Patrimônio histórico do ciclo do ouro",
    coordinates: { lat: -11.7036, lng: -47.7225 }, mapPosition: { x: 65, y: 68 },
    population: "9 mil", attractions: 18, featured: true,
    image: WM("Natividade TO 2009 Igreja Rosário.JPG"),
  },
  {
    id: "araguaina", name: "Araguaína", slug: "araguaina",
    description: "Segunda maior cidade do estado, importante polo comercial e de serviços com vida noturna agitada.",
    shortDescription: "Polo comercial e cultural do norte",
    coordinates: { lat: -7.1911, lng: -48.2072 }, mapPosition: { x: 48, y: 18 },
    population: "183 mil", attractions: 20, featured: false,
    image: WM("Jalapao 01.jpg"),
  },
  {
    id: "porto-nacional", name: "Porto Nacional", slug: "porto-nacional",
    description: "Cidade histórica às margens do Rio Tocantins com catedral secular, praias fluviais e rica tradição cultural.",
    shortDescription: "História e praias às margens do Tocantins",
    coordinates: { lat: -10.7081, lng: -48.4172 }, mapPosition: { x: 50, y: 60 },
    population: "53 mil", attractions: 16, featured: true,
    image: WM("Catedral Nossa Senhora das Mercês.JPG"),
  },
  {
    id: "lajeado", name: "Lajeado", slug: "lajeado",
    description: "Às margens da represa, oferece praias de água doce, esportes náuticos e pesca esportiva.",
    shortDescription: "Praias e esportes náuticos",
    coordinates: { lat: -9.7500, lng: -48.3500 }, mapPosition: { x: 52, y: 48 },
    population: "3 mil", attractions: 10, featured: false,
    image: "/assets/praia-graciosa.jpg",
  },
  {
    id: "ilha-do-bananal", name: "Ilha do Bananal", slug: "ilha-do-bananal",
    description: "Maior ilha fluvial do mundo, santuário ecológico com fauna e flora preservadas e comunidades indígenas.",
    shortDescription: "Maior ilha fluvial do mundo",
    coordinates: { lat: -10.0000, lng: -50.0000 }, mapPosition: { x: 22, y: 50 },
    population: "2 mil", attractions: 30, featured: true,
    image: WM("Início das Serras Gerais.jpg"),
  },
  {
    id: "miracema", name: "Miracema do Tocantins", slug: "miracema",
    description: "Antiga capital do estado com belas praias no Rio Tocantins e festas tradicionais.",
    shortDescription: "Antiga capital com praias fluviais",
    coordinates: { lat: -9.5647, lng: -48.3922 }, mapPosition: { x: 51, y: 45 },
    population: "20 mil", attractions: 8, featured: false,
    image: "/assets/praia-caju.jpg",
  },

];

export const attractions: Attraction[] = [

  // ─── JALAPÃO ──────────────────────────────────────────────────────
  { id: "fervedouro-ceica", cityId: "jalapao", name: "Fervedouro do Ceiça",
    category: "Natureza", location: "Mateiros, TO", duration: "2-3 horas", rating: 4.9, has360: true,
    image: "/assets/fervedouro-ceica.jpg",
    description: "Nascente de águas cristalinas onde é impossível afundar devido à pressão da água." },

  { id: "dunas-jalapao", cityId: "jalapao", name: "Dunas do Jalapão",
    category: "Aventura", location: "Mateiros, TO", duration: "3-4 horas", rating: 4.8, has360: true,
    image: "/assets/dunas-jalapao.jpg",
    description: "Impressionantes dunas douradas no meio do cerrado brasileiro." },

  { id: "cachoeira-velha", cityId: "jalapao", name: "Cachoeira da Velha",
    category: "Cachoeira", location: "Mateiros, TO", duration: "4-5 horas", rating: 4.9, has360: true,
    image: "/assets/cachoeira-velha.jpg",
    description: "Uma das mais belas cachoeiras do Brasil com mais de 100m de largura." },

  { id: "rio-sono", cityId: "jalapao", name: "Rio Sono",
    category: "Aventura", location: "Mateiros, TO", duration: "3-5 horas", rating: 4.7, has360: false,
    image: "/assets/fervedouro-burrinho.jpg",
    description: "Rio de águas cristalinas perfeito para canoagem e banho em meio ao cerrado." },

  { id: "cachoeira-formiga", cityId: "jalapao", name: "Cachoeira da Formiga",
    category: "Cachoeira", location: "Mateiros, TO", duration: "2-3 horas", rating: 4.6, has360: false,
    image: "/assets/cachoeira-formiga.jpg",
    description: "Pequena cachoeira com piscina natural de águas esverdeadas, ideal para banho." },

  { id: "comunidade-mumbuca", cityId: "jalapao", name: "Comunidade Mumbuca",
    category: "Cultural", location: "Mateiros, TO", duration: "2 horas", rating: 4.8, has360: false,
    image: "/assets/comunidade-mumbuca.jpg",
    description: "Comunidade quilombola famosa pela produção artesanal com capim dourado." },

  { id: "fervedouro-burrinho", cityId: "jalapao", name: "Fervedouro do Burrinho",
    category: "Natureza", location: "Mateiros, TO", duration: "2-3 horas", rating: 4.7, has360: false,
    image: "/assets/fervedouro-burrinho.jpg",
    description: "Fervedouro mais acessível do Jalapão, com águas azul-turquesa e ambiente tranquilo." },

  { id: "serra-do-espírito-santo", cityId: "jalapao", name: "Serra do Espírito Santo",
    category: "Aventura", location: "Mateiros, TO", duration: "4-6 horas", rating: 4.8, has360: true,
    image: "/assets/serra-espirito-santo.jpg",
    description: "Formação rochosa com vista panorâmica deslumbrante para todo o Jalapão." },

  // ─── PALMAS ───────────────────────────────────────────────────────
  { id: "lago-de-palmas", cityId: "palmas", name: "Lago de Palmas",
    category: "Natureza", location: "Palmas, TO", duration: "2-4 horas", rating: 4.7, has360: true,
    image: "/assets/lago-palmas.jpg",
    description: "Grande lago artificial que proporciona lazer, esportes aquáticos e belas paisagens." },

  { id: "ponte-fernando-henrique", cityId: "palmas", name: "Ponte Fernando Henrique Cardoso",
    category: "Turístico", location: "Palmas, TO", duration: "1 hora", rating: 4.6, has360: false,
    image: "/assets/ponte-fhc.jpg",
    description: "Importante cartão-postal da cidade, com vista privilegiada do lago." },

  { id: "praia-caju", cityId: "palmas", name: "Praia do Caju",
    category: "Praia", location: "Palmas, TO", duration: "3-5 horas", rating: 4.5, has360: true,
    image: "/assets/praia-caju.jpg",
    description: "Praia tranquila com águas calmas, ideal para famílias e momentos de descanso." },

  { id: "orla-de-palmas", cityId: "palmas", name: "Orla de Palmas",
    category: "Turístico", location: "Palmas, TO", duration: "2-3 horas", rating: 4.6, has360: false,
    image: "/assets/orla-palmas.jpg",
    description: "Área agradável para caminhadas, com vista para o lago e opções de lazer ao ar livre." },

  { id: "parque-sussuapara", cityId: "palmas", name: "Parque Sussuapara",
    category: "Natureza", location: "Palmas, TO", duration: "1-2 horas", rating: 4.4, has360: false,
    image: "/assets/parque-sussuapara.jpg",
    description: "Parque com trilhas ecológicas e pequena cachoeira, ideal para contato com a natureza." },

  { id: "catedral-de-palmas", cityId: "palmas", name: "Catedral do Divino Espírito Santo",
    category: "Cultural", location: "Palmas, TO", duration: "1 hora", rating: 4.7, has360: false,
    image: "/assets/catedral-palmas.jpg",
    description: "Importante ponto religioso com arquitetura moderna e ambiente tranquilo para visitação." },

  { id: "feira-304-sul", cityId: "palmas", name: "Feira da 304 Sul",
    category: "Gastronomia", location: "Palmas, TO", duration: "1-2 horas", rating: 4.5, has360: false,
    image: "/assets/feira-304-sul.jpg",
    description: "Feira tradicional com comidas típicas e produtos regionais." },

  { id: "kartodromo", cityId: "palmas", name: "Kartódromo Rubens Barrichello",
    category: "Aventura", location: "Palmas, TO", duration: "1-2 horas", rating: 4.5, has360: false,
    image: "/assets/kartodromo.jpg",
    description: "Espaço para prática de kart, oferecendo diversão e adrenalina para visitantes." },

  { id: "praia-graciosa", cityId: "palmas", name: "Praia da Graciosa",
    category: "Praia", location: "Palmas, TO", duration: "3-5 horas", rating: 4.6, has360: false,
    image: "/assets/praia-graciosa.jpg",
    description: "Uma das praias mais movimentadas de Palmas, com infraestrutura completa e águas tranquilas." },

  { id: "parque-cesamar", cityId: "palmas", name: "Parque Cesamar",
    category: "Natureza", location: "Palmas, TO", duration: "1-3 horas", rating: 4.5, has360: false,
    image: "/assets/parque-cesamar.jpg",
    description: "Parque urbano com lagos, trilhas, quadras esportivas e área de lazer para toda a família." },

  // ─── PORTO NACIONAL ───────────────────────────────────────────────
  { id: "catedral-porto", cityId: "porto-nacional", name: "Catedral Nossa Senhora das Mercês",
    category: "Cultural", location: "Porto Nacional, TO", duration: "1 hora", rating: 4.8, has360: true,
    image: WM("Catedral Nossa Senhora das Mercês.JPG"),
    description: "Igreja histórica do século XIX com arquitetura colonial preservada." },

  { id: "praia-porto", cityId: "porto-nacional", name: "Praia de Porto Nacional",
    category: "Praia", location: "Porto Nacional, TO", duration: "3-5 horas", rating: 4.6, has360: false,
    image: WM("Rio Tocantins e Praia do Tucunaré.JPG"),
    description: "Bela praia fluvial às margens do Rio Tocantins, perfeita para banho e lazer." },

  { id: "museu-porto", cityId: "porto-nacional", name: "Museu e Arquivo Histórico",
    category: "Cultural", location: "Porto Nacional, TO", duration: "1-2 horas", rating: 4.5, has360: false,
    image: WM("Catedral Nossa Senhora das Mercês.JPG"),
    description: "Museu com acervo histórico sobre a fundação e desenvolvimento da cidade." },

  { id: "observatorio-porto", cityId: "porto-nacional", name: "Observatório Astronômico",
    category: "Cultural", location: "Porto Nacional, TO", duration: "2 horas", rating: 4.7, has360: false,
    image: "https://images.unsplash.com/photo-1518066257561-0ba90c2e6b9a?w=800&auto=format&fit=crop&q=80",
    description: "Um dos observatórios mais antigos do Brasil, com sessões de observação do céu." },

  // ─── NATIVIDADE ───────────────────────────────────────────────────
  { id: "ruinas-natividade", cityId: "natividade", name: "Ruínas da Igreja do Rosário",
    category: "Histórico", location: "Natividade, TO", duration: "1-2 horas", rating: 4.7, has360: true,
    image: WM("Natividade TO 2009 Igreja Rosário.JPG"),
    description: "Ruínas preservadas do período colonial e ciclo do ouro." },

  { id: "chapada-natividade", cityId: "natividade", name: "Chapada da Natividade",
    category: "Natureza", location: "Natividade, TO", duration: "3-5 horas", rating: 4.6, has360: false,
    image: "/assets/serra-espirito-santo.jpg",
    description: "Formação rochosa com vista panorâmica e trilhas pelo cerrado nativo." },

  { id: "cachoeira-natividade", cityId: "natividade", name: "Cachoeira da Natividade",
    category: "Cachoeira", location: "Natividade, TO", duration: "2-3 horas", rating: 4.5, has360: false,
    image: "/assets/cachoeira-evilson.jpg",
    description: "Cachoeira de médio porte em meio ao cerrado, com piscina natural refrescante." },

  { id: "centro-historico-natividade", cityId: "natividade", name: "Centro Histórico",
    category: "Cultural", location: "Natividade, TO", duration: "2 horas", rating: 4.8, has360: false,
    image: WM("Natividade TO 2009 Igreja Rosário.JPG"),
    description: "Conjunto arquitetônico do século XVIII tombado pelo patrimônio histórico nacional." },

  // ─── ILHA DO BANANAL ──────────────────────────────────────────────
  { id: "parque-araguaia", cityId: "ilha-do-bananal", name: "Parque Nacional do Araguaia",
    category: "Natureza", location: "Ilha do Bananal, TO", duration: "1 dia", rating: 4.9, has360: true,
    image: WM("Início das Serras Gerais.jpg"),
    description: "Santuário ecológico com fauna diversificada e paisagens únicas." },

  { id: "aldeia-indigena", cityId: "ilha-do-bananal", name: "Aldeia Indígena Karajá",
    category: "Cultural", location: "Ilha do Bananal, TO", duration: "3-4 horas", rating: 4.8, has360: false,
    image: WM("Karajá woman - Bananal Island.jpg"),
    description: "Visita guiada à aldeia do povo Karajá, com artesanato e cultura milenar." },

  { id: "rio-araguaia-bananal", cityId: "ilha-do-bananal", name: "Rio Araguaia",
    category: "Aventura", location: "Ilha do Bananal, TO", duration: "4-8 horas", rating: 4.7, has360: false,
    image: WM("Rio Tocantins e Praia do Tucunaré.JPG"),
    description: "Passeio de barco pelo maior rio do estado com observação de fauna ribeirinha." },

    // ─── GURUPI ───────────────────────────────────────────────────────
  { id: "parque-mutuca", cityId: "gurupi", name: "Parque Mutuca",
    category: "Natureza", location: "Gurupi, TO", duration: "1 dia", rating: 4.4, has360: true,
    image: "/assets/parque-mutuca.jpg",
    description: "Parque ecológico de Gurupi com áreas verdes, trilhas e paisagens do cerrado." },

  { id: "feira-do-artesanato", cityId: "gurupi", name: "Feira do Artesanato",
    category: "Cultural", location: "Gurupi, TO", duration: "1-2 horas", rating: 4.6, has360: true,
    image: "/assets/feira-artesanato-gurupi.jpg",
    description: "Explore peças únicas em cerâmica, madeira e capim dourado do Tocantins." },

  { id: "mercado-municipal", cityId: "gurupi", name: "Mercado Municipal",
    category: "Gastronomia", location: "Gurupi, TO", duration: "1-2 horas", rating: 4.6, has360: true,
    image: "/assets/mercado-municipal-gurupi.jpg",
    description: "Mercado tradicional que reúne gastronomia regional, produtos típicos e artesanato." },

  { id: "centro-cultural-mauro-cunha", cityId: "gurupi", name: "Centro Cultural Mauro Cunha",
    category: "Cultural", location: "Gurupi, TO", duration: "1-2 horas", rating: 4.4, has360: false,
    image: "/assets/centro-cultural-gurupi.jpg",
    description: "Principal espaço cultural da cidade com exposições e eventos artísticos." },

  // ─── TAQUARUÇU ────────────────────────────────────────────────────
  { id: "cachoeira-roncadeira", cityId: "taquarucu", name: "Cachoeira Roncadeira",
    category: "Cachoeira", location: "Taquaruçu, TO", duration: "3-4 horas", rating: 4.8, has360: true,
    image: "/assets/cachoeira-roncadeira.jpg",
    description: "Uma das cachoeiras mais famosas do Tocantins, com 70m de queda e piscina natural." },

  { id: "trilha-taquarucu", cityId: "taquarucu", name: "Trilha Ecológica do Lajeado",
    category: "Aventura", location: "Taquaruçu, TO", duration: "4-6 horas", rating: 4.7, has360: false,
    image: "/assets/parque-sussuapara.jpg",
    description: "Trilha de longa distância pelo cerrado com vistas panorâmicas e diversas cachoeiras." },

  { id: "festival-taquarucu", cityId: "taquarucu", name: "Festival Gastronômico",
    category: "Gastronomia", location: "Taquaruçu, TO", duration: "1 dia", rating: 4.9, has360: false,
    image: "/assets/festival-taquarucu.jpg",
    description: "Evento anual com pratos típicos regionais, shows culturais e feira de artesanato." },

  { id: "cachoeira-evilson", cityId: "taquarucu", name: "Cachoeira do Evilson",
    category: "Cachoeira", location: "Taquaruçu, TO", duration: "2-3 horas", rating: 4.5, has360: false,
    image: "/assets/cachoeira-evilson.jpg",
    description: "Cachoeira de acesso mais fácil, ideal para famílias com crianças." },

  // ─── ARAGUAÍNA ────────────────────────────────────────────────────
  { id: "parque-cimba", cityId: "araguaina", name: "Parque Cimba",
    category: "Natureza", location: "Araguaína, TO", duration: "1-3 horas", rating: 4.4, has360: false,
    image: WM("Cerrado blowing flowers.jpg"),
    description: "Parque urbano com lago, trilhas e área de lazer no coração da cidade." },

  { id: "museu-araguaina", cityId: "araguaina", name: "Museu Histórico de Araguaína",
    category: "Cultural", location: "Araguaína, TO", duration: "1-2 horas", rating: 4.3, has360: false,
    image: "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?w=800&auto=format&fit=crop&q=80",
    description: "Acervo com peças históricas e documentos sobre a história da cidade." },

  { id: "balneario-araguaia", cityId: "araguaina", name: "Balneário do Rio Lontra",
    category: "Natureza", location: "Araguaína, TO", duration: "3-5 horas", rating: 4.5, has360: false,
    image: "/assets/praia-caju.jpg",
    description: "Balneário natural às margens do Rio Lontra com águas tranquilas e barracas de lazer." },

  // ─── ARRAIAS ──────────────────────────────────────────────────────
  { id: "cachoeira-arraias", cityId: "arraias", name: "Cachoeira da Porteira",
    category: "Cachoeira", location: "Arraias, TO", duration: "2-4 horas", rating: 4.6, has360: false,
    image: "/assets/cachoeira-formiga.jpg",
    description: "Cachoeira em meio ao cerrado com formações rochosas únicas e piscina natural." },

  { id: "centro-historico-arraias", cityId: "arraias", name: "Centro Histórico de Arraias",
    category: "Cultural", location: "Arraias, TO", duration: "2 horas", rating: 4.5, has360: false,
    image: WM("Natividade TO 2009 Igreja Rosário.JPG"),
    description: "Conjunto de edificações coloniais do século XVIII com igrejas e casarões preservados." },

  { id: "comunidade-kalunga", cityId: "arraias", name: "Comunidade Quilombola",
    category: "Cultural", location: "Arraias, TO", duration: "3-4 horas", rating: 4.8, has360: false,
    image: "/assets/comunidade-mumbuca.jpg",
    description: "Visita às comunidades quilombolas com manifestações culturais e artesanato." },

  // ─── LAJEADO ──────────────────────────────────────────────────────
  { id: "represa-lajeado", cityId: "lajeado", name: "Represa de Lajeado",
    category: "Natureza", location: "Lajeado, TO", duration: "3-5 horas", rating: 4.6, has360: false,
    image: "/assets/lago-palmas.jpg",
    description: "Grande represa com praias de água doce, pesca esportiva e passeios de barco." },

  { id: "pesca-lajeado", cityId: "lajeado", name: "Pesca Esportiva",
    category: "Aventura", location: "Lajeado, TO", duration: "4-8 horas", rating: 4.7, has360: false,
    image: "https://images.unsplash.com/photo-1530968033775-2c92736b131e?w=800&auto=format&fit=crop&q=80",
    description: "Um dos melhores pontos de pesca esportiva do Tocantins, com tucunaré e pintado." },

  { id: "praia-lajeado", cityId: "lajeado", name: "Praia da Represa",
    category: "Praia", location: "Lajeado, TO", duration: "3-5 horas", rating: 4.5, has360: false,
    image: "/assets/praia-caju.jpg",
    description: "Praia de água doce com areia clara e infraestrutura para banho e lazer." },

  // ─── MIRACEMA ─────────────────────────────────────────────────────
  { id: "praia-miracema", cityId: "miracema", name: "Praia Fluvial de Miracema",
    category: "Praia", location: "Miracema do Tocantins, TO", duration: "3-5 horas", rating: 4.5, has360: false,
    image: "/assets/praia-graciosa.jpg",
    description: "Praia às margens do Rio Tocantins com areia branca e águas calmas." },

  { id: "centro-historico-miracema", cityId: "miracema", name: "Centro Histórico",
    category: "Cultural", location: "Miracema do Tocantins, TO", duration: "1-2 horas", rating: 4.3, has360: false,
    image: WM("Natividade TO 2009 Igreja Rosário.JPG"),
    description: "Antiga capital do estado com edificações históricas e praça central preservada." },
];

export const getCityBySlug = (slug: string) =>
  tocantinsCities.find(city => city.slug === slug);
export const getAttractionsByCity = (cityId: string) =>
  attractions.filter(a => a.cityId === cityId);
export const getFeaturedCities = () =>
  tocantinsCities.filter(city => city.featured);
