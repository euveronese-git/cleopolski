import React from 'react';
import { BrandLogo } from './BrandLogo';
import { 
  DISPLAY_ADDRESS, 
  DISPLAY_PHONE, 
  DISPLAY_WHATSAPP, 
  INSTAGRAM_HANDLE, 
  INSTAGRAM_URL, 
  getWhatsAppUrl 
} from '../utils/whatsapp';
import { MapPin, Phone, MessageCircle, Instagram, ChevronRight, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2A1B14] text-amber-100/90 border-t border-[#C5A059]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#C5A059]/20">
          
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="flex items-start">
              <BrandLogo variant="light" />
            </div>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              Tradição, transparência e alta performance em intermediações imobiliárias em Campo Grande e Zona Oeste do Rio de Janeiro.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#3E2723] px-3 py-1.5 rounded-lg border border-[#C5A059]/30 text-xs text-[#C5A059]">
              <Award className="w-4 h-4" />
              <span>CRECI/RJ Credenciado</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-brand font-bold text-base text-amber-100 border-b border-[#C5A059]/30 pb-2 inline-block">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#inicio" className="hover:text-[#C5A059] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  Início
                </a>
              </li>
              <li>
                <a href="#imoveis" className="hover:text-[#C5A059] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  Imóveis em Destaque
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#C5A059] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  Sobre a Corretora
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#C5A059] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  Contato e Localização
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Property Types */}
          <div className="space-y-3">
            <h4 className="font-serif-brand font-bold text-base text-amber-100 border-b border-[#C5A059]/30 pb-2 inline-block">
              Categorias
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                Casas em Condomínio Fechado
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                Apartamentos com Varanda Gourmet
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                Coberturas Duplex Panorâmicas
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                Salas Comerciais (Estr. das Capoeiras)
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                Terrenos Prontos para Construção
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-serif-brand font-bold text-base text-amber-100 border-b border-[#C5A059]/30 pb-2 inline-block">
              Atendimento Comercial
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>{DISPLAY_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="tel:2124132878" className="hover:text-[#C5A059]">
                  {DISPLAY_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a 
                  href={getWhatsAppUrl('Olá! Gostaria de atendimento via WhatsApp.')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] font-bold text-amber-100"
                >
                  {DISPLAY_WHATSAPP}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A059]">
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-amber-200/60">
          <p>
            © {new Date().getFullYear()} C. Leopolski Corretora de Imóveis. Todos os direitos reservados.
          </p>
          <p>
            Desenvolvido com excelência para o mercado imobiliário do Rio de Janeiro - RJ.
          </p>
        </div>

      </div>
    </footer>
  );
};
