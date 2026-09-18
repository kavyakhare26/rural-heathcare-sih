import React, { useState } from 'react';
import { 
  Building2, 
  UserCheck, 
  Pill, 
  Bed, 
  CheckCircle2, 
  Search, 
  Plus, 
  Minus, 
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { audioService } from '../../utils/audioUtils';

export default function PHCStaffDashboard({ 
  appointments, 
  medicines, 
  setMedicines,
  onCheckInPatient 
}) {
  const [checkInQuery, setCheckInQuery] = useState('');
  const [checkedInMessage, setCheckedInMessage] = useState('');
  const [bedsAvailable, setBedsAvailable] = useState(4);
  const totalBeds = 6;

  const handleCheckIn = (e) => {
    e.preventDefault();
    if (!checkInQuery.trim()) return;

    const apt = appointments.find(a => 
      a.serviceId.toLowerCase() === checkInQuery.toLowerCase() ||
      a.phone.includes(checkInQuery) ||
      a.patientName.toLowerCase().includes(checkInQuery.toLowerCase())
    );

    if (apt) {
      audioService.playNotificationSound();
      setCheckedInMessage(`✓ Patient ${apt.patientName} (Token ${apt.serviceId}) marked Checked-In for Dr. Sunita Sharma.`);
      if (onCheckInPatient) {
        onCheckInPatient(apt.id);
      }
      setCheckInQuery('');
    } else {
      alert(`No active booking found for "${checkInQuery}". Try SRV-1042 or 9876543210.`);
    }
  };

  const handleUpdateStock = (medId, delta) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === medId) {
        const newQty = Math.max(0, m.totalQuantity + delta);
        let status = 'In Stock';
        if (newQty === 0) status = 'Out of Stock';
        else if (newQty < 50) status = 'Low Stock';
        return {
          ...m,
          totalQuantity: newQty,
          stockStatus: status
        };
      }
      return m;
    }));
    audioService.playNotificationSound();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-extrabold text-slate-900">PHC Rampur Administration Desk</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
              Staff Operations
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage rural patient admissions, pharmacy inventory syncing, and emergency bed counts
          </p>
        </div>

        {/* Live Facility Readiness Counter */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-3">
            <Bed className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-[10px] text-slate-500 font-medium">Beds Available</div>
              <div className="font-extrabold text-sm text-slate-900">
                {bedsAvailable} / {totalBeds}
              </div>
            </div>
            <div className="flex flex-col space-y-1 pl-2 border-l border-slate-200">
              <button
                onClick={() => setBedsAvailable(Math.min(totalBeds, bedsAvailable + 1))}
                className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-bold hover:bg-slate-100"
              >
                +
              </button>
              <button
                onClick={() => setBedsAvailable(Math.max(0, bedsAvailable - 1))}
                className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-bold hover:bg-slate-100"
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Left Rapid Check-In, Right Pharmacy Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Rapid Patient Check-In & Queue Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-1.5">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Rapid Patient Check-In</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Scan barcode or enter Service ID from IVR/SMS/Web
            </p>
          </div>

          <form onSubmit={handleCheckIn} className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Enter Token (e.g. SRV-1042) or Phone..."
                value={checkInQuery}
                onChange={(e) => setCheckInQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1"
            >
              <span>Verify & Check-In</span>
            </button>
          </form>

          {checkedInMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs leading-relaxed animate-fadeIn">
              {checkedInMessage}
            </div>
          )}

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-700">Recent Arrivals Today:</div>
            <div className="space-y-1.5 text-xs">
              {appointments.slice(0, 3).map((a) => (
                <div key={a.id} className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">{a.patientName}</div>
                    <div className="text-[10px] text-slate-500">{a.serviceId} • {a.channel}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    Checked In
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Pharmacy Stock Manager */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                <Pill className="w-4 h-4 text-emerald-600" />
                <span>Live PHC Pharmacy Stock Sync</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Adjust stock here. Updates immediately reflect in IVR voice answers, SMS auto-replies, and Patient Search.
              </p>
            </div>
            <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Live Database Connected
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[11px]">
                  <th className="py-2 font-bold">Drug Name & Generic</th>
                  <th className="py-2 font-bold">Category</th>
                  <th className="py-2 font-bold">Status</th>
                  <th className="py-2 font-bold text-right">Quantity</th>
                  <th className="py-2 font-bold text-right">Adjust Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {medicines.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50">
                    <td className="py-2.5">
                      <div className="font-bold text-slate-800">{med.name}</div>
                      <div className="text-[10px] text-slate-500">{med.genericName}</div>
                    </td>
                    <td className="py-2.5 text-slate-600">{med.category}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        med.stockStatus === 'In Stock'
                          ? 'bg-emerald-100 text-emerald-800'
                          : med.stockStatus === 'Low Stock'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {med.stockStatus}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-slate-800">
                      {med.totalQuantity}
                    </td>
                    <td className="py-2.5 text-right">
                      <div className="inline-flex items-center space-x-1">
                        <button
                          onClick={() => handleUpdateStock(med.id, -10)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold transition-colors"
                          title="Reduce 10 units"
                        >
                          -10
                        </button>
                        <button
                          onClick={() => handleUpdateStock(med.id, 50)}
                          className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded text-xs font-bold transition-colors"
                          title="Add 50 units"
                        >
                          +50
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
