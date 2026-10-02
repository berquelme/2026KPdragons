export interface MatchItem {
  id: number;
  week: number;
  opponent: string;
  dateStr: string; // Format: 'YYYY-MM-DDTHH:mm:ss'
  timeDisplay: string;
  location: string;
  result?: string;
  dragonOfTheMatch?: string;
}

// Parses the date string safely into an Eastern Time Date object
export const parseMatchDate = (isoString: string): Date => {
  // If the string already has an offset (like -04:00 or Z), let Date parse it directly
  if (isoString.includes('Z') || isoString.includes('+') || isoString.slice(10).includes('-')) {
    return new Date(isoString);
  }

  // Parse [YYYY, MM, DD, HH, mm, ss] manually so browser timezone quirks cannot misinterpret it
  const [datePart, timePart = '00:00:00'] = isoString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes, seconds = 0] = timePart.split(':').map(Number);

  // Month is 0-indexed in JS (0 = Jan, 9 = Oct)
  return new Date(year, month - 1, day, hours, minutes, seconds);
};

// Formats a date string into readable calendar text: e.g. "Saturday, Oct 3, 2026"
export const formatMatchDate = (isoString: string): string => {
  const date = parseMatchDate(isoString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

// Checks if a match date has already passed relative to real-time today
export const isMatchPast = (isoString: string): boolean => {
  const matchDate = parseMatchDate(isoString);
  const now = new Date();
  return matchDate.getTime() < now.getTime();
};

// Checks if a match is scheduled for today
export const isMatchToday = (isoString: string): boolean => {
  const matchDate = parseMatchDate(isoString);
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
  return matches.find((m) => parseMatchDate(m.dateStr).getTime() >= now.getTime());
};

// Calculates remaining days, hours, minutes, seconds for countdowns
export const getTimeRemaining = (isoString: string) => {
  const target = parseMatchDate(isoString).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isComplete: false };
};

// export interface MatchItem {
//   id: number;
//   week: number;
//   opponent: string;
//   dateStr: string; // ISO string format: 'YYYY-MM-DDTHH:mm:ss'
//   timeDisplay: string;
//   location: string;
//   result?: string;
//   dragonOfTheMatch?: string;
// }

// // Formats a date string into readable calendar text: e.g. "Saturday, Sep 12, 2026"
// export const formatMatchDate = (isoString: string): string => {
//   const date = new Date(isoString);
//   return new Intl.DateTimeFormat('en-US', {
//     weekday: 'long',
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   }).format(date);
// };

// // Checks if a match date has already passed relative to real-time today
// export const isMatchPast = (isoString: string): boolean => {
//   const matchDate = new Date(isoString);
//   const now = new Date();
//   return matchDate < now;
// };

// // Checks if a match is scheduled for today
// export const isMatchToday = (isoString: string): boolean => {
//   const matchDate = new Date(isoString);
//   const now = new Date();
//   return (
//     matchDate.getFullYear() === now.getFullYear() &&
//     matchDate.getMonth() === now.getMonth() &&
//     matchDate.getDate() === now.getDate()
//   );
// };

// // Returns the very next upcoming match from the schedule
// export const getNextMatch = (matches: MatchItem[]): MatchItem | undefined => {
//   const now = new Date();
//   return matches.find((m) => new Date(m.dateStr) >= now);
// };