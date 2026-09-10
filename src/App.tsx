
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import Home from './components/Home';
import { Mission } from './components/Mission';
import { Training } from './components/Training';
import { MatchSchedule } from './components/MatchSchedule';
import { LatestNews } from './components/LatestNews';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { RightPanel } from './components/RightPanel';
import { RoarModal } from './components/RoarModal';
import { PageType, FanMessage } from './types';

export interface PendingRoar {
  id: string;
  author: string;
  player: string;
  message: string;
  timestamp: number;
}

const DEFAULT_APPROVED: FanMessage[] = [
  { id: '1', playerName: 'Jamie Daggett', fanName: 'SuperDad', content: 'Incredible footwork today! Keep roaring!', timestamp: Date.now(), color: '#E53935', x: 15, y: 25 },
  { id: '2', playerName: 'Bryson Nolt', fanName: 'Coach B', content: 'That assist was world-class. Great vision!', timestamp: Date.now(), color: '#FFD54F', x: 65, y: 35 },
  { id: '3', playerName: 'Tess Almeida', fanName: 'Auntie Sarah', content: 'The Great Wall of Tess! Nothing gets past you!', timestamp: Date.now(), color: '#1a1a1a', x: 40, y: 70 },
  { id: '4', playerName: 'Elijah Sherman', fanName: 'The Shermans', content: 'Rocket boots engaged! 🚀', timestamp: Date.now(), color: '#E53935', x: 80, y: 20 },
];

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('HOME');
  const [isRoarModalOpen, setIsRoarModalOpen] = useState(false);

  const [approvedRoars, setApprovedRoars] = useState<FanMessage[]>(() => {
    const saved = localStorage.getItem('dragons_approved_roars');
    return saved ? JSON.parse(saved) : DEFAULT_APPROVED;
  });

  const [pendingRoars, setPendingRoars] = useState<PendingRoar[]>(() => {
    const saved = localStorage.getItem('dragons_pending_roars');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dragons_approved_roars', JSON.stringify(approvedRoars));
  }, [approvedRoars]);

  useEffect(() => {
    localStorage.setItem('dragons_pending_roars', JSON.stringify(pendingRoars));
  }, [pendingRoars]);

  useEffect(() => {
    const id = 'knappy-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Inter:wght@400;500;700;900&family=Bebas+Neue&display=swap';
      document.head.appendChild(link);
    }

    const styleId = 'knappy-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        :root {
          --brand-red: #E53935;
          --brand-red-soft: #FFEBEE;
          --brand-gold: #FFD54F;
          --brand-sky: #E3F2FD;
          --brand-grass: #E8F5E9;
          --brand-cream: #FFFDE7;
        }
        body {
          background-color: var(--brand-cream);
          font-family: 'Inter', -apple-system, sans-serif;
          margin: 0;
          overflow-x: hidden;
        }
        h1, h2, h3, .font-kids {
          font-family: 'Fredoka', sans-serif;
        }
        .font-impact {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.05em;
        }
        .nav-gradient {
          background: linear-gradient(135deg, #E53935 0%, #C62828 100%);
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-hero {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleOpenRoarModal = () => {
    if (activePage !== 'HOME') {
      setActivePage('HOME');
      setTimeout(() => {
        const el = document.getElementById('fanzone-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
    setIsRoarModalOpen(true);
  };

  const handleRoarSubmit = (roar: { author: string; player: string; message: string }) => {
    const newPending: PendingRoar = {
      id: Math.random().toString(36).substring(2, 9),
      author: roar.author,
      player: roar.player,
      message: roar.message,
      timestamp: Date.now(),
    };
    setPendingRoars((prev) => [newPending, ...prev]);
  };

  const handleApproveRoar = (id: string) => {
    const item = pendingRoars.find((r) => r.id === id);
    if (!item) return;

    const brandColors = ['#E53935', '#FFD54F', '#1a1a1a', '#C62828'];
    const newPin: FanMessage = {
      id: item.id,
      playerName: item.player,
      fanName: item.author,
      content: item.message,
      timestamp: item.timestamp,
      color: brandColors[Math.floor(Math.random() * brandColors.length)],
      x: Math.floor(Math.random() * 70) + 15,
      y: Math.floor(Math.random() * 65) + 15,
    };

    setApprovedRoars((prev) => [newPin, ...prev]);
    setPendingRoars((prev) => prev.filter((r) => r.id !== id));
  };

  const handleRejectRoar = (id: string) => {
    setPendingRoars((prev) => prev.filter((r) => r.id !== id));
  };

  const renderPage = () => {
    const pages: Record<PageType, React.ReactNode> = {
      HOME: (
        <Home
          activePage={activePage}
          onNavigate={setActivePage}
          onOpenRoarModal={handleOpenRoarModal}
          approvedRoars={approvedRoars}
          pendingRoars={pendingRoars}
          onApproveRoar={handleApproveRoar}
          onRejectRoar={handleRejectRoar}
        />
      ),
      MISSION: <Mission />,
      TRAINING: <Training />,
      MATCHES: <MatchSchedule onNavigate={setActivePage} />,
      NEWS: <LatestNews />,
      ROSTER: <Gallery />,
      CONTACT: <Contact />,
    };
    return pages[activePage] || pages.HOME;
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-[#FFFDE7]">
      {/* Full-Screen Background Image Layer */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/heroFieldLight.webp')" }}
      >
        <div className="absolute inset-0 bg-[#FFFDE7]/30 backdrop-blur-[1px]" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 flex flex-col min-h-screen">
        <Header
          activePage={activePage}
          onNavigate={setActivePage}
          onOpenRoarModal={handleOpenRoarModal}
        />
        <main className="flex-1 pb-20">{renderPage()}</main>
      </div>

      {/* Desktop Right Panel Navigation/Info */}
      <div className="hidden xl:block relative z-10">
        <RightPanel onNavigate={setActivePage} activePage={activePage} />
      </div>

      {/* Shared Roar Modal */}
      <RoarModal
        isOpen={isRoarModalOpen}
        onClose={() => setIsRoarModalOpen(false)}
        onSubmit={handleRoarSubmit}
      />
    </div>
  );
}
// import React, { useState, useEffect } from 'react';
// import { Header } from './components/Header';
// import Home from './components/Home';
// import { Mission } from './components/Mission';
// import { Training } from './components/Training';
// import { MatchSchedule } from './components/MatchSchedule';
// import { LatestNews } from './components/LatestNews';
// import { Gallery } from './components/Gallery';
// import { Contact } from './components/Contact';
// import { RightPanel } from './components/RightPanel';
// import { RoarModal } from './components/RoarModal';
// import { PageType } from './types';

// export default function App() {
//   const [activePage, setActivePage] = useState<PageType>('HOME');
//   const [isRoarModalOpen, setIsRoarModalOpen] = useState(false);

//   useEffect(() => {
//     const id = 'knappy-fonts';
//     if (!document.getElementById(id)) {
//       const link = document.createElement('link');
//       link.id = id;
//       link.rel = 'stylesheet';
//       link.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Inter:wght@400;500;700;900&family=Bebas+Neue&display=swap';
//       document.head.appendChild(link);
//     }

//     const styleId = 'knappy-styles';
//     if (!document.getElementById(styleId)) {
//       const style = document.createElement('style');
//       style.id = styleId;
//       style.textContent = `
//         :root {
//           --brand-red: #E53935;
//           --brand-red-soft: #FFEBEE;
//           --brand-gold: #FFD54F;
//           --brand-sky: #E3F2FD;
//           --brand-grass: #E8F5E9;
//           --brand-cream: #FFFDE7;
//         }
//         body {
//           background-color: var(--brand-cream);
//           font-family: 'Inter', -apple-system, sans-serif;
//           margin: 0;
//           overflow-x: hidden;
//         }
//         h1, h2, h3, .font-kids {
//           font-family: 'Fredoka', sans-serif;
//         }
//         .font-impact {
//           font-family: 'Bebas Neue', sans-serif;
//           letter-spacing: 0.05em;
//         }
//         .nav-gradient {
//           background: linear-gradient(135deg, #E53935 0%, #C62828 100%);
//         }
//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-hero {
//           animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//         }
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `;
//       document.head.appendChild(style);
//     }
//   }, []);

//   const handleOpenRoarModal = () => {
//     if (activePage !== 'HOME') {
//       setActivePage('HOME');
//       setTimeout(() => {
//         const el = document.getElementById('fanzone-section');
//         if (el) {
//           el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         }
//       }, 150);
//     }
//     setIsRoarModalOpen(true);
//   };

//   const handleRoarSubmit = (roar: { author: string; player: string; message: string }) => {
//     console.log('Submitted roar for coach approval:', roar);
//   };

//   const renderPage = () => {
//     const pages: Record<PageType, React.ReactNode> = {
//       HOME: <Home onNavigate={setActivePage} onOpenRoarModal={handleOpenRoarModal} />,
//       MISSION: <Mission />,
//       TRAINING: <Training />,
//       MATCHES: <MatchSchedule onNavigate={setActivePage} />,
//       NEWS: <LatestNews />,
//       ROSTER: <Gallery />,
//       CONTACT: <Contact />,
//     };
//     return pages[activePage] || pages.HOME;
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col lg:flex-row bg-[#FFFDE7]">
//       {/* Full-Screen Background Image Layer */}
//       <div 
//         className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
//         style={{ backgroundImage: "url('/heroFieldLight.webp')" }}
//       >
//         {/* Soft tint overlay so text and cards remain clear and readable */}
//         <div className="absolute inset-0 bg-[#FFFDE7]/30 backdrop-blur-[1px]" />
//       </div>
      
//       {/* Main Content Area */}
//       <div className="flex-1 relative z-10 flex flex-col min-h-screen">
//         <Header 
//           activePage={activePage} 
//           onNavigate={setActivePage} 
//           onOpenRoarModal={handleOpenRoarModal}
//         />
//         <main className="flex-1 pb-20">
//           {renderPage()}
//         </main>
//       </div>

//       {/* Desktop Right Panel Navigation/Info */}
//       <div className="hidden xl:block relative z-10">
//         <RightPanel onNavigate={setActivePage} activePage={activePage} />
//       </div>

//       {/* Shared Roar Modal */}
//       <RoarModal
//         isOpen={isRoarModalOpen}
//         onClose={() => setIsRoarModalOpen(false)}
//         onSubmit={handleRoarSubmit}
//       />
//     </div>
//   );
// }
