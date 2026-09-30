import React, { useState } from 'react';
import { Search, Filter, MapPin, Droplet, UserCheck, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';
import { KERALA_DISTRICTS } from '../data/districts';
import { BLOOD_GROUPS } from '../data/bloodGroups';

export default function DonorDirectory({ donors, onContactDonor }) {
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDonors = donors.filter((donor) => {
    const groupMatch = selectedGroup === 'All' || donor.bloodGroup === selectedGroup;
    const districtMatch = selectedDistrict === 'All' || donor.district === selectedDistrict;
    const availMatch = selectedAvailability === 'All' || donor.availability === selectedAvailability;
    const textMatch =
      !searchQuery ||
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.district.toLowerCase().includes(searchQuery.toLowerCase());

    return groupMatch && districtMatch && availMatch && textMatch;
  });

  const resetFilters = () => {
    setSelectedGroup('All');
    setSelectedDistrict('All');
    setSelectedAvailability('All');
    setSearchQuery('');
  };

  return (
    <section id="directory" className="py-16 bg-slate-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Directory Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon-100 text-maroon-800 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-4 h-4 text-maroon-700" />
            <span>Voluntary Donor Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Kerala Donor Directory
          </h2>
          <p className="text-base text-navy-700">
            Browse verified demo donor profiles across all 14 districts. Filter by blood group, district, and emergency status.
          </p>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search donor name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-100 text-sm font-semibold text-navy-900"
              />
            </div>

            {/* Blood Group Filter */}
            <div>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-maroon-600 text-sm font-semibold text-navy-900 bg-white"
              >
                <option value="All">All Blood Groups</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    Group {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            <div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-maroon-600 text-sm font-semibold text-navy-900 bg-white"
              >
                <option value="All">All 14 Kerala Districts</option>
                {KERALA_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-maroon-600 text-sm font-semibold text-navy-900 bg-white"
              >
                <option value="All">All Availability Statuses</option>
                <option value="Available">Available</option>
                <option value="Available on weekends">Available on weekends</option>
                <option value="Available for emergencies">Available for emergencies</option>
                <option value="Currently unavailable">Currently unavailable</option>
              </select>
            </div>

          </div>

          {/* Active Filter Pills & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100 text-xs">
            <span className="text-gray-500 font-semibold">
              Showing <strong className="text-navy-900">{filteredDonors.length}</strong> registered donors
            </span>

            {(selectedGroup !== 'All' || selectedDistrict !== 'All' || selectedAvailability !== 'All' || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-maroon-700 font-bold hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Donor Cards Grid */}
        {filteredDonors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-maroon-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-maroon-700 to-maroon-900 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                        {donor.bloodGroup}
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-900 text-base group-hover:text-maroon-700 transition-colors">
                          {donor.name}
                        </h3>
                        <p className="text-xs text-navy-600 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-maroon-600" /> {donor.district}, {donor.city}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-navy-700 uppercase">
                      {donor.gender}
                    </span>
                  </div>

                  {/* Donor Info Stats */}
                  <div className="space-y-2 text-xs border-t border-b border-gray-100 py-3 my-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Availability:</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          donor.availability === 'Available'
                            ? 'bg-emerald-100 text-emerald-800'
                            : donor.availability === 'Available for emergencies'
                            ? 'bg-red-100 text-red-800'
                            : donor.availability === 'Available on weekends'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {donor.availability}
                      </span>
                    </div>

                    <div className="flex justify-between text-navy-700">
                      <span className="text-gray-500">Last Verified Date:</span>
                      <span className="font-semibold text-navy-900">{donor.lastVerified}</span>
                    </div>

                    <div className="flex justify-between text-navy-700">
                      <span className="text-gray-500">Honorary Badge:</span>
                      <span className="font-bold text-maroon-700">{donor.badge}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onContactDonor(donor)}
                    className="w-full py-3 bg-navy-900 hover:bg-maroon-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Request Contact</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-4 max-w-md mx-auto">
            <AlertCircle className="w-12 h-12 text-maroon-600 mx-auto" />
            <h3 className="text-xl font-bold text-navy-900">No Donors Matched Your Filters</h3>
            <p className="text-xs text-navy-600 leading-relaxed">
              Try adjusting your blood group, district, or search terms to broaden your results.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-maroon-700 text-white font-bold text-xs rounded-xl hover:bg-maroon-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
