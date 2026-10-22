import React, { useState } from 'react';
import {
  CHARACTER_BASES,
  ARMOR_OUTFITS,
  WEAPONS_AND_TOOLS_EXPANDED,
  PETS_EXPANDED,
  GAME_ITEMS,
  GAME_BUTTONS,
  CharacterBase,
  ArmorOutfit,
  WeaponTool,
  PetCompanion,
  GameButtonAsset,
} from '../data/backgroundsData';
import {
  Shirt,
  Wrench,
  Heart,
  Coins,
  Layers,
  Sparkles,
  Shield,
  Zap,
  Flame,
  Check,
  Copy,
  Download,
  ChevronRight,
  Compass,
  ArrowUpRight,
  Eye,
  Feather,
  ShieldAlert,
  Wind,
} from 'lucide-react';

export const ArmoryAndGearStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dressing_room' | 'characters' | 'armors' | 'buttons' | 'weapons' | 'items'>('dressing_room');

  // Armor Type filter: 'all' | 'Light' | 'Medium' | 'Heavy'
  const [armorFilter, setArmorFilter] = useState<'all' | 'Light' | 'Medium' | 'Heavy'>('all');

  // Character gender filter: 'all' | 'Boy' | 'Girl'
  const [characterGenderFilter, setCharacterGenderFilter] = useState<'all' | 'Boy' | 'Girl'>('all');

  // Dressing room state
  const [selectedBase, setSelectedBase] = useState<CharacterBase>(CHARACTER_BASES[0]);
  const [selectedOutfit, setSelectedOutfit] = useState<ArmorOutfit>(ARMOR_OUTFITS[0]);
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponTool>(WEAPONS_AND_TOOLS_EXPANDED[0]);
  const [selectedWeaponTier, setSelectedWeaponTier] = useState<1 | 2 | 3>(3);
  const [selectedPet, setSelectedPet] = useState<PetCompanion>(PETS_EXPANDED[0]);

  // Button testing state
  const [pressedButtonId, setPressedButtonId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const currentWeaponTierData =
    selectedWeaponTier === 1
      ? selectedWeapon.tier1
      : selectedWeaponTier === 2
      ? selectedWeapon.tier2
      : selectedWeapon.tier3;

  // Filter outfits based on armor type filter
  const filteredOutfits = ARMOR_OUTFITS.filter((outfit) => {
    if (armorFilter === 'all') return true;
    return outfit.armorType === armorFilter;
  });

  const getArmorTypeBadge = (type: 'Light' | 'Medium' | 'Heavy', size: 'sm' | 'md' = 'sm') => {
    if (type === 'Light') {
      return (
        <span
          className={`inline-flex items-center gap-1 font-bold rounded-full border shadow-sm ${
            size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
          } bg-emerald-950/80 text-emerald-300 border-emerald-500/50`}
          title="Light Armor: High agility, low air resistance, swift traversal"
        >
          <Feather className={size === 'sm' ? 'w-3 h-3 text-emerald-400' : 'w-3.5 h-3.5 text-emerald-400'} />
          Light
        </span>
      );
    }
    if (type === 'Medium') {
      return (
        <span
          className={`inline-flex items-center gap-1 font-bold rounded-full border shadow-sm ${
            size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
          } bg-amber-950/80 text-amber-300 border-amber-500/50`}
          title="Medium Armor: Balanced protection & agility for general exploration"
        >
          <Shield className={size === 'sm' ? 'w-3 h-3 text-amber-400' : 'w-3.5 h-3.5 text-amber-400'} />
          Medium
        </span>
      );
    }
    return (
      <span
        className={`inline-flex items-center gap-1 font-bold rounded-full border shadow-sm ${
          size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
        } bg-indigo-950/80 text-indigo-300 border-indigo-500/50`}
        title="Heavy Armor: Maximum armor rating, cold & heat fortification"
      >
        <ShieldAlert className={size === 'sm' ? 'w-3 h-3 text-indigo-400' : 'w-3.5 h-3.5 text-indigo-400'} />
        Heavy
      </span>
    );
  };

  const characterFlutterCode = `// lib/models/character_loadout.dart
final character = CharacterLoadout(
  baseId: '${selectedBase.id}', // ${selectedBase.name}
  outfit: ArmorOutfit.${selectedOutfit.id.toUpperCase()}, // ${selectedOutfit.name} (${selectedOutfit.armorType} - ${selectedOutfit.rarity})
  weapon: WeaponEquipment(
    type: WeaponType.${selectedWeapon.id.toUpperCase()},
    tier: ${selectedWeaponTier}, // ${currentWeaponTierData.name} (${currentWeaponTierData.damage} ATK)
  ),
  companion: PetCompanion.${selectedPet.id.toUpperCase()}, // ${selectedPet.name}
  stats: CharacterStats(
    armorType: ArmorType.${selectedOutfit.armorType.toLowerCase()},
    defense: ${selectedOutfit.stats.defense},
    agility: ${selectedOutfit.stats.agility},
    warmth: ${selectedOutfit.stats.warmth},
    attackPower: ${currentWeaponTierData.damage},
  ),
);`;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border border-amber-500/40 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            SkySprout Adventures Arsenal & Armory
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Buttons, Modular Armor Sets, Weapons & Companions
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Interactive dressing room, armor type filtration (Light, Medium, Heavy), 3D button tester, weapon evolution matrix, and currency rewards.
          </p>
        </div>

        {/* Studio Sub-Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('dressing_room')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'dressing_room'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🪞 Dressing Room
          </button>
          <button
            onClick={() => setActiveTab('characters')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'characters'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🧑‍✈️ Character Bases ({CHARACTER_BASES.length})
          </button>
          <button
            onClick={() => setActiveTab('armors')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'armors'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            Armors ({ARMOR_OUTFITS.length})
          </button>
          <button
            onClick={() => setActiveTab('buttons')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'buttons'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            3D Buttons ({GAME_BUTTONS.length})
          </button>
          <button
            onClick={() => setActiveTab('weapons')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'weapons'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            Weapons ({WEAPONS_AND_TOOLS_EXPANDED.length})
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'items'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            Items & Vault ({GAME_ITEMS.length})
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 1. INTERACTIVE DRESSING ROOM TAB */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'dressing_room' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Character Stage & Preview (Left Column) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center">
              {/* Sky background aura */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-950/40 via-amber-950/20 to-slate-950 pointer-events-none" />

              {/* Rarity & Armor Type Badges */}
              <div className="w-full flex items-center justify-between mb-2 z-10">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      selectedOutfit.rarity === 'Legendary'
                        ? 'bg-purple-950 text-purple-300 border border-purple-500/50'
                        : selectedOutfit.rarity === 'Epic'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                    }`}
                  >
                    {selectedOutfit.rarity}
                  </span>
                  {getArmorTypeBadge(selectedOutfit.armorType, 'sm')}
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Level 18 Scout
                </span>
              </div>

              {/* Hero Character Presentation Stage */}
              <div className="relative my-4 flex flex-col items-center justify-center">
                {/* Glowing runic pedestal */}
                <div className="absolute bottom-0 w-48 h-12 bg-amber-500/20 rounded-full blur-md border border-amber-400/40" />

                {/* Character Avatar / Base */}
                <div className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-b from-slate-800 to-slate-950 border-4 border-amber-400/70 shadow-2xl flex items-center justify-center text-7xl select-none hover:scale-105 transition-transform duration-300">
                  {selectedBase.avatar}
                  {/* Equipped Weapon Overlay Icon */}
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-amber-950 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-xl">
                    {selectedWeapon.icon}
                  </div>
                  {/* Companion Pet Floating nearby */}
                  <div className="absolute -top-2 -left-2 w-12 h-12 rounded-2xl bg-slate-900 border-2 border-emerald-400 flex items-center justify-center text-2xl shadow-xl">
                    {selectedPet.icon}
                  </div>
                </div>
              </div>

              {/* Character & Outfit Name */}
              <div className="text-center z-10 mt-2 flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    BASE {selectedBase.baseNumber}
                  </span>
                  <h3 className="text-lg font-black text-amber-300">
                    {selectedBase.name}
                  </h3>
                  <span className="text-xs text-slate-400">({selectedBase.title})</span>
                </div>
                <div className="mt-1 px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-[10px] text-amber-200 font-medium">
                  ⚡ {selectedBase.passivePerk}
                </div>
                <p className="text-xs font-semibold text-slate-300 mt-1">
                  wearing{' '}
                  <span className="text-emerald-400">{selectedOutfit.name}</span>
                </p>
                <div className="flex items-center justify-center gap-2 mt-0.5">
                  <span className="text-[11px] text-slate-400">
                    {currentWeaponTierData.name} • {selectedPet.name}
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="w-full grid grid-cols-4 gap-2 mt-5 z-10 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3 text-sky-400" /> DEF
                  </div>
                  <div className="text-sm font-black text-sky-300 mt-0.5">
                    +{selectedOutfit.stats.defense}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" /> AGI
                  </div>
                  <div className="text-sm font-black text-amber-300 mt-0.5">
                    +{selectedOutfit.stats.agility}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" /> WARM
                  </div>
                  <div className="text-sm font-black text-orange-300 mt-0.5">
                    +{selectedOutfit.stats.warmth}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Wrench className="w-3 h-3 text-emerald-400" /> ATK
                  </div>
                  <div className="text-sm font-black text-emerald-300 mt-0.5">
                    +{currentWeaponTierData.damage}
                  </div>
                </div>
              </div>

              {/* Equipped Item Pieces Breakdown */}
              <div className="w-full mt-4 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs flex flex-col gap-1.5 z-10">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Armor Class:</span>
                  <span className="text-right font-bold text-amber-300 flex items-center gap-1">
                    {selectedOutfit.armorType} Armor
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Head / Visor:</span>
                  <span className="text-right text-slate-200 font-medium">
                    {selectedOutfit.headgear}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Torso / Vest:</span>
                  <span className="text-right text-slate-200 font-medium">
                    {selectedOutfit.torso}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Legs / Pants:</span>
                  <span className="text-right text-slate-200 font-medium">
                    {selectedOutfit.legs}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Boots / Gaiters:</span>
                  <span className="text-right text-slate-200 font-medium">
                    {selectedOutfit.boots}
                  </span>
                </div>
              </div>
            </div>

            {/* Generated Flutter Loadout Code */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-amber-300">
                  Flutter CharacterLoadout Model
                </span>
                <button
                  onClick={() => handleCopy(characterFlutterCode, 'loadout')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  {copiedCode === 'loadout' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedCode === 'loadout' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="text-[11px] font-mono text-emerald-300 bg-slate-900/90 p-3 rounded-xl overflow-x-auto border border-slate-800/80 leading-relaxed">
                {characterFlutterCode}
              </pre>
            </div>
          </div>

          {/* Loadout Customization Controls (Right Column) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* 1. Character Base Selector */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span>1. Choose Character Base (8 Versions)</span>
                </h4>
                <span className="text-[11px] text-slate-400">
                  Selected: {selectedBase.name}
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {CHARACTER_BASES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBase(b)}
                    className={`flex flex-col items-center p-2 rounded-xl border transition-all ${
                      selectedBase.id === b.id
                        ? 'bg-amber-500/20 border-amber-400 shadow-md scale-105'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl mb-1">{b.avatar}</span>
                    <span className="text-[10px] font-bold text-slate-200 line-clamp-1">
                      {b.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-slate-500">
                      {b.id.replace('_', ' ')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Modular Outfit / Armor Selector WITH LIGHT, MEDIUM, HEAVY FILTER */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span>2. Modular Armor Sets (Filter by Type)</span>
                </h4>

                {/* Filter buttons: All, Light, Medium, Heavy */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setArmorFilter('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      armorFilter === 'all'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All ({ARMOR_OUTFITS.length})
                  </button>
                  <button
                    onClick={() => setArmorFilter('Light')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      armorFilter === 'Light'
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'text-emerald-400 hover:bg-emerald-950/40'
                    }`}
                  >
                    <Feather className="w-3 h-3" />
                    Light (3)
                  </button>
                  <button
                    onClick={() => setArmorFilter('Medium')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      armorFilter === 'Medium'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'text-amber-400 hover:bg-amber-950/40'
                    }`}
                  >
                    <Shield className="w-3 h-3" />
                    Medium (3)
                  </button>
                  <button
                    onClick={() => setArmorFilter('Heavy')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      armorFilter === 'Heavy'
                        ? 'bg-indigo-500 text-slate-950 shadow'
                        : 'text-indigo-400 hover:bg-indigo-950/40'
                    }`}
                  >
                    <ShieldAlert className="w-3 h-3" />
                    Heavy (3)
                  </button>
                </div>
              </div>

              {/* Visual Indicator Explanation Bar */}
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <strong>Light:</strong> Max Agility & Zipline Speed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <strong>Medium:</strong> Balanced Exploration
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <strong>Heavy:</strong> Max Defense & Storm Armor
                </span>
              </div>

              {/* Filtered Outfits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {filteredOutfits.map((outfit) => (
                  <button
                    key={outfit.id}
                    onClick={() => setSelectedOutfit(outfit)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      selectedOutfit.id === outfit.id
                        ? 'bg-amber-950/60 border-amber-400 shadow-lg ring-1 ring-amber-400/50'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xl shrink-0">
                      {outfit.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-slate-100 truncate">
                          {outfit.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        {getArmorTypeBadge(outfit.armorType, 'sm')}
                      </div>
                      <div className="flex items-center gap-2 text-[9px] font-mono font-semibold text-slate-400">
                        <span className="text-sky-300">🛡️ {outfit.stats.defense}</span>
                        <span className="text-amber-300">⚡ {outfit.stats.agility}</span>
                        <span className="text-orange-300">🔥 {outfit.stats.warmth}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Weapon & Tool with Evolution Tiers */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span>3. Weapons & Tools (Separate Unlocks & Evolutions)</span>
                </h4>
                {/* Tier Switcher Pills */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setSelectedWeaponTier(1)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedWeaponTier === 1
                        ? 'bg-amber-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Tier 1 (Bronze)
                  </button>
                  <button
                    onClick={() => setSelectedWeaponTier(2)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedWeaponTier === 2
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Tier 2 (Steam)
                  </button>
                  <button
                    onClick={() => setSelectedWeaponTier(3)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedWeaponTier === 3
                        ? 'bg-cyan-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Tier 3 (Aether)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {WEAPONS_AND_TOOLS_EXPANDED.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWeapon(w)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                      selectedWeapon.id === w.id
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-md'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{w.icon}</span>
                    <div className="truncate">
                      <div className="text-[11px] font-bold text-slate-200 truncate">
                        {w.name}
                      </div>
                      <div className="text-[9px] text-cyan-400">
                        {selectedWeaponTier === 1
                          ? `${w.tier1.damage} ATK`
                          : selectedWeaponTier === 2
                          ? `${w.tier2.damage} ATK`
                          : `${w.tier3.damage} ATK (Max)`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Companion Pet Selector */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span>4. Pets / Companions (Many Styles)</span>
                </h4>
                <span className="text-[11px] text-slate-400">
                  {selectedPet.perk}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PETS_EXPANDED.map((pet) => (
                  <button
                    key={pet.id}
                    onClick={() => setSelectedPet(pet)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                      selectedPet.id === pet.id
                        ? 'bg-emerald-950/60 border-emerald-400 shadow-md'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{pet.icon}</span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-200 truncate">
                        {pet.name.split(' ')[0]}
                      </div>
                      <div className="text-[9px] text-emerald-400 truncate">
                        {pet.species}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 2. CHARACTER BASES (8 VERSIONS) TAB */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'characters' && (
        <div className="flex flex-col gap-6">
          {/* Top Filter & Information Bar */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-1 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Character Bases (Multiple Versions)
              </div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                All 8 Canonical Explorers & Aviators
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Each character base includes unique facial features, hair styling, skin tones, passive perks, and core attributes.
              </p>
            </div>

            {/* Gender Filters */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setCharacterGenderFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  characterGenderFilter === 'all'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All (8)
              </button>
              <button
                onClick={() => setCharacterGenderFilter('Boy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  characterGenderFilter === 'Boy'
                    ? 'bg-sky-500 text-slate-950 shadow'
                    : 'text-sky-400 hover:bg-sky-950/40'
                }`}
              >
                Boys (5)
              </button>
              <button
                onClick={() => setCharacterGenderFilter('Girl')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  characterGenderFilter === 'Girl'
                    ? 'bg-pink-500 text-slate-950 shadow'
                    : 'text-pink-400 hover:bg-pink-950/40'
                }`}
              >
                Girls (3)
              </button>
            </div>
          </div>

          {/* Grid of 8 Character Bases */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHARACTER_BASES.filter(
              (b) => characterGenderFilter === 'all' || b.gender === characterGenderFilter
            ).map((b) => {
              const isSelected = selectedBase.id === b.id;
              return (
                <div
                  key={b.id}
                  className={`p-5 rounded-3xl border transition-all flex flex-col justify-between gap-4 shadow-xl ${
                    isSelected
                      ? 'bg-slate-900 border-amber-400 ring-2 ring-amber-400/30'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Header: Base number & Gender */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        BASE 0{b.baseNumber}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.gender === 'Boy'
                            ? 'bg-sky-950 text-sky-300 border border-sky-500/40'
                            : 'bg-pink-950 text-pink-300 border border-pink-500/40'
                        }`}
                      >
                        {b.gender}
                      </span>
                    </div>

                    {/* Avatar Circle with Glow */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner border-2 border-amber-400/60"
                        style={{ backgroundColor: `${b.palette.accentColor}25` }}
                      >
                        {b.avatar}
                      </div>
                      <div>
                        <h4 className="text-base font-black text-white">{b.name}</h4>
                        <span className="text-xs font-semibold text-amber-300">{b.title}</span>
                      </div>
                    </div>

                    {/* Passive Perk Banner */}
                    <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 font-medium mb-3">
                      ⚡ <strong>Perk:</strong> {b.passivePerk}
                    </div>

                    {/* Trait Specs List */}
                    <div className="flex flex-col gap-1.5 text-xs text-slate-300">
                      <div>
                        <span className="text-slate-500">Hair: </span>
                        <span className="text-slate-200 font-medium">{b.hair}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Eyes: </span>
                        <span className="text-slate-200 font-medium">{b.eyes}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Skin: </span>
                        <span className="text-slate-200 font-medium">{b.skinTone}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Headwear: </span>
                        <span className="text-slate-200 font-medium">{b.headwear}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Signature: </span>
                        <span className="text-slate-200 font-medium">{b.signatureClothing}</span>
                      </div>
                    </div>

                    {/* Lore paragraph */}
                    <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                      "{b.lore}"
                    </p>
                  </div>

                  {/* Attributes & Equip Action */}
                  <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
                    <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px]">
                      <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block text-[9px]">AGILITY</span>
                        <span className="text-amber-300 font-bold text-xs">{b.stats.baseAgility}</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block text-[9px]">STRENGTH</span>
                        <span className="text-emerald-300 font-bold text-xs">{b.stats.baseStrength}</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block text-[9px]">WISDOM</span>
                        <span className="text-sky-300 font-bold text-xs">{b.stats.baseWisdom}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedBase(b);
                        setActiveTab('dressing_room');
                      }}
                      className={`w-full py-2 rounded-xl text-xs font-black transition-all shadow ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200'
                      }`}
                    >
                      {isSelected ? '✓ Equipped in Dressing Room' : 'Equip in Dressing Room'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 2. ARMORS / MODULAR SETS TAB (FULL VIEW WITH TYPE FILTERING) */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'armors' && (
        <div className="flex flex-col gap-6">
          {/* Top Filter & Indicator Bar */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Shirt className="w-5 h-5 text-amber-400" />
                Armor Categories: Light, Medium & Heavy
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Each armor class provides specific defense thresholds, movement agility, and elemental warmth
              </p>
            </div>

            {/* Filter Toggle Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setArmorFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  armorFilter === 'all'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Armors ({ARMOR_OUTFITS.length})
              </button>
              <button
                onClick={() => setArmorFilter('Light')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  armorFilter === 'Light'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-emerald-400 hover:bg-emerald-950/40'
                }`}
              >
                <Feather className="w-3.5 h-3.5" />
                Light (3)
              </button>
              <button
                onClick={() => setArmorFilter('Medium')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  armorFilter === 'Medium'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-amber-400 hover:bg-amber-950/40'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Medium (3)
              </button>
              <button
                onClick={() => setArmorFilter('Heavy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  armorFilter === 'Heavy'
                    ? 'bg-indigo-500 text-slate-950 shadow'
                    : 'text-indigo-400 hover:bg-indigo-950/40'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Heavy (3)
              </button>
            </div>
          </div>

          {/* Indicator Cards Overview (Showing the 3 armor types side-by-side) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => setArmorFilter(armorFilter === 'Light' ? 'all' : 'Light')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                armorFilter === 'Light'
                  ? 'bg-emerald-950/50 border-emerald-400 shadow-lg shadow-emerald-950/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/50">
                  <Feather className="w-3.5 h-3.5" />
                  Light Armor
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-400">
                  ⚡⚡⚡ Max Agility
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prioritizes acrobatics, climbing, and swift glider traversal. Low wind resistance with high dodge rating.
              </p>
              <div className="mt-2.5 text-[10px] text-slate-400">
                Sets: <em>Explorer Suit, Sky Garden Ranger, Cloud Nomad</em>
              </div>
            </div>

            <div
              onClick={() => setArmorFilter(armorFilter === 'Medium' ? 'all' : 'Medium')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                armorFilter === 'Medium'
                  ? 'bg-amber-950/50 border-amber-400 shadow-lg shadow-amber-950/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-500/50">
                  <Shield className="w-3.5 h-3.5" />
                  Medium Armor
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-400">
                  ⚡⚡ Balanced
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Versatile balance between physical protection and mobility. Includes specialized environmental resistances.
              </p>
              <div className="mt-2.5 text-[10px] text-slate-400">
                Sets: <em>Aether Scholar Robes, Ace Pilot Bomber, Safari Suit</em>
              </div>
            </div>

            <div
              onClick={() => setArmorFilter(armorFilter === 'Heavy' ? 'all' : 'Heavy')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                armorFilter === 'Heavy'
                  ? 'bg-indigo-950/50 border-indigo-400 shadow-lg shadow-indigo-950/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-950 text-indigo-300 border border-indigo-500/50">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Heavy Armor
                </span>
                <span className="text-[11px] font-mono font-bold text-indigo-400">
                  ⚡ Fortified Defense
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highest physical and elemental defense rating. Heavy insulated coats and reinforced boiler plating.
              </p>
              <div className="mt-2.5 text-[10px] text-slate-400">
                Sets: <em>Sky Captain Regalia, Engineer Rig, Frost Peak Parka</em>
              </div>
            </div>
          </div>

          {/* Grid of Armor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOutfits.map((outfit) => (
              <div
                key={outfit.id}
                className="p-5 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col justify-between gap-4 hover:border-amber-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          outfit.rarity === 'Legendary'
                            ? 'bg-purple-950 text-purple-300 border border-purple-500/50'
                            : outfit.rarity === 'Epic'
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                        }`}
                      >
                        {outfit.rarity}
                      </span>
                      {getArmorTypeBadge(outfit.armorType, 'sm')}
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {outfit.theme}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-3xl shadow-inner">
                      {outfit.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-base">
                        {outfit.name}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {outfit.armorType} Modular 4-Piece Set
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {outfit.description}
                  </p>

                  {/* 4 Pieces List */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex flex-col gap-1.5 mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Head:</span>
                      <span className="text-slate-200 text-right font-medium">
                        {outfit.headgear}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Torso:</span>
                      <span className="text-slate-200 text-right font-medium">
                        {outfit.torso}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Legs:</span>
                      <span className="text-slate-200 text-right font-medium">
                        {outfit.legs}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Boots:</span>
                      <span className="text-slate-200 text-right font-medium">
                        {outfit.boots}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="flex items-center justify-around p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-slate-300">
                  <span className="text-sky-300">🛡️ {outfit.stats.defense} DEF</span>
                  <span className="text-amber-300">⚡ {outfit.stats.agility} AGI</span>
                  <span className="text-orange-300">🔥 {outfit.stats.warmth} WARM</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 3. 3D BUTTONS & UI ACTIONS TAB */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'buttons' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GAME_BUTTONS.map((btn) => (
              <div
                key={btn.id}
                className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col justify-between gap-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-slate-100 text-sm flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      {btn.name}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {btn.dimensions} (9-Slice)
                    </span>
                  </div>

                  {/* Interactive Button Preview */}
                  <div className="py-8 px-4 rounded-2xl bg-slate-950 flex flex-col items-center justify-center border border-slate-800/80">
                    <button
                      onMouseDown={() => setPressedButtonId(btn.id)}
                      onMouseUp={() => setPressedButtonId(null)}
                      onMouseLeave={() => setPressedButtonId(null)}
                      className={`w-full max-w-sm py-4 rounded-2xl border-2 font-black text-lg tracking-wider transition-all select-none shadow-2xl flex items-center justify-center ${
                        btn.colorType === 'golden'
                          ? 'bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 border-amber-300 text-slate-950 shadow-amber-500/30'
                          : btn.colorType === 'emerald'
                          ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 border-emerald-300 text-slate-950 shadow-emerald-500/30'
                          : btn.colorType === 'cyan'
                          ? 'bg-gradient-to-b from-cyan-400 via-cyan-500 to-cyan-600 border-cyan-200 text-slate-950 shadow-cyan-500/30'
                          : 'bg-gradient-to-b from-amber-800 via-amber-900 to-stone-900 border-amber-700 text-amber-100 shadow-amber-950/50'
                      } ${
                        pressedButtonId === btn.id
                          ? 'scale-95 translate-y-1 shadow-inner'
                          : 'hover:scale-[1.02] hover:-translate-y-0.5'
                      }`}
                    >
                      {btn.id === 'btn_start_adventure' && (
                        <Compass className="w-6 h-6 mr-3 text-slate-950" />
                      )}
                      {btn.label}
                    </button>
                    <span className="text-[10px] text-slate-500 mt-2">
                      Click to test 3D press depression
                    </span>
                  </div>
                </div>

                {/* Slicing Specs & Code */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs flex flex-col gap-2">
                  <div className="flex justify-between text-slate-400">
                    <span>CenterSlice:</span>
                    <span className="font-mono text-amber-300 font-semibold">
                      Rect.fromLTRB({btn.nineSlice.left}, {btn.nineSlice.top}, 1024 -{' '}
                      {btn.nineSlice.right}, 512 - {btn.nineSlice.bottom})
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <span className="font-mono text-[11px] text-slate-400">
                      {btn.filename}
                    </span>
                    <button
                      onClick={() => handleCopy(btn.flutterCode, btn.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                    >
                      {copiedCode === btn.id ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedCode === btn.id ? 'Copied' : 'Copy Flutter Widget'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 4. WEAPONS & EVOLUTION MATRIX TAB */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'weapons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WEAPONS_AND_TOOLS_EXPANDED.map((w) => (
            <div
              key={w.id}
              className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col justify-between gap-5"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-3xl shadow-inner">
                      {w.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-base">
                        {w.name}
                      </h3>
                      <span className="text-[11px] font-mono text-cyan-400">
                        {w.type} • {w.element} Element
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {w.description}
                </p>

                {/* 3 Evolution Tiers */}
                <div className="flex flex-col gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-950 border border-amber-950 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-amber-200">
                        Tier 1: {w.tier1.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {w.tier1.material}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      +{w.tier1.damage} ATK
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-amber-600/40 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-amber-300">
                        Tier 2: {w.tier2.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {w.tier2.material}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-300">
                      +{w.tier2.damage} ATK
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/60 shadow-md shadow-cyan-950/30 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-cyan-300">
                        Tier 3 (Max): {w.tier3.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {w.tier3.material}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      +{w.tier3.damage} ATK
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 text-right">
                <span className="text-[11px] text-slate-400">
                  Separate unlocks via Daily Quests & Airship Expeditions
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 5. ITEMS & REWARDS VAULT TAB */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'items' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GAME_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg flex flex-col justify-between gap-3 hover:border-amber-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-950 text-slate-400">
                    {item.type}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500">
                      {item.id}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="text-[10px] font-mono text-amber-300 truncate">
                  {item.flutterSnippet}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
