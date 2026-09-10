export interface MatchItem {
  id: number;
  week: number;
  opponent: string;
  dateStr: string; // ISO string format: 'YYYY-MM-DDTHH:mm:ss'
  timeDisplay: string;
  location: string;
  result?: string;
  dragonOfTheMatch?: string;
}

// Formats a date string into readable calendar text: e.g. "Saturday, Sep 12, 2026"
export const formatMatchDate = (isoString: string): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

// Checks if a match date has already passed relative to real-time today
export const isMatchPast = (isoString: string): boolean => {
  const matchDate = new Date(isoString);
  const now = new Date();
  return matchDate < now;
};

// Checks if a match is scheduled for today
export const isMatchToday = (isoString: string): boolean => {
  const matchDate = new Date(isoString);
  const now = new Date();
  return (
    matchDate.getFullYear() === now.getFullYear() &&
    matchDate.getMonth() === now.getMonth() &&
    matchDate.getDate() === now.getDate()
  );
};

// Returns the very next upcoming match from the schedule
export const getNextMatch = (matches: MatchItem[]): MatchItem | undefined => {
  const now = new Date();
  return matches.find((m) => new Date(m.dateStr) >= now);
};