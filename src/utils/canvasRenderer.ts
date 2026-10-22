import { BackgroundItem } from '../data/backgroundsData';

// Cache loaded images
const imageCache: Map<string, HTMLImageElement> = new Map();

export async function loadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    return imageCache.get(src)!;
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

/**
 * Renders a background item to an HTML Canvas at its exact target resolution
 * (e.g. 1440x2960, 2732x2048, 1440x1024, etc.)
 */
export async function renderBackgroundToCanvas(
  item: BackgroundItem,
  scale: number = 1.0
): Promise<HTMLCanvasElement> {
  const width = Math.round(item.targetWidth * scale);
  const height = Math.round(item.targetHeight * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Load the corresponding base image
  let baseImg: HTMLImageElement | null = null;
  try {
    baseImg = await loadImage(item.baseImage);
  } catch (e) {
    console.warn('Failed to load base image, using fallback rendering', e);
  }

  // Draw background base
  if (baseImg) {
    // Fill cover
    const imgRatio = baseImg.naturalWidth / baseImg.naturalHeight;
    const canvasRatio = width / height;

    let drawW = width;
    let drawH = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawH = width / imgRatio;
      offsetY = (height - drawH) / 2;
    } else {
      drawW = height * imgRatio;
      offsetX = (width - drawW) / 2;
    }

    ctx.drawImage(baseImg, offsetX, offsetY, drawW, drawH);
  } else {
    // Elegant fallback gradient
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#38BDF8');
    grad.addColorStop(0.5, '#FDE047');
    grad.addColorStop(1, '#16A34A');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }

  // Apply screen-specific styling & thematic adjustments
  applyScreenTheming(ctx, item, width, height);

  return canvas;
}

