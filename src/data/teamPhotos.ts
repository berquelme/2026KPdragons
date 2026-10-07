import tessPoster from '../assets/tessPoster.jpg';
import healtySnacks from '../assets/healthySnack.jpg'
import tessFifaCard from '../assets/fifacardExplain.webp'
import rhinoCharge from '../assets/rhino_award.webp'
import homeComingparade1 from '../assets/homeComing.webp'
import homeComingparade2 from '../assets/homeComing-29-Edit copy.webp'


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
    url: tessFifaCard,
    caption: 'Dragon Card Spotlight',
    subtitle: "A fun, illustrated breakdown of Dragon's soccer attributes",
  },
  {
    url: rhinoCharge,
    caption: 'The Rhino Charge Award',
    subtitle: "Recognizing our brave players so far: Ellie, Bryson, and Violet. The Rhino Charge Award recognizes the toughness and heart it takes to shake off a hard hit—whether from the ball or a collision. It takes true courage, and we are learning to stay ready for the unexpected!",
  },
    {
    url: homeComingparade1,
    caption: 'Homecoming parade',
    subtitle: "Following an invitation to represent youth soccer in the Homecoming Parade, the kids proudly and happily marched down the route, waving to the crowd and showing off their team spirit",
  },
   {
    url: homeComingparade2,
    caption: 'Homecoming parade',
    subtitle: "Following an invitation to represent youth soccer in the Homecoming Parade, the kids proudly and happily marched down the route, waving to the crowd and showing off their team spirit",
  },
];