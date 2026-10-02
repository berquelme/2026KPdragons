import React from 'react';
import { FanMessage } from '../../types';

// Step 1: Component Contract (Props)
// Defines the exact data this component needs from its parent (FanZone):
// - msg: The roar content, author, recipient player, and badge color
// - index: The loop index (0 to 19) used to determine pitch placement
// - onSelect: The callback function triggered when a user taps this pin
// - cleanPlayerDisplay: Formatter function to strip out numbers like '#10 ' and leave clean text
interface PitchPinProps {
  msg: FanMessage;
  index: number;
  onSelect: (msg: FanMessage) => void;
  cleanPlayerDisplay: (rawName: string) => string;
}

// Step 2: Tactical Pitch Coordinate Mapping
// Pre-calculated percentage positions (X = width from left, Y = height from top).
// Spreads up to 20 pins evenly across realistic soccer formations
// (defensive third, central midfield, attacking pockets, forward line)
// so pins do not overlap each other on mobile or desktop viewports.
const TACTICAL_GRID = [
  // Row 1 - Defensive Third / Keeper Zone
  { x: 18, y: 22 },
  { x: 34, y: 18 },
  { x: 50, y: 16 },
  { x: 66, y: 18 },
  { x: 82, y: 22 },

  // Row 2 - Deep Midfield
  { x: 24, y: 34 },
  { x: 40, y: 32 },
  { x: 60, y: 32 },
  { x: 76, y: 34 },

  // Row 3 - Midfield Line & Pockets
  { x: 15, y: 48 },
  { x: 32, y: 48 },
  { x: 50, y: 48 },
  { x: 68, y: 48 },
  { x: 85, y: 48 },

  // Row 4 - Attacking Midfield
  { x: 26, y: 64 },
  { x: 42, y: 66 },
  { x: 58, y: 66 },
  { x: 74, y: 64 },

  // Row 5 - Forward Attacking Line
  { x: 30, y: 80 },
  { x: 70, y: 80 },
];

export const PitchPin: React.FC<PitchPinProps> = ({ 
  msg, 
  index, 
  onSelect, 
  cleanPlayerDisplay 
}) => {
  // Step 3: Position Calculation & Safe Bounds Math
  // - slot: Uses modulo (% 20) so any index maps cleanly into our 20 coordinate points.
  // - offset: If more than 20 messages ever render, offsets by 3% to avoid exact collisions.
  // - Math.min/Math.max (Clamping): Enforces boundaries so pins stay inside the field boundaries
  //   (X clamped between 12% and 88%, Y clamped between 16% and 84%).
  const slot = TACTICAL_GRID[index % TACTICAL_GRID.length];
  const offset = Math.floor(index / TACTICAL_GRID.length) * 3;
  const posX = Math.min(88, Math.max(12, slot.x + offset));
  const posY = Math.min(84, Math.max(16, slot.y + offset));

  return (
    // Step 4: Stationary Touch Target (The Outer Button)
    // CS Principle: Separation of Touch Target and Visual Presentation.
    // - style={{ left, top }}: Absolute percentage coordinates place the center of the button.
    // - w-14 h-14 (56x56px): Generous mobile tap area meeting Apple and Google touch guidelines (minimum 44x44px).
    // - touch-manipulation: Removes the 300ms double-tap delay on mobile Safari and Chrome.
    // - Notice: This button DOES NOT float or drift; its bounding box stays completely stationary so taps never miss.
    <button
      type="button"
      onClick={() => onSelect(msg)}
      style={{ left: `${posX}%`, top: `${posY}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer select-none group/bubble touch-manipulation active:scale-90 transition-transform"
      aria-label={`Cheer for ${cleanPlayerDisplay(msg.playerName)}`}
    >
      {/* Step 5: Visual Floating Wrapper (The Animation)
          - animate-pin-float: Applies CSS keyframe translation (up/down/tilt).
          - animationDelay: Staggers each pin by 0.5s so pins do not bob in robotic unison.
          - pointer-events-none: Critical! Tells the browser to ignore touch/click on this floating layer
            and pass the event directly to the stationary button wrapper beneath. */}
      <div 
        className="animate-pin-float pointer-events-none"
        style={{ animationDelay: `${(index % 5) * 0.5}s` }}
      >
        {/* Step 6: Visual Pin Icon & Styling
            - Dynamic background color matching the cheer (team red or custom category color).
            - Icon badge with white border and drop shadow for pitch contrast. */}
        <div 
          className="w-11 h-11 md:w-13 md:h-13 rounded-2xl flex items-center justify-center text-white shadow-xl border-2 border-white/40 transition-transform md:group-hover/bubble:rotate-12 md:group-hover/bubble:scale-110"
          style={{ backgroundColor: msg.color || '#E53935' }}
        >
          <span className="material-symbols-outlined text-[22px] md:text-[26px]">chat</span>
        </div>
      </div>

      {/* Step 7: Desktop Hover Tooltip
          - hidden md:block: Completely removed on mobile glass (no cursor exists to hover).
          - Appears on desktop mouseover to preview who the cheer is for before clicking. */}
      <div className="hidden md:block absolute -bottom-6 bg-black/85 backdrop-blur-md px-2.5 py-0.5 rounded-full opacity-0 group-hover/bubble:opacity-100 transition-opacity whitespace-nowrap border border-white/10 shadow-md pointer-events-none z-30">
        <span className="text-[9px] font-black uppercase text-white tracking-widest">
          For: {cleanPlayerDisplay(msg.playerName)}
        </span>
      </div>
    </button>
  );
};