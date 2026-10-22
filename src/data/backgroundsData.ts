export interface BackgroundItem {
  id: string;
  name: string;
  category: 'phone' | 'tablet' | 'panel' | 'button';
  targetWidth: number;
  targetHeight: number;
  deviceType: 'Phone' | 'Tablet' | 'UI Panel' | 'UI Button';
  filename: string;
  description: string;
  mood: string;
  baseImage: string;
  accentColor: string;
  nineSlice?: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  dartSnippet: string;
  features: string[];
}

export interface CharacterBase {
  id: string;
  baseNumber: number;
  name: string;
  title: string;
  gender: 'Boy' | 'Girl';
  hair: string;
  eyes: string;
  skinTone: string;
  headwear: string;
  signatureClothing: string;
  personality: string;
  passivePerk: string;
  defaultOutfit: string;
  avatar: string;
  palette: { hairColor: string; skinColor: string; accentColor: string };
  lore: string;
  stats: {
    baseAgility: number;
    baseStrength: number;
    baseWisdom: number;
  };
}

export interface ArmorOutfit {
  id: string;
  name: string;
  theme: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  armorType: 'Light' | 'Medium' | 'Heavy';
  stats: { defense: number; agility: number; warmth: number };
  headgear: string;
  torso: string;
  legs: string;
  boots: string;
  palette: { primary: string; secondary: string; accent: string };
  icon: string;
  description: string;
}

export interface WeaponTool {
  id: string;
  name: string;
  type: 'Melee / Hammer' | 'Ranged / Blaster' | 'Gathering' | 'Magic / Aether' | 'Utility';
  tier1: { name: string; damage: number; material: string };
  tier2: { name: string; damage: number; material: string };
  tier3: { name: string; damage: number; material: string };
  description: string;
  icon: string;
  element: 'Physical' | 'Aether' | 'Steam' | 'Electric' | 'Nature';
}

export interface PetCompanion {
  id: string;
  name: string;
  species: string;
  perk: string;
  icon: string;
  gear: string;
  description: string;
}

export interface GameItemReward {
  id: string;
  name: string;
  type: 'Currency' | 'Material' | 'Consumable' | 'Artifact';
  icon: string;
  color: string;
  flutterSnippet: string;
  description: string;
}

export interface GameButtonAsset {
  id: string;
  name: string;
  label: string;
  colorType: 'golden' | 'emerald' | 'cyan' | 'bronze' | 'crimson';
  bgGradient: string;
  borderStroke: string;
  textColor: string;
  dimensions: string;
  nineSlice: { left: number; top: number; right: number; bottom: number };
  filename: string;
  flutterCode: string;
}

export const GENERATED_ASSETS = {
  splash: '/src/assets/images/skysprout_splash_bg_1792637429394.jpg',
  worldMap: '/public/assets/aistudio/image_abc29e16.png',
  quests: '/src/assets/images/skysprout_quests_bg_1792637431704.jpg',
  dashboard: '/src/assets/images/skysprout_dashboard_bg_1792637433868.jpg',
  panel: '/src/assets/images/skysprout_panel_frame_1792637433351.jpg',
  originalSheet: '/public/assets/aistudio/image_e9e0dd3a.png',
};

export interface SteampunkKitTile {
  name: string;
  category: 'building' | 'outfit' | 'pet' | 'tool' | 'button';
  icon: string;
  description: string;
}

export const WORLD_TILES: SteampunkKitTile[] = [
  { name: 'Tree Hub (Sprout Keep)', category: 'building', icon: '🌳', description: 'Ancient giant living sprout tree with treetop aviator cottages and wooden platforms.' },
  { name: 'Windmill Farm', category: 'building', icon: '⚙️', description: 'High-altitude brass windmills generating cloud-aether energy.' },
  { name: 'Sky Port', category: 'building', icon: '🎈', description: 'Floating mooring masts for cargo and passenger airships.' },
  { name: 'Cloud Falls', category: 'building', icon: '🌊', description: 'Sky aqueducts and crystal cascading waterfalls tumbling into the mist.' },
  { name: 'Sky Observatory', category: 'building', icon: '🔭', description: 'Gilded brass dome with massive telescopes charting sky constellations.' },
  { name: 'Sunridge Canyon', category: 'building', icon: '☀️', description: 'Golden sandstone plateaus basking in perpetual radiant sunshine.' },
  { name: 'Storm Spire', category: 'building', icon: '⚡', description: 'Purple electrified spires channeling lightning storms.' },
  { name: 'Floating Ruins', category: 'building', icon: '🏛️', description: 'Ancient forgotten stone temples drifting mysteriously in the aether.' },
  { name: 'Airship Dock', category: 'building', icon: '⚓', description: 'Main overhaul harbor with cranes, wrenches, and flight drydocks.' },
];

export const GAME_BUTTONS: GameButtonAsset[] = [
  {
    id: 'btn_play',
    name: 'PLAY Button',
    label: 'PLAY',
    colorType: 'golden',
    bgGradient: 'from-amber-400 via-amber-500 to-amber-600',
    borderStroke: 'border-amber-300',
    textColor: 'text-slate-950',
    dimensions: '1024 × 512',
    nineSlice: { left: 120, top: 80, right: 120, bottom: 80 },
    filename: 'btn_play.png',
    flutterCode: `// lib/widgets/buttons/btn_play.dart
GestureDetector(
  onTap: onPlay,
  child: Container(
    height: 64,
    decoration: const BoxDecoration(
      image: DecorationImage(
        image: AssetImage('assets/images/buttons/btn_play.png'),
        centerSlice: Rect.fromLTRB(120, 80, 904, 432),
        fit: BoxFit.fill,
      ),
    ),
    alignment: Alignment.center,
    child: const Text('PLAY', style: TextStyle(fontFamily: 'Fredoka', fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
  ),
)`,
  },
  {
    id: 'btn_claim',
    name: 'CLAIM Button',
    label: 'CLAIM',
    colorType: 'emerald',
    bgGradient: 'from-emerald-400 via-emerald-500 to-emerald-600',
    borderStroke: 'border-emerald-200',
    textColor: 'text-slate-950',
    dimensions: '1024 × 512',
    nineSlice: { left: 120, top: 80, right: 120, bottom: 80 },
    filename: 'btn_claim.png',
    flutterCode: `// lib/widgets/buttons/btn_claim.dart
GestureDetector(
  onTap: onClaimReward,
  child: Container(
    height: 64,
    decoration: const BoxDecoration(
      image: DecorationImage(
        image: AssetImage('assets/images/buttons/btn_claim.png'),
        centerSlice: Rect.fromLTRB(120, 80, 904, 432),
        fit: BoxFit.fill,
      ),
    ),
    alignment: Alignment.center,
    child: const Text('CLAIM', style: TextStyle(fontFamily: 'Fredoka', fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
  ),
)`,
  },
  {
    id: 'btn_upgrade',
    name: 'UPGRADE Button',
    label: 'UPGRADE',
    colorType: 'cyan',
    bgGradient: 'from-cyan-400 via-cyan-500 to-cyan-600',
    borderStroke: 'border-cyan-200',
    textColor: 'text-slate-950',
    dimensions: '1024 × 512',
    nineSlice: { left: 120, top: 80, right: 120, bottom: 80 },
    filename: 'btn_upgrade.png',
    flutterCode: `// lib/widgets/buttons/btn_upgrade.dart
GestureDetector(
  onTap: onUpgrade,
  child: Container(
    height: 64,
    decoration: const BoxDecoration(
      image: DecorationImage(
        image: AssetImage('assets/images/buttons/btn_upgrade.png'),
        centerSlice: Rect.fromLTRB(120, 80, 904, 432),
        fit: BoxFit.fill,
      ),
    ),
    alignment: Alignment.center,
    child: const Text('UPGRADE', style: TextStyle(fontFamily: 'Fredoka', fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
  ),
)`,
  },
  {
    id: 'btn_inventory',
    name: 'INVENTORY Button',
    label: 'INVENTORY',
    colorType: 'bronze',
    bgGradient: 'from-amber-800 via-amber-900 to-stone-900',
    borderStroke: 'border-amber-700',
    textColor: 'text-amber-100',
    dimensions: '1024 × 512',
    nineSlice: { left: 120, top: 80, right: 120, bottom: 80 },
    filename: 'btn_inventory.png',
    flutterCode: `// lib/widgets/buttons/btn_inventory.dart
GestureDetector(
  onTap: onOpenInventory,
  child: Container(
    height: 64,
    decoration: const BoxDecoration(
      image: DecorationImage(
        image: AssetImage('assets/images/buttons/btn_inventory.png'),
        centerSlice: Rect.fromLTRB(120, 80, 904, 432),
        fit: BoxFit.fill,
      ),
    ),
    alignment: Alignment.center,
    child: const Text('INVENTORY', style: TextStyle(fontFamily: 'Fredoka', fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFFFEF3C7))),
  ),
)`,
  },
  {
    id: 'btn_start_adventure',
    name: 'START ADVENTURE (Splash)',
    label: 'START ADVENTURE',
    colorType: 'golden',
    bgGradient: 'from-amber-400 via-amber-500 to-amber-600',
    borderStroke: 'border-amber-300',
    textColor: 'text-slate-950',
    dimensions: '1024 × 512',
    nineSlice: { left: 140, top: 90, right: 140, bottom: 90 },
    filename: 'btn_start_adventure.png',
    flutterCode: `// lib/widgets/buttons/btn_start_adventure.dart
Row(
  children: [
    Image.asset('assets/images/icons/ic_compass_badge.png', width: 56, height: 56),
    Expanded(
      child: Container(
        height: 72,
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/buttons/btn_start_adventure.png'),
            centerSlice: Rect.fromLTRB(140, 90, 884, 422),
            fit: BoxFit.fill,
          ),
        ),
        alignment: Alignment.center,
        child: const Text('START ADVENTURE', style: TextStyle(fontSize: 26, fontWeight: FontWeight.black, color: Colors.white)),
      ),
    ),
  ],
)`,
  },
  {
    id: 'btn_sign_in',
    name: 'SIGN IN Button',
    label: 'SIGN IN',
    colorType: 'bronze',
    bgGradient: 'from-slate-900 via-slate-950 to-slate-900',
    borderStroke: 'border-amber-500/50',
    textColor: 'text-amber-200',
    dimensions: '1024 × 512',
    nineSlice: { left: 120, top: 80, right: 120, bottom: 80 },
    filename: 'btn_sign_in.png',
    flutterCode: `// lib/widgets/buttons/btn_sign_in.dart
Container(
  height: 52,
  decoration: const BoxDecoration(
    image: DecorationImage(
      image: AssetImage('assets/images/buttons/btn_sign_in.png'),
      centerSlice: Rect.fromLTRB(120, 80, 904, 432),
      fit: BoxFit.fill,
    ),
  ),
  alignment: Alignment.center,
  child: const Text('SIGN IN', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFFFDE68A))),
)`,
  },
];

