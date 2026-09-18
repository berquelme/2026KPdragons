import React, { useState } from 'react';
import { PageType } from '../types';
import { teamData } from '../data/teamData';

interface HeaderProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenRoarModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activePage, 
  onNavigate, 
  onOpenRoarModal 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const newsLabel = teamData.shortName?.toLowerCase() === 'dragons' ? 'Roars' : 'News';

  const navItems: { label: string; value: PageType; icon: string }[] = [
    { label: 'Pitch', value: 'HOME', icon: 'stadium' },
    { label: 'Oath', value: 'MISSION', icon: 'shield' },
    { label: 'Training', value: 'TRAINING', icon: 'fitness_center' },
    { label: 'Matches', value: 'MATCHES', icon: 'sports_soccer' },
    { label: newsLabel, value: 'NEWS', icon: 'newspaper' },
    { label: 'Roster', value: 'ROSTER', icon: 'groups' },
    { label: 'Connect', value: 'CONTACT', icon: 'mail' },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white shadow-sm">
      {/* Top Banner Accent */}
      <div className="h-1 w-full bg-[#FFD54F]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Brand Identity */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('HOME')}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
            {teamData.mascotImage ? (
              <img 
                src={teamData.mascotImage} 
                alt={teamData.name} 
                className="w-full h-full object-contain drop-shadow-sm"
              />
            ) : (
              <span className="material-symbols-outlined text-[#E53935] text-[36px]">sports_soccer</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-impact text-slate-900 text-lg sm:text-2xl leading-none uppercase">
              {teamData.name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-black text-[#E53935] tracking-tight uppercase mt-0.5">
              {teamData.mascot} ({teamData.ageGroup})
            </span>
          </div>
        </div>

        {/* Desktop Navigation (large screens) */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activePage === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleNavClick(item.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer
                  ${isActive 
                    ? 'bg-[#E53935] text-white shadow-lg shadow-red-500/20' 
                    : 'text-slate-500 hover:text-[#E53935] hover:bg-red-50'
                  }`}
              >
                <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-[#FFD54F]' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Call to Action - ONLY visible on XL screens */}
        <div className="hidden xl:flex items-center gap-4">
          <div className="w-px h-6 bg-slate-200" />
          <button
            type="button"
            onClick={onOpenRoarModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E53935] text-white rounded-xl text-[10px] font-bold cursor-pointer hover:bg-red-600 transition-colors shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">campaign</span>
            {teamData.cheerButtonText || 'Send Cheer'}
          </button>
        </div>

        {/* Hamburger Menu Button (visible on screens below lg) */}
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-[#E53935] transition-colors focus:outline-none cursor-pointer"
          >
            <span className="material-symbols-outlined text-[26px]">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Dropdown Menu Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-100 px-5 py-4 shadow-xl transition-all">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activePage === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleNavClick(item.value)}
                  className={`flex items-center justify-between p-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-colors cursor-pointer
                    ${isActive 
                      ? 'bg-[#E53935] text-white shadow-md' 
                      : 'bg-slate-50 text-slate-700 hover:bg-red-50 hover:text-[#E53935]'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#FFD54F]' : 'text-slate-400'}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] opacity-60">
                    chevron_right
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

// import React from 'react';
// import { PageType } from '../types';
// import { teamData } from '../data/teamData';

// interface HeaderProps {
//   activePage: PageType;
//   onNavigate: (page: PageType) => void;
//   onOpenRoarModal: () => void;
// }

// export const Header: React.FC<HeaderProps> = ({ 
//   activePage, 
//   onNavigate, 
//   onOpenRoarModal 
// }) => {
//   const newsLabel = teamData.shortName?.toLowerCase() === 'dragons' ? 'Roars' : 'News';

//   const navItems: { label: string; value: PageType; icon: string }[] = [
//     { label: 'Pitch', value: 'HOME', icon: 'stadium' },
//     { label: 'Oath', value: 'MISSION', icon: 'shield' },
//     { label: 'Training', value: 'TRAINING', icon: 'fitness_center' },
//     { label: 'Matches', value: 'MATCHES', icon: 'sports_soccer' },
//     { label: newsLabel, value: 'NEWS', icon: 'newspaper' },
//     { label: 'Roster', value: 'ROSTER', icon: 'groups' },
//     { label: 'Connect', value: 'CONTACT', icon: 'mail' },
//   ];

//   return (
//     <header className="w-full bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-white shadow-sm">
//       {/* Top Banner Accent */}
//       <div className="h-1 w-full bg-[#FFD54F]" />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
//         {/* Brand Identity */}
//         <div 
//           className="flex items-center gap-3 cursor-pointer group"
//           onClick={() => onNavigate('HOME')}
//         >
//           <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
//             {teamData.mascotImage ? (
//               <img 
//                 src={teamData.mascotImage} 
//                 alt={teamData.name} 
//                 className="w-full h-full object-contain drop-shadow-sm"
//               />
//             ) : (
//               <span className="material-symbols-outlined text-[#E53935] text-[36px]">sports_soccer</span>
//             )}
//           </div>
//           <div className="flex flex-col">
//             <span className="font-impact text-slate-900 text-lg sm:text-2xl leading-none uppercase">
//               {teamData.name}
//             </span>
//             <span className="text-[10px] sm:text-[11px] font-black text-[#E53935] tracking-tight uppercase mt-0.5">
//               {teamData.mascot} ({teamData.ageGroup})
//             </span>
//           </div>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden lg:flex items-center gap-1">
//           {navItems.map((item) => {
//             const isActive = activePage === item.value;
//             return (
//               <button
//                 key={item.value}
//                 type="button"
//                 onClick={() => onNavigate(item.value)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer
//                   ${isActive 
//                     ? 'bg-[#E53935] text-white shadow-lg shadow-red-500/20' 
//                     : 'text-slate-500 hover:text-[#E53935] hover:bg-red-50'
//                   }`}
//               >
//                 <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-[#FFD54F]' : 'text-slate-400'}`}>
//                   {item.icon}
//                 </span>
//                 <span>{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>

//         {/* Desktop Call to Action */}
//         <div className="hidden xl:flex items-center gap-4">
//           <div className="w-px h-6 bg-slate-200" />
//           <button
//             type="button"
//             onClick={onOpenRoarModal}
//             className="flex items-center gap-2 px-5 py-2.5 bg-[#E53935] text-white rounded-xl text-[10px] font-bold cursor-pointer hover:bg-red-600 transition-colors"
//           >
//             <span className="material-symbols-outlined text-[18px]">campaign</span>
//             {teamData.cheerButtonText || 'Send Cheer'}
//           </button>
//         </div>

//         {/* Mobile Header Button */}
//         <div className="lg:hidden flex items-center gap-2">
//           <button
//             type="button"
//             onClick={onOpenRoarModal}
//             className="bg-[#E53935] text-white px-3.5 py-1.5 rounded-xl shadow-md active:scale-95 transition-transform flex items-center gap-1.5 font-kids text-xs uppercase cursor-pointer"
//           >
//             <span className="material-symbols-outlined text-[18px]">campaign</span>
//             <span>{teamData.cheerButtonText || 'Cheer'}</span>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Scroller */}
//       <div className="lg:hidden border-t border-slate-100 overflow-x-auto no-scrollbar bg-white/50 backdrop-blur-md">
//         <div className="flex items-center gap-2 px-4 py-2.5 whitespace-nowrap">
//           {navItems.map((item) => {
//             const isActive = activePage === item.value;
//             return (
//               <button
//                 key={item.value}
//                 type="button"
//                 onClick={() => onNavigate(item.value)}
//                 className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer
//                   ${isActive 
//                     ? 'bg-[#E53935] text-white shadow-md' 
//                     : 'bg-white border border-slate-100 text-slate-500'}`}
//               >
//                 <span className={`material-symbols-outlined text-[15px] ${isActive ? 'text-white' : 'text-slate-400'}`}>
//                   {item.icon}
//                 </span>
//                 {item.label}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;