import React from 'react';
import { FanMessage } from '../../types';

// Props passed down from FanZone:
// - msg: the active cheer being viewed
// - isUnlocked: whether coach privileges are active
// - onClose: dismisses the modal
// - onPromptUnlock: triggers passkey prompt if coach wants to delete on the fly
// - onDelete: executes deletion from Supabase / localStorage
// - cleanPlayerDisplay: helper function to format player name
interface RoarModalDetailProps {
  msg: FanMessage;
  isUnlocked: boolean;
  onClose: () => void;
  onPromptUnlock: () => void;
  onDelete: (id: string, playerName: string) => void;
  cleanPlayerDisplay: (rawName: string) => string;
}

export const RoarModalDetail: React.FC<RoarModalDetailProps> = ({
  msg,
  isUnlocked,
  onClose,
  onPromptUnlock,
  onDelete,
  cleanPlayerDisplay,
}) => (
  // 1. Backdrop Overlay:
  // Tapping the dark background calls onClose() to dismiss the modal cleanly.
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl"
    onClick={onClose}
  >
    {/* 2. Modal Card Container:
        KEY PATTERN: e.stopPropagation() prevents taps inside the modal from reaching 
        the backdrop, ensuring clicks on text or buttons don't accidentally close it. */}
    <div
      className="bg-white w-full max-w-md rounded-[48px] p-8 md:p-10 shadow-2xl border-b-[12px] border-[#E53935] animate-hero relative overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative z-10">
        
        {/* Header: Player badge, recipient name, and author */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-xl"
              style={{ backgroundColor: msg.color || '#E53935' }}
            >
              <span className="material-symbols-outlined text-[32px]">sports_soccer</span>
            </div>
            <div>
              <h4 className="font-kids text-3xl text-slate-900 leading-none mb-1">
                {cleanPlayerDisplay(msg.playerName)}
              </h4>
              <p className="text-[#E53935] text-[10px] font-black uppercase tracking-widest">
                Cheer from {msg.fanName}
              </p>
            </div>
          </div>

          {/* Discreet lock icon allowing a coach to elevate permissions on the spot */}
          {!isUnlocked && (
            <button
              type="button"
              onClick={onPromptUnlock}
              className="text-slate-300 hover:text-slate-500 p-2 text-xs cursor-pointer"
              title="Coach options"
            >
              🔒
            </button>
          )}
        </div>

        {/* The Cheer Content */}
        <p className="text-slate-600 text-xl md:text-2xl font-medium italic leading-relaxed mb-8">
          "{msg.content}"
        </p>

        {/* Action Controls */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest cursor-pointer"
          >
            GOT IT!
          </button>

          {/* Delete action only rendered if Coach Mode is unlocked */}
          {isUnlocked && (
            <button
              type="button"
              onClick={() => onDelete(msg.id, msg.playerName)}
              className="w-full py-3.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              Delete Cheer (Coach Mode)
            </button>
          )}
        </div>

      </div>
    </div>
  </div>
);