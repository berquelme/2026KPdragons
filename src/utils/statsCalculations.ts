import { MATCHES_DATA } from '../data/matches';

export interface CalculatedPlayerStats {
  goals: number;
  assists: number;
  saves: number;
}

export const getPlayerSeasonStats = (playerNum: number): CalculatedPlayerStats => {
  return MATCHES_DATA.reduce(
    (totals, match) => {
      const matchStat = match.stats?.find(
        (s) => Number(s.playerNum) === Number(playerNum)
      );

      if (matchStat) {
        totals.goals += matchStat.goals || 0;
        totals.assists += matchStat.assists || 0;
        totals.saves += matchStat.saves || 0;
      }

      return totals;
    },
    { goals: 0, assists: 0, saves: 0 }
  );
};