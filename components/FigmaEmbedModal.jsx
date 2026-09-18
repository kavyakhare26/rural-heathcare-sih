
import React, { useState } from 'react';
import { X, Maximize2, Minimize2, Sparkles } from 'lucide-react';

export default function EmbedModal({ isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div
        className={`bg-white rounded-2xl shadow-2xl border border-slate-200 w-full flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? 'h-full max-h-[98vh] max-w-[98vw]'
            : 'h-[85vh] max-w-6xl'
        }`}
      >
        {/* Header */}
        <div className="p-3.5 sm:px-6 bg-[#064e3b] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-emerald-300">
              <Sparkles className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-sm sm:text-base">
                Healthcare Management System
              </h3>
              <p className="text-[11px] text-emerald-200">
                Healthcare Management System
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center bg-slate-100">
          <div className="text-center text-slate-500">
            <h2 className="text-lg font-semibold">
              Healthcare Management System
            </h2>
            <p className="text-sm mt-2">
              Content can be added here.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
          Healthcare Management System
        </div>
      </div>
    </div>
  );
}


