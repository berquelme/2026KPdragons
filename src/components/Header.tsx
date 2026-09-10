import React from 'react';
import { PageType } from '../types';

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
  const navItems: { label: string; value: PageType; icon: string }[] = [
    { label: 'Pitch', value: 'HOME', icon: 'home' },
    { label: 'Oath', value: 'MISSION', icon: 'shield' },
    { label: 'Training', value: 'TRAINING', icon: 'fitness_center' },
    { label: 'Matches', value: 'MATCHES', icon: 'sports_soccer' },
    { label: 'Roars', value: 'NEWS', icon: 'newspaper' },
    { label: 'Roster', value: 'ROSTER', icon: 'groups' },
    { label: 'Connect', value: 'CONTACT', icon: 'mail' },
  ];

  return (
    <header className="w-full bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-white shadow-sm">
      {/* Top Banner Accent - Gold */}
      <div className="h-1 w-full bg-[#FFD54F]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Brand Identity */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('HOME')}
        >
          <div className="bg-[#E53935] p-2 rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-white text-[24px]">local_fire_department</span>
          </div>
          <div className="flex flex-col">
            <span className="font-impact text-slate-900 text-lg sm:text-xl leading-none">KNAPPY & SCHLAPPI</span>
            <span className="text-[10px] font-black text-[#E53935] tracking-tighter uppercase">Baby Dragons</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activePage === item.value;
            return (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
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

        {/* Desktop Call to Action */}
        <div className="hidden xl:flex items-center gap-4">
          <div className="w-px h-6 bg-slate-200" />
          <button 
            type="button"
            onClick={onOpenRoarModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E53935] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">campaign</span>
            Your Roar
          </button>
        </div>

        {/* Mobile Header Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenRoarModal}
            className="bg-[#E53935] text-white px-3.5 py-1.5 rounded-xl shadow-md active:scale-95 transition-transform flex items-center gap-1.5 font-kids text-xs uppercase"
          >
            <span className="material-symbols-outlined text-[18px]">campaign</span>
            <span>Your Roar</span>
          </button>
        </div>
      </div>

      {/* Mobile Scroller */}
      <div className="lg:hidden border-t border-slate-100 overflow-x-auto no-scrollbar bg-white/50 backdrop-blur-md">
        <div className="flex items-center gap-2 px-4 py-2.5 whitespace-nowrap">
          {navItems.map((item) => {
            const isActive = activePage === item.value;
            return (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                  ${isActive 
                    ? 'bg-[#E53935] text-white shadow-md' 
                    : 'bg-white border border-slate-100 text-slate-500'}`}
              >
                <span className={`material-symbols-outlined text-[15px] ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;

// import React from 'react';
// import { PageType } from '../types';

// interface HeaderProps {
//   activePage: PageType;
//   onNavigate: (page: PageType) => void;
// }

// export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
//   const navItems: { label: string; value: PageType; icon: string }[] = [
//     { label: 'Pitch', value: 'HOME', icon: 'home' },
//     { label: 'Oath', value: 'MISSION', icon: 'shield' },
//     { label: 'Training', value: 'TRAINING', icon: 'fitness_center' },
//     { label: 'Matches', value: 'MATCHES', icon: 'sports_soccer' },
//     { label: 'Roars', value: 'NEWS', icon: 'newspaper' },
//     { label: 'Roster', value: 'ROSTER', icon: 'groups' },
//     { label: 'Connect', value: 'CONTACT', icon: 'mail' },
//   ];

//   const handleAddRoar = () => {
//     onNavigate('HOME');
//     setTimeout(() => {
//       const element = document.getElementById('fanzone-section');
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }
//     }, 150);
//   };

//   return (
//     <header className="w-full bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-white shadow-sm">
//       {/* Top Banner Accent - Gold */}
//       <div className="h-1 w-full bg-[#FFD54F]" />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
//         {/* Brand Identity */}
//         <div 
//           className="flex items-center gap-3 cursor-pointer group"
//           onClick={() => onNavigate('HOME')}
//         >
//           <div className="bg-[#E53935] p-2 rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
//             <span className="material-symbols-outlined text-white text-[24px]">local_fire_department</span>
//           </div>
//           <div className="flex flex-col">
//             <span className="font-impact text-slate-900 text-lg sm:text-xl leading-none">KNAPPY & SCHLAPPI</span>
//             <span className="text-[10px] font-black text-[#E53935] tracking-tighter uppercase">Baby Dragons</span>
//           </div>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden lg:flex items-center gap-1">
//           {navItems.map((item) => {
//             const isActive = activePage === item.value;
//             return (
//               <button
//                 key={item.value}
//                 onClick={() => onNavigate(item.value)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
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
//             onClick={handleAddRoar}
//             className="flex items-center gap-2 px-5 py-2.5 bg-[#E53935] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-md active:scale-95"
//           >
//             <span className="material-symbols-outlined text-[18px]">campaign</span>
//             Your Roar
//           </button>
//         </div>

//         {/* Mobile Header Button */}
//         <div className="lg:hidden flex items-center gap-2">
//           <button
//             onClick={handleAddRoar}
//             className="bg-[#E53935] text-white px-3.5 py-1.5 rounded-xl shadow-md active:scale-95 transition-transform flex items-center gap-1.5 font-kids text-xs uppercase"
//           >
//             <span className="material-symbols-outlined text-[18px]">campaign</span>
//             <span>Add Roar</span>
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
//                 onClick={() => onNavigate(item.value)}
//                 className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
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
