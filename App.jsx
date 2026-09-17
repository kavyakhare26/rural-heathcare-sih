import React, { useState } from 'react';
import Header from './components/Header';
import PatientDashboard from './components/PatientPortal/PatientDashboard';
import DoctorDashboard from './components/DoctorPortal/DoctorDashboard';
import PHCStaffDashboard from './components/StaffPortal/PHCStaffDashboard';
import AdminAnalytics from './components/AdminPortal/AdminAnalytics';
import SimulatorDrawer from './components/ChannelSimulators/SimulatorDrawer';
import ArchitectureModal from './components/ArchitectureModal';
import EmergencyModal from './components/EmergencyModal';
import SymptomCheckerModal from './components/PatientPortal/SymptomCheckerModal';
import FigmaEmbedModal from './components/FigmaEmbedModal';
import { 
  INITIAL_APPOINTMENTS, 
  MOCK_MEDICINES, 
  INITIAL_REFERRALS 
} from './data/mockData';
import { 
  PhoneCall, 
  MessageSquare, 
  Layers, 
  Sparkles, 
  HeartHandshake,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [currentPersona, setCurrentPersona] = useState('patient'); // 'patient' | 'doctor' | 'staff' | 'admin'
  const [language, setLanguage] = useState('en');
  
  // Modals & Simulators State
  const [openSimulator, setOpenSimulator] = useState(false);
  const [simulatorTab, setSimulatorTab] = useState('ivr'); // 'ivr' | 'sms'
  const [openArchitecture, setOpenArchitecture] = useState(false);
  const [openEmergency, setOpenEmergency] = useState(false);
  const [openSymptomChecker, setOpenSymptomChecker] = useState(false);
  const [openFigmaModal, setOpenFigmaModal] = useState(false);

  // Live Shared Healthcare Database State
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [medicines, setMedicines] = useState(MOCK_MEDICINES);
  const [referrals, setReferrals] = useState(INITIAL_REFERRALS);

  // Add new appointment from IVR, SMS, or Web
  const handleNewAppointment = (newApt) => {
    setAppointments(prev => [newApt, ...prev]);
  };

  // Add new referral from Doctor
  const handleGenerateReferral = (newRef) => {
    setReferrals(prev => [newRef, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Universal Navigation Header */}
      <Header 
        currentPersona={currentPersona}
        setCurrentPersona={setCurrentPersona}
        openSimulator={openSimulator}
        setOpenSimulator={setOpenSimulator}
        simulatorTab={simulatorTab}
        setSimulatorTab={setSimulatorTab}
        openArchitecture={openArchitecture}
        setOpenArchitecture={setOpenArchitecture}
        openEmergencyModal={setOpenEmergency}
        openFigmaModal={openFigmaModal}
        setOpenFigmaModal={setOpenFigmaModal}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentPersona === 'patient' && (
          <PatientDashboard 
            appointments={appointments}
            onOpenSymptomChecker={() => setOpenSymptomChecker(true)}
            onOpenSimulator={setOpenSimulator}
            setSimulatorTab={setSimulatorTab}
            onNewAppointment={handleNewAppointment}
          />
        )}

        {currentPersona === 'doctor' && (
          <DoctorDashboard 
            appointments={appointments}
            onGenerateReferral={handleGenerateReferral}
            onCompleteAppointment={(id) => {
              setAppointments(prev => prev.filter(a => a.id !== id));
            }}
          />
        )}

        {currentPersona === 'staff' && (
          <PHCStaffDashboard 
            appointments={appointments}
            medicines={medicines}
            setMedicines={setMedicines}
            onCheckInPatient={(aptId) => {
              setAppointments(prev => prev.map(a => a.id === aptId ? { ...a, status: 'Checked In' } : a));
            }}
          />
        )}

        {currentPersona === 'admin' && (
          <AdminAnalytics 
            onOpenArchitecture={() => setOpenArchitecture(true)}
          />
        )}
      </main>

      {/* Floating Basic Phone Simulator Quick Launcher */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center space-x-2">
        <button
          onClick={() => setOpenFigmaModal(true)}
          className="flex items-center space-x-2 px-3.5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 shadow-xl border border-slate-300 font-bold text-xs hover:scale-105 transition-all"
          title="Open Figma Prototype Embed"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>Figma View</span>
        </button>

        <button
          onClick={() => {
            setSimulatorTab('ivr');
            setOpenSimulator(true);
          }}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl border border-slate-700 font-bold text-xs hover:scale-105 transition-all group"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping"></div>
          <PhoneCall className="w-4 h-4 text-emerald-400" />
          <span>Test IVR (104)</span>
        </button>

        <button
          onClick={() => {
            setSimulatorTab('sms');
            setOpenSimulator(true);
          }}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-[#065f46] hover:bg-[#064e3b] text-white shadow-xl border border-emerald-500 font-bold text-xs hover:scale-105 transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Test SMS (56161)</span>
        </button>
      </div>

      {/* Interactive Overlays & Modals */}
      <SimulatorDrawer 
        isOpen={openSimulator}
        onClose={() => setOpenSimulator(false)}
        activeTab={simulatorTab}
        setActiveTab={setSimulatorTab}
        onNewAppointment={handleNewAppointment}
      />

      <ArchitectureModal 
        isOpen={openArchitecture}
        onClose={() => setOpenArchitecture(false)}
      />

      <EmergencyModal 
        isOpen={openEmergency}
        onClose={() => setOpenEmergency(false)}
      />

      <SymptomCheckerModal 
        isOpen={openSymptomChecker}
        onClose={() => setOpenSymptomChecker(false)}
        onBookAppointmentFromTriage={(symptom) => {
          setCurrentPersona('patient');
        }}
      />

      <FigmaEmbedModal 
        isOpen={openFigmaModal}
        onClose={() => setOpenFigmaModal(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-[#065f46] text-white flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-bold">Aarogya Vani • Team MediSage</div>
              <p className="text-[11px] text-slate-500">Smart India Hackathon 2026 Grand Finale Innovation</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <button onClick={() => setOpenArchitecture(true)} className="hover:text-white transition-colors">
              Solution Architecture
            </button>
            <button onClick={() => setOpenFigmaModal(true)} className="hover:text-white transition-colors text-amber-400 font-semibold">
              Figma Prototype
            </button>
            <button onClick={() => { setSimulatorTab('ivr'); setOpenSimulator(true); }} className="hover:text-white transition-colors">
              IVR Helpline Simulator
            </button>
            <button onClick={() => { setSimulatorTab('sms'); setOpenSimulator(true); }} className="hover:text-white transition-colors">
              SMS Gateway Simulator
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-medium">Ayushman Bharat & PMJAY Aligned</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
