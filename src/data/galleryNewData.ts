import { Player } from '../types';

export const players: Player[] = [
  { num: 7, name: 'Jamie Daggett', position: 'Forward', speed: 90, image: '/galleJamie.jpg' },
  { num: 10, name: 'Bryson Nolt', position: 'Forward', speed: 88, image: '/galleBryson.jpg' },
  { num: 3, name: 'Tess Almeida', position: 'Midfielder', speed: 85, image: '/galleTess1.jpg' },
  { num: 8, name: 'Caspian Avellaneda', position: 'Defender', speed: 87, image: '/galleCas.jpg' },
  { num: 9, name: 'Elijah Sherman', position: 'Goalkeeper', speed: 85, image: '/galleEli.jpg' },
  { num: 4, name: 'Ellie Comstock', position: 'Defender', speed: 81, image: 'galleEllie.jpg' },
  { num: 6, name: 'Noah Easling', position: 'Midfielder', speed: 84, image: '/galleNoah.jpg' },
  { num: 1, name: 'Violet Tones', position: 'Midfielder', speed: 81, image: 'galleViolet.jpg' },
  { num: 5, name: 'Leon Woodard', position: 'Defender', speed: 81, image: '/galleLeon.jpg' },
  { num: 2, name: 'Pax Lepp', position: 'Defender', speed: 85, image: '/gallePax.jpg' },
];

// --- Pitch Badge Extension (Does NOT modify Player type or existing components) ---

export interface PitchBadge {
  label: string;       // "#10", "ALL", "COACH", or "JD"
  subtext?: string;    // Initials like "BN", "TEAM", "FAN"
  bg: string;          // Hex background color
  text: string;        // Hex text color
  border: string;      // Hex border color
  shape: 'circle' | 'rounded'; // Circular for roster, rounded squircle for open-field
}

// 1. Unique color themes mapped by player jersey number
const PLAYER_STYLE_BY_NUM: Record<number, { bg: string; text: string; border: string }> = {
  10: { bg: '#E10613', text: '#FFFFFF', border: '#FF8A80' }, // Bryson - Dragon Red
  7:  { bg: '#F5C400', text: '#1E293B', border: '#FFE082' }, // Jamie - Dragon Gold
  3:  { bg: '#059669', text: '#FFFFFF', border: '#6EE7B7' }, // Tess - Emerald
  8:  { bg: '#2563EB', text: '#FFFFFF', border: '#93C5FD' }, // Caspian - Royal Blue
  9:  { bg: '#EA580C', text: '#FFFFFF', border: '#FDBA74' }, // Elijah - Orange
  4:  { bg: '#0891B2', text: '#FFFFFF', border: '#67E8F9' }, // Ellie - Cyan
  6:  { bg: '#7C3AED', text: '#FFFFFF', border: '#C4B5FD' }, // Noah - Purple
  1:  { bg: '#DB2777', text: '#FFFFFF', border: '#F472B6' }, // Violet - Pink
  5:  { bg: '#4F46E5', text: '#FFFFFF', border: '#A5B4FC' }, // Leon - Indigo
  2:  { bg: '#15803D', text: '#FFFFFF', border: '#86EFAC' }, // Pax - Forest Green
};

// 2. Pre-computed normalized name lookup from your existing players array
const playerLookupByName = new Map<string, (typeof players)[number]>();
players.forEach((p) => {
  playerLookupByName.set(p.name.toLowerCase().trim(), p);
  // Also match first name alone ("Bryson" -> Bryson Nolt)
  playerLookupByName.set(p.name.split(' ')[0].toLowerCase().trim(), p);
});

/**
 * Universal resolver: handles official players, whole team, coaches, and open-field custom recipients.
 */
export const getPitchBadge = (recipientName: string = ''): PitchBadge => {
  const clean = recipientName.trim().toLowerCase();

  // Case A: Whole Team
  if (clean === 'whole team' || clean === 'all') {
    return {
      label: 'ALL',
      subtext: 'TEAM',
      bg: '#E10613',
      text: '#FFFFFF',
      border: '#F5C400',
      shape: 'rounded',
    };
  }

  // Case B: Coaching Staff
  if (clean === 'coaching staff' || clean.includes('coach')) {
    return {
      label: 'COACH',
      subtext: 'STAFF',
      bg: '#1E293B',
      text: '#F5C400',
      border: '#94A3B8',
      shape: 'rounded',
    };
  }

  // Case C: Official Roster Player
  const rosterPlayer = playerLookupByName.get(clean);
  if (rosterPlayer) {
    const style = PLAYER_STYLE_BY_NUM[rosterPlayer.num] || {
      bg: '#E10613',
      text: '#FFFFFF',
      border: '#FFFFFF',
    };

    const initials = rosterPlayer.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();

    return {
      label: `#${rosterPlayer.num}`,
      subtext: initials,
      bg: style.bg,
      text: style.text,
      border: style.border,
      shape: 'circle',
    };
  }

  // Case D: Open Field Community / Custom Recipient (Parent, sibling, supporter)
  const fallbackInitials =
    recipientName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() || '')
      .join('') || 'FAN';

  return {
    label: fallbackInitials,
    subtext: 'FAN',
    bg: '#0F172A',       // Slate dark
    text: '#F8FAFC',
    border: '#38BDF8',   // Sky blue accent
    shape: 'rounded',
  };
};