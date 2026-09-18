import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Bed, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Stethoscope, 
  ExternalLink,
  Shield,
  Search
} from 'lucide-react';
import { MOCK_FACILITIES } from '../../data/mockData';

export default function FacilityLocator({ facilities = MOCK_FACILITIES }) {
  const [filterType, setFilterType] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = facilities.filter(f => {
    const matchesType = filterType === 'ALL' || f.type === filterType;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || 
                          f.district.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-lg text-slate-900">Nearby Health Centres & Hospitals</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
              PHC & CHC Network
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Geographic directory of public health facilities with live bed occupancy, oxygen, and duty rosters
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 text-xs">
          {['ALL', 'PHC', 'CHC', 'District Hospital'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterType === t 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((fac) => (
          <div
            key={fac.id}
            className="p-5 rounded-xl border border-slate-200 hover:border-emerald-400 bg-white hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Title & Type Badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">{fac.name}</h4>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{fac.distance} • {fac.district}, {fac.state}</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
                  {fac.type}
                </span>
              </div>

              {/* Real-time Facility Status Indicators */}
              <div className="grid grid-cols-3 gap-2 my-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 font-medium">Available Beds</div>
                  <div className="font-extrabold text-sm text-emerald-700">
                    {fac.bedsAvailable} <span className="text-[10px] text-slate-400">/ {fac.bedsTotal}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-medium">Oxygen Supply</div>
                  <div className="font-bold text-xs text-teal-700 mt-0.5">
                    {fac.oxygenAvailable ? '✓ 24x7 Available' : 'Limited'}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-medium">Emergency Care</div>
                  <div className="font-bold text-xs text-slate-800 mt-0.5">
                    {fac.emergencyReady ? 'Trauma Ready' : 'Day OPD'}
                  </div>
                </div>
              </div>

              {/* Doctor on Duty */}
              <div className="text-xs space-y-1 py-1">
                <div className="flex items-center space-x-2 text-slate-700">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Doctor on Duty: <strong className="text-slate-900">{fac.doctorOnDuty}</strong></span>
                </div>
                <div className="flex items-center space-x-2 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>OPD Hours: {fac.dutyHours}</span>
                </div>
              </div>
            </div>

            {/* Card Action footer */}
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`tel:${fac.phone}`}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{fac.phone}</span>
              </a>

              <span className="text-[11px] font-semibold text-slate-500">
                Stocked Medicines: {fac.medicinesStockedCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
