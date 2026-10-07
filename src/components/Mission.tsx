import React from 'react';
import { teamData } from '../data/teamData';

export const Mission: React.FC = () => {
  const powers = teamData.powers || [];

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-16 animate-fade-up pb-20">
      <div className="text-center relative">
        <div className="inline-block relative">
          <h2 className="text-6xl font-kids text-slate-900 mb-4 uppercase">
            {teamData.oathTitle || `THE ${teamData.shortName} OATH`}
          </h2>
          <div className="w-full h-3 bg-yellow-400 absolute -bottom-1 -z-10 rounded-full rotate-1 opacity-50" />
        </div>
        <p className="text-slate-500 text-xl mt-6 italic font-medium">
          How we play, how we grow, and how we succeed together!
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Big Hearts */}
        <div className="bg-white p-10 rounded-[48px] shadow-xl border-2 border-slate-100 relative group h-full flex flex-col">
          <div className="absolute -top-6 -left-6 w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg -rotate-12 group-hover:rotate-0 transition-all">
            <span className="material-symbols-outlined text-[32px]">favorite</span>
          </div>
          <h3 className="text-3xl font-kids text-red-600 mb-6">Big Hearts</h3>
          <p className="text-slate-600 text-lg leading-relaxed flex-1">
            Every child is unique! We focus on building confidence, making best friends, and falling in love with the beautiful game. No pressure, just play.
          </p>
        </div>
        
        {/* Resilience */}
        <div className="bg-white p-10 rounded-[48px] shadow-xl border-2 border-slate-100 relative group h-full flex flex-col">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:-right-6 w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-red-900 shadow-lg rotate-12 group-hover:rotate-0 transition-all">
            <span className="material-symbols-outlined text-[32px]">shield</span>
          </div>
          <h3 className="text-3xl font-kids text-red-600 mb-6">Resilience</h3>
          <p className="text-slate-600 text-lg leading-relaxed flex-1">
            Resilience is our superpower. There is no learning without mistakes. We dust ourselves off, keep practicing, and always try again!
          </p>
        </div>

        {/* Team Spirit */}
        <div className="bg-white p-10 rounded-[48px] shadow-xl border-2 border-slate-100 relative group h-full flex flex-col md:col-span-2 lg:col-span-1">
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-12 group-hover:rotate-0 transition-all">
            <span className="material-symbols-outlined text-[32px]">groups</span>
          </div>
          <h3 className="text-3xl font-kids text-red-600 mb-6">Team Spirit</h3>
          <p className="text-slate-600 text-lg leading-relaxed flex-1">
            We surround our teammates with encouragement, personal space, grace and <span className="font-bold text-slate-900 uppercase">Trust</span>. We communicate to each other so they know that we are always there for them, whenever they need to pass the ball.
          </p>
        </div>
      </div>

      {/* Team Powers Section */}
      <div className="nav-gradient text-white p-10 md:p-16 rounded-[60px] shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 opacity-10">
           <span className="material-symbols-outlined text-[400px] rotate-12">bolt</span>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <span className="material-symbols-outlined text-yellow-400 text-[48px]">local_fire_department</span>
            <h3 className="text-5xl font-kids uppercase">
              {teamData.powersTitle || `The ${powers.length} ${teamData.shortName} Powers`}
            </h3>
          </div>
          
          <ul className="grid grid-cols-1 gap-8">
            {powers.map((power) => (
              <li key={power.id} className="flex items-start gap-6 group">
                <span className="bg-yellow-400 text-red-900 w-12 h-12 rounded-2xl flex items-center justify-center font-black flex-shrink-0 shadow-lg rotate-3 group-hover:rotate-0 transition-transform mt-1">
                  {power.id}
                </span>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-kids text-white leading-tight">
                    {power.title}
                  </span>
                  <span className="text-lg md:text-xl font-medium text-yellow-200/90 italic mt-1">
                    {power.subtitle}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Coaching Philosophy Quote */}
      <section className="relative max-w-4xl mx-auto pt-6 text-center">
        <div className="bg-white rounded-[48px] p-10 md:p-14 shadow-xl border-2 border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400" />
          
          <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-yellow-100 text-red-600 flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[32px]">format_quote</span>
          </div>

          <blockquote className="text-2xl md:text-3xl font-kids text-slate-800 leading-snug tracking-wide">
            “Players are not a vessel to fill, but a torch to light.”
          </blockquote>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-0.5 w-8 bg-yellow-400 rounded-full" />
            <cite className="not-italic text-base md:text-lg font-bold uppercase tracking-wider text-slate-900 font-kids">
              Fernando ‘El Profe’ Signorini
            </cite>
            <span className="h-0.5 w-8 bg-yellow-400 rounded-full" />
          </div>

          <p className="mt-3 text-slate-500 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Legendary Argentine fitness and conditioning coach who has worked with many of the greatest players and managers in soccer history."
          </p>
        </div>
      </section>

      <div className="text-center pt-4">
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em]">
          {teamData.name} Squad
        </p>
      </div>
    </div>
  );
};

export default Mission;