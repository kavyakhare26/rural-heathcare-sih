import React from 'react';
import { 
  BarChart3, 
  PhoneCall, 
  MessageSquare, 
  Globe, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  Activity,
  Layers,
  MapPin
} from 'lucide-react';
import { ADMIN_ANALYTICS } from '../../data/mockData';

export default function AdminAnalytics({ onOpenArchitecture }) {
  return (
    <div className="space-y-6">
      {/* Top Admin Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase">
              SIH 2026 Command Center
            </span>
            <span className="text-xs text-indigo-300">National Health Mission • Uttar Pradesh</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight mt-1">
            Aarogya Vani Public Health Surveillance & Channel Analytics
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Real-time telemetry across basic phone IVR (104), SMS gateways (56161), and web consultation nodes
          </p>
        </div>

        <button
          onClick={onOpenArchitecture}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-sm transition-colors shrink-0"
        >
          <Layers className="w-4 h-4" />
          <span>View Solution Architecture</span>
        </button>
      </div>

      {/* High-Level Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Total IVR Voice Calls</span>
            <PhoneCall className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{ADMIN_ANALYTICS.totalCallsIVR.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">51% of all citizen interactions</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Total SMS Dispatched</span>
            <MessageSquare className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{ADMIN_ANALYTICS.totalSmsReceived.toLocaleString()}</div>
          <div className="text-[11px] text-teal-700 font-semibold mt-1">28% of all citizen interactions</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Web & App Sessions</span>
            <Globe className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{ADMIN_ANALYTICS.totalWebSessions.toLocaleString()}</div>
          <div className="text-[11px] text-indigo-700 font-semibold mt-1">21% of all citizen interactions</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Medicine Stock Fulfillment</span>
            <Activity className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{ADMIN_ANALYTICS.medicineStockFulfillmentRate}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">Across 18 linked PHCs & CHCs</div>
        </div>
      </div>

      {/* Middle Row: Channel Inclusivity Breakdown & Disease Surveillance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Multichannel Distribution Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Digital Inclusivity Breakdown</h3>
              <p className="text-[11px] text-slate-500">Comparing Basic Phone (IVR/SMS) vs. Smartphone/Web Usage</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              79% Rural Inclusion
            </span>
          </div>

          <div className="space-y-4 py-2">
            {ADMIN_ANALYTICS.channelsBreakdown.map((item) => (
              <div key={item.name} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{item.name}</span>
                  <span>{item.count.toLocaleString()} ({item.percentage}%)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            <strong className="text-slate-800">Key SIH Finding:</strong> 79% of rural patients in pilot districts lack 4G smartphones. The Aarogya Vani multichannel engine bridges the digital divide through zero-data 2G GSM access.
          </div>
        </div>

        {/* Real-Time Disease Surveillance */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Syndromic Disease Surveillance (AI Triage Stream)</span>
              </h3>
              <p className="text-[11px] text-slate-500">Automated outbreak detection from IVR and SMS symptom keywords</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {ADMIN_ANALYTICS.diseaseSurveillance.map((d, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{d.disease}</div>
                  <div className="text-[10px] text-slate-500 flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    <span>Hotspots: {d.alertDistricts}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-slate-800">{d.cases} cases</div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    d.severity === 'High Alert' 
                      ? 'bg-rose-100 text-rose-800' 
                      : d.severity === 'Moderate'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {d.severity} ({d.trend})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
