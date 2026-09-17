import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Volume2, 
  VolumeX, 
  Mic, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Radio
} from 'lucide-react';
import { audioService } from '../../utils/audioUtils';
import { MOCK_MEDICINES, INITIAL_REFERRALS } from '../../data/mockData';

export default function IVRSimulator({ onNewAppointment }) {
  const [callState, setCallState] = useState('IDLE'); // IDLE, RINGING, CONNECTED, ENDED
  const [ivrStep, setIvrStep] = useState('MAIN_MENU'); // LANG, MAIN_MENU, BOOK_SYMPTOM, MED_SELECT, REF_INPUT, EMERGENCY
  const [callLang, setCallLang] = useState('en'); // 'en' or 'hi'
  const [audioVoiceEnabled, setAudioVoiceEnabled] = useState(true);
  const [transcript, setTranscript] = useState([]);
  const [dialedInput, setDialedInput] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef(null);
  const transcriptEndRef = useRef(null);

  // Auto scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // Call duration counter
  useEffect(() => {
    if (callState === 'CONNECTED') {
      timerRef.current = setInterval(() => {
        setCallDuration(d => d + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => clearInterval(timerRef.current);
  }, [callState]);

  const addTranscript = (sender, message) => {
    setTranscript(prev => [...prev, { sender, message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }]);
    if (sender === 'IVR Agent' && audioVoiceEnabled) {
      const speechLang = callLang === 'hi' ? 'hi-IN' : 'en-IN';
      audioService.speakText(message, speechLang);
    }
  };

  const handleStartCall = () => {
    setCallState('RINGING');
    setTranscript([]);
    setDialedInput('');
    setIvrStep('MAIN_MENU');
    audioService.playRingTone();

    setTimeout(() => {
      setCallState('CONNECTED');
      const greeting = callLang === 'hi'
        ? "नमस्ते! आरोग्य वाणी 104 हेल्पलाइन में आपका स्वागत है। ओपीडी अपॉइंटमेंट बुक करने के लिए 1 दबाएं। प्राथमिक स्वास्थ्य केंद्र (PHC) में दवा की उपलब्धता जांचने के लिए 2 दबाएं। रेफरल सर्विस आईडी ट्रैक करने के लिए 3 दबाएं। आपातकालीन एम्बुलेंस के लिए 9 दबाएं।"
        : "Welcome to Aarogya Vani 104 National Health Helpline. Press 1 to book an OPD Appointment at your nearest PHC. Press 2 to check Essential Medicine Stock. Press 3 to track your Referral Service ID. Press 9 for Emergency 108 Ambulance.";
      addTranscript('IVR Agent', greeting);
    }, 1600);
  };

  const handleEndCall = () => {
    audioService.stopSpeaking();
    setCallState('ENDED');
    addTranscript('System', 'Call disconnected by user.');
    setTimeout(() => {
      setCallState('IDLE');
    }, 2000);
  };

  const handleKeyPress = (key) => {
    audioService.playDtmfTone(key);
    setDialedInput(prev => prev + key);

    if (callState !== 'CONNECTED') return;

    addTranscript('User', `Key Pressed: [${key}]`);

    // Process DTMF selection based on IVR Step
    if (ivrStep === 'MAIN_MENU') {
      if (key === '1') {
        setIvrStep('BOOK_SYMPTOM');
        const msg = callLang === 'hi'
          ? "अपॉइंटमेंट के लिए लक्षण चुनें: बुखार और फ्लू के लिए 1 दबाएं। मातृ एवं शिशु जांच के लिए 2 दबाएं। पेट दर्द या दस्त के लिए 3 दबाएं।"
          : "Please select symptom category: Press 1 for Fever & Flu. Press 2 for Maternal Care & ANC. Press 3 for Stomach & Dehydration.";
        addTranscript('IVR Agent', msg);
      } else if (key === '2') {
        setIvrStep('MED_SELECT');
        const msg = callLang === 'hi'
          ? "दवा स्टॉक जांच: पैरासिटामोल के लिए 1 दबाएं। ओआरएस (ORS) के लिए 2 दबाएं। एमोक्सिसिलिन के लिए 3 दबाएं।"
          : "Medicine Stock Checker: Press 1 for Paracetamol. Press 2 for ORS Sachets. Press 3 for Amoxicillin Antibiotic.";
        addTranscript('IVR Agent', msg);
      } else if (key === '3') {
        setIvrStep('REF_INPUT');
        const msg = callLang === 'hi'
          ? "रेफरल ट्रैकिंग: आपके हालिया केस REF-2026-8941 की स्थिति जांचने के लिए 1 दबाएं।"
          : "Referral Status: Press 1 to track your latest active referral case (REF-2026-8941).";
        addTranscript('IVR Agent', msg);
      } else if (key === '9') {
        setIvrStep('EMERGENCY');
        const msg = callLang === 'hi'
          ? "आपातकाल: आपकी लोकेशन Meerut PHC के 108 एम्बुलेंस कंट्रोल रूम को भेज दी गई है। निकटतम वाहन UP-15-G-4421 रवाना हो चुका है।"
          : "Emergency Alert: Your call has been prioritized to 108 Ambulance Dispatch. Nearest vehicle UP-15-G-4421 is dispatched to your GPS location.";
        addTranscript('IVR Agent', msg);
        audioService.playNotificationSound();
      } else {
        addTranscript('IVR Agent', callLang === 'hi' ? "अमान्य विकल्प। कृपया 1, 2, 3 या 9 दबाएं।" : "Invalid option. Please press 1, 2, 3 or 9.");
      }
    } else if (ivrStep === 'BOOK_SYMPTOM') {
      let symptomName = "General Health Consultation";
      if (key === '1') symptomName = "High Fever & Flu (3 Days)";
      if (key === '2') symptomName = "Maternal 2nd Trimester Checkup";
      if (key === '3') symptomName = "Severe Stomach Ache & Dehydration";

      const newServiceId = `SRV-${Math.floor(1000 + Math.random() * 9000)}`;
      const newApt = {
        id: `APT-${Date.now()}`,
        serviceId: newServiceId,
        patientName: 'Basic Phone Citizen (IVR)',
        phone: '+91 98765-XXXXX',
        abhaId: '91-4829-1029-4821',
        channel: 'IVR Call (104)',
        facility: 'PHC Rampur',
        doctor: 'Dr. Sunita Sharma',
        specialty: 'General Physician',
        date: 'Tomorrow',
        timeSlot: '10:00 AM',
        status: 'Confirmed',
        symptoms: symptomName,
        urgency: key === '1' ? 'Medium' : 'Routine',
        smsSent: true
      };

      if (onNewAppointment) onNewAppointment(newApt);

      const confirmMsg = callLang === 'hi'
        ? `बधाई! आपका टोकन नंबर ${newServiceId} है। कल सुबह 10:00 बजे PHC रामपुर में डॉ. सुनीता शर्मा से परामर्श हेतु कन्फर्म हो गया है। एसएमएस भेज दिया गया है।`
        : `Confirmed! Your Service ID is ${newServiceId}. Your OPD slot is booked for tomorrow 10:00 AM at PHC Rampur with Dr. Sunita Sharma. Confirmation SMS sent to your phone.`;
      
      addTranscript('IVR Agent', confirmMsg);
      audioService.playNotificationSound();
      setIvrStep('MAIN_MENU');
    } else if (ivrStep === 'MED_SELECT') {
      let medInfo = "";
      if (key === '1') medInfo = "Paracetamol 500mg: 840 strips available in stock at PHC Rampur. Free under Jan Aushadhi.";
      else if (key === '2') medInfo = "ORS Sachets: 520 units in stock at PHC Rampur. Available Free.";
      else if (key === '3') medInfo = "Amoxicillin 500mg: Low stock (34 strips) at CHC Mawana. Re-stocking scheduled tomorrow.";
      else medInfo = "Cetirizine 10mg: Currently out of stock at PHC Rampur. Alternative available at CHC Mawana.";

      addTranscript('IVR Agent', medInfo);
      setIvrStep('MAIN_MENU');
      setTimeout(() => {
        addTranscript('IVR Agent', "Press 1 to return to main menu or 0 to end call.");
      }, 3000);
    } else if (ivrStep === 'REF_INPUT') {
      const refCase = INITIAL_REFERRALS[0];
      const statusMsg = `Referral ${refCase.serviceId} for ${refCase.patientName}: Status is "${refCase.status}". Destination: ${refCase.toFacility}. Specialist: ${refCase.specialistRequired}.`;
      addTranscript('IVR Agent', statusMsg);
      setIvrStep('MAIN_MENU');
    }
  };

  const formatSeconds = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-700 flex flex-col md:flex-row gap-5">
      {/* Left: Virtual Phone Display & Dialpad */}
      <div className="w-full md:w-72 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
        {/* Phone Top Status */}
        <div className="w-full flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
          <div className="flex items-center space-x-1">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Aarogya-GSM 2G</span>
          </div>
          <div className="font-mono text-emerald-400">
            {callState === 'CONNECTED' ? formatSeconds(callDuration) : '104 Toll-Free'}
          </div>
        </div>

        {/* Screen Display */}
        <div className="w-full my-3 p-3 bg-slate-900/90 rounded-lg border border-slate-700 text-center min-h-[90px] flex flex-col justify-center">
          {callState === 'IDLE' && (
            <div>
              <div className="text-xs text-slate-400">Ready to Dial</div>
              <div className="text-xl font-mono font-bold tracking-widest text-emerald-400 mt-1">104</div>
              <div className="text-[10px] text-slate-500 mt-1">National Health Helpline</div>
            </div>
          )}
          {callState === 'RINGING' && (
            <div className="animate-pulse">
              <div className="text-xs text-amber-400 font-semibold">Calling 104...</div>
              <div className="text-sm font-medium text-slate-300 mt-1">Connecting to Aarogya Vani Engine</div>
            </div>
          )}
          {callState === 'CONNECTED' && (
            <div>
              <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>CALL ACTIVE ({callLang.toUpperCase()})</span>
              </div>
              <div className="text-xs text-slate-300 font-mono mt-1 truncate">
                Input: {dialedInput || 'Listening for DTMF...'}
              </div>
              <div className="text-[11px] text-teal-300 mt-0.5 font-medium">
                Step: {ivrStep}
              </div>
            </div>
          )}
          {callState === 'ENDED' && (
            <div className="text-rose-400 text-xs font-bold">Call Ended</div>
          )}
        </div>

        {/* 12-Key DTMF Dialpad */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[220px]">
          {[
            { k: '1', sub: 'OPD' },
            { k: '2', sub: 'MEDS' },
            { k: '3', sub: 'REFR' },
            { k: '4', sub: 'GHI' },
            { k: '5', sub: 'JKL' },
            { k: '6', sub: 'MNO' },
            { k: '7', sub: 'PQRS' },
            { k: '8', sub: 'TUV' },
            { k: '9', sub: 'SOS' },
            { k: '*', sub: 'VOL' },
            { k: '0', sub: '+' },
            { k: '#', sub: 'SEND' }
          ].map(({ k, sub }) => (
            <button
              key={k}
              onClick={() => handleKeyPress(k)}
              className="h-12 rounded-lg bg-slate-800/90 hover:bg-slate-700 active:bg-emerald-600 text-white flex flex-col items-center justify-center border border-slate-700 active:scale-95 transition-all shadow-sm"
            >
              <span className="text-base font-bold leading-none font-mono">{k}</span>
              <span className="text-[9px] text-slate-400 font-mono leading-none mt-0.5">{sub}</span>
            </button>
          ))}
        </div>

        {/* Call Controls */}
        <div className="w-full flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800">
          {callState === 'CONNECTED' || callState === 'RINGING' ? (
            <button
              onClick={handleEndCall}
              className="flex-1 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-rose-900/40 active:scale-95 transition-all"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Call</span>
            </button>
          ) : (
            <button
              onClick={handleStartCall}
              className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-900/40 active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Dial 104 IVR</span>
            </button>
          )}

          {/* Voice Speech Toggle */}
          <button
            onClick={() => setAudioVoiceEnabled(!audioVoiceEnabled)}
            className={`p-2.5 rounded-lg border transition-colors ${
              audioVoiceEnabled 
                ? 'bg-teal-900/50 border-teal-500 text-teal-300' 
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title={audioVoiceEnabled ? "Voice Output Active" : "Voice Output Muted"}
          >
            {audioVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Language Selection */}
        <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
          <span>Prompt Voice:</span>
          <div className="flex space-x-1">
            <button 
              onClick={() => setCallLang('en')}
              className={`px-1.5 py-0.5 rounded text-[10px] ${callLang === 'en' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'}`}
            >
              English
            </button>
            <button 
              onClick={() => setCallLang('hi')}
              className={`px-1.5 py-0.5 rounded text-[10px] ${callLang === 'hi' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'}`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>

      {/* Right: Real-time IVR Voice & DTMF Transcript */}
      <div className="flex-1 flex flex-col min-h-[360px] bg-slate-950/60 rounded-xl border border-slate-800 p-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Live IVR Audio & DTMF Transcript
            </h4>
          </div>
          <span className="text-[11px] text-slate-500">
            Telecom Protocol: SIP / GSM 2G Gateway
          </span>
        </div>

        {/* Transcript Box */}
        <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 text-xs">
          {transcript.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2 text-center p-6">
              <Phone className="w-8 h-8 text-slate-600" />
              <p>Click <strong className="text-emerald-400">"Dial 104 IVR"</strong> to simulate an incoming voice call from a rural basic phone.</p>
              <p className="text-[11px] text-slate-600 max-w-xs">
                Supports natural speech synthesis, simulated DTMF key beeps, and automatic database updates.
              </p>
            </div>
          ) : (
            transcript.map((t, idx) => (
              <div 
                key={idx} 
                className={`p-2.5 rounded-lg text-xs transition-all ${
                  t.sender === 'IVR Agent' 
                    ? 'bg-teal-950/70 border border-teal-800/60 text-teal-100 ml-0 mr-6'
                    : t.sender === 'User'
                    ? 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-100 ml-6 mr-0'
                    : 'bg-slate-800/80 text-slate-400 italic text-center mx-auto'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] opacity-70 mb-1">
                  <span className="font-bold uppercase tracking-wider">{t.sender}</span>
                  <span>{t.time}</span>
                </div>
                <div className="leading-relaxed">{t.message}</div>
              </div>
            ))
          )}
          <div ref={transcriptEndRef} />
        </div>

        {/* Quick Voice Simulation Buttons for Demonstration */}
        {callState === 'CONNECTED' && (
          <div className="pt-2 border-t border-slate-800">
            <div className="text-[11px] text-slate-400 mb-1.5 font-medium">
              Demo Quick Shortcuts:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleKeyPress('1')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] border border-slate-700"
              >
                [1] Book OPD
              </button>
              <button
                onClick={() => handleKeyPress('2')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] border border-slate-700"
              >
                [2] Check Stock
              </button>
              <button
                onClick={() => handleKeyPress('3')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] border border-slate-700"
              >
                [3] Track Referral
              </button>
              <button
                onClick={() => handleKeyPress('9')}
                className="px-2 py-1 rounded bg-rose-900/60 hover:bg-rose-900 text-rose-200 text-[11px] border border-rose-800"
              >
                [9] SOS 108
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
