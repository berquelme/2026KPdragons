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
    id: 'rooney-visit',
    title: 'LEGEND ALERT: Wayne Rooney Visits the Nest!',
    date: 'Oct 15, 2026',
    excerpt: 'The former England captain dropped by to watch our practice and shared some of his scoring secrets!',
    tag: 'SPECIAL GUEST',
    highlight: true,
    icon: 'star',
  },
  {
    id: '400-goals',
    title: 'SQUAD GOALS: We Just Hit 400!',
    date: 'Oct 14, 2026',
    excerpt: "Charlie's screamer in the second half was our 400th goal as a club! Pizza for everyone!",
    tag: 'MILESTONE',
    icon: 'military_tech',
  },
  {
    id: 'kits',
    title: 'New Team Kits are Here!',
    date: 'Oct 08, 2026',
    excerpt: 'The new uniforms have arrived! Pick yours up this Thursday before practice. They look amazing!',
    tag: 'CLUB NEWS',
    icon: 'checkroom',
  },
];