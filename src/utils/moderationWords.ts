
export const BLOCKED_KEYWORDS: string[] = [
  'damn',
  'hell',
  'crap',
  'suck',
  'sucks',
  'stupid',
  'dumb',
  'idiot',
  'loser',
  'losers',
  'hate',
  'fuck',
  'cunt',
  'trash',
  'terrible',
  'awful',
  'worst',
  'cheat',
  'cheater',
  'ref sucks',
  'blind ref',
  'bench warmer',
];

export const SPAM_PATTERNS: string[] = [
  'http://',
  'https://',
  '.com',
  '.net',
  '.org',
  'crypto',
  'discount',
];

export const FLAGGED_KEYWORDS: string[] = [
  'score',
  'lost',
  'lose',
  'ref',
  'referee',
  'foul',
  'call',
  'unfair',
  'coach',
  'playing time',
];

export interface ModerationResult {
  isPermitted: boolean;
  needsReview: boolean;
  reason?: string;
}

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const inspectRoar = (text: string): ModerationResult => {
  const normalized = text.toLowerCase().trim();

  if (normalized.length < 3) {
    return { isPermitted: false, needsReview: false, reason: 'Cheer is too short.' };
  }
  if (normalized.length > 180) {
    return { isPermitted: false, needsReview: false, reason: 'Please keep cheers under 180 characters.' };
  }

  const hasSpam = SPAM_PATTERNS.some((pattern) => normalized.includes(pattern));
  if (hasSpam) {
    return {
      isPermitted: false,
      needsReview: false,
      reason: 'Links and promotional messages are not permitted.',
    };
  }

  const hasBlocked = BLOCKED_KEYWORDS.some((word) => {
    const pattern = new RegExp(`\\b${escapeRegex(word)}\\b`, 'i');
    return pattern.test(normalized);
  });

  if (hasBlocked) {
    return {
      isPermitted: false,
      needsReview: false,
      reason: 'Please ensure all cheers are positive and encourage our young players!',
    };
  }

  const hasFlagged = FLAGGED_KEYWORDS.some((word) => {
    const pattern = new RegExp(`\\b${escapeRegex(word)}\\b`, 'i');
    return pattern.test(normalized);
  });

  return {
    isPermitted: true,
    needsReview: hasFlagged,
  };
};