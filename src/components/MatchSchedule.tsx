import React, { useState, useRef, useEffect } from 'react';
import { PageType } from '../types';
import { MATCHES_DATA } from '../data/matches';
import { players } from '../data/galleryNewData';

interface MatchScheduleProps {
  onNavigate?: (page: PageType) => void;
}

export const MatchSchedule: React.FC<MatchScheduleProps> = () => {
  const [openRosterId, setOpenRosterId] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const now = new Date();

  // Close roster popup when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setOpenRosterId(null);
      }
    };
    if (openRosterId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openRosterId]);

  return (
    <div className="space-y-6 animate-hero pb-12">
      {/* Title Header */}
      <div className="border-l-4 border-[#E53935] pl-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-kids text-5xl md:text-7xl font-semibold text-slate-800 tracking-wide uppercase leading-none">
            BATTLE MAP
          </h1>
          <p className="text-slate-500 italic text-base md:text-lg font-medium mt-3">
            The home grounds of legends at the Penn Yan Complex.
          </p>
        </div>
        <div>
          <span className="bg-white border border-slate-200 text-[#E53935] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            AUTUMN 2026
          </span>
        </div>
      </div>

      {/* Match Cards */}
      <div className="space-y-6">
        {MATCHES_DATA.map((match) => {
        const isPast = new Date(match.dateStr || '') < now;
        const isFriday = (match.dateDisplay || '').toUpperCase().includes('FRIDAY');
          const isRosterOpen = openRosterId === Number(match.id);

          return (
            <div
              key={match.id}
              className={`relative flex rounded-[32px] shadow-sm border-4 border-white transition-all ${
                isFriday ? 'bg-[#14181F] text-white' : 'bg-[#FFFDE7]/90 text-slate-900'
              }`}
            >
              {/* Left Tab with Clean Stacked Letters */}
              <div
                className={`w-14 rounded-l-[28px] flex flex-col items-center justify-center py-6 select-none shrink-0 ${
                  isFriday ? 'bg-[#FFD54F] text-slate-900' : 'bg-[#E53935] text-white'
                }`}
              >
                <div className="flex flex-col items-center text-[9px] font-black leading-tight tracking-wider mb-3">
                  <span>W</span>
                  <span>E</span>
                  <span>E</span>
                  <span>K</span>
                </div>
                <span className="font-kids font-semibold text-3xl leading-none">
                  {match.week}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative">
                {/* Weather Pill */}
                <div
                  className={`absolute -top-3 right-8 w-8 h-8 rounded-2xl border-2 border-white shadow flex items-center justify-center ${
                    isFriday ? 'bg-[#5C6BC0] text-white' : 'bg-[#FFD54F] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isFriday ? 'bedtime' : 'sunny'}
                  </span>
                </div>

                {/* Top Row: Date, Time & Roster */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#FFD54F] text-slate-900 text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                      {match.dateDisplay}
                    </span>
                    <span className="bg-[#E53935] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {match.timeDisplay}
                    </span>
                  </div>

                  {/* Roster Button & Popover */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenRosterId(isRosterOpen ? null : Number(match.id))}
                      className="bg-[#0B1728] hover:bg-slate-800 text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[15px]">groups</span>
                      ROSTER
                    </button>

                    {/* Popover Squad Box */}
                    {isRosterOpen && (
                      <div 
                        ref={popupRef}
                        className="absolute right-0 top-10 z-50 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden text-slate-900 animate-hero"
                      >
                        <div className="bg-[#E53935] text-white px-4 py-2.5 flex items-center justify-between">
                          <span className="text-[11px] font-black uppercase tracking-wider">MATCH SQUAD</span>
                          <button
                            onClick={() => setOpenRosterId(null)}
                            className="text-white hover:text-white/80 font-bold text-base leading-none"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="p-2 space-y-1 max-h-60 overflow-y-auto">
                          {players.map((player) => {
                            const pStats = match.stats?.find(
                              (s) => Number(s.playerNum) === Number(player.num)
                            );

                            return (
                              <div
                                key={player.num}
                                className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className="w-5 h-5 rounded-md bg-[#FFEBEE] text-[#E53935] text-[10px] font-black flex items-center justify-center shrink-0">
                                    {player.num}
                                  </span>
                                  <span className="text-xs font-semibold text-slate-800 truncate">
                                    {player.name}
                                  </span>
                                </div>

                                {/* Compact multipliers: Only icons and counts */}
                                {pStats && (
                                  <div className="flex items-center gap-1.5 shrink-0 text-xs font-bold text-slate-700">
                                    {pStats.goals && pStats.goals > 0 ? (
                                      <span className="inline-flex items-center gap-0.5">
                                        <span>⚽️</span>
                                        {pStats.goals > 1 && (
                                          <span className="text-[10px] text-slate-500 font-black">×{pStats.goals}</span>
                                        )}
                                      </span>
                                    ) : null}
                                    {pStats.assists && pStats.assists > 0 ? (
                                      <span className="inline-flex items-center gap-0.5">
                                        <span>🤝</span>
                                        {pStats.assists > 1 && (
                                          <span className="text-[10px] text-slate-500 font-black">×{pStats.assists}</span>
                                        )}
                                      </span>
                                    ) : null}
                                    {pStats.saves && pStats.saves > 0 ? (
                                      <span className="inline-flex items-center gap-0.5">
                                        <span>✋🏽</span>
                                        {pStats.saves > 1 && (
                                          <span className="text-[10px] text-slate-500 font-black">×{pStats.saves}</span>
                                        )}
                                      </span>
                                    ) : null}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  <span className="material-symbols-outlined text-[15px] text-[#E53935]">location_on</span>
                  <span>{match.location}</span>
                </div>

                {/* Opponents */}
                <div className="mb-5">
                  <h2 className="font-kids text-2xl md:text-3xl font-medium tracking-normal uppercase leading-snug">
                    <span className={isFriday ? 'text-[#FFD54F]' : 'text-[#E53935]'}>
                      KNAPP & SCHLAPPI
                    </span>{' '}
                    <span className="text-slate-400 font-sans font-light text-base md:text-lg lowercase mx-1">
                      vs
                    </span>{' '}
                    <span className={isFriday ? 'text-white' : 'text-slate-900'}>
                      {match.opponent}
                    </span>
                  </h2>
                </div>

                {/* Past Game Result & Dragon of the Match */}
                {isPast && (match.result || match.dragonOfTheMatch) && (
                  <div className="space-y-4 pt-1">
                    <div className="flex flex-wrap items-center gap-3">
                      {match.result && (
                        <span
                          className={`text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider text-white shadow-sm ${
                            match.resultType === 'win'
                              ? 'bg-[#00C48C]'
                              : match.resultType === 'draw'
                              ? 'bg-slate-500'
                              : 'bg-rose-500'
                          }`}
                        >
                      {typeof match.result === 'string' ? match.result : match.result?.score}                        </span>
                      )}

                      {match.dragonOfTheMatch && (
                        <div className="bg-white/80 border border-[#FFEBEE] px-3.5 py-1 rounded-xl flex items-center gap-2 shadow-sm">
                          <span className="material-symbols-outlined text-[18px] text-[#E53935]">
                            local_fire_department
                          </span>
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black uppercase tracking-wider text-[#E53935] leading-tight">
                              DRAGON OF THE MATCH
                            </span>
                            <span className="text-xs font-bold text-slate-800 leading-tight">
                              {match.dragonOfTheMatch}{match.notes ? ` • ${match.notes}` : ''}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Icon Legend */}
                    <div
                      className={`flex items-center gap-6 pt-1 ${
                        isFriday ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold">Goals</span>
                        <span className="text-[1.5rem] leading-none">⚽️</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold">Assist</span>
                        <span className="text-[1.5rem] leading-none">🤝</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold">Saves</span>
                        <span className="text-[1.5rem] leading-none">✋🏽</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchSchedule;


// import React, { useState, useRef, useEffect } from 'react';
// import { PageType } from '../types';
// import { MATCHES_DATA } from '../data/matches';
// import { players } from '../data/galleryNewData';

// interface MatchScheduleProps {
//   onNavigate?: (page: PageType) => void;
// }

// export const MatchSchedule: React.FC<MatchScheduleProps> = () => {
//   const [openRosterId, setOpenRosterId] = useState<number | null>(null);
//   const popupRef = useRef<HTMLDivElement>(null);
//   const now = new Date();

//   // Close roster popup when clicking anywhere outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
//         setOpenRosterId(null);
//       }
//     };
//     if (openRosterId !== null) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [openRosterId]);

//   return (
//     <div className="space-y-6 animate-hero pb-12">
//       {/* Title Header */}
//       <div className="border-l-4 border-[#E53935] pl-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
//         <div>
//           <h1 className="font-kids text-5xl md:text-7xl font-semibold text-slate-800 tracking-wide uppercase leading-none">
//             BATTLE MAP
//           </h1>
//           <p className="text-slate-500 italic text-base md:text-lg font-medium mt-3">
//             The home grounds of legends at the Penn Yan Complex.
//           </p>
//         </div>
//         <div>
//           <span className="bg-white border border-slate-200 text-[#E53935] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
//             AUTUMN 2026
//           </span>
//         </div>
//       </div>

//       {/* Match Cards */}
//       <div className="space-y-6">
//         {MATCHES_DATA.map((match) => {
//           const isPast = new Date(match.dateStr) < now;
//           const isFriday = match.dateDisplay.toUpperCase().includes('FRIDAY');
//           const isRosterOpen = openRosterId === match.id;

//           return (
//             <div
//               key={match.id}
//               className={`relative flex rounded-[32px] shadow-sm border-4 border-white transition-all ${
//                 isFriday ? 'bg-[#14181F] text-white' : 'bg-[#FFFDE7]/90 text-slate-900'
//               }`}
//             >
//               {/* Left Tab with Clean Stacked Letters */}
//               <div
//                 className={`w-14 rounded-l-[28px] flex flex-col items-center justify-center py-6 select-none shrink-0 ${
//                   isFriday ? 'bg-[#FFD54F] text-slate-900' : 'bg-[#E53935] text-white'
//                 }`}
//               >
//                 <div className="flex flex-col items-center text-[9px] font-black leading-tight tracking-wider mb-3">
//                   <span>W</span>
//                   <span>E</span>
//                   <span>E</span>
//                   <span>K</span>
//                 </div>
//                 <span className="font-kids font-semibold text-3xl leading-none">
//                   {match.week}
//                 </span>
//               </div>

//               {/* Card Body */}
//               <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative">
//                 {/* Weather Pill */}
//                 <div
//                   className={`absolute -top-3 right-8 w-8 h-8 rounded-2xl border-2 border-white shadow flex items-center justify-center ${
//                     isFriday ? 'bg-[#5C6BC0] text-white' : 'bg-[#FFD54F] text-white'
//                   }`}
//                 >
//                   <span className="material-symbols-outlined text-[18px]">
//                     {isFriday ? 'bedtime' : 'sunny'}
//                   </span>
//                 </div>

//                 {/* Top Row: Date, Time & Roster */}
//                 <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
//                   <div className="flex flex-wrap items-center gap-2">
//                     <span className="bg-[#FFD54F] text-slate-900 text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
//                       {match.dateDisplay}
//                     </span>
//                     <span className="bg-[#E53935] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
//                       <span className="material-symbols-outlined text-[14px]">schedule</span>
//                       {match.timeDisplay}
//                     </span>
//                   </div>

//                   {/* Roster Button & Popover */}
//                   <div className="relative">
//                     <button
//                       onClick={() => setOpenRosterId(isRosterOpen ? null : match.id)}
//                       className="bg-[#0B1728] hover:bg-slate-800 text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
//                     >
//                       <span className="material-symbols-outlined text-[15px]">groups</span>
//                       ROSTER
//                     </button>

//                     {/* Popover Squad Box */}
//                     {isRosterOpen && (
//                       <div 
//                         ref={popupRef}
//                         className="absolute right-0 top-10 z-50 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden text-slate-900 animate-hero"
//                       >
//                         <div className="bg-[#E53935] text-white px-4 py-2.5 flex items-center justify-between">
//                           <span className="text-[11px] font-black uppercase tracking-wider">MATCH SQUAD</span>
//                           <button
//                             onClick={() => setOpenRosterId(null)}
//                             className="text-white hover:text-white/80 font-bold text-base leading-none"
//                           >
//                             ✕
//                           </button>
//                         </div>
//                         <div className="p-2 space-y-1 max-h-60 overflow-y-auto">
//                           {players.map((player) => (
//                             <div
//                               key={player.num}
//                               className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
//                             >
//                               <span className="w-5 h-5 rounded-md bg-[#FFEBEE] text-[#E53935] text-[10px] font-black flex items-center justify-center shrink-0">
//                                 {player.num}
//                               </span>
//                               <span className="text-xs font-semibold text-slate-800">
//                                 {player.name}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
//                   <span className="material-symbols-outlined text-[15px] text-[#E53935]">location_on</span>
//                   <span>{match.location}</span>
//                 </div>

//                 {/* Opponents */}
//                 <div className="mb-5">
//                   <h2 className="font-kids text-2xl md:text-3xl font-medium tracking-normal uppercase leading-snug">
//                     <span className={isFriday ? 'text-[#FFD54F]' : 'text-[#E53935]'}>
//                       KNAPP & SCHLAPPI
//                     </span>{' '}
//                     <span className="text-slate-400 font-sans font-light text-base md:text-lg lowercase mx-1">
//                       vs
//                     </span>{' '}
//                     <span className={isFriday ? 'text-white' : 'text-slate-900'}>
//                       {match.opponent}
//                     </span>
//                   </h2>
//                 </div>

//                 {/* Past Game Result & Dragon of the Match */}
//                 {isPast && (match.result || match.dragonOfTheMatch) && (
//                   <div className="space-y-3 pt-1">
//                     <div className="flex flex-wrap items-center gap-3">
//                       {match.result && (
//                         <span
//                           className={`text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider text-white shadow-sm ${
//                             match.resultType === 'win'
//                               ? 'bg-[#00C48C]'
//                               : match.resultType === 'draw'
//                               ? 'bg-slate-500'
//                               : 'bg-rose-500'
//                           }`}
//                         >
//                           {match.result}
//                         </span>
//                       )}

//                       {match.dragonOfTheMatch && (
//                         <div className="bg-white/80 border border-[#FFEBEE] px-3.5 py-1 rounded-xl flex items-center gap-2 shadow-sm">
//                           <span className="material-symbols-outlined text-[18px] text-[#E53935]">
//                             local_fire_department
//                           </span>
//                           <div className="flex flex-col">
//                             <span className="text-[8px] font-black uppercase tracking-wider text-[#E53935] leading-tight">
//                               DRAGON OF THE MATCH
//                             </span>
//                             <span className="text-xs font-bold text-slate-800 leading-tight">
//                               {match.dragonOfTheMatch}{match.notes ? ` • ${match.notes}` : ''}
//                             </span>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Quick Icon Legend */}
//                     <div
//                       className={`flex items-center gap-7 pt-2 border-t ${
//                         isFriday
//                           ? 'border-white/10 text-slate-300'
//                           : 'border-slate-200/60 text-slate-600'
//                       }`}
//                     >
//                       <div className="flex flex-col items-center gap-0.5">
//                         <span className="text-[11px] uppercase tracking-wider font-semibold">Goals</span>
//                         <span className="text-[1.5rem] leading-none">⚽️</span>
//                       </div>
//                       <div className="flex flex-col items-center gap-0.5">
//                         <span className="text-[11px] uppercase tracking-wider font-semibold">Assist</span>
//                         <span className="text-[1.5rem] leading-none">🤝</span>
//                       </div>
//                       <div className="flex flex-col items-center gap-0.5">
//                         <span className="text-[11px] uppercase tracking-wider font-semibold">Saves</span>
//                         <span className="text-[1.5rem] leading-none">✋🏽</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default MatchSchedule;

// // import React, { useState, useRef, useEffect } from 'react';
// // import { PageType } from '../types';
// // import { MATCHES_DATA } from '../data/matches';
// // import { players } from '../data/galleryNewData'; // Adjust the import path as needed

// // interface MatchScheduleProps {
// //   onNavigate?: (page: PageType) => void;
// // }

// // export const MatchSchedule: React.FC<MatchScheduleProps> = () => {
// //   const [openRosterId, setOpenRosterId] = useState<number | null>(null);
// //   const popupRef = useRef<HTMLDivElement>(null);
// //   const now = new Date();

// //   // Close roster popup when clicking anywhere outside
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
// //         setOpenRosterId(null);
// //       }
// //     };
// //     if (openRosterId !== null) {
// //       document.addEventListener('mousedown', handleClickOutside);
// //     }
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, [openRosterId]);

// //   return (
// //     <div className="space-y-6 animate-hero pb-12">
// //       {/* Title Header */}
// //       <div className="border-l-4 border-[#E53935] pl-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
// //         <div>
// //           <h1 className="font-kids text-5xl md:text-7xl font-semibold text-slate-800 tracking-wide uppercase leading-none">
// //             BATTLE MAP
// //           </h1>
// //           <p className="text-slate-500 italic text-base md:text-lg font-medium mt-3">
// //             The home grounds of legends at the Penn Yan Complex.
// //           </p>
// //         </div>
// //         <div>
// //           <span className="bg-white border border-slate-200 text-[#E53935] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
// //             AUTUMN 2026
// //           </span>
// //         </div>
// //       </div>

// //       {/* Match Cards */}
// //       <div className="space-y-6">
// //         {MATCHES_DATA.map((match) => {
// //           const isPast = new Date(match.dateStr) < now;
// //           const isFriday = match.dateDisplay.toUpperCase().includes('FRIDAY');
// //           const isRosterOpen = openRosterId === match.id;

// //           return (
// //             <div
// //               key={match.id}
// //               className={`relative flex rounded-[32px] shadow-sm border-4 border-white transition-all ${
// //                 isFriday ? 'bg-[#14181F] text-white' : 'bg-[#FFFDE7]/90 text-slate-900'
// //               }`}
// //             >
// //               {/* Left Tab with Clean Stacked Letters */}
// //               <div
// //                 className={`w-14 rounded-l-[28px] flex flex-col items-center justify-center py-6 select-none shrink-0 ${
// //                   isFriday ? 'bg-[#FFD54F] text-slate-900' : 'bg-[#E53935] text-white'
// //                 }`}
// //               >
// //                 <div className="flex flex-col items-center text-[9px] font-black leading-tight tracking-wider mb-3">
// //                   <span>W</span>
// //                   <span>E</span>
// //                   <span>E</span>
// //                   <span>K</span>
// //                 </div>
// //                 <span className="font-kids font-semibold text-3xl leading-none">
// //                   {match.week}
// //                 </span>
// //               </div>

// //               {/* Card Body */}
// //               <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative">
// //                 {/* Weather Pill */}
// //                 <div
// //                   className={`absolute -top-3 right-8 w-8 h-8 rounded-2xl border-2 border-white shadow flex items-center justify-center ${
// //                     isFriday ? 'bg-[#5C6BC0] text-white' : 'bg-[#FFD54F] text-white'
// //                   }`}
// //                 >
// //                   <span className="material-symbols-outlined text-[18px]">
// //                     {isFriday ? 'bedtime' : 'sunny'}
// //                   </span>
// //                 </div>

// //                 {/* Top Row: Date, Time & Roster */}
// //                 <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
// //                   <div className="flex flex-wrap items-center gap-2">
// //                     <span className="bg-[#FFD54F] text-slate-900 text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
// //                       {match.dateDisplay}
// //                     </span>
// //                     <span className="bg-[#E53935] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
// //                       <span className="material-symbols-outlined text-[14px]">schedule</span>
// //                       {match.timeDisplay}
// //                     </span>
// //                   </div>

// //                   {/* Roster Button & Popover */}
// //                   <div className="relative">
// //                     <button
// //                       onClick={() => setOpenRosterId(isRosterOpen ? null : match.id)}
// //                       className="bg-[#0B1728] hover:bg-slate-800 text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
// //                     >
// //                       <span className="material-symbols-outlined text-[15px]">groups</span>
// //                       ROSTER
// //                     </button>

// //                     {/* Popover Squad Box */}
// //                     {isRosterOpen && (
// //                       <div 
// //                         ref={popupRef}
// //                         className="absolute right-0 top-10 z-50 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden text-slate-900 animate-hero"
// //                       >
// //                         <div className="bg-[#E53935] text-white px-4 py-2.5 flex items-center justify-between">
// //                           <span className="text-[11px] font-black uppercase tracking-wider">MATCH SQUAD</span>
// //                           <button
// //                             onClick={() => setOpenRosterId(null)}
// //                             className="text-white hover:text-white/80 font-bold text-base leading-none"
// //                           >
// //                             ✕
// //                           </button>
// //                         </div>
// //                         <div className="p-2 space-y-1 max-h-60 overflow-y-auto">
// //                           {players.map((player) => (
// //                             <div
// //                               key={player.num}
// //                               className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
// //                             >
// //                               <span className="w-5 h-5 rounded-md bg-[#FFEBEE] text-[#E53935] text-[10px] font-black flex items-center justify-center shrink-0">
// //                                 {player.num}
// //                               </span>
// //                               <span className="text-xs font-semibold text-slate-800">
// //                                 {player.name}
// //                               </span>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Location */}
// //                 <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
// //                   <span className="material-symbols-outlined text-[15px] text-[#E53935]">location_on</span>
// //                   <span>{match.location}</span>
// //                 </div>

// //                 {/* Opponents */}
// //                 <div className="mb-5">
// //                   <h2 className="font-kids text-2xl md:text-3xl font-medium tracking-normal uppercase leading-snug">
// //                     <span className={isFriday ? 'text-[#FFD54F]' : 'text-[#E53935]'}>
// //                       KNAPP & SCHLAPPI
// //                     </span>{' '}
// //                     <span className="text-slate-400 font-sans font-light text-base md:text-lg lowercase mx-1">
// //                       vs
// //                     </span>{' '}
// //                     <span className={isFriday ? 'text-white' : 'text-slate-900'}>
// //                       {match.opponent}
// //                     </span>
// //                   </h2>
// //                 </div>

// //                 {/* Past Game Result & Dragon of the Match */}
// //                 {isPast && (match.result || match.dragonOfTheMatch) && (
// //                   <div className="flex flex-wrap items-center gap-3 pt-1">
// //                     {match.result && (
// //                       <span
// //                         className={`text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider text-white shadow-sm ${
// //                           match.resultType === 'win'
// //                             ? 'bg-[#00C48C]'
// //                             : match.resultType === 'draw'
// //                             ? 'bg-slate-500'
// //                             : 'bg-rose-500'
// //                         }`}
// //                       >
// //                         {match.result}
// //                       </span>
// //                     )}

// //                     {match.dragonOfTheMatch && (
// //                       <div className="bg-white/80 border border-[#FFEBEE] px-3.5 py-1 rounded-xl flex items-center gap-2 shadow-sm">
// //                         <span className="material-symbols-outlined text-[18px] text-[#E53935]">
// //                           local_fire_department
// //                         </span>
// //                         <div className="flex flex-col">
// //                           <span className="text-[8px] font-black uppercase tracking-wider text-[#E53935] leading-tight">
// //                             DRAGON OF THE MATCH
// //                           </span>
// //                           <span className="text-xs font-bold text-slate-800 leading-tight">
// //                             {match.dragonOfTheMatch}{match.notes ? ` • ${match.notes}` : ''}
// //                           </span>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MatchSchedule;
