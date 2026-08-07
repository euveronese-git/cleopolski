import React from 'react';
import { Property } from '../types';
import { getPropertyWhatsAppUrl, formatCurrencyBRL } from '../utils/whatsapp';
import { X, Heart, Trash2, MessageCircle, ExternalLink, BedDouble, Bath, Maximize2 } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteProperties: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoriteProperties,
  onRemoveFavorite,
  onSelectProperty
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] w-full max-w-md h-full shadow-2xl border-l border-[#E0D6C8] flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-5 bg-[#3E2723] text-white flex items-center justify-between border-b border-[#C5A059]/40">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 fill-current" />
            <h3 className="font-serif-brand font-bold text-lg text-amber-100">
              Imóveis Salvos ({favoriteProperties.length})
            </h3>
          </div>
          <button onClick={onClose} className="text-amber-200/80 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {favoriteProperties.length > 0 ? (
            favoriteProperties.map((prop) => (
              <div key={prop.id} className="bg-white p-3 rounded-2xl border border-[#E0D6C8] shadow-sm flex gap-3 relative group">
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  className="w-24 h-24 object-cover rounded-xl shrink-0"
                  referrerPolicy="no-referrer"
                />
                
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="text-[10px] font-mono text-[#C5A059] font-bold block">{prop.code}</span>
                    <h4 
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="font-serif-brand font-bold text-sm text-[#3E2723] truncate cursor-pointer hover:text-[#C5A059]"
                    >
                      {prop.title}
                    </h4>
                    <p className="text-xs font-serif-brand font-bold text-[#3E2723] mt-0.5">
                      {formatCurrencyBRL(prop.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#EFE9E0] mt-1">
                    <button
                      onClick={() => onRemoveFavorite(prop.id)}
                      className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remover
                    </button>

                    <a
                      href={getPropertyWhatsAppUrl(prop.title, prop.code, prop.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-[#25D366] text-white px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      Contato
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-[#8D6E63] space-y-3">
              <Heart className="w-12 h-12 text-[#D5C9B8] mx-auto" />
              <p className="text-sm font-medium">Nenhum imóvel salvo nos favoritos.</p>
              <p className="text-xs text-[#A1887F]">Clique no ícone de coração nos cards de imóveis para salvá-los nesta lista.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {favoriteProperties.length > 0 && (
          <div className="p-4 bg-white border-t border-[#E0D6C8]">
            <a
              href={getPropertyWhatsAppUrl(`Lista de ${favoriteProperties.length} imóveis salvos`, 'FAVORITOS', 0)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#3E2723] hover:bg-[#2A1B14] text-white font-semibold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4 text-[#C5A059]" />
              Falar sobre meus imóveis salvos
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
