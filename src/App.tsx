/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BACKGROUNDS_LIST, BackgroundItem, GENERATED_ASSETS } from './data/backgroundsData';
import { Header } from './components/Header';
import { BackgroundCard } from './components/BackgroundCard';
import { DeviceSimulator } from './components/DeviceSimulator';
import { NineSliceEditor } from './components/NineSliceEditor';
import { KitInspector } from './components/KitInspector';
import { ArmoryAndGearStudio } from './components/ArmoryAndGearStudio';
import { WorldMapExperience } from './components/WorldMapExperience';
import { FlutterCodeModal } from './components/FlutterCodeModal';
import { ReferenceViewerModal } from './components/ReferenceViewerModal';
import { exportFullFlutterPackageZip, ExportProgress } from './utils/zipExporter';
import {
  Download,
  Smartphone,
  Tablet,
  Layers,
  Sparkles,
  Compass,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  Box,
  Shirt,
  Wrench,
  PackageCheck,
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'world_map' | 'gallery' | 'armory' | 'simulator' | 'nineslice' | 'kit'>('world_map');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBackground, setSelectedBackground] = useState<BackgroundItem>(BACKGROUNDS_LIST[0]);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState(false);
  const [codeModalItem, setCodeModalItem] = useState<BackgroundItem | undefined>(undefined);

  // Bulk ZIP Export state
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<ExportProgress | null>(null);

  const handleDownloadAll = async () => {
    if (isExporting) return;
    try {
      setIsExporting(true);
      await exportFullFlutterPackageZip((progress) => {
        setExportProgress(progress);
      });
    } catch (e) {
      console.error('Export failed:', e);
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportProgress(null), 3000);
    }
  };

  const handleSelectForSimulator = (item: BackgroundItem) => {
    setSelectedBackground(item);
    setActiveView('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCodeForScreen = (item: BackgroundItem) => {
    setCodeModalItem(item);
    setIsCodeModalOpen(true);
  };

  const handleOpenNineSlice = (item: BackgroundItem) => {
    setSelectedBackground(item);
    setActiveView('nineslice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter items
  const filteredItems = BACKGROUNDS_LIST.filter((item) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'phone') return item.category === 'phone';
    if (selectedCategory === 'tablet') return item.category === 'tablet';
    if (selectedCategory === 'panel') return item.category === 'panel' || item.category === 'button';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onDownloadAllZip={handleDownloadAll}
        onOpenCodeModal={() => {
          setCodeModalItem(undefined);
          setIsCodeModalOpen(true);
        }}
        onOpenReferenceModal={() => setIsReferenceModalOpen(true)}
        exportProgress={exportProgress}
        isExporting={isExporting}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Dedicated Interactive World Map View */}
        {activeView === 'world_map' && <WorldMapExperience />}

        {/* Gallery View */}
        {activeView === 'gallery' && (
          <div className="flex flex-col gap-8">
            {/* Hero / Specs Banner */}
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Steampunk Skyworld Kit Assets Ready
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Flutter Background Package for{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-400">
                    SkySprout Adventures
                  </span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                  Configured to your latest Steampunk Skyworld Kit specifications with exact target dimensions:{' '}
                  <strong className="text-amber-300">1440 × 2960</strong> for mobile devices,{' '}
                  <strong className="text-sky-300">2732 × 2048</strong> for tablets, and{' '}
                  <strong className="text-emerald-300">9-slice stretchable</strong> panels & buttons.
                </p>

                {/* Quick specs pill row */}
                <div className="flex flex-wrap gap-2.5 mt-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-300">
                    <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                    13 Phone Screens
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-300">
                    <Tablet className="w-3.5 h-3.5 text-emerald-400" />
                    3 Tablet Screens
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-300">
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    3 9-Slice Panels & Buttons
                  </span>
                  <button
                    onClick={() => setActiveView('armory')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                  >
                    <Shirt className="w-3.5 h-3.5" />
                    9 Armors & 8 Weapons
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
                <button
                  onClick={handleDownloadAll}
                  disabled={isExporting}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-105 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  Download All 19 Assets (.ZIP)
                </button>
                <button
                  onClick={() => setActiveView('armory')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 text-xs font-bold transition-colors"
                >
                  <Shirt className="w-4 h-4" />
                  Open Armory & Buttons Studio
                </button>
              </div>

              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Grid of Background Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  Showing {filteredItems.length} of {BACKGROUNDS_LIST.length} Background Assets
                </h3>
                <span className="text-xs text-slate-400">
                  Click any card for full device simulation
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <BackgroundCard
                    key={item.id}
                    item={item}
                    onSelectForSimulator={handleSelectForSimulator}
                    onOpenCode={handleOpenCodeForScreen}
                    onOpenNineSlice={handleOpenNineSlice}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Armory, Weapons & Button Studio View */}
        {activeView === 'armory' && <ArmoryAndGearStudio />}

        {/* Device Simulator View */}
        {activeView === 'simulator' && (
          <DeviceSimulator
            selectedItem={selectedBackground}
            onSelectItem={setSelectedBackground}
            onOpenNineSlice={handleOpenNineSlice}
          />
        )}

        {/* 9-Slice Inspector View */}
        {activeView === 'nineslice' && (
          <NineSliceEditor initialItem={selectedBackground} />
        )}

        {/* Steampunk Skyworld Kit Tiles & Gear View */}
        {activeView === 'kit' && <KitInspector />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-4 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">🌱</span>
            <span className="font-bold text-slate-400">SkySprout Adventures Background Package</span>
          </div>
          <div>All assets generated for Flutter mobile & tablet production.</div>
        </div>
      </footer>

      {/* Flutter Code Modal */}
      <FlutterCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        selectedItem={codeModalItem}
      />

      {/* Reference Image Viewer Modal */}
      <ReferenceViewerModal
        isOpen={isReferenceModalOpen}
        onClose={() => setIsReferenceModalOpen(false)}
      />
    </div>
  );
}
