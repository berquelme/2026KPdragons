export interface PlayerBadgeConfig {
  number: number;
  initials: string;
  bg: string;
  text: string;
  border: string;
}

export const PLAYER_BADGE_CONFIGS: Record<string, PlayerBadgeConfig> = {
  'Bryson Nolt': {
    number: 10,
    initials: 'BN',
    bg: '#E10613', // Dragon Red
    text: '#FFFFFF',
    border: '#FF8A80',
  },
  'Jamie Dagget': {
    number: 7,
    initials: 'JD',
    bg: '#F5C400', // Dragon Gold
    text: '#1E293B',
    border: '#FFE082',
  },
  'Ellie': {
    number: 4,
    initials: 'EL',
    bg: '#0284C7', // Sky Blue
    text: '#FFFFFF',
    border: '#7DD3FC',
  },
  'Violet': {
    number: 9,
    initials: 'VI',
    bg: '#7C3AED', // Vivid Purple
    text: '#FFFFFF',
    border: '#C4B5FD',
  },
  'Tess': {
    number: 3,
    initials: 'TE',
    bg: '#059669', // Emerald Green
    text: '#FFFFFF',
    border: '#6EE7B7',
  },
  'Default': {
    number: 1,
    initials: 'BD',
    bg: '#1E293B', // Slate Dark
    text: '#FFFFFF',
    border: '#64748B',
  },
};