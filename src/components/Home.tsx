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
}

export const Home: React.FC<HomeProps> = ({ 
  onNavigate, 
  onOpenRoarModal,
  approvedRoars = [],
  pendingRoars = [],
  onApproveRoar,
  onRejectRoar
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
// import React from 'react';
// import { PageType, FanMessage } from '../types';
// import { FanZone } from './FanZone';
// import { PendingRoar } from '../App';
// import { teamData } from '../data/teamData';
// import { MATCHES_DATA } from '../data/matches';
// import { useCountdown } from '../hooks/useCountdown';

// interface HomeProps {
//   activePage?: PageType;
//   onNavigate: (page: PageType) => void;
//   onOpenRoarModal?: () => void;
//   approvedRoars?: FanMessage[];
//   pendingRoars?: PendingRoar[];
//   onApproveRoar?: (id: string) => void;
//   onRejectRoar?: (id: string) => void;
// }

// export const Home: React.FC<HomeProps> = ({ 
//   onNavigate, 
//   onOpenRoarModal,
//   approvedRoars = [],
//   pendingRoars = [],
//   onApproveRoar,
//   onRejectRoar
// }) => {
//   const now = new Date();
//   const nextMatch = MATCHES_DATA.find((m) => new Date(m.dateStr || '') >= now) || MATCHES_DATA[0];
//   const matchCountdown = useCountdown(nextMatch?.dateStr || '');

//   const formattedDate = nextMatch?.dateStr
//     ? new Intl.DateTimeFormat('en-US', {
//         weekday: 'short',
//         month: 'short',
//         day: 'numeric',
//       }).format(new Date(nextMatch.dateStr))
//     : nextMatch?.dateDisplay || 'Upcoming Match';

//   return (
//     <div className="animate-hero">
//       {/* Hero Content Area */}
//       <section className="relative w-full pt-10 md:pt-16 pb-12 px-4 md:px-8">
        
//         {/* Responsive 3-Element Hero Zone */}
//         <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 mb-10 md:mb-16">
          
//           {/* 1. Send Roar: ONLY shown on screens < xl (tablet/mobile). Hidden on desktop to avoid duplicating the navbar button */}
//           <div className="order-3 md:order-1 xl:hidden flex flex-col items-center justify-center w-full max-w-[240px]">
//             <button
//               type="button"
//               onClick={onOpenRoarModal}
//               className="w-full py-4 px-6 bg-gradient-to-r from-[#E53935] to-[#D32F2F] hover:from-[#D32F2F] hover:to-[#B71C1C] text-white font-black text-xs md:text-sm uppercase tracking-widest rounded-2xl md:rounded-3xl border-2 border-white/80 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer group"
//             >
//               <span className="material-symbols-outlined text-[24px] text-[#FFD54F] group-hover:scale-110 transition-transform">
//                 campaign
//               </span>
//               <span>Send Roar</span>
//             </button>
//             <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center hidden md:block">
//               Cheer on the team
//             </p>
//           </div>

//           {/* 2. Center Identity: Crest */}
//           <div className="order-1 md:order-2 flex flex-col items-center">
//             <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 flex items-center justify-center transition-transform hover:scale-105 duration-300 drop-shadow-2xl">
//               {teamData.mascotImage ? (
//                 <img
//                   src={teamData.mascotImage}
//                   alt={`${teamData.name} Crest`}
//                   className="w-full h-full object-contain"
//                 />
//               ) : (
//                 <div className="w-36 h-36 rounded-full bg-red-50 flex items-center justify-center border-4 border-white shadow-xl">
//                   <span className="material-symbols-outlined text-[80px] text-[#E53935]">
//                     sports_soccer
//                   </span>
//                 </div>
//               )}
//             </div>
            
//             {/* Gold Accent Badge */}
//             <div className="mt-2 bg-[#FFD54F] px-5 md:px-7 py-1.5 rounded-full border-2 border-white shadow-md z-20">
//               <span className="text-[11px] md:text-[13px] font-black text-[#E53935] uppercase tracking-widest whitespace-nowrap">
//                 {teamData.mascot} {teamData.ageGroup}
//               </span>
//             </div>
//           </div>

//           {/* 3. Right Action: Next Match Countdown (Only visible on screens < xl) */}
//           {nextMatch && (
//             <div className="order-2 md:order-3 block xl:hidden w-full max-w-[270px]">
//               <div className="bg-[#E53935] rounded-[32px] p-5 text-white shadow-xl shadow-red-500/20 border border-red-400/30">
//                 <span className="text-[10px] font-black text-yellow-300 uppercase tracking-widest mb-1 block text-left">
//                   Next Match
//                 </span>
//                 <h4 className="font-impact text-xl uppercase text-white truncate text-left mb-0.5">
//                   vs {nextMatch.opponent}
//                 </h4>
//                 <p className="text-white/80 text-xs font-medium mb-3 italic text-left">
//                   {formattedDate} @ {nextMatch.timeDisplay}
//                 </p>

//                 {/* Scoreboard Countdown */}
//                 <div className="mb-3 bg-gradient-to-b from-black/40 to-black/20 rounded-2xl p-2.5 backdrop-blur-md border border-white/15 shadow-inner">
//                   <div className="flex items-center justify-between mb-2 px-1">
//                     <span className="text-[9px] font-black uppercase tracking-widest text-[#FFCA28] flex items-center gap-1">
//                       <span className="material-symbols-outlined text-[13px] text-amber-400">local_fire_department</span>
//                       Countdown
//                     </span>
//                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
//                   </div>

//                   {matchCountdown.isExpired ? (
//                     <p className="text-center text-xs font-black uppercase tracking-wider text-[#FFCA28] py-1">
//                       Match Underway!
//                     </p>
//                   ) : (
//                     <div className="grid grid-cols-4 gap-1 text-center">
//                       <div className="bg-white border-2 border-[#FFCA28] rounded-xl py-1.5 shadow-sm">
//                         <span className="block font-impact text-lg leading-tight text-slate-950">
//                           {matchCountdown.days}
//                         </span>
//                         <span className="text-[7px] font-black uppercase tracking-wider text-[#E53935]">
//                           Days
//                         </span>
//                       </div>
//                       <div className="bg-white border-2 border-[#FFCA28] rounded-xl py-1.5 shadow-sm">
//                         <span className="block font-impact text-lg leading-tight text-slate-950">
//                           {matchCountdown.hours}
//                         </span>
//                         <span className="text-[7px] font-black uppercase tracking-wider text-[#E53935]">
//                           Hrs
//                         </span>
//                       </div>
//                       <div className="bg-white border-2 border-[#FFCA28] rounded-xl py-1.5 shadow-sm">
//                         <span className="block font-impact text-lg leading-tight text-slate-950">
//                           {matchCountdown.minutes}
//                         </span>
//                         <span className="text-[7px] font-black uppercase tracking-wider text-[#E53935]">
//                           Min
//                         </span>
//                       </div>
//                       <div className="bg-white border-2 border-[#FFCA28] rounded-xl py-1.5 shadow-sm">
//                         <span className="block font-impact text-lg leading-tight text-slate-950">
//                           {matchCountdown.seconds}
//                         </span>
//                         <span className="text-[7px] font-black uppercase tracking-wider text-[#E53935]">
//                           Sec
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <button 
//                   type="button"
//                   onClick={() => onNavigate('MATCHES')}
//                   className="w-full py-2 bg-[#FFCA28] text-[#E53935] rounded-full border-2 border-white font-black text-[10px] uppercase tracking-wider hover:brightness-105 transition-all shadow-md cursor-pointer"
//                 >
//                   Match Schedule
//                 </button>
//               </div>
//             </div>
//           )}

//         </div>

//         {/* Sponsor / Team Headline */}
//         <div className="mt-4 text-center max-w-2xl mx-auto">
//           <h1 className="font-kids text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none uppercase tracking-tight whitespace-nowrap">
//             <span className="text-[#E53935]">KNAPP</span>{' '}
//             <span className="text-slate-900">&amp;</span>{' '}
//             <span className="text-[#E53935]">SCHLAPPI</span>
//           </h1>
//           <p className="mt-4 text-slate-500 font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
//             {teamData.heroSubtitle}
//           </p>
//           <div className="h-1.5 w-24 bg-[#FFD54F] mx-auto mt-6 rounded-full" />
//         </div>

//         {/* Hero Slogan Card with Action Photo */}
//         <div className="max-w-4xl mx-auto mt-10 md:mt-14">
//           <div className="relative rounded-[32px] md:rounded-[48px] overflow-hidden shadow-xl border-4 border-white/80 bg-slate-900 p-8 md:p-14 text-center group">
//             <img
//               src={teamData.heroImage || '/soccerGame.jpg'}
//               alt={`${teamData.mascot} Match Action`}
//               className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
//             <div className="relative z-10">
//               <h2 className="text-white font-impact text-4xl md:text-7xl drop-shadow-lg leading-tight uppercase">
//                 {teamData.heroHeadlineTop}<br/>
//                 <span className="text-[#FFD54F]">{teamData.heroHeadlineBottom}</span>
//               </h2>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Fan Zone Integration */}
//       <section id="fanzone-section" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-28">
//         <div className="mb-10 flex items-center gap-6">
//           <div className="h-0.5 flex-1 bg-[#FFD54F]/30" />
//           <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em]">
//             {teamData.shortName} Roars Zone
//           </span>
//           <div className="h-0.5 flex-1 bg-[#FFD54F]/30" />
//         </div>
//         <FanZone 
//           onOpenRoarModal={onOpenRoarModal}
//           messages={approvedRoars}
//           pendingRoars={pendingRoars}
//           onApproveRoar={onApproveRoar}
//           onRejectRoar={onRejectRoar}
//         />
//       </section>

//       {/* Sub-features / Quick Action Cards */}
//       <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
//         {[
//           { 
//             title: teamData.homeFieldTitle || 'Home Pitch', 
//             icon: 'stadium', 
//             color: '#E53935', 
//             desc: teamData.homeFieldDesc || 'Join us for training and weekend matches.',
//             target: 'MATCHES' as PageType
//           },
//           { 
//             title: teamData.trainingTitle || 'Training Sessions', 
//             icon: 'fitness_center', 
//             color: '#FFD54F', 
//             desc: teamData.trainingDesc || 'Sharpening skills and teamwork every week.',
//             target: 'TRAINING' as PageType
//           },
//         ].map((item, i) => (
//           <button 
//             key={i} 
//             type="button"
//             onClick={() => onNavigate(item.target)}
//             className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-[40px] shadow-sm border border-white flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
//           >
//             <div 
//               className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
//               style={{ backgroundColor: `${item.color}20` }}
//             >
//               <span className="material-symbols-outlined text-[40px]" style={{ color: item.color }}>
//                 {item.icon}
//               </span>
//             </div>
//             <h3 className="font-kids text-2xl md:text-3xl text-slate-900 mb-3">{item.title}</h3>
//             <p className="text-slate-500 leading-relaxed font-medium italic mb-4">"{item.desc}"</p>
//             <span className="text-[10px] font-black uppercase tracking-widest text-[#E53935] flex items-center gap-1 group-hover:gap-2 transition-all">
//               View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
//             </span>
//           </button>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default Home;
