import React from 'react';
import { X, PhoneCall, MessageSquare, Radio, Info } from 'lucide-react';
import IVRSimulator from './IVRSimulator';
import SMSSimulator from './SMSSimulator';

export default function SimulatorDrawer({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab,
  onNewAppointment 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Basic Phone Access Simulator
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500 text-slate-950 uppercase">
                  Live Testing
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Experience how citizens without internet or smartphones access Aarogya Vani via IVR voice or SMS
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Simulator Switcher Tabs */}
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setActiveTab('ivr')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeTab === 'ivr'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>IVR Call (104)</span>
              </button>

              <button
                onClick={() => setActiveTab('sms')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeTab === 'sms'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>SMS Gateway (56161)</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Simulator Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-900">
          {activeTab === 'ivr' ? (
            <IVRSimulator onNewAppointment={onNewAppointment} />
          ) : (
            <SMSSimulator onNewAppointment={onNewAppointment} />
          )}
        </div>

        {/* Footer Note */}
        <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <Info className="w-3.5 h-3.5 text-teal-400" />
            <span>Actions performed in the simulator immediately sync with the central database and Doctor/Staff queues.</span>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-400 hover:underline font-semibold"
          >
            Back to Web Platform
          </button>
        </div>
      </div>
    </div>
  );
}