// -----------------------------------------------------------------------------
// 2. ALL CHARACTER BASES (Base 1 to 8)
// -----------------------------------------------------------------------------
export const CHARACTER_BASES: CharacterBase[] = [
  {
    id: 'base_1',
    baseNumber: 1,
    name: 'Scout',
    title: 'The Spirited Aviator',
    gender: 'Boy',
    hair: 'Messy Chestnut Brown Shag',
    eyes: 'Warm Amber-Hazel',
    skinTone: 'Sun-Kissed Light',
    headwear: 'None (Brass Goggles on Collar)',
    signatureClothing: 'Explorer tunic with suspenders, olive shorts, buckled boots',
    personality: 'Curious, optimistic, relentless dreamer',
    passivePerk: '+10% Movement Speed across sky bridges',
    defaultOutfit: 'explorer',
    avatar: '🧑‍✈️',
    palette: { hairColor: '#78350F', skinColor: '#FDE047', accentColor: '#D97706' },
    lore: 'An eager young aviator from Sprout Keep who dreams of commanding a great cloud galleon and mapping the uncharted Aether Depths.',
    stats: { baseAgility: 75, baseStrength: 65, baseWisdom: 60 },
  },
  {
    id: 'base_2',
    baseNumber: 2,
    name: 'Aria',
    title: 'The Wind Whisperer',
    gender: 'Girl',
    hair: 'Fiery Auburn Curly Pigtails',
    eyes: 'Luminous Emerald Green',
    skinTone: 'Fair with Soft Freckles',
    headwear: 'Brass Double-Lens Aviator Goggles',
    signatureClothing: 'Green cargo adventurer tee with vibrant orange flight bandana',
    personality: 'Spirited, observant, instinctive glider',
    passivePerk: '+15% Glider Altitude Retention in thermals',
    defaultOutfit: 'pilot',
    avatar: '👧',
    palette: { hairColor: '#C2410C', skinColor: '#FEF08A', accentColor: '#EA580C' },
    lore: 'Raised amidst the high wind towers of Windmill Heights, Aria can detect a coming wind shear hours before any barometer.',
    stats: { baseAgility: 85, baseStrength: 55, baseWisdom: 65 },
  },
  {
    id: 'base_3',
    baseNumber: 3,
    name: 'Leo',
    title: 'The Cloud Diver',
    gender: 'Boy',
    hair: 'Bright Textured Blonde Spikes',
    eyes: 'Sky Cerulean Blue',
    skinTone: 'Light Golden',
    headwear: 'Streamlined Brass Pilot Goggles',
    signatureClothing: 'Open cobalt flight vest over scarlet tee with denim shorts',
    personality: 'Daring, cheerful, adrenaline enthusiast',
    passivePerk: '+20% Critical Stamina Recovery after stunts',
    defaultOutfit: 'sky_captain',
    avatar: '👦',
    palette: { hairColor: '#FBBF24', skinColor: '#FEF08A', accentColor: '#2563EB' },
    lore: 'Famous for free-diving from Cloud Falls onto passing supply airships, Leo treats every floating island as his personal playground.',
    stats: { baseAgility: 80, baseStrength: 70, baseWisdom: 50 },
  },
  {
    id: 'base_4',
    baseNumber: 4,
    name: 'Malik',
    title: 'The Forge Apprentice',
    gender: 'Boy',
    hair: 'Dark Brown Textured Afro Curls',
    eyes: 'Warm Espresso Brown',
    skinTone: 'Deep Warm Umber',
    headwear: 'Polished Bronze Goggles above Forehead',
    signatureClothing: 'Ochre scout harness with cross-body tool bandolier',
    personality: 'Steady, inventive, dependable craftsman',
    passivePerk: '+20% Mechanical Tool & Hammer Durability',
    defaultOutfit: 'engineer',
    avatar: '🧑🏾',
    palette: { hairColor: '#292524', skinColor: '#78350F', accentColor: '#F59E0B' },
    lore: 'Apprenticed to the legendary master smiths of Sprout Keep, Malik can repair an airship boiler engine blindfolded.',
    stats: { baseAgility: 60, baseStrength: 85, baseWisdom: 65 },
  },
  {
    id: 'base_5',
    baseNumber: 5,
    name: 'Maya',
    title: 'The Canopy Tracker',
    gender: 'Girl',
    hair: 'Dark Brunette High Bun with Teal Wrap',
    eyes: 'Golden Hazel',
    skinTone: 'Warm Olive Tan',
    headwear: 'Teal Silk Aviator Scarf & Hair Wrap',
    signatureClothing: 'Beige expedition tunic with brass cinch belt and utility pouches',
    personality: 'Calm, patient, deeply connected to nature',
    passivePerk: '+25% Plant & Leaf Foraging Yield',
    defaultOutfit: 'ranger',
    avatar: '👧🏽',
    palette: { hairColor: '#1C1917', skinColor: '#D97706', accentColor: '#0D9488' },
    lore: 'Knows every secret branch and hollow in the Great Sprout Tree, guiding lost travelers safely past carnivorous cloud vines.',
    stats: { baseAgility: 80, baseStrength: 65, baseWisdom: 70 },
  },
  {
    id: 'base_6',
    baseNumber: 6,
    name: 'Finn',
    title: 'The Harbor Lookout',
    gender: 'Boy',
    hair: 'Neat Chestnut Brown under Cap',
    eyes: 'Chestnut Brown',
    skinTone: 'Light Tan',
    headwear: 'Backwards Navy Blue & White Flight Cap',
    signatureClothing: 'Khaki multi-pocket flight vest with tangerine neckerchief',
    personality: 'Vigilant, friendly, master of flag signals',
    passivePerk: '+15% Discovery Radius on World Map fog',
    defaultOutfit: 'nomad',
    avatar: '🧢',
    palette: { hairColor: '#57534E', skinColor: '#FEF08A', accentColor: '#0284C7' },
    lore: 'Perched on the highest mooring mast of Cloud Falls, Finn records every vessel entering the Sprout Archipelago.',
    stats: { baseAgility: 70, baseStrength: 65, baseWisdom: 75 },
  },
  {
    id: 'base_7',
    baseNumber: 7,
    name: 'Ruby',
    title: 'The Aether Alchemist',
    gender: 'Girl',
    hair: 'Vibrant Magenta Waves with Side Bangs',
    eyes: 'Luminous Violet',
    skinTone: 'Porcelain Fair',
    headwear: 'Rose-Gold Aviator Goggles with Pink Lenses',
    signatureClothing: 'Lilac & rose aviator jacket with brass clasps and pink boots',
    personality: 'Playful, brilliant, crystal researcher',
    passivePerk: '+20% Potion & Elixir Potency',
    defaultOutfit: 'scholar',
    avatar: '👩🏻‍🦰',
    palette: { hairColor: '#DB2777', skinColor: '#FEF08A', accentColor: '#A855F7' },
    lore: 'Extracts glowing aether luminescence from Storm Reef crystals to formulate dazzling potions that defy gravity.',
    stats: { baseAgility: 65, baseStrength: 50, baseWisdom: 90 },
  },
  {
    id: 'base_8',
    baseNumber: 8,
    name: 'Oliver',
    title: 'The Starlight Cartographer',
    gender: 'Boy',
    hair: 'Dark Wavy Tousled Hair with Wire Glasses',
    eyes: 'Deep Forest Green',
    skinTone: 'Light Ivory',
    headwear: 'Round Brass-Wire Reading Glasses',
    signatureClothing: 'Olive scholar overcoat with smart burgundy necktie',
    personality: 'Scholarly, thorough, ancient history expert',
    passivePerk: '+20% Quest Completion Bonus Gold & Stars',
    defaultOutfit: 'desert',
    avatar: '👓',
    palette: { hairColor: '#1C1917', skinColor: '#FEF08A', accentColor: '#16A34A' },
    lore: 'Spends clear nights in the high Sky Observatory mapping celestial constellations and deciphering the ruins of Sunridge.',
    stats: { baseAgility: 55, baseStrength: 55, baseWisdom: 95 },
  },
];

