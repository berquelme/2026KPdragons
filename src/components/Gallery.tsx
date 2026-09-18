import React from 'react';
import { PlayerCard } from './PlayerCard';
// import { LiveAnalysis } from './LiveAnalysis';
import { PlayerSpotlight } from './PlayerSpotlight';
import { players } from '../data/galleryNewData';
import { teamData } from '../data/teamData';

export const Gallery: React.FC = () => {
  return (
    <div className="space-y-24 animate-fade-up pb-24">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-red-50 px-4 py-1.5 rounded-full border border-red-100">
          <span className="text-[10px] font-black text-[#E53935] uppercase tracking-[0.3em]">
            {teamData.season}
          </span>
        </div>
        <h1 className="text-slate-900 text-6xl md:text-8xl font-normal font-kids leading-none uppercase">
          THE <span className="text-[#E53935]">ROSTER</span>
        </h1>
      </div>

      {/* Team photo */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-[60px] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 relative aspect-video flex items-center justify-center group">
          <img
          src="/Roster.jpg"
  alt={`${teamData.name} Team Photo`}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="text-white font-kids text-2xl uppercase tracking-widest drop-shadow-md">
              Team Photo {teamData.season}
            </span>
          </div>
        </div>
        <p className="text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase mt-8 text-center">
          {teamData.name} Squad · {teamData.homeFieldTitle || 'Home Complex'}
        </p>
      </div>

      {/* Interactive Player Spotlight Section */}
      <div className="px-4">
        <div className="max-w-5xl mx-auto overflow-hidden">
          <div className="mb-8 flex items-center justify-between px-2">
            <h3 className="font-kids text-3xl text-slate-900 uppercase">PLAYER SPOTLIGHT</h3>
            <div className="flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-red-700 text-[14px]">whatshot</span>
              <span className="text-[10px] font-black text-red-700 uppercase tracking-widest">Interactive</span>
            </div>
          </div>
          <div className="transform md:scale-95 origin-top transition-transform">
            <PlayerSpotlight />
          </div>
        </div>
      </div>

      {/* 
        SQUAD ANALYTICS (COMMENTED OUT FOR LATER USE)
        To re-enable: uncomment the LiveAnalysis import above and the block below.
      */}
      {/*
      <div className="px-4">
        <div className="max-w-5xl mx-auto overflow-hidden">
          <div className="mb-8 flex items-center justify-between px-2">
            <h3 className="font-kids text-3xl text-slate-900 uppercase">SQUAD ANALYTICS</h3>
            <div className="flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-red-700 text-[14px]">whatshot</span>
              <span className="text-[10px] font-black text-red-700 uppercase tracking-widest">Interactive</span>
            </div>
          </div>
          <div className="transform md:scale-95 origin-top transition-transform">
            <LiveAnalysis />
          </div>
        </div>
      </div>
      */}

      {/* Players Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          {/* Left: Section Title with Line */}
          <div className="flex items-center gap-4 flex-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#E53935] whitespace-nowrap">
              THE {teamData.shortName.toUpperCase()} SQUAD
            </span>
            <div className="h-[1px] bg-slate-200/80 w-full" />
          </div>

          {/* Right: Legend Pill */}
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-sm text-[10px] font-bold text-slate-500 self-start sm:self-auto shrink-0">
            <span className="flex items-center gap-1">
              <span className="text-slate-800 font-black">G</span> = Goals
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <span className="text-slate-800 font-black">A</span> = Assists
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <span className="text-slate-800 font-black">SV</span> = Saves
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <span className="text-slate-800 font-black">SPD</span> = Speed
            </span>
          </div>
        </div>

        {/* Players grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {players.map((player) => (
            <PlayerCard key={player.num} player={player} />
          ))}
        </div>
      </div>

      {/* Decorative Footer Detail */}
      <div className="text-center pt-12">
        <div className="w-12 h-12 bg-white rounded-full shadow-lg border-2 border-slate-100 mx-auto flex items-center justify-center">
          <span className="material-symbols-outlined text-[#E53935] text-[24px]">sports_soccer</span>
        </div>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mt-4">
          {teamData.slogan || 'One Team • One Roar'}
        </p>
      </div>
    </div>
  );
};

export default Gallery;