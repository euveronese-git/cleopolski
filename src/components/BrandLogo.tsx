import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', variant = 'dark' }) => {
  const isLight = variant === 'light';
  
  const titleColor = isLight ? 'text-amber-100' : 'text-[#3E2723]';
  const subTitleColor = isLight ? 'text-amber-200/90' : 'text-[#5D4037]';
  const iconColor = isLight ? '#D4AF37' : '#C5A059';
  const strokeColor = isLight ? '#FAF7F2' : '#3E2723';
  const dividerBg = isLight ? 'bg-[#C5A059]' : 'bg-[#C5A059]';

  return (
    <div className={`flex flex-col items-center justify-center cursor-pointer select-none group ${className}`}>
      {/* Icon: Urban building silhouettes + Central house roof */}
      <div className="relative mb-1 w-12 h-10 flex items-end justify-center">
        <svg
          viewBox="0 0 100 80"
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Urban Buildings Silhouettes */}
          <path
            d="M15 80 V35 H28 V80 M72 80 V25 H85 V80"
            fill={iconColor}
            opacity="0.45"
          />
          {/* Building Window grid details */}
          <rect x="18" y="40" width="3" height="4" fill={strokeColor} opacity="0.6" />
          <rect x="23" y="40" width="3" height="4" fill={strokeColor} opacity="0.6" />
          <rect x="18" y="48" width="3" height="4" fill={strokeColor} opacity="0.6" />
          <rect x="23" y="48" width="3" height="4" fill={strokeColor} opacity="0.6" />

          <rect x="75" y="30" width="3" height="4" fill={strokeColor} opacity="0.6" />
          <rect x="80" y="30" width="3" height="4" fill={strokeColor} opacity="0.6" />
          <rect x="75" y="38" width="3" height="4" fill={strokeColor} opacity="0.6" />
          <rect x="80" y="38" width="3" height="4" fill={strokeColor} opacity="0.6" />

          {/* Central Modern House Roof & Structure */}
          <path
            d="M50 10 L24 36 H32 V78 H68 V36 H76 Z"
            fill={iconColor}
          />
          {/* House Roof Accent line */}
          <path
            d="M50 5 L20 34 H26 L50 11 L74 34 H80 Z"
            fill={strokeColor}
          />
          {/* Central Doorway / Arch */}
          <path
            d="M44 78 V54 C44 50.7 46.7 48 50 48 C53.3 48 56 50.7 56 54 V78 Z"
            fill={strokeColor}
          />
        </svg>
      </div>

      {/* Main Name: CÉLIA LEOPOLSKI */}
      <h1 className={`font-serif-brand font-bold tracking-[0.18em] text-lg sm:text-xl uppercase leading-none ${titleColor}`}>
        Célia Leopolski
      </h1>

      {/* Thin Gold Horizontal Divider */}
      <div className={`w-36 h-[1.5px] my-1.5 ${dividerBg}`} />

      {/* Subtitle: CORRETORA DE IMÓVEIS */}
      <span className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase ${subTitleColor}`}>
        Corretora de Imóveis
      </span>
    </div>
  );
};
