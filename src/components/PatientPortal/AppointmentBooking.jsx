import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  Building2, 
  Stethoscope, 
  Sparkles, 
  ArrowRight, 
  MessageSquare,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_FACILITIES, MOCK_DOCTORS, PATIENT_USER } from '../../data/mockData';
import { audioService } from '../../utils/audioUtils';

export default function AppointmentBooking({ onAppointmentCreated, prefilledSymptom, onCancel }) {
  const [selectedFacility, setSelectedFacility] = useState(MOCK_FACILITIES[0].id);
  const [selectedDoctor, setSelectedDoctor] = useState(MOCK_DOCTORS[0].id);
  const [selectedDate, setSelectedDate] = useState('2026-09-17');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [symptoms, setSymptoms] = useState(prefilledSymptom || 'Fever and mild weakness for 2 days');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const availableDoctors = MOCK_DOCTORS.filter(d => d.facilityId === selectedFacility);

  const handleFacilityChange = (facId) => {
    setSelectedFacility(facId);
    const docs = MOCK_DOCTORS.filter(d => d.facilityId === facId);
    if (docs.length > 0) {
      setSelectedDoctor(docs[0].id);
    }
  };

  const handleBook = (e) => {
    e.preventDefault();
    const facilityObj = MOCK_FACILITIES.find(f => f.id === selectedFacility);
    const doctorObj = MOCK_DOCTORS.find(d => d.id === selectedDoctor) || MOCK_DOCTORS[0];
    const newServiceId = `SRV-${Math.floor(1000 + Math.random() * 9000)}`;

    const newAppointment = {
      id: `APT-${Date.now()}`,
      serviceId: newServiceId,
      patientName: PATIENT_USER.name,
      phone: PATIENT_USER.phone,
      abhaId: PATIENT_USER.abhaId,
      channel: 'Web Portal',
      facility: facilityObj.name,
      doctor: doctorObj.name,
      specialty: doctorObj.specialty,
      date: selectedDate,
      timeSlot: selectedSlot,
      status: 'Confirmed',
      symptoms: symptoms,
      urgency: 'Routine',
      smsSent: true
    };

    setConfirmedBooking(newAppointment);
    setIsSuccess(true);
    audioService.playNotificationSound();

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {
      console.log('Confetti not available:', err);
    }

    if (onAppointmentCreated) {
      onAppointmentCreated(newAppointment);
    }
  };

  if (isSuccess && confirmedBooking) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center max-w-xl mx-auto space-y-5 animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
            Appointment Confirmed
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
            Service Token: <span className="text-emerald-600">{confirmedBooking.serviceId}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Confirmed with the Aarogya Vani Central OPD Registry
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Patient:</span>
            <span className="font-bold text-slate-800">{confirmedBooking.patientName} (ABHA: {confirmedBooking.abhaId})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Healthcare Facility:</span>
            <span className="font-bold text-slate-800">{confirmedBooking.facility}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Doctor / OPD:</span>
            <span className="font-bold text-slate-800">{confirmedBooking.doctor} ({confirmedBooking.specialty})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Date & Time:</span>
            <span className="font-bold text-emerald-700">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Consultation Fee:</span>
            <span className="font-bold text-emerald-700">₹0 (Free Govt. Healthcare)</span>
          </div>
        </div>

        {/* SMS Simulation Alert */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2.5 text-left text-xs text-emerald-900">
          <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            Instant SMS notification dispatched to <strong>{confirmedBooking.phone}</strong> with directions and queue token.
          </span>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            onClick={() => {
              setIsSuccess(false);
              setConfirmedBooking(null);
              if (onCancel) onCancel();
            }}
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
          >
            Done / View Appointments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
        <div>
          <h3 className="font-bold text-lg text-slate-900">Smart OPD & Specialist Appointment</h3>
          <p className="text-xs text-slate-500">Book seamlessly across Primary Health Centres (PHCs) and Community Health Centres (CHCs)</p>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          Free OPD Services
        </span>
      </div>

      <form onSubmit={handleBook} className="space-y-5 text-xs">
        {/* Step 1: Select Facility */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center space-x-1.5">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Step 1: Choose Nearest Healthcare Centre</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MOCK_FACILITIES.map((fac) => (
              <div
                key={fac.id}
                onClick={() => handleFacilityChange(fac.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedFacility === fac.id
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">{fac.name}</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{fac.distance} away • {fac.type}</span>
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                  Doctor on duty: {fac.doctorOnDuty}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Select Doctor */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center space-x-1.5">
            <Stethoscope className="w-4 h-4 text-emerald-600" />
            <span>Step 2: Select Doctor or Specialty</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableDoctors.length > 0 ? (
              availableDoctors.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center space-x-3 ${
                    selectedDoctor === doc.id
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 text-sm">{doc.name}</div>
                    <div className="text-[11px] text-emerald-700 font-medium">{doc.specialty}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{doc.opdDays}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-3 bg-slate-50 text-slate-500 rounded-xl text-center">
                No individual roster required; general OPD is open on arrival.
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Date & Slot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Step 3: Appointment Date</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Preferred OPD Slot</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['09:30 AM', '10:30 AM', '11:45 AM', '01:00 PM', '02:30 PM', '03:30 PM'].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-1 rounded-lg text-center font-bold text-xs border transition-all ${
                    selectedSlot === slot
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4: Symptoms */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Symptoms & Primary Reason for Consultation:
          </label>
          <textarea
            rows={2}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your health condition (e.g. fever, headache, routine checkup)..."
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-semibold transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-2 shadow-md shadow-emerald-700/20 active:scale-98 transition-all"
          >
            <span>Confirm & Generate Token</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
