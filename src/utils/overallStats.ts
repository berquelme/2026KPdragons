import type { SpotlightPlayer } from '../data/spotlightData';

export const getOverallRating = (player?: SpotlightPlayer | null): number => {
  if (!player || !player.stats || player.stats.length === 0) {
    return 0;
  }
  const total = player.stats.reduce((acc, curr) => acc + curr.value, 0);
  return Math.round(total / player.stats.length);
};