function applyScreenTheming(
  ctx: CanvasRenderingContext2D,
  item: BackgroundItem,
  w: number,
  h: number
) {
  ctx.save();

  switch (item.id) {
    case 'splash': {
      // Warm golden hour sunlight wash at top
      const sunGrad = ctx.createRadialGradient(w * 0.5, h * 0.28, 50, w * 0.5, h * 0.28, w * 0.8);
      sunGrad.addColorStop(0, 'rgba(255, 235, 170, 0.35)');
      sunGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.15)');
      sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, w, h);

      // Bottom vignette for "START ADVENTURE" button zone
      const botVignette = ctx.createLinearGradient(0, h * 0.7, 0, h);
      botVignette.addColorStop(0, 'rgba(20, 15, 10, 0)');
      botVignette.addColorStop(1, 'rgba(24, 18, 12, 0.45)');
      ctx.fillStyle = botVignette;
      ctx.fillRect(0, h * 0.7, w, h * 0.3);
      break;
    }

    case 'login': {
      // Soft ambient dusk tint with warm lantern accents
      ctx.fillStyle = 'rgba(28, 20, 16, 0.25)';
      ctx.fillRect(0, 0, w, h);

      // Central soft radial glow behind the sign-in modal
      const modalBackdrop = ctx.createRadialGradient(w * 0.5, h * 0.5, 100, w * 0.5, h * 0.5, w * 0.6);
      modalBackdrop.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      modalBackdrop.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      ctx.fillStyle = modalBackdrop;
      ctx.fillRect(0, 0, w, h);
      break;
    }

    case 'home_phone': {
      // Gentle status bar & bottom dock safe area dimming
      const topShade = ctx.createLinearGradient(0, 0, 0, h * 0.14);
      topShade.addColorStop(0, 'rgba(15, 23, 42, 0.35)');
      topShade.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = topShade;
      ctx.fillRect(0, 0, w, h * 0.14);

      const botShade = ctx.createLinearGradient(0, h * 0.86, 0, h);
      botShade.addColorStop(0, 'rgba(15, 23, 42, 0)');
      botShade.addColorStop(1, 'rgba(15, 23, 42, 0.4)');
      ctx.fillStyle = botShade;
      ctx.fillRect(0, h * 0.86, w, h * 0.14);
      break;
    }

    case 'world_map':
    case 'home_tablet': {
      // Vignette around edges to frame the interactive map archipelago
      const mapVignette = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.35, w * 0.5, h * 0.5, w * 0.75);
      mapVignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      mapVignette.addColorStop(1, 'rgba(12, 28, 48, 0.3)');
      ctx.fillStyle = mapVignette;
      ctx.fillRect(0, 0, w, h);
      break;
    }

    case 'quests': {
      // Warm torchlight glow highlights around stone pillars
      const torchL = ctx.createRadialGradient(w * 0.15, h * 0.45, 20, w * 0.15, h * 0.45, 300);
      torchL.addColorStop(0, 'rgba(255, 180, 50, 0.3)');
      torchL.addColorStop(1, 'rgba(255, 140, 0, 0)');
      ctx.fillStyle = torchL;
      ctx.fillRect(0, 0, w, h);

      const torchR = ctx.createRadialGradient(w * 0.85, h * 0.45, 20, w * 0.85, h * 0.45, 300);
      torchR.addColorStop(0, 'rgba(255, 180, 50, 0.3)');
      torchR.addColorStop(1, 'rgba(255, 140, 0, 0)');
      ctx.fillStyle = torchR;
      ctx.fillRect(0, 0, w, h);
      break;
    }

    case 'inventory': {
      // Dark warm wooden workshop vignette
      ctx.fillStyle = 'rgba(22, 14, 8, 0.45)';
      ctx.fillRect(0, 0, w, h);

      // Subtle shelving horizontal guide highlights
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.12)';
      ctx.lineWidth = 4;
      for (let y = h * 0.25; y < h * 0.85; y += h * 0.15) {
        ctx.beginPath();
        ctx.moveTo(w * 0.08, y);
        ctx.lineTo(w * 0.92, y);
        ctx.stroke();
      }
      break;
    }

    case 'character_gear': {
      // Spotlight onto character pedestal
      const spotGrad = ctx.createRadialGradient(w * 0.5, h * 0.65, 80, w * 0.5, h * 0.65, w * 0.55);
      spotGrad.addColorStop(0, 'rgba(255, 255, 220, 0.25)');
      spotGrad.addColorStop(0.6, 'rgba(236, 72, 153, 0.1)');
      spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, w, h);
      break;
    }

    case 'rewards': {
      // Golden god-rays emanating from center
      ctx.save();
      ctx.translate(w * 0.5, h * 0.48);
      ctx.fillStyle = 'rgba(254, 240, 138, 0.12)';
      for (let i = 0; i < 16; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const a1 = (i * Math.PI * 2) / 16;
        const a2 = a1 + (Math.PI * 2) / 32;
        const r = Math.max(w, h);
        ctx.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
        ctx.lineTo(Math.cos(a2) * r, Math.sin(a2) * r);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Radiant center burst
      const burst = ctx.createRadialGradient(w * 0.5, h * 0.48, 40, w * 0.5, h * 0.48, w * 0.6);
      burst.addColorStop(0, 'rgba(255, 245, 180, 0.4)');
      burst.addColorStop(0.4, 'rgba(234, 179, 8, 0.2)');
      burst.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = burst;
      ctx.fillRect(0, 0, w, h);
      break;
    }

    case 'achievements': {
      // Regal blue-purple atmosphere with golden sparkles
      const achGrad = ctx.createLinearGradient(0, 0, 0, h);
      achGrad.addColorStop(0, 'rgba(30, 27, 75, 0.3)');
      achGrad.addColorStop(0.5, 'rgba(67, 56, 202, 0.15)');
      achGrad.addColorStop(1, 'rgba(15, 23, 42, 0.5)');
      ctx.fillStyle = achGrad;
      ctx.fillRect(0, 0, w, h);
      break;
    }

    case 'settings': {
      // Dark workshop cog overlay
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.fillRect(0, 0, w, h);

      // Draw faint decorative corner gears
      drawDecorativeGear(ctx, w * 0.1, h * 0.08, 120, 'rgba(245, 158, 11, 0.15)');
      drawDecorativeGear(ctx, w * 0.9, h * 0.12, 90, 'rgba(245, 158, 11, 0.12)');
      drawDecorativeGear(ctx, w * 0.85, h * 0.88, 140, 'rgba(245, 158, 11, 0.12)');
      break;
    }

    case 'parent_dashboard': {
      // Warm amber study lighting
      const studyVig = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.3, w * 0.5, h * 0.5, w * 0.7);
      studyVig.addColorStop(0, 'rgba(0, 0, 0, 0)');
      studyVig.addColorStop(1, 'rgba(30, 15, 5, 0.35)');
      ctx.fillStyle = studyVig;
      ctx.fillRect(0, 0, w, h);
      break;
    }

    case 'loading': {
      // Deep swirl tunnel overlay
      const tunnel = ctx.createRadialGradient(w * 0.5, h * 0.5, 50, w * 0.5, h * 0.5, w * 0.75);
      tunnel.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      tunnel.addColorStop(0.5, 'rgba(14, 165, 233, 0.1)');
      tunnel.addColorStop(1, 'rgba(15, 23, 42, 0.55)');
      ctx.fillStyle = tunnel;
      ctx.fillRect(0, 0, w, h);
      break;
    }

    case 'error': {
      // Purple storm turbulence wash
      const storm = ctx.createRadialGradient(w * 0.5, h * 0.45, 100, w * 0.5, h * 0.45, w * 0.8);
      storm.addColorStop(0, 'rgba(168, 85, 247, 0.25)');
      storm.addColorStop(0.5, 'rgba(126, 34, 206, 0.2)');
      storm.addColorStop(1, 'rgba(30, 10, 40, 0.55)');
      ctx.fillStyle = storm;
      ctx.fillRect(0, 0, w, h);
      break;
    }

    case 'offline': {
      // Twilight night sky tint with stars
      const twilight = ctx.createLinearGradient(0, 0, 0, h);
      twilight.addColorStop(0, 'rgba(15, 23, 42, 0.7)');
      twilight.addColorStop(0.6, 'rgba(30, 27, 75, 0.5)');
      twilight.addColorStop(1, 'rgba(17, 24, 39, 0.8)');
      ctx.fillStyle = twilight;
      ctx.fillRect(0, 0, w, h);

      // Starry particles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      for (let s = 0; s < 70; s++) {
        const sx = ((s * 137.5) % w);
        const sy = ((s * 283.3) % (h * 0.6));
        const r = 1 + ((s % 3) * 0.8);
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'maintenance': {
      // Drydock workshop tint
      const dock = ctx.createLinearGradient(0, 0, 0, h);
      dock.addColorStop(0, 'rgba(15, 23, 42, 0.4)');
      dock.addColorStop(1, 'rgba(39, 21, 8, 0.65)');
      ctx.fillStyle = dock;
      ctx.fillRect(0, 0, w, h);
      break;
    }

    case 'dialogue_popup': {
      // 9-sliceable dialogue panel (1440x1024)
      renderProceduralPanel(ctx, w, h, 1440 / 1024, true);
      break;
    }

    case 'menu_panel': {
      // 9-sliceable menu panel (1024x1024)
      renderProceduralPanel(ctx, w, h, 1.0, false);
      break;
    }

    case 'button_bg': {
      // 3D tactile button background (1024x512)
      renderProceduralButton(ctx, w, h);
      break;
    }
  }

  ctx.restore();
}

