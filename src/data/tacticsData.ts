export interface TacticalPoint {
  id: number;
  x: string;
  y: string;
  label: string;
  detail: string;
}

export const TACTICAL_POINTS: TacticalPoint[] = [
  { id: 1, x: '20%', y: '50%', label: 'Defense Zone', detail: 'Solid backline discipline. High pressure on the wings and closing down space.' },
  { id: 2, x: '50%', y: '50%', label: 'Midfield Engine', detail: 'The heart of our play. Rapid ball distribution, scanning, and supporting teammates.' },
  { id: 3, x: '80%', y: '30%', label: 'Left Attack Corridor', detail: 'Direct runs, aggressive dribbling, and quick crosses into the penalty box.' },
  { id: 4, x: '80%', y: '70%', label: 'Right Attack Corridor', detail: 'Wide penetration, fast combinations, and clinical finishing on target.' },
];