import React, { useState } from 'react';
import { BackgroundItem, BACKGROUNDS_LIST } from '../data/backgroundsData';
import { renderBackgroundToCanvas, downloadCanvasAsPng } from '../utils/canvasRenderer';
import {
  Smartphone,
  Tablet,
  Download,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Compass,
  CheckCircle2,
  Coins,
  Gem,
  Award,
  BookOpen,
  MapPin,
  Lock,
  Star,
  Settings,
  Mail,
  Users,
  Backpack,
  Compass as CompassIcon,
} from 'lucide-react';

interface DeviceSimulatorProps {
  selectedItem: BackgroundItem;
  onSelectItem: (item: BackgroundItem) => void;
  onOpenNineSlice?: (item: BackgroundItem) => void;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({
  selectedItem,
  onSelectItem,
  onOpenNineSlice,
}) => {
  const [showUiOverlay, setShowUiOverlay] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [buttonVariant, setButtonVariant] = useState<'play' | 'upgrade' | 'inventory'>('play');

  const isTablet = selectedItem.category === 'tablet';
  const isPanelOrButton = selectedItem.category === 'panel' || selectedItem.category === 'button';

  const currentIndex = BACKGROUNDS_LIST.findIndex((b) => b.id === selectedItem.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % BACKGROUNDS_LIST.length;
    onSelectItem(BACKGROUNDS_LIST[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + BACKGROUNDS_LIST.length) % BACKGROUNDS_LIST.length;
    onSelectItem(BACKGROUNDS_LIST[prevIndex]);
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const canvas = await renderBackgroundToCanvas(selectedItem, 1.0);
      downloadCanvasAsPng(canvas, selectedItem.filename);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto items-start">
      {/* Control Panel / Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4 shrink-0">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
              <Compass className="w-4 h-4 text-amber-400" />
              Device Simulator
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-600/40">
              #{currentIndex + 1} of 19
            </span>
          </div>

          {/* Quick Item Picker */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">
              Select Background
            </label>
            <select
              value={selectedItem.id}
              onChange={(e) => {
                const found = BACKGROUNDS_LIST.find((b) => b.id === e.target.value);
                if (found) onSelectItem(found);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <optgroup label="Phone Screens (1440 × 2960)">
                {BACKGROUNDS_LIST.filter((b) => b.category === 'phone').map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Tablet Screens (2732 × 2048)">
                {BACKGROUNDS_LIST.filter((b) => b.category === 'tablet').map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="UI Panels & Buttons (9-Slice)">
                {BACKGROUNDS_LIST.filter((b) => b.category === 'panel' || b.category === 'button').map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Previous / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Toggle UI Overlay */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-200">Skyworld UI Overlay</div>
              <div className="text-[11px] text-slate-400">
                {showUiOverlay ? 'Latest kit UI elements shown' : 'Clean background artwork'}
              </div>
            </div>
            <button
              onClick={() => setShowUiOverlay(!showUiOverlay)}
              className={`p-2 rounded-xl transition-all ${
                showUiOverlay
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-400'
              }`}
              title="Toggle Game UI Mockup"
            >
              {showUiOverlay ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>

          {/* Dimension Specs */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Target Resolution:</span>
              <span className="font-mono font-semibold text-amber-300">
                {selectedItem.targetWidth} × {selectedItem.targetHeight} px
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Aspect Ratio:</span>
              <span className="font-mono text-slate-200">
                {selectedItem.category === 'phone'
                  ? '9:18.5 (Phone Fullscreen)'
                  : selectedItem.category === 'tablet'
                  ? '4:3 (iPad / Tablet Retina)'
                  : selectedItem.category === 'button'
                  ? '2:1 (9-Slice Button)'
                  : '1.4:1 (9-Slice Panel)'}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Flutter BoxFit:</span>
              <span className="font-mono text-emerald-400">
                {isPanelOrButton ? 'BoxFit.fill + centerSlice' : 'BoxFit.cover'}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Target Asset File:</span>
              <span className="font-mono text-slate-300">{selectedItem.filename}</span>
            </div>
          </div>

          {/* Download Action */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-950/40 hover:shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            {downloading ? <span className="animate-spin">⏳</span> : <Download className="w-4 h-4" />}
            Download Native PNG ({selectedItem.targetWidth} × {selectedItem.targetHeight})
          </button>

          {isPanelOrButton && onOpenNineSlice && (
            <button
              onClick={() => onOpenNineSlice(selectedItem)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-200 font-semibold text-xs transition-colors"
            >
              <Layers className="w-4 h-4 text-purple-400" />
              Adjust 9-Slice Slicing Margins
            </button>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs">
          <h4 className="font-bold text-slate-300 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Kit Specifications
          </h4>
          <p className="text-slate-400 leading-relaxed mb-3">{selectedItem.description}</p>
          <div className="flex flex-col gap-1.5">
            {selectedItem.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simulator Device Viewport Container */}
      <div className="flex-1 w-full flex flex-col items-center justify-center bg-slate-950/80 border border-slate-800/80 rounded-3xl p-4 sm:p-8 min-h-[640px] shadow-2xl relative overflow-hidden">
        {/* Top status bar indicator */}
        <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-200">{selectedItem.name}</span>
            <span className="text-slate-500">|</span>
            <span className="font-mono">{selectedItem.targetWidth} × {selectedItem.targetHeight}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUiOverlay(!showUiOverlay)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {showUiOverlay ? <Eye className="w-3.5 h-3.5 text-amber-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
              {showUiOverlay ? 'Hide UI Mock' : 'Show UI Mock'}
            </button>
          </div>
        </div>

        {/* The Device Frame */}
        {isTablet ? (
          /* TABLET FRAME (2732 x 2048 Aspect: 4:3) */
          <div className="relative w-full max-w-[820px] aspect-[4/3] bg-slate-900 rounded-[28px] p-3 sm:p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-[6px] border-slate-800 flex flex-col">
            {/* Tablet Camera dot */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-950 border border-slate-700/50" />

            {/* Screen Viewport */}
            <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-slate-950 select-none">
              {/* Background Art */}
              <img
                src={selectedItem.baseImage}
                alt={selectedItem.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Tablet Game UI Overlay */}
              {showUiOverlay && (
                <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                  {/* Top Status Bar: Render only for non-world_map screens because world_map already has authentic high-resolution status bar */}
                  {selectedItem.id !== 'world_map' ? (
                    <div className="flex items-center justify-between w-full pointer-events-auto">
                      {/* User Profile */}
                      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 shadow-lg">
                        <div className="w-9 h-9 rounded-full bg-amber-500 border-2 border-amber-200 overflow-hidden flex items-center justify-center font-bold text-slate-950 text-sm">
                          🧑‍✈️
                        </div>
                        <div>
                          <div className="text-xs font-bold text-amber-300">Scout</div>
                          <div className="text-[10px] text-amber-200/80">Level 18 (320 / 800)</div>
                        </div>
                      </div>

                      {/* Currencies, Settings & Mail */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-xs font-bold text-amber-300">
                          <Coins className="w-3.5 h-3.5 text-amber-400" />
                          2,840
                          <span className="w-4 h-4 rounded-full bg-green-500 text-slate-950 flex items-center justify-center text-[10px]">
                            +
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-purple-500/40 text-xs font-bold text-purple-300">
                          <Gem className="w-3.5 h-3.5 text-purple-400" />
                          360
                          <span className="w-4 h-4 rounded-full bg-green-500 text-slate-950 flex items-center justify-center text-[10px]">
                            +
                          </span>
                        </div>
                        <div className="p-1.5 rounded-xl bg-slate-950/85 border border-slate-700 text-slate-300 cursor-pointer">
                          <Settings className="w-4 h-4" />
                        </div>
                        <div className="relative p-1.5 rounded-xl bg-slate-950/85 border border-slate-700 text-slate-300 cursor-pointer">
                          <Mail className="w-4 h-4" />
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                            3
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* World Map Mode: Precise glowing interactive reticles matching image_abc29e16.png */
                    <div className="absolute inset-0 pointer-events-none">
                      {[
                        { name: '1. SPROUT KEEP', stars: '12/15', top: '53.2%', left: '25.3%', color: '#22C55E' },
                        { name: '2. CLOUD FALLS', stars: '8/15', top: '63.0%', left: '48.8%', color: '#38BDF8' },
                        { name: '3. SKY OBSERVATORY', stars: '5/15', top: '35.5%', left: '62.5%', color: '#818CF8' },
                        { name: '4. SUNRIDGE', stars: '0/15', top: '30.4%', left: '87.8%', color: '#F59E0B', locked: true },
                        { name: '5. STORM SPIRE', stars: 'Locked', top: '59.0%', left: '88.5%', color: '#C084FC', locked: true },
                        { name: '6. AETHER DEPTHS', stars: 'Locked', top: '81.1%', left: '82.9%', color: '#A855F7', locked: true },
                      ].map((zone, idx) => (
                        <div
                          key={idx}
                          style={{ top: zone.top, left: zone.left, transform: 'translate(-50%, -50%)' }}
                          className="absolute pointer-events-auto cursor-pointer group"
                        >
                          <div
                            className="w-8 h-8 rounded-full border-2 shadow-lg animate-ping absolute -inset-2 opacity-50"
                            style={{ borderColor: zone.color }}
                          />
                          <div
                            className="w-4 h-4 rounded-full border-2 border-white shadow-md mx-auto"
                            style={{ backgroundColor: zone.color }}
                          />
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-950/95 text-white text-[10px] font-black whitespace-nowrap border border-amber-400 shadow-2xl pointer-events-none">
                            {zone.name} ({zone.stars})
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Left Vertical Dock (Only for non-world-map screens) */}
                  {selectedItem.id !== 'world_map' && (
                    <div className="absolute left-4 top-20 flex flex-col gap-2 pointer-events-auto">
                      {[
                        { icon: '📜', label: 'Quests', badge: 3 },
                        { icon: '🗺️', label: 'Map' },
                        { icon: '🎒', label: 'Backpack' },
                        { icon: '📖', label: 'Collection' },
                        { icon: '👥', label: 'Friends' },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="relative flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-slate-950/85 backdrop-blur-md border border-amber-500/30 text-amber-200 hover:border-amber-400 cursor-pointer shadow-lg"
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="text-[8px] font-bold mt-0.5">{item.label}</span>
                          {item.badge && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tablet Bottom Dock Navigation (Only for non-world_map screens) */}
                  {selectedItem.id !== 'world_map' && (
                    <div className="self-center flex items-center gap-3 px-6 py-2 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-amber-500/40 shadow-2xl pointer-events-auto">
                      {[
                        { icon: '🗺️', label: 'Map', active: true },
                        { icon: '📜', label: 'Quests' },
                        { icon: '🎪', label: 'Shop' },
                        { icon: '⚙️', label: 'Settings' },
                        { icon: '✉️', label: 'Mail', badge: 2 },
                        { icon: '🏆', label: 'Trophy' },
                        { icon: '📅', label: 'Events' },
                      ].map((tab, idx) => (
                        <div
                          key={idx}
                          className={`relative flex flex-col items-center px-3 py-1 rounded-xl cursor-pointer transition-all ${
                            tab.active
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          <span className="text-base">{tab.icon}</span>
                          <span className="text-[10px] font-bold">{tab.label}</span>
                          {tab.badge && (
                            <span className="absolute -top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                              {tab.badge}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : isPanelOrButton ? (
          /* 9-SLICE PANEL / BUTTON PREVIEW */
          <div className="flex flex-col items-center justify-center p-8 bg-slate-900/60 rounded-2xl border border-slate-800 w-full max-w-xl">
            {selectedItem.category === 'button' && (
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setButtonVariant('play')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    buttonVariant === 'play'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  PLAY (Golden)
                </button>
                <button
                  onClick={() => setButtonVariant('upgrade')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    buttonVariant === 'upgrade'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  UPGRADE (Cyan)
                </button>
                <button
                  onClick={() => setButtonVariant('inventory')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    buttonVariant === 'inventory'
                      ? 'bg-amber-800 text-amber-100'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  INVENTORY (Bronze)
                </button>
              </div>
            )}

            <div className="relative p-6 bg-black/40 rounded-2xl border border-dashed border-amber-500/40">
              <img
                src={selectedItem.baseImage}
                alt={selectedItem.name}
                referrerPolicy="no-referrer"
                className={`object-contain max-h-72 rounded-lg ${
                  selectedItem.category === 'button' ? 'h-24' : 'h-64'
                }`}
              />
              {selectedItem.nineSlice && (
                <div className="absolute inset-8 border border-amber-400 pointer-events-none rounded flex items-center justify-center">
                  <span className="px-2 py-0.5 rounded bg-amber-950/90 text-amber-300 text-[10px] font-mono font-bold">
                    centerSlice: {selectedItem.nineSlice.left}, {selectedItem.nineSlice.top},{' '}
                    {selectedItem.targetWidth - selectedItem.nineSlice.right},{' '}
                    {selectedItem.targetHeight - selectedItem.nineSlice.bottom}
                  </span>
                </div>
              )}
            </div>

            {onOpenNineSlice && (
              <button
                onClick={() => onOpenNineSlice(selectedItem)}
                className="mt-4 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                Launch Interactive 9-Slice Slicing Tool
              </button>
            )}
          </div>
        ) : (
          /* PHONE FRAME (1440 x 2960 Aspect: 9:18.5) */
          <div className="relative w-full max-w-[340px] aspect-[9/18.5] bg-slate-900 rounded-[44px] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] border-[5px] border-slate-800 flex flex-col">
            {/* Phone Top Speaker & Camera Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-slate-950 border border-slate-800 z-30 flex items-center justify-center">
              <div className="w-10 h-1 rounded-full bg-slate-800 mr-2" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-700/60" />
            </div>

            {/* Screen Viewport */}
            <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-slate-950 select-none flex flex-col justify-between">
              {/* Background Art */}
              <img
                src={selectedItem.baseImage}
                alt={selectedItem.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Phone Game UI Overlay */}
              {showUiOverlay && (
                <div className="relative z-10 w-full h-full flex flex-col justify-between p-3.5 pt-7 pointer-events-none">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-[10px] text-white/90 font-semibold px-2 mb-1">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <span>📶</span>
                      <span>5G</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  {/* Screen Specific Overlays */}
                  {selectedItem.id === 'splash' && (
                    <div className="flex-1 flex flex-col justify-between items-center py-6">
                      {/* Logo Banner */}
                      <div className="mt-4 px-4 py-2 rounded-2xl bg-amber-950/80 backdrop-blur-md border border-amber-400 text-center shadow-xl">
                        <div className="text-lg font-black text-amber-300 tracking-wider">
                          SkySprout
                        </div>
                        <div className="text-[10px] font-bold text-amber-200 tracking-widest uppercase">
                          Adventures
                        </div>
                      </div>

                      {/* Steampunk Skyworld Kit Button Overlay */}
                      <div className="w-full flex flex-col items-center gap-2 pointer-events-auto">
                        <div className="w-full relative flex items-center">
                          {/* Circular Bronze Compass Badge on Left */}
                          <div className="absolute -left-2 z-20 w-11 h-11 rounded-full bg-amber-950 border-2 border-amber-300 shadow-xl flex items-center justify-center text-amber-300">
                            <CompassIcon className="w-6 h-6 animate-spin-slow" />
                          </div>
                          {/* Golden Action Button */}
                          <button className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 border-2 border-amber-300 text-slate-950 font-black text-sm shadow-xl tracking-wide flex items-center justify-center">
                            START ADVENTURE
                          </button>
                        </div>

                        {/* EXPLORE • BUILD • GROW Tagline */}
                        <div className="text-[10px] font-bold text-amber-200 tracking-widest uppercase drop-shadow-md">
                          EXPLORE • BUILD • GROW
                        </div>

                        <button className="w-3/4 py-1.5 rounded-xl bg-slate-950/70 border border-amber-400/50 text-amber-200 font-bold text-xs mt-1">
                          SIGN IN
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedItem.id === 'quests' && (
                    <div className="flex-1 flex flex-col justify-between py-2 pointer-events-auto">
                      {/* Quests Header */}
                      <div className="px-3 py-1.5 rounded-xl bg-amber-950/85 backdrop-blur-md border border-amber-500/50 text-center shadow-lg">
                        <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                          DAILY QUESTS
                        </h4>
                      </div>

                      {/* Quests List from Kit */}
                      <div className="flex flex-col gap-2 my-auto">
                        {[
                          { title: 'Make your bed', progress: '1/1', coins: '+10', done: true },
                          { title: 'Brush your teeth', progress: '1/1', coins: '+10', done: true },
                          { title: 'Homework', progress: '0/1', coins: '+25', done: false },
                          { title: 'Tidy your room', progress: '0/1', coins: '+20', done: false },
                        ].map((q, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-xl bg-amber-950/85 backdrop-blur-md border border-amber-500/40 shadow-md text-xs"
                          >
                            <div>
                              <div className="font-semibold text-slate-100 text-[11px]">
                                {q.title}
                              </div>
                              <div className="text-[9px] text-amber-200/70">
                                Progress: {q.progress}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-amber-300 font-bold">
                                {q.coins} 🪙
                              </span>
                              <span
                                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                                  q.done ? 'bg-emerald-500 text-white' : 'bg-slate-700'
                                }`}
                              >
                                {q.done ? '✓' : ''}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quests Chest Progress */}
                      <div className="p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-center shadow-lg">
                        <div className="text-[10px] text-amber-300 font-bold mb-1">
                          3 / 4 quests complete
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="w-3/4 h-full bg-gradient-to-r from-amber-400 to-emerald-400" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Generic Top Header for other screens */}
                  {selectedItem.id !== 'splash' && selectedItem.id !== 'quests' && (
                    <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-500/40">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs">🧑‍✈️</span>
                        <span className="text-[10px] font-bold text-amber-300">Lv.18 Scout</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-amber-300">
                        <span>2,840 🪙</span>
                        <span>360 💎</span>
                      </div>
                    </div>
                  )}

                  {/* Generic Bottom Navigation Bar for other screens */}
                  {selectedItem.id !== 'splash' && (
                    <div className="flex items-center justify-around py-1 px-2 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-amber-500/40">
                      {['🗺️ Map', '📜 Quests', '🎪 Shop', '⚙️ Set'].map((tab, i) => (
                        <span
                          key={i}
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            i === 0 ? 'text-amber-300 bg-amber-500/20' : 'text-slate-400'
                          }`}
                        >
                          {tab}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