function drawDecorativeGear(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  color: string
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  const teeth = 12;
  const toothDepth = radius * 0.18;

  ctx.beginPath();
  for (let i = 0; i < teeth; i++) {
    const angle = (i * 2 * Math.PI) / teeth;
    const a1 = angle - Math.PI / teeth / 2;
    const a2 = angle - Math.PI / teeth / 4;
    const a3 = angle + Math.PI / teeth / 4;
    const a4 = angle + Math.PI / teeth / 2;

    const rOuter = radius + toothDepth;
    const rInner = radius;

    if (i === 0) ctx.moveTo(cx + Math.cos(a1) * rInner, cy + Math.sin(a1) * rInner);
    else ctx.lineTo(cx + Math.cos(a1) * rInner, cy + Math.sin(a1) * rInner);

    ctx.lineTo(cx + Math.cos(a2) * rOuter, cy + Math.sin(a2) * rOuter);
    ctx.lineTo(cx + Math.cos(a3) * rOuter, cy + Math.sin(a3) * rOuter);
    ctx.lineTo(cx + Math.cos(a4) * rInner, cy + Math.sin(a4) * rInner);
  }
  ctx.closePath();
  ctx.fill();

  // Center hole
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.38, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function renderProceduralPanel(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  aspect: number,
  hasEmblem: boolean
) {
  // Clear transparent background
  ctx.clearRect(0, 0, w, h);

  const borderWidth = Math.round(w * 0.08);
  const cornerRadius = Math.round(w * 0.04);
  const pad = Math.round(w * 0.02);

  // Outer shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = Math.round(w * 0.03);
  ctx.shadowOffsetY = Math.round(w * 0.015);

  // Outer Wooden Frame
  const frameX = pad;
  const frameY = pad;
  const frameW = w - pad * 2;
  const frameH = h - pad * 2;

  // Wood border fill
  const woodGrad = ctx.createLinearGradient(0, frameY, 0, frameY + frameH);
  woodGrad.addColorStop(0, '#B45309');
  woodGrad.addColorStop(0.3, '#78350F');
  woodGrad.addColorStop(0.7, '#92400E');
  woodGrad.addColorStop(1, '#451A03');

  drawRoundedRect(ctx, frameX, frameY, frameW, frameH, cornerRadius);
  ctx.fillStyle = woodGrad;
  ctx.fill();
  ctx.restore();

  // Wood Inner Bevel
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = Math.round(borderWidth * 0.08);
  drawRoundedRect(ctx, frameX + 4, frameY + 4, frameW - 8, frameH - 8, cornerRadius - 2);
  ctx.stroke();

  // Inner Parchment Canvas
  const parchX = frameX + borderWidth;
  const parchY = frameY + borderWidth;
  const parchW = frameW - borderWidth * 2;
  const parchH = frameH - borderWidth * 2;

  const parchGrad = ctx.createLinearGradient(0, parchY, 0, parchY + parchH);
  parchGrad.addColorStop(0, '#FEF3C7');
  parchGrad.addColorStop(0.5, '#FDE68A');
  parchGrad.addColorStop(1, '#FBBF24');

  drawRoundedRect(ctx, parchX, parchY, parchW, parchH, cornerRadius * 0.5);
  ctx.fillStyle = parchGrad;
  ctx.fill();

  // Parchment inner shadow
  ctx.strokeStyle = 'rgba(120, 53, 15, 0.35)';
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, parchX, parchY, parchW, parchH, cornerRadius * 0.5);
  ctx.stroke();

  // Corner Brass Brackets
  const bracketSize = Math.round(borderWidth * 1.5);
  drawBrassCorner(ctx, frameX, frameY, bracketSize, 0); // top-left
  drawBrassCorner(ctx, frameX + frameW, frameY, bracketSize, Math.PI / 2); // top-right
  drawBrassCorner(ctx, frameX + frameW, frameY + frameH, bracketSize, Math.PI); // bot-right
  drawBrassCorner(ctx, frameX, frameY + frameH, bracketSize, -Math.PI / 2); // bot-left

  // Rivet Studs along borders
  drawRivetStuds(ctx, frameX, frameY, frameW, frameH, borderWidth);

  // Emblem at top center (if applicable)
  if (hasEmblem) {
    drawSkySproutEmblem(ctx, w * 0.5, frameY + borderWidth * 0.4, borderWidth * 0.85);
  }
}