// -----------------------------------------------------------------------------
// 3. ALL CLOTHING / ARMOR OUTFITS (MODULAR SETS)
// -----------------------------------------------------------------------------
export const ARMOR_OUTFITS: ArmorOutfit[] = [
  {
    id: 'explorer',
    name: 'Explorer Suit',
    theme: 'Standard Skyfarer',
    rarity: 'Common',
    armorType: 'Light',
    stats: { defense: 25, agility: 40, warmth: 30 },
    headgear: 'Brass Aviator Goggles & Leather Strap',
    torso: 'Canvas Explorer Vest with Orange Neckerchief',
    legs: 'Durable Khaki Utility Shorts',
    boots: 'Reinforced Hiking Boots with Brass Buckles',
    palette: { primary: '#B45309', secondary: '#F59E0B', accent: '#EA580C' },
    icon: '🧭',
    description: 'The iconic SkySprout explorer outfit. Flexible, weather-resistant, and loaded with pockets for sky maps and seeds.',
  },
  {
    id: 'sky_captain',
    name: 'Sky Captain Regalia',
    theme: 'Naval Aviation',
    rarity: 'Epic',
    armorType: 'Heavy',
    stats: { defense: 60, agility: 35, warmth: 45 },
    headgear: 'Navy Flight Cap with Gold Oak Leaf Visor',
    torso: 'Tailored Indigo Naval Coat with Gold Epaulets',
    legs: 'Pressed Royal Blue Flight Trousers',
    boots: 'Polished High-Shine Officer Boots',
    palette: { primary: '#1E3A8A', secondary: '#FBBF24', accent: '#3B82F6' },
    icon: '⚓',
    description: 'Worn by commanders of the great cloud galleons. Imparts authority and superior aerial resistance.',
  },
  {
    id: 'engineer',
    name: 'Engineer Rig',
    theme: 'Steam & Machinery',
    rarity: 'Rare',
    armorType: 'Heavy',
    stats: { defense: 50, agility: 20, warmth: 50 },
    headgear: 'Heavy Welding Visor & Flip Goggles',
    torso: 'Tanned Leather Work Overalls with Wrench Loops',
    legs: 'Riveted Heavy Denim Pants',
    boots: 'Steel-Toe Heat-Proof Work Boots',
    palette: { primary: '#78350F', secondary: '#D97706', accent: '#92400E' },
    icon: '🔧',
    description: 'Reinforced to withstand boiler heat and propeller backdrafts. +20% airship repair speed.',
  },
  {
    id: 'ranger',
    name: 'Sky Garden Ranger',
    theme: 'Flora & Sprout Magic',
    rarity: 'Rare',
    armorType: 'Light',
    stats: { defense: 30, agility: 55, warmth: 25 },
    headgear: 'Robin-Style Green Felt Hat with Sprout Feather',
    torso: 'Forest Green Tunic with Brass Vine Buckles',
    legs: 'Tailored Olive Breeches',
    boots: 'Silent Woodland Suede Boots',
    palette: { primary: '#15803D', secondary: '#86EFAC', accent: '#FDE047' },
    icon: '🏹',
    description: 'Forged with woven leaves from the Great Sprout Tree. Boosts movement speed on sky suspension bridges.',
  },
  {
    id: 'nomad',
    name: 'Cloud Nomad Attire',
    theme: 'Wind & Desert Drift',
    rarity: 'Common',
    armorType: 'Light',
    stats: { defense: 20, agility: 50, warmth: 35 },
    headgear: 'Crimson Broad-Brim Sun Shield Hat',
    torso: 'Breezy Ochre Poncho with Desert Waist Cinch',
    legs: 'Loose Sand-Tolerant Linen Trousers',
    boots: 'Wrap-Around Leather Sand Gaiters',
    palette: { primary: '#DC2626', secondary: '#F97316', accent: '#FDE047' },
    icon: '🏜️',
    description: 'Designed for voyaging through Sunridge Canyon and dry dust currents without overheating.',
  },
  {
    id: 'scholar',
    name: 'Aether Scholar Robes',
    theme: 'Arcane Stargazing',
    rarity: 'Legendary',
    armorType: 'Medium',
    stats: { defense: 40, agility: 25, warmth: 60 },
    headgear: 'Pointed Velvet Astrologer Hat with Brass Astrolabe',
    torso: 'Deep Violet Velvet Robe with Star Charts',
    legs: 'Silk Midnight Trousers',
    boots: 'Gold-Embossed Velvet Slippers',
    palette: { primary: '#581C87', secondary: '#C084FC', accent: '#FDE047' },
    icon: '📜',
    description: 'Infused with ancient starlight from the Sky Observatory. Reveals hidden treasure nodes on the world map.',
  },
  {
    id: 'pilot',
    name: 'Ace Pilot Bomber',
    theme: 'High Altitude Flight',
    rarity: 'Epic',
    armorType: 'Medium',
    stats: { defense: 45, agility: 60, warmth: 55 },
    headgear: 'White Shearling Leather Flight Cap & Tinted Lens',
    torso: 'Cobalt Blue Bomber Jacket with Fur Lapels',
    legs: 'Reinforced Flight Harness Pants',
    boots: 'High-Altitude Fur-Lined Pilot Boots',
    palette: { primary: '#2563EB', secondary: '#E2E8F0', accent: '#F59E0B' },
    icon: '🛩️',
    description: 'Custom tailored for high-speed dive gliders. Reduces wind drag by 30%.',
  },
  {
    id: 'arctic',
    name: 'Frost Peak Parka',
    theme: 'Snow & Storm Spire',
    rarity: 'Legendary',
    armorType: 'Heavy',
    stats: { defense: 70, agility: 20, warmth: 95 },
    headgear: 'Giant White Fox Fur Hood & Snow Goggles',
    torso: 'Quilted Glacial Blue Insulated Coat',
    legs: 'Thermal Snow Pants with Knee Plates',
    boots: 'Heavy Spiked Ice-Climber Boots',
    palette: { primary: '#0284C7', secondary: '#F8FAFC', accent: '#38BDF8' },
    icon: '❄️',
    description: 'Immune to freezing winds and frost storm debuffs in the upper troposphere.',
  },
  {
    id: 'desert',
    name: 'Sunridge Safari Suit',
    theme: 'Sun & Archaeology',
    rarity: 'Rare',
    armorType: 'Medium',
    stats: { defense: 35, agility: 45, warmth: 15 },
    headgear: 'Tan Safari Fedora with Emerald Sprout Leaf',
    torso: 'Breathable Khaki Multi-Pocket Safari Shirt',
    legs: 'Tough Canvas Trail Pants',
    boots: 'Lightweight Breathable Trekking Boots',
    palette: { primary: '#A16207', secondary: '#FEF08A', accent: '#15803D' },
    icon: '☀️',
    description: 'Perfect for excavating ancient cloud ruins in Sunridge without succumbing to sun fatigue.',
  },
];

