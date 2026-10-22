import JSZip from 'jszip';
import { BACKGROUNDS_LIST, BackgroundItem } from '../data/backgroundsData';
import { renderBackgroundToCanvas, renderProceduralButton } from './canvasRenderer';

export interface ExportProgress {
  current: number;
  total: number;
  currentName: string;
  isComplete: boolean;
}

export async function exportFullFlutterPackageZip(
  onProgress?: (progress: ExportProgress) => void
): Promise<void> {
  const zip = new JSZip();

  // Create folder structure
  const backgroundsFolder = zip.folder('assets/images/backgrounds');
  const panelsFolder = zip.folder('assets/images/panels');
  const buttonsFolder = zip.folder('assets/images/buttons');
  const libThemeFolder = zip.folder('lib/theme');

  const total = BACKGROUNDS_LIST.length;

  for (let i = 0; i < BACKGROUNDS_LIST.length; i++) {
    const item = BACKGROUNDS_LIST[i];
    if (onProgress) {
      onProgress({
        current: i + 1,
        total,
        currentName: item.name,
        isComplete: false,
      });
    }

    // Render each background at full resolution (or scaled down 0.75 for fast zip generation, full 1.0)
    const canvas = await renderBackgroundToCanvas(item, 1.0);
    const dataUrl = canvas.toDataURL('image/png');
    const base64Data = dataUrl.split(',')[1];

    if (item.category === 'panel') {
      panelsFolder?.file(item.filename, base64Data, { base64: true });
    } else if (item.category === 'button') {
      buttonsFolder?.file(item.filename, base64Data, { base64: true });
    } else {
      backgroundsFolder?.file(item.filename, base64Data, { base64: true });
    }
  }

  // Export each of the 3D buttons (PLAY, CLAIM, UPGRADE, INVENTORY, START ADVENTURE)
  const buttonConfigs: Array<{ filename: string; variant: 'golden' | 'emerald' | 'cyan' | 'bronze' }> = [
    { filename: 'btn_play.png', variant: 'golden' },
    { filename: 'btn_claim.png', variant: 'emerald' },
    { filename: 'btn_upgrade.png', variant: 'cyan' },
    { filename: 'btn_inventory.png', variant: 'bronze' },
    { filename: 'btn_start_adventure.png', variant: 'golden' },
  ];

  for (const btn of buttonConfigs) {
    const btnCanvas = document.createElement('canvas');
    btnCanvas.width = 1024;
    btnCanvas.height = 512;
    const bCtx = btnCanvas.getContext('2d');
    if (bCtx) {
      renderProceduralButton(bCtx, 1024, 512, btn.variant);
      const bData = btnCanvas.toDataURL('image/png').split(',')[1];
      buttonsFolder?.file(btn.filename, bData, { base64: true });
    }
  }

  // Add Flutter pubspec.yaml asset snippet
  zip.file('pubspec_assets_snippet.yaml', generatePubspecYaml());

  // Add Flutter Dart helper class
  libThemeFolder?.file('app_backgrounds.dart', generateDartClass());

  // Add Readme with instructions
  zip.file('README.md', generateReadme());

  if (onProgress) {
    onProgress({
      current: total,
      total,
      currentName: 'Compressing ZIP archive...',
      isComplete: false,
    });
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'skysprout_flutter_backgrounds_pack.zip';
  link.click();
  URL.revokeObjectURL(downloadUrl);

  if (onProgress) {
    onProgress({
      current: total,
      total,
      currentName: 'Package downloaded successfully!',
      isComplete: true,
    });
  }
}

export function generatePubspecYaml(): string {
  return `# ==============================================================================
# SkySprout Adventures - Flutter Asset Registration
# Add these lines to your pubspec.yaml under 'flutter: assets:'
# ==============================================================================

flutter:
  uses-material-design: true

  assets:
    # Full-Screen Phone Backgrounds (1440 x 2960)
    - assets/images/backgrounds/bg_splash.png
    - assets/images/backgrounds/bg_login.png
    - assets/images/backgrounds/bg_home_phone.png
    - assets/images/backgrounds/bg_quests.png
    - assets/images/backgrounds/bg_inventory.png
    - assets/images/backgrounds/bg_character.png
    - assets/images/backgrounds/bg_rewards.png
    - assets/images/backgrounds/bg_achievements.png
    - assets/images/backgrounds/bg_settings.png
    - assets/images/backgrounds/bg_loading.png
    - assets/images/backgrounds/bg_error.png
    - assets/images/backgrounds/bg_offline.png
    - assets/images/backgrounds/bg_maintenance.png

    # Full-Screen Tablet Backgrounds (2732 x 2048)
    - assets/images/backgrounds/bg_home_tablet.png
    - assets/images/backgrounds/bg_world_map.png
    - assets/images/backgrounds/bg_parent_dashboard.png

    # 9-Slice Panels & Buttons
    - assets/images/panels/panel_dialogue.png
    - assets/images/panels/panel_menu.png
    - assets/images/buttons/btn_golden.png
    - assets/images/buttons/btn_play.png
    - assets/images/buttons/btn_claim.png
    - assets/images/buttons/btn_upgrade.png
    - assets/images/buttons/btn_inventory.png
    - assets/images/buttons/btn_start_adventure.png
`;
}

export function generateDartClass(): string {
  return `import 'package:flutter/material.dart';

/// SkySprout Adventures - Full Screen, 9-Slice Backgrounds & Game Arsenal Suite
/// Auto-generated helper class for Flutter applications.
class AppBackgrounds {
  // Prevent instantiation
  AppBackgrounds._();

  // ---------------------------------------------------------------------------
  // Phone Background Assets (1440 x 2960)
  // ---------------------------------------------------------------------------
  static const String splash = 'assets/images/backgrounds/bg_splash.png';
  static const String login = 'assets/images/backgrounds/bg_login.png';
  static const String homePhone = 'assets/images/backgrounds/bg_home_phone.png';
  static const String quests = 'assets/images/backgrounds/bg_quests.png';
  static const String inventory = 'assets/images/backgrounds/bg_inventory.png';
  static const String character = 'assets/images/backgrounds/bg_character.png';
  static const String rewards = 'assets/images/backgrounds/bg_rewards.png';
  static const String achievements = 'assets/images/backgrounds/bg_achievements.png';
  static const String settings = 'assets/images/backgrounds/bg_settings.png';
  static const String loading = 'assets/images/backgrounds/bg_loading.png';
  static const String error = 'assets/images/backgrounds/bg_error.png';
  static const String offline = 'assets/images/backgrounds/bg_offline.png';
  static const String maintenance = 'assets/images/backgrounds/bg_maintenance.png';

  // ---------------------------------------------------------------------------
  // Tablet Background Assets (2732 x 2048)
  // ---------------------------------------------------------------------------
  static const String homeTablet = 'assets/images/backgrounds/bg_home_tablet.png';
  static const String worldMap = 'assets/images/backgrounds/bg_world_map.png';
  static const String parentDashboard = 'assets/images/backgrounds/bg_parent_dashboard.png';

  // ---------------------------------------------------------------------------
  // 9-Slice Panels & Buttons
  // ---------------------------------------------------------------------------
  static const String panelDialogue = 'assets/images/panels/panel_dialogue.png';
  static const String panelMenu = 'assets/images/panels/panel_menu.png';
  static const String btnGolden = 'assets/images/buttons/btn_golden.png';
  static const String btnPlay = 'assets/images/buttons/btn_play.png';
  static const String btnClaim = 'assets/images/buttons/btn_claim.png';
  static const String btnUpgrade = 'assets/images/buttons/btn_upgrade.png';
  static const String btnInventory = 'assets/images/buttons/btn_inventory.png';
  static const String btnStartAdventure = 'assets/images/buttons/btn_start_adventure.png';

  // CenterSlice Rectangles for 9-Slice scaling
  static const Rect dialogueCenterSlice = Rect.fromLTRB(160, 160, 1280, 864);
  static const Rect menuCenterSlice = Rect.fromLTRB(140, 140, 884, 884);
  static const Rect buttonCenterSlice = Rect.fromLTRB(120, 80, 904, 432);

  /// Convenient BoxDecoration generator for full screen backgrounds
  static BoxDecoration screenDecoration(String assetPath) {
    return BoxDecoration(
      image: DecorationImage(
        image: AssetImage(assetPath),
        fit: BoxFit.cover,
        alignment: Alignment.center,
      ),
    );
  }

  /// Automatically picks Phone or Tablet home background based on screen width
  static BoxDecoration adaptiveHome(BuildContext context) {
    final isTablet = MediaQuery.of(context).size.shortestSide >= 600;
    return BoxDecoration(
      image: DecorationImage(
        image: AssetImage(isTablet ? homeTablet : homePhone),
        fit: BoxFit.cover,
      ),
    );
  }
}

/// A reusable 9-Slice Game Dialogue Panel Widget
class SkySproutDialoguePanel extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;

  const SkySproutDialoguePanel({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(32),
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage(AppBackgrounds.panelDialogue),
          centerSlice: AppBackgrounds.dialogueCenterSlice,
          fit: BoxFit.fill,
        ),
      ),
      padding: padding,
      child: child,
    );
  }
}

/// A reusable 3D Game Button Widget
class SkySproutButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final double height;
  final TextStyle? textStyle;

  const SkySproutButton({
    super.key,
    required this.label,
    this.onPressed,
    this.height = 68,
    this.textStyle,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        height: height,
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage(AppBackgrounds.btnGolden),
            centerSlice: AppBackgrounds.goldenButtonCenterSlice,
            fit: BoxFit.fill,
          ),
        ),
        alignment: Alignment.center,
        child: Text(
          label,
          style: textStyle ??
              const TextStyle(
                fontFamily: 'Fredoka',
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: Colors.white,
                shadows: [
                  Shadow(color: Color(0x7F000000), blurRadius: 4, offset: Offset(0, 2)),
                ],
              ),
        ),
      ),
    );
  }
}
`;
}

export function generateReadme(): string {
  return `# SkySprout Adventures - Flutter Background Package

This package includes all 19 full-resolution, high-definition background images and 9-slice UI components designed for the SkySprout Adventures app.

## Assets Included:

### Phone Backgrounds (1440 x 2960 @ Native QHD+)
1. \`assets/images/backgrounds/bg_splash.png\` - Splash Screen
2. \`assets/images/backgrounds/bg_login.png\` - Login / Sign Up Screen
3. \`assets/images/backgrounds/bg_home_phone.png\` - Home Screen (Phone)
4. \`assets/images/backgrounds/bg_quests.png\` - Quests Screen
5. \`assets/images/backgrounds/bg_inventory.png\` - Inventory Screen
6. \`assets/images/backgrounds/bg_character.png\` - Character / Gear Screen
7. \`assets/images/backgrounds/bg_rewards.png\` - Rewards Screen
8. \`assets/images/backgrounds/bg_achievements.png\` - Achievements Screen
9. \`assets/images/backgrounds/bg_settings.png\` - Settings Screen
10. \`assets/images/backgrounds/bg_loading.png\` - Loading Screen
11. \`assets/images/backgrounds/bg_error.png\` - Error Screen
12. \`assets/images/backgrounds/bg_offline.png\` - Offline Screen
13. \`assets/images/backgrounds/bg_maintenance.png\` - Maintenance Screen

### Tablet Backgrounds (2732 x 2048 @ iPad Pro / Galaxy Tab Ultra Retina)
14. \`assets/images/backgrounds/bg_home_tablet.png\` - Home Screen (Tablet)
15. \`assets/images/backgrounds/bg_world_map.png\` - World Map Screen
16. \`assets/images/backgrounds/bg_parent_dashboard.png\` - Parent Dashboard Screen

### 9-Slice UI Components
17. \`assets/images/panels/panel_dialogue.png\` (1440 x 1024) - Dialogue / Popup Background
18. \`assets/images/panels/panel_menu.png\` (1024 x 1024) - Menu Panel Background
19. \`assets/images/buttons/btn_golden.png\` (1024 x 512) - Button Background

## Flutter Quick Setup

1. Copy the \`assets/\` directory to the root of your Flutter project.
2. In your \`pubspec.yaml\`, include the contents of \`pubspec_assets_snippet.yaml\`.
3. Copy \`lib/theme/app_backgrounds.dart\` into your Flutter project.
4. Use in any screen:
\`\`\`dart
Scaffold(
  body: Container(
    decoration: AppBackgrounds.screenDecoration(AppBackgrounds.splash),
    child: YourContent(),
  ),
);
\`\`\`
`;
}
