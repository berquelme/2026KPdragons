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

  const handleSeeMoments = (targetIndex: number) => {
    setActivePhoto(targetIndex);
    const element = document.getElementById('team-moments');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

      {/* News Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEWS_ITEMS.map((item) => (
          <article
            key={item.id}
            className={`bg-white rounded-3xl overflow-hidden shadow-lg border-2 flex flex-col group transition-all duration-300 hover:-translate-y-1 ${
              item.highlight ? 'border-yellow-400 ring-4 ring-yellow-400/10' : 'border-amber-100'
            }`}
          >
            <div className={`h-48 relative overflow-hidden ${item.highlight ? 'bg-[#E53935]' : 'bg-[#FFEBEE]'}`}>
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <>
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
                </>
              )}
              <span className="absolute top-4 left-4 z-20 bg-yellow-400 text-red-900 text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                {item.tag}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs font-bold text-amber-500 mb-2">{item.date}</span>
              <h3 className="text-xl font-normal text-amber-900 mb-3 leading-tight group-hover:text-red-600 transition-colors font-kids">
                {item.title}
              </h3>
              <p className="text-[#8D6E63] leading-relaxed font-medium mb-4 flex-1">
                {item.excerpt}
              </p>
              <button 
                type="button"
                onClick={() => handleSeeMoments(item.photoIndex ?? 0)}
                className="text-red-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer mt-auto"
              >
                SEE THE MOMENTS <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Dedicated Team Gallery Carousel Section */}
      <div id="team-moments" className="bg-white rounded-[36px] p-6 md:p-10 shadow-xl border-2 border-amber-100 space-y-6 w-full max-w-5xl mx-auto scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-red-50 text-[#E53935] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">photo_library</span>
            </span>
            <div>
              <h3 className="font-kids text-2xl md:text-3xl text-slate-800 leading-none uppercase">
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
              type="button"
              onClick={prevPhoto}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#E53935] hover:text-white text-slate-700 flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
              aria-label="Previous image"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={nextPhoto}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#E53935] hover:text-white text-slate-700 flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
              aria-label="Next image"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Proportional Viewport (Accommodates portrait awards without clipping cleats or horns) */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] md:aspect-[16/11] max-h-[75vh] rounded-[28px] md:rounded-[36px] overflow-hidden bg-slate-950 shadow-inner group flex items-center justify-center">
          <img
            src={TEAM_PHOTOS[activePhoto].url}
            alt={TEAM_PHOTOS[activePhoto].caption}
            className="w-full h-full object-contain md:object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-6 md:p-8 text-white pointer-events-none">
            <span className="bg-[#E53935] text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider w-max mb-2 shadow-sm">
              Highlight
            </span>
            <h4 className="font-kids text-2xl md:text-3xl leading-snug drop-shadow-md">
              {TEAM_PHOTOS[activePhoto].caption}
            </h4>
            <p className="text-slate-200 text-xs md:text-sm font-medium opacity-90 max-w-2xl mt-1 leading-relaxed line-clamp-2 md:line-clamp-none">
              {TEAM_PHOTOS[activePhoto].subtitle}
            </p>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-5 gap-3 pt-2">
          {TEAM_PHOTOS.map((photo, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setActivePhoto(index)}
              className={`aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all relative cursor-pointer ${
                activePhoto === index
                  ? 'border-[#E53935] ring-2 ring-[#E53935]/40 scale-[1.03]'
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
