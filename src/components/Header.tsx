import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { getWhatsAppUrl, DISPLAY_PHONE, DISPLAY_WHATSAPP } from '../utils/whatsapp';
import { 
  Phone, 
  Instagram, 
  MapPin, 
  MessageCircle, 
  Heart, 
  Menu, 
  X, 
  Calculator,
  PlusCircle
} from 'lucide-react';

interface HeaderProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenEvaluation: () => void;
  onOpenMortgage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoritesCount,
  onOpenFavorites,
  onOpenEvaluation,
  onOpenMortgage
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Imóveis', href: '#imoveis' },
    { name: 'Sobre Nós', href: '#sobre' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-40 transition-all duration-300">
      {/* Top Bar - Contact details */}
      <div className="bg-[#2A1B14] text-amber-100/90 text-xs py-2 px-4 border-b border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Estr. das Capoeiras, 563 - Sl 202 - Campo Grande, RJ</span>
              <span className="sm:hidden">Campo Grande, RJ</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <a href="tel:2124132878" className="hover:text-[#C5A059] transition-colors">
                {DISPLAY_PHONE}
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://instagram.com/c.leopolskikorretora" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#C5A059] transition-colors"
              title="Siga no Instagram"
            >
              <Instagram className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden md:inline">@c.leopolskikorretora</span>
            </a>
            <span className="text-[#C5A059] hidden sm:inline">•</span>
            <span className="text-amber-200/80 text-[11px] font-medium hidden sm:inline">
              CRECI/RJ Registrado
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md py-3' 
            : 'bg-[#FAF7F2] py-4'
        } border-b border-[#E6DFD5]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Container */}
          <a href="#inicio" className="flex items-center gap-3">
            <BrandLogo variant="dark" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[#3E2723] font-medium text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#C5A059] transition-colors py-1 relative group tracking-wide"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Quick Tool Launchers */}
            <button
              onClick={onOpenMortgage}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#5D4037] hover:text-[#C5A059] bg-[#EFE9E0] px-3 py-1.5 rounded-full transition-colors border border-[#D5C9B8]"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C5A059]" />
              Simular Financiamento
            </button>

            <button
              onClick={onOpenEvaluation}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#3E2723] hover:text-[#C5A059] transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#C5A059]" />
              Anuncie seu Imóvel
            </button>
          </nav>

          {/* Actions & WhatsApp CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Favorites Button */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-full text-[#3E2723] hover:bg-[#EFE9E0] transition-colors border border-[#E0D6C8]"
              title="Imóveis Salvos"
            >
              <Heart className="w-5 h-5 text-[#3E2723]" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF7F2]">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Strategic WhatsApp Button */}
            <a
              href={getWhatsAppUrl('Olá! Vim pelo site da C. Leopolski Corretora e gostaria de atendimento.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>WhatsApp</span>
              <span className="hidden xl:inline text-xs font-normal opacity-90">
                {DISPLAY_WHATSAPP}
              </span>
            </a>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-full text-[#3E2723] hover:bg-[#EFE9E0]"
            >
              <Heart className="w-5 h-5 text-[#3E2723]" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#3E2723] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E0D6C8] px-4 pt-4 pb-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#3E2723] font-semibold text-base py-2 border-b border-[#EFE9E0]"
              >
                {link.name}
              </a>
            ))}

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMortgage();
                }}
                className="flex items-center justify-center gap-2 bg-[#EFE9E0] text-[#3E2723] font-semibold text-sm py-2.5 rounded-lg border border-[#D5C9B8]"
              >
                <Calculator className="w-4 h-4 text-[#C5A059]" />
                Simulador de Financiamento
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEvaluation();
                }}
                className="flex items-center justify-center gap-2 bg-[#3E2723] text-white font-semibold text-sm py-2.5 rounded-lg"
              >
                <PlusCircle className="w-4 h-4 text-[#C5A059]" />
                Anuncie seu Imóvel
              </button>

              <a
                href={getWhatsAppUrl('Olá! Gostaria de falar no WhatsApp com a C. Leopolski Corretora.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm py-3 rounded-lg shadow"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Falar no WhatsApp ({DISPLAY_WHATSAPP})
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
