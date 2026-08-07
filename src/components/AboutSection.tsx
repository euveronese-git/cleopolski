import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, DISPLAY_WHATSAPP, DISPLAY_PHONE } from '../utils/whatsapp';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-white border-y border-[#E0D6C8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Branding Card */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF7F2]">
              <img
                src="/uploads/condo_house_pool_1785941165211.jpg"
                alt="C. Leopolski Corretora de Imóveis"
                className="w-full h-[450px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B14]/85 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="bg-[#C5A059] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Tradição & Confiança
                </span>
                <h3 className="text-2xl font-serif-brand font-bold">
                  Compromisso com o seu Patrimônio em Campo Grande
                </h3>
                <p className="text-xs text-amber-100/90">
                  Estrada das Capoeiras, 563 - Sala 202 • Centro de Campo Grande, RJ
                </p>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#3E2723] text-white p-5 rounded-2xl shadow-xl border-2 border-[#C5A059] hidden sm:flex items-center gap-4">
              <Award className="w-10 h-10 text-[#C5A059] shrink-0" />
              <div>
                <span className="block text-2xl font-serif-brand font-bold text-[#C5A059]">CRECI/RJ</span>
                <span className="text-xs text-amber-100/80">Corretora Credenciada</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest text-[#C5A059] uppercase">
                Quem Somos
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-brand font-bold text-[#3E2723] leading-tight">
                C. Leopolski Corretora de Imóveis
              </h2>
            </div>

            <p className="text-sm text-[#4A3525] leading-relaxed">
              Com ampla atuação e consolidação no mercado imobiliário do Rio de Janeiro, a <strong>C. Leopolski Corretora de Imóveis</strong> destaca-se pela seriedade, ética e profunda expertise na região de <strong>Campo Grande</strong> e Zona Oeste.
            </p>

            <p className="text-sm text-[#4A3525] leading-relaxed">
              Nosso objetivo principal é proporcionar aos clientes a tranquilidade necessária em todas as etapas da negociação — seja na compra do primeiro imóvel, no investimento em imóveis de alto padrão ou na locação comercial estratégica.
            </p>

            {/* Core Values Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DFD5]">
                <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3E2723]">Segurança Jurídica</h4>
                  <p className="text-[11px] text-[#5D4037]">Análise rigorosa de certidões e documentação imobiliária.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DFD5]">
                <Award className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3E2723]">Avaliação Precisa</h4>
                  <p className="text-[11px] text-[#5D4037]">Laudos de avaliação conforme valores reais de mercado.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DFD5]">
                <Users className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3E2723]">Atendimento Exclusivo</h4>
                  <p className="text-[11px] text-[#5D4037]">Acompanhamento direto e personalizado durante todo o processo.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DFD5]">
                <CheckCircle className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3E2723]">Agilidade e Transparência</h4>
                  <p className="text-[11px] text-[#5D4037]">Respostas rápidas e negociações sem burocracia.</p>
                </div>
              </div>
            </div>

            {/* Contact Callouts */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a
                href={getWhatsAppUrl('Olá! Vim pela seção Sobre Nós e gostaria de tirar algumas dúvidas.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Falar no WhatsApp ({DISPLAY_WHATSAPP})</span>
              </a>

              <a
                href="tel:2124132878"
                className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-[#EFE9E0] text-[#3E2723] font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl border border-[#D5C9B8] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>{DISPLAY_PHONE}</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
