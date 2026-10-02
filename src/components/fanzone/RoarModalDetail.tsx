import React from 'react';
import { FanMessage } from '../../types';

// Step 1: Component Interface Contract
// Defines the data and functions required to view and manage an individual cheer:
// - msg: The active cheer message object (content, author, recipient player, badge color)
// - isUnlocked: Boolean flag indicating if coach permissions are currently active
// - onClose: Callback to close the modal and return to the tactical pitch
// - onPromptUnlock: Fast-track function allowing a coach to unlock powers via window prompt
// - onDelete: Deletion handler to permanently remove the cheer
// - cleanPlayerDisplay: Formatter function to strip jersey numbers (e.g., '#8') from display text
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
  // Step 2: Modal Backdrop Overlay
  // - fixed inset-0 z-[100]: Covers the entire viewport and elevates above all pitch elements.
  // - bg-slate-950/80 backdrop-blur-xl: Creates the modern frosted dark backdrop.
  // - onClick={onClose}: Tapping anywhere outside the modal card dismisses it cleanly.
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl"
    onClick={onClose}
  >
    {/* Step 3: Modal Card Container
        - CS Rule (Event Bubbling): onClick={(e) => e.stopPropagation()} prevents clicks
          inside this white card from bubbling up to the backdrop, so clicking text, buttons,
          or whitespace inside the card does NOT accidentally close the modal.
        - border-b-[12px] border-[#E53935]: Team red dynamic accent bar across the bottom. */}
    <div
      className="bg-white w-full max-w-md rounded-[48px] p-8 md:p-10 shadow-2xl border-b-[12px] border-[#E53935] animate-hero relative overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative z-10">
        
        {/* Step 4: Card Header (Recipient, Author, & Coach Lock Icon) */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Visual badge using cheer's designated accent color */}
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

          {/* Discreet Coach Lock trigger:
              If Coach Mode is locked, this small padlock allows a coach to elevate permissions
              on the fly directly from the modal without scrolling back up to the top drawer. */}
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

        {/* Step 5: The Cheer Quote
            Styled with prominent italic typography for easy reading by players and parents */}
        <p className="text-slate-600 text-xl md:text-2xl font-medium italic leading-relaxed mb-8">
          "{msg.content}"
        </p>

        {/* Step 6: Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* Default Dismiss Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest cursor-pointer"
          >
            GOT IT!
          </button>

          {/* Conditional Coach Delete Action:
              Only mounts into the DOM when isUnlocked is true, allowing authorized coaches
              to immediately purge inappropriate or expired messages. */}
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