import React, { useState } from 'react';
import { generatePubspecYaml, generateDartClass, generateReadme } from '../utils/zipExporter';
import { BackgroundItem } from '../data/backgroundsData';
import { X, Copy, Check, FileCode, BookOpen, Download } from 'lucide-react';

interface FlutterCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: BackgroundItem;
}

export const FlutterCodeModal: React.FC<FlutterCodeModalProps> = ({
  isOpen,
  onClose,
  selectedItem,
}) => {
  const [activeTab, setActiveTab] = useState<'dart' | 'pubspec' | 'snippet' | 'readme'>(
    selectedItem ? 'snippet' : 'dart'
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const pubspecCode = generatePubspecYaml();
  const dartCode = generateDartClass();
  const readmeCode = generateReadme();
  const snippetCode = selectedItem?.dartSnippet || dartCode;

  const getCodeContent = () => {
    switch (activeTab) {
      case 'dart':
        return dartCode;
      case 'pubspec':
        return pubspecCode;
      case 'snippet':
        return snippetCode;
      case 'readme':
        return readmeCode;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">
                Flutter Integration Code
              </h3>
              <p className="text-xs text-slate-400">
                Ready-to-use Dart classes, pubspec.yaml assets list, and 9-slice components
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls & Copy Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-1.5">
            {selectedItem && (
              <button
                onClick={() => setActiveTab('snippet')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'snippet'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Selected Screen Snippet
              </button>
            )}
            <button
              onClick={() => setActiveTab('dart')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dart'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              app_backgrounds.dart
            </button>
            <button
              onClick={() => setActiveTab('pubspec')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pubspec'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              pubspec.yaml
            </button>
            <button
              onClick={() => setActiveTab('readme')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'readme'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              README.md
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-transform hover:scale-105"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Code'}
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-5 overflow-auto bg-slate-950">
          <pre className="text-xs font-mono text-emerald-300 leading-relaxed">
            {getCodeContent()}
          </pre>
        </div>
      </div>
    </div>
  );
};
