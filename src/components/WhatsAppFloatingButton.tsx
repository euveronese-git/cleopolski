import React, { useState, useEffect } from 'react';
import { getWhatsAppUrl, DISPLAY_WHATSAPP } from '../utils/whatsapp';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Hide tooltip after 8 seconds automatically
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="bg-[#3E2723] text-white px-3.5 py-2 rounded-2xl shadow-xl border border-[#C5A059] flex items-center gap-2 animate-fadeIn max-w-[220px]">
          <div className="text-[11px] leading-tight">
            <span className="font-bold block text-amber-200">Atendimento Imobiliário</span>
            <span className="text-amber-100/90">Fale direto pelo WhatsApp</span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-amber-300 hover:text-white p-0.5 rounded-full"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppUrl('Olá! Gostaria de falar no WhatsApp com a C. Leopolski Corretora de Imóveis.')}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110 animate-whatsapp-pulse group"
        aria-label="Contato via WhatsApp"
        title={`Falar no WhatsApp (${DISPLAY_WHATSAPP})`}
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        {/* Active Online Indicator */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full" />
      </a>
    </div>
  );
};
