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

// Determina dinámicamente si la fecha corresponde a EDT (-04:00) o EST (-05:00) en New York
const getEasternOffset = (year: number, month: number, day: number): string => {
  const testDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const tzString = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    timeZoneName: 'shortOffset',
  }).format(testDate);

  const match = tzString.match(/GMT([+-]\d+)/);
  if (match) {
    const rawOffset = parseInt(match[1], 10);
    const sign = rawOffset >= 0 ? '+' : '-';
    const abs = Math.abs(rawOffset).toString().padStart(2, '0');
    return `${sign}${abs}:00`;
  }

  return '-04:00';
};

// Convierte la fecha explícitamente a Eastern Time (America/New_York)
export const parseMatchDate = (isoString: string): Date => {
  // Si ya tiene un offset explícito (+, - o Z al final), se delega al constructor nativo
  if (isoString.includes('Z') || /[+-]\d{2}:\d{2}$/.test(isoString)) {
    return new Date(isoString);
  }

  // Extraer año, mes, día, hora y minutos
  const base = isoString.includes('T') ? isoString : `${isoString}T00:00:00`;
  const [datePart, timePart = '00:00:00'] = base.split('T');
  const [year, month, day] = datePart.split('-').map(Number);

  // Obtener el offset de Eastern Time (-04:00 para octubre)
  const offset = getEasternOffset(year, month, day);

  // Al adjuntar el offset, el navegador calcula la diferencia exacta sin importar su zona horaria local
  return new Date(`${datePart}T${timePart}${offset}`);
};

// Formats a date string into readable calendar text: e.g. "Saturday, Oct 3, 2026"
export const formatMatchDate = (isoString: string): string => {
  const date = parseMatchDate(isoString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York', // Mantiene la visualización en Eastern Time
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