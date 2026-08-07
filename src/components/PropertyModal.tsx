import React, { useState } from 'react';
import { Property } from '../types';
import { getPropertyWhatsAppUrl, formatCurrencyBRL, DISPLAY_WHATSAPP } from '../utils/whatsapp';
import { 
  X, 
  BedDouble, 
  Bath, 
  Car, 
  Maximize2, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  Heart, 
  Calendar, 
  Calculator, 
  Phone,
  Building,
  Share2,
  Check
} from 'lucide-react';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenMortgage: (price: number) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenMortgage
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [visitForm, setVisitForm] = useState({ name: '', phone: '', date: '', notes: '' });
  const [visitSubmitted, setVisitSubmitted] = useState(false);

  const whatsappUrl = getPropertyWhatsAppUrl(property.title, property.code, property.price);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitSubmitted(true);
    // Construct WhatsApp message with scheduled date
    const visitMsg = `Olá C. Leopolski! Gostaria de agendar uma visita para o imóvel "${property.title}" (Ref: ${property.code}).\n\nNome: ${visitForm.name}\nTelefone: ${visitForm.phone}\nData desejada: ${visitForm.date}\nObservações: ${visitForm.notes || 'Nenhuma'}`;
    setTimeout(() => {
      window.open(getPropertyWhatsAppUrl(property.title, property.code, property.price) + encodeURIComponent(`\n\nAgendamento de Visita: ${visitForm.date}`), '_blank');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fadeIn">
      {/* Modal Card */}
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E0D6C8] w-full max-w-5xl max-h-[92vh] overflow-y-auto relative flex flex-col my-auto">
        
        {/* Modal Sticky Header Bar */}
        <div className="sticky top-0 z-20 bg-[#FAF7F2]/95 backdrop-blur-md px-4 sm:px-6 py-4 border-b border-[#E6DFD5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-[#3E2723] text-amber-100 font-mono text-xs px-2.5 py-1 rounded font-bold">
              {property.code}
            </span>
            <span className="text-xs font-semibold text-[#5D4037] uppercase tracking-wider hidden sm:inline">
              {property.type} • {property.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-[#EFE9E0] text-[#3E2723] transition-colors"
              title="Copiar Link"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>

            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite ? 'text-rose-600' : 'text-[#3E2723] hover:bg-[#EFE9E0]'
              }`}
              title="Favoritar"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#EFE9E0] text-[#3E2723] transition-colors"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Main Photo Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-md bg-[#2A1B14]">
              <img
                src={property.images[activeImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                Foto {activeImageIndex + 1} de {property.images.length}
              </div>
            </div>

            {/* Thumbnails Row */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden shrink-0 transition-all border-2 ${
                      activeImageIndex === idx ? 'border-[#C5A059] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E6DFD5]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#C5A059]">
                <MapPin className="w-4 h-4" />
                <span>{property.address} - {property.neighborhood}, {property.city} - {property.state}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#3E2723] leading-snug">
                {property.title}
              </h2>
            </div>

            <div className="bg-[#EFE9E0] p-4 rounded-xl border border-[#D5C9B8] min-w-[220px]">
              <span className="text-xs text-[#5D4037] uppercase tracking-wider font-medium">
                {property.category === 'aluguel' ? 'Valor da Locação' : 'Preço de Venda'}
              </span>
              <p className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#3E2723]">
                {formatCurrencyBRL(property.price)}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-[#5D4037] mt-1 pt-1 border-t border-[#D5C9B8]/60">
                {property.condoFee && <span>Cond: R$ {property.condoFee}</span>}
                {property.iptuAnnual && <span>IPTU: R$ {property.iptuAnnual}/ano</span>}
              </div>
            </div>
          </div>

          {/* Metrics Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-[#E0D6C8] shadow-sm">
            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-[#FAF7F2] rounded-xl text-[#C5A059]">
                <BedDouble className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-[#8D6E63] font-medium block">Quartos</span>
                <span className="text-base font-bold text-[#3E2723]">{property.bedrooms} ({property.suites} suítes)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-[#FAF7F2] rounded-xl text-[#C5A059]">
                <Bath className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-[#8D6E63] font-medium block">Banheiros</span>
                <span className="text-base font-bold text-[#3E2723]">{property.bathrooms} banheiros</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-[#FAF7F2] rounded-xl text-[#C5A059]">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-[#8D6E63] font-medium block">Vagas</span>
                <span className="text-base font-bold text-[#3E2723]">{property.parkingSpaces} vagas</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-[#FAF7F2] rounded-xl text-[#C5A059]">
                <Maximize2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-[#8D6E63] font-medium block">Área Útil</span>
                <span className="text-base font-bold text-[#3E2723]">{property.areaSqM} m²</span>
              </div>
            </div>
          </div>

          {/* Grid Layout: Description & Features vs Contact / Visit Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Details & Features */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Description */}
              <div className="bg-white p-6 rounded-2xl border border-[#E0D6C8]">
                <h3 className="text-lg font-serif-brand font-bold text-[#3E2723] mb-3 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#C5A059]" />
                  Descrição do Imóvel
                </h3>
                <p className="text-sm text-[#4A3525] leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Features Checklist */}
              <div className="bg-white p-6 rounded-2xl border border-[#E0D6C8]">
                <h3 className="text-lg font-serif-brand font-bold text-[#3E2723] mb-4">
                  Destaques e Diferenciais
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#3E2723]">
                  {property.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-[#FAF7F2]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Banner: Financing Simulator */}
              <div className="bg-[#3E2723] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#C5A059]/40">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-serif-brand font-bold text-lg text-amber-100 flex items-center justify-center sm:justify-start gap-2">
                    <Calculator className="w-5 h-5 text-[#C5A059]" />
                    Simular Financiamento Bancário
                  </h4>
                  <p className="text-xs text-amber-200/80">
                    Descubra o valor da entrada e parcelas mensais simuladas para este imóvel.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenMortgage(property.price);
                  }}
                  className="bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-colors shrink-0 shadow-md"
                >
                  Simular Agora
                </button>
              </div>

            </div>

            {/* Right Col: Strategic Direct WhatsApp & Visit Schedule */}
            <div className="space-y-6">
              
              {/* Primary WhatsApp Card */}
              <div className="bg-[#2A1B14] text-white p-6 rounded-2xl border border-[#C5A059] shadow-lg text-center space-y-4">
                <div className="inline-flex p-3 bg-[#25D366]/20 rounded-full text-[#25D366]">
                  <MessageCircle className="w-8 h-8 fill-current animate-bounce" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif-brand font-bold text-xl text-amber-100">
                    Tenho Interesse Neste Imóvel
                  </h4>
                  <p className="text-xs text-amber-200/80">
                    Fale diretamente com Célia Leopolski pelo WhatsApp oficial para tirar dúvidas e agendar visita rápida.
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Conversar no WhatsApp
                </a>

                <div className="pt-2 border-t border-amber-900/60 text-[11px] text-amber-200/70 flex items-center justify-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Atendimento rápido: {DISPLAY_WHATSAPP}</span>
                </div>
              </div>

              {/* Schedule Visit Form */}
              <div className="bg-white p-6 rounded-2xl border border-[#E0D6C8] space-y-4">
                <h4 className="font-serif-brand font-bold text-base text-[#3E2723] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C5A059]" />
                  Agendar uma Visita Presencial
                </h4>

                {visitSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="text-xs font-bold text-emerald-900">Solicitação Enviada!</p>
                    <p className="text-[11px] text-emerald-700">
                      Abrindo atendimento no WhatsApp para confirmar seu horário...
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleVisitSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs text-[#5D4037] font-medium mb-1">Seu Nome Completo</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Carlos Silva"
                        value={visitForm.name}
                        onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#5D4037] font-medium mb-1">Seu WhatsApp</label>
                      <input
                        type="tel"
                        required
                        placeholder="(21) 99999-9999"
                        value={visitForm.phone}
                        onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#5D4037] font-medium mb-1">Data Preferencial</label>
                      <input
                        type="date"
                        required
                        value={visitForm.date}
                        onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#3E2723] hover:bg-[#2A1B14] text-white font-semibold text-xs py-3 rounded-xl transition-colors shadow"
                    >
                      Enviar Agendamento via WhatsApp
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
