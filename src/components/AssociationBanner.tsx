import React from 'react';

export const AssociationBanner: React.FC = () => {
  const tickerItems = (
    <>
      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/25 border border-white/20 text-[#FFD54F]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD54F] animate-ping" />
        Yates County Youth Soccer League  • Penn Yan, NY
      </span>
      <span className="text-[#FFD54F]">New York State Youth Soccer</span>
      <span className="text-white/95 font-medium normal-case tracking-wide text-xs">
        Guiding young players in fundamentals, prioritizing safety through play, and sparking a lifelong love for the beautiful game
      </span>
      <span className="inline-flex items-center gap-1 text-white">
        <span className="material-symbols-outlined text-[14px] text-[#FFD54F]">sports_soccer</span>
        2026 Fall Season Underway
      </span>
      <span className="text-white/75">Baby Dragons U8 • Red-Fire Kits Active</span>
    </>
  );

  return (
    <div 
      className="w-full bg-[#E53935] border-b border-black/20 select-none shadow-sm h-10 relative overflow-hidden"
      style={{ contain: 'paint' }}
    >
      {/* Soft Vignette Edge Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#E53935] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#E53935] to-transparent z-10 pointer-events-none" />

      {/* Absolutely contained viewport window so it CANNOT expand parent flex width */}
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker-slow will-change-transform">
          <div className="flex items-center gap-x-10 px-6 shrink-0 text-white text-[11px] font-black uppercase tracking-[0.18em]">
            {tickerItems}
          </div>
          <div aria-hidden="true" className="flex items-center gap-x-10 px-6 shrink-0 text-white text-[11px] font-black uppercase tracking-[0.18em]">
            {tickerItems}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ticker-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-ticker-slow {
          display: flex;
          width: max-content;
          animation: ticker-marquee 65s linear infinite;
        }
        .animate-ticker-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AssociationBanner;