import React from 'react';
import { PropertyFilterState, PropertyType } from '../types';
import { NEIGHBORHOODS_CAMPO_GRANDE } from '../data/properties';
import { Search, Home, Building2, MapPin, DollarSign, BedDouble, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface HeroProps {
  filters: PropertyFilterState;
  onFilterChange: (filters: Partial<PropertyFilterState>) => void;
  onSearchSubmit: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
}) => {
  const handleCategoryClick = (category: 'todos' | 'venda' | 'aluguel' | 'lancamento') => {
    onFilterChange({ category });
  };

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
    const section = document.getElementById('imoveis');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image with Warm Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/uploads/hero_luxury_home_1785941153066.jpg"
          alt="Imóveis de Alto Padrão em Campo Grande"
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0F0A]/90 via-[#2A1B14]/80 to-[#1A0F0A]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-[#C5A059]/20 backdrop-blur-md border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full text-amber-200 text-xs sm:text-sm font-medium mb-6 animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
            <span>Exclusividade & Tradição Imobiliária em Campo Grande - RJ</span>
          </div>

          {/* Impact Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif-brand text-white leading-tight mb-4 drop-shadow-md">
            Conquiste o seu Imóvel dos Sonhos no <span className="text-[#C5A059] italic">Rio de Janeiro</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-amber-100/90 font-normal leading-relaxed mb-8 max-w-2xl">
            Assessoria imobiliária personalizada com seriedade e segurança jurídica na Estrada das Capoeiras e regiões nobres de Campo Grande.
          </p>
        </div>

        {/* Multi-Filter Search Card */}
        <div className="bg-[#FAF7F2]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#E0D6C8] p-4 sm:p-6 lg:p-8 max-w-5xl">
          {/* Category Tabs: Comprar, Alugar, Lançamentos, Todos */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-[#E6DFD5] pb-4">
            <button
              type="button"
              onClick={() => handleCategoryClick('todos')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                filters.category === 'todos'
                  ? 'bg-[#3E2723] text-white shadow-md'
                  : 'text-[#5D4037] hover:bg-[#EFE9E0]'
              }`}
            >
              Todos os Imóveis
            </button>
            <button
              type="button"
              onClick={() => handleCategoryClick('venda')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                filters.category === 'venda'
                  ? 'bg-[#3E2723] text-white shadow-md'
                  : 'text-[#5D4037] hover:bg-[#EFE9E0]'
              }`}
            >
              Comprar
            </button>
            <button
              type="button"
              onClick={() => handleCategoryClick('aluguel')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                filters.category === 'aluguel'
                  ? 'bg-[#3E2723] text-white shadow-md'
                  : 'text-[#5D4037] hover:bg-[#EFE9E0]'
              }`}
            >
              Alugar
            </button>
            <button
              type="button"
              onClick={() => handleCategoryClick('lancamento')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                filters.category === 'lancamento'
                  ? 'bg-[#C5A059] text-white shadow-md'
                  : 'text-[#5D4037] hover:bg-[#EFE9E0]'
              }`}
            >
              Lançamentos
            </button>
          </div>

          {/* Search Inputs Form */}
          <form onSubmit={handleSearchClick} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Tipo de Imóvel */}
            <div>
              <label className="block text-xs font-semibold text-[#5D4037] mb-1 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#C5A059]" />
                Tipo de Imóvel
              </label>
              <select
                value={filters.type}
                onChange={(e) => onFilterChange({ type: e.target.value as any })}
                className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              >
                <option value="todos">Todos os Tipos</option>
                <option value="casa">Casas</option>
                <option value="apartamento">Apartamentos</option>
                <option value="cobertura">Coberturas</option>
                <option value="comercial">Salas Comerciais</option>
                <option value="terreno">Terrenos</option>
                <option value="sitio">Sítios</option>
              </select>
            </div>

            {/* 2. Bairro / Região */}
            <div>
              <label className="block text-xs font-semibold text-[#5D4037] mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                Bairro / Localização
              </label>
              <select
                value={filters.neighborhood}
                onChange={(e) => onFilterChange({ neighborhood: e.target.value })}
                className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              >
                {NEIGHBORHOODS_CAMPO_GRANDE.map((nb) => (
                  <option key={nb} value={nb === 'Todos os Bairros' ? '' : nb}>
                    {nb}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Quartos */}
            <div>
              <label className="block text-xs font-semibold text-[#5D4037] mb-1 flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-[#C5A059]" />
                Quartos
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => onFilterChange({ bedrooms: e.target.value === 'todos' ? 'todos' : Number(e.target.value) })}
                className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              >
                <option value="todos">Qualquer quantidade</option>
                <option value="1">1+ quarto</option>
                <option value="2">2+ quartos</option>
                <option value="3">3+ quartos</option>
                <option value="4">4+ quartos</option>
              </select>
            </div>

            {/* 4. Valor Máximo */}
            <div>
              <label className="block text-xs font-semibold text-[#5D4037] mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#C5A059]" />
                Valor Máximo
              </label>
              <select
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
                className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              >
                <option value={2000000}>Sem limite de preço</option>
                <option value={300000}>Até R$ 300.000</option>
                <option value={500000}>Até R$ 500.000</option>
                <option value={850000}>Até R$ 850.000</option>
                <option value={1200000}>Até R$ 1.200.000</option>
              </select>
            </div>

            {/* Submit Search Button */}
            <div className="sm:col-span-2 lg:col-span-4 mt-2">
              <button
                type="submit"
                className="w-full bg-[#3E2723] hover:bg-[#2A1B14] text-white font-semibold text-sm py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group border border-[#C5A059]/40"
              >
                <Search className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
                <span>Buscar Imóveis Disponíveis</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        {/* Highlight Stats Strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl text-white">
          <div className="bg-black/30 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 text-center">
            <span className="block text-2xl font-serif-brand font-bold text-[#C5A059]">20+</span>
            <span className="text-xs text-amber-100/80">Anos de Tradição</span>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 text-center">
            <span className="block text-2xl font-serif-brand font-bold text-[#C5A059]">1.500+</span>
            <span className="text-xs text-amber-100/80">Imóveis Negociados</span>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 text-center">
            <span className="block text-2xl font-serif-brand font-bold text-[#C5A059]">100%</span>
            <span className="text-xs text-amber-100/80">Segurança Jurídica</span>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 text-center">
            <span className="block text-2xl font-serif-brand font-bold text-[#C5A059]">Campo Grande</span>
            <span className="text-xs text-amber-100/80">Especialistas na Região</span>
          </div>
        </div>

      </div>
    </section>
  );
};
