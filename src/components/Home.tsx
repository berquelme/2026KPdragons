import React from 'react';
import { PageType, FanMessage } from '../types';
import { FanZone } from './FanZone';
import { PendingRoar } from '../App';

interface HomeProps {
  activePage?: PageType;
  onNavigate: (page: PageType) => void;
  onOpenRoarModal?: () => void;
  approvedRoars?: FanMessage[];
  pendingRoars?: PendingRoar[];
  onApproveRoar?: (id: string) => void;
  onRejectRoar?: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  onNavigate, 
  onOpenRoarModal,
  approvedRoars = [],
  pendingRoars = [],
  onApproveRoar,
  onRejectRoar
}) => {
  return (
    <div className="animate-hero">
      {/* Hero Content Area */}
      <section className="relative w-full pt-6 md:pt-12 pb-12 px-4">
        
        {/* Centered Identity */}
        <div className="relative z-20 flex flex-col items-center mb-10 md:mb-16">
          <div className="relative flex flex-col items-center">
            {/* Crest Mascot */}
            <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center transition-transform hover:scale-105 duration-300 drop-shadow-2xl cursor-pointer">
              <img
                src="/scorchey1.png"
                alt="Knapp & Schlappi U8 Scorchey Crest"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Gold Accent Badge */}
            <div className="mt-2 bg-[#FFD54F] px-5 md:px-7 py-1.5 rounded-full border-2 border-white shadow-md z-20">
              <span className="text-[11px] md:text-[13px] font-black text-[#E53935] uppercase tracking-widest whitespace-nowrap">
                BABY DRAGONS U8
              </span>
            </div>
          </div>

          <div className="mt-6 md:mt-8 text-center max-w-2xl">
            <h1 className="font-impact text-5xl md:text-8xl text-slate-900 leading-none uppercase tracking-tight">
              KNAPPY & <span className="text-[#E53935]">SCHLAPPI</span>
            </h1>
            <p className="mt-4 text-slate-500 font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
              The Nest of Future Legends
            </p>
            <div className="h-1.5 w-24 bg-[#FFD54F] mx-auto mt-6 rounded-full" />
          </div>
        </div>

        {/* Hero Slogan Card with soccerGame Photo */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[32px] md:rounded-[48px] overflow-hidden shadow-xl border-4 border-white/80 bg-slate-900 p-8 md:p-14 text-center group">
            <img
              src="/soccerGame.jpg"
              alt="Baby Dragons Match Action"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-white font-impact text-4xl md:text-7xl drop-shadow-lg leading-tight uppercase">
                Bright Futures,<br/>
                <span className="text-[#FFD54F]">Bigger Dreams</span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Fan Zone Integration */}
      <section id="fanzone-section" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-28">
        <div className="mb-10 flex items-center gap-6">
          <div className="h-0.5 flex-1 bg-[#FFD54F]/30" />
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em]">
            Dragon Roars Zone
          </span>
          <div className="h-0.5 flex-1 bg-[#FFD54F]/30" />
        </div>
        <FanZone 
          onOpenRoarModal={onOpenRoarModal}
          messages={approvedRoars}
          pendingRoars={pendingRoars}
          onApproveRoar={onApproveRoar}
          onRejectRoar={onRejectRoar}
        />
      </section>

      {/* Sub-features */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: 'Dragon Nest', icon: 'stadium', color: '#E53935', desc: 'Join us at 360 Elm Street for training and weekend matches.' },
          { title: 'Training Camp', icon: 'fitness_center', color: '#FFD54F', desc: 'Sharpening skills every Thursday under the golden sun.' },
        ].map((item, i) => (
          <div 
            key={i} 
            className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-[40px] shadow-sm border border-white flex flex-col items-center text-center group hover:shadow-xl transition-all"
          >
            <div 
              className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <span className="material-symbols-outlined text-[40px]" style={{ color: item.color }}>
                {item.icon}
              </span>
            </div>
            <h3 className="font-kids text-2xl md:text-3xl text-slate-900 mb-3">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium italic">"{item.desc}"</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;

// import React from 'react';
// import { PageType, FanMessage } from '../types';
// import { FanZone } from './FanZone';
// import { PendingRoar } from '../App';

// interface HomeProps {
//   activePage?: PageType;
//   onNavigate: (page: PageType) => void;
//   onOpenRoarModal?: () => void;
//   approvedRoars?: FanMessage[];
//   pendingRoars?: PendingRoar[];
//   onApproveRoar?: (id: string) => void;
//   onRejectRoar?: (id: string) => void;
// }

// export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenRoarModal }) => {
//   return (
//     <div className="animate-hero">
//       {/* Hero Content Area */}
//       <section className="relative w-full pt-6 md:pt-12 pb-12 px-4">
        
//         {/* Centered Identity */}
//         <div className="relative z-20 flex flex-col items-center mb-10 md:mb-16">
//           <div className="relative flex flex-col items-center">
//             {/* Crest Mascot */}
//             <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center transition-transform hover:scale-105 duration-300 drop-shadow-2xl cursor-pointer">
//               <img
//                 src="/scorchey1.png"
//                 alt="Knapp & Schlappi U8 Scorchey Crest"
//                 className="w-full h-full object-contain"
//               />
//             </div>
            
//             {/* Gold Accent Badge */}
//             <div className="mt-2 bg-[#FFD54F] px-5 md:px-7 py-1.5 rounded-full border-2 border-white shadow-md z-20">
//               <span className="text-[11px] md:text-[13px] font-black text-[#E53935] uppercase tracking-widest whitespace-nowrap">
//                 BABY DRAGONS U8
//               </span>
//             </div>
//           </div>

//           <div className="mt-6 md:mt-8 text-center max-w-2xl">
//             <h1 className="font-impact text-5xl md:text-8xl text-slate-900 leading-none uppercase tracking-tight">
//               KNAPPY & <span className="text-[#E53935]">SCHLAPPI</span>
//             </h1>
//             <p className="mt-4 text-slate-500 font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
//               The Nest of Future Legends
//             </p>
//             <div className="h-1.5 w-24 bg-[#FFD54F] mx-auto mt-6 rounded-full" />
//           </div>
//         </div>

//         {/* Hero Slogan Card with soccerGame Photo */}
//         <div className="max-w-4xl mx-auto">
//           <div className="relative rounded-[32px] md:rounded-[48px] overflow-hidden shadow-xl border-4 border-white/80 bg-slate-900 p-8 md:p-14 text-center group">
//             <img
//               src="/soccerGame.jpg"
//               alt="Baby Dragons Match Action"
//               className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
//             <div className="relative z-10">
//               <h2 className="text-white font-impact text-4xl md:text-7xl drop-shadow-lg leading-tight uppercase">
//                 Bright Futures,<br/>
//                 <span className="text-[#FFD54F]">Bigger Dreams</span>
//               </h2>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Fan Zone Integration */}
//       <section id="fanzone-section" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-28">
//         <div className="mb-10 flex items-center gap-6">
//           <div className="h-0.5 flex-1 bg-[#FFD54F]/30" />
//           <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em]">
//             Dragon Roars Zone
//           </span>
//           <div className="h-0.5 flex-1 bg-[#FFD54F]/30" />
//         </div>
//         <FanZone onOpenRoarModal={onOpenRoarModal} />
//       </section>

//       {/* Sub-features */}
//       <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
//         {[
//           { title: 'Dragon Nest', icon: 'stadium', color: '#E53935', desc: 'Join us at 360 Elm Street for training and weekend matches.' },
//           { title: 'Training Camp', icon: 'fitness_center', color: '#FFD54F', desc: 'Sharpening skills every Thursday under the golden sun.' },
//         ].map((item, i) => (
//           <div 
//             key={i} 
//             className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-[40px] shadow-sm border border-white flex flex-col items-center text-center group hover:shadow-xl transition-all"
//           >
//             <div 
//               className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
//               style={{ backgroundColor: `${item.color}20` }}
//             >
//               <span className="material-symbols-outlined text-[40px]" style={{ color: item.color }}>
//                 {item.icon}
//               </span>
//             </div>
//             <h3 className="font-kids text-2xl md:text-3xl text-slate-900 mb-3">{item.title}</h3>
//             <p className="text-slate-500 leading-relaxed font-medium italic">"{item.desc}"</p>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default Home;
