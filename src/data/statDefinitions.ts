export interface StatDefinition {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
}

export const statDefinitions: Record<string, StatDefinition> = {
  CK: {
    id: 'CK',
    name: 'Cannon Kick',
    category: 'Shooting & finishing confidence',
    icon: '💥',
    description: 'Blasts shots toward goal with great technique and big confidence.',
  },
  TR: {
    id: 'TR',
    name: 'Team Radar',
    category: 'Passing & vision',
    icon: '🎯',
    description: 'Spots open teammates across the pitch and delivers smooth passes.',
  },
  MT: {
    id: 'MT',
    name: 'Magic Touch',
    category: 'Dribbling & footwork',
    icon: '🪄',
    description: 'Keeps the ball glued to their feet and glides past defenders.',
  },
  DS: {
    id: 'DS',
    name: 'Dragon Shield',
    category: 'Balance, grit, and protecting the ball',
    icon: '🛡️',
    description: 'Stays strong on balance, shields possession, and plays with grit.',
  },
  RT: {
    id: 'RT',
    name: 'Rocket Turbo',
    category: 'Hustle, pace, and relentless recovery',
    icon: '⚡',
    description: 'Brings nonstop energy, chases loose balls, and sprints back to help.',
  },
};