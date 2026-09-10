import React, { useState } from 'react';
import { FanMessage } from '../types';
import { PendingRoar } from '../App';

interface FanZoneProps {
  onOpenRoarModal?: () => void;
  messages?: FanMessage[];
  pendingRoars?: PendingRoar[];
  onApproveRoar?: (id: string) => void;
  onRejectRoar?: (id: string) => void;
}

export const FanZone: React.FC<FanZoneProps> = ({ 
  onOpenRoarModal,
  messages = [],
  pendingRoars = [],
  onApproveRoar,
  onRejectRoar,
}) => {
  const [selectedMessage, setSelectedMessage] = useState<FanMessage | null>(null);
  const [isCoachMode, setIsCoachMode] = useState(false);
  const [coachPin, setCoachPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (coachPin === 'dragons8') {
      setIsUnlocked(true);
    } else {
      alert('Incorrect Coach Passkey');
    }
  };

  return (
    <div className="relative w-full py-16 px-6 overflow-hidden rounded-[60px] border-4 border-white/10 shadow-2xl bg-slate-950">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none opacity-[0.02]">
          <span className="font-impact text-[20vw] text-white">STAND LOUD</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#FFD54F] px-4 py-1 rounded-full mb-4 shadow-lg">
             <span className="material-symbols-outlined text-[#E53935] text-[18px] animate-bounce">campaign</span>
             <span className="text-[10px] font-black text-[#E53935] uppercase tracking-[0.2em]">The Dragon's Den</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-impact text-white mb-2 tracking-tighter">SQUAD <span className="text-[#E53935]">ROARS</span></h2>
        </div>

        {/* Coach Moderation Access Badge */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => setIsCoachMode(!isCoachMode)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 text-[10px] font-black uppercase tracking-wider transition-all"
          >
            <span className="material-symbols-outlined text-[14px]">shield_person</span>
            Coach Review ({pendingRoars.length})
          </button>
        </div>

        {/* Coach Review Drawer */}
        {isCoachMode && (
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[32px] mb-8 animate-in fade-in zoom-in-95">
            {!isUnlocked ? (
              <form onSubmit={handleUnlock} className="flex items-center justify-center gap-3">
                <input
                  type="password"
                  placeholder="Enter Coach Passkey (dragons8)"
                  value={coachPin}
                  onChange={(e) => setCoachPin(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-slate-900/80 border border-white/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FFD54F]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FFD54F] text-slate-900 font-black text-xs uppercase rounded-xl hover:brightness-110"
                >
                  Unlock
                </button>
              </form>
            ) : (
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <h4 className="font-kids text-lg text-white">Pending Moderation Queue ({pendingRoars.length})</h4>
                  <button
                    onClick={() => { setIsUnlocked(false); setIsCoachMode(false); }}
                    className="text-xs text-slate-400 hover:text-white uppercase font-bold"
                  >
                    Close
                  </button>
                </div>

                {pendingRoars.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-4">No roars waiting for review. All clear, Coach!</p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {pendingRoars.map((roar) => (
                      <div key={roar.id} className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-[#FFD54F]">To: {roar.player}</span>
                            <span className="text-slate-500 text-[10px]">•</span>
                            <span className="text-[10px] font-bold text-slate-400">From: {roar.author}</span>
                          </div>
                          <p className="text-xs text-white italic mt-1 leading-snug">"{roar.message}"</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                          <button
                            onClick={() => onRejectRoar?.(roar.id)}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-black text-[10px] uppercase transition-all"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => onApproveRoar?.(roar.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] uppercase shadow-md transition-all active:scale-95"
                          >
                            Approve Pin 📌
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tactical Field Visualization */}
        <div className="w-full h-[400px] md:h-[500px] relative border-2 border-white/10 rounded-[50px] bg-emerald-950/20 backdrop-blur-sm overflow-hidden group mb-8">
          <div className="absolute inset-8 border border-white/10 rounded-[30px] pointer-events-none" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full pointer-events-none" />
          
          <div className="absolute left-8 top-[25%] bottom-[25%] w-32 border-y border-r border-white/10 pointer-events-none" />
          <div className="absolute left-8 top-[40%] bottom-[40%] w-12 border-y border-r border-white/10 pointer-events-none" />
          
          <div className="absolute right-8 top-[25%] bottom-[25%] w-32 border-y border-l border-white/10 pointer-events-none" />
          <div className="absolute right-8 top-[40%] bottom-[40%] w-12 border-y border-l border-white/10 pointer-events-none" />
          
          {/* Floating Messages */}
          {messages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelectedMessage(msg)}
              style={{ left: `${msg.x}%`, top: `${msg.y}%` }}
              className="absolute p-3 rounded-2xl shadow-2xl hover:scale-125 transition-all hover:z-30 animate-float flex flex-col items-center gap-2 group/bubble"
            >
              <div 
                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-lg border-2 border-white/20 relative group-hover/bubble:rotate-12 transition-transform"
                style={{ backgroundColor: msg.color }}
              >
                <span className="material-symbols-outlined text-[24px] md:text-[28px]">chat</span>
              </div>
              <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full opacity-0 group-hover/bubble:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                <span className="text-[9px] font-black uppercase text-white tracking-widest">
                  For: {msg.playerName.split(' ')[0]}
                </span>
              </div>
            </button>
          ))}
          
          {messages.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-white/5 font-impact text-4xl md:text-6xl rotate-[-5deg]">
              READY FOR YOUR ROAR...
            </div>
          )}
        </div>

        {/* Action Button & Recent Roars Section */}
        <div className="w-full flex flex-col items-center gap-12">
          <button 
            type="button"
            onClick={onOpenRoarModal}
            className="px-12 py-5 bg-[#E53935] hover:bg-red-700 text-white rounded-[24px] font-black uppercase text-xs tracking-[0.2em] transition-all shadow-2xl shadow-red-600/20 active:scale-95 border border-white/10 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">campaign</span>
            Add Your Roar
          </button>

          <div className="w-full max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Recent Roars</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {messages.slice(0, 6).map(msg => (
                <div 
                  key={`feed-${msg.id}`} 
                  onClick={() => setSelectedMessage(msg)}
                  className="bg-white/[0.03] p-5 rounded-3xl border border-white/5 hover:border-[#E53935]/30 hover:bg-white/[0.05] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs shadow-sm"
                      style={{ backgroundColor: msg.color }}
                    >
                      <span className="material-symbols-outlined text-[16px]">person</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white uppercase tracking-tighter">To: {msg.playerName}</p>
                      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">From: {msg.fanName}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs italic leading-relaxed line-clamp-2">"{msg.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* View Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl" onClick={() => setSelectedMessage(null)}>
          <div 
            className="bg-white w-full max-w-md rounded-[48px] p-10 shadow-2xl border-b-[12px] border-[#E53935] animate-hero relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div 
                  className="w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-xl"
                  style={{ backgroundColor: selectedMessage.color }}
                >
                  <span className="material-symbols-outlined text-[32px]">sports_soccer</span>
                </div>
                <div>
                  <h4 className="font-kids text-3xl text-slate-900 leading-none mb-1">{selectedMessage.playerName}</h4>
                  <p className="text-[#E53935] text-[10px] font-black uppercase tracking-widest">A roar from {selectedMessage.fanName}</p>
                </div>
              </div>
              <p className="text-slate-600 text-2xl font-medium italic leading-relaxed mb-8">
                "{selectedMessage.content}"
              </p>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#E53935] transition-all"
              >
                GOT IT!
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(4px, -8px); }
          50% { transform: translate(-4px, 4px); }
          75% { transform: translate(8px, -4px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
// import React, { useState } from 'react';
// import { FanMessage } from '../types';

// interface FanZoneProps {
//   onOpenRoarModal?: () => void;
// }

// export const FanZone: React.FC<FanZoneProps> = ({ onOpenRoarModal }) => {
//   const [messages, setMessages] = useState<FanMessage[]>([
//     { id: '1', playerName: 'Jamie Daggett', fanName: 'SuperDad', content: 'Incredible footwork today! Keep roaring!', timestamp: Date.now(), color: '#E53935', x: 15, y: 25 },
//     { id: '2', playerName: 'Bryson Nolt', fanName: 'Coach B', content: 'That assist was world-class. Great vision!', timestamp: Date.now(), color: '#FFD54F', x: 65, y: 35 },
//     { id: '3', playerName: 'Tess Almeida', fanName: 'Auntie Sarah', content: 'The Great Wall of Tess! Nothing gets past you!', timestamp: Date.now(), color: '#1a1a1a', x: 40, y: 70 },
//     { id: '4', playerName: 'Elijah Sherman', fanName: 'The Shermans', content: 'Rocket boots engaged! 🚀', timestamp: Date.now(), color: '#E53935', x: 80, y: 20 },
//   ]);
  
//   const [selectedMessage, setSelectedMessage] = useState<FanMessage | null>(null);

//   return (
//     <div className="relative w-full py-16 px-6 overflow-hidden rounded-[60px] border-4 border-white/10 shadow-2xl bg-slate-950">
//       {/* Dynamic Background Elements */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full animate-pulse" />
//         <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none opacity-[0.02]">
//           <span className="font-impact text-[20vw] text-white">STAND LOUD</span>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 bg-[#FFD54F] px-4 py-1 rounded-full mb-4 shadow-lg">
//              <span className="material-symbols-outlined text-[#E53935] text-[18px] animate-bounce">campaign</span>
//              <span className="text-[10px] font-black text-[#E53935] uppercase tracking-[0.2em]">The Dragon's Den</span>
//           </div>
//           <h2 className="text-6xl md:text-8xl font-impact text-white mb-2 tracking-tighter">SQUAD <span className="text-[#E53935]">ROARS</span></h2>
//         </div>

//         {/* Tactical Field Visualization */}
//         <div className="w-full h-[400px] md:h-[500px] relative border-2 border-white/10 rounded-[50px] bg-emerald-950/20 backdrop-blur-sm overflow-hidden group mb-8">
//           {/* Field Markings */}
//           <div className="absolute inset-8 border border-white/10 rounded-[30px] pointer-events-none" />
//           <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 pointer-events-none" />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full pointer-events-none" />
          
//           {/* Soccer Areas */}
//           <div className="absolute left-8 top-[25%] bottom-[25%] w-32 border-y border-r border-white/10 pointer-events-none" />
//           <div className="absolute left-8 top-[40%] bottom-[40%] w-12 border-y border-r border-white/10 pointer-events-none" />
//           <div className="absolute right-8 top-[25%] bottom-[25%] w-32 border-y border-l border-white/10 pointer-events-none" />
//           <div className="absolute right-8 top-[40%] bottom-[40%] w-12 border-y border-l border-white/10 pointer-events-none" />
          
//           {/* Floating Messages */}
//           {messages.map((msg) => (
//             <button
//               key={msg.id}
//               onClick={() => setSelectedMessage(msg)}
//               style={{ left: `${msg.x}%`, top: `${msg.y}%` }}
//               className="absolute p-3 rounded-2xl shadow-2xl hover:scale-125 transition-all hover:z-30 animate-float flex flex-col items-center gap-2 group/bubble"
//             >
//               <div 
//                 className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-lg border-2 border-white/20 relative group-hover/bubble:rotate-12 transition-transform"
//                 style={{ backgroundColor: msg.color }}
//               >
//                 <span className="material-symbols-outlined text-[24px] md:text-[28px]">chat</span>
//               </div>
//               <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full opacity-0 group-hover/bubble:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
//                 <span className="text-[9px] font-black uppercase text-white tracking-widest">
//                   For: {msg.playerName.split(' ')[0]}
//                 </span>
//               </div>
//             </button>
//           ))}
          
//           {messages.length === 0 && (
//             <div className="absolute inset-0 flex items-center justify-center text-white/5 font-impact text-4xl md:text-6xl rotate-[-5deg]">
//               READY FOR YOUR ROAR...
//             </div>
//           )}
//         </div>

//         {/* Action Button & Recent Roars Section */}
//         <div className="w-full flex flex-col items-center gap-12">
//           {/* Triggers the shared modal from App.tsx */}
//           <button 
//             type="button"
//             onClick={onOpenRoarModal}
//             className="px-12 py-5 bg-[#E53935] hover:bg-red-700 text-white rounded-[24px] font-black uppercase text-xs tracking-[0.2em] transition-all shadow-2xl shadow-red-600/20 active:scale-95 border border-white/10 flex items-center gap-2"
//           >
//             <span className="material-symbols-outlined text-[18px]">campaign</span>
//             Add Your Roar
//           </button>

//           {/* Recent Roars */}
//           <div className="w-full max-w-4xl">
//             <div className="flex items-center gap-4 mb-6">
//               <div className="h-px flex-1 bg-white/10" />
//               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Recent Roars</span>
//               <div className="h-px flex-1 bg-white/10" />
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {messages.slice(0, 6).map(msg => (
//                 <div 
//                   key={`feed-${msg.id}`} 
//                   onClick={() => setSelectedMessage(msg)}
//                   className="bg-white/[0.03] p-5 rounded-3xl border border-white/5 hover:border-[#E53935]/30 hover:bg-white/[0.05] transition-all cursor-pointer group"
//                 >
//                   <div className="flex items-center gap-3 mb-3">
//                     <div 
//                       className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs shadow-sm"
//                       style={{ backgroundColor: msg.color }}
//                     >
//                       <span className="material-symbols-outlined text-[16px]">person</span>
//                     </div>
//                     <div>
//                       <p className="text-[10px] font-black text-white uppercase tracking-tighter">To: {msg.playerName}</p>
//                       <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">From: {msg.fanName}</p>
//                     </div>
//                   </div>
//                   <p className="text-slate-400 text-xs italic leading-relaxed line-clamp-2">"{msg.content}"</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* View Message Modal */}
//       {selectedMessage && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl" onClick={() => setSelectedMessage(null)}>
//           <div 
//             className="bg-white w-full max-w-md rounded-[48px] p-10 shadow-2xl border-b-[12px] border-[#E53935] animate-hero relative overflow-hidden"
//             onClick={e => e.stopPropagation()}
//           >
//             <div className="relative z-10">
//               <div className="flex items-center gap-4 mb-8">
//                 <div 
//                   className="w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-xl"
//                   style={{ backgroundColor: selectedMessage.color }}
//                 >
//                   <span className="material-symbols-outlined text-[32px]">sports_soccer</span>
//                 </div>
//                 <div>
//                   <h4 className="font-kids text-3xl text-slate-900 leading-none mb-1">{selectedMessage.playerName}</h4>
//                   <p className="text-[#E53935] text-[10px] font-black uppercase tracking-widest">A roar from {selectedMessage.fanName}</p>
//                 </div>
//               </div>
//               <p className="text-slate-600 text-2xl font-medium italic leading-relaxed mb-8">
//                 "{selectedMessage.content}"
//               </p>
//               <button 
//                 onClick={() => setSelectedMessage(null)}
//                 className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#E53935] transition-all"
//               >
//                 GOT IT!
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translate(0, 0); }
//           25% { transform: translate(4px, -8px); }
//           50% { transform: translate(-4px, 4px); }
//           75% { transform: translate(8px, -4px); }
//         }
//         .animate-float {
//           animation: float 8s ease-in-out infinite;
//         }
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// };
