import React from 'react';
import { trainingData } from '../data/trainingData';
import { teamData } from '../data/teamData';

export const Training: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 animate-fade-up pb-20">
      <div className="bg-white rounded-[60px] shadow-2xl overflow-hidden border-4 border-slate-100">
        <div className="nav-gradient p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[300px]">fitness_center</span>
          </div>
          <h2 className="text-5xl font-kids mb-4 relative z-10 uppercase">
            {trainingData.headerTitle}
          </h2>
          <p className="text-yellow-300 font-kids text-xl relative z-10">
            {trainingData.headerSubtitle}
          </p>
        </div>
        
        <div className="p-6 md:p-12 space-y-12">
          {/* Location Details */}
          <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[32px] border-2 border-slate-100 group">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm text-emerald-500 shrink-0">
              <span className="material-symbols-outlined text-[36px]">location_on</span>
            </div>
            <div>
              <p className="font-kids text-2xl text-slate-900">{trainingData.locationName}</p>
              <p className="text-slate-500 font-medium">{trainingData.locationDetails}</p>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-kids text-3xl text-slate-900 flex items-center gap-3">
                <span className="material-symbols-outlined text-red-500">calendar_month</span>
                Weekly Schedule
              </h3>
              <span className="bg-red-50 text-red-600 text-[10px] font-black px-3 py-1 rounded-full border border-red-100 uppercase tracking-widest">
                {trainingData.scheduleBadge}
              </span>
            </div>
            
            <div className="grid gap-4">
              {trainingData.sessions.map((s) => (
                <div key={s.day} className="p-6 md:p-8 bg-white border-2 border-slate-50 rounded-[32px] hover:border-red-500/20 transition-all hover:shadow-xl group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
                        <span className="material-symbols-outlined text-[32px]">{s.icon}</span>
                      </div>
                      <div>
                        <p className="font-kids text-2xl text-slate-900">{s.day}</p>
                        <p className="text-slate-500 font-medium">{s.focus}</p>
                      </div>
                    </div>
                    <div className="sm:text-right pl-22 sm:pl-0">
                      <p className="font-kids text-xl md:text-2xl text-red-600 leading-none">{s.time}</p>
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-1 block">Full Session</span>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {s.phases.map((phase, idx) => (
                      <div key={idx} className="bg-slate-50/50 p-5 rounded-3xl border border-slate-100 flex items-center justify-between group/phase hover:bg-white hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                            <span className={`material-symbols-outlined text-[20px] ${phase.color}`}>{phase.icon}</span>
                          </div>
                          <div>
                            <p className="font-kids text-xl text-slate-900">{phase.label}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              {idx === 0 ? 'Skills & Focus' : 'Match Simulation'}
                            </p>
                          </div>
                        </div>
                        <span className="bg-white px-3 py-1.5 rounded-xl text-[10px] font-black text-red-600 shadow-sm border border-slate-100 shrink-0">
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
          <div className="pt-8 pb-8 px-6 md:p-8 bg-red-400/5 rounded-[40px] border-4 border-dashed border-red-400/30 relative mt-8">
            <div className="absolute -top-6 left-10 bg-[#E53935] text-white px-6 py-2 rounded-full font-kids text-lg shadow-lg">
              Next Practice Roadmap
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {trainingData.upcomingFocus.map((item, idx) => (
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

          {/* Special Development Logs */}
          {trainingData.historyLogs && trainingData.historyLogs.map((log, index) => (
            <div key={index} className="pt-8 pb-8 px-6 md:p-8 bg-emerald-50 rounded-[40px] border-4 border-dashed border-emerald-200 relative group mt-8">
              <div className="absolute -top-6 left-10 bg-emerald-500 text-white px-6 py-2 rounded-full font-kids text-lg shadow-lg">
                Squad Development History
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8 mt-4">
                <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-emerald-500 shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[42px]">history_edu</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-kids text-3xl text-slate-900 mb-2">{log.dateTitle}</h3>
                  <p className="text-slate-600 text-lg font-medium leading-relaxed italic">
                    "{log.description}"
                  </p>
                </div>
                <div className="bg-white px-6 py-4 rounded-[28px] border-2 border-emerald-100 shadow-sm text-center min-w-[140px]">
                  <span className="block text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Status</span>
                  <span className="text-slate-900 font-black uppercase tracking-tighter text-sm">
                    {log.status}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Weather/Extraordinary Notice */}
          <div className="bg-red-50 border-2 border-red-100 p-8 rounded-[32px] flex items-start gap-4">
            <span className="material-symbols-outlined text-red-600 text-[32px] mt-1 shrink-0">info</span>
            <div className="space-y-2">
              <p className="font-kids text-xl text-red-900">Important Parent Note</p>
              <p className="text-red-700/80 font-medium text-sm leading-relaxed">
                If there are any changes to our schedule due to <span className="underline font-bold">weather</span> or <span className="underline font-bold">extraordinary circumstances</span>, we will notify parents immediately via our usual channels.
              </p>
            </div>
          </div>

          {/* Gear List */}
          <div className="pt-8 pb-8 px-6 md:p-8 bg-yellow-400/10 rounded-[40px] border-4 border-dashed border-yellow-400 relative mt-8">
            <div className="absolute -top-6 left-10 bg-yellow-400 text-red-900 px-6 py-2 rounded-full font-kids text-lg shadow-lg">
              {trainingData.gearListTitle}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {trainingData.gearItems.map((item) => (
                <div key={item} className="bg-white px-5 py-4 rounded-2xl flex items-center gap-3 shadow-sm border border-yellow-200">
                  <span className="material-symbols-outlined text-green-500 text-[20px] shrink-0">check_circle</span>
                  <span className="text-sm font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em]">
          {teamData.name} Squad
        </p>
      </div>
    </div>
  );
};

export default Training;