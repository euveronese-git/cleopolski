import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', variant = 'dark' }) => {
  const isLight = variant === 'light';

  return (
    <div
      className={`flex items-center justify-center cursor-pointer select-none ${
        isLight ? 'rounded-lg bg-white p-2 shadow-sm' : ''
      } ${className}`}
    >
      <img
        src="/brand/logo-celia-leopolski.png"
        alt="Célia Leopolski — Corretora de Imóveis"
        className={`w-auto object-contain transition-transform duration-300 hover:scale-[1.02] ${
          isLight ? 'h-16 sm:h-20' : 'h-12 sm:h-14'
        }`}
      />
    </div>
  );
};
