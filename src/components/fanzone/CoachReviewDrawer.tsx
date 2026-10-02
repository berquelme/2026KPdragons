import React, { useState } from 'react';
import { PendingRoar } from '../../App';

// Step 1: Component Contract (Props)
// Defines the communication bridge between FanZone and this moderation drawer:
// - pendingRoars: Array of submitted cheers that are waiting for coach inspection
// - activePasskey: The secret code required to unlock moderation actions
// - isUnlocked: Boolean flag indicating if the coach entered the correct passkey
// - onUnlock: Callback to switch FanZone state to unlocked
// - onLockClose: Callback to relock and collapse the drawer
// - onApprove: Callback to move a cheer from pending to the active pitch
// - onReject: Callback to discard an inappropriate cheer
// - cleanPlayerDisplay: Formatter function to strip jersey numbers from display names
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
  // Step 2: Local Form State
  // Tracks what the coach types into the password field before submitting.
  // Keeping this state local prevents re-rendering the whole tactical pitch on every keystroke.
  const [pin, setPin] = useState('');

  // Step 3: Passkey Validation Handler
  // Compares the entered PIN against activePasskey (case-insensitive and trimmed).
  // If correct, it triggers onUnlock(); otherwise, it warns the user without granting access.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim().toLowerCase() === activePasskey.toLowerCase()) {
      onUnlock();
    } else {
      alert('Incorrect Coach Passkey');
    }
  };

  return (
    // Step 4: Drawer Container
    // Frosted glass styling (backdrop-blur-xl) that sits right above the pitch
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[32px] mb-8 animate-in fade-in zoom-in-95">
      
      {/* Step 5: Conditional Branch A - Locked State
          If the coach has not unlocked yet, only display the password entry form */}
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
        /* Step 6: Conditional Branch B - Unlocked Moderation Queue
           Once verified, reveal the moderation panel and pending cheers */
        <div>
          {/* Header with counter and Lock & Close button */}
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

          {/* Sub-branch: Empty Queue Notice */}
          {pendingRoars.length === 0 ? (
            <p className="text-xs text-slate-400 italic text-center py-4">
              No cheers waiting for review. All clear, Coach!
            </p>
          ) : (
            /* Sub-branch: Scrollable Cheer Cards
               max-h-64 with overflow-y-auto ensures the queue never pushes the pitch offscreen */
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {pendingRoars.map((roar) => (
                <div
                  key={roar.id}
                  className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                >
                  {/* Left: Cheer Details (Recipient, Author, Message) */}
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

                  {/* Right: Moderation Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    {/* Discard cheer */}
                    <button
                      type="button"
                      onClick={() => onReject?.(roar.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-black text-[10px] uppercase cursor-pointer"
                    >
                      Reject
                    </button>
                    {/* Approve and post directly to tactical pitch */}
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