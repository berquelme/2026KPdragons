import React from 'react';
import { PageType, FanMessage } from '../types';
import { FanZone } from './FanZone';
import { PendingRoar } from '../App';
import { teamData } from '../data/teamData';
import { NextMatchWidget } from './NextMatchWidget';

interface HomeProps {
  activePage?: PageType;
  onNavigate: (page: PageType) => void;
  onOpenRoarModal?: () => void;
  approvedRoars?: FanMessage[];
  pendingRoars?: PendingRoar[];
  onApproveRoar?: (id: string) => void;
  onRejectRoar?: (id: string) => void;
  onDeleteRoar?: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  onNavigate, 
  onOpenRoarModal,
  approvedRoars = [],
  pendingRoars = [],
  onApproveRoar,
  onRejectRoar,
  onDeleteRoar,
}) => {
  return (
    <div className="animate-hero">
      {/* Hero Content Area */}
      <section className="relative w-full pt-10 md:pt-16 pb-12 px-4 md:px-8">
        
        {/* Responsive 3-Element Hero Zone */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 mb-10 md:mb-16">
          
          {/* 1. Left Action: Send Roar (Only visible on screens < xl, flips to bottom on mobile) */}
          <div className="order-3 md:order-1 xl:hidden flex flex-col items-center justify-center w-full max-w-[240px]">
            <button
              type="button"
              onClick={onOpenRoarModal}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#E53935] to-[#D32F2F] hover:from-[#D32F2F] hover:to-[#B71C1C] text-white font-black text-xs md:text-sm uppercase tracking-widest rounded-2xl md:rounded-3xl border-2 border-white/80 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[24px] text-[#FFD54F] group-hover:scale-110 transition-transform">
                campaign
              </span>
              <span>Send Roar</span>
            </button>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center hidden md:block">
              Cheer on the team
            </p>
          </div>

          {/* 2. Center Identity: Crest Mascot */}
          <div className="order-1 md:order-2 flex flex-col items-center">
            <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 flex items-center justify-center transition-transform hover:scale-105 duration-300 drop-shadow-2xl">
              {teamData.mascotImage ? (
                <img
                  src={teamData.mascotImage}
                  alt={`${teamData.name} Crest`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-36 h-36 rounded-full bg-red-50 flex items-center justify-center border-4 border-white shadow-xl">
                  <span className="material-symbols-outlined text-[80px] text-[#E53935]">
                    sports_soccer
                  </span>
                </div>
              )}
            </div>
            
            {/* Gold Accent Badge */}
            <div className="mt-2 bg-[#FFD54F] px-5 md:px-7 py-1.5 rounded-full border-2 border-white shadow-md z-20">
              <span className="text-[11px] md:text-[13px] font-black text-[#E53935] uppercase tracking-widest whitespace-nowrap">
                {teamData.mascot} {teamData.ageGroup}
              </span>
            </div>
          </div>

          {/* 3. Right Action: Next Match Countdown Widget */}
          <div className="order-2 md:order-3 block xl:hidden w-full max-w-[270px]">
            <NextMatchWidget onNavigate={onNavigate} />
          </div>

        </div>

        {/* Sponsor / Team Headline */}
        <div className="mt-4 text-center max-w-2xl mx-auto">
          <h1 className="font-kids text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none uppercase tracking-tight whitespace-nowrap">
            <span className="text-[#E53935]">KNAPP</span>{' '}
            <span className="text-slate-900">&amp;</span>{' '}
            <span className="text-[#E53935]">SCHLAPPI</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
            {teamData.heroSubtitle}
          </p>
          <div className="h-1.5 w-24 bg-[#FFD54F] mx-auto mt-6 rounded-full" />
        </div>

        {/* Hero Slogan Card with Action Photo */}
        <div className="max-w-4xl mx-auto mt-10 md:mt-14">
          <div className="relative rounded-[32px] md:rounded-[48px] overflow-hidden shadow-xl border-4 border-white/80 bg-slate-900 p-8 md:p-14 text-center group">
            <img
              src={teamData.heroImage || '/soccerGame.jpg'}
              alt={`${teamData.mascot} Match Action`}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-white font-impact text-4xl md:text-7xl drop-shadow-lg leading-tight uppercase">
                {teamData.heroHeadlineTop}<br/>
                <span className="text-[#FFD54F]">{teamData.heroHeadlineBottom}</span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Fan Zone Integration */}
      <section id="fanzone-section" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-28">
        <div className="mb-10 flex items-center gap-6">
          <div className="h-0.5 flex-1 bg-[#FFD54F]/30" />
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em]">
            {teamData.shortName} Roars Zone
          </span>
          <div className="h-0.5 flex-1 bg-[#FFD54F]/30" />
        </div>
        <FanZone 
          onOpenRoarModal={onOpenRoarModal}
          messages={approvedRoars}
          pendingRoars={pendingRoars}
          onApproveRoar={onApproveRoar}
          onRejectRoar={onRejectRoar}
          onDeleteRoar={onDeleteRoar}
        />
      </section>

      {/* Sub-features / Quick Action Cards */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { 
            title: teamData.homeFieldTitle || 'Home Pitch', 
            icon: 'stadium', 
            color: '#E53935', 
            desc: teamData.homeFieldDesc || 'Join us for training and weekend matches.',
            target: 'MATCHES' as PageType
          },
          { 
            title: teamData.trainingTitle || 'Training Sessions', 
            icon: 'fitness_center', 
            color: '#FFD54F', 
            desc: teamData.trainingDesc || 'Sharpening skills and teamwork every week.',
            target: 'TRAINING' as PageType
          },
        ].map((item, i) => (
          <button 
            key={i} 
            type="button"
            onClick={() => onNavigate(item.target)}
            className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-[40px] shadow-sm border border-white flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div 
              className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <span className="material-symbols-outlined text-[40px]" style={{ color: item.color }}>
                {item.icon}
              </span>
            </div>
            <h3 className="font-kids text-2xl md:text-3xl text-slate-900 mb-3">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium italic mb-4">"{item.desc}"</p>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#E53935] flex items-center gap-1 group-hover:gap-2 transition-all">
              View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </button>
        ))}
      </section>
    </div>
  );
};

export default Home;