function drawBrassCorner(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  const brassGrad = ctx.createLinearGradient(0, 0, size, size);
  brassGrad.addColorStop(0, '#FDE047');
  brassGrad.addColorStop(0.4, '#D97706');
  brassGrad.addColorStop(0.8, '#92400E');
  brassGrad.addColorStop(1, '#78350F');

  ctx.fillStyle = brassGrad;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.lineTo(size * 0.75, size * 0.3);
  ctx.lineTo(size * 0.3, size * 0.75);
  ctx.lineTo(0, size);
  ctx.closePath();
  ctx.fill();

  // Brass inner filigree highlight
  ctx.strokeStyle = '#FEF08A';
  ctx.lineWidth = Math.max(2, size * 0.04);
  ctx.stroke();

  // Corner screw
  ctx.beginPath();
  ctx.arc(size * 0.3, size * 0.3, size * 0.08, 0, Math.PI * 2);
  ctx.fillStyle = '#451A03';
  ctx.fill();
  ctx.strokeStyle = '#FEF08A';
  ctx.stroke();

  ctx.restore();
}

function drawRivetStuds(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  borderWidth: number
) {
  const rivetRadius = Math.max(3, borderWidth * 0.1);
  const midX = x + borderWidth * 0.5;
  const midY = y + borderWidth * 0.5;
  const oppX = x + w - borderWidth * 0.5;
  const oppY = y + h - borderWidth * 0.5;

  const countH = 6;
  const countV = 5;

  for (let i = 1; i < countH; i++) {
    const rx = x + (w * i) / countH;
    drawSingleRivet(ctx, rx, midY, rivetRadius);
    drawSingleRivet(ctx, rx, oppY, rivetRadius);
  }
  for (let j = 1; j < countV; j++) {
    const ry = y + (h * j) / countV;
    drawSingleRivet(ctx, midX, ry, rivetRadius);
    drawSingleRivet(ctx, oppX, ry, rivetRadius);
  }
}

