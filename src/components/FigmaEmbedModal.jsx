import React, { useState } from 'react';
import { X, ExternalLink, Maximize2, Minimize2, Sparkles, RefreshCw } from 'lucide-react';

export default function FigmaEmbedModal({ isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  const figmaEmbedUrl = "https://embed.figma.com/make/3suZzlmhEJlO5kuOYUWvgn/Healthcare-Management-System?embed-host=share&theme=light";
  const figmaDirectUrl = "https://www.figma.com/make/3suZzlmhEJlO5kuOYUWvgn/Healthcare-Management-System?t=PtZMZOefhr1hl0Ao-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`bg-white rounded-2xl shadow-2xl border border-slate-200 w-full flex flex-col overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'h-full max-h-[98vh] max-w-[98vw]' : 'h-[85vh] max-w-6xl'
      }`}>
        {/* Header */}
        <div className="p-3.5 sm:px-6 bg-[#064e3b] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-emerald-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm sm:text-base">Figma Healthcare Management System</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase">
                  Figma Make
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                Interactive Figma Design Embed • Source Architecture & Mockup
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={figmaDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <span>Open in Figma</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button 
              onClick={onClose} 
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe Container */}
        <div className="flex-1 w-full h-full bg-slate-100 relative overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-500 z-10 space-y-2">
              <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-medium">Loading Figma interactive frame...</p>
            </div>
          )}

          <iframe
            src={figmaEmbedUrl}
            title="Healthcare Management System Figma Design"
            className="w-full h-full border-0"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Footer Bar */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Embedded directly from: <span className="font-mono text-[11px] text-slate-700 truncate max-w-xs sm:max-w-md inline-block align-bottom">{figmaDirectUrl}</span></span>
          <a
            href={figmaDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#064e3b] hover:underline font-bold flex items-center space-x-1"
          >
            <span>Open externally</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
