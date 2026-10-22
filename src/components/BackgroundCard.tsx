import React, { useState } from 'react';
import { BackgroundItem } from '../data/backgroundsData';
import { renderBackgroundToCanvas, downloadCanvasAsPng } from '../utils/canvasRenderer';
import { Download, Smartphone, Tablet, Layers, Code, Eye, Sparkles, Check } from 'lucide-react';

interface BackgroundCardProps {
  item: BackgroundItem;
  onSelectForSimulator: (item: BackgroundItem) => void;
  onOpenCode: (item: BackgroundItem) => void;
  onOpenNineSlice?: (item: BackgroundItem) => void;
}

export const BackgroundCard: React.FC<BackgroundCardProps> = ({
  item,
  onSelectForSimulator,
  onOpenCode,
  onOpenNineSlice,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = async (scale: number = 1.0) => {
    try {
      setDownloading(true);
      const canvas = await renderBackgroundToCanvas(item, scale);
      downloadCanvasAsPng(canvas, item.filename);
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(item.dartSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPanelOrButton = item.category === 'panel' || item.category === 'button';

  return (
    <div className="group relative flex flex-col bg-slate-900/90 rounded-2xl border border-amber-950/40 hover:border-amber-500/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden">
      {/* Top Banner Tag */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-slate-950/80 text-amber-300 border border-amber-500/30 shadow-md">
          {item.category === 'phone' && <Smartphone className="w-3.5 h-3.5 text-sky-400" />}
          {item.category === 'tablet' && <Tablet className="w-3.5 h-3.5 text-emerald-400" />}
          {isPanelOrButton && <Layers className="w-3.5 h-3.5 text-purple-400" />}
          {item.deviceType}
        </span>
        <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium backdrop-blur-md bg-black/70 text-slate-200 border border-white/10">
          {item.targetWidth} × {item.targetHeight}
        </span>
      </div>

      {/* Preview Box */}
      <div
        className={`relative w-full bg-slate-950 overflow-hidden cursor-pointer ${
          item.category === 'phone'
            ? 'h-64'
            : item.category === 'tablet'
            ? 'h-52'
            : item.category === 'button'
            ? 'h-36'
            : 'h-48'
        }`}
        onClick={() => onSelectForSimulator(item)}
      >
        <img
          src={item.baseImage}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20 pointer-events-none" />

        {/* 9-Slice Grid Overlay preview if panel/button */}
        {item.nineSlice && (
          <div className="absolute inset-4 border border-dashed border-amber-400/50 pointer-events-none rounded-lg flex items-center justify-center">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-amber-950/90 text-amber-300 rounded border border-amber-500/40">
              9-Slice Stretchable
            </span>
          </div>
        )}

        {/* Quick Simulator Hover Action */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectForSimulator(item);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-transform hover:scale-105"
          >
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </button>
          {isPanelOrButton && onOpenNineSlice && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenNineSlice(item);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
            >
              <Layers className="w-3.5 h-3.5" />
              9-Slice
            </button>
          )}
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-slate-100 text-sm tracking-wide line-clamp-1 group-hover:text-amber-400 transition-colors">
              {item.name}
            </h3>
            <span className="text-[11px] font-mono text-amber-400/80 shrink-0">
              {item.filename}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Key Features pills */}
        <div className="flex flex-wrap gap-1">
          {item.features.slice(0, 2).map((feat, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[10px] bg-slate-800/80 text-slate-300 border border-slate-700/60"
            >
              {feat}
            </span>
          ))}
          {item.features.length > 2 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800/50 text-slate-400">
              +{item.features.length - 2}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
          <button
            onClick={() => handleDownload(1.0)}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-950/40 hover:shadow-amber-500/20 transition-all disabled:opacity-50"
            title={`Download full resolution PNG (${item.targetWidth}x${item.targetHeight})`}
          >
            {downloading ? (
              <span className="animate-spin text-xs">⏳</span>
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            Download PNG
          </button>

          <button
            onClick={handleCopySnippet}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700 transition-colors"
            title="Copy Flutter code snippet"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Code className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            onClick={() => onOpenCode(item)}
            className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors"
            title="View Dart & Pubspec snippet"
          >
            Snippet
          </button>
        </div>
      </div>
    </div>
  );
};
