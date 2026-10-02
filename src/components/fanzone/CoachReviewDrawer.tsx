import React, { useState } from 'react';
import { PendingRoar } from '../../App';

// Props passed down from FanZone:
// - pendingRoars: list of submitted cheers waiting for approval
// - activePasskey: coach pin (from teamData.coachPasskey)
// - isUnlocked: boolean flag tracking if the coach has successfully entered the passkey
// - onUnlock: callback to elevate session to unlocked state
// - onLockClose: callback to relock and collapse the drawer
// - onApprove: callback to push cheer to Supabase/pitch
// - onReject: callback to discard cheer
// - cleanPlayerDisplay: helper function to format player names
interface CoachReviewDrawerProps {
  pendingRoars: PendingRoar[];
  activePasskey: string;
  isUnlocked: boolean;
  onUnlock: () => void;
  onLockClose: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  cleanPlayerDisplay: (rawName: string) => string;
}

export const CoachReviewDrawer: React.FC<CoachReviewDrawerProps> = ({
  pendingRoars,
  activePasskey,
  isUnlocked,
  onUnlock,
  onLockClose,
  onApprove,
  onReject,
  cleanPlayerDisplay,
}) => {
  // Local state for the password field input
  const [pin, setPin] = useState('');

  // 1. Password Verification:
  // Checks entered pin against the team passkey (case-insensitive)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim().toLowerCase() === activePasskey.toLowerCase()) {
      onUnlock();
    } else {
      alert('Incorrect Coach Passkey');
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[32px] mb-8 animate-in fade-in zoom-in-95">
      {/* State A: Locked Form - Prompts for Coach Pin */}
      {!isUnlocked ? (
        <form onSubmit={handleSubmit} className="flex items-center justify-center gap-3">
          <input
            type="password"
            placeholder={`Enter Coach Passkey (${activePasskey})`}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
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
        /* State B: Unlocked Queue - Displays pending roars */
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <h4 className="font-kids text-lg text-white">
              Pending Moderation Queue ({pendingRoars.length})
            </h4>
            <button
              type="button"
              onClick={onLockClose}
              className="text-xs text-slate-400 hover:text-white uppercase font-bold cursor-pointer"
            >
              Lock &amp; Close
            </button>
          </div>

          {/* Empty state when no roars are waiting */}
          {pendingRoars.length === 0 ? (
            <p className="text-xs text-slate-400 italic text-center py-4">
              No cheers waiting for review. All clear, Coach!
            </p>
          ) : (
            /* Scrollable list of cheers awaiting moderation */
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {pendingRoars.map((roar) => (
                <div
                  key={roar.id}
                  className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-[#FFD54F]">
                        To: {cleanPlayerDisplay(roar.player)}
                      </span>
                      <span className="text-slate-500 text-[10px]">•</span>
                      <span className="text-[10px] font-bold text-slate-400">
                        From: {roar.author}
                      </span>
                    </div>
                    <p className="text-xs text-white italic mt-1 leading-snug">
                      "{roar.message}"
                    </p>
                  </div>
                  {/* Action buttons: Reject or Approve */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      type="button"
                      onClick={() => onReject?.(roar.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-black text-[10px] uppercase cursor-pointer"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => onApprove?.(roar.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] uppercase shadow-md active:scale-95 cursor-pointer"
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
  );
};