import { MATCHES_DATA } from '../data/matches';
import { Match } from '../types';

export interface SeasonStats {
  wins: number;
  ties: number;
  losses: number;
  goalsScored: number;
  goalsAllowed: number;
  scoredRatio: number;
}

export function calculateSeasonStats(matches: Match[] = MATCHES_DATA): SeasonStats {
  const initial = {
    wins: 0,
    ties: 0,
    losses: 0,
    goalsScored: 0,
    goalsAllowed: 0,
  };

  const totals = matches.reduce((acc, match) => {
    // Only count completed games that have a resultType
    if (!match.resultType) return acc;

    // 1. Tally Record
    if (match.resultType === 'win') {
      acc.wins += 1;
    } else if (match.resultType === 'draw') {
      acc.ties += 1;
    } else if (match.resultType === 'loss') {
      acc.losses += 1;
    }

    // 2. Sum Goals Scored from player stats
    const goalsScoredInMatch =
      match.stats?.reduce((sum, player) => sum + (player.goals || 0), 0) || 0;
    acc.goalsScored += goalsScoredInMatch;

    // 3. Extract Goals Allowed from the result string (e.g. "WIN 5 - 0", "DRAW 1 - 1")
    if (typeof match.result === 'string' && match.result.includes('-')) {
      const parts = match.result.split('-');
      if (parts.length > 1) {
        const opponentScore = parseInt(parts[1].trim(), 10);
        if (!isNaN(opponentScore)) {
          acc.goalsAllowed += opponentScore;
        }
      }
    }

    return acc;
  }, initial);

  const totalGoals = totals.goalsScored + totals.goalsAllowed;
  const scoredRatio = totalGoals > 0 ? (totals.goalsScored / totalGoals) * 100 : 50;

  return {
    ...totals,
    scoredRatio,
  };
}