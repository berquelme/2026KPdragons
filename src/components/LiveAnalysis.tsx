import React, { useState } from 'react';

export const LiveAnalysis: React.FC = () => {
  const [activeZone, setActiveZone] = useState<number | null>(null);

  const tacticalPoints = [
    { id: 1, x: '20%', y: '50%', label: 'Defense Zone', detail: 'Solid wall of fire. High pressure on the wings.' },
    { id: 2, x: '50%', y: '50%', label: 'Dragon Engine', detail: 'The heart of our play. Rapid ball rotation.' },
    { id: 3, x: '80%', y: '30%', label: 'Attack Nest', detail: 'Surgical strikes and rocket shots from the left.' },
    { id: 4, x: '80%', y: '70%', label: 'Attack Nest', detail: 'Surgical strikes and rocket shots from the right.' },
  ];

  return (
    <div className="bg-slate-900 rounded-[60px] p-12 border-8 border-white shadow-2xl relative overflow-hidden h-[500px]">
      {/* Pitch Backdrop */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-10 border-2 border-white rounded-[40px]" />
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row h-full gap-12">
        <div className="flex-1 relative h-full bg-emerald-950/30 rounded-[40px] border border-white/10 overflow-hidden">
          {tacticalPoints.map((point) => (
            <button
              key={point.id}
              onClick={() => setActiveZone(point.id)}
              className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 shadow-xl
                ${activeZone === point.id ? 'bg-yellow-400 scale-150 shadow-yellow-400/50' : 'bg-red-600 animate-pulse'}`}
              style={{ left: point.x, top: point.y }}
            >
              <span className={`material-symbols-outlined text-[16px] ${activeZone === point.id ? 'text-red-900' : 'text-white'}`}>
                {activeZone === point.id ? 'insights' : 'my_location'}
              </span>
            </button>
          ))}
        </div>

        <div className="w-full md:w-80 flex flex-col justify-center">
          <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10">
            <h3 className="font-kids text-3xl text-white mb-4">Tactical View</h3>
            {activeZone ? (
              <div className="animate-fade-up">
                <span className="text-yellow-400 text-[10px] font-black uppercase tracking-widest block mb-2">
                  {tacticalPoints.find(p => p.id === activeZone)?.label}
                </span>
                <p className="text-white/70 text-lg leading-relaxed">
                  {tacticalPoints.find(p => p.id === activeZone)?.detail}
                </p>
                <button 
                  onClick={() => setActiveZone(null)}
                  className="mt-6 text-yellow-400 text-xs font-bold border-b border-yellow-400/20"
                >
                  RESET VIEW
                </button>
              </div>
            ) : (
              <p className="text-white/40 italic">Select a heatmap node on the pitch to analyze our squad's strategic movement patterns.</p>
            )}
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-8 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Live Simulation</span>
      </div>
    </div>
  );
};