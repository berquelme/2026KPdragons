import React from 'react';
import { Player } from '../types';
import { MATCHES_DATA } from '../data/matches';

interface PlayerCardProps {
  player: Player;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  // Compute real match stats dynamically from MATCHES_DATA
  const calculatedStats = MATCHES_DATA.reduce(
    (acc, match) => {
      const matchStat = match.stats?.find(
        (s) => Number(s.playerNum) === Number(player.num)
      );
      if (matchStat) {
        acc.goals += matchStat.goals || 0;
        acc.assists += matchStat.assists || 0;
        acc.saves += matchStat.saves || 0;
      }
      return acc;
    },
    { goals: 0, assists: 0, saves: 0 }
  );

  return (
    <div className="group relative bg-white rounded-[40px] p-8 border-2 border-slate-100 hover:border-[#E53935]/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* Number Badge */}
      <div className="absolute -top-6 -left-4 w-16 h-16 bg-[#E53935] rounded-2xl flex items-center justify-center text-[#FFD54F] font-kids text-3xl shadow-xl shadow-red-500/20 group-hover:rotate-12 transition-transform">
        {player.num}
      </div>

      {/* Silhouette Placeholder */}
      <div className="w-full aspect-square bg-slate-50 rounded-[32px] mb-6 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
        <span className="material-symbols-outlined text-[120px] text-slate-200 group-hover:scale-110 transition-transform duration-700">
          person
        </span>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white shadow-sm">
          <span className="text-[10px] font-black text-[#E53935] uppercase tracking-widest">
            {player.position}
          </span>
        </div>
      </div>

      <h3 className="font-kids text-2xl text-slate-900 mb-4 text-center group-hover:text-[#E53935] transition-colors">
        {player.name}
      </h3>

      {/* Stats Mini Grid - 4 Columns: Goals, Assists, Saves, Speed */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'G', val: calculatedStats.goals },
          { label: 'A', val: calculatedStats.assists },
          { label: 'SV', val: calculatedStats.saves },
          { label: 'SPD', val: player.speed ?? player.stats?.speed ?? 0 },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-slate-50 rounded-2xl p-2.5 text-center border border-slate-100 group-hover:bg-red-50 transition-colors"
          >
            <span className="block text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">
              {stat.label}
            </span>
            <span className="text-sm font-bold text-slate-700">{stat.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerCard;

// import React from 'react';
// import { Player } from '../types';
// import { MATCHES_DATA } from '../data/matches';

// interface PlayerCardProps {
//   player: Player;
// }

// export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
//   // Compute real match stats dynamically from MATCHES_DATA
//   const calculatedStats = MATCHES_DATA.reduce(
//     (acc, match) => {
//       const matchStat = match.stats?.find(
//         (s) => Number(s.playerNum) === Number(player.num)
//       );
//       if (matchStat) {
//         acc.goals += matchStat.goals || 0;
//         acc.assists += matchStat.assists || 0;
//       }
//       return acc;
//     },
//     { goals: 0, assists: 0 }
//   );

//   return (
//     <div className="group relative bg-white rounded-[40px] p-8 border-2 border-slate-100 hover:border-[#E53935]/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
//       {/* Number Badge */}
//       <div className="absolute -top-6 -left-4 w-16 h-16 bg-[#E53935] rounded-2xl flex items-center justify-center text-[#FFD54F] font-kids text-3xl shadow-xl shadow-red-500/20 group-hover:rotate-12 transition-transform">
//         {player.num}
//       </div>

//       {/* Silhouette Placeholder */}
//       <div className="w-full aspect-square bg-slate-50 rounded-[32px] mb-6 flex items-center justify-center overflow-hidden relative">
//         <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
//         <span className="material-symbols-outlined text-[120px] text-slate-200 group-hover:scale-110 transition-transform duration-700">
//           person
//         </span>
//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white shadow-sm">
//           <span className="text-[10px] font-black text-[#E53935] uppercase tracking-widest">
//             {player.position}
//           </span>
//         </div>
//       </div>

//       <h3 className="font-kids text-2xl text-slate-900 mb-4 text-center group-hover:text-[#E53935] transition-colors">
//         {player.name}
//       </h3>

//       {/* Stats Mini Grid - Goals & Assists dynamic from matches, SPD from player */}
//       <div className="grid grid-cols-3 gap-2">
//         {[
//           { label: 'G', val: calculatedStats.goals },
//           { label: 'A', val: calculatedStats.assists },
//           { label: 'SPD', val: player.speed ?? player.stats?.speed ?? 0 },
//         ].map((stat, i) => (
//           <div
//             key={i}
//             className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100 group-hover:bg-red-50 transition-colors"
//           >
//             <span className="block text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">
//               {stat.label}
//             </span>
//             <span className="text-sm font-bold text-slate-700">{stat.val}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PlayerCard;


