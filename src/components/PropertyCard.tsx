import React from 'react';
import { Property } from '../types';
import { getPropertyWhatsAppUrl, formatCurrencyBRL } from '../utils/whatsapp';
import { Heart, BedDouble, Bath, Car, Maximize2, MessageCircle, Eye, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const whatsappUrl = getPropertyWhatsAppUrl(property.title, property.code, property.price);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E0D6C8] flex flex-col group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F0EB]">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Category & Featured Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-[#3E2723] text-amber-100 text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-sm">
            {property.category === 'venda' ? 'Venda' : property.category === 'aluguel' ? 'Aluguel' : 'Lançamento'}
          </span>
          {property.featuredBadge && (
            <span className="bg-[#C5A059] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
              {property.featuredBadge}
            </span>
          )}
        </div>

        {/* Property Code */}
        <span className="absolute top-3 right-12 bg-black/50 backdrop-blur-sm text-white/90 text-[10px] font-mono px-2 py-1 rounded">
          {property.code}
        </span>

        {/* Favorite Toggle Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all z-10 ${
            isFavorite 
              ? 'bg-rose-500 text-white shadow-md scale-110' 
              : 'bg-white/80 backdrop-blur-sm text-[#3E2723] hover:bg-white hover:text-rose-500'
          }`}
          title={isFavorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10 text-white">
          <div>
            <span className="text-xs text-amber-200 uppercase font-medium tracking-wider">
              {property.category === 'aluguel' ? 'Valor Mensal' : 'Valor de Venda'}
            </span>
            <p className="text-xl sm:text-2xl font-serif-brand font-bold text-white drop-shadow">
              {formatCurrencyBRL(property.price)}
              {property.category === 'aluguel' && <span className="text-xs font-sans font-normal"> /mês</span>}
            </p>
          </div>
          {property.condoFee && (
            <span className="text-[11px] bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-amber-100">
              Cond: R$ {property.condoFee}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#5D4037] mb-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span className="truncate">{property.neighborhood}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProperty(property)}
            className="font-serif-brand font-bold text-lg text-[#3E2723] hover:text-[#C5A059] transition-colors cursor-pointer line-clamp-2 mb-3 leading-snug"
          >
            {property.title}
          </h3>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-4 gap-2 py-3 border-y border-[#EFE9E0] my-3 text-xs text-[#5D4037]">
            <div className="flex flex-col items-center justify-center p-1 bg-[#FAF7F2] rounded-lg">
              <span className="flex items-center gap-1 font-semibold text-[#3E2723]">
                <BedDouble className="w-3.5 h-3.5 text-[#C5A059]" />
                {property.bedrooms}
              </span>
              <span className="text-[10px] text-[#8D6E63]">Qts</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1 bg-[#FAF7F2] rounded-lg">
              <span className="flex items-center gap-1 font-semibold text-[#3E2723]">
                <Bath className="w-3.5 h-3.5 text-[#C5A059]" />
                {property.bathrooms}
              </span>
              <span className="text-[10px] text-[#8D6E63]">Banh</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1 bg-[#FAF7F2] rounded-lg">
              <span className="flex items-center gap-1 font-semibold text-[#3E2723]">
                <Car className="w-3.5 h-3.5 text-[#C5A059]" />
                {property.parkingSpaces}
              </span>
              <span className="text-[10px] text-[#8D6E63]">Vagas</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1 bg-[#FAF7F2] rounded-lg">
              <span className="flex items-center gap-1 font-semibold text-[#3E2723]">
                <Maximize2 className="w-3.5 h-3.5 text-[#C5A059]" />
                {property.areaSqM}
              </span>
              <span className="text-[10px] text-[#8D6E63]">m²</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: WhatsApp & Details */}
        <div className="grid grid-cols-2 gap-2 mt-2 pt-1">
          <button
            onClick={() => onSelectProperty(property)}
            className="flex items-center justify-center gap-1.5 bg-[#FAF7F2] hover:bg-[#EFE9E0] text-[#3E2723] font-semibold text-xs py-2.5 px-3 rounded-xl border border-[#D5C9B8] transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            Ver Detalhes
          </button>

          {/* Strategic WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs py-2.5 px-3 rounded-xl shadow-sm transition-all duration-300"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            Tenho Interesse
          </a>
        </div>
      </div>
    </div>
  );
};
