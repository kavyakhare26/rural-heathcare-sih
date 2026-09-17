import React from 'react';
import { ShieldCheck, QrCode, User, Phone, MapPin, Heart, Download } from 'lucide-react';
import { PATIENT_USER } from '../../data/mockData';

export default function AbhaCard() {
  return (
    <div className="bg-gradient-to-br from-teal-900 via-emerald-800 to-slate-900 text-white rounded-2xl p-5 shadow-lg border border-emerald-500/30 relative overflow-hidden">
      {/* Background watermark badge */}
      <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
        <ShieldCheck className="w-48 h-48" />
      </div>

      {/* Top Govt Bar */}
      <div className="flex items-center justify-between border-b border-emerald-700/50 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center">
            <span className="text-xs font-black text-emerald-800">ABHA</span>
          </div>
          <div>
            <div className="text-[10px] font-bold text-emerald-200 tracking-wider uppercase">
              Ayushman Bharat Digital Mission
            </div>
            <div className="text-xs font-bold">National Health Authority • Govt. of India</div>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/30">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wide">Verified</span>
        </div>
      </div>

      {/* Card Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        {/* User Info */}
        <div className="sm:col-span-2 space-y-2">
          <div>
            <div className="text-[11px] text-emerald-300 font-medium">Cardholder Name</div>
            <div className="text-lg font-extrabold text-white tracking-wide">{PATIENT_USER.name}</div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-emerald-300 block">ABHA Number</span>
              <span className="font-mono font-bold text-sm tracking-wider text-amber-300">
                {PATIENT_USER.abhaId}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-emerald-300 block">Age / Gender</span>
              <span className="font-semibold">{PATIENT_USER.age} Yrs / {PATIENT_USER.gender}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-emerald-300 block">Blood Group</span>
              <span className="font-bold text-rose-300 flex items-center space-x-1">
                <Heart className="w-3 h-3 fill-rose-300 inline" />
                <span>{PATIENT_USER.bloodGroup}</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-emerald-300 block">Linked PHC</span>
              <span className="font-semibold text-white">PHC Rampur (Meerut)</span>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center justify-center p-3 bg-white text-slate-900 rounded-xl shadow-inner border border-emerald-200">
          <QrCode className="w-20 h-20 text-slate-900" />
          <div className="text-[9px] font-mono font-bold text-slate-600 mt-1 uppercase">Scan for Health Records</div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-3 border-t border-emerald-700/50 flex items-center justify-between text-[11px] text-emerald-200">
        <div className="flex items-center space-x-2">
          <span>PMJAY Covered: <strong className="text-white font-bold">₹5,00,000 / Yr</strong></span>
        </div>
        <button 
          onClick={() => alert('Downloading official digital ABHA card PDF...')}
          className="flex items-center space-x-1 hover:text-white transition-colors underline"
        >
          <Download className="w-3 h-3" />
          <span>Save Digital Card</span>
        </button>
      </div>
    </div>
  );
}
