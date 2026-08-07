import React, { useState, useEffect } from 'react';
import { Property, PropertyFilterState } from './types';
import { INITIAL_PROPERTIES } from './data/loadProperties';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyGrid } from './components/PropertyGrid';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PropertyModal } from './components/PropertyModal';
import { MortgageCalculator } from './components/MortgageCalculator';
import { PropertyEvaluationModal } from './components/PropertyEvaluationModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

const DEFAULT_FILTERS: PropertyFilterState = {
  category: 'todos',
  type: 'todos',
  neighborhood: '',
  maxPrice: 2000000,
  bedrooms: 'todos',
  searchTerm: '',
  sortBy: 'relevancia'
};

export default function App() {
  const [properties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [filters, setFilters] = useState<PropertyFilterState>(DEFAULT_FILTERS);
  
  // Favorites persisted state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('c_leopolski_favorites');
      return saved ? JSON.parse(saved) : ['cg-101', 'cg-102'];
    } catch {
      return ['cg-101', 'cg-102'];
    }
  });

  // Modal states
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mortgageModalPrice, setMortgageModalPrice] = useState<number | null>(null);
  const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('c_leopolski_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Error saving favorites:', e);
    }
  }, [favorites]);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (newFilters: Partial<PropertyFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const favoritePropertiesList = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3E2723] flex flex-col font-sans selection:bg-[#C5A059] selection:text-white">
      {/* Header */}
      <Header
        favoritesCount={favorites.length}
        onOpenFavorites={() => setFavoritesDrawerOpen(true)}
        onOpenEvaluation={() => setEvaluationModalOpen(true)}
        onOpenMortgage={() => setMortgageModalPrice(600000)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Filter Bar */}
        <Hero
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchSubmit={() => {}}
        />

        {/* Showcase / Vitrine de Imóveis */}
        <PropertyGrid
          properties={properties}
          filters={filters}
          onFilterChange={handleFilterChange}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onResetFilters={handleResetFilters}
        />

        {/* About Us Section */}
        <AboutSection />

        {/* Contact & Location Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Modals & Overlays */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
          onOpenMortgage={(price) => setMortgageModalPrice(price)}
        />
      )}

      {mortgageModalPrice !== null && (
        <MortgageCalculator
          initialPrice={mortgageModalPrice}
          onClose={() => setMortgageModalPrice(null)}
        />
      )}

      {evaluationModalOpen && (
        <PropertyEvaluationModal
          onClose={() => setEvaluationModalOpen(false)}
        />
      )}

      <FavoritesDrawer
        isOpen={favoritesDrawerOpen}
        onClose={() => setFavoritesDrawerOpen(false)}
        favoriteProperties={favoritePropertiesList}
        onRemoveFavorite={handleToggleFavorite}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
      />
    </div>
  );
}
