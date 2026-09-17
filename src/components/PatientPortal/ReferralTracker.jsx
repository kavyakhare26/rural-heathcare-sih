import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Hospital, 
  ArrowRight, 
  Ambulance, 
  Stethoscope, 
  ShieldCheck,
  User
} from 'lucide-react';
import { INITIAL_REFERRALS } from '../../data/mockData';

export default function ReferralTracker({ referrals = INITIAL_REFERRALS }) {
  const [searchId, setSearchId] = useState('REF-2026-8941');
  const [selectedCase, setSelectedCase] = useState(referrals[0]);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = referrals.find(r => 
      r.serviceId.toLowerCase().includes(searchId.toLowerCase()) ||
      r.patientName.toLowerCase().includes(searchId.toLowerCase())
    );
    if (found) {
      setSelectedCase(found);
    } else {
      alert(`No referral record found for "${searchId}". Try REF-2026-8941 or REF-2026-8910.`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-lg text-slate-900">Digital Referral & Service ID Tracker</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
              Zero-Loss Referrals
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time digital chain of custody from rural Primary Health Centres (PHCs) to District Specialists
          </p>
        </div>

        {/* Quick Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Search Service ID..."
              className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Track
          </button>
        </form>
      </div>

      {/* Case Details Card */}
      {selectedCase && (
        <div className="space-y-5">
          {/* Top Status Bar */}
          <div className="p-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-purple-300 font-mono">Service Token:</span>
                <span className="text-lg font-mono font-extrabold text-amber-300 tracking-wider">
                  {selectedCase.serviceId}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white uppercase">
                  {selectedCase.urgency}
                </span>
              </div>
              <div className="text-xs text-slate-300 mt-1 flex items-center space-x-2">
                <span>Patient: <strong className="text-white">{selectedCase.patientName}</strong> ({selectedCase.age}y, {selectedCase.gender})</span>
                <span>•</span>
                <span className="font-mono text-[11px] text-purple-200">ABHA: {selectedCase.abhaId}</span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] text-purple-200 block">Current Status</span>
              <span className="text-sm font-bold text-emerald-400 flex items-center sm:justify-end space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                <span>{selectedCase.status}</span>
              </span>
            </div>
          </div>

          {/* Transfer Route Visualizer */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
                PHC
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Referring Facility</div>
                <div className="font-bold text-slate-900 text-xs">{selectedCase.fromFacility}</div>
                <div className="text-[11px] text-slate-600">By {selectedCase.referringDoctor}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-purple-600 font-bold text-xs">
              <div className="h-0.5 w-12 bg-purple-300 hidden md:block"></div>
              <div className="flex items-center space-x-1 px-3 py-1 bg-purple-100 rounded-full border border-purple-200">
                <Ambulance className="w-4 h-4 animate-bounce" />
                <span>{selectedCase.transportType}</span>
              </div>
              <div className="h-0.5 w-12 bg-purple-300 hidden md:block"></div>
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs shrink-0">
                HOSP
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Destination Facility</div>
                <div className="font-bold text-slate-900 text-xs">{selectedCase.toFacility}</div>
                <div className="text-[11px] text-indigo-700 font-semibold">{selectedCase.specialistRequired}</div>
              </div>
            </div>
          </div>

          {/* Clinical Doctor Notes */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950">
            <div className="flex items-center space-x-1.5 font-bold text-amber-900 mb-1">
              <Stethoscope className="w-4 h-4 text-amber-700" />
              <span>Attending Medical Officer Clinical Notes & Triage:</span>
            </div>
            <p className="leading-relaxed text-amber-900/90 font-medium">
              "{selectedCase.notes}"
            </p>
          </div>

          {/* Milestone Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>Digital Chain-of-Custody Timeline:</span>
            </h4>

            <div className="space-y-3 pl-2 border-l-2 border-purple-200 ml-2">
              {selectedCase.timeline.map((item, idx) => (
                <div key={idx} className="relative pl-4 text-xs">
                  <div className="absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-purple-600 ring-4 ring-white"></div>
                  <div className="font-bold text-slate-800 text-[11px]">{item.time}</div>
                  <div className="text-slate-600 mt-0.5">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
