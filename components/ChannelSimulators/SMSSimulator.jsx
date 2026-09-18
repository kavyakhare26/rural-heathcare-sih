import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  MessageSquare, 
  Sparkles, 
  CheckCheck, 
  RotateCcw, 
  Zap, 
  AlertCircle,
  HelpCircle,
  Smartphone
} from 'lucide-react';
import { audioService } from '../../utils/audioUtils';
import { MOCK_MEDICINES, INITIAL_REFERRALS } from '../../data/mockData';

export default function SMSSimulator({ onNewAppointment }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'gateway',
      text: 'Aarogya Vani SMS Service (Shortcode: 56161). Reply HELP for commands, BOOK <symptom> for OPD, or MED <name> for PHC medicine stock.',
      time: '10:00 AM'
    },
    {
      id: 2,
      sender: 'user',
      text: 'MED PARACETAMOL',
      time: '10:01 AM'
    },
    {
      id: 3,
      sender: 'gateway',
      text: '[PHC Rampur Stock]: Paracetamol 500mg is IN STOCK (840 tablets). Free under Jan Aushadhi. Doctor on duty: Dr. Sunita Sharma.',
      time: '10:01 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (customText) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: userTime
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Process NLP SMS query
    setTimeout(() => {
      setIsTyping(false);
      const reply = processSmsQuery(textToSend);
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setMessages(prev => [
        ...prev, 
        {
          id: Date.now() + 1,
          sender: 'gateway',
          text: reply.text,
          time: replyTime
        }
      ]);

      audioService.playNotificationSound();

      if (reply.appointment && onNewAppointment) {
        onNewAppointment(reply.appointment);
      }
    }, 900);
  };

  const processSmsQuery = (rawText) => {
    const text = rawText.toUpperCase().trim();

    if (text === 'HELP' || text === 'INFO') {
      return {
        text: 'Aarogya SMS Syntax:\n1. BOOK <fever/pain/maternal> -> Book PHC OPD\n2. MED <medicine name> -> Check stock\n3. STATUS <REF-ID> -> Track referral\n4. SOS -> Emergency 108 Ambulance'
      };
    }

    if (text.startsWith('MED')) {
      const query = text.replace('MED', '').trim();
      const med = MOCK_MEDICINES.find(m => 
        m.name.toUpperCase().includes(query) || 
        m.genericName.toUpperCase().includes(query)
      ) || MOCK_MEDICINES[0];

      return {
        text: `[MEDICINE ALERT]: ${med.name} is ${med.stockStatus.toUpperCase()} at ${med.facilityName} (${med.totalQuantity} units). Price: ${med.unitPrice}. Nearest facility phone: +91 121 2450011.`
      };
    }

    if (text.startsWith('BOOK')) {
      const symptom = text.replace('BOOK', '').trim() || 'General Consultation';
      const serviceId = `SRV-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const newApt = {
        id: `APT-SMS-${Date.now()}`,
        serviceId: serviceId,
        patientName: 'Basic Phone Citizen (SMS)',
        phone: '+91 98112-XXXXX',
        abhaId: '91-3312-9844-1102',
        channel: 'SMS Gateway (56161)',
        facility: 'PHC Rampur',
        doctor: 'Dr. Sunita Sharma',
        specialty: 'General OPD',
        date: 'Tomorrow',
        timeSlot: '11:00 AM',
        status: 'Confirmed',
        symptoms: `SMS Booking: ${symptom}`,
        urgency: 'Routine',
        smsSent: true
      };

      return {
        text: `[CONFIRMED]: OPD Slot booked at PHC Rampur with Dr. Sunita Sharma. Service Token: ${serviceId}. Time: Tomorrow 11:00 AM. Show this SMS at the registration desk for priority check-in.`,
        appointment: newApt
      };
    }

    if (text.startsWith('STATUS') || text.includes('REF')) {
      const refCase = INITIAL_REFERRALS[0];
      return {
        text: `[REFERRAL STATUS for ${refCase.serviceId}]: ${refCase.status}. Transfer from ${refCase.fromFacility} to ${refCase.toFacility}. Ambulance Vehicle UP-15-G-4421. Call 108 for live telemetry.`
      };
    }

    if (text.includes('SOS') || text.includes('EMERGENCY')) {
      return {
        text: `[EMERGENCY 108 TRIGGERED]: Aarogya Vani has alerted District Emergency Control. Ambulance dispatched to cell tower sector Rampur Meerut. Dispatcher contacting this number immediately.`
      };
    }

    // Default conversational AI fallback
    return {
      text: `[AAROGYA AI ASSIST]: We received "${rawText}". If you need a doctor, reply "BOOK FEVER". To check stock of medicines, reply "MED ORS". For emergency, reply "SOS".`
    };
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'gateway',
        text: 'Aarogya Vani SMS Service (Shortcode: 56161). Reply HELP for commands, BOOK <symptom> for OPD, or MED <name> for PHC medicine stock.',
        time: '10:00 AM'
      }
    ]);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-700 flex flex-col md:flex-row gap-5">
      {/* Left: Feature Phone Mockup Container */}
      <div className="w-full md:w-80 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
        <div className="w-full flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
          <div className="flex items-center space-x-1">
            <Smartphone className="w-3.5 h-3.5 text-blue-400" />
            <span>Feature Phone Simulator</span>
          </div>
          <span className="font-mono text-xs text-emerald-400">Shortcode 56161</span>
        </div>

        {/* Simulated Phone Screen */}
        <div className="w-full my-3 bg-slate-900 rounded-xl border-2 border-slate-700 flex flex-col h-[380px] overflow-hidden shadow-inner">
          {/* Phone Screen Header */}
          <div className="bg-slate-800 px-3 py-1.5 flex items-center justify-between text-[10px] text-slate-300 border-b border-slate-700">
            <span className="font-bold text-emerald-400">56161-AAROGYA</span>
            <span>SMS (2G GSM)</span>
          </div>

          {/* SMS Messages Stream */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs bg-slate-950/40">
            {messages.map((m) => (
              <div 
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-lg p-2 text-xs leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
                <div className="flex items-center space-x-1 mt-0.5 px-1 text-[9px] text-slate-500">
                  <span>{m.time}</span>
                  {m.sender === 'user' && <CheckCheck className="w-2.5 h-2.5 text-emerald-400" />}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-1 text-slate-400 bg-slate-800 px-2 py-1 rounded-lg w-16 text-[10px]">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200"></div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* SMS Input Box */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2 bg-slate-900 border-t border-slate-800 flex items-center space-x-1.5"
          >
            <input 
              type="text" 
              placeholder="Type SMS or keyword..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        <button 
          onClick={handleResetChat}
          className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center space-x-1 mt-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear Message History</span>
        </button>
      </div>

      {/* Right: Feature Overview & Quick Trigger Chips */}
      <div className="flex-1 flex flex-col justify-between bg-slate-950/60 rounded-xl border border-slate-800 p-4">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                SMS NLP Gateway Intelligence
              </h4>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">Zero-Data Access (2G)</span>
          </div>

          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            In rural areas without 4G/5G data connectivity or smartphones, citizens interact with the Aarogya Vani Central Engine through simple SMS commands sent to <strong>56161</strong>. The engine parses the intent, links the mobile number to their ABHA account, updates the centralized database, and issues instant tokens.
          </p>

          <div className="mt-4 space-y-2">
            <div className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>One-Click Test Commands (Simulate SMS):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleSendMessage('BOOK FEVER PHC RAMPUR')}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-left border border-slate-700 hover:border-emerald-500 transition-all text-slate-200"
              >
                <div className="font-mono text-emerald-400 font-semibold text-[11px]">BOOK FEVER PHC RAMPUR</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Book OPD slot for fever</div>
              </button>

              <button
                onClick={() => handleSendMessage('MED PARACETAMOL')}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-left border border-slate-700 hover:border-teal-500 transition-all text-slate-200"
              >
                <div className="font-mono text-teal-400 font-semibold text-[11px]">MED PARACETAMOL</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Query live PHC medicine stock</div>
              </button>

              <button
                onClick={() => handleSendMessage('MED AMOXICILLIN')}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-left border border-slate-700 hover:border-amber-500 transition-all text-slate-200"
              >
                <div className="font-mono text-amber-400 font-semibold text-[11px]">MED AMOXICILLIN</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Check antibiotic availability</div>
              </button>

              <button
                onClick={() => handleSendMessage('STATUS REF-2026-8941')}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-left border border-slate-700 hover:border-indigo-500 transition-all text-slate-200"
              >
                <div className="font-mono text-indigo-400 font-semibold text-[11px]">STATUS REF-2026-8941</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Track emergency referral ID</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Carrier: BSNL / Airtel / Jio GSM Gateway</span>
          <span className="text-emerald-400 font-mono">Status: 200 OK</span>
        </div>
      </div>
    </div>
  );
}
