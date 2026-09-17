import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  PhoneCall, 
  MapPin, 
  HeartPulse, 
  CheckCircle2, 
  ShieldAlert, 
  Navigation,
  Clock
} from 'lucide-react';
import { audioService } from '../utils/audioUtils';

export default function EmergencyModal({ isOpen, onClose, onEmergencyDispatched }) {
  const [emergencyType, setEmergencyType] = useState('Cardiac / Severe Chest Pain');
  const [dispatched, setDispatched] = useState(false);
  const [serviceId, setServiceId] = useState('');

  if (!isOpen) return null;

  const handleDispatch = () => {
    audioService.playNotificationSound();
    const emgId = `EMG-108-${Math.floor(1000 + Math.random() * 9000)}`;
    setServiceId(emgId);
    setDispatched(true);

    if (onEmergencyDispatched) {
      onEmergencyDispatched({
        serviceId: emgId,
        type: emergencyType,
        time: new Date().toLocaleTimeString(),
        status: 'Ambulance UP-15-G-4421 Dispatched',
        eta: '6 Minutes'
      });
    }
  };

  const handleReset = () => {
    setDispatched(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-rose-500 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-white/20 rounded-lg animate-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">National Emergency SOS (108)</h3>
              <p className="text-xs text-rose-100">Direct Emergency Medical Response System</p>
            </div>
          </div>
          <button 
            onClick={handleReset} 
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {!dispatched ? (
            <div className="space-y-4">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-800 leading-relaxed font-medium">
                  This service prioritizes immediate ALS/BLS Ambulance dispatch and alerts the emergency trauma ward at District Hospital Meerut.
                </p>
              </div>

              {/* GPS Detected Location */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Current GPS Geolocation</div>
                    <div className="text-[11px] text-slate-500">Rampur Village, Near PHC, Meerut UP (250401)</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Locked
                </span>
              </div>

              {/* Emergency Condition Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nature of Emergency:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    'Cardiac / Severe Chest Pain',
                    'Road Accident / Trauma',
                    'High-Risk Maternal Labor',
                    'Breathing Failure / Asthma',
                    'Unconscious / Stroke',
                    'Snakebite / Poisoning'
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setEmergencyType(item)}
                      className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                        emergencyType === item
                          ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDispatch}
                  className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-rose-600/30 active:scale-98 transition-all animate-pulse"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>DISPATCH EMERGENCY 108 NOW</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                  Ambulance En Route
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 mt-1">
                  Emergency Token: {serviceId}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Vehicle <strong>UP-15-G-4421 (Advanced Life Support)</strong> has been deployed.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Estimated Arrival (ETA):</span>
                  </span>
                  <span className="font-bold text-rose-600 text-sm">6 Minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center space-x-1">
                    <HeartPulse className="w-3.5 h-3.5" />
                    <span>Destination Hospital:</span>
                  </span>
                  <span className="font-bold text-slate-800">District Hospital Meerut (Trauma Bed Reserved)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center space-x-1">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Pilot Contact:</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-700">+91 94120-10801</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Close & Return to Portal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
