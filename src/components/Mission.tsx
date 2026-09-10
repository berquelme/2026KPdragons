import React from 'react';

export const Mission: React.FC = () => {
  const dragonPowers = [
    { id: 1, title: "Be the Boss of Your Move", subtitle: "Making Decisions" },
    { id: 2, title: "Find Your Superpower", subtitle: "Discover Your Superpower" },
    { id: 3, title: "Oops, Shake It Off, Try Again!", subtitle: "Making Mistakes and Getting Back Quickly" },
    { id: 4, title: "Never Give Up, Keep Going!", subtitle: "Working Through Discouragement" },
    { id: 5, title: "Practice Makes Magic", subtitle: "Taking Initiative and Trusting the Learning Curve" },
    { id: 6, title: "Take a Breath and Jump Back In", subtitle: "Managing Energy: Brush It Off and Get Back In" },
    { id: 7, title: "Think Fast, Play Smart", subtitle: "Solving Problems: Sense of Urgency" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-16 animate-fade-up pb-20">
      <div className="text-center relative">
        <div className="inline-block relative">
          <h2 className="text-6xl font-kids text-slate-900 mb-4">THE DRAGON OATH</h2>
          <div className="w-full h-3 bg-yellow-400 absolute -bottom-1 -z-10 rounded-full rotate-1 opacity-50" />
        </div>
        <p className="text-slate-500 text-xl mt-6 italic font-medium">How we play, how we grow, and how we ROAR!</p>
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
            Every child is a unique dragon! We focus on building confidence, making best friends, and falling in love with the beautiful game. No pressure, just play.
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

      {/* The 7 Dragon Powers Section */}
      <div className="nav-gradient text-white p-10 md:p-16 rounded-[60px] shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 opacity-10">
           <span className="material-symbols-outlined text-[400px] rotate-12">bolt</span>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <span className="material-symbols-outlined text-yellow-400 text-[48px]">local_fire_department</span>
            <h3 className="text-5xl font-kids uppercase">The 7 Dragon Powers</h3>
          </div>
          
          <ul className="grid grid-cols-1 gap-8">
            {dragonPowers.map(power => (
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

      <div className="text-center pt-8">
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em]">Knappy & Schlappi Elite Squad</p>
      </div>
    </div>
  );
};