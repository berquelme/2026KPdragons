import { Match } from '../types';

export const MATCHES_DATA: Match[] = [
  {
    
    id: 1,
    week: 1,
    dateStr: '2026-09-05T09:15:00',
    dateDisplay: 'SATURDAY, SEP 5, 2026',
    timeDisplay: '9:15 AM',
    location: 'PENN YAN COMPLEX',
    opponent: "MARBLE'S",
    result: 'WIN 5 - 0',
    resultType: 'win',
    dragonOfTheMatch: 'Jamie',
    notes: 'Hat Trick ⚽⚽⚽',
    stats: [
      // Jamie Daggett (#7): ⚽️x3 🤝
      { playerNum: 7, goals: 3, assists: 1 },

      // Bryson Nolt (#10): ⚽️ ✋🏽
      { playerNum: 10, goals: 1, saves: 1 },

      // Tess Almeida (#3): 🤝
      { playerNum: 3, assists: 1 },

      // Caspian Avellaneda (#8): ✋🏽 ⚽️
      { playerNum: 8, saves: 1, goals: 1 },

      // Elijah Sherman (#9): ✋🏽
      { playerNum: 9, saves: 1 },

      // Ellie Comstock (#4): 🤝
      { playerNum: 4, assists: 1 },

      // Pax: 🤝x2 (replace with Pax's number from galleryNewData.ts)
      { playerNum: 2, assists: 2 },
    ],
  },
  {
    id: 2,
    week: 2,
    dateStr: '2026-09-12T08:00:00',
    dateDisplay: 'SATURDAY, SEP 12, 2026',
    timeDisplay: '8:00 AM',
    location: 'PENN YAN COMPLEX',
    opponent: 'STORK INSURANCE',
    result: 'WIN 2 - 0',
    resultType: 'win',
    dragonOfTheMatch: "Jamie, Pax",
    notes: 'Great teamwork and relentless hustle',
    stats: [
      // Jamie Daggett (#7): ⚽️x2 
      { playerNum: 7, goals: 2, assists: 1 },

      // Tess Almeida (#3): 🤝
      { playerNum: 3, assists: 1 },


      // Elijah Sherman (#9): ✋🏽
      { playerNum: 9, saves: 2, assists: 1 },


    ],
  },
 {
    id: 3,
    week: 3,
    dateStr: '2026-09-19T09:15:00',
    dateDisplay: 'SATURDAY, SEP 19, 2026',
    timeDisplay: '9:15 AM',
    location: 'PENN YAN COMPLEX',
    opponent: 'WINETRAIL PROPERTIES',
    result: 'DRAW 1 - 1',
    resultType: 'draw',
    dragonOfTheMatch: 'Caspian',
    notes: 'Quick to the ball, great anticipation of opponent plays, highly disciplined defense and marking and orchestrated the opening goal!',
    stats: [
      // Add any player stats here if needed, e.g.:
      // { playerNum: 8, goals: 1 },
       // Jamie Daggett (#7): ⚽️x2 
      { playerNum: 7, goals: 1, assists: 0 },

      // Caspian Avellaneda (#3): 🤝
      { playerNum: 8, assists: 1, saves:3 },


      // Elijah Sherman (#9): ✋🏽
      { playerNum: 9, saves: 2, assists: 0 },
      //Bryson
      { playerNum: 10, saves: 1, assists: 0 },
    //ellie
    //Bryson
      { playerNum: 4, saves: 1, assists: 0 },


    ],
  },
  {
    id: 4,
    week: 4,
    dateStr: '2026-09-25T17:00:00',
    dateDisplay: 'FRIDAY, SEP 25, 2026',
    timeDisplay: '5:00 PM',
    location: 'PENN YAN COMPLEX',
    opponent: "DANN'S TAXES",
  },
  {
    id: 5,
    week: 5,
    dateStr: '2026-10-03T09:15:00',
    dateDisplay: 'SATURDAY, OCT 3, 2026',
    timeDisplay: '9:15 AM',
    location: 'PENN YAN COMPLEX',
    opponent: 'LNB',
  },
  {
    id: 6,
    week: 6,
    dateStr: '2026-10-09T17:30:00',
    dateDisplay: 'FRIDAY, OCT 9, 2026',
    timeDisplay: '5:30 PM',
    location: 'PENN YAN COMPLEX',
    opponent: "CAM'S",
  },
  {
    id: 7,
    week: 7,
    dateStr: '2026-10-17T09:15:00',
    dateDisplay: 'SATURDAY, OCT 17, 2026',
    timeDisplay: '9:15 AM',
    location: 'PENN YAN COMPLEX',
    opponent: 'LNB',
  },
  {
    id: 8,
    week: 8,
    dateStr: '2026-10-23T17:30:00',
    dateDisplay: 'FRIDAY, OCT 23, 2026',
    timeDisplay: '5:30 PM',
    location: 'PENN YAN COMPLEX',
    opponent: 'SUBWAY',
  },
];