// -----------------------------------------------------------------------------
// 4. ALL WEAPONS & TOOLS (With 3-Tier Evolutions)
// -----------------------------------------------------------------------------
export const WEAPONS_AND_TOOLS_EXPANDED: WeaponTool[] = [
  {
    id: 'hammer',
    name: 'Clockwork Hammer',
    type: 'Melee / Hammer',
    element: 'Physical',
    icon: '🔨',
    tier1: { name: 'Bronze Forge Mallet', damage: 15, material: 'Polished Oak & Cast Bronze' },
    tier2: { name: 'Pneumatic Steam Hammer', damage: 35, material: 'Brass Piston & Steam Gauge' },
    tier3: { name: 'Aether Core Warhammer', damage: 75, material: 'Cyan Energy Rotor & Damascus Brass' },
    description: 'Essential for both repairing airship hulls and knocking away troublesome sky gremlins.',
  },
  {
    id: 'blaster',
    name: 'Steam Pressure Blaster',
    type: 'Ranged / Blaster',
    element: 'Steam',
    icon: '🔫',
    tier1: { name: 'Hand Piston Peashooter', damage: 12, material: 'Wooden Stock & Copper Pipe' },
    tier2: { name: 'Double-Barrel Cloud Cannon', damage: 32, material: 'Brass Pressure Reservoir' },
    tier3: { name: 'Tesla Coil Plasma Raygun', damage: 70, material: 'Electrified Violet Energy Chamber' },
    description: 'Launches pressurized bursts of condensed cloud air to propel mechanisms or repel sky pests.',
  },
  {
    id: 'net',
    name: 'Golden Bug Net',
    type: 'Gathering',
    element: 'Nature',
    icon: '🕸️',
    tier1: { name: 'Hemp Twine Net', damage: 5, material: 'Rope & Birch Handle' },
    tier2: { name: 'Silk Gossamer Web', damage: 14, material: 'Treated Sprout Silk' },
    tier3: { name: 'Golden Aether Catcher', damage: 30, material: 'Spun Gold Filament & Ruby Gem' },
    description: 'Catches shimmering cloud wisps, rare sky moths, and drifting magical floating seeds.',
  },
  {
    id: 'crossbow',
    name: 'Sky Crossbow & Harpoon',
    type: 'Ranged / Blaster',
    element: 'Physical',
    icon: '🏹',
    tier1: { name: 'Wooden Scout Bow', damage: 18, material: 'Ash Wood & Sinew' },
    tier2: { name: 'Twin-Limb Brass Crossbow', damage: 40, material: 'Spring Steel & Crank Winch' },
    tier3: { name: 'Grappling Harpoon Launcher', damage: 80, material: 'Titanium Cables & Steam Propellant' },
    description: 'Fires anchor lines between floating islands for daring zipline crossings.',
  },
  {
    id: 'staff',
    name: 'Celestial Light Staff',
    type: 'Magic / Aether',
    element: 'Aether',
    icon: '🪄',
    tier1: { name: 'Carved Willow Wand', damage: 20, material: 'Willow & Glass Lens' },
    tier2: { name: 'Brass Astrolabe Scepter', damage: 45, material: 'Gilded Gyroscope Mechanism' },
    tier3: { name: 'Starlight Prism Staff', damage: 85, material: 'Pulsing Star Crystal & Gold Filigree' },
    description: 'Channels sunlight to accelerate the growth of Sprout Trees across the islands.',
  },
  {
    id: 'blade',
    name: 'Aether Crystal Blade',
    type: 'Melee / Hammer',
    element: 'Electric',
    icon: '🗡️',
    tier1: { name: 'Honed Bronze Machete', damage: 22, material: 'Tempered Bronze' },
    tier2: { name: 'Serrated Cloud Cleaver', damage: 48, material: 'Hardened Steel & Brass Hilt' },
    tier3: { name: 'Solid Light Greatsword', damage: 90, material: 'Laser-Crystallized Sky Quartz' },
    description: 'Cuts effortlessly through thick cloud vines and stubborn storm reef roots.',
  },
  {
    id: 'pickaxe',
    name: 'Aviator Mining Pick',
    type: 'Gathering',
    element: 'Physical',
    icon: '⛏️',
    tier1: { name: 'Iron Cloud Chisel', damage: 14, material: 'Iron Spike & Wooden Haft' },
    tier2: { name: 'Brass Jackhammer Pick', damage: 38, material: 'Spring-Assisted Piston Tip' },
    tier3: { name: 'Diamond-Tipped Aether Drill', damage: 72, material: 'Rotating Diamond Core' },
    description: 'Extracts precious mana crystals from floating asteroids.',
  },
  {
    id: 'boomerang',
    name: 'Skyward Twin Boomerang',
    type: 'Utility',
    element: 'Aether',
    icon: '🪃',
    tier1: { name: 'Curved Maple Boomerang', damage: 16, material: 'Varnished Hardwood' },
    tier2: { name: 'Aerodynamic Wing Blade', damage: 36, material: 'Aeroglass & Brass Weights' },
    tier3: { name: 'Hovering Vortex Glaive', damage: 75, material: 'Repulsor Core & Razor Wings' },
    description: 'Collects distant floating coins and activates remote sky switches.',
  },
  {
    id: 'rotary_cannon',
    name: 'Steampunk Rotary Aether Cannon',
    type: 'Ranged / Blaster',
    element: 'Electric',
    icon: '🔮',
    tier1: { name: 'Clockwork Triple-Barrel Blaster', damage: 25, material: 'Riveted Brass & Bronze Rotor' },
    tier2: { name: 'High-Pressure Steam Gatling', damage: 55, material: 'Forged Steel Piston & Pressure Coil' },
    tier3: { name: 'Vortex Aether Core Annihilator', damage: 95, material: 'Overcharged Cyan Plasma Cylinder & Damascus Casing' },
    description: 'Fires high-velocity pressurized bursts of lightning-infused aether to obliterate storm obstacles.',
  },
];

