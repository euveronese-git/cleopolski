export type PropertyType = 'casa' | 'apartamento' | 'cobertura' | 'comercial' | 'terreno' | 'sitio';
export type ListingCategory = 'venda' | 'aluguel' | 'lancamento';

export interface Property {
  id: string;
  code: string; // e.g. REF-CG101
  title: string;
  type: PropertyType;
  category: ListingCategory;
  price: number;
  condoFee?: number;
  iptuAnnual?: number;
  neighborhood: string;
  address: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  suites: number;
  parkingSpaces: number;
  areaSqM: number;
  featured: boolean;
  featuredBadge?: string;
  description: string;
  images: string[];
  features: string[];
  createdAt: string;
}

export interface PropertyFilterState {
  category: 'todos' | 'venda' | 'aluguel' | 'lancamento';
  type: 'todos' | PropertyType;
  neighborhood: string;
  maxPrice: number;
  bedrooms: number | 'todos';
  searchTerm: string;
  sortBy: 'relevancia' | 'preco-asc' | 'preco-desc' | 'area-desc';
}

export interface MortgageSimulation {
  propertyPrice: number;
  downPayment: number;
  termYears: number;
  interestRateAnnual: number;
  monthlyPayment: number;
  loanAmount: number;
}
