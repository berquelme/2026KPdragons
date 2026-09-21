import tessPoster from '../assets/tessPoster.jpg';


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
    url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
    caption: 'Pre-Match Warmups',
    subtitle: 'Focus, drills, and team huddles',
  },
  {
    url: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Dragon Spirit in Action',
    subtitle: 'Passing drills and match preparation',
  },
];