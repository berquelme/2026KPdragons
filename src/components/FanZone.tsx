import React, { useState } from 'react';
import { FanMessage } from '../types';
import { PendingRoar } from '../App';
import { teamData } from '../data/teamData';

interface FanZoneProps {
  onOpenRoarModal?: () => void;
  messages?: FanMessage[];
  pendingRoars?: PendingRoar[];
  onApproveRoar?: (id: string) => void;
  onRejectRoar?: (id: string) => void;
  onDeleteRoar?: (id: string) => void;
}

export const FanZone: React.FC<FanZoneProps> = ({ 
  onOpenRoarModal,
  messages = [],
  pendingRoars = [],
  onApproveRoar,
  onRejectRoar,
  onDeleteRoar,
}) => {
  const [selectedMessage, setSelectedMessage] = useState<FanMessage | null>(null);
  const [isCoachMode, setIsCoachMode] = useState(false);
  const [coachPin, setCoachPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [localDeletedIds, setLocalDeletedIds] = useState<string[]>([]);

  const activePasskey = teamData.coachPasskey || 'dragons8';

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (coachPin.trim().toLowerCase() === activePasskey.toLowerCase()) {
      setIsUnlocked(true);
    } else {
      alert('Incorrect Coach Passkey');
    }
  };

  const handleDirectCoachUnlock = () => {
    const entered = window.prompt('Enter Coach Passkey to enable deletion:');
    if (entered && entered.trim().toLowerCase() === activePasskey.toLowerCase()) {
      setIsUnlocked(true);
      alert('Coach Mode Unlocked! You can now delete cheers.');
    } else if (entered) {
      alert('Incorrect passkey.');
    }
  };

  const handleDelete = (id: string, playerName: string) => {
    if (!window.confirm(`Coach: Permanently delete cheer for ${cleanPlayerDisplay(playerName)}?`)) {
      return;
    }

    if (onDeleteRoar) {
      onDeleteRoar(id);
    }

    setLocalDeletedIds((prev) => [...prev, id]);

    try {
      ['fanMessages', 'approvedRoars'].forEach((key) => {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          const filtered = parsed.filter((m: any) => m.id !== id);
          localStorage.setItem(key, JSON.stringify(filtered));
        }
      });
    } catch (err) {
      console.error(err);
    }

    setSelectedMessage(null);
  };

  const cleanPlayerDisplay = (rawName: string) => {
    if (!rawName) return 'The Team';
    const stripped = rawName.replace(/^#?\d+[\s.-]*/, '').trim();
    return stripped || rawName;
  };

  const visibleMessages = messages.filter((m) => !localDeletedIds.includes(m.id));

  // 16 distinct tactical anchor positions across the pitch (X%, Y%)
  const tacticalGrid = [
    { x: 18, y: 28 }, // Left Back
    { x: 32, y: 22 }, // Left Mid
    { x: 50, y: 20 }, // Center Mid (High)
    { x: 68, y: 24 }, // Right Mid
    { x: 82, y: 30 }, // Right Wing
    { x: 22, y: 52 }, // Left Center
    { x: 38, y: 48 }, // Center Mid
    { x: 62, y: 52 }, // Center Right
    { x: 78, y: 48 }, // Right Attack
    { x: 16, y: 72 }, // Left Wing (Deep)
    { x: 34, y: 76 }, // Midfield (Low)
    { x: 50, y: 80 }, // Center Low
    { x: 66, y: 74 }, // Right Low
    { x: 84, y: 70 }, // Right Corner
    { x: 28, y: 36 }, // Pocket Left
    { x: 72, y: 36 }, // Pocket Right
  ];

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
             <span className="text-[10px] font-black text-[#E53935] uppercase tracking-[0.2em]">
               {teamData.cheerBadge || `${teamData.shortName}'s Zone`}
             </span>
          </div>
          <h2 className="text-6xl md:text-8xl font-impact text-white mb-2 tracking-tighter uppercase">
            SQUAD <span className="text-[#E53935]">{teamData.shortName === 'Dragons' ? 'ROARS' : 'CHEERS'}</span>
          </h2>
        </div>

        {/* Coach Moderation Access Badge */}
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCoachMode(!isCoachMode)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">shield_person</span>
            {isUnlocked ? 'Coach Mode Active 🔓' : `Coach Review (${pendingRoars.length})`}
          </button>
        </div>

        {/* Coach Review Drawer */}
        {isCoachMode && (
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[32px] mb-8 animate-in fade-in zoom-in-95">
            {!isUnlocked ? (
              <form onSubmit={handleUnlock} className="flex items-center justify-center gap-3">
                <input
                  type="password"
                  placeholder={`Enter Coach Passkey (${activePasskey})`}
                  value={coachPin}
                  onChange={(e) => setCoachPin(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-slate-900/80 border border-white/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FFD54F]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FFD54F] text-slate-900 font-black text-xs uppercase rounded-xl hover:brightness-110 cursor-pointer"
                >
                  Unlock
                </button>
              </form>
            ) : (
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <h4 className="font-kids text-lg text-white">Pending Moderation Queue ({pendingRoars.length})</h4>
                  <button
                    type="button"
                    onClick={() => { setIsUnlocked(false); setIsCoachMode(false); }}
                    className="text-xs text-slate-400 hover:text-white uppercase font-bold cursor-pointer"
                  >
                    Lock & Close
                  </button>
                </div>

                {pendingRoars.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-4">No cheers waiting for review. All clear, Coach!</p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {pendingRoars.map((roar) => (
                      <div key={roar.id} className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-[#FFD54F]">To: {cleanPlayerDisplay(roar.player)}</span>
                            <span className="text-slate-500 text-[10px]">•</span>
                            <span className="text-[10px] font-bold text-slate-400">From: {roar.author}</span>
                          </div>
                          <p className="text-xs text-white italic mt-1 leading-snug">"{roar.message}"</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                          <button
                            type="button"
                            onClick={() => onRejectRoar?.(roar.id)}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-black text-[10px] uppercase transition-all cursor-pointer"
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            onClick={() => onApproveRoar?.(roar.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] uppercase shadow-md transition-all active:scale-95 cursor-pointer"
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
          
          {/* Floating Messages - Distributed cleanly across tactical grid */}
          {visibleMessages.slice(0, 16).map((msg, index) => {
            const slot = tacticalGrid[index % tacticalGrid.length];
            const offsetMultiplier = Math.floor(index / tacticalGrid.length);
            const posX = Math.min(88, Math.max(12, slot.x + (offsetMultiplier * 4)));
            const posY = Math.min(84, Math.max(16, slot.y + (offsetMultiplier * 4)));

            return (
              <button
                key={msg.id}
                type="button"
                onClick={() => setSelectedMessage(msg)}
                style={{ left: `${posX}%`, top: `${posY}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl shadow-2xl hover:scale-125 transition-all hover:z-30 animate-float flex flex-col items-center gap-1 group/bubble cursor-pointer"
              >
                <div 
                  className="w-11 h-11 md:w-13 md:h-13 rounded-2xl flex items-center justify-center text-white shadow-lg border-2 border-white/20 relative group-hover/bubble:rotate-12 transition-transform"
                  style={{ backgroundColor: msg.color || '#E53935' }}
                >
                  <span className="material-symbols-outlined text-[22px] md:text-[26px]">chat</span>
                </div>
                <div className="bg-black/85 backdrop-blur-md px-2.5 py-0.5 rounded-full opacity-0 group-hover/bubble:opacity-100 transition-opacity whitespace-nowrap border border-white/10 shadow-md">
                  <span className="text-[9px] font-black uppercase text-white tracking-widest">
                    For: {cleanPlayerDisplay(msg.playerName)}
                  </span>
                </div>
              </button>
            );
          })}
          
          {visibleMessages.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-white/5 font-impact text-4xl md:text-6xl rotate-[-5deg]">
              READY FOR YOUR CHEER...
            </div>
          )}
        </div>

        {/* Action Button & Recent Cheers Section */}
        <div className="w-full flex flex-col items-center gap-12">
          <button 
            type="button"
            onClick={onOpenRoarModal}
            className="px-12 py-5 bg-[#E53935] hover:bg-red-700 text-white rounded-[24px] font-black uppercase text-xs tracking-[0.2em] transition-all shadow-2xl shadow-red-600/20 active:scale-95 border border-white/10 flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">campaign</span>
            {teamData.shortName === 'Dragons' ? 'Add Your Roar' : 'Send A Cheer'}
          </button>

          <div className="w-full max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
                Recent {teamData.shortName === 'Dragons' ? 'Roars' : 'Cheers'}
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleMessages.slice(0, 6).map(msg => (
                <div 
                  key={`feed-${msg.id}`} 
                  onClick={() => setSelectedMessage(msg)}
                  className="bg-white/[0.03] p-5 rounded-3xl border border-white/5 hover:border-[#E53935]/30 hover:bg-white/[0.05] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs shadow-sm"
                      style={{ backgroundColor: msg.color || '#E53935' }}
                    >
                      <span className="material-symbols-outlined text-[16px]">person</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white uppercase tracking-tighter">
                        To: {cleanPlayerDisplay(msg.playerName)}
                      </p>
                      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                        From: {msg.fanName}
                      </p>
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
            className="bg-white w-full max-w-md rounded-[48px] p-8 md:p-10 shadow-2xl border-b-[12px] border-[#E53935] animate-hero relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-xl"
                    style={{ backgroundColor: selectedMessage.color || '#E53935' }}
                  >
                    <span className="material-symbols-outlined text-[32px]">sports_soccer</span>
                  </div>
                  <div>
                    <h4 className="font-kids text-3xl text-slate-900 leading-none mb-1">
                      {cleanPlayerDisplay(selectedMessage.playerName)}
                    </h4>
                    <p className="text-[#E53935] text-[10px] font-black uppercase tracking-widest">
                      Cheer from {selectedMessage.fanName}
                    </p>
                  </div>
                </div>

                {/* Secret Coach Lock trigger directly inside modal */}
                {!isUnlocked && (
                  <button
                    type="button"
                    onClick={handleDirectCoachUnlock}
                    className="text-slate-300 hover:text-slate-500 p-2 text-xs transition-colors cursor-pointer"
                    title="Coach options"
                  >
                    🔒
                  </button>
                )}
              </div>

              <p className="text-slate-600 text-xl md:text-2xl font-medium italic leading-relaxed mb-8">
                "{selectedMessage.content}"
              </p>

              <div className="flex flex-col gap-3">
                <button 
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  GOT IT!
                </button>

                {/* Delete button appears when Coach Mode is unlocked */}
                {isUnlocked && (
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedMessage.id, selectedMessage.playerName)}
                    className="w-full py-3.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    Delete Cheer (Coach Mode)
                  </button>
                )}
              </div>
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

export default FanZone;

// import React, { useState } from 'react';
// import { FanMessage } from '../types';
// import { PendingRoar } from '../App';
// import { teamData } from '../data/teamData';

// interface FanZoneProps {
//   onOpenRoarModal?: () => void;
//   messages?: FanMessage[];
//   pendingRoars?: PendingRoar[];
//   onApproveRoar?: (id: string) => void;
//   onRejectRoar?: (id: string) => void;
//   onDeleteRoar?: (id: string) => void;
// }

// export const FanZone: React.FC<FanZoneProps> = ({ 
//   onOpenRoarModal,
//   messages = [],
//   pendingRoars = [],
//   onApproveRoar,
//   onRejectRoar,
//   onDeleteRoar,
// }) => {
//   const [selectedMessage, setSelectedMessage] = useState<FanMessage | null>(null);
//   const [isCoachMode, setIsCoachMode] = useState(false);
//   const [coachPin, setCoachPin] = useState('');
//   const [isUnlocked, setIsUnlocked] = useState(false);
//   // Local state copy so deletion reflects immediately even without external handler
//   const [localDeletedIds, setLocalDeletedIds] = useState<string[]>([]);

//   const activePasskey = teamData.coachPasskey || 'dragons8';

//   const handleUnlock = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (coachPin.trim().toLowerCase() === activePasskey.toLowerCase()) {
//       setIsUnlocked(true);
//     } else {
//       alert('Incorrect Coach Passkey');
//     }
//   };

//   const handleDirectCoachUnlock = () => {
//     const entered = window.prompt('Enter Coach Passkey to enable deletion:');
//     if (entered && entered.trim().toLowerCase() === activePasskey.toLowerCase()) {
//       setIsUnlocked(true);
//       alert('Coach Mode Unlocked! You can now delete cheers.');
//     } else if (entered) {
//       alert('Incorrect passkey.');
//     }
//   };

//   const handleDelete = (id: string, playerName: string) => {
//     if (!window.confirm(`Coach: Permanently delete cheer for ${cleanPlayerDisplay(playerName)}?`)) {
//       return;
//     }

//     // 1. Call parent prop if provided
//     if (onDeleteRoar) {
//       onDeleteRoar(id);
//     }

//     // 2. Fallback: hide locally immediately
//     setLocalDeletedIds((prev) => [...prev, id]);

//     // 3. Clear from localStorage if stored there
//     try {
//       ['fanMessages', 'approvedRoars'].forEach((key) => {
//         const stored = localStorage.getItem(key);
//         if (stored) {
//           const parsed = JSON.parse(stored);
//           const filtered = parsed.filter((m: any) => m.id !== id);
//           localStorage.setItem(key, JSON.stringify(filtered));
//         }
//       });
//     } catch (err) {
//       console.error(err);
//     }

//     setSelectedMessage(null);
//   };

//   const cleanPlayerDisplay = (rawName: string) => {
//     if (!rawName) return 'The Team';
//     const stripped = rawName.replace(/^#?\d+[\s.-]*/, '').trim();
//     return stripped || rawName;
//   };

//   // Filter out any locally deleted roars
//   const visibleMessages = messages.filter((m) => !localDeletedIds.includes(m.id));

//   // Clean slot positions spread out across the pitch (Cols x Rows)
//   const pitchSlots = [
//     { x: 18, y: 30 }, { x: 34, y: 22 }, { x: 62, y: 25 }, { x: 80, y: 35 },
//     { x: 25, y: 65 }, { x: 42, y: 75 }, { x: 58, y: 60 }, { x: 76, y: 70 },
//     { x: 50, y: 45 }, { x: 15, y: 50 }, { x: 85, y: 52 }, { x: 30, y: 42 },
//     { x: 70, y: 40 }, { x: 48, y: 18 }, { x: 52, y: 82 }, { x: 22, y: 80 }
//   ];

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
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center gap-2 bg-[#FFD54F] px-4 py-1 rounded-full mb-4 shadow-lg">
//              <span className="material-symbols-outlined text-[#E53935] text-[18px] animate-bounce">campaign</span>
//              <span className="text-[10px] font-black text-[#E53935] uppercase tracking-[0.2em]">
//                {teamData.cheerBadge || `${teamData.shortName}'s Zone`}
//              </span>
//           </div>
//           <h2 className="text-6xl md:text-8xl font-impact text-white mb-2 tracking-tighter uppercase">
//             SQUAD <span className="text-[#E53935]">{teamData.shortName === 'Dragons' ? 'ROARS' : 'CHEERS'}</span>
//           </h2>
//         </div>

//         {/* Coach Moderation Access Badge */}
//         <div className="mb-6 flex items-center gap-3">
//           <button
//             type="button"
//             onClick={() => setIsCoachMode(!isCoachMode)}
//             className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
//           >
//             <span className="material-symbols-outlined text-[14px]">shield_person</span>
//             {isUnlocked ? 'Coach Mode Active 🔓' : `Coach Review (${pendingRoars.length})`}
//           </button>
//         </div>

//         {/* Coach Review Drawer */}
//         {isCoachMode && (
//           <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[32px] mb-8 animate-in fade-in zoom-in-95">
//             {!isUnlocked ? (
//               <form onSubmit={handleUnlock} className="flex items-center justify-center gap-3">
//                 <input
//                   type="password"
//                   placeholder={`Enter Coach Passkey (${activePasskey})`}
//                   value={coachPin}
//                   onChange={(e) => setCoachPin(e.target.value)}
//                   className="px-4 py-2 rounded-xl bg-slate-900/80 border border-white/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FFD54F]"
//                 />
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-[#FFD54F] text-slate-900 font-black text-xs uppercase rounded-xl hover:brightness-110 cursor-pointer"
//                 >
//                   Unlock
//                 </button>
//               </form>
//             ) : (
//               <div>
//                 <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
//                   <h4 className="font-kids text-lg text-white">Pending Moderation Queue ({pendingRoars.length})</h4>
//                   <button
//                     type="button"
//                     onClick={() => { setIsUnlocked(false); setIsCoachMode(false); }}
//                     className="text-xs text-slate-400 hover:text-white uppercase font-bold cursor-pointer"
//                   >
//                     Lock & Close
//                   </button>
//                 </div>

//                 {pendingRoars.length === 0 ? (
//                   <p className="text-xs text-slate-400 italic text-center py-4">No cheers waiting for review. All clear, Coach!</p>
//                 ) : (
//                   <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
//                     {pendingRoars.map((roar) => (
//                       <div key={roar.id} className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
//                         <div>
//                           <div className="flex items-center gap-2">
//                             <span className="text-[10px] font-black uppercase text-[#FFD54F]">To: {cleanPlayerDisplay(roar.player)}</span>
//                             <span className="text-slate-500 text-[10px]">•</span>
//                             <span className="text-[10px] font-bold text-slate-400">From: {roar.author}</span>
//                           </div>
//                           <p className="text-xs text-white italic mt-1 leading-snug">"{roar.message}"</p>
//                         </div>
//                         <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
//                           <button
//                             type="button"
//                             onClick={() => onRejectRoar?.(roar.id)}
//                             className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-black text-[10px] uppercase transition-all cursor-pointer"
//                           >
//                             Reject
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => onApproveRoar?.(roar.id)}
//                             className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] uppercase shadow-md transition-all active:scale-95 cursor-pointer"
//                           >
//                             Approve Pin 📌
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Tactical Field Visualization */}
//         <div className="w-full h-[400px] md:h-[500px] relative border-2 border-white/10 rounded-[50px] bg-emerald-950/20 backdrop-blur-sm overflow-hidden group mb-8">
//           <div className="absolute inset-8 border border-white/10 rounded-[30px] pointer-events-none" />
//           <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 pointer-events-none" />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full pointer-events-none" />
          
//           <div className="absolute left-8 top-[25%] bottom-[25%] w-32 border-y border-r border-white/10 pointer-events-none" />
//           <div className="absolute left-8 top-[40%] bottom-[40%] w-12 border-y border-r border-white/10 pointer-events-none" />
          
//           <div className="absolute right-8 top-[25%] bottom-[25%] w-32 border-y border-l border-white/10 pointer-events-none" />
//           <div className="absolute right-8 top-[40%] bottom-[40%] w-12 border-y border-l border-white/10 pointer-events-none" />
          
//           {/* Floating Messages - Distributed cleanly using pre-calculated slots */}
//           {visibleMessages.map((msg, index) => {
//             const slot = pitchSlots[index % pitchSlots.length];
//             const posX = typeof msg.x === 'number' && msg.x > 0 ? msg.x : slot.x;
//             const posY = typeof msg.y === 'number' && msg.y > 0 ? msg.y : slot.y;

//             return (
//               <button
//                 key={msg.id}
//                 type="button"
//                 onClick={() => setSelectedMessage(msg)}
//                 style={{ left: `${posX}%`, top: `${posY}%` }}
//                 className="absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl shadow-2xl hover:scale-125 transition-all hover:z-30 animate-float flex flex-col items-center gap-2 group/bubble cursor-pointer"
//               >
//                 <div 
//                   className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-lg border-2 border-white/20 relative group-hover/bubble:rotate-12 transition-transform"
//                   style={{ backgroundColor: msg.color || '#E53935' }}
//                 >
//                   <span className="material-symbols-outlined text-[24px] md:text-[28px]">chat</span>
//                 </div>
//                 <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full opacity-0 group-hover/bubble:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
//                   <span className="text-[9px] font-black uppercase text-white tracking-widest">
//                     For: {cleanPlayerDisplay(msg.playerName)}
//                   </span>
//                 </div>
//               </button>
//             );
//           })}
          
//           {visibleMessages.length === 0 && (
//             <div className="absolute inset-0 flex items-center justify-center text-white/5 font-impact text-4xl md:text-6xl rotate-[-5deg]">
//               READY FOR YOUR CHEER...
//             </div>
//           )}
//         </div>

//         {/* Action Button & Recent Cheers Section */}
//         <div className="w-full flex flex-col items-center gap-12">
//           <button 
//             type="button"
//             onClick={onOpenRoarModal}
//             className="px-12 py-5 bg-[#E53935] hover:bg-red-700 text-white rounded-[24px] font-black uppercase text-xs tracking-[0.2em] transition-all shadow-2xl shadow-red-600/20 active:scale-95 border border-white/10 flex items-center gap-2 cursor-pointer"
//           >
//             <span className="material-symbols-outlined text-[18px]">campaign</span>
//             {teamData.shortName === 'Dragons' ? 'Add Your Roar' : 'Send A Cheer'}
//           </button>

//           <div className="w-full max-w-4xl">
//             <div className="flex items-center gap-4 mb-6">
//               <div className="h-px flex-1 bg-white/10" />
//               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
//                 Recent {teamData.shortName === 'Dragons' ? 'Roars' : 'Cheers'}
//               </span>
//               <div className="h-px flex-1 bg-white/10" />
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {visibleMessages.slice(0, 6).map(msg => (
//                 <div 
//                   key={`feed-${msg.id}`} 
//                   onClick={() => setSelectedMessage(msg)}
//                   className="bg-white/[0.03] p-5 rounded-3xl border border-white/5 hover:border-[#E53935]/30 hover:bg-white/[0.05] transition-all cursor-pointer group"
//                 >
//                   <div className="flex items-center gap-3 mb-3">
//                     <div 
//                       className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs shadow-sm"
//                       style={{ backgroundColor: msg.color || '#E53935' }}
//                     >
//                       <span className="material-symbols-outlined text-[16px]">person</span>
//                     </div>
//                     <div>
//                       <p className="text-[10px] font-black text-white uppercase tracking-tighter">
//                         To: {cleanPlayerDisplay(msg.playerName)}
//                       </p>
//                       <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
//                         From: {msg.fanName}
//                       </p>
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
//             className="bg-white w-full max-w-md rounded-[48px] p-8 md:p-10 shadow-2xl border-b-[12px] border-[#E53935] animate-hero relative overflow-hidden"
//             onClick={e => e.stopPropagation()}
//           >
//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-8">
//                 <div className="flex items-center gap-4">
//                   <div 
//                     className="w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-xl"
//                     style={{ backgroundColor: selectedMessage.color || '#E53935' }}
//                   >
//                     <span className="material-symbols-outlined text-[32px]">sports_soccer</span>
//                   </div>
//                   <div>
//                     <h4 className="font-kids text-3xl text-slate-900 leading-none mb-1">
//                       {cleanPlayerDisplay(selectedMessage.playerName)}
//                     </h4>
//                     <p className="text-[#E53935] text-[10px] font-black uppercase tracking-widest">
//                       Cheer from {selectedMessage.fanName}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Secret Coach Lock trigger directly inside modal if not yet unlocked */}
//                 {!isUnlocked && (
//                   <button
//                     type="button"
//                     onClick={handleDirectCoachUnlock}
//                     className="text-slate-300 hover:text-slate-500 p-2 text-xs transition-colors"
//                     title="Coach options"
//                   >
//                     🔒
//                   </button>
//                 )}
//               </div>

//               <p className="text-slate-600 text-xl md:text-2xl font-medium italic leading-relaxed mb-8">
//                 "{selectedMessage.content}"
//               </p>

//               <div className="flex flex-col gap-3">
//                 <button 
//                   type="button"
//                   onClick={() => setSelectedMessage(null)}
//                   className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest transition-all cursor-pointer"
//                 >
//                   GOT IT!
//                 </button>

//                 {/* Delete button appears when Coach Mode is unlocked */}
//                 {isUnlocked && (
//                   <button
//                     type="button"
//                     onClick={() => handleDelete(selectedMessage.id, selectedMessage.playerName)}
//                     className="w-full py-3.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
//                   >
//                     <span className="material-symbols-outlined text-[16px]">delete</span>
//                     Delete Cheer (Coach Mode)
//                   </button>
//                 )}
//               </div>
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

// export default FanZone;
