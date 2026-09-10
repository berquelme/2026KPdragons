export type PageType = 'HOME' | 'MISSION' | 'TRAINING' | 'MATCHES' | 'NEWS' | 'ROSTER' | 'CONTACT';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
}

export interface PlayerMatchStat {
  playerNum: number;
  goals?: number;
  assists?: number;
  saves?: number;
  minutesPlayed?: number;
  cleanSheet?: boolean;
  notes?: string;
}

export interface Match {
  // Supports both number and string IDs across components
  id: number | string;
  week?: number;
  dateStr?: string;
  dateDisplay?: string;
  timeDisplay?: string;
  date?: string;
  time?: string;
  location: string;
  opponent: string;

  // Supports flat string results as used in MatchSchedule
  result?: string | {
    status: 'win' | 'draw' | 'defeat';
    score?: string;
  };
  resultType?: 'win' | 'draw' | 'loss';

  dragonOfTheMatch?: string;
  notes?: string;
  mvpReason?: string; // The specific "Dragon Power" or value they worked on

  // Optional match-by-match player stats for the roster popover and tracking
  stats?: PlayerMatchStat[];
}

export interface GalleryImage {
  id: string;
  url: string;
  name: string;
}

export interface Player {
  num: number;
  name: string;
  position?: string;
  speed?: number;
  stats?: {
    goals?: number;
    assists?: number;
    speed?: number;
    saves?: number;
  };
}

export interface FanMessage {
  id: string;
  playerName: string;
  fanName: string;
  content: string;
  timestamp: number;
  color: string;
  x: number;
  y: number;
}

// export type PageType = 'HOME' | 'MISSION' | 'TRAINING' | 'MATCHES' | 'NEWS' | 'ROSTER' | 'CONTACT';

// export interface NewsItem {
//   id: string;
//   title: string;
//   date: string;
//   excerpt: string;
//   image?: string;
// }

// export interface Match {
//   id: string;
//   opponent: string;
//   date: string;
//   time: string;
//   location: string;
//   result?: {
//     status: 'win' | 'draw' | 'defeat';
//     score?: string;
//   };
//   dragonOfTheMatch?: string;
//   mvpReason?: string; // The specific "Dragon Power" or value they worked on
// }

// export interface GalleryImage {
//   id: string;
//   url: string;
//   name: string;
// }

// export interface Player {
//   num: number;
//   name: string;
//   position: string;
//   stats: {
//     goals: number;
//     assists: number;
//     speed: number;
//   };
// }

// export interface FanMessage {
//   id: string;
//   playerName: string;
//   fanName: string;
//   content: string;
//   timestamp: number;
//   color: string;
//   x: number;
//   y: number;
// }