// -----------------------------------------------------------------------------
// 5. ALL PETS / COMPANIONS
// -----------------------------------------------------------------------------
export const PETS_EXPANDED: PetCompanion[] = [
  {
    id: 'corgi',
    name: 'Barnaby the Steampunk Corgi',
    species: 'Canine',
    perk: '+15% Gold Coin Discovery',
    icon: '🐕',
    gear: 'Leather Utility Harness, Brass ID Badge, Tail Propeller',
    description: 'A cheerful adventurer puppy who barks whenever rare chests are nearby.',
  },
  {
    id: 'cat',
    name: 'Misty the Aviator Kitty',
    species: 'Feline',
    perk: '+20% Agility on Ziplines',
    icon: '🐱',
    gear: 'Tiny Sheepskin Flight Helmet, Brass Goggles',
    description: 'A nimble grey tabby with pristine balance along the narrowest suspension ropes.',
  },
  {
    id: 'owl',
    name: 'Archimedes the Clockwork Owl',
    species: 'Mechanical Avian',
    perk: '+25% Map Fog Clearing Radius',
    icon: '🦉',
    gear: 'Triple Magnifying Monocle, Wind-up Key, Brass Feathers',
    description: 'Scouts ahead over cloud cover and maps distant floating islands.',
  },
  {
    id: 'dragon',
    name: 'Ignis the Cloud Dragon',
    species: 'Drake',
    perk: 'Provides Warmth in High Storms',
    icon: '🐲',
    gear: 'Tiny Gold Saddle, Sprout Leaf Pendant',
    description: 'A miniature red dragon who heats up camp tea and melts icy cloud rime.',
  },
  {
    id: 'drone',
    name: 'Gizmo the Aero-Drone',
    species: 'Automaton',
    perk: 'Auto-collects Nearby Dropped Items',
    icon: '🤖',
    gear: 'Quad Rotor Blades, Emotive LED Eye, Magnet Claw',
    description: 'Built by Scout in the workshop. Hovering helper with a big heart.',
  },
  {
    id: 'bunny',
    name: 'Pip the Spring Bunny',
    species: 'Lagomorph',
    perk: '+30% Jump Height on Cloud Trampolines',
    icon: '🐰',
    gear: 'Clockwork Spring Boots, Ear Goggles',
    description: 'Energetic fluffball capable of reaching secret rooftop perches.',
  },
  {
    id: 'turtle',
    name: 'Titus the Steampunk Turtle',
    species: 'Chelonian Automaton',
    perk: '+40% Shield Defense in Storm Reef',
    icon: '🐢',
    gear: 'Riveted Boiler Shell, Twin Steam Chimneys',
    description: 'Slow and steady fortress friend with an impervious brass backplate.',
  },
  {
    id: 'fox',
    name: 'Vulpix the Sky Fox',
    species: 'Vulpes',
    perk: 'Highlights Secret Puzzles & Hidden Levers',
    icon: '🦊',
    gear: 'Leather Traveler Scarf, Golden Bell',
    description: 'Intelligent kit fox who knows all the forgotten passageways of Sprout Keep.',
  },
];

// -----------------------------------------------------------------------------
// 6. ALL ITEMS & CURRENCY REWARDS
// -----------------------------------------------------------------------------
export const GAME_ITEMS: GameItemReward[] = [
  {
    id: 'gold_coin',
    name: 'Sprout Gold Coin',
    type: 'Currency',
    icon: '🪙',
    color: '#F59E0B',
    flutterSnippet: `CoinCounterWidget(amount: 2840, icon: 'assets/images/items/ic_coin.png')`,
    description: 'Standard currency minted with the Great Tree sprout insignia. Used for island upgrades and tools.',
  },
  {
    id: 'purple_gem',
    name: 'Aether Gem',
    type: 'Currency',
    icon: '💎',
    color: '#C084FC',
    flutterSnippet: `GemCounterWidget(amount: 360, icon: 'assets/images/items/ic_gem_purple.png')`,
    description: 'Rare violet crystal mined from Storm Reef. Used for legendary outfits and instant airship flight.',
  },
  {
    id: 'mana_crystal',
    name: 'Cyan Mana Shard',
    type: 'Material',
    icon: '💠',
    color: '#38BDF8',
    flutterSnippet: `ItemBadge(name: 'Mana Shard', count: 18)`,
    description: 'High-purity energy crystal powering ancient sky gates and telescope lenses.',
  },
  {
    id: 'sprout_leaf',
    name: 'Sacred Sprout Leaf',
    type: 'Material',
    icon: '🍃',
    color: '#22C55E',
    flutterSnippet: `ItemBadge(name: 'Sprout Leaf', count: 42)`,
    description: 'Harvested from the living branches of Sprout Keep. Vital for crafting plant elixirs.',
  },
  {
    id: 'brass_gear',
    name: 'Clockwork Gear',
    type: 'Material',
    icon: '⚙️',
    color: '#D97706',
    flutterSnippet: `ItemBadge(name: 'Brass Gear', count: 95)`,
    description: 'Precision milled brass cog for repairing windmills, airships, and robotic companions.',
  },
  {
    id: 'golden_key',
    name: 'Sky Warden Key',
    type: 'Artifact',
    icon: '🗝️',
    color: '#FBBF24',
    flutterSnippet: `ItemBadge(name: 'Warden Key', count: 3)`,
    description: 'Unlocks golden treasure chests and opens the sealed archway to Sunridge Canyon.',
  },
  {
    id: 'treasure_chest',
    name: 'Carved Wood Chest',
    type: 'Artifact',
    icon: '📦',
    color: '#92400E',
    flutterSnippet: `ChestRewardWidget(status: ChestStatus.readyToClaim)`,
    description: 'Full of gold coins, outfits, and gear upon completing all 4 daily habit quests.',
  },
  {
    id: 'sky_map',
    name: 'Aether Cartography Scroll',
    type: 'Artifact',
    icon: '📜',
    color: '#FEF3C7',
    flutterSnippet: `MapScrollWidget(zone: 'Sprout Keep')`,
    description: 'A detailed parchment map of wind thermals and hidden cloud caverns.',
  },
  {
    id: 'health_heart',
    name: 'Vitality Heart',
    type: 'Consumable',
    icon: '❤️',
    color: '#EF4444',
    flutterSnippet: `HealthBarWidget(current: 5, max: 5)`,
    description: 'Replenishes courage and energy when exploring stormy skies.',
  },
  {
    id: 'stamina_bolt',
    name: 'Lightning Fuel Cell',
    type: 'Consumable',
    icon: '⚡',
    color: '#FACC15',
    flutterSnippet: `StaminaCellWidget(charge: 100)`,
    description: 'Supercharges propeller speed for 60 seconds.',
  },
  {
    id: 'golden_compass',
    name: 'Navigator Sun Compass',
    type: 'Artifact',
    icon: '🧭',
    color: '#F59E0B',
    flutterSnippet: `CompassIndicatorWidget(heading: 142)`,
    description: 'Points toward the next available quest objective anywhere in the world.',
  },
  {
    id: 'sprout_elixir',
    name: 'Elixir of Growth',
    type: 'Consumable',
    icon: '🧪',
    color: '#10B981',
    flutterSnippet: `PotionSlot(type: PotionType.growth)`,
    description: 'Watering plants with this instantly blooms rare level-up flowers.',
  },
  {
    id: 'rolled_scroll',
    name: 'Rolled Expedition Parchment',
    type: 'Artifact',
    icon: '📜',
    color: '#FDE68A',
    flutterSnippet: `ParchmentWidget(title: 'Sprout Keep Lore')`,
    description: 'Ancient architectural blueprints for building sky bridges and airship moorings.',
  },
  {
    id: 'seed_pouch',
    name: 'Sprout Seedling & Acorns',
    type: 'Material',
    icon: '🌰',
    color: '#84CC16',
    flutterSnippet: `ItemBadge(name: 'Seed Pouch', count: 12)`,
    description: 'Fertile seedlings from the Grand Sprout Tree to plant in sky garden pots.',
  },
  {
    id: 'lightning_potion',
    name: 'Aether Lightning Flask',
    type: 'Consumable',
    icon: '⚡',
    color: '#38BDF8',
    flutterSnippet: `PotionSlot(type: PotionType.lightning)`,
    description: 'Glowing blue potion that temporarily grants supersonic glider flight.',
  },
  {
    id: 'aether_flask',
    name: 'Violet Storm Elixir',
    type: 'Consumable',
    icon: '🔮',
    color: '#C084FC',
    flutterSnippet: `PotionSlot(type: PotionType.stormShield)`,
    description: 'Extract of Storm Spire crystals that protects the airship from thunder strikes.',
  },
  {
    id: 'lightning_cell',
    name: 'Steam Galvanic Battery',
    type: 'Material',
    icon: '🔋',
    color: '#EAB308',
    flutterSnippet: `BatteryIndicator(chargePercent: 95)`,
    description: 'High-density steam power cell for operating heavy mechanical drills.',
  },
];

