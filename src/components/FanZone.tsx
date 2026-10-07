import React, { useState } from 'react';
import { FanMessage } from '../types';
import { PendingRoar } from '../App';
import { teamData } from '../data/teamData';

import { PitchPin } from './fanzone/PitchPin';
import { CoachReviewDrawer } from './fanzone/CoachReviewDrawer';
import { RoarModalDetail } from './fanzone/RoarModalDetail';
import { RoarFeedArchive } from './fanzone/RoarFeedArchive';

interface FanZoneProps {
  onOpenRoarModal?: () => void;
  messages?: FanMessage[];
  pendingRoars?: PendingRoar[];
  onApproveRoar?: (id: string) => void;
  onRejectRoar?: (id: string) => void;
  onDeleteRoar?: (id: string) => void;
}

const cleanPlayerDisplay = (rawName: string) => {
  if (!rawName) return 'The Team';
  const stripped = rawName.replace(/^#?\d+[\s.-]*/, '').trim();
  return stripped || rawName;
};

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
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [localDeletedIds, setLocalDeletedIds] = useState<string[]>([]);

  const activePasskey = teamData.coachPasskey || 'dragons8';

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
    if (!window.confirm(`Coach: Permanently delete cheer for ${cleanPlayerDisplay(playerName)}?`)) return;
    
    onDeleteRoar?.(id);
    setLocalDeletedIds((prev) => [...prev, id]);

    try {
      ['fanMessages', 'approvedRoars'].forEach((key) => {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          localStorage.setItem(key, JSON.stringify(parsed.filter((m: any) => m.id !== id)));
        }
      });
    } catch (err) {
      console.error(err);
    }
    setSelectedMessage(null);
  };

  const visibleMessages = messages.filter((m) => !localDeletedIds.includes(m.id));

  const sortedMessages = [...visibleMessages].sort((a, b) => {
    const dateA = new Date((a as any).createdAt || (a as any).timestamp || 0).getTime();
    const dateB = new Date((b as any).createdAt || (b as any).timestamp || 0).getTime();
    if (dateA && dateB) return dateB - dateA;

    const numA = Number(a.id);
    const numB = Number(b.id);
    if (!isNaN(numA) && !isNaN(numB)) return numB - numA;

    return 0;
  });

  const pitchMessages = sortedMessages.slice(0, 20);

  return (
    <div className="relative w-full py-16 px-6 overflow-hidden rounded-[60px] border-4 border-white/10 shadow-2xl bg-slate-950">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
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

        <div className="mb-6">
          <button
            type="button"
            onClick={() => setIsCoachMode(!isCoachMode)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">shield_person</span>
            {isUnlocked ? 'Coach Mode Active 🔓' : `Coach Review (${pendingRoars.length})`}
          </button>
        </div>

        {isCoachMode && (
          <CoachReviewDrawer
            pendingRoars={pendingRoars}
            activePasskey={activePasskey}
            isUnlocked={isUnlocked}
            onUnlock={() => setIsUnlocked(true)}
            onLockClose={() => { setIsUnlocked(false); setIsCoachMode(false); }}
            onApprove={onApproveRoar}
            onReject={onRejectRoar}
            cleanPlayerDisplay={cleanPlayerDisplay}
          />
        )}

        <div className="w-full h-[400px] md:h-[500px] relative border-2 border-white/10 rounded-[50px] bg-emerald-950/20 backdrop-blur-sm overflow-hidden mb-8">
          <div className="absolute inset-8 border border-white/10 rounded-[30px] pointer-events-none" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full pointer-events-none" />
          <div className="absolute left-8 top-[25%] bottom-[25%] w-32 border-y border-r border-white/10 pointer-events-none" />
          <div className="absolute right-8 top-[25%] bottom-[25%] w-32 border-y border-l border-white/10 pointer-events-none" />
          
          {pitchMessages.map((msg, index) => (
            <PitchPin 
              key={msg.id} 
              msg={msg} 
              index={index} 
              onSelect={setSelectedMessage} 
              cleanPlayerDisplay={cleanPlayerDisplay} 
            />
          ))}
          
          {pitchMessages.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-white/5 font-impact text-4xl md:text-6xl rotate-[-5deg]">
              READY FOR YOUR CHEER...
            </div>
          )}
        </div>

        <button 
          type="button"
          onClick={onOpenRoarModal}
          className="px-12 py-5 bg-[#E53935] hover:bg-red-700 text-white rounded-[24px] font-black uppercase text-xs tracking-[0.2em] transition-all shadow-2xl shadow-red-600/20 active:scale-95 border border-white/10 flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">campaign</span>
          {teamData.shortName === 'Dragons' ? 'Add Your Roar' : 'Send A Cheer'}
        </button>

        <RoarFeedArchive
          messages={sortedMessages}
          onSelectMessage={setSelectedMessage}
          onOpenRoarModal={onOpenRoarModal}
          cleanPlayerDisplay={cleanPlayerDisplay}
        />
      </div>

      {selectedMessage && (
        <RoarModalDetail
          msg={selectedMessage}
          isUnlocked={isUnlocked}
          onClose={() => setSelectedMessage(null)}
          onPromptUnlock={handleDirectCoachUnlock}
          onDelete={handleDelete}
          cleanPlayerDisplay={cleanPlayerDisplay}
        />
      )}

      <style>{`
        @keyframes pin-float-wiggle {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-4px) rotate(-3deg);
          }
          50% {
            transform: translateY(3px) rotate(2deg);
          }
          75% {
            transform: translateY(-2px) rotate(-1deg);
          }
        }
        .animate-pin-float {
          animation: pin-float-wiggle 4.5s ease-in-out infinite;
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

// // Modular Subcomponents
// import { PitchPin } from './fanzone/PitchPin';
// import { CoachReviewDrawer } from './fanzone/CoachReviewDrawer';
// import { RoarModalDetail } from './fanzone/RoarModalDetail';
// import { RoarFeedArchive } from './fanzone/RoarFeedArchive';

// interface FanZoneProps {
//   onOpenRoarModal?: () => void;
//   messages?: FanMessage[];
//   pendingRoars?: PendingRoar[];
//   onApproveRoar?: (id: string) => void;
//   onRejectRoar?: (id: string) => void;
//   onDeleteRoar?: (id: string) => void;
// }

// // Utility: Strips jersey prefixes like '#10 ' so the display shows clean names
// const cleanPlayerDisplay = (rawName: string) => {
//   if (!rawName) return 'The Team';
//   const stripped = rawName.replace(/^#?\d+[\s.-]*/, '').trim();
//   return stripped || rawName;
// };

// export const FanZone: React.FC<FanZoneProps> = ({ 
//   onOpenRoarModal,
//   messages = [],
//   pendingRoars = [],
//   onApproveRoar,
//   onRejectRoar,
//   onDeleteRoar,
// }) => {
//   // State management:
//   // - selectedMessage: When set, opens the RoarModalDetail popup card
//   // - isCoachMode: Toggles visibility of the top coach passkey / moderation drawer
//   // - isUnlocked: True once the coach enters the correct passkey
//   // - localDeletedIds: Tracks deletions locally so UI updates instantly without full reload
//   const [selectedMessage, setSelectedMessage] = useState<FanMessage | null>(null);
//   const [isCoachMode, setIsCoachMode] = useState(false);
//   const [isUnlocked, setIsUnlocked] = useState(false);
//   const [localDeletedIds, setLocalDeletedIds] = useState<string[]>([]);

//   const activePasskey = teamData.coachPasskey || 'dragons8';

//   // Fast-track unlock from within the individual card modal
//   const handleDirectCoachUnlock = () => {
//     const entered = window.prompt('Enter Coach Passkey to enable deletion:');
//     if (entered && entered.trim().toLowerCase() === activePasskey.toLowerCase()) {
//       setIsUnlocked(true);
//       alert('Coach Mode Unlocked! You can now delete cheers.');
//     } else if (entered) {
//       alert('Incorrect passkey.');
//     }
//   };

//   // Deletes cheer from memory, parent callback, and localStorage cache
//   const handleDelete = (id: string, playerName: string) => {
//     if (!window.confirm(`Coach: Permanently delete cheer for ${cleanPlayerDisplay(playerName)}?`)) return;
    
//     onDeleteRoar?.(id);
//     setLocalDeletedIds((prev) => [...prev, id]);

//     try {
//       ['fanMessages', 'approvedRoars'].forEach((key) => {
//         const stored = localStorage.getItem(key);
//         if (stored) {
//           const parsed = JSON.parse(stored);
//           localStorage.setItem(key, JSON.stringify(parsed.filter((m: any) => m.id !== id)));
//         }
//       });
//     } catch (err) {
//       console.error(err);
//     }
//     setSelectedMessage(null);
//   };

//   // Step 1: Remove any cheers deleted in the current session
//   const visibleMessages = messages.filter((m) => !localDeletedIds.includes(m.id));

//   // Step 2: Chronological Sort (Newest to Oldest)
//   // Ensures newly approved roars immediately claim the top spot on the pitch
//   const sortedMessages = [...visibleMessages].sort((a, b) => {
//     const dateA = new Date((a as any).createdAt || (a as any).timestamp || 0).getTime();
//     const dateB = new Date((b as any).createdAt || (b as any).timestamp || 0).getTime();
//     if (dateA && dateB) return dateB - dateA;

//     // Fallback: Compare numeric IDs if timestamps are absent
//     const numA = Number(a.id);
//     const numB = Number(b.id);
//     if (!isNaN(numA) && !isNaN(numB)) return numB - numA;

//     return 0;
//   });

//   // Step 3: Top 20 newest roars live on the tactical pitch
//   const pitchMessages = sortedMessages.slice(0, 20);

//   return (
//     <div className="relative w-full py-16 px-6 overflow-hidden rounded-[60px] border-4 border-white/10 shadow-2xl bg-slate-950">
      
//       {/* Background Ambience Layers */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full animate-pulse" />
//         <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
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

//         {/* Coach Mode Trigger Button */}
//         <div className="mb-6">
//           <button
//             type="button"
//             onClick={() => setIsCoachMode(!isCoachMode)}
//             className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
//           >
//             <span className="material-symbols-outlined text-[14px]">shield_person</span>
//             {isUnlocked ? 'Coach Mode Active 🔓' : `Coach Review (${pendingRoars.length})`}
//           </button>
//         </div>

//         {/* Coach Review Drawer Subcomponent */}
//         {isCoachMode && (
//           <CoachReviewDrawer
//             pendingRoars={pendingRoars}
//             activePasskey={activePasskey}
//             isUnlocked={isUnlocked}
//             onUnlock={() => setIsUnlocked(true)}
//             onLockClose={() => { setIsUnlocked(false); setIsCoachMode(false); }}
//             onApprove={onApproveRoar}
//             onReject={onRejectRoar}
//             cleanPlayerDisplay={cleanPlayerDisplay}
//           />
//         )}

//         {/* Tactical Pitch Canvas - Holds Up To 20 Live Roars */}
//         <div className="w-full h-[400px] md:h-[500px] relative border-2 border-white/10 rounded-[50px] bg-emerald-950/20 backdrop-blur-sm overflow-hidden mb-8">
//           {/* Pitch Field Line Markings */}
//           <div className="absolute inset-8 border border-white/10 rounded-[30px] pointer-events-none" />
//           <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 pointer-events-none" />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full pointer-events-none" />
//           <div className="absolute left-8 top-[25%] bottom-[25%] w-32 border-y border-r border-white/10 pointer-events-none" />
//           <div className="absolute right-8 top-[25%] bottom-[25%] w-32 border-y border-l border-white/10 pointer-events-none" />
          
//           {/* Pitch Pins: Up to 20 newest roars positioned on tactical coordinates */}
//           {pitchMessages.map((msg, index) => (
//             <PitchPin 
//               key={msg.id} 
//               msg={msg} 
//               index={index} 
//               onSelect={setSelectedMessage} 
//               cleanPlayerDisplay={cleanPlayerDisplay} 
//             />
//           ))}
          
//           {/* Pitch Empty State */}
//           {pitchMessages.length === 0 && (
//             <div className="absolute inset-0 flex items-center justify-center text-white/5 font-impact text-4xl md:text-6xl rotate-[-5deg]">
//               READY FOR YOUR CHEER...
//             </div>
//           )}
//         </div>

//         {/* Action Button: Open Cheer Submission Form */}
//         <button 
//           type="button"
//           onClick={onOpenRoarModal}
//           className="px-12 py-5 bg-[#E53935] hover:bg-red-700 text-white rounded-[24px] font-black uppercase text-xs tracking-[0.2em] transition-all shadow-2xl shadow-red-600/20 active:scale-95 border border-white/10 flex items-center gap-2 cursor-pointer"
//         >
//           <span className="material-symbols-outlined text-[18px]">campaign</span>
//           {teamData.shortName === 'Dragons' ? 'Add Your Roar' : 'Send A Cheer'}
//         </button>

//         {/* Modular Cheer Archive: Player Filtering & Load More Pagination */}
//         <RoarFeedArchive
//           messages={sortedMessages}
//           onSelectMessage={setSelectedMessage}
//           onOpenRoarModal={onOpenRoarModal}
//           cleanPlayerDisplay={cleanPlayerDisplay}
//         />
//       </div>

//       {/* Message Modal Subcomponent */}
//       {selectedMessage && (
//         <RoarModalDetail
//           msg={selectedMessage}
//           isUnlocked={isUnlocked}
//           onClose={() => setSelectedMessage(null)}
//           onPromptUnlock={handleDirectCoachUnlock}
//           onDelete={handleDelete}
//           cleanPlayerDisplay={cleanPlayerDisplay}
//         />
//       )}

//       {/* Organic Floating Animation Keyframes */}
//       <style>{`
//         @keyframes pin-float-wiggle {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           25% {
//             transform: translateY(-4px) rotate(-3deg);
//           }
//           50% {
//             transform: translateY(3px) rotate(2deg);
//           }
//           75% {
//             transform: translateY(-2px) rotate(-1deg);
//           }
//         }
//         .animate-pin-float {
//           animation: pin-float-wiggle 4.5s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default FanZone;