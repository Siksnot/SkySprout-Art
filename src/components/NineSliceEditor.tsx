import React, { useState } from 'react';
import { BackgroundItem, BACKGROUNDS_LIST } from '../data/backgroundsData';
import { Layers, Copy, Check, Sliders, Maximize2, Sparkles, Download } from 'lucide-react';
import { renderBackgroundToCanvas, downloadCanvasAsPng } from '../utils/canvasRenderer';

interface NineSliceEditorProps {
  initialItem?: BackgroundItem;
}

export const NineSliceEditor: React.FC<NineSliceEditorProps> = ({ initialItem }) => {
  const panelAndButtonItems = BACKGROUNDS_LIST.filter(
    (b) => b.category === 'panel' || b.category === 'button'
  );

  const [selectedItem, setSelectedItem] = useState<BackgroundItem>(
    initialItem && (initialItem.category === 'panel' || initialItem.category === 'button')
      ? initialItem
      : panelAndButtonItems[0]
  );

  // Inset values (in source pixels)
  const defaultInsets = selectedItem.nineSlice || { left: 160, top: 160, right: 160, bottom: 160 };
  const [left, setLeft] = useState(defaultInsets.left);
  const [top, setTop] = useState(defaultInsets.top);
  const [right, setRight] = useState(defaultInsets.right);
  const [bottom, setBottom] = useState(defaultInsets.bottom);

  // Live test preview sizes
  const [testWidth, setTestWidth] = useState(
    selectedItem.category === 'button' ? 320 : 480
  );
  const [testHeight, setTestHeight] = useState(
    selectedItem.category === 'button' ? 72 : 360
  );

  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const rectRight = selectedItem.targetWidth - right;
  const rectBottom = selectedItem.targetHeight - bottom;

  const flutterCode = `// In your Flutter widget:
Container(
  width: ${testWidth}.0,
  height: ${testHeight}.0,
  decoration: BoxDecoration(
    image: DecorationImage(
      image: const AssetImage('assets/images/${
        selectedItem.category === 'button' ? 'buttons' : 'panels'
      }/${selectedItem.filename}'),
      centerSlice: Rect.fromLTRB(${left}, ${top}, ${rectRight}, ${rectBottom}),
      fit: BoxFit.fill,
    ),
  ),
  child: Padding(
    padding: const EdgeInsets.fromLTRB(${Math.round(left / 4)}, ${Math.round(
    top / 4
  )}, ${Math.round(right / 4)}, ${Math.round(bottom / 4)}),
    child: ${
      selectedItem.category === 'button'
        ? "Center(child: Text('CLICK ME', style: TextStyle(fontFamily: 'Fredoka', fontSize: 20, color: Colors.white, fontWeight: FontWeight.bold)))"
        : "Column(children: [Text('SkySprout Quest', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)), Text('Congratulations on completing today chores!')])"
    },
  ),
)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(flutterCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            9-Slice & CenterSlice CapInsets Inspector
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure stretchable borders and centerSlice rectangles for Flutter dialog modals and 3D buttons
          </p>
        </div>

        {/* Target Asset Selector */}
        <div className="flex items-center gap-2">
          {panelAndButtonItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                const ins = item.nineSlice || { left: 140, top: 140, right: 140, bottom: 140 };
                setLeft(ins.left);
                setTop(ins.top);
                setRight(ins.right);
                setBottom(ins.bottom);
                setTestWidth(item.category === 'button' ? 320 : 480);
                setTestHeight(item.category === 'button' ? 72 : 360);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedItem.id === item.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {item.name.replace(/^\d+\.\s*/, '')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col gap-5">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              Slicing Margins (Source {selectedItem.targetWidth}×{selectedItem.targetHeight} px)
            </h3>

            {/* Left / Top / Right / Bottom Sliders */}
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Left Inset:</span>
                  <span className="font-mono text-amber-400 font-bold">{left} px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max={Math.round(selectedItem.targetWidth * 0.45)}
                  value={left}
                  onChange={(e) => setLeft(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Top Inset:</span>
                  <span className="font-mono text-amber-400 font-bold">{top} px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max={Math.round(selectedItem.targetHeight * 0.45)}
                  value={top}
                  onChange={(e) => setTop(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Right Inset:</span>
                  <span className="font-mono text-amber-400 font-bold">{right} px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max={Math.round(selectedItem.targetWidth * 0.45)}
                  value={right}
                  onChange={(e) => setRight(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Bottom Inset:</span>
                  <span className="font-mono text-amber-400 font-bold">{bottom} px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max={Math.round(selectedItem.targetHeight * 0.45)}
                  value={bottom}
                  onChange={(e) => setBottom(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-200 mb-3 flex items-center gap-2">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                Live Dynamic Test Resizer
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Test Widget Width:</span>
                    <span className="font-mono text-emerald-300 font-bold">{testWidth} px</span>
                  </div>
                  <input
                    type="range"
                    min="180"
                    max="650"
                    value={testWidth}
                    onChange={(e) => setTestWidth(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Test Widget Height:</span>
                    <span className="font-mono text-emerald-300 font-bold">{testHeight} px</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={testHeight}
                    onChange={(e) => setTestHeight(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              Download Source PNG ({selectedItem.targetWidth}×{selectedItem.targetHeight})
            </button>
          </div>
        </div>

        {/* Live Preview & Code Column */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Visual 9-Slice Canvas Box */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col items-center justify-center min-h-[360px] bg-grid-pattern relative overflow-hidden">
            <div className="text-xs font-semibold text-slate-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Live Simulated Stretched Widget Preview ({testWidth} × {testHeight} px)
            </div>

            {/* Test Container Stretched */}
            <div
              style={{
                width: `${testWidth}px`,
                height: `${testHeight}px`,
                borderImageSource: `url(${selectedItem.baseImage})`,
                borderImageSlice: `${top} ${right} ${bottom} ${left} fill`,
                borderImageWidth: `${Math.round(top / 4)}px ${Math.round(right / 4)}px ${Math.round(
                  bottom / 4
                )}px ${Math.round(left / 4)}px`,
                borderImageRepeat: 'stretch',
              }}
              className="relative flex items-center justify-center p-4 transition-all shadow-2xl"
            >
              {selectedItem.category === 'button' ? (
                <span className="text-slate-950 font-black tracking-wider text-sm drop-shadow-sm select-none">
                  START ADVENTURE
                </span>
              ) : (
                <div className="flex flex-col items-center justify-center text-center select-none text-amber-950">
                  <div className="text-sm font-black tracking-wide">SkySprout Quest!</div>
                  <div className="text-xs font-medium mt-1">
                    Keep your sky islands clean and earn 50 gold coins!
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 text-[11px] text-slate-400 text-center">
              Notice how the corner brackets and bevels remain perfectly crisp while the center extends to fit content!
            </div>
          </div>

          {/* Generated Flutter Code Snippet */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="text-xs font-mono font-bold text-amber-300">
                Generated Flutter centerSlice Code
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre className="text-xs font-mono text-emerald-300 bg-slate-900/90 p-4 rounded-xl overflow-x-auto border border-slate-800/80 leading-relaxed">
              {flutterCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
