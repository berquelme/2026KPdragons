import React from 'react';
import { PageType } from '../types';
import { MATCHES_DATA } from '../data/matches';
import { teamData } from '../data/teamData';
import { useCountdown } from '../hooks/useCountdown';

interface RightPanelProps {
  onNavigate: (page: PageType) => void;
  activePage: PageType;
}

export const RightPanel: React.FC<RightPanelProps> = ({ onNavigate, activePage }) => {
  const now = new Date();

  // Dynamically find the very next fixture relative to today
  const nextMatch = MATCHES_DATA.find((m) => new Date(m.dateStr || '') >= now) || MATCHES_DATA[0];

  // Live countdown to next match
  const matchCountdown = useCountdown(nextMatch?.dateStr || '');

  // Format date display safely
  const formattedDate = nextMatch?.dateStr
    ? new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      }).format(new Date(nextMatch.dateStr))
    : nextMatch?.dateDisplay || 'Upcoming Match';

  // Calculate dynamic goals scored from matches
  const totalGoals = MATCHES_DATA.reduce((acc, match) => {
    const goalsThisMatch = match.stats?.reduce((sum, s) => sum + (s.goals || 0), 0) || 0;
    return acc + goalsThisMatch;
  }, 0);

  const pulseValue = totalGoals > 0 ? totalGoals : 'Ready';
  const pulseLabel = totalGoals > 0 ? 'Goals Scored' : 'Season Kickoff';
  const pulsePercent = totalGoals > 0 ? Math.min(totalGoals * 5, 100) : 15;

  const quickLinks: { label: string; value: PageType; icon: string }[] = [
    { label: teamData.homeFieldTitle || 'The Nest', value: 'HOME', icon: 'home' },
    { label: 'Schedule', value: 'MATCHES', icon: 'event' },
    { label: 'Squad', value: 'ROSTER', icon: 'groups' },
    { label: 'Join Us', value: 'CONTACT', icon: 'add_circle' },
  ];

  return (
    <div className="w-[300px] h-screen sticky top-0 bg-white/30 backdrop-blur-2xl border-l border-slate-200/50 flex flex-col p-6 overflow-y-auto z-50">
      <div className="flex flex-col gap-8">
        
        {/* Next Match Widget */}
        {nextMatch && (
          <div className="bg-[#E53935] rounded-[32px] p-6 text-white relative overflow-hidden group shadow-xl shadow-red-500/10">
            <div className="absolute -right-4 -top-4 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
              <span className="material-symbols-outlined text-[80px]">sports_soccer</span>
            </div>
            <div className="relative z-10">
              <span className="text-[10px] font-black text-yellow-300 uppercase tracking-widest mb-4 block">
                Next Match
              </span>
              <h4 className="font-impact text-2xl mb-1 uppercase text-white truncate">
                vs {nextMatch.opponent}
              </h4>
              <p className="text-white/80 text-xs font-medium mb-3 italic">
                {formattedDate} @ {nextMatch.timeDisplay}
              </p>

              {/* Live Countdown Grid - Stadium Scoreboard */}
              <div className="mb-4 bg-gradient-to-b from-black/40 to-black/20 rounded-2xl p-3 backdrop-blur-md border border-white/15 shadow-inner">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#FFCA28] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-amber-400">local_fire_department</span>
                    Kickoff Countdown
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>

                {matchCountdown.isExpired ? (
                  <p className="text-center text-xs font-black uppercase tracking-wider text-[#FFCA28] py-2">
                    Match Underway!
                  </p>
                ) : (
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="bg-white border-2 border-[#FFCA28] rounded-xl py-2 shadow-sm">
                      <span className="block font-impact text-xl leading-tight text-slate-950">
                        {matchCountdown.days}
                      </span>
                      <span className="text-[8px] font-black uppercase tracking-wider text-[#E53935]">
                        Days
                      </span>
                    </div>
                    <div className="bg-white border-2 border-[#FFCA28] rounded-xl py-2 shadow-sm">
                      <span className="block font-impact text-xl leading-tight text-slate-950">
                        {matchCountdown.hours}
                      </span>
                      <span className="text-[8px] font-black uppercase tracking-wider text-[#E53935]">
                        Hrs
                      </span>
                    </div>
                    <div className="bg-white border-2 border-[#FFCA28] rounded-xl py-2 shadow-sm">
                      <span className="block font-impact text-xl leading-tight text-slate-950">
                        {matchCountdown.minutes}
                      </span>
                      <span className="text-[8px] font-black uppercase tracking-wider text-[#E53935]">
                        Min
                      </span>
                    </div>
                    <div className="bg-white border-2 border-[#FFCA28] rounded-xl py-2 shadow-sm">
                      <span className="block font-impact text-xl leading-tight text-slate-950">
                        {matchCountdown.seconds}
                      </span>
                      <span className="text-[8px] font-black uppercase tracking-wider text-[#E53935]">
                        Sec
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Match Schedule Pill Button */}
              <button 
                type="button"
                onClick={() => onNavigate('MATCHES')}
                className="w-full py-2.5 bg-[#FFCA28] text-[#E53935] rounded-full border-2 border-white font-black text-[11px] uppercase tracking-wider hover:brightness-105 transition-all shadow-md cursor-pointer"
              >
                Match Schedule
              </button>
            </div>
          </div>
        )}

        {/* Secondary Navigation */}
        <div className="space-y-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">Quick Access</span>
          <div className="grid grid-cols-1 gap-2">
            {quickLinks.map((link) => (
              <button
                key={link.value}
                type="button"
                onClick={() => onNavigate(link.value)}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all group cursor-pointer
                  ${activePage === link.value 
                    ? 'bg-white border-[#E53935] shadow-lg shadow-red-500/5' 
                    : 'bg-white/50 border-transparent hover:border-red-100 hover:bg-white'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                    ${activePage === link.value ? 'bg-[#E53935] text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-red-50 group-hover:text-[#E53935]'}`}>
                    <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                  </div>
                  <span className={`text-sm font-bold ${activePage === link.value ? 'text-[#E53935]' : 'text-slate-500 group-hover:text-slate-900'}`}>
                    {link.label}
                  </span>
                </div>
                <span className={`material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform ${activePage === link.value ? 'text-[#E53935]' : 'text-slate-300'}`}>
                  chevron_right
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Season Pulse */}
        <div className="bg-white/60 rounded-[40px] p-8 border border-white shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Season Pulse</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-3xl font-impact text-slate-900">{pulseValue}</span>
              <span className="text-[9px] font-black text-[#E53935] uppercase tracking-tighter mb-1">{pulseLabel}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#E53935] rounded-full transition-all duration-500" 
                style={{ width: `${pulsePercent}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-medium italic">
              "{teamData.slogan || 'Building confidence, resilience, and teamwork every match!'}"
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Version */}
      <div className="mt-auto pt-8 text-center">
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">
          {teamData.mascot || teamData.shortName} v2.0
        </p>
      </div>
    </div>
  );
};

export default RightPanel;