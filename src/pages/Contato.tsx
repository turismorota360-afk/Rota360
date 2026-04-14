import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import rota360Logo from "@/assets/rota360-logo.png";

const Contato = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    municipio: "",
    assunto: "parceria",
    mensagem: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = () => {
    const subject = encodeURIComponent(`[Rota360] ${formData.assunto === "parceria" ? "Parceria Municipal" : formData.assunto === "turista" ? "Dúvida de Turista" : "Outro Assunto"} - ${formData.nome}`);
    const body = encodeURIComponent(
      `Nome: ${formData.nome}\nEmail: ${formData.email}\nMunicípio/Empresa: ${formData.municipio}\n\nMensagem:\n${formData.mensagem}`
    );
    window.location.href = `mailto:turismo.rota360@gmail.com?subject=${subject}&body=${body}`;
    setEnviado(true);
  };

  const canSubmit = formData.nome && formData.email && formData.mensagem;

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
        <section className="relative py-24 bg-[hsl(220,30%,6%)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-2 mb-8">
              <MessageCircle className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">Fale Conosco</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Entre em contato
            </h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Seja para uma parceria municipal, dúvida sobre a plataforma ou qualquer outro assunto — estamos aqui.
            </p>
          </div>
        </section>

        {/* Contato */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">

              {/* Info */}
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Canais de atendimento
                </h2>

                <Card variant="elevated">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Email</p>
                      <a href="mailto:turismo.rota360@gmail.com" className="text-sm text-primary hover:underline">
                        turismo.rota360@gmail.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">WhatsApp</p>
                      <a
                        href="https://wa.me/5563999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-green-500 hover:underline"
                      >
                        +55 (63) 99999-9999
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Localização</p>
                      <p className="text-sm text-muted-foreground">Gurupi, Tocantins — Brasil</p>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Horário de atendimento</p>
                      <p className="text-sm text-muted-foreground">Segunda a sexta, 8h às 18h</p>
                    </div>
                  </CardContent>
                </Card>

                <a
                  href="https://wa.me/5563999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white mt-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Chamar no WhatsApp
                  </Button>
                </a>
              </div>

              {/* Formulário */}
              <div className="lg:col-span-2">
                <Card variant="elevated">
                  <CardContent className="p-8">
                    {enviado ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                          <Send className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-2">Mensagem enviada!</h3>
                        <p className="text-muted-foreground mb-6">Abrimos seu cliente de email. Entraremos em contato em breve.</p>
                        <Button onClick={() => setEnviado(false)} variant="outline">Enviar outra mensagem</Button>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        <h2 className="font-display text-2xl font-bold text-foreground mb-6">Envie uma mensagem</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block">Nome *</label>
                            <input
                              type="text"
                              placeholder="Seu nome"
                              value={formData.nome}
                              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                              className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                            <input
                              type="email"
                              placeholder="seu@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">Município ou Empresa</label>
                          <input
                            type="text"
                            placeholder="Ex: Prefeitura de Palmas, Agência XYZ..."
                            value={formData.municipio}
                            onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
                            className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">Assunto</label>
                          <select
                            value={formData.assunto}
                            onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                            className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          >
                            <option value="parceria">Parceria Municipal</option>
                            <option value="turista">Dúvida de Turista</option>
                            <option value="imprensa">Imprensa</option>
                            <option value="outro">Outro</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">Mensagem *</label>
                          <textarea
                            placeholder="Conte como podemos ajudar..."
                            value={formData.mensagem}
                            onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                          />
                        </div>

                        <Button
                          size="lg"
                          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                          onClick={handleSubmit}
                          disabled={!canSubmit}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Enviar mensagem
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">* Campos obrigatórios</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
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

export default Contato;
