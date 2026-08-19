import React from 'react';
import { Property, PropertyFilterState, PropertyType } from '../types';
import { PropertyCard } from './PropertyCard';
import { Search, SlidersHorizontal, RotateCcw, Home, Building2, Layers, Briefcase, LandPlot, Trees } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  filters: PropertyFilterState;
  onFilterChange: (filters: Partial<PropertyFilterState>) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onResetFilters: () => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  filters,
  onFilterChange,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onResetFilters
}) => {
  // Filter Logic
  const filteredProperties = properties.filter((prop) => {
    // Category (Venda, Aluguel, Lançamento)
    if (filters.category !== 'todos' && prop.category !== filters.category) {
      return false;
    }
    // Type (casa, apartamento, etc.)
    if (filters.type !== 'todos' && prop.type !== filters.type) {
      return false;
    }
    // Neighborhood
    if (filters.neighborhood && filters.neighborhood !== '' && !prop.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) {
      return false;
    }
    // Max Price
    if (prop.price > filters.maxPrice) {
      return false;
    }
    // Bedrooms
    if (filters.bedrooms !== 'todos' && prop.bedrooms < filters.bedrooms) {
      return false;
    }
    // Search Term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(term);
      const matchCode = prop.code.toLowerCase().includes(term);
      const matchAddress = prop.address.toLowerCase().includes(term);
      const matchNeigh = prop.neighborhood.toLowerCase().includes(term);
      const matchDesc = prop.description.toLowerCase().includes(term);
      if (!matchTitle && !matchCode && !matchAddress && !matchNeigh && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  // Sorting logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (filters.sortBy === 'preco-asc') return a.price - b.price;
    if (filters.sortBy === 'preco-desc') return b.price - a.price;
    if (filters.sortBy === 'area-desc') return b.areaSqM - a.areaSqM;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const propertyTypesNav: { label: string; value: 'todos' | PropertyType; icon: React.ReactNode }[] = [
    { label: 'Todos', value: 'todos', icon: <Layers className="w-4 h-4" /> },
    { label: 'Casas', value: 'casa', icon: <Home className="w-4 h-4" /> },
    { label: 'Apartamentos', value: 'apartamento', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Coberturas', value: 'cobertura', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Comerciais', value: 'comercial', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Terrenos', value: 'terreno', icon: <LandPlot className="w-4 h-4" /> },
    { label: 'Sítios', value: 'sitio', icon: <Trees className="w-4 h-4" /> },
  ];

  return (
    <section id="imoveis" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold tracking-widest text-[#C5A059] uppercase">
            Vitrine Exclusiva
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-brand font-bold text-[#3E2723]">
            Imóveis em Destaque em Campo Grande
          </h2>
          <p className="text-sm text-[#5D4037]">
            Encontre a opção ideal com documentação 100% aprovada para compra ou locação imediata.
          </p>
        </div>

        {/* Quick Type Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {propertyTypesNav.map((item) => (
            <button
              key={item.value}
              onClick={() => onFilterChange({ type: item.value })}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all ${
                filters.type === item.value
                  ? 'bg-[#3E2723] text-white shadow-md'
                  : 'bg-white text-[#5D4037] hover:bg-[#EFE9E0] border border-[#E0D6C8]'
              }`}
            >
              <span className={filters.type === item.value ? 'text-[#C5A059]' : 'text-[#8D6E63]'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Search, Counter & Sort Toolbar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#E0D6C8] mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Text Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#C5A059] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por código, rua, bairro..."
              value={filters.searchTerm}
              onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
              className="w-full bg-[#FAF7F2] border border-[#D5C9B8] rounded-xl pl-9 pr-3 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
            />
          </div>

          {/* Results Counter */}
          <div className="text-xs text-[#5D4037] font-medium text-center md:text-left">
            Exibindo <span className="font-bold text-[#3E2723]">{sortedProperties.length}</span> de {properties.length} imóveis cadastrados
          </div>

          {/* Sort Dropdown & Reset */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="bg-[#FAF7F2] border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
            >
              <option value="relevancia">Mais Recentes</option>
              <option value="preco-asc">Menor Preço</option>
              <option value="preco-desc">Maior Preço</option>
              <option value="area-desc">Maior Área (m²)</option>
            </select>

            <button
              onClick={onResetFilters}
              className="p-2 text-[#5D4037] hover:text-[#3E2723] hover:bg-[#FAF7F2] rounded-xl border border-[#D5C9B8]"
              title="Limpar Filtros"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Property Grid Container */}
        {sortedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                isFavorite={favorites.includes(prop.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl p-12 text-center max-w-lg mx-auto border border-[#E0D6C8] space-y-4">
            <div className="w-16 h-16 bg-[#FAF7F2] text-[#C5A059] rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif-brand font-bold text-[#3E2723]">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-xs text-[#5D4037]">
              Não encontramos nenhum imóvel correspondente aos filtros selecionados. Tente ajustar a busca ou limpe os filtros.
            </p>
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 bg-[#3E2723] text-white font-semibold text-xs py-2.5 px-6 rounded-xl shadow"
            >
              <RotateCcw className="w-4 h-4 text-[#C5A059]" />
              Redefinir Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