function drawSingleRivet(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number
) {
  ctx.save();
  const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.2, cx, cy, r);
  grad.addColorStop(0, '#FEF08A');
  grad.addColorStop(0.5, '#D97706');
  grad.addColorStop(1, '#451A03');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSkySproutEmblem(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number
) {
  ctx.save();

  // Outer brass ring
  const ringGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
  ringGrad.addColorStop(0, '#FDE047');
  ringGrad.addColorStop(0.5, '#B45309');
  ringGrad.addColorStop(1, '#78350F');

  ctx.fillStyle = ringGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // Inner green gem
  const gemGrad = ctx.createRadialGradient(cx - radius * 0.2, cy - radius * 0.3, radius * 0.1, cx, cy, radius * 0.7);
  gemGrad.addColorStop(0, '#86EFAC');
  gemGrad.addColorStop(0.4, '#22C55E');
  gemGrad.addColorStop(0.9, '#15803D');
  gemGrad.addColorStop(1, '#052E16');

  ctx.fillStyle = gemGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.75, 0, Math.PI * 2);
  ctx.fill();

  // Leaf sprout icon inside gem
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.ellipse(cx - radius * 0.15, cy - radius * 0.1, radius * 0.2, radius * 0.35, -Math.PI / 6, 0, Math.PI * 2);
  ctx.ellipse(cx + radius * 0.15, cy - radius * 0.1, radius * 0.2, radius * 0.35, Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function renderProceduralButton(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  variant: 'golden' | 'emerald' | 'cyan' | 'bronze' = 'golden'
) {
  ctx.clearRect(0, 0, w, h);

  const padX = Math.round(w * 0.03);
  const padY = Math.round(h * 0.06);
  const btnW = w - padX * 2;
  const btnH = h - padY * 2;
  const radius = Math.round(btnH * 0.35);

  // Outer bottom shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = Math.round(h * 0.12);
  ctx.shadowOffsetY = Math.round(h * 0.08);

  // Outer dark rim / bottom bevel
  const rimGrad = ctx.createLinearGradient(0, padY, 0, padY + btnH);
  if (variant === 'emerald') {
    rimGrad.addColorStop(0, '#047857');
    rimGrad.addColorStop(1, '#064E3B');
  } else if (variant === 'cyan') {
    rimGrad.addColorStop(0, '#0369A1');
    rimGrad.addColorStop(1, '#082F49');
  } else if (variant === 'bronze') {
    rimGrad.addColorStop(0, '#78350F');
    rimGrad.addColorStop(1, '#292524');
  } else {
    rimGrad.addColorStop(0, '#B45309');
    rimGrad.addColorStop(1, '#451A03');
  }

  drawRoundedRect(ctx, padX, padY, btnW, btnH, radius);
  ctx.fillStyle = rimGrad;
  ctx.fill();
  ctx.restore();

  // Button Body
  const innerInset = Math.round(h * 0.05);
  const bodyX = padX + innerInset;
  const bodyY = padY + innerInset;
  const bodyW = btnW - innerInset * 2;
  const bodyH = btnH - innerInset * 2 - Math.round(h * 0.08);

  const bodyGrad = ctx.createLinearGradient(0, bodyY, 0, bodyY + bodyH);
  if (variant === 'emerald') {
    bodyGrad.addColorStop(0, '#6EE7B7');
    bodyGrad.addColorStop(0.2, '#34D399');
    bodyGrad.addColorStop(0.6, '#10B981');
    bodyGrad.addColorStop(1, '#059669');
  } else if (variant === 'cyan') {
    bodyGrad.addColorStop(0, '#7DD3FC');
    bodyGrad.addColorStop(0.2, '#38BDF8');
    bodyGrad.addColorStop(0.6, '#0EA5E9');
    bodyGrad.addColorStop(1, '#0284C7');
  } else if (variant === 'bronze') {
    bodyGrad.addColorStop(0, '#B45309');
    bodyGrad.addColorStop(0.2, '#92400E');
    bodyGrad.addColorStop(0.6, '#78350F');
    bodyGrad.addColorStop(1, '#451A03');
  } else {
    bodyGrad.addColorStop(0, '#FEF08A');
    bodyGrad.addColorStop(0.15, '#FBBF24');
    bodyGrad.addColorStop(0.5, '#F59E0B');
    bodyGrad.addColorStop(0.85, '#D97706');
    bodyGrad.addColorStop(1, '#B45309');
  }

  drawRoundedRect(ctx, bodyX, bodyY, bodyW, bodyH, radius - innerInset);
  ctx.fillStyle = bodyGrad;
  ctx.fill();

  // Top glossy curved highlight
  ctx.save();
  const glossH = Math.round(bodyH * 0.42);
  const glossGrad = ctx.createLinearGradient(0, bodyY, 0, bodyY + glossH);
  glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
  glossGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)');
  glossGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  drawRoundedRect(ctx, bodyX + 4, bodyY + 3, bodyW - 8, glossH, radius - innerInset);
  ctx.fillStyle = glossGrad;
  ctx.fill();
  ctx.restore();

  // Golden border stroke
  ctx.strokeStyle = '#FEF9C3';
  ctx.lineWidth = Math.round(h * 0.025);
  drawRoundedRect(ctx, bodyX + 2, bodyY + 2, bodyW - 4, bodyH - 4, radius - innerInset);
  ctx.stroke();
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/**
 * Downloads a canvas as a PNG file
 */
export function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
