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

    // 2. Extract Goals Scored & Allowed from the result string (e.g. "WIN 3 - 0", "DRAW 1 - 1")
    let matchGoalsScored = 0;
    let matchGoalsAllowed = 0;
    let parsedFromResult = false;

    if (typeof match.result === 'string' && match.result.includes('-')) {
      const parts = match.result.split('-');
      if (parts.length === 2) {
        // Grab the number from the left side (e.g., "WIN 3" -> 3)
        const teamScoreMatch = parts[0].match(/\d+/);
        // Grab the number from the right side (e.g., "0" -> 0)
        const opponentScoreMatch = parts[1].match(/\d+/);

        if (teamScoreMatch && opponentScoreMatch) {
          matchGoalsScored = parseInt(teamScoreMatch[0], 10);
          matchGoalsAllowed = parseInt(opponentScoreMatch[0], 10);
          parsedFromResult = true;
        }
      }
    }

    if (parsedFromResult) {
      acc.goalsScored += matchGoalsScored;
      acc.goalsAllowed += matchGoalsAllowed;
    } else {
      // Fallback to player stats if result string formatting differs
      const statsGoals =
        match.stats?.reduce((sum, player) => sum + (player.goals || 0), 0) || 0;
      acc.goalsScored += statsGoals;
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