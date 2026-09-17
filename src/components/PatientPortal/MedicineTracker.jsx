import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  MapPin, 
  Filter, 
  Sparkles,
  Info
} from 'lucide-react';
import { MOCK_MEDICINES } from '../../data/mockData';

export default function MedicineTracker({ medicineList = MOCK_MEDICINES }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'Antipyretic / Analgesic', 'Antibiotic', 'Essential Electrolytes', 'Diabetes Care', 'Maternal Health', 'Hypertension'];

  const filteredMedicines = medicineList.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          med.indications.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-lg text-slate-900">Essential Medicine Stock Availability</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Live Stock Feed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time inventory at local Primary Health Centres (PHCs) and Pradhan Mantri Jan Aushadhi Kendras
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            <span>In Stock</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            <span>Low Stock</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
            <span>Out of Stock</span>
          </span>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by brand name (e.g. Paracetamol), generic (Acetaminophen), or symptoms (fever)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat === 'ALL' ? 'All Medicines' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredMedicines.length === 0 ? (
          <div className="col-span-2 text-center py-10 text-slate-400 text-xs">
            No medicines matching your search query. Try querying through IVR (104) or SMS (56161).
          </div>
        ) : (
          filteredMedicines.map((med) => (
            <div
              key={med.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{med.name}</h4>
                    <p className="text-[11px] text-slate-500 italic">{med.genericName}</p>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                    med.stockStatus === 'In Stock'
                      ? 'bg-emerald-100 text-emerald-800'
                      : med.stockStatus === 'Low Stock'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {med.stockStatus} ({med.totalQuantity} units)
                  </span>
                </div>

                <div className="text-xs text-slate-600 mb-2">
                  <span className="font-semibold text-slate-700">Used for:</span> {med.indications}
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <div className="flex items-center space-x-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-medium text-slate-700">{med.facilityName}</span>
                </div>

                <div className="font-bold text-emerald-700">
                  {med.unitPrice}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Jan Aushadhi Banner */}
      <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between text-xs text-teal-900">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>
            Medicines prescribed at PHCs & CHCs are provided <strong>100% free of charge</strong> under the National Free Drugs Service Initiative.
          </span>
        </div>
        <span className="font-mono font-bold text-teal-800 hidden sm:inline">Govt. of India Initiative</span>
      </div>
    </div>
  );
}
