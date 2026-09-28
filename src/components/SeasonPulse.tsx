import React from 'react';
import { SeasonStats } from '../utils/seasonStats';

interface SeasonPulseProps {
  stats: SeasonStats;
  focusTitle?: string;
  focusHeadline?: string;
  quote?: string;
}

export const SeasonPulse: React.FC<SeasonPulseProps> = ({
  stats,
  focusTitle = 'Next Focus',
  focusHeadline = 'Connect with Passes. Open Up & Call for It!',
  quote = 'Relentless effort, team spirit, and pure joy.',
}) => {
  return (
    <div className="bg-white/60 rounded-[32px] p-6 border border-white shadow-sm flex flex-col gap-4">
      {/* Top Header: Live Pulse dot + W-T-L Record */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Season Pulse
          </span>
        </div>

        <div className="flex flex-col items-center justify-center px-3 py-1 rounded-xl bg-slate-100/80 border border-slate-200/60 min-w-[70px]">
            <span className="text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase leading-none">
              W - T - L
            </span>
            <span className="text-xs font-black tracking-widest text-slate-800 leading-tight mt-0.5">
              {stats.wins} - {stats.ties} - {stats.losses}
            </span>
          </div>
      </div>

      {/* Focus Tagline */}
      <div>
        <span className="text-[9px] font-black uppercase tracking-widest text-[#E53935] block mb-1">
          {focusTitle}
        </span>
        <h4 className="text-base font-bold text-slate-900 leading-snug">
          {focusHeadline}
        </h4>
      </div>

      {/* Side-by-side Goals Scored vs Goals Allowed */}
      <div className="flex items-baseline justify-between pt-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-impact text-slate-900 leading-none">
            {stats.goalsScored}
          </span>
          <span className="text-[9px] font-black uppercase tracking-tight text-[#E53935]">
            Goals Scored
          </span>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-impact text-slate-600 leading-none">
            {stats.goalsAllowed}
          </span>
          <span className="text-[9px] font-black uppercase tracking-tight text-slate-400">
            Goals Allowed
          </span>
        </div>
      </div>

      {/* Split Balance Bar */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
        <div
          className="h-full bg-[#E53935] transition-all duration-500"
          style={{ width: `${stats.scoredRatio}%` }}
        />
        <div
          className="h-full bg-slate-300 transition-all duration-500"
          style={{ width: `${100 - stats.scoredRatio}%` }}
        />
      </div>

      {/* Slogan Quote */}
      <p className="text-[10px] text-slate-400 font-medium italic text-center">
        "{quote}"
      </p>

      {/* Single-line W-T-L Legend */}
      <p className="border-t border-slate-200/60 pt-3 text-[9px] font-medium text-slate-400 text-center tracking-tight">
         W: Win  • T: Tie/Draw  • L: Loss 
      </p>
    </div>
  );
};

export default SeasonPulse;