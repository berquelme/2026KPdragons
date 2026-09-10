import React from 'react';

export const Training: React.FC = () => {
  const sessions = [
    { 
      day: 'Thursday September 10', 
      time: '4:00 PM - 5:00 PM', 
      focus: 'Skills & Match Play', 
      icon: 'rocket_launch', 
      color: 'bg-[#E53935]',
      phases: [
        { time: '4:00 - 4:45', label: 'Drills', icon: 'fitness_center', color: 'text-red-500' },
        { time: '4:45 - 5:00', label: 'Scrimmage', icon: 'sports_soccer', color: 'text-[#FFD54F]' }
      ]
    },
  ];

  const upcomingFocus = [
    { title: 'The Zig-Zag Dribble', detail: 'Keeping the ball close while moving fast!', icon: 'gesture' },
    { title: 'Rocket Goal Kicks', detail: 'Power and precision with the laces.', icon: 'bolt' },
    { title: 'Dragon Communication', detail: 'Learning to roar for the ball and help friends.', icon: 'record_voice_over' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 animate-fade-up pb-20">
      <div className="bg-white rounded-[60px] shadow-2xl overflow-hidden border-4 border-slate-100">
        <div className="nav-gradient p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[300px]">fitness_center</span>
          </div>
          <h2 className="text-5xl font-kids mb-4 relative z-10">THE TRAINING CAVE</h2>
          <p className="text-yellow-300 font-kids text-xl relative z-10">Sharpen your claws, ready your kicks!</p>
        </div>
        
        <div className="p-12 space-y-12">
          {/* Location Details */}
          <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[32px] border-2 border-slate-100 group">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm text-emerald-500">
              <span className="material-symbols-outlined text-[36px]">location_on</span>
            </div>
            <div>
              <p className="font-kids text-2xl text-slate-900">360 Elm Street</p>
              <p className="text-slate-500 font-medium">Penn Yan, NY • The Main Training Grounds</p>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-kids text-3xl text-slate-900 flex items-center gap-3">
                <span className="material-symbols-outlined text-red-500">calendar_month</span>
                Weekly Schedule
              </h3>
              <span className="bg-red-50 text-red-600 text-[10px] font-black px-3 py-1 rounded-full border border-red-100 uppercase tracking-widest">Thursday Only</span>
            </div>
            
            <div className="grid gap-4">
              {sessions.map((s) => (
                <div key={s.day} className="p-8 bg-white border-2 border-slate-50 rounded-[32px] hover:border-red-500/20 transition-all hover:shadow-xl group">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <span className="material-symbols-outlined text-[32px]">{s.icon}</span>
                      </div>
                      <div>
                        <p className="font-kids text-2xl text-slate-900">{s.day}</p>
                        <p className="text-slate-500 font-medium">{s.focus}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-kids text-2xl text-red-600 leading-none">{s.time}</p>
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-1 block">Full Session</span>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {s.phases.map((phase, idx) => (
                      <div key={idx} className="bg-slate-50/50 p-5 rounded-3xl border border-slate-100 flex items-center justify-between group/phase hover:bg-white hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                            <span className={`material-symbols-outlined text-[20px] ${phase.color}`}>{phase.icon}</span>
                          </div>
                          <div>
                            <p className="font-kids text-xl text-slate-900">{phase.label}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{idx === 0 ? 'Skills & Focus' : 'Match Simulation'}</p>
                          </div>
                        </div>
                        <span className="bg-white px-3 py-1.5 rounded-xl text-[10px] font-black text-red-600 shadow-sm border border-slate-100">
                          {phase.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Practice Roadmap */}
          <div className="p-8 bg-red-400/5 rounded-[40px] border-4 border-dashed border-red-400/30 relative">
            <div className="absolute -top-6 left-10 bg-[#E53935] text-white px-6 py-2 rounded-full font-kids text-lg shadow-lg">
              Next Practice Roadmap
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {upcomingFocus.map((item, idx) => (
                <div key={idx} className="bg-white/80 p-5 rounded-3xl flex flex-col items-center text-center gap-3 shadow-sm border border-red-100/50">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-[#E53935]">
                    <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-kids text-lg text-slate-900 leading-tight mb-1">{item.title}</p>
                    <p className="text-[10px] font-medium text-slate-400 leading-tight italic">"{item.detail}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Development Log - NEW SECTION */}
          <div className="p-8 bg-emerald-50 rounded-[40px] border-4 border-dashed border-emerald-200 relative group">
            <div className="absolute -top-6 left-10 bg-emerald-500 text-white px-6 py-2 rounded-full font-kids text-lg shadow-lg">
              Squad Development History
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 mt-4">
              <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-emerald-500 shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-[42px]">history_edu</span>
              </div>
              <div className="flex-1">
                <h3 className="font-kids text-3xl text-slate-900 mb-2">Training Day: August 27</h3>
                <p className="text-slate-600 text-lg font-medium leading-relaxed italic">
                  "On this intensive development day, the dragons worked on sharpening their core techniques. Every player showed immense focus on growth and technical mastery. We roared through the drills and truly worked on that day to build our bright future!"
                </p>
              </div>
              <div className="bg-white px-6 py-4 rounded-[28px] border-2 border-emerald-100 shadow-sm text-center min-w-[140px]">
                 <span className="block text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Status</span>
                 <span className="text-slate-900 font-black uppercase tracking-tighter text-sm">Completed ✓</span>
              </div>
            </div>
          </div>

          {/* Weather/Extraordinary Notice */}
          <div className="bg-red-50 border-2 border-red-100 p-8 rounded-[32px] flex items-start gap-4">
            <span className="material-symbols-outlined text-red-600 text-[32px] mt-1">info</span>
            <div className="space-y-2">
              <p className="font-kids text-xl text-red-900">Important Parent Note</p>
              <p className="text-red-700/80 font-medium text-sm leading-relaxed">
                If there are any changes to our schedule due to <span className="font-bold underline">weather</span> or <span className="font-bold underline">extraordinary circumstances</span>, we will notify parents immediately via our usual channels.
              </p>
            </div>
          </div>

          {/* Gear List */}
          <div className="p-8 bg-yellow-400/10 rounded-[40px] border-4 border-dashed border-yellow-400 relative">
            <div className="absolute -top-6 left-10 bg-yellow-400 text-red-900 px-6 py-2 rounded-full font-kids text-lg shadow-lg">
              Dragon Gear List
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {['Dragon Jersey', 'Magic Boots', 'Shin Guards', 'Full Water Bottle', 'Big Roar', 'Happy Face'].map(item => (
                <div key={item} className="bg-white px-5 py-4 rounded-2xl flex items-center gap-3 shadow-sm border border-yellow-200">
                  <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
                  <span className="text-sm font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em]">Knappy & Schlappi Elite Squad</p>
      </div>
    </div>
  );
};