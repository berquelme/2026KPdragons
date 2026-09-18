import React, { useState } from 'react';
import { TACTICAL_POINTS, TacticalPoint } from '../data/tacticsData';
import { teamData } from '../data/teamData';

interface LiveAnalysisProps {
  points?: TacticalPoint[];
}

export const LiveAnalysis: React.FC<LiveAnalysisProps> = ({ points = TACTICAL_POINTS }) => {
  const [activeZone, setActiveZone] = useState<number | null>(null);

  const selectedPoint = points.find((p) => p.id === activeZone);

  return (
    <div className="bg-slate-900 rounded-[60px] p-8 md:p-12 border-8 border-white shadow-2xl relative overflow-hidden min-h-[500px]">
      {/* Pitch Backdrop */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-10 border-2 border-white rounded-[40px]" />
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row h-full gap-8 md:gap-12 items-stretch">
        {/* Pitch Area */}
        <div className="flex-1 relative h-80 md:h-[400px] bg-emerald-950/30 rounded-[40px] border border-white/10 overflow-hidden">
          {points.map((point) => (
            <button
              key={point.id}
              type="button"
              onClick={() => setActiveZone(point.id)}
              className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer
                ${activeZone === point.id 
                  ? 'bg-[#FFD54F] scale-125 shadow-[#FFD54F]/50 ring-4 ring-white/30' 
                  : 'bg-[#E53935] hover:scale-110'}`}
              style={{ left: point.x, top: point.y }}
              aria-label={point.label}
            >
              <span className={`material-symbols-outlined text-[18px] ${activeZone === point.id ? 'text-slate-950' : 'text-white'}`}>
                {activeZone === point.id ? 'bolt' : 'sports_soccer'}
              </span>
            </button>
          ))}
        </div>

        {/* Playbook Info Panel */}
        <div className="w-full md:w-88 flex flex-col justify-center">
          <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-6 md:p-8 border border-white/10">
            <div className="inline-flex items-center gap-2 bg-[#FFD54F] px-3 py-0.5 rounded-full mb-3 shadow-sm">
              <span className="material-symbols-outlined text-[#E53935] text-[14px]">sports</span>
              <span className="text-[9px] font-black text-[#E53935] uppercase tracking-widest">
                Team Playbook
              </span>
            </div>
            
            <h3 className="font-kids text-2xl md:text-3xl text-white mb-3 uppercase">
              Field Secrets
            </h3>

            {selectedPoint ? (
              <div className="animate-fade-up">
                <span className="text-[#FFD54F] text-xs font-black uppercase tracking-wider block mb-2">
                  {selectedPoint.label}
                </span>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {selectedPoint.detail}
                </p>
                <button 
                  type="button"
                  onClick={() => setActiveZone(null)}
                  className="mt-5 text-[#FFD54F] text-xs font-bold border-b border-[#FFD54F]/30 hover:border-[#FFD54F] transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                  RESET PITCH
                </button>
              </div>
            ) : (
              <p className="text-white/50 italic text-sm leading-relaxed">
                Tap any soccer ball on the field to see how the {teamData.shortName || 'Dragons'} attack, defend, and support each other!
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-8 hidden sm:flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#E53935] animate-ping" />
        <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">
          Interactive Pitch
        </span>
      </div>
    </div>
  );
};

export default LiveAnalysis;

// import React, { useState } from 'react';
// import { TACTICAL_POINTS, TacticalPoint } from '../data/tacticsData';
// import { teamData } from '../data/teamData';

// interface LiveAnalysisProps {
//   points?: TacticalPoint[];
// }

// export const LiveAnalysis: React.FC<LiveAnalysisProps> = ({ points = TACTICAL_POINTS }) => {
//   const [activeZone, setActiveZone] = useState<number | null>(null);

//   const selectedPoint = points.find((p) => p.id === activeZone);

//   return (
//     <div className="bg-slate-900 rounded-[60px] p-12 border-8 border-white shadow-2xl relative overflow-hidden h-[500px]">
//       {/* Pitch Backdrop */}
//       <div className="absolute inset-0 opacity-20 pointer-events-none">
//         <div className="absolute inset-10 border-2 border-white rounded-[40px]" />
//         <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white -translate-y-1/2" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-full" />
//       </div>

//       <div className="relative z-10 flex flex-col md:flex-row h-full gap-12">
//         {/* Pitch Area */}
//         <div className="flex-1 relative h-full bg-emerald-950/30 rounded-[40px] border border-white/10 overflow-hidden">
//           {points.map((point) => (
//             <button
//               key={point.id}
//               type="button"
//               onClick={() => setActiveZone(point.id)}
//               className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer
//                 ${activeZone === point.id ? 'bg-yellow-400 scale-150 shadow-yellow-400/50' : 'bg-[#E53935] animate-pulse'}`}
//               style={{ left: point.x, top: point.y }}
//               aria-label={point.label}
//             >
//               <span className={`material-symbols-outlined text-[16px] ${activeZone === point.id ? 'text-red-900' : 'text-white'}`}>
//                 {activeZone === point.id ? 'insights' : 'my_location'}
//               </span>
//             </button>
//           ))}
//         </div>

//         {/* Tactical Information Panel */}
//         <div className="w-full md:w-80 flex flex-col justify-center">
//           <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10">
//             <h3 className="font-kids text-3xl text-white mb-4 uppercase">Tactical View</h3>
//             {selectedPoint ? (
//               <div className="animate-fade-up">
//                 <span className="text-yellow-400 text-[10px] font-black uppercase tracking-widest block mb-2">
//                   {selectedPoint.label}
//                 </span>
//                 <p className="text-white/70 text-base leading-relaxed">
//                   {selectedPoint.detail}
//                 </p>
//                 <button 
//                   type="button"
//                   onClick={() => setActiveZone(null)}
//                   className="mt-6 text-yellow-400 text-xs font-bold border-b border-yellow-400/20 hover:border-yellow-400 transition-colors cursor-pointer"
//                 >
//                   RESET VIEW
//                 </button>
//               </div>
//             ) : (
//               <p className="text-white/40 italic text-sm leading-relaxed">
//                 Select a node on the pitch to view {teamData.shortName}'s spatial strategy and movement patterns.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="absolute top-6 right-8 flex items-center gap-2">
//         <div className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
//         <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Field Simulation</span>
//       </div>
//     </div>
//   );
// };

// export default LiveAnalysis;