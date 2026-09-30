import React, { useState } from 'react';
import { Search, MapPin, Droplet, ShieldAlert, CheckCircle2, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { KERALA_DISTRICTS } from '../data/districts';
import { BLOOD_GROUPS } from '../data/bloodGroups';
import { getCompatibleDonors } from '../utils/compatibility';

export default function QuickBloodSearch({ donors, onContactDonor }) {
  const [selectedGroup, setSelectedGroup] = useState('O+');
  const [selectedDistrict, setSelectedDistrict] = useState('Ernakulam');
  const [hasSearched, setHasSearched] = useState(false);
  const [matchedDonors, setMatchedDonors] = useState([]);
  const [compatibleGroups, setCompatibleGroups] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const compGroups = getCompatibleDonors(selectedGroup);
    setCompatibleGroups(compGroups);

    // Filter donors matching compatible groups and selected district (or all districts if 'All')
    const filtered = donors.filter((donor) => {
      const groupMatch = compGroups.includes(donor.bloodGroup);
      const districtMatch = !selectedDistrict || selectedDistrict === 'All' || donor.district === selectedDistrict;
      return groupMatch && districtMatch;
    });

    setMatchedDonors(filtered);
    setHasSearched(true);
  };

  return (
    <section id="search" className="py-16 bg-gradient-to-b from-white via-blush-50/40 to-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-maroon-100 text-maroon-800 text-xs font-bold uppercase tracking-wider">
            <Droplet className="w-3.5 h-3.5 fill-maroon-700 text-maroon-700" />
            <span>Instant Donor Finder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Find Blood. Save a Life.
          </h2>
          <p className="text-base sm:text-lg text-navy-700">
            Need blood for yourself or someone you care about? Find compatible blood groups quickly across Kerala.
          </p>
        </div>

        {/* Search Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-maroon-100 max-w-4xl mx-auto relative">
          
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
            
            {/* Receiver Blood Group Dropdown */}
            <div className="md:col-span-5 space-y-2">
              <label className="block text-sm font-bold text-navy-900 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-maroon-700" />
                Receiver Blood Group
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-100 bg-white font-bold text-navy-900 text-base transition-all"
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg} (Recipient)
                  </option>
                ))}
              </select>
            </div>

            {/* District Dropdown */}
            <div className="md:col-span-4 space-y-2">
              <label className="block text-sm font-bold text-navy-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-maroon-700" />
                Select District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-100 bg-white font-semibold text-navy-900 text-base transition-all"
              >
                <option value="All">All 14 Districts (Kerala)</option>
                {KERALA_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Find Donors</span>
              </button>
            </div>

          </form>

          {/* Medical Notice */}
          <div className="mt-6 p-4 rounded-xl bg-blush-50 border border-maroon-100 flex items-start space-x-3 text-xs text-navy-800">
            <ShieldAlert className="w-5 h-5 text-maroon-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-maroon-900">Medical Notice:</strong> Compatibility shown is based on general red-cell blood-group compatibility guidelines. Actual transfusion decisions require clinical screening, antibody testing, and cross-matching by qualified healthcare professionals.
            </p>
          </div>

        </div>

        {/* Search Results Display Section */}
        {hasSearched && (
          <div className="mt-12 space-y-8 animate-fadeIn max-w-5xl mx-auto">
            
            {/* Compatible Groups Pill Box */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
              <h3 className="text-sm font-bold text-navy-700 uppercase tracking-wider mb-3">
                For Recipient <span className="text-maroon-700 font-extrabold text-base px-2 py-0.5 rounded bg-maroon-50 border border-maroon-200">{selectedGroup}</span> — Compatible Donor Groups:
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {compatibleGroups.map((grp) => (
                  <span
                    key={grp}
                    className="px-4 py-2 rounded-xl bg-maroon-700 text-white font-bold text-sm shadow-sm flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-red-200" />
                    {grp}
                  </span>
                ))}
              </div>
            </div>

            {/* Results Title & Count */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <h3 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                  Matching Verified Donors ({matchedDonors.length})
                </h3>
                <p className="text-xs text-navy-600">
                  Showing donors in {selectedDistrict === 'All' ? 'all 14 districts' : selectedDistrict} for {selectedGroup} compatibility
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                Live LocalStorage Sync Active
              </span>
            </div>

            {/* Donor Cards Grid */}
            {matchedDonors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedDonors.map((donor) => (
                  <div
                    key={donor.id}
                    className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md hover:border-maroon-200 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-2xl bg-maroon-700 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                            {donor.bloodGroup}
                          </div>
                          <div>
                            <h4 className="font-bold text-navy-900 text-base group-hover:text-maroon-700 transition-colors">
                              {donor.name}
                            </h4>
                            <p className="text-xs text-navy-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-maroon-600" /> {donor.district}, {donor.city}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs border-t border-b border-gray-100 py-3 my-3">
                        <div className="flex justify-between text-navy-700">
                          <span className="text-gray-500">Status:</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {donor.availability}
                          </span>
                        </div>
                        <div className="flex justify-between text-navy-700">
                          <span className="text-gray-500">Last Verified:</span>
                          <span className="font-semibold text-navy-800">{donor.lastVerified}</span>
                        </div>
                        <div className="flex justify-between text-navy-700">
                          <span className="text-gray-500">Badge:</span>
                          <span className="font-semibold text-maroon-700">{donor.badge}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onContactDonor(donor)}
                      className="w-full py-2.5 bg-navy-900 hover:bg-maroon-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Request Contact</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200 space-y-3">
                <AlertCircle className="w-10 h-10 text-maroon-600 mx-auto" />
                <h4 className="text-lg font-bold text-navy-900">No Demo Donors Found in {selectedDistrict}</h4>
                <p className="text-sm text-navy-600 max-w-md mx-auto">
                  Try switching the district filter to "All 14 Districts" to view compatible donors in nearby Kerala regions.
                </p>
                <button
                  onClick={() => {
                    setSelectedDistrict('All');
                    handleSearch({ preventDefault: () => {} });
                  }}
                  className="px-4 py-2 bg-maroon-700 text-white text-xs font-bold rounded-lg hover:bg-maroon-800 transition-colors"
                >
                  View Donors Across All Kerala
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
