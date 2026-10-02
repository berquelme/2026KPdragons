import React, { useState, useRef, useEffect } from 'react';
import { players } from '../data/galleryNewData';
import { inspectRoar } from '../utils/moderationWords';
import { teamData } from '../data/teamData';

interface RoarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roar: { author: string; player: string; message: string }) => void;
}

export const RoarModal: React.FC<RoarModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [author, setAuthor] = useState('');
  const [player, setPlayer] = useState('');
  const [message, setMessage] = useState('');
  const [moderationError, setModerationError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close custom dropdown when clicking/tapping outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  if (!isOpen) return null;

  // Build selectable options including Whole Team, Coaching Staff, and numbered players
  const rosterOptions = [
    { label: 'Whole Team', value: 'Whole Team' },
    { label: 'Coaching Staff', value: 'Coaching Staff' },
    ...players.map((p) => ({
      label: `#${p.num} ${p.name}`,
      value: p.name,
    })),
  ];

  const filteredOptions = rosterOptions.filter((opt) =>
    opt.label.toLowerCase().includes(player.toLowerCase()) ||
    opt.value.toLowerCase().includes(player.toLowerCase())
  );

  const handleSelectOption = (selectedValue: string) => {
    setPlayer(selectedValue);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModerationError(null);

    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    // Run client-side moderation check
    const check = inspectRoar(trimmedMessage);
    if (!check.isPermitted) {
      setModerationError(check.reason || 'Please ensure all cheers are positive and safe.');
      return;
    }

    // Strip out any "#4 " or "4 - " prefix so only the name is saved
    let cleanPlayer = player.trim().replace(/^#?\d+[\s.-]*/, '');

    // If someone typed only the jersey number (e.g. "#4" or "4"), look up the player
    if (!cleanPlayer) {
      const matchNum = parseInt(player.replace(/\D/g, ''), 10);
      const found = players.find((p) => p.num === matchNum);
      if (found) cleanPlayer = found.name;
    }

    // Hands the cheer directly to the in-app moderation queue
    onSubmit({
      author: author.trim() || `${teamData.shortName} Supporter`,
      player: cleanPlayer || 'Whole Team',
      message: trimmedMessage,
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setModerationError(null);
    setAuthor('');
    setPlayer('');
    setMessage('');
    setIsDropdownOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] p-6 md:p-8 max-w-lg w-full max-h-[88dvh] overflow-y-auto shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {!submitted ? (
          <>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📣</span>
                <div>
                  <h3 className="font-kids text-2xl text-slate-900 leading-none">{teamData.cheerWallTitle}</h3>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{teamData.cheerWallSubtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Custom Mobile-Friendly Player Selector */}
              <div className="relative" ref={dropdownRef}>
                <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">
                  Cheering For
                </label>
                <div className="relative">
                  <input
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={40}
                    placeholder="Select a player or type a name..."
                    value={player}
                    onFocus={() => setIsDropdownOpen(true)}
                    onChange={(e) => {
                      setPlayer(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-base md:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#E53935] pr-10"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                  >
                    <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {isDropdownOpen && filteredOptions.length > 0 && (
                  <ul className="absolute left-0 right-0 top-full mt-1.5 max-h-52 overflow-y-auto bg-slate-900 text-white rounded-2xl shadow-2xl z-50 py-1.5 divide-y divide-slate-800">
                    {filteredOptions.map((opt) => (
                      <li
                        key={opt.label}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectOption(opt.value);
                        }}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          handleSelectOption(opt.value);
                        }}
                        className="px-4 py-3 text-sm font-semibold hover:bg-slate-800 active:bg-[#E53935] cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <span>{opt.label}</span>
                        {player.toLowerCase() === opt.value.toLowerCase() && (
                          <span className="text-[#FFD54F] text-xs">✓</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  maxLength={40}
                  placeholder="e.g. Grandma Rose, Coach, Dad"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-base md:text-sm focus:outline-none focus:border-[#E53935]"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-black uppercase text-slate-500">
                    Your Message
                  </label>
                  <span className={`text-[10px] font-semibold ${message.length >= 110 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                    {message.length} / 120
                  </span>
                </div>
                <textarea
                  rows={3}
                  maxLength={120}
                  placeholder="Write a shoutout or encouragement for match day!"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (moderationError) setModerationError(null);
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl border text-base md:text-sm resize-none focus:outline-none ${
                    moderationError ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#E53935]'
                  }`}
                  required
                />
                {moderationError && (
                  <p className="text-red-600 text-xs font-semibold mt-1.5 flex items-center gap-1">
                    <span>⚠️</span> {moderationError}
                  </p>
                )}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-950">
                <span className="material-symbols-outlined text-[18px] text-amber-600 mt-0.5 shrink-0">info</span>
                <div>
                  <p className="font-bold">How it works:</p>
                  <p className="opacity-85 mt-0.5 leading-relaxed">
                    Once submitted, our team reviews each cheer to keep the team space positive and safe. Approved cheers appear as pins right on the pitch in the FanZone!
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-black uppercase bg-[#E53935] hover:bg-red-700 text-white rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  Send To Admin 🚀
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
              ⏳
            </div>
            <div>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                Pending Coach Approval
              </span>
              <h3 className="font-kids text-3xl text-slate-900 mt-3">CHEER SUBMITTED!</h3>
              <div className="text-xs text-slate-600 max-w-sm mx-auto space-y-2 text-left bg-slate-50 border border-slate-200 p-4 rounded-2xl mt-4">
                <p>
                  <span className="font-bold text-slate-800">1. Moderation:</span> Your message is in the review queue.
                </p>
                <p>
                  <span className="font-bold text-slate-800">2. Where to find it:</span> Once approved, look for your pin on the interactive pitch inside the <span className="font-bold text-[#E53935]">{teamData.shortName} FanZone</span> on the Home page.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 bg-[#E53935] hover:bg-red-700 text-white font-black text-xs uppercase rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Back to the Pitch
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoarModal;