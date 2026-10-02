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
import { supabase } from './lib/supabaseClient';

export interface PendingRoar {
  id: string;
  author: string;
  player: string;
  message: string;
  timestamp: number;
}

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('HOME');
  const [isRoarModalOpen, setIsRoarModalOpen] = useState(false);

  const [approvedRoars, setApprovedRoars] = useState<FanMessage[]>([]);
  const [pendingRoars, setPendingRoars] = useState<PendingRoar[]>([]);

  // Fetch roars from Supabase on mount
  useEffect(() => {
    const fetchRoars = async () => {
      const { data, error } = await supabase
        .from('roars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching roars:', error.message);
        return;
      }

      if (data) {
        const approved: FanMessage[] = data
          .filter((r) => r.status === 'approved')
          .map((r) => ({
            id: r.id,
            playerName: r.player_name,
            fanName: r.fan_name,
            content: r.content,
            timestamp: new Date(r.created_at).getTime(),
            color: r.color || '#E53935',
            x: r.x ?? 50,
            y: r.y ?? 50,
          }));

        const pending: PendingRoar[] = data
          .filter((r) => r.status === 'pending')
          .map((r) => ({
            id: r.id,
            author: r.fan_name,
            player: r.player_name,
            message: r.content,
            timestamp: new Date(r.created_at).getTime(),
          }));

        setApprovedRoars(approved);
        setPendingRoars(pending);
      }
    };

    fetchRoars();
  }, []);

  useEffect(() => {
    const id = 'KNAPP-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Inter:wght@400;500;700;900&family=Bebas+Neue&display=swap';
      document.head.appendChild(link);
    }

    const styleId = 'KNAPP-styles';
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

  const handleRoarSubmit = async (roar: { author: string; player: string; message: string }) => {
    const { data, error } = await supabase
      .from('roars')
      .insert([
        {
          player_name: roar.player,
          fan_name: roar.author,
          content: roar.message,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error submitting roar:', error.message);
      return;
    }

    if (data) {
      setPendingRoars((prev) => [
        {
          id: data.id,
          author: data.fan_name,
          player: data.player_name,
          message: data.content,
          timestamp: new Date(data.created_at).getTime(),
        },
        ...prev,
      ]);
    }
  };

  const handleApproveRoar = async (id: string) => {
    const item = pendingRoars.find((r) => r.id === id);
    if (!item) return;

    const brandColors = ['#E53935', '#FFD54F', '#1a1a1a', '#C62828'];
    const assignedColor = brandColors[Math.floor(Math.random() * brandColors.length)];
    const assignedX = Math.floor(Math.random() * 70) + 15;
    const assignedY = Math.floor(Math.random() * 65) + 15;

    const { error } = await supabase
      .from('roars')
      .update({
        status: 'approved',
        color: assignedColor,
        x: assignedX,
        y: assignedY,
      })
      .eq('id', id);

    if (error) {
      console.error('Error approving roar:', error.message);
      return;
    }

    setApprovedRoars((prev) => [
      {
        id: item.id,
        playerName: item.player,
        fanName: item.author,
        content: item.message,
        timestamp: item.timestamp,
        color: assignedColor,
        x: assignedX,
        y: assignedY,
      },
      ...prev,
    ]);
    setPendingRoars((prev) => prev.filter((r) => r.id !== id));
  };

  const handleRejectRoar = async (id: string) => {
    const { error } = await supabase.from('roars').delete().eq('id', id);
    if (error) {
      console.error('Error rejecting roar:', error.message);
      return;
    }
    setPendingRoars((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDeleteRoar = async (id: string) => {
    const { error } = await supabase.from('roars').delete().eq('id', id);
    if (error) {
      console.error('Error deleting roar:', error.message);
      return;
    }
    setApprovedRoars((prev) => prev.filter((r) => r.id !== id));
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
          onDeleteRoar={handleDeleteRoar}
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
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/heroFieldLight.webp')" }}
      >
        <div className="absolute inset-0 bg-[#FFFDE7]/30 backdrop-blur-[1px]" />
      </div>

      <div className="flex-1 relative z-10 flex flex-col min-h-screen">
        <Header
          activePage={activePage}
          onNavigate={setActivePage}
          onOpenRoarModal={handleOpenRoarModal}
        />
        <main className="flex-1 pb-20">{renderPage()}</main>
      </div>

      <div className="hidden xl:block relative z-10">
        <RightPanel onNavigate={setActivePage} activePage={activePage} />
      </div>

      <RoarModal
        isOpen={isRoarModalOpen}
        onClose={() => setIsRoarModalOpen(false)}
        onSubmit={handleRoarSubmit}
      />
    </div>
  );
}