// export interface Match {
//   id: number;
//   week: number;
//   dateStr: string; // ISO format for date calculations
//   dateDisplay: string;
//   timeDisplay: string;
//   location: string;
//   opponent: string;
//   result?: string;
//   resultType?: 'win' | 'draw' | 'loss';
//   dragonOfTheMatch?: string;
//   notes?: string;
// }

// export const MATCHES_DATA: Match[] = [
//   {
//     id: 1,
//     week: 1,
//     dateStr: '2026-09-05T09:15:00',
//     dateDisplay: 'SATURDAY, SEP 5, 2026',
//     timeDisplay: '9:15 AM',
//     location: 'PENN YAN COMPLEX',
//     opponent: "MARBLE'S",
//     result: 'WIN 5 - 0',
//     resultType: 'win',
//     dragonOfTheMatch: 'Jamie',
//     notes: 'Hat Trick ⚽⚽⚽',
//   },
//   {
//     id: 2,
//     week: 2,
//     dateStr: '2026-09-12T08:00:00',
//     dateDisplay: 'SATURDAY, SEP 12, 2026',
//     timeDisplay: '8:00 AM',
//     location: 'PENN YAN COMPLEX',
//     opponent: 'STORK INSURANCE',
//   },
//   {
//     id: 3,
//     week: 3,
//     dateStr: '2026-09-19T09:15:00',
//     dateDisplay: 'SATURDAY, SEP 19, 2026',
//     timeDisplay: '9:15 AM',
//     location: 'PENN YAN COMPLEX',
//     opponent: 'WINETRAIL PROPERTIES',
//   },
//   {
//     id: 4,
//     week: 4,
//     dateStr: '2026-09-25T17:00:00',
//     dateDisplay: 'FRIDAY, SEP 25, 2026',
//     timeDisplay: '5:00 PM',
//     location: 'PENN YAN COMPLEX',
//     opponent: "DANN'S TAXES",
//   },
//   {
//     id: 5,
//     week: 5,
//     dateStr: '2026-10-03T09:15:00',
//     dateDisplay: 'SATURDAY, OCT 3, 2026',
//     timeDisplay: '9:15 AM',
//     location: 'PENN YAN COMPLEX',
//     opponent: 'LNB',
//   },
//   {
//     id: 6,
//     week: 6,
//     dateStr: '2026-10-09T17:30:00',
//     dateDisplay: 'FRIDAY, OCT 9, 2026',
//     timeDisplay: '5:30 PM',
//     location: 'PENN YAN COMPLEX',
//     opponent: "CAM'S",
//   },
//   {
//     id: 7,
//     week: 7,
//     dateStr: '2026-10-17T09:15:00',
//     dateDisplay: 'SATURDAY, OCT 17, 2026',
//     timeDisplay: '9:15 AM',
//     location: 'PENN YAN COMPLEX',
//     opponent: 'LNB',
//   },
//   {
//     id: 8,
//     week: 8,
//     dateStr: '2026-10-23T17:30:00',
//     dateDisplay: 'FRIDAY, OCT 23, 2026',
//     timeDisplay: '5:30 PM',
//     location: 'PENN YAN COMPLEX',
//     opponent: 'SUBWAY',
//   },
// ];