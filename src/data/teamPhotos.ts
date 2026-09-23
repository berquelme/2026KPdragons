import tessPoster from '../assets/tessPoster.jpg';
import healtySnacks from '../assets/healthySnack.jpg'


export interface TeamPhoto {
  url: string;
  caption: string;
  subtitle: string;
}

export const TEAM_PHOTOS: TeamPhoto[] = [
  {
    url: '/Roster.jpg',
    caption: 'Knapp & Schlappi Squad 2026',
    subtitle: 'Game day at Penn Yan Sports Complex',
  },
{
    url: tessPoster,
    caption: '2026 Season Match Calendar Poster',
    subtitle: 'Inspired by the Captain Tsubasa Japanese cartoon soccer legend. Official schedule and player roster for each Dragon.'
  },
  {
    url: healtySnacks,
    caption: 'Fuel Back & Recovery Spread',
    subtitle: 'Nourishing the team with fun and healthy snacks, fresh fruit, and post-game refreshments',
  },
  {
    url: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Dragon Spirit in Action',
    subtitle: 'Passing drills and match preparation',
  },
];