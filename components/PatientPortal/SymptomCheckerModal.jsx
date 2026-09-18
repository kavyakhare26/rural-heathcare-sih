import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  HeartHandshake, 
  Calendar, 
  PhoneCall, 
  Bot, 
  User, 
  ArrowRight 
} from 'lucide-react';
import { audioService } from '../../utils/audioUtils';

export default function SymptomCheckerModal({ isOpen, onClose, onBookAppointmentFromTriage }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Namaste! I am Aarogya AI, your multilingual public health assistant. What symptoms are you experiencing today?",
      options: ['High Fever & Chills', 'Persistent Cough & Throat Pain', 'Stomach Ache & Diarrhea', 'Pregnancy Checkup / ANC', 'Chest Heaviness / Shortness of Breath']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [triageResult, setTriageResult] = useState(null);

  if (!isOpen) return null;

  const handleSelectOption = (opt) => {
    sendMessage(opt);
  };

  const sendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      evaluateSymptomTriage(text);
    }, 1000);
  };

  const evaluateSymptomTriage = (symptom) => {
    const lower = symptom.toLowerCase();

    if (lower.includes('chest') || lower.includes('breath') || lower.includes('heart') || lower.includes('unconscious')) {
      const res = {
        riskLevel: 'HIGH_ALERT',
        riskLabel: 'Red Alert: Urgent Medical Attention Needed',
        color: 'rose',
        symptom: symptom,
        analysis: 'Chest pain or acute breathing difficulty can indicate cardiovascular distress or acute pneumonia.',
        recommendedFacility: 'Emergency Room at District Hospital Meerut',
        action: 'emergency',
        homeCare: 'Keep patient seated upright. Loosen tight clothing. Do not exert physically.'
      };
      setTriageResult(res);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: "⚠️ Warning: Your symptoms indicate potential cardiac or respiratory urgency. We recommend immediate evaluation at an emergency facility.",
          isAssessment: true
        }
      ]);
      audioService.playNotificationSound();
    } else if (lower.includes('fever') || lower.includes('cough') || lower.includes('throat') || lower.includes('stomach') || lower.includes('diarrhea')) {
      const res = {
        riskLevel: 'MODERATE',
        riskLabel: 'Moderate: Primary Care Examination Advised',
        color: 'amber',
        symptom: symptom,
        analysis: 'Symptoms suggest an acute viral syndrome or mild infection. Seasonal dengue and flu are currently prevalent in Meerut district.',
        recommendedFacility: 'PHC Rampur (Doctor on duty: Dr. Sunita Sharma)',
        action: 'book_opd',
        homeCare: 'Maintain hydration with ORS and boiled water. Monitor body temperature. Take Paracetamol for fever over 100°F.'
      };
      setTriageResult(res);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: "Based on your symptoms, a primary care checkup is recommended at your local PHC to prevent complications. You can book an OPD slot directly below.",
          isAssessment: true
        }
      ]);
    } else {
      const res = {
        riskLevel: 'ROUTINE',
        riskLabel: 'Routine: General Health Consultation',
        color: 'emerald',
        symptom: symptom,
        analysis: 'Routine symptoms suitable for general OPD consultation or lifestyle advice.',
        recommendedFacility: 'PHC Rampur or CHC Mawana',
        action: 'book_opd',
        homeCare: 'Ensure balanced diet, adequate sleep, and routine health checks.'
      };
      setTriageResult(res);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: "Thank you for the information. Your condition appears manageable at the primary healthcare level.",
          isAssessment: true
        }
      ]);
    }
  };

  const handleBookFromTriage = () => {
    onClose();
    if (onBookAppointmentFromTriage) {
      onBookAppointmentFromTriage(triageResult?.symptom || 'General OPD Consultation');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-emerald-300">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base">Aarogya AI Symptom Evaluator</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase">
                  AI Triage
                </span>
              </div>
              <p className="text-xs text-slate-300">Clinical decision-support adhering to ICMR triage guidelines</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Conversation Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3 bg-slate-50 text-xs">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex items-start space-x-2 max-w-[85%]">
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div>
                  <div className={`p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-xs'
                  }`}>
                    {m.text}
                  </div>

                  {m.options && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {m.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectOption(opt)}
                          className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 hover:border-emerald-400 font-medium transition-all shadow-xs text-[11px]"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center space-x-2 text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 w-44">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
              <span className="text-xs">Analyzing symptoms...</span>
            </div>
          )}

          {/* Dynamic Triage Card */}
          {triageResult && (
            <div className={`mt-4 p-4 rounded-xl border ${
              triageResult.color === 'rose' 
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : triageResult.color === 'amber'
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className={`w-5 h-5 ${
                  triageResult.color === 'rose' ? 'text-rose-600' : triageResult.color === 'amber' ? 'text-amber-600' : 'text-emerald-600'
                }`} />
                <span className="font-extrabold text-sm">{triageResult.riskLabel}</span>
              </div>

              <p className="text-xs mb-2 leading-relaxed opacity-90">
                {triageResult.analysis}
              </p>

              <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/80 mb-3 space-y-1">
                <div className="font-bold text-[11px] text-slate-700">Immediate Precautions & Home Care:</div>
                <div className="text-[11px] text-slate-600">{triageResult.homeCare}</div>
                <div className="font-bold text-[11px] text-emerald-800 pt-1">
                  Nearest Recommended Centre: {triageResult.recommendedFacility}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {triageResult.action === 'book_opd' ? (
                  <button
                    onClick={handleBookFromTriage}
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Proceed to Book OPD Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onClose();
                      alert('Initiating direct SOS dispatch for cardiac/respiratory alert...');
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Connect Emergency 108 Ambulance</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2"
        >
          <input 
            type="text" 
            placeholder="Type your symptoms (e.g. fever for 3 days, throat irritation)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isThinking}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
