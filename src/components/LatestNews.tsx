import React, { useState } from 'react';
import { TEAM_PHOTOS } from '../data/teamPhotos';
import { NEWS_ITEMS } from '../data/newsData';
import { teamData } from '../data/teamData';

export const LatestNews: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState(0);

  const prevPhoto = () => {
    setActivePhoto((prev) => (prev === 0 ? TEAM_PHOTOS.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setActivePhoto((prev) => (prev === TEAM_PHOTOS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-12 animate-in zoom-in-95 duration-500 pb-16">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-4xl font-normal text-red-600 font-kids uppercase">
          LATEST {teamData.shortName === 'Dragons' ? 'ROARS' : 'NEWS'}
        </h2>
        <p className="text-amber-800 font-medium italic">
          Inside {teamData.shortName}'s territory
        </p>
      </div>

      {/* 3 News Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {NEWS_ITEMS.map((item) => (
          <article
            key={item.id}
            className={`bg-white rounded-3xl overflow-hidden shadow-lg border-2 flex flex-col group transition-all duration-300 hover:-translate-y-1 ${
              item.highlight ? 'border-yellow-400 ring-4 ring-yellow-400/10' : 'border-amber-100'
            }`}
          >
            <div className={`h-48 relative overflow-hidden ${item.highlight ? 'bg-[#E53935]' : 'bg-[#FFEBEE]'}`}>
              <div className="absolute inset-0 bg-yellow-400 opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <span
                  className={`material-symbols-outlined text-[80px] ${
                    item.highlight ? 'text-white/30' : 'text-[#E53935]/40'
                  }`}
                >
                  {item.icon || (item.highlight ? 'star' : 'newspaper')}
                </span>
              </div>
              <span className="absolute top-4 left-4 z-20 bg-yellow-400 text-red-900 text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                {item.tag}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs font-bold text-amber-500 mb-2">{item.date}</span>
              <h3 className="text-xl font-normal text-amber-900 mb-3 leading-tight group-hover:text-red-600 transition-colors font-kids">
                {item.title}
              </h3>
              <p className="text-sm text-amber-800/70 mb-6 flex-1 leading-relaxed italic">
                "{item.excerpt}"
              </p>
              <button 
                type="button"
                className="text-red-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                SEE THE MOMENTS <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Dedicated Team Gallery Carousel Section */}
      <div className="bg-white rounded-[36px] p-6 md:p-8 shadow-xl border-2 border-amber-100 space-y-6 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-red-50 text-[#E53935] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">photo_library</span>
            </span>
            <div>
              <h3 className="font-kids text-2xl text-slate-800 leading-none uppercase">
                {teamData.shortName} MOMENTS
              </h3>
              <p className="text-xs font-semibold text-slate-400 mt-1">Snapshots from practices, matches, and team huddles</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-black text-slate-400 mr-2">
              {activePhoto + 1} / {TEAM_PHOTOS.length}
            </span>
            <button
              onClick={prevPhoto}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#E53935] hover:text-white text-slate-700 flex items-center justify-center transition-colors active:scale-95"
              aria-label="Previous image"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button
              onClick={nextPhoto}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#E53935] hover:text-white text-slate-700 flex items-center justify-center transition-colors active:scale-95"
              aria-label="Next image"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Compact 4:3 Proportion Photo Viewport */}
        <div className="relative aspect-[4/3] max-h-[420px] w-full mx-auto rounded-[28px] overflow-hidden bg-slate-900 shadow-inner group">
          <img
            src={TEAM_PHOTOS[activePhoto].url}
            alt={TEAM_PHOTOS[activePhoto].caption}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Caption Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 md:p-6 text-white">
            <span className="bg-[#E53935] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider w-max mb-1.5">
              Highlight
            </span>
            <h4 className="font-kids text-xl md:text-2xl leading-snug">
              {TEAM_PHOTOS[activePhoto].caption}
            </h4>
            <p className="text-slate-200 text-xs font-medium opacity-90">
              {TEAM_PHOTOS[activePhoto].subtitle}
            </p>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-3 pt-1">
          {TEAM_PHOTOS.map((photo, index) => (
            <button
              key={index}
              onClick={() => setActivePhoto(index)}
              className={`aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all relative ${
                activePhoto === index
                  ? 'border-[#E53935] ring-2 ring-[#E53935]/30 scale-[1.02]'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;