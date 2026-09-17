import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  MessageSquare, 
  Globe, 
  Cpu, 
  Database, 
  Radio, 
  Calendar, 
  Pill, 
  UserCheck, 
  Hospital, 
  FileText, 
  CheckCircle2, 
  ArrowDown, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function ArchitectureModal({ isOpen, onClose }) {
  const [activeLayer, setActiveLayer] = useState('all');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-emerald-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold tracking-tight">System Architecture & Solution Blueprint</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase">
                  SIH 2026 Model
                </span>
              </div>
              <p className="text-xs text-slate-300">
                AAROGYA VANI — Inclusive Multichannel Healthcare for Rural & Urban India
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50">
          {/* Key Value Proposition Pills matching the slide */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="font-bold text-emerald-900 block mb-1">1. Multichannel Access</span>
              <p className="text-emerald-700 text-[11px]">IVR, SMS & Web for basic-phone and smartphone parity.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200">
              <span className="font-bold text-teal-900 block mb-1">2. AI Assistance</span>
              <p className="text-teal-700 text-[11px]">Conversational triage, voice triage, and health prevention guidance.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200">
              <span className="font-bold text-cyan-900 block mb-1">3. Patient Web Portal</span>
              <p className="text-cyan-700 text-[11px]">Appointments, ABHA health records, medicine stock & facility finder.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200">
              <span className="font-bold text-indigo-900 block mb-1">4. Connected Network</span>
              <p className="text-indigo-700 text-[11px]">Bridges Patients, Doctors, PHCs, CHCs, and District Hospitals.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
              <span className="font-bold text-purple-900 block mb-1">5. Smart Referrals</span>
              <p className="text-purple-700 text-[11px]">Service ID tracking, bed reservations, and 108 ambulance sync.</p>
            </div>
          </div>

          {/* High Fidelity Architecture Diagram Diagram matching slide */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="text-center font-bold text-sm tracking-wider uppercase text-slate-500">
              Interactive System Dataflow & Processing Layers
            </div>

            {/* Layer 1: Users */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3 text-center">
                Tier 1: Users Ecosystem
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-center shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-1.5">
                    📱
                  </div>
                  <div className="font-bold text-xs text-slate-800">Patients</div>
                  <div className="text-[10px] text-slate-500 font-medium">Basic Phone Users (IVR / SMS)</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 text-center shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-1.5">
                    🩺
                  </div>
                  <div className="font-bold text-xs text-slate-800">Doctors & Specialists</div>
                  <div className="text-[10px] text-slate-500 font-medium">Tele-consult & E-Prescriptions</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 text-center shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-1.5">
                    🏥
                  </div>
                  <div className="font-bold text-xs text-slate-800">PHC / CHC Staff</div>
                  <div className="text-[10px] text-slate-500 font-medium">ANM, MO, Pharmacy Stock</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 text-center shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-1.5">
                    📊
                  </div>
                  <div className="font-bold text-xs text-slate-800">Administrators</div>
                  <div className="text-[10px] text-slate-500 font-medium">District CMO & Health Ministry</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center -my-2">
              <div className="p-1 rounded-full bg-slate-200 text-slate-600">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>

            {/* Layer 2: Access Channels */}
            <div className="border border-teal-200 rounded-xl p-4 bg-teal-50/40">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block mb-3 text-center">
                Tier 2: Unified Access Channels
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg border border-teal-200 text-center shadow-xs hover:border-teal-400 transition-all">
                  <PhoneCall className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                  <div className="font-bold text-xs text-slate-900">IVR Helpline</div>
                  <div className="text-[11px] text-emerald-700 font-semibold italic">"Speak Naturally" (104)</div>
                  <div className="text-[10px] text-slate-500 mt-1">Speech Recognition & DTMF Tones</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-teal-200 text-center shadow-xs hover:border-teal-400 transition-all">
                  <MessageSquare className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                  <div className="font-bold text-xs text-slate-900">SMS Gateway</div>
                  <div className="text-[11px] text-emerald-700 font-semibold italic">"Send a Text" (56161)</div>
                  <div className="text-[10px] text-slate-500 mt-1">Low-bandwidth NLP Keyword Bot</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-teal-200 text-center shadow-xs hover:border-teal-400 transition-all">
                  <Globe className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                  <div className="font-bold text-xs text-slate-900">Web & App Portal</div>
                  <div className="text-[11px] text-emerald-700 font-semibold italic">"Use a Browser"</div>
                  <div className="text-[10px] text-slate-500 mt-1">Rich Dashboards & Telemedicine</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center -my-2">
              <div className="p-1 rounded-full bg-slate-200 text-slate-600">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>

            {/* Layer 3: AI & Healthcare Service Engine */}
            <div className="border-2 border-emerald-500/40 rounded-xl p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left: External Services */}
                <div className="p-3 bg-white/90 rounded-lg border border-slate-200 w-full md:w-56 text-center">
                  <Radio className="w-5 h-5 text-rose-500 mx-auto mb-1 animate-pulse" />
                  <div className="font-bold text-xs text-slate-800">External Services</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    GSM Telecom Voice, SMS Gateway, GPS Geolocation, UPI/Co-pay
                  </p>
                </div>

                {/* Center: Core Engine */}
                <div className="p-4 bg-white rounded-xl border-2 border-emerald-500 shadow-md text-center flex-1 max-w-md">
                  <div className="inline-flex p-2 bg-emerald-100 text-emerald-800 rounded-full mb-1">
                    <Sparkles className="w-6 h-6 animate-spin text-emerald-600" />
                  </div>
                  <div className="font-extrabold text-sm text-slate-900">
                    AI & Healthcare Service Engine
                  </div>
                  <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                    Understand • Assist • Connect
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1.5 flex justify-center space-x-3">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded">Multilingual NLP</span>
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded">Triage Classifier</span>
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded">Routing Broker</span>
                  </div>
                </div>

                {/* Right: Centralized Database */}
                <div className="p-3 bg-white/90 rounded-lg border border-slate-200 w-full md:w-56 text-center">
                  <Database className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                  <div className="font-bold text-xs text-slate-800">Centralized Database</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    ABHA IDs, Appointments, Real-time Stock, Digital Referrals
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center -my-2">
              <div className="p-1 rounded-full bg-slate-200 text-slate-600">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>

            {/* Layer 4: Healthcare Services Delivered */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3 text-center">
                Tier 4: Healthcare Services Delivered to Citizens
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center">
                  <Calendar className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <div className="font-bold text-xs text-slate-800">Appointments</div>
                  <div className="text-[10px] text-slate-500">OPD & Tele-booking</div>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center">
                  <Pill className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <div className="font-bold text-xs text-slate-800">Medicine Stock</div>
                  <div className="text-[10px] text-slate-500">PHC & Jan Aushadhi</div>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center">
                  <UserCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <div className="font-bold text-xs text-slate-800">Specialist Finder</div>
                  <div className="text-[10px] text-slate-500">OPD schedules & roster</div>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center">
                  <Hospital className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <div className="font-bold text-xs text-slate-800">Nearby Facilities</div>
                  <div className="text-[10px] text-slate-500">PHC / CHC beds & oxygen</div>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center">
                  <FileText className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <div className="font-bold text-xs text-slate-800">Referral Tracker</div>
                  <div className="text-[10px] text-slate-500">Service ID tracking</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>All 4 operational tiers are fully simulated in this prototype.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Explore Prototype
          </button>
        </div>
      </div>
    </div>
  );
}
