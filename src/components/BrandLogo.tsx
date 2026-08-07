import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', variant = 'dark' }) => {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center justify-center cursor-pointer select-none ${className}`}>
      <img
        src="/brand/logo-celia-leopolski.png"
        alt="Célia Leopolski — Corretora de Imóveis"
        className={`w-auto object-contain transition-transform duration-300 hover:scale-[1.02] ${
          isLight ? 'h-28 sm:h-32' : 'h-20 sm:h-24'
        }`}
      />
    </div>
  );
};
