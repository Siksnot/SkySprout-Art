import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Lock,
  Star,
  Check,
  Copy,
  Download,
  Eye,
  Settings as SettingsIcon,
  Users,
  Backpack,
  Compass,
  X,
  Volume2,
  VolumeX,
  Wind,
  Layers,
  FileCode,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronRight,
  Shield,
  Coins,
  Gem,
  Award,
  Flame,
  Info,
} from 'lucide-react';
import { GENERATED_ASSETS } from '../data/backgroundsData';

export interface IslandZone {
  id: string;
  number: number;
  name: string;
  title: string;
  stars: string;
  currentStars: number;
  maxStars: number;
  isLocked: boolean;
  lockRequirement?: string;
  xPercent: number; // percentage from left to center of ribbon
  yPercent: number; // percentage from top to center of ribbon
  hitbox: {
    leftPercent: number;
    topPercent: number;
    widthPercent: number;
    heightPercent: number;
  };
  icon: string;
  themeColor: string;
  weather: string;
  threatLevel: 'Safe' | 'Moderate' | 'Hazardous' | 'Extreme';
  description: string;
  quests: { id: string; name: string; reward: string; completed: boolean }[];
  landmarks: string[];
}

export const WORLD_MAP_ZONES: IslandZone[] = [
  {
    id: 'sprout_keep',
    number: 1,
    name: 'SPROUT KEEP',
    title: 'The Great Canopy Hub',
    stars: '12/15',
    currentStars: 12,
    maxStars: 15,
    isLocked: false,
    xPercent: 25.3,
    yPercent: 53.2,
    hitbox: {
      leftPercent: 16,
      topPercent: 24,
      widthPercent: 19,
      heightPercent: 36,
    },
    icon: '🌳',
    themeColor: '#22C55E',
    weather: 'Gentle Thermals & Sunny Mists',
    threatLevel: 'Safe',
    description:
      'The bustling heart of the archipelago. Crowned by the ancient living Sprout Tree, wooden aviator cottages, steam clock towers, and deep harbor drydocks.',
    quests: [
      { id: 'sk_1', name: 'Deliver boiler parts to Master Malik', reward: '+15 Gold', completed: true },
      { id: 'sk_2', name: 'Water the treetop greenhouse orchids', reward: '+10 Gold', completed: true },
      { id: 'sk_3', name: 'Clear wandering cloud vines from dock 4', reward: '+20 Gold', completed: false },
    ],
    landmarks: ['Great Living Sprout Tree', 'Steam Clock Tower', 'Mooring Mast Harbor'],
  },
  {
    id: 'cloud_falls',
    number: 2,
    name: 'CLOUD FALLS',
    title: 'The Cascading Aqueducts',
    stars: '8/15',
    currentStars: 8,
    maxStars: 15,
    isLocked: false,
    xPercent: 48.8,
    yPercent: 63.0,
    hitbox: {
      leftPercent: 41,
      topPercent: 38,
      widthPercent: 18,
      heightPercent: 38,
    },
    icon: '🌊',
    themeColor: '#38BDF8',
    weather: 'Cascade Mist & Rainbow Breezes',
    threatLevel: 'Moderate',
    description:
      'Massive crystal-clear waterfalls tumbling into boundless clouds. Wooden waterwheels and high-altitude windmills generate hydro-steam power for Sprout Keep.',
    quests: [
      { id: 'cf_1', name: 'Repair the lower mill paddle axle', reward: '+15 Gold', completed: true },
      { id: 'cf_2', name: 'Catch 3 shimmering cloud-trouts', reward: '+20 Gold', completed: false },
      { id: 'cf_3', name: 'Chart the deep rainbow cavern updraft', reward: '+25 Gold', completed: false },
    ],
    landmarks: ['Grand Watermill Wheel', 'Crystal Plunge Falls', 'Windmill Ridge'],
  },
  {
    id: 'sky_observatory',
    number: 3,
    name: 'SKY OBSERVATORY',
    title: 'Celestial Starlight Spires',
    stars: '5/15',
    currentStars: 5,
    maxStars: 15,
    isLocked: false,
    xPercent: 62.5,
    yPercent: 35.5,
    hitbox: {
      leftPercent: 54,
      topPercent: 16,
      widthPercent: 18,
      heightPercent: 30,
    },
    icon: '🔭',
    themeColor: '#818CF8',
    weather: 'Astral Glow & High Atmosphere',
    threatLevel: 'Moderate',
    description:
      'A floating crystalline plateau where giant cyan crystals sprout naturally. A brass geodesic dome houses an ancient telescope charting uncharted sky routes.',
    quests: [
      { id: 'so_1', name: 'Polish the telescope star prism', reward: '+25 Gold', completed: true },
      { id: 'so_2', name: 'Record the comet trajectory at dusk', reward: '+30 Gold', completed: false },
    ],
    landmarks: ['Brass Astronomical Dome', 'Cyan Aether Monoliths', 'Star-Gazing Balcony'],
  },
  {
    id: 'sunridge',
    number: 4,
    name: 'SUNRIDGE',
    title: 'Golden Sandstone Canyons',
    stars: '0/15',
    currentStars: 0,
    maxStars: 15,
    isLocked: true,
    lockRequirement: 'Unlocks at Level 20 with 25 archipelago stars',
    xPercent: 87.8,
    yPercent: 30.4,
    hitbox: {
      leftPercent: 80,
      topPercent: 16,
      widthPercent: 17,
      heightPercent: 24,
    },
    icon: '☀️',
    themeColor: '#F59E0B',
    weather: 'Radiant Heat & Golden Dust',
    threatLevel: 'Hazardous',
    description:
      'Towering terracotta cliffs and sandstone pillars baking in perpetual daylight. Home to carved ancient sun dials and high-wind thermals.',
    quests: [
      { id: 'sr_1', name: 'Excavate the solar temple gate', reward: '+40 Gold', completed: false },
      { id: 'sr_2', name: 'Survive the thermals of Eagle Gorge', reward: '+35 Gold', completed: false },
    ],
    landmarks: ['Sun God Amphitheater', 'Hollow Sandstone Arch', 'Gilded Excavation Pit'],
  },
  {
    id: 'storm_spire',
    number: 5,
    name: 'STORM SPIRE',
    title: 'The Electrified Citadel',
    stars: 'Locked',
    currentStars: 0,
    maxStars: 15,
    isLocked: true,
    lockRequirement: 'Complete Sunridge Expedition chapter to obtain the Lightning Harness',
    xPercent: 88.5,
    yPercent: 59.0,
    hitbox: {
      leftPercent: 80,
      topPercent: 46,
      widthPercent: 17,
      heightPercent: 23,
    },
    icon: '⚡',
    themeColor: '#C084FC',
    weather: 'Purple Lightning & Thundergales',
    threatLevel: 'Extreme',
    description:
      'Dark obsidian rocks enveloped in perpetual violet thunderclouds. Gothic brass lightning rods capture raw atmospheric electricity.',
    quests: [
      { id: 'ss_1', name: 'Discharge the overload capacitors', reward: '+50 Gold', completed: false },
    ],
    landmarks: ['Tesla Lightning Spires', 'Obsidian Needle Ridge', 'Thunderbird Nest'],
  },
  {
    id: 'aether_depths',
    number: 6,
    name: 'AETHER DEPTHS',
    title: 'The Sub-Cloud Abyss',
    stars: 'Locked',
    currentStars: 0,
    maxStars: 15,
    isLocked: true,
    lockRequirement: 'Requires Storm Spire Core Key and Level 25 Airship License',
    xPercent: 82.9,
    yPercent: 81.1,
    hitbox: {
      leftPercent: 74,
      topPercent: 68,
      widthPercent: 18,
      heightPercent: 22,
    },
    icon: '🌀',
    themeColor: '#A855F7',
    weather: 'Sub-Zero Void & Glowing Fog',
    threatLevel: 'Extreme',
    description:
      'Mysterious floating fragments hovering over the abyssal troposphere. Glowing violet fissure vents release antigravity particles.',
    quests: [
      { id: 'ad_1', name: 'Probe the antigravity rift vortex', reward: '+100 Gold', completed: false },
    ],
    landmarks: ['Abyssal Aether Fissure', 'Dormant Titan Monolith', 'Singularity Well'],
  },
];

