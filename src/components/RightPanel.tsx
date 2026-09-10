import React from 'react';
import { PageType } from '../types';
import { MATCHES_DATA } from '../data/matches';

interface RightPanelProps {
  onNavigate: (page: PageType) => void;
  activePage: PageType;
}

export const RightPanel: React.FC<RightPanelProps> = ({ onNavigate, activePage }) => {
  const now = new Date();

  // Dynamically find the very next fixture relative to today
  const nextMatch = MATCHES_DATA.find((m) => new Date(m.dateStr) >= now) || MATCHES_DATA[0];

  // Format date display: e.g. "Saturday, Sep 12"
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date(nextMatch.dateStr));

  const quickLinks: { label: string; value: PageType; icon: string }[] = [
    { label: 'The Nest', value: 'HOME', icon: 'home' },
    { label: 'Schedule', value: 'MATCHES', icon: 'event' },
    { label: 'Squad', value: 'ROSTER', icon: 'groups' },
    { label: 'Join Us', value: 'CONTACT', icon: 'add_circle' },
  ];

  return (
    <div className="w-[300px] h-screen sticky top-0 bg-white/30 backdrop-blur-2xl border-l border-slate-200/50 flex flex-col p-6 overflow-hidden z-50">
      <div className="flex flex-col gap-8">
        {/* Next Match Widget */}
        <div className="bg-[#E53935] rounded-[32px] p-6 text-white relative overflow-hidden group shadow-xl shadow-red-500/10">
          <div className="absolute -right-4 -top-4 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
             <span className="material-symbols-outlined text-[80px]">sports_soccer</span>
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-black text-yellow-300 uppercase tracking-widest mb-4 block">Next Battle</span>
            <h4 className="font-impact text-2xl mb-1 uppercase text-white">vs {nextMatch.opponent}</h4>
            <p className="text-white/80 text-xs font-medium mb-4 italic">{formattedDate} @ {nextMatch.timeDisplay}</p>
            <button 
              onClick={() => onNavigate('MATCHES')}
              className="w-full py-2.5 bg-white text-[#E53935] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400 transition-colors shadow-sm"
            >
              Battle Map
            </button>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="space-y-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">Quick Access</span>
          <div className="grid grid-cols-1 gap-2">
            {quickLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => onNavigate(link.value)}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all group
                  ${activePage === link.value 
                    ? 'bg-white border-[#E53935] shadow-lg shadow-red-500/5' 
                    : 'bg-white/50 border-transparent hover:border-red-100 hover:bg-white'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                    ${activePage === link.value ? 'bg-[#E53935] text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-red-50 group-hover:text-[#E53935]'}`}>
                    <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                  </div>
                  <span className={`text-sm font-bold ${activePage === link.value ? 'text-[#E53935]' : 'text-slate-500 group-hover:text-slate-900'}`}>
                    {link.label}
                  </span>
                </div>
                <span className={`material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform ${activePage === link.value ? 'text-[#E53935]' : 'text-slate-300'}`}>chevron_right</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dragon Stats */}
        <div className="bg-white/60 rounded-[40px] p-8 border border-white shadow-sm">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Season Pulse</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-3xl font-impact text-slate-900">402</span>
              <span className="text-[9px] font-black text-[#E53935] uppercase tracking-tighter mb-1">Goals Scored</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#E53935] w-[85%] rounded-full" />
            </div>
            <p className="text-[10px] text-slate-400 font-medium italic">"The highest scoring U8 squad in the region!"</p>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Version */}
      <div className="mt-auto pt-8 text-center">
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Baby Dragons v2.0</p>
      </div>
    </div>
  );
};



// import React from 'react';
// import { PageType } from '../types';

// interface RightPanelProps {
//   onNavigate: (page: PageType) => void;
//   activePage: PageType;
// }

// export const RightPanel: React.FC<RightPanelProps> = ({ onNavigate, activePage }) => {
//   const quickLinks: { label: string; value: PageType; icon: string }[] = [
//     { label: 'The Nest', value: 'HOME', icon: 'home' },
//     { label: 'Schedule', value: 'MATCHES', icon: 'event' },
//     { label: 'Squad', value: 'ROSTER', icon: 'groups' },
//     { label: 'Join Us', value: 'CONTACT', icon: 'add_circle' },
//   ];

//   return (
//     <div className="w-[300px] h-screen sticky top-0 bg-white/30 backdrop-blur-2xl border-l border-slate-200/50 flex flex-col p-6 overflow-hidden z-50">
//       <div className="flex flex-col gap-8">
//         {/* Next Match Widget */}
//         <div className="bg-[#E53935] rounded-[32px] p-6 text-white relative overflow-hidden group shadow-xl shadow-red-500/10">
//           <div className="absolute -right-4 -top-4 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
//              <span className="material-symbols-outlined text-[80px]">sports_soccer</span>
//           </div>
//           <div className="relative z-10">
//             <span className="text-[10px] font-black text-yellow-300 uppercase tracking-widest mb-4 block">Next Battle</span>
//             <h4 className="font-impact text-2xl mb-1 uppercase text-white">vs Dan's Taxes</h4>
//             <p className="text-white/80 text-xs font-medium mb-4 italic">Friday, Sep 25 @ 5:00 PM</p>
//             <button 
//               onClick={() => onNavigate('MATCHES')}
//               className="w-full py-2.5 bg-white text-[#E53935] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400 transition-colors shadow-sm"
//             >
//               Battle Map
//             </button>
//           </div>
//         </div>

//         {/* Secondary Navigation */}
//         <div className="space-y-4">
//           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">Quick Access</span>
//           <div className="grid grid-cols-1 gap-2">
//             {quickLinks.map((link) => (
//               <button
//                 key={link.value}
//                 onClick={() => onNavigate(link.value)}
//                 className={`flex items-center justify-between p-4 rounded-2xl border transition-all group
//                   ${activePage === link.value 
//                     ? 'bg-white border-[#E53935] shadow-lg shadow-red-500/5' 
//                     : 'bg-white/50 border-transparent hover:border-red-100 hover:bg-white'}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
//                     ${activePage === link.value ? 'bg-[#E53935] text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-red-50 group-hover:text-[#E53935]'}`}>
//                     <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
//                   </div>
//                   <span className={`text-sm font-bold ${activePage === link.value ? 'text-[#E53935]' : 'text-slate-500 group-hover:text-slate-900'}`}>
//                     {link.label}
//                   </span>
//                 </div>
//                 <span className={`material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform ${activePage === link.value ? 'text-[#E53935]' : 'text-slate-300'}`}>chevron_right</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Dragon Stats */}
//         <div className="bg-white/60 rounded-[40px] p-8 border border-white shadow-sm">
//           <div className="flex items-center gap-3 mb-6">
//              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Season Pulse</span>
//           </div>
//           <div className="space-y-4">
//             <div className="flex justify-between items-end">
//               <span className="text-3xl font-impact text-slate-900">402</span>
//               <span className="text-[9px] font-black text-[#E53935] uppercase tracking-tighter mb-1">Goals Scored</span>
//             </div>
//             <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
//               <div className="h-full bg-[#E53935] w-[85%] rounded-full" />
//             </div>
//             <p className="text-[10px] text-slate-400 font-medium italic">"The highest scoring U8 squad in the region!"</p>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Legal / Version */}
//       <div className="mt-auto pt-8 text-center">
//         <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Baby Dragons v2.0</p>
//       </div>
//     </div>
//   );
// };