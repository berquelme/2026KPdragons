import React from 'react';
import { FanMessage } from '../../types';

// this component has one job only, which is to display a single pin on the pitch and make sure mobile taps work seamlessly.
// The props this pin needs from the parent FanZone:
// - msg: the specific cheer message data (author, player, color, content)
// - index: which number cheer this is (used to place it on the tactical grid)
// - onSelect: what happens when a fan taps it (opens the message detail card)
// - cleanPlayerDisplay: helper function to strip "#4 " and just show the player name
interface PitchPinProps {
  msg: FanMessage;
  index: number;
  onSelect: (msg: FanMessage) => void;
  cleanPlayerDisplay: (rawName: string) => string;
}

// 16 tactical coordinates across the soccer pitch (X% from left, Y% from top)
// This distributes cheers like players in tactical formations instead of stacking on top of each other.
const TACTICAL_GRID = [
  { x: 18, y: 28 }, { x: 32, y: 22 }, { x: 50, y: 20 }, { x: 68, y: 24 },
  { x: 82, y: 30 }, { x: 22, y: 52 }, { x: 38, y: 48 }, { x: 62, y: 52 },
  { x: 78, y: 48 }, { x: 16, y: 72 }, { x: 34, y: 76 }, { x: 50, y: 80 },
  { x: 66, y: 74 }, { x: 84, y: 70 }, { x: 28, y: 36 }, { x: 72, y: 36 },
];

export const PitchPin: React.FC<PitchPinProps> = ({ 
  msg, 
  index, 
  onSelect, 
  cleanPlayerDisplay 
}) => {
  // 1. Math positioning:
  // slot picks one of the 16 coordinate pairs above based on index.
  // offset shifts subsequent cheers if there are more than 16, preventing exact overlaps.
  const slot = TACTICAL_GRID[index % TACTICAL_GRID.length];
  const offset = Math.floor(index / TACTICAL_GRID.length) * 4;

  // Math.min/max keeps the pin inside the boundaries of the field (12% to 88% width, 16% to 84% height)
  const posX = Math.min(88, Math.max(12, slot.x + offset));
  const posY = Math.min(84, Math.max(16, slot.y + offset));

  return (
    // 2. The Hit Target (Outer Button):
    // KEY FIX: This button stays completely still at posX, posY.
    // It is sized at w-14 h-14 (56x56px), which meets Apple and Google touch guidelines.
    // 'touch-manipulation' removes the mobile 300ms double-tap zoom delay so taps register immediately.
    <button
      type="button"
      onClick={() => onSelect(msg)}
      style={{ left: `${posX}%`, top: `${posY}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer select-none group/bubble touch-manipulation active:scale-90 transition-transform"
      aria-label={`Cheer for ${cleanPlayerDisplay(msg.playerName)}`}
    >
      {/* 3. The Visual Animation Wrapper:
          KEY FIX: 'pointer-events-none' ensures touch events pass through this floating div 
          straight into the static button behind it.
          animationDelay staggers the wiggles so pins don't bob in unison like robots. */}
      <div 
        className="animate-pin-float pointer-events-none"
        style={{ animationDelay: `${(index % 5) * 0.6}s` }}
      >
        {/* The visual circular badge with the team color and chat icon */}
        <div 
          className="w-11 h-11 md:w-13 md:h-13 rounded-2xl flex items-center justify-center text-white shadow-xl border-2 border-white/40 transition-transform md:group-hover/bubble:rotate-12 md:group-hover/bubble:scale-110"
          style={{ backgroundColor: msg.color || '#E53935' }}
        >
          <span className="material-symbols-outlined text-[22px] md:text-[26px]">chat</span>
        </div>
      </div>

      {/* 4. Desktop Hover Label:
          Hidden on mobile screens ('hidden md:block'), but shows player name when a mouse hovers on desktop. */}
      <div className="hidden md:block absolute -bottom-6 bg-black/85 backdrop-blur-md px-2.5 py-0.5 rounded-full opacity-0 group-hover/bubble:opacity-100 transition-opacity whitespace-nowrap border border-white/10 shadow-md pointer-events-none z-30">
        <span className="text-[9px] font-black uppercase text-white tracking-widest">
          For: {cleanPlayerDisplay(msg.playerName)}
        </span>
      </div>
    </button>
  );
};