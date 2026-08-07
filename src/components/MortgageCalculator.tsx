import React, { useState } from 'react';
import { getWhatsAppUrl, formatCurrencyBRL } from '../utils/whatsapp';
import { X, Calculator, DollarSign, Calendar, Percent, MessageCircle, Info } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice?: number;
  onClose: () => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  initialPrice = 500000,
  onClose
}) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [termYears, setTermYears] = useState<number>(30);
  const [annualRate, setAnnualRate] = useState<number>(10.2); // Caixa / Itaú market average

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;

  // Monthly interest rate calculation
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const totalMonths = termYears * 12;

  // PRICE amortization monthly installment formula: PMT = P * [i(1+i)^n] / [(1+i)^n - 1]
  const monthlyInstallment = totalMonths > 0 && monthlyRate > 0
    ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : 0;

  const handleSendWhatsAppSimulation = () => {
    const msg = `Olá, C. Leopolski Corretora! Realizei uma simulação de financiamento no site:\n\n- Valor do Imóvel: ${formatCurrencyBRL(propertyPrice)}\n- Entrada (20%+): ${formatCurrencyBRL(downPaymentAmount)} (${downPaymentPercent}%)\n- Valor a Financiar: ${formatCurrencyBRL(loanAmount)}\n- Prazo: ${termYears} anos (${totalMonths} parcelas)\n- Parcela Estimada: ~${formatCurrencyBRL(monthlyInstallment)}/mês\n\nGostaria de uma análise formal da minha capacidade de crédito com os bancos!`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E0D6C8] w-full max-w-2xl overflow-hidden relative flex flex-col my-auto">
        
        {/* Header */}
        <div className="bg-[#3E2723] text-white px-6 py-4 flex items-center justify-between border-b border-[#C5A059]/40">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif-brand font-bold text-lg text-amber-100">
              Simulador de Financiamento Imobiliário
            </h3>
          </div>
          <button onClick={onClose} className="text-amber-200/80 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Controls */}
        <div className="p-6 space-y-6">
          
          {/* Property Price */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-[#5D4037] mb-1">
              <span>Valor do Imóvel</span>
              <span className="text-[#3E2723] font-bold text-sm">{formatCurrencyBRL(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={100000}
              max={2500000}
              step={10000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-[#C5A059]"
            />
          </div>

          {/* Down Payment Percent */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-[#5D4037] mb-1">
              <span>Entrada ({downPaymentPercent}%)</span>
              <span className="text-[#3E2723] font-bold text-sm">{formatCurrencyBRL(downPaymentAmount)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#C5A059]"
            />
          </div>

          {/* Term Years & Interest Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5D4037] mb-1">Prazo de Financiamento</label>
              <select
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              >
                <option value={10}>10 Anos (120 meses)</option>
                <option value={15}>15 Anos (180 meses)</option>
                <option value={20}>20 Anos (240 meses)</option>
                <option value={25}>25 Anos (300 meses)</option>
                <option value={30}>30 Anos (360 meses)</option>
                <option value={35}>35 Anos (420 meses)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5D4037] mb-1">Taxa de Juros Anual Estimada</label>
              <select
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              >
                <option value={9.5}>9.5% a.a. (Caixa Econômica - Pró-Cotista)</option>
                <option value={10.2}>10.2% a.a. (Caixa / SBPE Tradicional)</option>
                <option value={10.8}>10.8% a.a. (Itaú / Bradesco / Santander)</option>
              </select>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-white p-5 rounded-2xl border border-[#E0D6C8] shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">Resultado da Simulação</h4>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E6DFD5]">
                <span className="text-[11px] text-[#8D6E63] block font-medium">Valor Financiado</span>
                <span className="text-base font-bold text-[#3E2723]">{formatCurrencyBRL(loanAmount)}</span>
              </div>
              <div className="bg-[#3E2723] text-white p-3 rounded-xl border border-[#C5A059]">
                <span className="text-[11px] text-amber-200 block font-medium">1ª Parcela Estimada</span>
                <span className="text-lg font-serif-brand font-bold text-white">{formatCurrencyBRL(monthlyInstallment)}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#8D6E63] flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              Valores aproximados baseados na Tabela PRICE. Sujeito à análise de crédito do banco emissor.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSendWhatsAppSimulation}
            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            Enviar Simulação para a Corretora no WhatsApp
          </button>

        </div>
      </div>
    </div>
  );
};
