import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobeLanding from "./pages/GlobeLanding";
import TocantinsMap from "./pages/TocantinsMap";
import CityDetail from "./pages/CityDetail";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Parceiros from "./pages/Parceiros";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import ServicosCity from "./pages/ServicosCity";
import AttractionDetail from "./pages/AttractionDetail";




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/parceiros" element={<Parceiros />} />
          <Route path="/" element={<GlobeLanding />} />   // tela inicial
          <Route path="/home" element={<Index />} />      // página com filtro
          <Route path="/tocantins" element={<TocantinsMap />} />
          <Route path="/cidade/:slug" element={<CityDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cidade/:slug/servicos" element={<ServicosCity />} />
          <Route path="/atrativo/:id" element={<AttractionDetail />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
