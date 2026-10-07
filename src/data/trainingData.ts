export interface TrainingPhase {
  time: string;
  label: string;
  icon: string;
  color: string;
}

export interface TrainingSession {
  day: string;
  time: string;
  focus: string;
  icon: string;
  color: string;
  phases: TrainingPhase[];
}

export interface TrainingFocus {
  title: string;
  detail: string;
  icon: string;
}

export interface HistoryLogItem {
  dateTitle: string;
  description: string;
  status: string;
}

export interface TrainingConfig {
  headerTitle: string;
  headerSubtitle: string;
  locationName: string;
  locationDetails: string;
  scheduleBadge: string;
  gearListTitle: string;
  gearItems: string[];
  sessions: TrainingSession[];
  upcomingFocus: TrainingFocus[];
  historyLogs: HistoryLogItem[];
}

export const trainingData: TrainingConfig = {
  headerTitle: 'THE TRAINING CAVE',
  headerSubtitle: 'Sharpen your skills, ready your kicks!',
  locationName: '360 Elm Street',
  locationDetails: 'Penn Yan, NY • The Main Training Grounds',
  scheduleBadge: 'Weekly Session',
  gearListTitle: 'Match Day & Practice Gear',
  gearItems: ['Team Jersey', 'Cleats', 'Shin Guards', 'Full Water Bottle', 'Big Energy', 'Positive Attitude'],
  sessions: [
    { 
      day: 'Thursday Session • Oct 8', 
      time: '5:00 PM - 6:00 PM', 
      focus: 'Tricking your rival, hide the ball & Corner Sets', 
      icon: 'rocket_launch', 
      color: 'bg-[#E53935]',
      phases: [
        { time: '5:00 - 5:30', label: 'Reaction, Hips & Finishing Drills', icon: 'fitness_center', color: 'text-red-500' },
        { time: '5:30 - 6:00', label: 'Scrimmage & Corner Kick Strategy', icon: 'sports_soccer', color: 'text-[#FFD54F]' }
      ]
    },
  ],
  upcomingFocus: [
    { 
      title: 'Fast Reaction Cuts', 
      detail: 'Players dribble toward a helper and execute an explosive change of direction the moment the signal is given.', 
      icon: 'swap_horiz' 
    },
    { 
      title: 'Hide the Ball & Hip Mobility', 
      detail: 'Dribbling in a designated square while shielding the ball from coach pool noodles by shifting hips quickly to protect possession.', 
      icon: 'shield' 
    },
    { 
      title: 'Shooting Practice', 
      detail: 'Focusing on clean striking contact and accuracy drills to test our finishing on target.', 
      icon: 'sports_soccer' 
    },
    { 
      title: 'Corner Kick Set Plays', 
      detail: 'Testing set-piece positioning, runs into the box, and defensive resets during live scrimmage play.', 
      icon: 'flag' 
    }
  ],
  historyLogs: [
    {
      dateTitle: 'Thursday, September 24',
      description: 'Worked on cone passing progressions, striking through the laces with clean contact, and rapid transition drills. Strong focus, sharp touches, and great sportsmanship on display.',
      status: 'Completed ✓'
    },
    {
      dateTitle: 'Thursday, September 17',
      description: 'Completed the zig-zag dribble, rocket shots to goal, shielding and preparing for an unexpected collision, plus communication training. When kids get too energetic and attack a teammate, the rule is to do a lap around the field and sing "we are teammates" chants!',
      status: 'Completed ✓'
    },
    {
      dateTitle: 'Training Day: August 27',
      description: 'On this intensive development day, the players focused on core touches, sharp turns, and fast distribution. High energy and great effort all around!',
      status: 'Completed ✓'
    }
  ]
};
