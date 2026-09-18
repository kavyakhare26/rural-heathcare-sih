
import React from 'react';
import {
  HeartHandshake,
  PhoneCall,
  MessageSquare,
  Layers,
  Globe,
  Stethoscope,
  UserCheck,
  Building2,
  BarChart3,
  Phone,
} from 'lucide-react';

export default function Header({
  currentPersona,
  setCurrentPersona,
  openSimulator,
  setOpenSimulator,
  simulatorTab,
  setSimulatorTab,
  openArchitecture,
  setOpenArchitecture,
  openEmergencyModal,
  language,
  setLanguage,
}) {
  const personas = [
    { id: 'patient', label: 'Patient', icon: UserCheck },
    { id: 'doctor', label: 'Doctor', icon: Stethoscope },
    { id: 'staff', label: 'PHC / CHC', icon: Building2 },
    { id: 'admin', label: 'Admin', icon: BarChart3 },
    {
      id: 'architecture',
      label: 'Architecture',
      icon: Layers,
      isAction: 'architecture',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm transition-all">

      {/* Top Deep Green Navbar */}
      <div className="bg-[#064e3b] text-white px-4 sm:px-8 py-2.5 flex items-center justify-between">

        {/* Left: Logo & National Healthcare Branding */}
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner">
            <HeartHandshake className="w-5 h-5 text-emerald-300" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight text-white font-display">
                Aarogya Vani
              </span>
            </div>

            <p className="text-[11px] text-emerald-100/80 -mt-0.5 font-medium">
              National Universal Healthcare Access System • Ministry of Health
            </p>
          </div>
        </div>

        {/* Right: Language & Emergency Call Button */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">

          {/* Language Selector */}
          <div className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-full text-xs transition-colors">
            <Globe className="w-3.5 h-3.5 text-emerald-300" />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-white text-xs border-0 focus:ring-0 cursor-pointer font-semibold outline-none"
            >
              <option value="en" className="text-slate-900">
                English (EN)
              </option>

              <option value="hi" className="text-slate-900">
                हिन्दी (Hindi)
              </option>

              <option value="mr" className="text-slate-900">
                मराठी (Marathi)
              </option>
            </select>
          </div>

          {/* Emergency 108 Call Button */}
          <button
            onClick={() => openEmergencyModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#d97706] hover:bg-[#b45309] text-white shadow-sm transition-all active:scale-95"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Emergency: 108</span>
          </button>
        </div>
      </div>

      {/* Secondary Persona & Channel Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">

        {/* Persona Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs">
          {personas.map((p) => {
            const Icon = p.icon;
            const isActive = currentPersona === p.id;

            return (
              <button
                key={p.id}
                onClick={() => {
                  if (p.isAction === 'architecture') {
                    setOpenArchitecture(true);
                  } else {
                    setCurrentPersona(p.id);
                  }
                }}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#065f46] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                />

                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Channel Quick Access */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-[11px] text-slate-500 font-medium hidden md:inline">
            Channels:
          </span>

          {/* IVR */}
          <button
            onClick={() => {
              setSimulatorTab('ivr');
              setOpenSimulator(true);
            }}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
            <span>IVR (104)</span>
          </button>

          {/* SMS */}
          <button
            onClick={() => {
              setSimulatorTab('sms');
              setOpenSimulator(true);
            }}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
            <span>SMS (56161)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
