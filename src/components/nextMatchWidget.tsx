import React from 'react';
import { MATCHES_DATA } from '../data/matches';
import { useCountdown } from '../hooks/useCountdown';
import { PageType } from '../types';

interface NextMatchWidgetProps {
  onNavigate?: (page: PageType) => void;
  className?: string;
}

export const NextMatchWidget: React.FC<NextMatchWidgetProps> = ({ onNavigate, className = '' }) => {
  const now = new Date();
  const nextMatch = MATCHES_DATA.find((m) => new Date(m.dateStr || '') >= now) || MATCHES_DATA[0];
  const matchCountdown = useCountdown(nextMatch?.dateStr || '');

  const formattedDate = nextMatch?.dateStr
    ? new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }).format(new Date(nextMatch.dateStr))
    : nextMatch?.dateDisplay || 'Upcoming Match';

  if (!nextMatch) return null;

  return (
    <div className={`bg-[#E53935] rounded-3xl p-5 text-white shadow-xl shadow-red-500/10 border border-red-400/30 w-full max-w-[280px] ${className}`}>
      <span className="text-[10px] font-black text-[#FFCA28] uppercase tracking-widest mb-1 block">
        Next Match
      </span>
      <h4 className="font-impact text-xl uppercase text-white truncate mb-0.5">
        vs {nextMatch.opponent}
      </h4>
      <p className="text-white/85 text-xs font-medium mb-3 italic">
        {formattedDate} @ {nextMatch.timeDisplay}
      </p>

      {/* Countdown Grid */}
      <div className="mb-3 bg-black/20 rounded-2xl p-2 backdrop-blur-sm border border-white/10">
        {matchCountdown.isExpired ? (
          <p className="text-center text-xs font-black uppercase tracking-wider text-[#FFCA28] py-1">
            Kickoff Underway!
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-1 text-center">
            <div className="bg-white border-2 border-[#FFCA28] rounded-xl py-1.5 shadow-sm">
              <span className="block font-impact text-lg leading-tight text-slate-950">{matchCountdown.days}</span>
              <span className="text-[8px] font-black uppercase tracking-wider text-[#E53935]">Days</span>
            </div>
            <div className="bg-white border-2 border-[#FFCA28] rounded-xl py-1.5 shadow-sm">
              <span className="block font-impact text-lg leading-tight text-slate-950">{matchCountdown.hours}</span>
              <span className="text-[8px] font-black uppercase tracking-wider text-[#E53935]">Hrs</span>
            </div>
            <div className="bg-white border-2 border-[#FFCA28] rounded-xl py-1.5 shadow-sm">
              <span className="block font-impact text-lg leading-tight text-slate-950">{matchCountdown.minutes}</span>
              <span className="text-[8px] font-black uppercase tracking-wider text-[#E53935]">Min</span>
            </div>
            <div className="bg-white border-2 border-[#FFCA28] rounded-xl py-1.5 shadow-sm">
              <span className="block font-impact text-lg leading-tight text-slate-950">{matchCountdown.seconds}</span>
              <span className="text-[8px] font-black uppercase tracking-wider text-[#E53935]">Sec</span>
            </div>
          </div>
        )}
      </div>

      {onNavigate && (
        <button
          type="button"
          onClick={() => onNavigate('MATCHES')}
          className="w-full py-2 bg-[#FFCA28] text-[#E53935] rounded-full border-2 border-white font-black text-[10px] uppercase tracking-wider hover:brightness-105 transition-all shadow-md cursor-pointer"
        >
          Match Schedule
        </button>
      )}
    </div>
  );
};