export interface DockIconItem {
  id: string;
  name: string;
  icon: string;
  badge?: number;
  route: string;
}

export const DOCK_ICONS: DockIconItem[] = [
  { id: 'map', name: 'Map', icon: '🗺️', route: '/map' },
  { id: 'quests', name: 'Quests', icon: '📜', badge: 3, route: '/quests' },
  { id: 'shop', name: 'Shop', icon: '🎪', route: '/shop' },
  { id: 'settings', name: 'Settings', icon: '⚙️', route: '/settings' },
  { id: 'mail', name: 'Mail', icon: '✉️', badge: 2, route: '/mail' },
  { id: 'trophy', name: 'Trophy', icon: '🏆', route: '/achievements' },
  { id: 'events', name: 'Events', icon: '📅', route: '/events' },
];

// -----------------------------------------------------------------------------
// 7. BACKGROUNDS LIST (19 ASSETS)
// -----------------------------------------------------------------------------
export const BACKGROUNDS_LIST: BackgroundItem[] = [
  {
    id: 'splash',
    name: '1. SPLASH SCREEN',
    category: 'phone',
    targetWidth: 1440,
    targetHeight: 2960,
    deviceType: 'Phone',
    filename: 'bg_splash.png',
    description: 'Golden hour overlook of floating sky islands, distant sunspire castle, and sailing airships. Features bronze compass button and EXPLORE • BUILD • GROW subtitle.',
    mood: 'Epic Dawn, Wonder, Whimsical',
    baseImage: GENERATED_ASSETS.splash,
    accentColor: '#F59E0B',
    features: ['Golden hour cloud ocean', 'Steampunk wooden overlook', 'Bronze compass icon frame', 'EXPLORE • BUILD • GROW subtitle area'],
    dartSnippet: `// lib/screens/splash_screen.dart
Container(
  decoration: const BoxDecoration(
    image: DecorationImage(
      image: AssetImage('assets/images/backgrounds/bg_splash.png'),
      fit: BoxFit.cover,
      alignment: Alignment.center,
    ),
  ),
  child: Center(
    child: HeroTitleWidget(tagline: 'EXPLORE • BUILD • GROW'),
  ),
)`,
  },
  {
    id: 'login',
    name: '2. LOGIN / SIGN UP',
    category: 'phone',
    targetWidth: 1440,
    targetHeight: 2960,
    deviceType: 'Phone',
    filename: 'bg_login.png',
    description: 'Skyport traveler lodge with brass warm lanterns, scenic mountain cloud peaks, and soft centered space for credentials input.',
    mood: 'Welcoming, Warm Amber, Cozy',
    baseImage: GENERATED_ASSETS.splash,
    accentColor: '#D97706',
    features: ['Vignetted center for forms', 'Warm brass lantern glow', 'Soft sky mist gradient', 'Grounding wooden timber'],
    dartSnippet: `// lib/screens/login_screen.dart
Scaffold(
  body: Container(
    width: double.infinity,
    height: double.infinity,
    decoration: const BoxDecoration(
      image: DecorationImage(
        image: AssetImage('assets/images/backgrounds/bg_login.png'),
        fit: BoxFit.cover,
      ),
    ),
    child: SafeArea(
      child: LoginFormOverlay(),
    ),
  ),
)`,
  },
  {
    id: 'home_phone',
    name: '3. HOME SCREEN (PHONE)',
    category: 'phone',
    targetWidth: 1440,
    targetHeight: 2960,
    deviceType: 'Phone',
    filename: 'bg_home_phone.png',
    description: 'Vertical sky realm base camp with floating greenery, Scout baseplate, sunny sky cascades, and room for bottom dock & top status bars.',
    mood: 'Sunny Adventure, Vibrant Sky Blue',
    baseImage: GENERATED_ASSETS.quests,
    accentColor: '#10B981',
    features: ['Clear top & bottom zones', 'Floating island stepping stones', 'Lush foliage accents', 'Bright clear sky'],
    dartSnippet: `// lib/screens/home_phone_screen.dart
Stack(
  children: [
    Positioned.fill(
      child: Image.asset(
        'assets/images/backgrounds/bg_home_phone.png',
        fit: BoxFit.cover,
      ),
    ),
    SafeArea(
      child: Column(
        children: [
          TopUserStatusBar(level: 18, gold: 2840, gems: 360),
          Expanded(child: HomeQuickActionFeed()),
          FloatingDockNavigation(),
        ],
      ),
    ),
  ],
)`,
  },
  {
    id: 'home_tablet',
    name: '4. HOME SCREEN (TABLET)',
    category: 'tablet',
    targetWidth: 2732,
    targetHeight: 2048,
    deviceType: 'Tablet',
    filename: 'bg_home_tablet.png',
    description: 'Expansive 4:3 high-definition sky kingdom featuring the Grand Sprout Keep, Windmill Heights, and soaring steampunk airships.',
    mood: 'Majestic, Wide-Angle, Vibrant',
    baseImage: GENERATED_ASSETS.worldMap,
    accentColor: '#0EA5E9',
    features: ['2732x2048 Native Retina', 'Balanced center horizon', 'Lush Sprout Keep canopy', 'Crystal reef horizon'],
    dartSnippet: `// lib/screens/home_tablet_screen.dart
Widget build(BuildContext context) {
  return Container(
    decoration: const BoxDecoration(
      image: DecorationImage(
        image: AssetImage('assets/images/backgrounds/bg_home_tablet.png'),
        fit: BoxFit.cover,
      ),
    ),
    child: TabletTwoColumnLayout(),
  );
}`,
  },
  {
    id: 'world_map',
    name: '5. WORLD MAP',
    category: 'tablet',
    targetWidth: 2732,
    targetHeight: 2048,
    deviceType: 'Tablet',
    filename: 'bg_world_map.png',
    description: 'Archipelago map background for 6 nodes: 1. Sprout Keep (⭐12/15), 2. Cloud Falls (⭐8/15), 3. Sky Observatory (⭐5/15), 4. Sunridge (⭐0/15), 5. Storm Spire, 6. Aether Depths.',
    mood: 'Expansive Map, Golden Dawn, Clouds',
    baseImage: GENERATED_ASSETS.worldMap,
    accentColor: '#3B82F6',
    features: ['Six canonical island zones', 'Optimal pathing contrast', 'Floating island clusters', 'Natural cloud borders'],
    dartSnippet: `// lib/screens/world_map_screen.dart
InteractiveViewer(
  boundaryMargin: const EdgeInsets.all(40),
  minScale: 0.8,
  maxScale: 2.5,
  child: Stack(
    children: [
      Image.asset(
        'assets/images/backgrounds/bg_world_map.png',
        width: 2732,
        height: 2048,
        fit: BoxFit.cover,
      ),
      WorldMapNodePin(name: '1. SPROUT KEEP', stars: '12/15', position: Offset(840, 680)),
      WorldMapNodePin(name: '2. CLOUD FALLS', stars: '8/15', position: Offset(1320, 1140)),
      WorldMapNodePin(name: '3. SKY OBSERVATORY', stars: '5/15', position: Offset(1580, 520)),
      WorldMapNodePin(name: '4. SUNRIDGE', stars: '0/15', isLocked: true, position: Offset(2040, 410)),
      WorldMapNodePin(name: '5. STORM SPIRE', isLocked: true, position: Offset(1980, 890)),
      WorldMapNodePin(name: '6. AETHER DEPTHS', isLocked: true, position: Offset(1860, 1260)),
    ],
  ),
)`,
  },
  {
    id: 'quests',
    name: '6. QUESTS SCREEN',
    category: 'phone',
    targetWidth: 1440,
    targetHeight: 2960,
    deviceType: 'Phone',
    filename: 'bg_quests.png',
    description: 'Sunlit ancient stone terrace sanctuary surrounded by carved wooden pillars, warm burning torches, and dais for the quest chest.',
    mood: 'Rewarding, Warm Sunlight, Sacred',
    baseImage: GENERATED_ASSETS.quests,
    accentColor: '#F59E0B',
    features: ['Warm torch flame lighting', 'Central stone circular dais', 'Soft valley river depth', 'Banner trim accents'],
    dartSnippet: `// lib/screens/quests_screen.dart
Scaffold(
  body: Container(
    decoration: const BoxDecoration(
      image: DecorationImage(
        image: AssetImage('assets/images/backgrounds/bg_quests.png'),
        fit: BoxFit.cover,
      ),
    ),
    child: DailyQuestsOverlayList(
      completedCount: 3,
      totalCount: 4,
    ),
  ),
)`,
  },
  {
    id: 'inventory',
    name: '7. INVENTORY SCREEN',
    category: 'phone',
    targetWidth: 1440,
    targetHeight: 2960,
    deviceType: 'Phone',
    filename: 'bg_inventory.png',
    description: 'Steampunk aviator backpack interior with rich oak wood shelving, brass corner rivets, and warm velvet pockets for gear slots.',
    mood: 'Craftsman, Brass & Leather, Tactile',
    baseImage: GENERATED_ASSETS.dashboard,
    accentColor: '#8B5CF6',
    features: ['Darker contrast for item cards', 'Polished mahogany wood tone', 'Brass mechanical accents', 'Ambient lantern warmth'],
    dartSnippet: `// lib/screens/inventory_screen.dart
Container(
  decoration: const BoxDecoration(
    image: DecorationImage(
      image: AssetImage('assets/images/backgrounds/bg_inventory.png'),
      fit: BoxFit.cover,
    ),
  ),
  child: GridView.builder(
    padding: const EdgeInsets.all(16),
    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 4),
    itemBuilder: (ctx, i) => InventorySlotCard(slotIndex: i),
  ),
)`,
  },
  {
    id: 'character_gear',
    name: '8. CHARACTER / GEAR SCREEN',
    category: 'phone',
    targetWidth: 1440,
    targetHeight: 2960,
    deviceType: 'Phone',
    filename: 'bg_character.png',
    description: 'Floating sky dais spotlight stage with gentle upward draft particles, glowing runes, and sky horizon for outfit previewing.',
    mood: 'Heroic, Clean Focus, Luminous',
    baseImage: GENERATED_ASSETS.quests,
    accentColor: '#EC4899',
    features: ['Focused character spotlight', 'Gentle floating leaf motes', 'Runed circular platform', 'Clean upper outfit space'],
    dartSnippet: `// lib/screens/character_screen.dart
Stack(
  children: [
    Positioned.fill(
      child: Image.asset(
        'assets/images/backgrounds/bg_character.png',
        fit: BoxFit.cover,
      ),
    ),
    Positioned(
      bottom: 220,
      left: 0,
      right: 0,
      child: CharacterModelViewer(characterId: 'scout_base_1'),
    ),
    OutfitSelectorBar(),
  ],
)`,
  },
  {
    id: 'rewards',
    name: '9. REWARDS SCREEN',
    category: 'phone',
    targetWidth: 1440,
    targetHeight: 2960,
    deviceType: 'Phone',
    filename: 'bg_rewards.png',
    description: 'Golden celebratory burst with god-rays, floating emerald gems, and gleaming cloud pillars for chest unlock & level up.',
    mood: 'Joyful, Jubilant, Golden Rays',
    baseImage: GENERATED_ASSETS.splash,
    accentColor: '#EAB308',
    features: ['Dynamic radial god-rays', 'Sparkling golden shimmer', 'Center podium for treasure chest', 'High dopamine contrast'],
    dartSnippet: `// lib/screens/rewards_screen.dart
Container(
  decoration: const BoxDecoration(
    image: DecorationImage(
      image: AssetImage('assets/images/backgrounds/bg_rewards.png'),
      fit: BoxFit.cover,
    ),
  ),
  child: RewardChestAnimationWidget(),
)`,
  },
  {
    id: 'achievements',
    name: '10. ACHIEVEMENTS SCREEN',
    category: 'phone',
    targetWidth: 1440,
    targetHeight: 2960,
    deviceType: 'Phone',
    filename: 'bg_achievements.png',
    description: 'Sky Champions Hall with carved stone arches, polished brass trophy pedestals, and majestic banners fluttering in cloud breeze.',
    mood: 'Prestige, Grandeur, Golden Embers',
    baseImage: GENERATED_ASSETS.quests,
    accentColor: '#6366F1',
    features: ['Symmetrical architectural columns', 'Warm ceremonial torches', 'Deep rich shadows for badges', 'Distant mountain vista'],
    dartSnippet: `// lib/screens/achievements_screen.dart
Scaffold(
  body: Container(
    decoration: const BoxDecoration(
      image: DecorationImage(
        image: AssetImage('assets/images/backgrounds/bg_achievements.png'),
        fit: BoxFit.cover,
      ),
    ),
    child: AchievementTrophyScroll(),
  ),
)`,
  },
  {
    id: 'settings',
    name: '11. SETTINGS SCREEN',
    category: 'phone',
    targetWidth: 1440,
    targetHeight: 2960,
    deviceType: 'Phone',
    filename: 'bg_settings.png',
    description: 'Subtle mechanical brass clockwork gears on rich dark mahogany wood paneling, non-distracting background for toggles and sliders.',
    mood: 'Refined, Precision, Dark Warm Wood',
    baseImage: GENERATED_ASSETS.dashboard,
    accentColor: '#64748B',
    features: ['Low-contrast center area', 'Intricate brass gear corners', 'Muted dark wooden grain', 'Readable UI text backdrop'],
    dartSnippet: `// lib/screens/settings_screen.dart
Container(
  decoration: const BoxDecoration(
    image: DecorationImage(
      image: AssetImage('assets/images/backgrounds/bg_settings.png'),
      fit: BoxFit.cover,
    ),
  ),
  child: SettingsListWidget(),
)`,
  },
  {
    id: 'parent_dashboard',
    name: '12. PARENT DASHBOARD',
    category: 'tablet',
    targetWidth: 2732,
    targetHeight: 2048,
    deviceType: 'Tablet',
    filename: 'bg_parent_dashboard.png',
    description: 'Cozy sky navigator study with mahogany library desk, brass astrolabe, leather logbook, and arched window overlooking the cloud islands.',
    mood: 'Academic, Whimsical, Parental Warmth',
    baseImage: GENERATED_ASSETS.dashboard,
    accentColor: '#14B8A6',
    features: ['Expansive tablet layout', 'Cozy desk foreground', 'Panoramic cloud window', 'Gentle warm study lighting'],
    dartSnippet: `// lib/screens/parent_dashboard_tablet.dart
Container(
  decoration: const BoxDecoration(
    image: DecorationImage(
      image: AssetImage('assets/images/backgrounds/bg_parent_dashboard.png'),
      fit: BoxFit.cover,
    ),
  ),
  child: ParentStatsGrid(),
)`,
  },
  {
    id: 'loading',
    name: '13. LOADING SCREEN',
    category: 'phone',
    targetWidth: 1440,
    targetHeight: 2960,
    deviceType: 'Phone',
    filename: 'bg_loading.png',
    description: 'Atmospheric cloud corridor with dynamic wind vortex trails, floating island silhouettes, and soft sky-blue glow for loading spinner.',
    mood: 'Mysterious, Dynamic, Breeze',
    baseImage: GENERATED_ASSETS.splash,
    accentColor: '#38BDF8',
    features: ['Vortex cloud formation', 'Centered focus for progress indicator', 'Subtle motion trails', 'Glowing sunburst in core'],
    dartSnippet: `// lib/screens/loading_screen.dart
Stack(
  children: [
    Positioned.fill(
      child: Image.asset(
        'assets/images/backgrounds/bg_loading.png',
        fit: BoxFit.cover,
      ),
    ),
    Center(child: SkySproutPropellerSpinner()),
  ],
)`,
  },
  {
    id: 'error',
    name: '14. ERROR SCREEN',
    category: 'phone',
    targetWidth: 1440,
    targetHeight: 2960,
    deviceType: 'Phone',
    filename: 'bg_error.png',
    description: 'Playful stormy cloud puff with friendly spinning mechanical compass and gentle purple storm reef glow. Non-frightening for kids.',
    mood: 'Playful Glitch, Whimsical Thunder',
    baseImage: GENERATED_ASSETS.quests,
    accentColor: '#EF4444',
    features: ['Gentle purple storm clouds', 'Floating brass gadget with loose spring', 'High contrast center for error dialogue', 'Kid-friendly gentle aesthetic'],
    dartSnippet: `// lib/screens/error_screen.dart
Scaffold(
  body: Container(
    decoration: const BoxDecoration(
      image: DecorationImage(
        image: AssetImage('assets/images/backgrounds/bg_error.png'),
        fit: BoxFit.cover,
      ),
    ),
    child: ErrorRetryDialogue(),
  ),
)`,
  },
  {
    id: 'offline',
    name: '15. OFFLINE SCREEN',
    category: 'phone',
    targetWidth: 1440,
    targetHeight: 2960,
    deviceType: 'Phone',
    filename: 'bg_offline.png',
    description: 'Peaceful twilight sky with an airship tethered to a floating cloud lantern buoy under early evening stars and soft fireflies.',
    mood: 'Serene, Night Sky, Resting',
    baseImage: GENERATED_ASSETS.splash,
    accentColor: '#818CF8',
    features: ['Deep twilight purple & indigo', 'Glowing cloud lantern', 'Resting airship silhouette', 'No internet friendly message area'],
    dartSnippet: `// lib/screens/offline_screen.dart
Container(
  decoration: const BoxDecoration(
    image: DecorationImage(
      image: AssetImage('assets/images/backgrounds/bg_offline.png'),
      fit: BoxFit.cover,
    ),
  ),
  child: OfflineNoticeWidget(),
)`,
  },
  {
    id: 'maintenance',
    name: '16. MAINTENANCE SCREEN',
    category: 'phone',
    targetWidth: 1440,
    targetHeight: 2960,
    deviceType: 'Phone',
    filename: 'bg_maintenance.png',
    description: 'Airship sky drydock with brass scaffolding, warm hanging work lamps, and floating tool crates undergoing tune-ups.',
    mood: 'Busy Workshop, Whimsical Crafting',
    baseImage: GENERATED_ASSETS.dashboard,
    accentColor: '#F97316',
    features: ['Scaffold wooden beams', 'Brass gears and wrenches', 'Warm hanging Edison bulbs', 'Maintenance countdown frame'],
    dartSnippet: `// lib/screens/maintenance_screen.dart
Container(
  decoration: const BoxDecoration(
    image: DecorationImage(
      image: AssetImage('assets/images/backgrounds/bg_maintenance.png'),
      fit: BoxFit.cover,
    ),
  ),
  child: MaintenanceCountdownModal(),
)`,
  },
  {
    id: 'dialogue_popup',
    name: '17. DIALOGUE / POPUP BACKGROUND',
    category: 'panel',
    targetWidth: 1440,
    targetHeight: 1024,
    deviceType: 'UI Panel',
    filename: 'panel_dialogue.png',
    description: '9-Sliceable horizontal popup dialog parchment panel with carved oak wood borders, corner brass brackets, and top emerald sprout seal.',
    mood: 'Tactile Parchment & Brass Trim',
    baseImage: GENERATED_ASSETS.panel,
    accentColor: '#10B981',
    nineSlice: {
      left: 160,
      top: 160,
      right: 160,
      bottom: 160,
    },
    features: ['9-Slice Center Stretchable', 'Carved brass filigree corners', 'Aged parchment center', 'Emerald crest emblem'],
    dartSnippet: `// lib/widgets/nine_slice_dialogue.dart
Container(
  decoration: BoxDecoration(
    image: DecorationImage(
      image: const AssetImage('assets/images/panels/panel_dialogue.png'),
      centerSlice: Rect.fromLTRB(160, 160, 1280, 864),
      fit: BoxFit.fill,
    ),
  ),
  child: Padding(
    padding: const EdgeInsets.all(48),
    child: DialogueContentWidget(),
  ),
)`,
  },
  {
    id: 'menu_panel',
    name: '18. MENU PANEL BACKGROUND',
    category: 'panel',
    targetWidth: 1024,
    targetHeight: 1024,
    deviceType: 'UI Panel',
    filename: 'panel_menu.png',
    description: 'Square 9-sliceable game menu board with wooden planks, interlocking corner brass gears, and clean center for inventory/quest cards.',
    mood: 'Sturdy Oak & Riveted Brass',
    baseImage: GENERATED_ASSETS.panel,
    accentColor: '#F59E0B',
    nineSlice: {
      left: 140,
      top: 140,
      right: 140,
      bottom: 140,
    },
    features: ['Square 1024x1024 9-slice', 'Modular resizability', 'Woodgrain bevel border', 'Drop shadow pre-baked'],
    dartSnippet: `// lib/widgets/nine_slice_menu.dart
Container(
  decoration: BoxDecoration(
    image: DecorationImage(
      image: const AssetImage('assets/images/panels/panel_menu.png'),
      centerSlice: Rect.fromLTRB(140, 140, 884, 884),
      fit: BoxFit.fill,
    ),
  ),
  child: MenuItemsGrid(),
)`,
  },
  {
    id: 'button_bg',
    name: '19. BUTTON BACKGROUND',
    category: 'button',
    targetWidth: 1024,
    targetHeight: 512,
    deviceType: 'UI Button',
    filename: 'btn_golden.png',
    description: '3D glossy golden amber button frame with brass border, top bevel shine, and expandable center for Flutter action buttons (PLAY / START). Also includes Cyan UPGRADE, Emerald CLAIM, and Bronze INVENTORY variants.',
    mood: 'Tactile Gold, Juicy Clickable 3D',
    baseImage: GENERATED_ASSETS.panel,
    accentColor: '#FBBF24',
    nineSlice: {
      left: 120,
      top: 80,
      right: 120,
      bottom: 80,
    },
    features: ['3D bevel highlight', '9-slice stretchable horizontally', 'Crisp border radius', 'Supports PLAY, CLAIM, UPGRADE, INVENTORY'],
    dartSnippet: `// lib/widgets/game_button.dart
GestureDetector(
  onTap: onPressed,
  child: Container(
    height: 72,
    decoration: BoxDecoration(
      image: DecorationImage(
        image: const AssetImage('assets/images/buttons/btn_golden.png'),
        centerSlice: Rect.fromLTRB(120, 80, 904, 432),
        fit: BoxFit.fill,
      ),
    ),
    alignment: Alignment.center,
    child: Text(
      'START ADVENTURE',
      style: TextStyle(
        fontFamily: 'Fredoka',
        fontSize: 24,
        fontWeight: FontWeight.bold,
        color: Colors.white,
        shadows: [Shadow(color: Colors.black45, blurRadius: 4, offset: Offset(0, 2))],
      ),
    ),
  ),
)`,
  },
];
