import React, { useState } from 'react';
import { FanMessage } from '../../types';

// Step 1: Component Interface Contract
// - messages: All active, sorted fan messages passed down from FanZone
// - onSelectMessage: Triggered when someone taps a feed card to open RoarModalDetail
// - onOpenRoarModal: Triggered if an empty player filter prompts the user to send a cheer
// - cleanPlayerDisplay: Formatter function to strip numbers from player names
interface RoarFeedArchiveProps {
  messages: FanMessage[];
  onSelectMessage: (msg: FanMessage) => void;
  onOpenRoarModal?: () => void;
  cleanPlayerDisplay: (rawName: string) => string;
}

export const RoarFeedArchive: React.FC<RoarFeedArchiveProps> = ({
  messages,
  onSelectMessage,
  onOpenRoarModal,
  cleanPlayerDisplay,
}) => {
  // Step 2: Encapsulated Filter & Pagination State
  // - selectedPlayer: null means show all players
  // - visibleCount: controls pagination chunks (starts at 6)
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Step 3: Extract Unique Player Roster
  // Gathers every unique player who has received a roar
  const uniquePlayers = Array.from(
    new Set(messages.map((m) => cleanPlayerDisplay(m.playerName)))
  ).filter(Boolean);

  // Step 4: Filter Messages by Active Player Pill
  const filteredMessages = selectedPlayer
    ? messages.filter((m) => cleanPlayerDisplay(m.playerName) === selectedPlayer)
    : messages;

  // Step 5: Slice Displayed Cards according to pagination count
  const displayedCards = filteredMessages.slice(0, visibleCount);

  // Reset page count back to 6 whenever user switches player filter
  const handleSelectFilter = (player: string | null) => {
    setSelectedPlayer(player);
    setVisibleCount(6);
  };

  return (
    <div className="w-full max-w-4xl mt-8">
      {/* Section Divider & Label */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
          Cheer Archive by Player
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Step 6: Horizontally Scrollable Filter Pills
          Mobile-optimized with overflow-x-auto so it never wraps awkwardly */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        {/* 'All' Filter Pill */}
        <button
          type="button"
          onClick={() => handleSelectFilter(null)}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
            selectedPlayer === null
              ? 'bg-[#E53935] text-white shadow-lg shadow-red-600/30'
              : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          All ({messages.length})
        </button>

        {/* Dynamic Individual Player Pills */}
        {uniquePlayers.map((player) => (
          <button
            key={player}
            type="button"
            onClick={() => handleSelectFilter(player)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedPlayer === player
                ? 'bg-[#E53935] text-white shadow-lg shadow-red-600/30'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {player}
          </button>
        ))}
      </div>

      {/* Step 7: Feed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {displayedCards.map((msg) => (
          <div 
            key={`feed-${msg.id}`} 
            onClick={() => onSelectMessage(msg)}
            className="bg-white/[0.03] p-5 rounded-3xl border border-white/5 hover:border-[#E53935]/30 hover:bg-white/[0.05] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs shadow-sm" 
                style={{ backgroundColor: msg.color || '#E53935' }}
              >
                <span className="material-symbols-outlined text-[16px]">person</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-white uppercase tracking-tighter">
                  To: {cleanPlayerDisplay(msg.playerName)}
                </p>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                  From: {msg.fanName}
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-xs italic leading-relaxed line-clamp-2">
              "{msg.content}"
            </p>
          </div>
        ))}
      </div>

      {/* Step 8: Empty State when player has no cheers */}
      {displayedCards.length === 0 && (
        <div className="text-center py-10 bg-white/[0.02] border border-white/5 rounded-3xl mt-4">
          <p className="text-xs text-slate-400 italic mb-3">
            No cheers posted for {selectedPlayer} yet!
          </p>
          <button
            type="button"
            onClick={onOpenRoarModal}
            className="px-4 py-2 bg-[#E53935] hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
          >
            Send First Cheer
          </button>
        </div>
      )}

      {/* Step 9: Load More Action Button */}
      {filteredMessages.length > visibleCount && (
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-8 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest border border-white/10 transition-all cursor-pointer hover:border-white/20 active:scale-95 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
            Load More ({filteredMessages.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
};