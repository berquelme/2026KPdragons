export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tag: string;
  highlight?: boolean;
  icon?: string;
}

export const NEWS_ITEMS: NewsItem[] = [
{
  id: 'rhino-charge-award',
  title: ' 🦏 The Rhino Charge Award 🏆 : Bravery & Courage',
  date: 'Sep 18, 2026',
  excerpt: 'Soccer involves natural contact, and taking a tumble is not ideal, but it happens! In training, we practice preparing for those collisions safely. This award honors the player who took a hit, bounced right back up with a smile, and kept having fun.',
  tag: 'TEAM TRADITION',
  icon: 'shield',
},
  {
    id: 'team-snacks',
    title: '🍪 Post-Game Fuel: Healthy Snacks & Safety 🍌',
    date: 'Sep 18, 2026',
    excerpt: 'Family and friends are welcome to bring post-game snacks! Please focus on healthy choices like bananas, fruit, and water. Before handing anything out, I will always check with parents first to confirm it is okay for their child. Please let me know about any allergies so we keep everyone safe.',
    tag: 'TEAM REMINDER',
    icon: 'nutrition',
  },
  {
    id: 'fuel-their-fire',
    title: '❤️ Beyond the Final Whistle: Fuel Their Fire 🔥',
    date: 'Sep 18, 2026',
    excerpt: 'After each game, tell your child one thing they did that you truly enjoyed watching. Hearing this from us builds confidence, resilience, and joy far more than any score.',
    tag: 'COACH NOTE',
    icon: 'favorite',
  },
];