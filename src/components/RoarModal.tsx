import React, { useState } from 'react';
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

  if (!isOpen) return null;

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

    // Hands the cheer directly to the in-app moderation queue
    onSubmit({
      author: author.trim() || `${teamData.shortName} Supporter`,
      player: player.trim() || 'Whole Team',
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
    onClose();
  };

  const datalistId = `${teamData.shortName.toLowerCase().replace(/\s+/g, '-')}-roster-list`;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
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
              <div>
                <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">
                  Cheering For
                </label>
                <input
                  list={datalistId}
                  type="text"
                  placeholder="Select a player or type a name..."
                  value={player}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setPlayer(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#E53935]"
                />
                <datalist id={datalistId}>
                  <option value="Whole Team" />
                  <option value="Coaching Staff" />
                  {players.map((p) => (
                    <option key={p.num} value={`#${p.num} ${p.name}`} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grandma Rose, Coach, Dad"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#E53935]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">
                  Your Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Write a shoutout or encouragement for match day!"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (moderationError) setModerationError(null);
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm resize-none focus:outline-none ${
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