import React, { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  alt?: string;
  badgeText?: string;
  badgeBg?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  alt = 'Moment photo',
  badgeText,
  badgeBg = 'bg-[#FFD54F]',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-52 bg-slate-100 rounded-t-[32px] flex items-center justify-center text-slate-300">
        <span className="material-symbols-outlined text-4xl">image</span>
      </div>
    );
  }

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-56 rounded-t-[32px] overflow-hidden group bg-slate-900 select-none">
      {/* Badge */}
      {badgeText && (
        <div className="absolute top-4 left-4 z-20">
          <span
            className={`${badgeBg} text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm`}
          >
            {badgeText}
          </span>
        </div>
      )}

      {/* Main Image */}
      <img
        src={images[currentIndex]}
        alt={`${alt} ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-500 ease-out"
      />

      {/* Navigation Arrows (Only visible if > 1 photo) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous image"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next image"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`transition-all rounded-full ${
                  idx === currentIndex
                    ? 'w-4 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};