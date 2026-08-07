import React, { useState } from 'react';
import { 
  DISPLAY_ADDRESS, 
  DISPLAY_PHONE, 
  DISPLAY_WHATSAPP, 
  INSTAGRAM_HANDLE, 
  INSTAGRAM_URL, 
  getWhatsAppUrl 
} from '../utils/whatsapp';
import { MapPin, Phone, MessageCircle, Instagram, Send, CheckCircle2, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Interesse em Imóvel',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const textMsg = `Olá, C. Leopolski Corretora! Contato enviado via site:\n\n- Nome: ${form.name}\n- E-mail: ${form.email || 'Não informado'}\n- Telefone: ${form.phone}\n- Assunto: ${form.subject}\n- Mensagem: ${form.message}`;
    setTimeout(() => {
      window.open(getWhatsAppUrl(textMsg), '_blank');
    }, 800);
  };

  return (
    <section id="contato" className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest text-[#C5A059] uppercase">
            Canais de Atendimento
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-brand font-bold text-[#3E2723]">
            Fale com a C. Leopolski Corretora
          </h2>
          <p className="text-sm text-[#5D4037]">
            Estamos prontos para atender você com agilidade e total atenção na nossa sede em Campo Grande.
          </p>
        </div>

        {/* 4 Cards Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* 1. Address Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#E0D6C8] shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 bg-[#FAF7F2] text-[#C5A059] rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif-brand font-bold text-lg text-[#3E2723]">Endereço Físico</h3>
            <p className="text-xs text-[#5D4037] leading-relaxed">
              {DISPLAY_ADDRESS}
            </p>
          </div>

          {/* 2. WhatsApp Card (Highlighted) */}
          <a
            href={getWhatsAppUrl('Olá! Gostaria de falar no WhatsApp.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3E2723] text-white p-6 rounded-2xl border border-[#C5A059] shadow-md hover:shadow-lg transition-all group space-y-3"
          >
            <div className="w-12 h-12 bg-[#25D366] text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <h3 className="font-serif-brand font-bold text-lg text-amber-100">WhatsApp Direto</h3>
            <p className="text-sm font-bold text-[#C5A059]">
              {DISPLAY_WHATSAPP}
            </p>
            <span className="text-[11px] text-amber-200/80 block">Clique para abrir conversa instantânea</span>
          </a>

          {/* 3. Phone Card */}
          <a
            href="tel:2124132878"
            className="bg-white p-6 rounded-2xl border border-[#E0D6C8] shadow-sm hover:shadow-md transition-shadow space-y-3"
          >
            <div className="w-12 h-12 bg-[#FAF7F2] text-[#C5A059] rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-serif-brand font-bold text-lg text-[#3E2723]">Telefone Fixo</h3>
            <p className="text-base font-bold text-[#3E2723]">
              {DISPLAY_PHONE}
            </p>
            <span className="text-[11px] text-[#8D6E63] block">Atendimento em horário comercial</span>
          </a>

          {/* 4. Instagram Card */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-2xl border border-[#E0D6C8] shadow-sm hover:shadow-md transition-shadow space-y-3 group"
          >
            <div className="w-12 h-12 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Instagram className="w-6 h-6" />
            </div>
            <h3 className="font-serif-brand font-bold text-lg text-[#3E2723]">Instagram</h3>
            <p className="text-sm font-bold text-[#3E2723]">
              {INSTAGRAM_HANDLE}
            </p>
            <span className="text-[11px] text-[#8D6E63] block">Acompanhe novos imóveis e novidades</span>
          </a>

        </div>

        {/* Contact Form & Google Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E0D6C8] shadow-sm space-y-6">
            <div>
              <h3 className="font-serif-brand font-bold text-2xl text-[#3E2723]">
                Envie uma Mensagem
              </h3>
              <p className="text-xs text-[#5D4037] mt-1">
                Preencha os campos abaixo e entraremos em contato o mais breve possível.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif-brand font-bold text-lg text-emerald-900">Mensagem Enviada!</h4>
                <p className="text-xs text-emerald-700">
                  Obrigado pelo contato. Redirecionando para o WhatsApp oficial...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5D4037] mb-1">Seu Nome Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Maria Santos"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#D5C9B8] rounded-xl px-4 py-2.5 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5D4037] mb-1">WhatsApp / Telefone</label>
                    <input
                      type="tel"
                      required
                      placeholder="(21) 99999-9999"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#D5C9B8] rounded-xl px-4 py-2.5 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5D4037] mb-1">E-mail (Opcional)</label>
                    <input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#D5C9B8] rounded-xl px-4 py-2.5 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5D4037] mb-1">Assunto</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#D5C9B8] rounded-xl px-4 py-2.5 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  >
                    <option value="Interesse em Comprar Imóvel">Interesse em Comprar Imóvel</option>
                    <option value="Interesse em Alugar Imóvel">Interesse em Alugar Imóvel</option>
                    <option value="Quero Vender/Avaliar meu Imóvel">Quero Vender/Avaliar meu Imóvel</option>
                    <option value="Outros Assuntos">Outros Assuntos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5D4037] mb-1">Sua Mensagem</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Escreva como podemos ajudar você..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#D5C9B8] rounded-xl px-4 py-2.5 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3E2723] hover:bg-[#2A1B14] text-white font-semibold text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group border border-[#C5A059]/40"
                >
                  <Send className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                  <span>Enviar Mensagem via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Location & Map Preview Container */}
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E0D6C8] shadow-sm space-y-4">
              <h3 className="font-serif-brand font-bold text-2xl text-[#3E2723]">
                Nossa Localização em Campo Grande
              </h3>
              <p className="text-xs text-[#5D4037] leading-relaxed">
                Estamos localizados no coração comercial de Campo Grande, na <strong>Estrada das Capoeiras, nº 563 - Sala 202</strong>, com fácil acesso por transporte e estacionamento no entorno.
              </p>

              {/* Working Hours */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E6DFD5] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#3E2723]">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                  <span>Horário de Funcionamento</span>
                </div>
                <div className="text-xs text-[#5D4037] grid grid-cols-2 gap-2 pt-1 border-t border-[#E0D6C8]">
                  <div>
                    <span className="font-medium block">Segunda a Sexta:</span>
                    <span>08:30 às 18:00</span>
                  </div>
                  <div>
                    <span className="font-medium block">Sábado:</span>
                    <span>08:30 às 13:00</span>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map — Estrada das Capoeiras 563, Campo Grande RJ */}
              <div className="space-y-2">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#E0D6C8] shadow-inner">
                  <iframe
                    title="Localização C. Leopolski Corretora de Imóveis"
                    src="https://www.google.com/maps?q=Estrada+das+Capoeiras,+563+-+Campo+Grande,+Rio+de+Janeiro+-+RJ,+23085-660&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Estrada+das+Capoeiras,+563+-+Campo+Grande,+Rio+de+Janeiro+-+RJ,+23085-660"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5A059] hover:text-[#3E2723] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
