import React, { useState } from 'react';
import { 
  Calendar, 
  Pill, 
  Hospital, 
  FileText, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  PhoneCall, 
  MessageSquare, 
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  User,
  Phone,
  Bot,
  ExternalLink,
  MapPin
} from 'lucide-react';
import AbhaCard from './AbhaCard';
import AppointmentBooking from './AppointmentBooking';
import MedicineTracker from './MedicineTracker';
import FacilityLocator from './FacilityLocator';
import ReferralTracker from './ReferralTracker';
import { PATIENT_USER, INITIAL_REFERRALS } from '../../data/mockData';

export default function PatientDashboard({ 
  appointments, 
  onOpenSymptomChecker, 
  onOpenSimulator, 
  setSimulatorTab,
  onNewAppointment
}) {
  const [activeSubTab, setActiveSubTab] = useState('overview'); // overview, book, facilities, referrals, medicines
  const [prefilledSymptom, setPrefilledSymptom] = useState('');

  const subTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'book', label: 'Book Appointment' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'referrals', label: 'Referrals' },
    { id: 'medicines', label: 'Medicine Stock' }
  ];

  return (
    <div className="space-y-5">
      {/* 1. Patient Profile Summary Card matching Figma */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Avatar & Patient Demographic details */}
        <div className="flex items-center space-x-4">
          <div className="w-13 h-13 w-12 h-12 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0">
            <User className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-slate-900">{PATIENT_USER.name}</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {PATIENT_USER.gender}, {PATIENT_USER.age} yrs • ABHA ID: <span className="font-mono text-slate-700 font-semibold">{PATIENT_USER.abhaId}</span>
            </p>
            <div className="text-[11px] text-slate-600 flex items-center space-x-1 mt-0.5">
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>Linked PHC: <strong>{PATIENT_USER.linkedPhc}</strong></span>
            </div>
          </div>
        </div>

        {/* Right: 3 Quick Metric Counter Pills from Figma */}
        <div className="flex items-center space-x-3 text-center">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl min-w-[90px]">
            <div className="text-xl font-extrabold text-emerald-700">{appointments.length}</div>
            <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">Appointments</div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl min-w-[90px]">
            <div className="text-xl font-extrabold text-amber-600">{INITIAL_REFERRALS.length}</div>
            <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">Referrals</div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl min-w-[90px]">
            <div className="text-xl font-extrabold text-blue-600">1</div>
            <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wide">Active Rx</div>
          </div>
        </div>
      </div>

      {/* 2. Deep Green Multichannel Support Card matching Figma */}
      <div className="bg-[#064e3b] text-white rounded-2xl p-5 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-emerald-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white tracking-wide">
                IVR, SMS & Channels — Basic Phone Healthcare Support
              </h3>
              <p className="text-[11px] text-emerald-200/80">
                Zero-data access via voice calls and SMS for basic phones and feature phones
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveSubTab('book')}
            className="px-3.5 py-1.5 rounded-xl bg-white text-[#064e3b] hover:bg-emerald-50 font-extrabold text-xs flex items-center space-x-1.5 shadow-sm transition-all shrink-0 self-start sm:self-auto"
          >
            <span>+ Book New Appointment</span>
          </button>
        </div>

        {/* 3 Inner Channel Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Card 1: Toll Free 104 */}
          <div 
            onClick={() => {
              setSimulatorTab('ivr');
              onOpenSimulator(true);
            }}
            className="p-3.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl cursor-pointer transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-amber-300 text-xs tracking-wider">Toll-Free: 104</span>
              <PhoneCall className="w-3.5 h-3.5 text-emerald-300 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-white font-semibold text-[11px]">IVR Voice Helpline</div>
            <p className="text-[10px] text-emerald-100/70 leading-relaxed">
              Dial 104 to book appointments, check PHC stock, or speak naturally with the voice assistant.
            </p>
          </div>

          {/* Card 2: SMS 56161 */}
          <div 
            onClick={() => {
              setSimulatorTab('sms');
              onOpenSimulator(true);
            }}
            className="p-3.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl cursor-pointer transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-amber-300 text-xs tracking-wider">SMS to 56161</span>
              <MessageSquare className="w-3.5 h-3.5 text-emerald-300 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-white font-semibold text-[11px]">2G Text Gateway</div>
            <p className="text-[10px] text-emerald-100/70 leading-relaxed">
              Send "BOOK &lt;symptom&gt;" or "MED &lt;name&gt;" for instant automated SMS token responses.
            </p>
          </div>

          {/* Card 3: AI Assistant */}
          <div 
            onClick={onOpenSymptomChecker}
            className="p-3.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl cursor-pointer transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-amber-300 text-xs tracking-wider">AI Health Guide</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-300 group-hover:rotate-45 transition-transform" />
            </div>
            <div className="text-white font-semibold text-[11px]">Conversational Triage</div>
            <p className="text-[10px] text-emerald-100/70 leading-relaxed">
              24x7 intelligent health guidance, ICMR symptom triage, and immediate care advice.
            </p>
          </div>
        </div>

        <div className="text-[10px] text-emerald-200/70 flex items-center justify-between pt-1">
          <span>Available in Hindi, English, and regional languages • Zero internet required for 104 & 56161</span>
          <span className="font-mono text-emerald-300">Channel Status: 100% Operational</span>
        </div>
      </div>

      {/* 3. Sub-Navigation Tabs matching Figma */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 text-xs">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. Tab Contents */}

      {/* Tab A: Overview (2-Column Grid matching Figma) */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left Column: Upcoming Appointments */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Upcoming Appointments</h3>
              </div>
              <button 
                onClick={() => setActiveSubTab('book')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                + Book New
              </button>
            </div>

            <div className="space-y-3">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{apt.doctor}</h4>
                      <p className="text-xs text-slate-500">{apt.specialty} • {apt.facility}</p>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      apt.status === 'Confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {apt.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center space-x-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{apt.date} • {apt.timeSlot}</span>
                    </div>

                    <span className="font-mono text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold">
                      Token: {apt.serviceId}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Active Referrals */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900">Active Referrals</h3>
              </div>
              <button 
                onClick={() => setActiveSubTab('referrals')}
                className="text-xs font-bold text-amber-700 hover:text-amber-800"
              >
                Track Status
              </button>
            </div>

            <div className="space-y-3">
              {INITIAL_REFERRALS.map((refCase) => (
                <div
                  key={refCase.serviceId}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-300 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-slate-900">{refCase.serviceId}</span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      refCase.urgency === 'Urgent'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {refCase.urgency}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-800">
                    {refCase.fromFacility} <span className="text-slate-400">→</span> {refCase.toFacility}
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {refCase.notes}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                    <span>Transport: {refCase.transportType}</span>
                    <span className="font-bold text-emerald-700">{refCase.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab B: Book Appointment */}
      {activeSubTab === 'book' && (
        <AppointmentBooking 
          prefilledSymptom={prefilledSymptom}
          onAppointmentCreated={(newApt) => {
            if (onNewAppointment) onNewAppointment(newApt);
            setActiveSubTab('overview');
          }}
          onCancel={() => setActiveSubTab('overview')}
        />
      )}

      {/* Tab C: Facilities */}
      {activeSubTab === 'facilities' && (
        <FacilityLocator />
      )}

      {/* Tab D: Referrals */}
      {activeSubTab === 'referrals' && (
        <ReferralTracker />
      )}

      {/* Tab E: Medicine Stock */}
      {activeSubTab === 'medicines' && (
        <MedicineTracker />
      )}
    </div>
  );
}
