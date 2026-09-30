import React, { useState } from 'react';
import { Droplet, ArrowRight, ShieldCheck, Info, CheckCircle2, Search, MapPin } from 'lucide-react';
import { BLOOD_GROUPS, BLOOD_COMPATIBILITY } from '../data/bloodGroups';
import { getCompatibleDonors, getCompatibleRecipients } from '../utils/compatibility';

export default function BloodTypesPage({ onFindDonorsInDistrict }) {
  const [selectedRecipient, setSelectedRecipient] = useState('A+');

  const compatibleDonors = getCompatibleDonors(selectedRecipient);

  return (
    <section id="blood-types" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: Know Your Blood Type Cards */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon-100 text-maroon-800 text-xs font-bold uppercase tracking-wider">
              <Droplet className="w-3.5 h-3.5 fill-maroon-700 text-maroon-700" />
              <span>Medical Compatibility Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Know Your Blood Type
            </h2>
            <p className="text-base text-navy-700">
              Understanding ABO and Rh factor compatibility for safe red-cell transfusion.
            </p>
          </div>

          {/* 8 Blood Group Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BLOOD_GROUPS.map((groupKey) => {
              const info = BLOOD_COMPATIBILITY[groupKey];
              const isUniversalDonor = groupKey === 'O-';
              const isUniversalRecipient = groupKey === 'AB+';

              return (
                <div
                  key={groupKey}
                  className={`bg-white rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col justify-between relative overflow-hidden ${
                    isUniversalDonor
                      ? 'border-maroon-400 ring-2 ring-maroon-100'
                      : isUniversalRecipient
                      ? 'border-blue-300 ring-2 ring-blue-50'
                      : 'border-gray-200 hover:border-maroon-200'
                  }`}
                >
                  {/* Card Header Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-maroon-700 to-maroon-900 text-white font-black text-2xl flex items-center justify-center shadow-md">
                        {groupKey}
                      </div>
                      {isUniversalDonor && (
                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-maroon-100 text-maroon-800 uppercase tracking-wider">
                          Universal Donor
                        </span>
                      )}
                      {isUniversalRecipient && (
                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
                          Universal Recipient
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-gray-500 mb-4">
                      {info.rarity}
                    </p>

                    {/* Compatibility List */}
                    <div className="space-y-3 text-xs border-t border-gray-100 pt-3">
                      <div>
                        <span className="font-bold text-navy-900 block mb-1">
                          Can donate red cells to:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {info.canDonateTo.map((target) => (
                            <span
                              key={target}
                              className="px-2 py-0.5 rounded bg-maroon-50 text-maroon-800 font-bold border border-maroon-100"
                            >
                              {target}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-navy-900 block mb-1">
                          Can receive red cells from:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {info.canReceiveFrom.map((source) => (
                            <span
                              key={source}
                              className="px-2 py-0.5 rounded bg-slate-100 text-navy-800 font-bold border border-gray-200"
                            >
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Footer */}
                  <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-600 leading-relaxed font-normal">
                    {info.description}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Medical Guidelines Disclaimer Box */}
          <div className="p-4 rounded-2xl bg-blush-50 border border-maroon-100 text-xs text-navy-800 flex items-start space-x-3">
            <Info className="w-5 h-5 text-maroon-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Medical Disclaimer:</strong> These are general red-cell compatibility guidelines. Hospitals and certified blood banks determine actual transfusion compatibility through laboratory blood typing, antibody screening, and cross-matching.
            </p>
          </div>
        </div>

        {/* Section 2: Interactive Blood Type Finder */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <span className="px-3.5 py-1 rounded-full bg-maroon-600 text-red-100 text-xs font-bold uppercase tracking-wider">
              Interactive Compatibility Tool
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Find Compatible Blood
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Select the recipient's blood group to dynamically calculate all potential donor groups.
            </p>
          </div>

          {/* Interactive Picker */}
          <div className="max-w-xl mx-auto bg-navy-800 p-6 rounded-2xl border border-navy-700 space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                Select Recipient Blood Group:
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {BLOOD_GROUPS.map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setSelectedRecipient(bg)}
                    className={`py-3 rounded-xl font-black text-sm transition-all ${
                      selectedRecipient === bg
                        ? 'bg-maroon-600 text-white shadow-lg ring-2 ring-red-400 scale-105'
                        : 'bg-navy-900 text-gray-300 hover:bg-navy-700 hover:text-white'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Results Display */}
            <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 space-y-4 text-left">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-navy-800 pb-3">
                <span className="text-xs text-gray-400 font-medium">Selected Receiver Group:</span>
                <span className="text-xl font-extrabold text-maroon-400 px-3 py-0.5 rounded bg-maroon-950/80 border border-maroon-800">
                  {selectedRecipient}
                </span>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-medium block mb-2">
                  Potential Compatible Donor Groups:
                </span>
                <div className="flex flex-wrap gap-2">
                  {compatibleDonors.map((grp) => (
                    <div
                      key={grp}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-sm flex items-center space-x-1.5 animate-fadeIn"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{grp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onFindDonorsInDistrict(selectedRecipient)}
                  className="w-full py-3 bg-maroon-600 hover:bg-maroon-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Find Donors in My District</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