export const WorldMapExperience: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<IslandZone>(WORLD_MAP_ZONES[0]);
  const [hoveredZone, setHoveredZone] = useState<IslandZone | null>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'clean_bg' | 'flutter_code'>('map');

  // Modals & Panels
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isBackpackModalOpen, setIsBackpackModalOpen] = useState(false);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Experience Options
  const [showHotspots, setShowHotspots] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<1 | 1.25 | 1.5>(1);
  const [copied, setCopied] = useState(false);

  // Live Currency state
  const [playerGold, setPlayerGold] = useState(2840);
  const [playerGems, setPlayerGems] = useState(360);
  const [currencyToast, setCurrencyToast] = useState<{ text: string; x: number; y: number } | null>(null);

  // Daily Quests State
  const [dailyQuests, setDailyQuests] = useState([
    { id: 'bed', name: 'Make your bed', progress: '1/1', completed: true, reward: 10, icon: '🛏️' },
    { id: 'teeth', name: 'Brush your teeth', progress: '1/1', completed: true, reward: 10, icon: '🪥' },
    { id: 'hw', name: 'Homework', progress: '0/1', completed: false, reward: 25, icon: '📖' },
    { id: 'room', name: 'Tidy your room', progress: '0/1', completed: false, reward: 20, icon: '📦' },
  ]);

  const completedQuestsCount = dailyQuests.filter((q) => q.completed).length;

  // Web Audio Synthesizer (Instant, responsive, no external files)
  const playSfx = (type: 'zone' | 'coin' | 'gem' | 'quest' | 'lock' | 'pop') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'coin') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'gem') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1174.66, now); // D6
        osc.frequency.setValueAtTime(1567.98, now + 0.06); // G6
        osc.frequency.setValueAtTime(2093.0, now + 0.12); // C7
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'zone') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'quest') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'lock') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(180, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch {
      // AudioContext muted/blocked by browser policies
    }
  };

  const triggerToast = (text: string, x: number, y: number) => {
    setCurrencyToast({ text, x, y });
    setTimeout(() => setCurrencyToast(null), 1500);
  };

  const handleZoneClick = (zone: IslandZone) => {
    setSelectedZone(zone);
    if (zone.isLocked) {
      playSfx('lock');
    } else {
      playSfx('zone');
    }
    setIsZoneModalOpen(true);
  };

  const handleAddGold = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayerGold((prev) => prev + 50);
    playSfx('coin');
    const rect = e.currentTarget.getBoundingClientRect();
    triggerToast('+50 🪙', rect.left + rect.width / 2, rect.top - 10);
  };

  const handleAddGems = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayerGems((prev) => prev + 10);
    playSfx('gem');
    const rect = e.currentTarget.getBoundingClientRect();
    triggerToast('+10 💎', rect.left + rect.width / 2, rect.top - 10);
  };

  const flutterWorldMapCode = `// lib/screens/world_map_screen.dart
// Production Flutter implementation for SkySprout Adventures Archipelago World Map
// Generated to match native tablet artwork (image_abc29e16.png)
import 'package:flutter/material.dart';

class WorldMapScreen extends StatefulWidget {
  const WorldMapScreen({super.key});

  @override
  State<WorldMapScreen> createState() => _WorldMapScreenState();
}

class _WorldMapScreenState extends State<WorldMapScreen> {
  final TransformationController _mapTransform = TransformationController();

  // Canonical node percentage coordinates
  static const List<Map<String, dynamic>> zoneNodes = [
    {
      'id': 'sprout_keep',
      'name': '1. SPROUT KEEP',
      'stars': '12/15',
      'x': 0.253,
      'y': 0.532,
      'isLocked': false,
    },
    {
      'id': 'cloud_falls',
      'name': '2. CLOUD FALLS',
      'stars': '8/15',
      'x': 0.488,
      'y': 0.630,
      'isLocked': false,
    },
    {
      'id': 'sky_observatory',
      'name': '3. SKY OBSERVATORY',
      'stars': '5/15',
      'x': 0.625,
      'y': 0.355,
      'isLocked': false,
    },
    {
      'id': 'sunridge',
      'name': '4. SUNRIDGE',
      'stars': '0/15',
      'x': 0.878,
      'y': 0.304,
      'isLocked': true,
    },
    {
      'id': 'storm_spire',
      'name': '5. STORM SPIRE',
      'stars': 'Locked',
      'x': 0.885,
      'y': 0.590,
      'isLocked': true,
    },
    {
      'id': 'aether_depths',
      'name': '6. AETHER DEPTHS',
      'stars': 'Locked',
      'x': 0.829,
      'y': 0.811,
      'isLocked': true,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      body: LayoutBuilder(
        builder: (context, constraints) {
          final mapWidth = constraints.maxWidth;
          final mapHeight = constraints.maxHeight;

          return Stack(
            children: [
              // 1. Interactive Panning Canvas
              InteractiveViewer(
                transformationController: _mapTransform,
                boundaryMargin: const EdgeInsets.all(80),
                minScale: 1.0,
                maxScale: 2.5,
                child: SizedBox(
                  width: mapWidth,
                  height: mapHeight,
                  child: Stack(
                    children: [
                      // High-Resolution Background Artwork
                      Positioned.fill(
                        child: Image.asset(
                          'assets/images/backgrounds/bg_world_map.png',
                          fit: BoxFit.cover,
                        ),
                      ),

                      // Interactive Zone Tap Targets
                      for (final zone in zoneNodes)
                        Positioned(
                          left: zone['x'] * mapWidth - 40,
                          top: zone['y'] * mapHeight - 30,
                          child: GestureDetector(
                            onTap: () => _openZoneDetails(zone['id']),
                            child: Container(
                              width: 80,
                              height: 60,
                              color: Colors.transparent, // Clean hit target
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              ),

              // 2. Left HUD Dock Tap Target (Quests)
              Positioned(
                left: 0.015 * mapWidth,
                top: 0.195 * mapHeight,
                width: 0.072 * mapWidth,
                height: 0.131 * mapHeight,
                child: GestureDetector(
                  onTap: _toggleQuestsDrawer,
                  child: Container(color: Colors.transparent),
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  void _openZoneDetails(String zoneId) {
    // Show modal bottom sheet with expedition briefing
  }

  void _toggleQuestsDrawer() {
    // Open Daily Quests side drawer
  }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(flutterWorldMapCode);
    setCopied(true);
    playSfx('pop');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      {/* --------------------------------------------------------------------- */}
      {/* Top Banner & Mode Switcher */}
      {/* --------------------------------------------------------------------- */}
      <div className="p-6 bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/40 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Active Map: Steampunk Skyworld Archipelago (Tablet 2732 × 2048)
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            Skyworld World Map & Archipelago Navigator
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Directly renders your high-resolution World Map (<code className="text-amber-300 font-mono">image_abc29e16.png</code>). Click any of the 6 canonical islands, the Scout profile card, or the left navigation dock to trigger live in-game drawers and expedition briefings.
          </p>
        </div>

        {/* View Mode Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950/90 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => {
                setActiveTab('map');
                playSfx('pop');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'map'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Interactive Map
            </button>
            <button
              onClick={() => {
                setActiveTab('clean_bg');
                playSfx('pop');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'clean_bg'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Raw Artwork
            </button>
            <button
              onClick={() => {
                setActiveTab('flutter_code');
                playSfx('pop');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'flutter_code'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              Flutter Widget
            </button>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
              soundEnabled
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title={soundEnabled ? 'Sound Effects Enabled' : 'Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 1. INTERACTIVE WORLD MAP VIEW */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'map' && (
        <div className="flex flex-col gap-3">
          {/* Map Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowHotspots(!showHotspots);
                  playSfx('pop');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  showHotspots
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {showHotspots ? 'Interactive Hotspots: ON' : 'Interactive Hotspots: OFF'}
              </button>

              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Click any island, the top Scout bar, or left dock icons
              </span>
            </div>

            {/* Zoom / Scale Controls */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Zoom:</span>
              {([1, 1.25, 1.5] as const).map((z) => (
                <button
                  key={z}
                  onClick={() => {
                    setZoomLevel(z);
                    playSfx('pop');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    zoomLevel === z
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {z}x
                </button>
              ))}
            </div>
          </div>

          {/* Map Canvas Frame */}
          <div className="relative w-full rounded-3xl overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-950 select-none aspect-[902/552] max-h-[780px]">
            {/* Zoomable Image Container */}
            <div
              className="relative w-full h-full transition-transform duration-300 origin-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Native High-Resolution Map Asset */}
              <img
                src={GENERATED_ASSETS.worldMap}
                alt="SkySprout World Map"
                className="w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* ------------------------------------------------------------- */}
              {/* TOP STATUS BAR INTERACTIVE HITBOXES (Over image's UI) */}
              {/* ------------------------------------------------------------- */}

              {/* 1. Scout Profile Card Hitbox */}
              <div
                onClick={() => {
                  setIsProfileModalOpen(true);
                  playSfx('pop');
                }}
                className={`absolute cursor-pointer transition-all rounded-2xl z-20 group ${
                  showHotspots
                    ? 'ring-1 ring-amber-400/40 hover:ring-2 hover:ring-amber-300 hover:bg-amber-400/10'
                    : 'hover:bg-white/5'
                }`}
                style={{
                  left: '2.8%',
                  top: '2.9%',
                  width: '30.2%',
                  height: '12.7%',
                }}
                title="Click to view Scout's Aviator Profile & Stats"
              >
                {showHotspots && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-7 left-4 px-2 py-0.5 rounded bg-slate-950/90 text-amber-300 text-[10px] font-bold border border-amber-500/40 whitespace-nowrap shadow-xl pointer-events-none">
                    🧑‍✈️ Scout Profile (Lv. 18) - Click to Open
                  </div>
                )}
              </div>

              {/* 2. Gold Coin Badge (+) Hitbox */}
              <div
                onClick={handleAddGold}
                className={`absolute cursor-pointer transition-all rounded-full z-20 group ${
                  showHotspots
                    ? 'ring-1 ring-amber-400/40 hover:ring-2 hover:ring-amber-300 hover:bg-amber-400/15'
                    : 'hover:bg-white/5'
                }`}
                style={{
                  left: '53.8%',
                  top: '4.7%',
                  width: '15.6%',
                  height: '6.5%',
                }}
                title="Click '+' to collect +50 Gold"
              >
                {showHotspots && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-950/90 text-amber-300 text-[10px] font-bold border border-amber-500/40 whitespace-nowrap shadow-xl pointer-events-none">
                    🪙 {playerGold.toLocaleString()} (+50)
                  </div>
                )}
              </div>

              {/* 3. Gems Badge (+) Hitbox */}
              <div
                onClick={handleAddGems}
                className={`absolute cursor-pointer transition-all rounded-full z-20 group ${
                  showHotspots
                    ? 'ring-1 ring-purple-400/40 hover:ring-2 hover:ring-purple-300 hover:bg-purple-400/15'
                    : 'hover:bg-white/5'
                }`}
                style={{
                  left: '71.4%',
                  top: '4.7%',
                  width: '15.3%',
                  height: '6.5%',
                }}
                title="Click '+' to collect +10 Gems"
              >
                {showHotspots && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-950/90 text-purple-300 text-[10px] font-bold border border-purple-500/40 whitespace-nowrap shadow-xl pointer-events-none">
                    💎 {playerGems.toLocaleString()} (+10)
                  </div>
                )}
              </div>

              {/* 4. Settings Cog Hitbox */}
              <div
                onClick={() => {
                  setIsSettingsModalOpen(true);
                  playSfx('pop');
                }}
                className={`absolute cursor-pointer transition-all rounded-xl z-20 group ${
                  showHotspots
                    ? 'ring-1 ring-slate-400/40 hover:ring-2 hover:ring-amber-300 hover:bg-amber-400/10'
                    : 'hover:bg-white/5'
                }`}
                style={{
                  left: '92.2%',
                  top: '4.0%',
                  width: '5.6%',
                  height: '8.7%',
                }}
                title="World Map Settings"
              >
                {showHotspots && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-7 right-0 px-2 py-0.5 rounded bg-slate-950/90 text-slate-200 text-[10px] font-bold border border-slate-700 whitespace-nowrap shadow-xl pointer-events-none">
                    ⚙️ Settings
                  </div>
                )}
              </div>

              {/* ------------------------------------------------------------- */}
              {/* LEFT DOCK BUTTONS HITBOXES */}
              {/* ------------------------------------------------------------- */}

              {/* 1. Quests (with red badge 3) */}
              <div
                onClick={() => {
                  setIsQuestsOpen(!isQuestsOpen);
                  playSfx('quest');
                }}
                className={`absolute cursor-pointer transition-all rounded-2xl z-20 group ${
                  showHotspots
                    ? 'ring-1 ring-amber-400/40 hover:ring-2 hover:ring-amber-300 hover:bg-amber-400/15'
                    : 'hover:bg-white/10'
                }`}
                style={{
                  left: '1.5%',
                  top: '19.5%',
                  width: '7.2%',
                  height: '13.1%',
                }}
                title="Daily Quests (3 Active)"
              >
                {showHotspots && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 -translate-y-1/2 left-[105%] px-2.5 py-1 rounded-xl bg-slate-950/95 text-amber-300 text-[11px] font-black border border-amber-500/40 whitespace-nowrap shadow-2xl pointer-events-none">
                    📜 Daily Quests ({completedQuestsCount}/4)
                  </div>
                )}
              </div>

              {/* 2. Map (Active) */}
              <div
                onClick={() => {
                  playSfx('pop');
                  setZoomLevel(1);
                }}
                className={`absolute cursor-pointer transition-all rounded-2xl z-20 group ${
                  showHotspots
                    ? 'ring-1 ring-sky-400/40 hover:ring-2 hover:ring-sky-300 hover:bg-sky-400/15'
                    : 'hover:bg-white/10'
                }`}
                style={{
                  left: '1.5%',
                  top: '33.7%',
                  width: '7.2%',
                  height: '11.9%',
                }}
                title="Current View: World Map"
              >
                {showHotspots && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 -translate-y-1/2 left-[105%] px-2.5 py-1 rounded-xl bg-slate-950/95 text-sky-300 text-[11px] font-black border border-sky-500/40 whitespace-nowrap shadow-2xl pointer-events-none">
                    🗺️ World Map (Active)
                  </div>
                )}
              </div>

              {/* 3. Backpack */}
              <div
                onClick={() => {
                  setIsBackpackModalOpen(true);
                  playSfx('pop');
                }}
                className={`absolute cursor-pointer transition-all rounded-2xl z-20 group ${
                  showHotspots
                    ? 'ring-1 ring-amber-400/40 hover:ring-2 hover:ring-amber-300 hover:bg-amber-400/15'
                    : 'hover:bg-white/10'
                }`}
                style={{
                  left: '1.5%',
                  top: '46.7%',
                  width: '7.2%',
                  height: '12.0%',
                }}
                title="Backpack & Gear Inventory"
              >
                {showHotspots && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 -translate-y-1/2 left-[105%] px-2.5 py-1 rounded-xl bg-slate-950/95 text-amber-300 text-[11px] font-black border border-amber-500/40 whitespace-nowrap shadow-2xl pointer-events-none">
                    🎒 Aviator Backpack
                  </div>
                )}
              </div>

              {/* 4. Collection */}
              <div
                onClick={() => {
                  setActiveTab('flutter_code');
                  playSfx('pop');
                }}
                className={`absolute cursor-pointer transition-all rounded-2xl z-20 group ${
                  showHotspots
                    ? 'ring-1 ring-amber-400/40 hover:ring-2 hover:ring-amber-300 hover:bg-amber-400/15'
                    : 'hover:bg-white/10'
                }`}
                style={{
                  left: '1.5%',
                  top: '60.0%',
                  width: '7.2%',
                  height: '11.4%',
                }}
                title="Collection & Assets"
              >
                {showHotspots && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 -translate-y-1/2 left-[105%] px-2.5 py-1 rounded-xl bg-slate-950/95 text-amber-300 text-[11px] font-black border border-amber-500/40 whitespace-nowrap shadow-2xl pointer-events-none">
                    📖 Kit Collection
                  </div>
                )}
              </div>

              {/* 5. Friends */}
              <div
                onClick={() => {
                  setIsFriendsModalOpen(true);
                  playSfx('pop');
                }}
                className={`absolute cursor-pointer transition-all rounded-2xl z-20 group ${
                  showHotspots
                    ? 'ring-1 ring-amber-400/40 hover:ring-2 hover:ring-amber-300 hover:bg-amber-400/15'
                    : 'hover:bg-white/10'
                }`}
                style={{
                  left: '1.5%',
                  top: '72.5%',
                  width: '7.2%',
                  height: '11.6%',
                }}
                title="Sky Crew & Friends"
              >
                {showHotspots && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 -translate-y-1/2 left-[105%] px-2.5 py-1 rounded-xl bg-slate-950/95 text-amber-300 text-[11px] font-black border border-amber-500/40 whitespace-nowrap shadow-2xl pointer-events-none">
                    👥 Sky Crew & Friends
                  </div>
                )}
              </div>

              {/* ------------------------------------------------------------- */}
              {/* 6 ISLAND NODES INTERACTIVE HITBOXES */}
              {/* ------------------------------------------------------------- */}
              {WORLD_MAP_ZONES.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                const isHovered = hoveredZone?.id === zone.id;

                return (
                  <div
                    key={zone.id}
                    onClick={() => handleZoneClick(zone)}
                    onMouseEnter={() => setHoveredZone(zone)}
                    onMouseLeave={() => setHoveredZone(null)}
                    style={{
                      left: `${zone.hitbox.leftPercent}%`,
                      top: `${zone.hitbox.topPercent}%`,
                      width: `${zone.hitbox.widthPercent}%`,
                      height: `${zone.hitbox.heightPercent}%`,
                    }}
                    className={`absolute z-10 cursor-pointer transition-all rounded-3xl group ${
                      showHotspots
                        ? isSelected
                          ? 'ring-2 ring-amber-300 bg-amber-400/10 shadow-lg'
                          : 'ring-1 ring-white/20 hover:ring-2 hover:ring-amber-400/80 hover:bg-white/5'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    {/* Hotspot Pulse Aura (Rendered on active/hover) */}
                    {showHotspots && !zone.isLocked && (
                      <div
                        className="absolute inset-2 rounded-2xl animate-pulse opacity-30 pointer-events-none"
                        style={{ backgroundColor: zone.themeColor }}
                      />
                    )}

                    {/* Lock Indicator Ring for locked islands */}
                    {showHotspots && zone.isLocked && (
                      <div className="absolute top-2 right-2 p-1 rounded-full bg-slate-950/80 border border-slate-700 text-amber-400">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Floating Info Tooltip on Hover */}
                    {isHovered && (
                      <div
                        className="absolute z-40 left-1/2 -translate-x-1/2 bottom-[105%] px-3 py-2 rounded-2xl bg-slate-950/95 backdrop-blur-xl border-2 border-amber-400 shadow-2xl text-white pointer-events-none whitespace-nowrap flex flex-col items-center gap-0.5 animate-in fade-in zoom-in-95 duration-150"
                      >
                        <div className="flex items-center gap-1.5 font-black text-xs text-amber-300">
                          <span>{zone.icon}</span>
                          <span>{zone.name}</span>
                          {zone.isLocked && <Lock className="w-3 h-3 text-red-400 ml-0.5" />}
                        </div>
                        <div className="text-[10px] text-slate-300 flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          <span>{zone.stars} Stars</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-emerald-400">{zone.threatLevel}</span>
                        </div>
                        <div className="text-[9px] text-amber-200/80 font-mono mt-0.5">
                          Click for expedition briefing
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Floating Toast Notification on Currency Click */}
              {currencyToast && (
                <div
                  className="fixed z-50 px-3 py-1.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-2xl animate-bounce border-2 border-white pointer-events-none"
                  style={{
                    left: `${currencyToast.x}px`,
                    top: `${currencyToast.y}px`,
                    transform: 'translate(-50%, -100%)',
                  }}
                >
                  {currencyToast.text}
                </div>
              )}
            </div>

            {/* --------------------------------------------------------------- */}
            {/* DAILY QUESTS SLIDING DRAWER (Triggered by Quests Dock Icon) */}
            {/* --------------------------------------------------------------- */}
            {isQuestsOpen && (
              <div className="absolute top-4 right-4 bottom-4 w-80 sm:w-96 rounded-3xl bg-slate-950/95 backdrop-blur-xl border-2 border-amber-500/60 shadow-2xl p-4 flex flex-col justify-between z-40 overflow-hidden animate-in slide-in-from-right duration-300">
                {/* Drawer Header */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-amber-500/30">
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow">
                        DAILY QUESTS
                      </div>
                      <span className="text-xs font-mono text-amber-300">
                        {completedQuestsCount}/4 Done
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setIsQuestsOpen(false);
                        playSfx('pop');
                      }}
                      className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Tasks List */}
                  <div className="flex flex-col gap-2.5 mt-3">
                    {dailyQuests.map((quest) => (
                      <div
                        key={quest.id}
                        className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                          quest.completed
                            ? 'bg-emerald-950/40 border-emerald-500/40'
                            : 'bg-slate-900/90 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{quest.icon}</span>
                          <div>
                            <div className="text-xs font-bold text-white">
                              {quest.name}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400">
                              Progress: {quest.progress}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-amber-300 flex items-center gap-0.5">
                            +{quest.reward} 🪙
                          </span>
                          {quest.completed ? (
                            <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow">
                              ✓
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                setDailyQuests((prev) =>
                                  prev.map((q) =>
                                    q.id === quest.id
                                      ? { ...q, completed: true, progress: '1/1' }
                                      : q
                                  )
                                );
                                setPlayerGold((prev) => prev + quest.reward);
                                playSfx('coin');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] shadow"
                            >
                              Done
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pedestal with Carved Chest & Progress */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-amber-500/30 flex flex-col items-center text-center mt-3">
                  <div className="text-4xl mb-1 animate-pulse">📦</div>
                  <div className="text-xs font-black text-amber-300">
                    Grand Daily Reward Chest
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {completedQuestsCount}/4 daily habits completed
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 border border-slate-700 overflow-hidden my-2">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${(completedQuestsCount / 4) * 100}%` }}
                    />
                  </div>
                  <button
                    disabled={completedQuestsCount < 4}
                    onClick={() => {
                      setPlayerGold((prev) => prev + 100);
                      setPlayerGems((prev) => prev + 25);
                      playSfx('gem');
                      alert('🎉 Congratulations! You opened the Daily Chest: +100 Gold & +25 Gems!');
                    }}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 disabled:opacity-50 text-slate-950 font-black text-xs shadow-lg uppercase tracking-wider"
                  >
                    {completedQuestsCount >= 4 ? 'CLAIM CHEST REWARD (+100 🪙 +25 💎)!' : 'Complete All 4 To Claim'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 2. CLEAN BACKGROUND ARTWORK VIEW */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'clean_bg' && (
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-white text-sm">
                Native Archipelago Tablet Background Artwork
              </h3>
              <p className="text-xs text-slate-400">
                Direct high-resolution map asset (<code className="text-amber-300 font-mono">image_abc29e16.png</code>) ready for packaging into Flutter <code className="text-amber-300 font-mono">assets/images/backgrounds/bg_world_map.png</code>.
              </p>
            </div>
            <a
              href={GENERATED_ASSETS.worldMap}
              download="bg_world_map.png"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow shrink-0"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </a>
          </div>

          <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-950 aspect-[902/552] max-h-[750px]">
            <img
              src={GENERATED_ASSETS.worldMap}
              alt="SkySprout World Map High Resolution"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 3. FLUTTER CODE SNIPPET TAB */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'flutter_code' && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-400" />
                Flutter World Map Implementation (`world_map_screen.dart`)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                InteractiveViewer with exact island coordinates (Sprout Keep, Cloud Falls, Observatory, Sunridge, Storm Spire, Aether Depths).
              </p>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied to Clipboard!' : 'Copy Dart Code'}
            </button>
          </div>

          <pre className="text-xs font-mono text-emerald-300 bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-x-auto leading-relaxed max-h-[500px]">
            {flutterWorldMapCode}
          </pre>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* ZONE EXPEDITION BRIEFING MODAL */}
      {/* --------------------------------------------------------------------- */}
      {isZoneModalOpen && selectedZone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 relative">
            <button
              onClick={() => {
                setIsZoneModalOpen(false);
                playSfx('pop');
              }}
              className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-amber-400/40"
                style={{ backgroundColor: `${selectedZone.themeColor}20` }}
              >
                {selectedZone.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    ZONE {selectedZone.number}
                  </span>
                  {selectedZone.isLocked ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-950 text-red-300 border border-red-500/40">
                      Locked
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-emerald-400 text-emerald-400" />
                      {selectedZone.stars} Stars
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black text-white">{selectedZone.name}</h3>
                <p className="text-xs text-slate-400">{selectedZone.title}</p>
              </div>
            </div>

            {/* Zone Description */}
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              {selectedZone.description}
            </p>

            {/* Environmental Conditions */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Weather</span>
                <span className="font-bold text-amber-300 flex items-center gap-1 mt-0.5">
                  <Wind className="w-3.5 h-3.5" />
                  {selectedZone.weather}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Threat Level</span>
                <span
                  className={`font-bold flex items-center gap-1 mt-0.5 ${
                    selectedZone.threatLevel === 'Safe'
                      ? 'text-emerald-400'
                      : selectedZone.threatLevel === 'Moderate'
                      ? 'text-sky-400'
                      : selectedZone.threatLevel === 'Hazardous'
                      ? 'text-amber-400'
                      : 'text-purple-400'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  {selectedZone.threatLevel}
                </span>
              </div>
            </div>

            {/* Lock Requirement Notice if Locked */}
            {selectedZone.isLocked && (
              <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Requirement:</strong> {selectedZone.lockRequirement}
                </span>
              </div>
            )}

            {/* Zone Landmarks */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                Discovery Landmarks
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedZone.landmarks.map((l, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-semibold text-slate-300"
                  >
                    📍 {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Active Quests in Zone */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                Expedition Tasks ({selectedZone.quests.length})
              </div>
              <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto pr-1">
                {selectedZone.quests.map((q) => (
                  <div
                    key={q.id}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className={q.completed ? 'text-emerald-400' : 'text-slate-500'}>
                        {q.completed ? '✓' : '○'}
                      </span>
                      <span className={q.completed ? 'text-slate-400 line-through' : 'text-slate-200 font-medium'}>
                        {q.name}
                      </span>
                    </div>
                    <span className="text-amber-400 font-mono text-[11px] font-bold shrink-0">
                      {q.reward}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                disabled={selectedZone.isLocked}
                onClick={() => {
                  playSfx('quest');
                  alert(`🚀 Departing on flight to ${selectedZone.name}!`);
                  setIsZoneModalOpen(false);
                }}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 disabled:opacity-50 text-slate-950 font-black text-xs shadow-xl uppercase tracking-wider hover:brightness-110 transition-all"
              >
                {selectedZone.isLocked ? 'Zone Locked' : `ENTER ${selectedZone.name}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* SCOUT AVIATOR PROFILE MODAL */}
      {/* --------------------------------------------------------------------- */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 relative">
            <button
              onClick={() => {
                setIsProfileModalOpen(false);
                playSfx('pop');
              }}
              className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-3xl">
                  🧑‍✈️
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white">Scout</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Level 18
                  </span>
                </div>
                <p className="text-xs text-amber-200/80">Canopy Sky Navigator • Character Base #1</p>
                <div className="w-44 h-2 rounded-full bg-slate-800 overflow-hidden mt-1.5 border border-slate-700">
                  <div className="h-full bg-amber-400 w-[40%] rounded-full" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">320 / 800 XP to Level 19</span>
              </div>
            </div>

            {/* Base Stats */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Agility</span>
                <span className="text-base font-black text-emerald-400">85</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Strength</span>
                <span className="text-base font-black text-amber-400">70</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Wisdom</span>
                <span className="text-base font-black text-sky-400">75</span>
              </div>
            </div>

            {/* Signature Perk */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-amber-500/30 text-xs flex items-center gap-3">
              <span className="text-2xl">🍃</span>
              <div>
                <div className="font-bold text-amber-300">Passive: Sprout Wind Glider</div>
                <div className="text-[11px] text-slate-400">
                  Increases flight speed across suspension bridges by +15% and grants 1 extra air dash.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* AVIATOR BACKPACK MODAL */}
      {/* --------------------------------------------------------------------- */}
      {isBackpackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 relative">
            <button
              onClick={() => {
                setIsBackpackModalOpen(false);
                playSfx('pop');
              }}
              className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl">
                🎒
              </div>
              <div>
                <h3 className="text-base font-black text-white">Aviator Backpack</h3>
                <p className="text-xs text-slate-400">Equipped Gear & Inventory Pouch</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Equipped Armor</div>
                <div className="font-bold text-amber-300 flex items-center gap-1.5 mt-1">
                  <span>🦺</span> Sky Captain Attire (Medium)
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Equipped Weapon</div>
                <div className="font-bold text-amber-300 flex items-center gap-1.5 mt-1">
                  <span>🔨</span> Clockwork Hammer
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Active Companion</div>
                <div className="font-bold text-pink-300 flex items-center gap-1.5 mt-1">
                  <span>🐕</span> Aviator Corgi (Lv. 12)
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Airship Vehicle</div>
                <div className="font-bold text-sky-300 flex items-center gap-1.5 mt-1">
                  <span>🎈</span> The Windsprout Blimp
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Carrying Currencies:</span>
              <div className="flex items-center gap-3 font-mono font-bold">
                <span className="text-amber-400">🪙 {playerGold.toLocaleString()}</span>
                <span className="text-purple-400">💎 {playerGems.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* SKY CREW & FRIENDS MODAL */}
      {/* --------------------------------------------------------------------- */}
      {isFriendsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 relative">
            <button
              onClick={() => {
                setIsFriendsModalOpen(false);
                playSfx('pop');
              }}
              className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-2xl">
                👥
              </div>
              <div>
                <h3 className="text-base font-black text-white">Sky Crew & Friends</h3>
                <p className="text-xs text-slate-400">Active Archipelago Aviators</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {[
                { name: 'Aria', role: 'Sky Captain', status: 'Near Cloud Falls', icon: '👩‍✈️', online: true },
                { name: 'Malik', role: 'Chief Engineer', status: 'Sprout Keep Forge', icon: '👨‍🔧', online: true },
                { name: 'Maya', role: 'Wind Whisperer', status: 'Observatory Balcony', icon: '🧝‍♀️', online: true },
                { name: 'Leo', role: 'Daredevil Pilot', status: 'Offline (2h ago)', icon: '👦', online: false },
              ].map((friend, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{friend.icon}</span>
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        {friend.name}
                        {friend.online && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">{friend.role} • {friend.status}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      playSfx('pop');
                      alert(`💌 Telegram sent to ${friend.name}!`);
                    }}
                    className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-amber-300 font-bold text-[10px]"
                  >
                    Wave
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* SETTINGS MODAL */}
      {/* --------------------------------------------------------------------- */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-slate-900 border-2 border-slate-700 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 relative">
            <button
              onClick={() => {
                setIsSettingsModalOpen(false);
                playSfx('pop');
              }}
              className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl">
                ⚙️
              </div>
              <div>
                <h3 className="text-base font-black text-white">World Map Settings</h3>
                <p className="text-xs text-slate-400">Audio & Visual Preferences</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span>Sound Effects (Chimes)</span>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`px-3 py-1 rounded-xl font-bold ${
                    soundEnabled ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {soundEnabled ? 'Enabled' : 'Muted'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span>Interactive Hotspots Highlight</span>
                <button
                  onClick={() => setShowHotspots(!showHotspots)}
                  className={`px-3 py-1 rounded-xl font-bold ${
                    showHotspots ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {showHotspots ? 'Visible' : 'Hidden'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
