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
      <div className="w-full max-w-4xl mx-auto h-72 sm:h-96 md:h-[420px] bg-slate-100 rounded-[32px] flex items-center justify-center text-slate-300">
        <span className="material-symbols-outlined text-5xl">image</span>
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
    <div className="relative w-full max-w-4xl mx-auto h-72 sm:h-96 md:h-[440px] rounded-[32px] overflow-hidden group bg-slate-900 select-none shadow-xl border-2 border-white/60">
      {/* Badge */}
      {badgeText && (
        <div className="absolute top-5 left-5 z-20">
          <span
            className={`${badgeBg} text-slate-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md`}
          >
            {badgeText}
          </span>
        </div>
      )}

      {/* Main Image */}
      <img
        src={images[currentIndex]}
        alt={`${alt} ${currentIndex + 1}`}
        className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
      />

      {/* Subtle bottom gradient to make dots and photo edges pop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

      {/* Navigation Arrows (Only visible if > 1 photo) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer border border-white/20"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer border border-white/20"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_right</span>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/45 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            {images.map((_, idx) => (
              <button
                type="button"
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`transition-all rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-[#FFD54F]'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
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

export default ImageCarousel;

// import React, { useState } from 'react';

// interface ImageCarouselProps {
//   images: string[];
//   alt?: string;
//   badgeText?: string;
//   badgeBg?: string;
//   className?: string;
// }

// export const ImageCarousel: React.FC<ImageCarouselProps> = ({
//   images,
//   alt = 'Moment photo',
//   badgeText,
//   badgeBg = 'bg-[#FFD54F]',
//   className = '',
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   if (!images || images.length === 0) {
//     return (
//       <div className={`w-full h-56 sm:h-72 md:h-80 bg-slate-100 rounded-t-[32px] flex items-center justify-center text-slate-300 ${className}`}>
//         <span className="material-symbols-outlined text-4xl">image</span>
//       </div>
//     );
//   }

//   const prevSlide = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const nextSlide = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   return (
//     <div
//       className={`relative w-full h-56 sm:h-72 md:h-80 rounded-t-[32px] overflow-hidden group bg-slate-900 select-none ${className}`}
//     >
//       {/* Badge */}
//       {badgeText && (
//         <div className="absolute top-4 left-4 z-20">
//           <span
//             className={`${badgeBg} text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm`}
//           >
//             {badgeText}
//           </span>
//         </div>
//       )}

//       {/* Main Image */}
//       <img
//         src={images[currentIndex]}
//         alt={`${alt} ${currentIndex + 1}`}
//         className="w-full h-full object-cover object-center transition-all duration-500 ease-out"
//       />

//       {/* Navigation Arrows (Only visible if > 1 photo) */}
//       {images.length > 1 && (
//         <>
//           <button
//             type="button"
//             onClick={prevSlide}
//             aria-label="Previous image"
//             className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm active:scale-95 cursor-pointer"
//           >
//             <span className="material-symbols-outlined text-[20px]">chevron_left</span>
//           </button>
//           <button
//             type="button"
//             onClick={nextSlide}
//             aria-label="Next image"
//             className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm active:scale-95 cursor-pointer"
//           >
//             <span className="material-symbols-outlined text-[20px]">chevron_right</span>
//           </button>

//           {/* Dots Indicator */}
//           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
//             {images.map((_, idx) => (
//               <button
//                 type="button"
//                 key={idx}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setCurrentIndex(idx);
//                 }}
//                 className={`transition-all rounded-full cursor-pointer ${
//                   idx === currentIndex
//                     ? 'w-5 h-1.5 bg-[#FFD54F]'
//                     : 'w-1.5 h-1.5 bg-white/60 hover:bg-white/90'
//                 }`}
//                 aria-label={`Go to slide ${idx + 1}`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ImageCarousel;

// interface ImageCarouselProps {
//   images: string[];
//   alt?: string;
//   badgeText?: string;
//   badgeBg?: string;
// }

// export const ImageCarousel: React.FC<ImageCarouselProps> = ({
//   images,
//   alt = 'Moment photo',
//   badgeText,
//   badgeBg = 'bg-[#FFD54F]',
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   if (!images || images.length === 0) {
//     return (
//       <div className="w-full h-52 bg-slate-100 rounded-t-[32px] flex items-center justify-center text-slate-300">
//         <span className="material-symbols-outlined text-4xl">image</span>
//       </div>
//     );
//   }

//   const prevSlide = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const nextSlide = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   return (
//     <div className="relative w-full h-56 rounded-t-[32px] overflow-hidden group bg-slate-900 select-none">
//       {/* Badge */}
//       {badgeText && (
//         <div className="absolute top-4 left-4 z-20">
//           <span
//             className={`${badgeBg} text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm`}
//           >
//             {badgeText}
//           </span>
//         </div>
//       )}

//       {/* Main Image */}
//       <img
//         src={images[currentIndex]}
//         alt={`${alt} ${currentIndex + 1}`}
//         className="w-full h-full object-cover transition-all duration-500 ease-out"
//       />

//       {/* Navigation Arrows (Only visible if > 1 photo) */}
//       {images.length > 1 && (
//         <>
//           <button
//             onClick={prevSlide}
//             aria-label="Previous image"
//             className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm active:scale-90"
//           >
//             <span className="material-symbols-outlined text-[18px]">chevron_left</span>
//           </button>
//           <button
//             onClick={nextSlide}
//             aria-label="Next image"
//             className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm active:scale-90"
//           >
//             <span className="material-symbols-outlined text-[18px]">chevron_right</span>
//           </button>

//           {/* Dots Indicator */}
//           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
//             {images.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setCurrentIndex(idx);
//                 }}
//                 className={`transition-all rounded-full ${
//                   idx === currentIndex
//                     ? 'w-4 h-1.5 bg-white'
//                     : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
//                 }`}
//                 aria-label={`Go to slide ${idx + 1}`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };