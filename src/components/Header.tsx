import React from 'react';
import {
  Download,
  Smartphone,
  Tablet,
  Layers,
  FileCode,
  Image as ImageIcon,
  Sparkles,
  Compass,
  CheckCircle,
  PackageCheck,
  Shield,
  Shirt,
} from 'lucide-react';
import { ExportProgress } from '../utils/zipExporter';

interface HeaderProps {
  activeView: 'world_map' | 'gallery' | 'armory' | 'simulator' | 'nineslice' | 'kit';
  setActiveView: (view: 'world_map' | 'gallery' | 'armory' | 'simulator' | 'nineslice' | 'kit') => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onDownloadAllZip: () => void;
  onOpenCodeModal: () => void;
  onOpenReferenceModal: () => void;
  exportProgress: ExportProgress | null;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  selectedCategory,
  setSelectedCategory,
  onDownloadAllZip,
  onOpenCodeModal,
  onOpenReferenceModal,
  exportProgress,
  isExporting,
}) => {
  return (
    <header className="w-full border-b border-amber-950/40 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col gap-3">
        {/* Top Line: Brand, Badges & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl">🌱</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-slate-100 text-lg sm:text-xl tracking-tight">
                  SkySprout
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Steampunk Skyworld Kit
                </span>
              </div>
              <p className="text-xs text-slate-400">
                19 Backgrounds, All 3D Buttons, Armors, Weapons & Companions
              </p>
            </div>
          </div>

          {/* Quick Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenReferenceModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors"
              title="View latest SkySprout Adventures Steampunk Skyworld Kit reference sheet"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              Kit Reference Sheet
            </button>

            <button
              onClick={onOpenCodeModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors"
              title="View Dart & pubspec.yaml code"
            >
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              Flutter Code
            </button>

            <button
              onClick={onDownloadAllZip}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105 disabled:opacity-50"
            >
              {isExporting ? (
                <span className="animate-spin text-sm">⏳</span>
              ) : (
                <Download className="w-4 h-4 text-slate-950" />
              )}
              <span>
                {isExporting
                  ? `Packaging (${exportProgress?.current || 0}/19)...`
                  : 'Download Full Package (.ZIP)'}
              </span>
            </button>
          </div>
        </div>

        {/* Progress Bar (if exporting zip) */}
        {isExporting && exportProgress && (
          <div className="w-full bg-slate-900 rounded-xl p-2.5 border border-amber-500/30 flex flex-col gap-1.5">
            <div className="flex justify-between text-xs text-amber-300 font-semibold">
              <span>{exportProgress.currentName}</span>
              <span>
                {exportProgress.current} / {exportProgress.total}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-200"
                style={{
                  width: `${(exportProgress.current / exportProgress.total) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Navigation & Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-800/60">
          {/* Main View Mode Selector */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 overflow-x-auto">
            <button
              onClick={() => setActiveView('world_map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeView === 'world_map'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300'
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              🗺️ World Map
            </button>
            <button
              onClick={() => setActiveView('gallery')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeView === 'gallery'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              All 19 Backgrounds
            </button>
            <button
              onClick={() => setActiveView('armory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeView === 'armory'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shirt className="w-3.5 h-3.5" />
              Armors, Bases & Weapons
            </button>
            <button
              onClick={() => setActiveView('simulator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeView === 'simulator'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Device Simulator
            </button>
            <button
              onClick={() => setActiveView('nineslice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeView === 'nineslice'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              9-Slice Inspector
            </button>
            <button
              onClick={() => setActiveView('kit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeView === 'kit'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              Kit Verification
            </button>
          </div>

          {/* Subcategory Pills (when in Gallery view) */}
          {activeView === 'gallery' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'All Backgrounds (19)' },
                { id: 'phone', label: 'Phone 1440×2960 (13)' },
                { id: 'tablet', label: 'Tablet 2732×2048 (3)' },
                { id: 'panel', label: '9-Slice Panels & Buttons (3)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
