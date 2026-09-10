import React from 'react';

export const DragonBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Base Gradient: Sky fading into Grass via Cream */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E3F2FD] via-[#FFFDE7] to-[#E8F5E9]" />
      
      {/* 2. Soft Golden Sun Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-radial-gradient from-[#FFD54F]/20 to-transparent blur-[120px]" />

      <style>{`
        .bg-radial-gradient {
          background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%);
        }
      `}</style>
    </div>
  );
};