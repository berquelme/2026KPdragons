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
  id: number | string;
  week?: number;
  dateStr?: string;
  dateDisplay?: string;
  timeDisplay?: string;
  date?: string;
  time?: string;
  location: string;
  opponent: string;

  result?: string | {
    status: 'win' | 'draw' | 'defeat';
    score?: string;
  };
  resultType?: 'win' | 'draw' | 'loss';

  dragonOfTheMatch?: string;
  notes?: string;
  mvpReason?: string;

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
  image?: string;
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

export interface TeamPower {
  id: number;
  title: string;
  subtitle: string;
}

export interface TeamContact {
  role: string;
  name: string;
  email: string;
  icon: string;
}

export interface TeamTheme {
  primary: string;
  secondary: string;
}

export interface TeamInfo {
  name: string;
  shortName: string;
  mascot: string;
  ageGroup: string;
  season: string;
  theme?: TeamTheme;
  slogan: string;
  heroSubtitle?: string;
  heroHeadlineTop?: string;
  heroHeadlineBottom?: string;
  mascotImage?: string;
  heroImage?: string;
  homeFieldTitle?: string;
  homeFieldDesc?: string;
  trainingTitle?: string;
  trainingDesc?: string;
  mvpAwardName: string;
  cheerWallTitle: string;
  cheerButtonText?: string;
  cheerWallSubtitle: string;
  cheerBadge?: string;
  coachPasskey?: string;
  oathTitle?: string;
  powersTitle?: string;
  powers?: TeamPower[];
  formspreeEndpoint: string;
  contactStaff?: TeamContact[];
  groundsAddress?: {
    street: string;
    cityStateZip: string;
  };
}