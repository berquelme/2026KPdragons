import React from 'react';
import { FanMessage } from '../../types';
import { getPitchBadge } from '../../data/galleryNewData';

interface PitchPinProps {
  msg: FanMessage;
  index: number;
  onSelect: (msg: FanMessage) => void;
  cleanPlayerDisplay: (name: string) => string;
}

// 20 pre-spaced tactical slots with 10-15% guaranteed clearance across all axes
const SAFE_FORMATION_SLOTS = [
  // Center Line & Attacking Midfield
  { x: 50, y: 50 },
  { x: 50, y: 26 },
  { x: 50, y: 74 },
  
  // Left Midfield / Half-Space
  { x: 38, y: 38 },
  { x: 38, y: 62 },
  
  // Right Midfield / Half-Space
  { x: 62, y: 38 },
  { x: 62, y: 62 },

  // Left Attacking Pockets
  { x: 26, y: 24 },
  { x: 24, y: 50 },
  { x: 26, y: 76 },

  // Right Attacking Pockets
  { x: 74, y: 24 },
  { x: 76, y: 50 },
  { x: 74, y: 76 },

  // Left Outer Wings & Touchline
  { x: 15, y: 34 },
  { x: 15, y: 66 },

  // Right Outer Wings & Touchline
  { x: 85, y: 34 },
  { x: 85, y: 66 },

  // Central Channel Floaters
  { x: 42, y: 16 },
  { x: 58, y: 16 },
  { x: 50, y: 84 },
];

export const PitchPin: React.FC<PitchPinProps> = ({
  msg,
  index,
  onSelect,
  cleanPlayerDisplay,
}) => {
  const rawTarget = (msg as any).player || (msg as any).playerName || '';
  const cleanTarget = cleanPlayerDisplay(rawTarget);
  const badge = getPitchBadge(cleanTarget);

  // Deterministic, non-overlapping slot assignment based on render index
  const slot = SAFE_FORMATION_SLOTS[index % SAFE_FORMATION_SLOTS.length];

  return (
    <button
      type="button"
      onClick={() => onSelect(msg)}
      style={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        backgroundColor: badge.bg,
        color: badge.text,
        borderColor: badge.border,
      }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 ${
        badge.shape === 'circle' ? 'rounded-full' : 'rounded-xl'
      } border-2 shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-125 hover:z-30 active:scale-95 cursor-pointer select-none animate-pin-float touch-manipulation`}
      title={`Cheer for ${cleanTarget}`}
    >
      <span className="text-[11px] sm:text-[12px] font-black leading-none drop-shadow-sm">
        {badge.label}
      </span>

      {badge.subtext && (
        <span className="text-[7px] font-extrabold uppercase tracking-tight leading-none mt-0.5 opacity-90">
          {badge.subtext}
        </span>
      )}
    </button>
  );
};

export default PitchPin;