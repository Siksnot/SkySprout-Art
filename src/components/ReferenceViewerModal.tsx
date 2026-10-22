import React from 'react';
import { X, ExternalLink, Image as ImageIcon, Sparkles } from 'lucide-react';
import { GENERATED_ASSETS } from '../data/backgroundsData';

interface ReferenceViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferenceViewerModal: React.FC<ReferenceViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                Original App UI Reference Sheet
                <span className="px-2 py-0.5 rounded text-[11px] bg-amber-950 text-amber-300 border border-amber-600/40">
                  SkySprout Adventures
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Your provided design system with Splash, World Map, Quests, Characters, Outfits, Pets & UI Elements
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Content Container */}
        <div className="flex-1 p-6 overflow-auto bg-slate-950 flex flex-col items-center">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl max-w-4xl">
            <img
              src={GENERATED_ASSETS.originalSheet}
              alt="SkySprout Adventures Reference Sheet"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Breakdown notes */}
          <div className="w-full max-w-4xl mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h4 className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Screen 1: Splash Screen
              </h4>
              <p className="text-slate-400">
                Overlook of sky kingdom with Scout & robot puppy companion, wooden platform and golden button action.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h4 className="font-bold text-sky-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Screen 2: World Map (Tablet)
              </h4>
              <p className="text-slate-400">
                Floating islands archipelago: Cloud Gate, Windmill Heights, Sky Gardens, Storm Reef, and Sunspire.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h4 className="font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Screen 3: Daily Quests
              </h4>
              <p className="text-slate-400">
                Ancient stone platform, torches, habit quest cards (Make bed, Brush teeth, Homework, Tidy room), golden chest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
