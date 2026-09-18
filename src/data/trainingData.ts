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
  historyLog?: {
    dateTitle: string;
    description: string;
    status: string;
  };
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
      day: 'Thursday Session', 
      time: '4:00 PM - 5:00 PM', 
      focus: 'Skills & Match Play', 
      icon: 'rocket_launch', 
      color: 'bg-[#E53935]',
      phases: [
        { time: '4:00 - 4:45', label: 'Drills', icon: 'fitness_center', color: 'text-red-500' },
        { time: '4:45 - 5:00', label: 'Scrimmage', icon: 'sports_soccer', color: 'text-[#FFD54F]' }
      ]
    },
  ],
  upcomingFocus: [
    { title: 'The Zig-Zag Dribble', detail: 'Keeping the ball close while moving fast!', icon: 'gesture' },
    { title: 'Rocket Goal Kicks', detail: 'Power and precision with the laces.', icon: 'bolt' },
    { title: 'Team Communication', detail: 'Calling for the ball and supporting teammates.', icon: 'record_voice_over' }
  ],
  historyLog: {
    dateTitle: 'Training Day: August 27',
    description: 'On this intensive development day, the players focused on core touches, sharp turns, and fast distribution. High energy and great effort all around!',
    status: 'Completed ✓'
  }
};