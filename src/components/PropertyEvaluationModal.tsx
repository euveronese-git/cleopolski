import React, { useState } from 'react';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { X, Building, MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface PropertyEvaluationModalProps {
  onClose: () => void;
}

export const PropertyEvaluationModal: React.FC<PropertyEvaluationModalProps> = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    intent: 'venda',
    propertyType: 'casa',
    neighborhood: 'Campo Grande',
    address: '',
    expectedPrice: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = `Olá, C. Leopolski Corretora! Gostaria de cadastrar/avaliar meu imóvel para ${form.intent.toUpperCase()}:\n\n- Nome: ${form.name}\n- Telefone: ${form.phone}\n- Tipo: ${form.propertyType}\n- Endereço/Bairro: ${form.address}, ${form.neighborhood}\n- Pretensão de Valor: R$ ${form.expectedPrice || 'A avaliar'}\n- Detalhes: ${form.notes || 'Nenhum'}`;
    setTimeout(() => {
      window.open(getWhatsAppUrl(msg), '_blank');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E0D6C8] w-full max-w-xl overflow-hidden relative flex flex-col my-auto">
        
        {/* Modal Header */}
        <div className="bg-[#3E2723] text-white px-6 py-4 flex items-center justify-between border-b border-[#C5A059]/40">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif-brand font-bold text-lg text-amber-100">
              Anuncie seu Imóvel em Campo Grande
            </h3>
          </div>
          <button onClick={onClose} className="text-amber-200/80 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-[#5D4037] leading-relaxed">
            Quer vender ou alugar seu imóvel na Zona Oeste com rapidez, fotos profissionais e total segurança jurídica? Preencha os dados abaixo para falar com Célia Leopolski.
          </p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-serif-brand font-bold text-lg text-emerald-900">Solicitação Enviada com Sucesso!</h4>
              <p className="text-xs text-emerald-700">
                Estamos te redirecionando para o WhatsApp oficial para iniciar a avaliação do seu imóvel.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#5D4037] mb-1">Seu Nome Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Roberto Alves"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5D4037] mb-1">Seu WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="(21) 99999-9999"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#5D4037] mb-1">Objetivo</label>
                  <select
                    value={form.intent}
                    onChange={(e) => setForm({ ...form, intent: e.target.value })}
                    className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  >
                    <option value="venda">Vender meu imóvel</option>
                    <option value="aluguel">Alugar meu imóvel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5D4037] mb-1">Tipo de Imóvel</label>
                  <select
                    value={form.propertyType}
                    onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                    className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  >
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="cobertura">Cobertura</option>
                    <option value="comercial">Sala Comercial</option>
                    <option value="terreno">Terreno</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5D4037] mb-1">Endereço / Bairro em Campo Grande</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Estrada das Capoeiras, nº 563 - Campo Grande"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5D4037] mb-1">Pretensão de Valor (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: R$ 450.000"
                  value={form.expectedPrice}
                  onChange={(e) => setForm({ ...form, expectedPrice: e.target.value })}
                  className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-[#EFE9E0] rounded-xl text-[11px] text-[#5D4037]">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Avaliação com sigilo, seriedade e conformidade com o CRECI/RJ.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Solicitar Avaliação no WhatsApp
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
