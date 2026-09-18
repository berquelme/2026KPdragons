import React, { useState } from 'react';
import { spotlightPlayers, FifaAttribute } from '../data/spotlightData';
import { getOverallRating } from '../utils/overallStats';

export const PlayerSpotlight: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStat, setSelectedStat] = useState<FifaAttribute | null>(null);

  const player = spotlightPlayers[currentIndex];
  const overallRating = getOverallRating(player);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? spotlightPlayers.length - 1 : prev - 1));
    setSelectedStat(null);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === spotlightPlayers.length - 1 ? 0 : prev + 1));
    setSelectedStat(null);
  };

  const handleSelectStat = (statItem: FifaAttribute) => {
    setSelectedStat((prev) => (prev?.code === statItem.code ? null : statItem));
  };

  if (!player) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 rounded-[40px] bg-slate-950 border-2 border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.15)] text-white">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Player Card Poster & Controls */}
        <div className="md:col-span-5 flex flex-col items-center">
          {/* Card Poster */}
          <div className="relative w-full aspect-[3/4] max-w-[280px] rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-gradient-to-b from-[#E53935]/30 via-slate-900 to-black flex flex-col justify-between p-4">
            
            {/* Top Left Badge: Overall Rating */}
             <div className="absolute top-4 left-4 z-10">
  <div className="w-14 h-14 rounded-full bg-black/30 border-2 border-amber-400/80 shadow-[0_0_12px_rgba(251,191,36,0.35)] backdrop-blur-sm flex flex-col items-center justify-center">
    <span className="font-impact text-2xl text-amber-400 leading-none drop-shadow-sm">
      {overallRating}
    </span>
    <span className="text-[7px] font-black uppercase text-amber-300 tracking-widest leading-none mt-0.5">
      OVR
    </span>
  </div>
                </div>

            {/* Cutout or Fallback Icon */}
            <div className="relative w-full flex-1 flex items-center justify-center my-auto pt-6">
              {player.img ? (
                <img 
                  src={player.img} 
                  alt={player.name} 
                  className="max-h-56 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-28 h-28 rounded-full border-2 border-amber-400/40 bg-amber-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-400 text-6xl">
                    sports_soccer
                  </span>
                </div>
              )}
            </div>

            {/* Lower Center: Name with Position directly beneath */}
            <div className="w-full text-center pb-1 flex flex-col items-center justify-center">
              <span className="font-impact text-3xl tracking-wider text-white uppercase drop-shadow-md leading-tight">
                {player.name}
              </span>
              <span className="font-kids tracking-[0.25em] text-xs text-amber-400 uppercase mt-0.5">
                {player.role}
              </span>
            </div>
          </div>

          {/* Player Switcher */}
          <div className="w-full max-w-[280px] mt-4 p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-center gap-3">
              <span className="font-impact text-2xl text-cyan-400">
                {player.num}
              </span>
              <div className="text-left">
                <span className="font-impact text-sm uppercase tracking-wider block leading-none">
                  {player.name} {player.lastName}
                </span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  {player.role}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <button 
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-cyan-400/50 flex items-center justify-center hover:bg-cyan-500/20 text-cyan-400 transition-colors cursor-pointer"
                aria-label="Previous Player"
              >
                &lt;
              </button>
              <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                {currentIndex + 1} / {spotlightPlayers.length}
              </span>
              <button 
                type="button"
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-cyan-400/50 flex items-center justify-center hover:bg-cyan-500/20 text-cyan-400 transition-colors cursor-pointer"
                aria-label="Next Player"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Authentic FIFA Attributes */}
        <div className="md:col-span-7 flex flex-col justify-center gap-3">
          <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-impact text-xs tracking-[0.25em] text-white uppercase">
                PLAYER STATS
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-impact text-[11px] tracking-wider">
                OVR {overallRating}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">
              Tap stat for detail
            </span>
          </div>

          <div className="space-y-3">
            {player.stats.map((item) => {
              const isActive = selectedStat?.code === item.code;

              return (
                <div 
                  key={item.code}
                  onClick={() => handleSelectStat(item)}
                  className={`p-2.5 rounded-2xl cursor-pointer transition-all border ${
                    isActive 
                      ? 'bg-slate-900 border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                      : 'bg-transparent border-transparent hover:bg-slate-900/50 hover:border-slate-800'
                  }`}
                >
                  {/* Stat Header Row */}
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-black text-amber-400 text-sm tracking-wider w-8">{item.code}</span>
                      <span className="text-slate-600 text-sm">|</span>
                      <span className="font-bold text-slate-100 text-sm tracking-wide">{item.label}</span>
                    </div>

                    <span className="text-xs italic text-slate-400 truncate text-right flex-1 px-3">
                      "{item.quote}"
                    </span>

                    <span className="px-2.5 py-0.5 rounded-md bg-slate-900/90 border border-amber-400/40 font-impact text-amber-400 text-sm shrink-0 shadow-[0_0_6px_rgba(251,191,36,0.15)]">
                      {item.value}
                        </span>
                  </div>

                  {/* 30-Tick Dashed Segments */}
                  <div className="flex items-center gap-[2px] w-full">
                    {Array.from({ length: 30 }).map((_, stepIdx) => {
                      const threshold = (stepIdx + 1) * (100 / 30);
                      const isFilled = item.value >= threshold;

                      return (
                        <div
                          key={stepIdx}
                          className={`h-1.5 flex-1 rounded-[0.5px] transition-colors duration-200 ${
                            isFilled
                              ? stepIdx >= 25
                                ? 'bg-emerald-400 shadow-[0_0_3px_rgba(52,211,153,0.8)]'
                                : stepIdx >= 19
                                ? 'bg-amber-400 shadow-[0_0_3px_rgba(251,191,36,0.7)]'
                                : 'bg-[#E53935] shadow-[0_0_3px_rgba(229,57,53,0.7)]'
                              : 'bg-slate-800/70'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stat Detail Drawer */}
          {selectedStat && (
            <div className="mt-2 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs animate-in fade-in duration-200">
              <span className="font-bold text-cyan-300 mr-2 uppercase">
                {selectedStat.label}:
              </span>
              <span className="text-slate-300">
                {selectedStat.description}
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PlayerSpotlight;